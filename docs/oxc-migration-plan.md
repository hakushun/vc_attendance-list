# oxlint / oxfmt 移行 実装計画書

作成日: 2026-11-10

## 1. 目的

- ESLint 10 に上げられない状態を解消する。`eslint-plugin-import@2.32.0` と `eslint-plugin-react@7.37.5` は最新版でも peerDependencies が ESLint 9 までで、Dependabot の ESLint 10 の PR（#23, #24）は `npm install` の依存解決に失敗する
- lint を速くする。`src` 全体で ESLint は約 4 秒、oxlint は約 0.2 秒（型情報を使うルールを含めても約 0.6 秒）
- lint とフォーマットの依存を 10 パッケージから 3 パッケージに減らす

## 2. 決定事項

| 項目 | 方針 |
|---|---|
| lint | ESLint を oxlint に置き換える。既存のルールは `@oxlint/migrate` で変換し、変換できないものは 4 章のとおり代替する |
| フォーマット | Prettier を oxfmt に置き換える。設定は `oxfmt --migrate=prettier` で変換する |
| 型情報を使う lint | `oxlint-tsgolint` を入れ、`.oxlintrc.json` の `options.typeAware` で有効にする。`consistent-return` の代替に必要なため |
| `import/no-extraneous-dependencies` | oxlint に未実装のため廃止する |
| `src/pages/_document.tsx` | クラスコンポーネントを関数コンポーネントに書き換える。`react/prefer-function-component` の違反になるため |
| stylelint | 対象外。oxlint / oxfmt は SCSS を扱わないため、現状のまま残す |

## 3. 現状（2026-11-10 時点）

### 3.1 構成

| 種別 | パッケージ / ファイル |
|---|---|
| lint | `eslint@9`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-import`, `@next/eslint-plugin-next`, `globals` / `eslint.config.mjs` |
| フォーマット | `prettier`, `eslint-config-prettier` / `.prettierrc` |
| 実行箇所 | `package.json` の `lint:eslint` / `lint:prettier`、lint-staged（husky の pre-commit） |

### 3.2 試行結果

作業用のワークツリーで oxlint 1.93.0 / oxfmt 0.78.0 / oxlint-tsgolint 7.0.2006 / `@oxlint/migrate` を試した。

- oxfmt: `.prettierrc` を変換した設定で、`src` の 165 ファイルすべてが差分なし。Prettier の `"parser": "typescript"` だけは変換されないが、oxfmt は拡張子で判断するため不要
- oxlint: `@oxlint/migrate` で 145 ルールを変換できた。違反は ESLint と同じく、`src/pages/_document.tsx` の `next/no-title-in-document-head` の警告 1 件のみ
- `@oxlint/migrate` の出力には `plugins` に `import` が含まれず、`import/no-cycle` が無効になっていた。わざと循環参照を作っても検出されず、`plugins` に `import` を足すと検出された
- 既存の `eslint-disable` / `eslint-disable-next-line` コメントは oxlint でもそのまま効く

## 4. 移行できないルールと対応

| 現在のルール | 対応 |
|---|---|
| `consistent-return`（`treatUndefinedAsUnspecified: true`） | `typescript/consistent-return` に置き換える（型情報が必要） |
| `no-undef-init` | 廃止。`let a = undefined` は `no-undefined` で検出される。当初は `unicorn/no-useless-undefined` に置き換えたが、関数の引数の `undefined` も自動修正で消し、型エラーになるコードを作るためやめた |
| `react/prefer-stateless-function` | `react/prefer-function-component` に置き換える。`_document.tsx` が違反になるため関数コンポーネントに書き換える |
| `no-invalid-this` | 廃止。tsconfig の `strict: true`（`noImplicitThis`）で TypeScript が検出する |
| `import/no-extraneous-dependencies` | 廃止。oxlint に未実装 |
| `no-undef` | 廃止。oxlint では開発中（nursery）のルールで、TypeScript が検出する |
| `no-dupe-args` / `no-octal` | 廃止。ES Modules は strict mode のため構文エラーになる |
| `react/prop-types` / `react/jsx-uses-vars` / `react/no-deprecated` | 廃止。現在も `react/prop-types` は off。他の 2 つは `no-unused-vars` と TypeScript が代わりに検出する |
| `react-hooks/config` / `react-hooks/gating` | 廃止。React Compiler のオプション用のルールで、このリポジトリでは使っていない |
| `react-hooks/component-hook-factories` | 廃止。oxlint に未実装 |
| `react/require-render-return` | 廃止。oxlint では開発中（nursery）のルール。クラスコンポーネントは `react/prefer-function-component` で禁止しているため影響しない |
| `@next/next/no-location-assign-relative-destination` | 廃止。oxlint に未実装。`location` への代入は使っていない |

`settings.react.version`（`detect`）は変換されない。oxlint には自動判定が無く、バージョンを書くと React の更新のたびに実際のバージョンとずれるため、設定しない（設定の有無で lint の結果が変わらないことを確認した）。

## 5. 実施ステップ

PR は 1 本とし、次の単位でコミットを分ける。

### Step 1: `_document.tsx` を関数コンポーネントにする

- `class MyDocument extends Document` を、`Html` / `Head` / `Main` / `NextScript` を返す関数コンポーネントに書き換える
- 出力する HTML は変えない。`<title>` や `<meta>` が `<Head>` の外にある構造（`no-title-in-document-head` の警告の原因）も、今回は直さない
- 確認: 書き換えの前後で HTML の `<head>` が同じであること

### Step 2: oxlint / oxfmt を導入し、ESLint / Prettier を削除する

- 追加: `oxlint`, `oxfmt`, `oxlint-tsgolint`
  - oxfmt は 0.x のため、マイナー更新でもフォーマット結果が変わる可能性がある。`~0.78.0` のようにパッチ更新だけを許可する
- 削除: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-import`, `@next/eslint-plugin-next`, `eslint-config-prettier`, `globals`, `prettier`
- `.oxlintrc.json`
  - `npx @oxlint/migrate --type-aware eslint.config.mjs` の出力をもとに作る
  - `plugins` に `import` を追加する
  - 4 章の置き換えを反映する
  - `src/**/__tests__/**` と `src/setupTests.ts` の jest のグローバル変数を、`overrides` の `env` で引き継ぐ
- `.oxfmtrc.json`: `npx oxfmt --migrate=prettier` で作る
- 削除するファイル: `eslint.config.mjs`, `.prettierrc`
- `package.json`
  - `lint:eslint` → `lint:oxlint`: `oxlint --fix src`（型情報は `.oxlintrc.json` の `options.typeAware` で有効にする）
  - `lint:prettier` → `lint:oxfmt`: `oxfmt 'src/**/*.{ts,tsx}'`
  - `lint` から呼ぶスクリプト名を変える
  - lint-staged: `src/**/*.{ts,tsx}` を `oxlint --fix` と `oxfmt` にする
- 完了条件: 6 章の確認がすべて通る

### Step 3: ドキュメント

- README に lint / フォーマットのツールについての記述があれば更新する
- この計画書に実施結果を追記する

### 実施結果

- `_document.tsx`
  - 書き換えの前後でローカルの `next build` を比べる予定だったが、Firebase の環境変数ファイルを読めない環境だったためやめた。Vercel Preview と本番で `<head>` の HTML を比べて確認する
- oxlint
  - `@oxlint/migrate` は、試したときと違って `import` プラグインを `overrides` 側の `plugins` に出力した。この場合も `import/no-cycle` は効かなかったので、トップレベルの `plugins` に移した
  - 型情報を使う設定は、コマンドの `--type-aware` ではなく `.oxlintrc.json` の `options.typeAware` で有効にした（`@oxlint/migrate --type-aware` が出力したもの）。lint-staged を含め、どこから実行しても同じルールが動くようにするため
  - jest のグローバル変数の `overrides` は `@oxlint/migrate` が引き継いだため、手で足す必要はなかった
  - 違反するコードを一時的に作り、次のルールが検出されることを確認した: `import/no-cycle`, `typescript/consistent-return`, `no-undefined`, `no-shadow`, `typescript/consistent-type-imports`, `react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`
  - 既存の `eslint-disable` コメント（`react-hooks/exhaustive-deps`, `no-undefined`, `no-useless-escape`）は書き換えずに残した。テストファイルのコメントを外すと `no-undefined` が検出されることから、コメントが効いていることを確認した
- oxfmt
  - `oxfmt src` とディレクトリを渡すと SCSS も整形対象になり、1 ファイルに差分が出た。SCSS は stylelint に任せているため、Prettier と同じく `'src/**/*.{ts,tsx}'` に絞った
- lint-staged: ファイルを変更してステージし、`oxlint --fix`（`let` → `const`）と `oxfmt` が適用されることを確認した
- README には lint / フォーマットについての記述がなかったため、変更していない

## 6. 検証方法

| 種別 | 内容 |
|---|---|
| 自動 | `npm run typecheck` / `npm test` / `npm run lint:oxlint` / `npm run lint:stylelint` が成功する |
| 自動 | `npx oxfmt --check 'src/**/*.{ts,tsx}'` が差分なし（コードのフォーマットが変わっていない） |
| 自動 | Vercel の Preview ビルドが成功する |
| 手動 | 循環参照するファイルを一時的に作り、`import/no-cycle` で検出されることを確認する |
| 手動 | `return;` と `return 値;` が混在する関数を一時的に作り、`typescript/consistent-return` で検出されることを確認する |
| 手動 | ファイルを変更してコミットし、husky から lint-staged が動いて oxlint / oxfmt が実行されることを確認する |
| 手動 | Vercel Preview でページのタイトル・favicon・manifest が以前と同じであることを確認する（`_document.tsx` の書き換え） |

## 7. スコープ外

- stylelint の置き換え
- `_document.tsx` の `<head>` の構造の修正（`no-title-in-document-head` の警告）
- 新しいルールの追加。今回は既存のルールを引き継ぐことだけを目的とする
- エディタ（VS Code の oxc 拡張など）の設定。リポジトリにエディタ設定が無いため

## 8. リスクと対策

| リスク | 対策 |
|---|---|
| oxfmt のバージョンアップでフォーマット結果が変わる | パッチ更新のみに固定し、Dependabot のグループから外して単独の PR にする。マイナー更新の PR では `oxfmt --check` の差分を確認してからマージする |
| `@oxlint/migrate` の変換漏れで、ルールが黙って無効になる（`import/no-cycle` で実際に起きた） | 独自に設定しているルールは、6 章のように違反するコードを一時的に作って検出されることを確かめる |
| `oxlint-tsgolint` が TypeScript のバージョンに追従できない | 型情報を使うルールは `typescript/consistent-return` だけのため、問題が出たら `.oxlintrc.json` の `options.typeAware` を `false` にし、`typescript/consistent-return` を削除してこのルールだけ諦める |
