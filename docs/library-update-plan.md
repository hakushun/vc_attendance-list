# ライブラリアップデート 実装計画書

作成日: 2026-10-22

## 1. 目的

- 本番依存に残っている既知の脆弱性（npm audit: 48件、うち critical 4件）を解消する
- 保守が止まったライブラリ（next-pwa, next-redux-wrapper など）から離れ、今後の追従を容易にする
- 壊れている開発ツール（stylelint）を復旧し、全チェックが通る状態を維持できるようにする

## 2. 決定事項

| 項目 | 方針 |
|---|---|
| ESLint | `eslint-config-airbnb` を廃止し、`@eslint/js` / `typescript-eslint` / `eslint-plugin-react` / `eslint-plugin-react-hooks` の推奨設定 + 既存の独自ルールのみで構成する（flat config） |
| Redux | `typescript-fsa` 系を維持し、redux / react-redux / redux-thunk / reselect のバージョンを上げる。Redux Toolkit への移行はスコープ外 |
| PWA | `next-pwa` を廃止し、Serwist（`@serwist/next`）へ移行する |
| TypeScript 7 / firebase 13 | 今回のスコープ外。本計画完了後に個別判断する |

## 3. 現状（2026-10-22 時点）

### 3.1 実行環境

- Node: `engines` は `>=22.0.0`（ローカルは v24.21.0）、npm 11
- Next.js Pages Router 構成。`getServerSideProps` / `getStaticProps` / `getInitialProps` は未使用

### 3.2 ベースライン

| チェック | 結果 |
|---|---|
| `npm run typecheck` | 通過 |
| `npm test` | 通過（25 suites / 168 tests） |
| `eslint` | 通過 |
| `stylelint` | **失敗（2049件）**。stylelint 16 で削除されたルールを `stylelint-config-standard@20` と `.stylelintrc` の `indentation` が参照している |
| `npm run build` | コンパイルは成功。page data 収集で `auth/invalid-api-key` により失敗（`.env.local` が無いため） |

### 3.3 脆弱性の主な原因

| 原因 | 解消手段 |
|---|---|
| `next@14.2.35`（critical） | Next 16 系へのメジャーアップ |
| `next-pwa@5.6.0`（workbox 等の high 多数） | Serwist へ移行 |
| `xlsx@0.18.5`（npm 上に修正版なし） | SheetJS 公式 CDN の tarball（0.20.x）へ差し替え |
| `firebase-admin@13`（直接依存。脆弱性は `@google-cloud/firestore` などの推移的依存に含まれる） | 未使用のため削除 |
| その他推移的依存（protobufjs, websocket-driver 等） | `npm audit fix`（非破壊）で解消 |

### 3.4 不要な依存

| パッケージ | 理由 |
|---|---|
| `firebase-admin` | `next.config.js` と `src/setupTests.ts` のモックでのみ参照。実コードで未使用 |
| `axios` | import 箇所なし |
| `babel-loader` / `css-loader` / `style-loader` / `sass-loader` | Next.js が内蔵しており不要 |
| `@types/next` | 中身のないスタブ型。Next 本体が型を同梱 |
| `vercel` | `npx vercel` で足りる。dev 側の audit 件数を押し上げている |
| `redux-devtools-extension` | 非推奨パッケージ。redux 5 では `compose` + 拡張機能のグローバルで代替可能 |
| `next-redux-wrapper` | `withRedux` のみ使用し、SSR での state 受け渡しは無い。`<Provider>` で代替可能 |
| `.babelrc`（設定ファイル） | 存在するだけで SWC が無効化される。Next 標準の SWC に戻す |

## 4. 実施ステップ

ステップごとに 1 PR とし、各 PR で「7. 検証方法」をすべて満たしてからマージする。ブランチの切り方は「5. ブランチ戦略」に従う。

### Step 1: 準備・不要依存の削除

- ビルド検証用に `.env.example` を追加し、ダミー値でも `next build` が完走することを確認する（実施済み: 完走を確認）
- 3.4 のうち `firebase-admin` / `axios` / 各 loader / `@types/next` / `vercel` を削除
  - `src/setupTests.ts` の `firebase-admin` モック、`next.config.js` の `serverComponentsExternalPackages` も削除
  - `deploy` スクリプトは `npx vercel` のまま維持
- stylelint を 17 に上げ、設定を作り直す
  - 当初は 16 のまま直す予定だったが、最新の共有設定（`stylelint-config-standard@40` など）が stylelint 17 を必須としているため 17 に上げた
  - `stylelint-config-standard` / `stylelint-config-recommended` を削除し、SCSS 用の `stylelint-config-standard-scss` に置き換え
  - `stylelint-config-recess-order` / `stylelint-order` を最新化
  - `.stylelintrc` から削除済みルール（`indentation` 等）と、SCSS 設定が代替する `at-rule-no-unknown` を除去
  - CSS Modules で `styles.fooBar` と参照するため、クラス名と Sass 変数名は lowerCamelCase を許可する（変数は z-index 用の `z_` 接頭辞も許可）
  - フォーマット系は Prettier に任せる
- 新しいルールに合わせて SCSS を修正
  - `lighten` / `darken` / `map-get` を `color.adjust` / `map.get` に置き換え（Sass 側でも非推奨になっており、Step 2 で sass を上げると警告が出るため先に対応）
  - その他は `stylelint --fix` による自動修正（プロパティ順、`rgba()` の表記、`inset` への置き換えなど）と、重複プロパティの削除
  - ビルド後の CSS を前後で比較し、差分がプロパティ順と `inset` への置き換えのみであることを確認
- 完了条件: stylelint を含む全チェックが通る

### Step 2: 同一メジャー内の更新と audit fix

- `npm update` で semver 範囲内の更新（firebase 12.19, dayjs, prettier, ts-jest, sass 1.106 など）
- `npm audit fix`（`--force` は使わない）
- `xlsx` を SheetJS CDN の tarball に差し替え
  - 例: `"xlsx": "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz"`（導入時点の最新版を確認する）
  - 使用箇所は `src/libs/xlsx/exportToExcel.ts`（`table_to_book` / `writeFile`）のみ
- `caniuse-lite` の更新（`npx update-browserslist-db@latest`）
- 注意: sass 1.30 → 1.106 で `@import` の非推奨警告が出る可能性がある。警告のみなら今回は許容し、`@use` 化は別途検討
- 実施結果
  - sass の非推奨警告は出なかった（`@import` は使っておらず、非推奨の関数は Step 1 で置き換え済み）。CSS の差分は `calc(100% / 3)` が計算済みの値になった 1 箇所のみ
  - firebase 12.15.0 以降で全ページの初回 JS が gzip で約 58 kB 増える（217 kB → 275 kB）。`@firebase/firestore` 4.16.0 で追加された `re2js`（Pipeline 機能用）が tree-shaking されずに取り込まれるため。PWA のキャッシュで 2 回目以降の影響は小さく、固定すると今後の更新が遅れるため 12.19 を採用した
  - xlsx 0.20.3 で `/event/[id]` の JS が約 14 kB 増えた
  - xlsx は差し替えのため、マージ前に Vercel Preview で Excel 出力の手動確認を行う（PR #15 のチェックリストで管理）
  - xlsx は CDN の URL 指定になり `npm update` などで追従しないため、手動の更新手順を README に記載した
  - firebase 経由の `@grpc/grpc-js` の脆弱性（GHSA-m9gg-hp2v-232j, GHSA-f596-whhp-79r4）は、最新の `@firebase/firestore` でも `~1.9.0` に固定されているため解消できない。どちらもサーバー側の機能に関するもので、ブラウザから Firestore を使うこのアプリには当てはまらないため許容する

### Step 3: 開発ツールの刷新

- ESLint 8 → 9 以降、flat config（`eslint.config.mjs`）へ移行
  - 削除: `eslint-config-airbnb`, `eslint-plugin-jsx-a11y`（airbnb 経由でのみ有効化されていたため。残す場合は recommended を明示的に追加）, `eslint-plugin-immutable`（plugins に登録されているがルール未使用）
  - 構成: `@eslint/js` recommended + `typescript-eslint` recommended + `eslint-plugin-react` recommended / jsx-runtime + `eslint-plugin-react-hooks` recommended + `eslint-plugin-import`（`import/no-cycle` 維持のため）+ `eslint-config-prettier`
  - 既存 `.eslintrc.js` の独自ルールのうち、Prettier と衝突しないものだけを移植する
  - `react-hooks` 最新版は React Compiler 系ルールを含むため、新規エラーが多い場合はルール単位で調整する
- husky 4 → 9、lint-staged 10 → 最新
  - `package.json` の `husky.hooks` を廃止し `.husky/pre-commit` へ移行、`prepare` スクリプト追加
  - lint-staged のコマンドは対象ファイルを引数で受け取る形（`eslint --fix` / `prettier --write`）に修正。現状は全ファイルを対象にしている
- jest 29 → 30、`@types/jest` 30、`ts-jest` を jest 30 対応版へ（`jest-environment-jsdom` とバージョンを揃える）
- `@types/node` を 22 系へ（`engines` に合わせる）
- `typescript` は 5.9 系の最新に留める
- 実施結果
  - ESLint は 10 ではなく 9 系にした。`eslint-plugin-react` と `eslint-plugin-import` の peerDependencies が ESLint 9 までのため
  - `react-hooks` 7 の React Compiler 系ルールでは新しいエラーは出なかった
  - 旧設定の `import/no-cycle` は TypeScript 用のパーサー・リゾルバー設定がなく、`.ts` / `.tsx` の循環参照を一度も検出できていなかった。`importPlugin.flatConfigs.typescript` を使うよう直したところ 75 件を検出した
    - すべて「各 Redux モジュールが `reducers.ts` から型の `RootState` などを import し、`reducers.ts` が各モジュールを import する」形の、型だけの循環だった（実行時の循環は無い）
    - `@typescript-eslint/consistent-type-imports`（`import type` に分ける形）を常設し、自動修正で型の import を `import type` に揃えて解消した
  - 新しい JSX ランタイムで不要になった `import React from 'react'` と、削除したプラグインのルールを参照する `eslint-disable` コメントを削除した
  - lint-staged 17 は Node.js 22.22.1 以上を要求する。`engines` は `>=22.0.0` のままにしている（Vercel のビルドには影響しない開発時のみの依存のため）

### Step 4: Redux 周りの更新（React 18 のまま）

- react-redux 7 → 9、redux 4 → 5、redux-thunk 2 → 3、reselect 4 → 5
- `src/redux/store.ts`
  - `import thunkMiddleware from 'redux-thunk'` → `import { thunk } from 'redux-thunk'`
  - `redux-devtools-extension` を外し、`window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` もしくは `compose` で代替
  - `createStore` は redux 5 で非推奨表示（`legacy_createStore`）になるため、`legacy_createStore` を使う（RTK へ移行しない方針のため）
- `next-redux-wrapper` を削除し、`_app.tsx` で `<Provider store={store}>` を使う
  - `App` 内で `useDispatch` しているため、Provider を張るラッパーと中身のコンポーネントを分ける
- `@types/react-redux` / `@types/redux-mock-store` は不要になれば削除（react-redux 9 は型同梱）
- `typescript-fsa` / `typescript-fsa-reducers` / `typescript-fsa-redux-thunk` は peer 範囲（`redux >=4`, `redux-thunk >=2.3`）内のため据え置き。型エラーが出た場合のみ対処
- `redux-mock-store` が redux 5 / thunk 3 で動作するかをテストで確認

### Step 5: Next 15 → React 19 → Next 16 + Serwist

Next のメジャーは 1 つずつ上げる（15 で動作確認 → 16）。PR は 5a / 5b に分けてもよい。

**5a: Next 15**

- `next@15`、`npx @next/codemod` で機械的な変更を適用
- `next.config.js`: `swcMinify` を削除（廃止）、`experimental.serverComponentsExternalPackages` は Step 1 で削除済み
- `.babelrc` を削除し SWC に切り替え
- `next-pwa` は Next 15 + webpack で動作する見込みのため一旦維持（動かなければ 5b の Serwist 移行を前倒し）

**5b: React 19 + Next 16 + Serwist**

- react / react-dom 19、`@types/react` / `@types/react-dom` 19
  - `npx types-react-codemod preset-19` で型の破壊的変更に対応
- `next@16`
  - ビルドがデフォルトで Turbopack になる
  - `router.events`（`_app.tsx`）は Pages Router で引き続き利用可能なことを確認
- `next-pwa` → Serwist
  - `@serwist/next` + `serwist` を導入し、`src/sw.ts` に Service Worker のエントリを作成（Pages Router のため `src/app/` は使わない）
  - `next-pwa/cache` の `runtimeCaching` は `@serwist/next/worker` の `defaultCache` で置き換える
  - 開発時無効化（`disable: process.env.NODE_ENV === 'development'`）を維持
  - Turbopack ビルドと Serwist の対応状況を導入時点で確認し、未対応なら `next build --webpack` を使う
  - `public/sw.js` / `public/workbox-*.js` / `public/pwa` など生成物の扱いを整理し、生成物は `.gitignore` に追加する
  - `public/manifest.json` は維持

## 5. ブランチ戦略

### 5.1 基本方針

- 各ステップの作業ブランチは、直前のステップがマージされた後の最新の `master` から作成する。PR のマージ先も `master` とする
- 前のステップの PR がマージされるまで、次のステップのブランチは作らない
  - どのステップでも `package.json` と `package-lock.json` を変更するため、並行して進めるとロックファイルのコンフリクトが毎回発生する
  - 各ステップは前のステップの結果を前提にしている（例: Step 5 は Step 4 で `next-redux-wrapper` を外していることが前提）
- 各ステップは単独でリリース可能な状態でマージする。途中のステップで止めても `master` が壊れないようにする
- マージは既存の運用に合わせて Merge commit とする。問題が起きたときに、ステップ単位で `git revert -m 1 <merge commit>` で戻せるようにするため

### 5.2 ブランチ名

既存の命名（`feature/library-update`, `feature/security-update` など）に合わせ、`feature/library-update-<step>-<内容>` とする。

| Step | ブランチ名 | マージ先 |
|---|---|---|
| 1 | `feature/library-update-1-cleanup` | `master` |
| 2 | `feature/library-update-2-minor-and-audit` | `master` |
| 3 | `feature/library-update-3-dev-tools` | `master` |
| 4 | `feature/library-update-4-redux` | `master` |
| 5a | `feature/library-update-5a-next15` | `master` |
| 5b | `feature/library-update-5b-next16-react19-serwist` | `master` |

この計画書自体は Step 1 のブランチに含めてコミットする。

### 5.3 PR とレビュー

- PR の説明には、そのステップで更新・削除したパッケージ（旧バージョン → 新バージョン）と、「7. 検証方法」の確認結果を書く
- 手動確認には Vercel の Preview デプロイを使う。Service Worker の確認（Step 5b）も Preview 環境で行う
- レビュー待ちの間に `master` へ別の変更が入った場合は、`master` を取り込んでから `npm install` で `package-lock.json` を再生成し、検証をやり直す

### 5.4 ステップの途中で問題が見つかった場合

- 作業中のステップで解決できない問題（例: Serwist が Turbopack に対応していない）が見つかったら、そのステップのブランチ内で計画書の該当箇所を更新し、方針の変更を PR で共有する
- マージ後に本番で不具合が出た場合は、そのステップのマージコミットを revert して `master` を直前のステップの状態に戻す。修正は新しいブランチで行う

## 6. スコープ外

- Redux Toolkit への移行
- TypeScript 7 への更新
- firebase 13 への更新
- App Router への移行
- sass の `@import` → `@use` 化（警告の範囲に留まる場合）

## 7. 検証方法

各 PR で以下をすべて確認する。

| 種別 | 内容 |
|---|---|
| 自動 | `npm run typecheck` / `npm test` / `eslint` / `stylelint` / `npm run build` が成功する |
| 自動 | `npm audit --omit=dev` の件数がステップ前より増えていない |
| 手動 | `npm run build && npm start` でログイン、サインアップ、イベント一覧、イベント作成、出欠入力、Excel 出力ができる |
| 手動（Step 5b） | Service Worker が登録され、オフライン時にキャッシュ済みページが表示される |

テストは Redux モジュールと utils の単体テストのみで、画面やルーティングは自動で確認できないため、手動確認を省略しない。

## 8. リスクと対策

| リスク | 対策 |
|---|---|
| ダミー環境変数では build が完走しない | Step 1 で先に解消する。解消できない場合は Vercel の Preview デプロイを検証環境として使う |
| ESLint 刷新で大量の新規エラー | 自動修正可能なものは一括修正、それ以外はルール単位で off にして別途対応 |
| redux 5 で `typescript-fsa` 系の型が合わない | 該当箇所の型注釈で対処。困難な場合は redux 4 に留め、React 19 対応に必要な react-redux 9 のみ上げられるか確認 |
| Serwist が Turbopack 非対応 | `next build --webpack` で回避 |
| Service Worker のキャッシュで旧バージョンが残る | Serwist の `skipWaiting` / `clientsClaim` を有効化し、リリース後に実機で更新を確認 |
