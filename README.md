# Attendance list on Vercel
This is an application to take attendance specialized in orchestra and brassband.

## Setup

Node.js 22 以上が必要。

```sh
npm ci
cp .env.example .env.local # Firebase の値と NEXT_PUBLIC_ADMIN_USER_ID を実際の値に置き換える
npm run dev
```

`.env.example` はダミー値のため、`next build` は通るが Firebase には接続できない。
`NEXT_PUBLIC_ADMIN_USER_ID` には管理者の Firebase Auth UID を設定する。設定しないと、既存イベントの日程の追加・削除ができない。
