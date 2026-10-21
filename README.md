# Attendance list on Vercel
This is an application to take attendance specialized in orchestra and brassband.

## Setup

```sh
npm ci
cp .env.example .env.local # 実際の Firebase プロジェクトの値に置き換える
npm run dev
```

`.env.example` はダミー値のため、`next build` は通るが Firebase には接続できない。
