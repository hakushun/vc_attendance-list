# Attendance list on Vercel
This is an application to take attendance specialized in orchestra and brassband.

## Setup

Node.js 22.22.1 以上が必要。

```sh
npm ci
cp .env.example .env.local # Firebase の値と NEXT_PUBLIC_ADMIN_USER_ID を実際の値に置き換える
npm run dev
```

`.env.example` はダミー値のため、`next build` は通るが Firebase には接続できない。
`NEXT_PUBLIC_ADMIN_USER_ID` には管理者の Firebase Auth UID を設定する。設定しないと、既存イベントの日程の追加・削除ができない。

## PWA（Service Worker）

Service Worker は [Serwist](https://serwist.pages.dev/) で `src/sw.ts` からビルドする。
`npm run build` は `next build` の後に `serwist build` を実行し、`public/sw.js` を生成する（生成物のため git の管理対象外）。
`npm run dev` では Service Worker を登録しない。

## xlsx の更新

`xlsx`（SheetJS）は npm 上の配布が 0.18.5 で止まっており、修正版は SheetJS 公式 CDN でのみ配布されている。
そのため `package.json` では CDN の tarball の URL を直接指定している。
`npm update` や `npm audit fix` では新しいバージョンに追従しないので、次の手順で手動で更新する。

1. [SheetJS CDN](https://cdn.sheetjs.com/) とリリースノートで最新版とセキュリティ修正の有無を確認する
2. `npm install --save https://cdn.sheetjs.com/xlsx-<version>/xlsx-<version>.tgz` を実行する
3. イベント画面から Excel 出力ができることを確認する

`npm audit` は npm 上の情報で判定するため、CDN 版に更新した後も `xlsx` の警告が表示され続ける。
