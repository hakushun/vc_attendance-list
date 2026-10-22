// @ts-check
// Service Worker は next build の後に serwist build で別途ビルドする（configurator mode）。
// @serwist/next の webpack プラグインは Next 16 既定の Turbopack で使えず、
// @serwist/turbopack は App Router の route handler が前提で Pages Router では使えないため
import { serwist } from '@serwist/next/config';

export default serwist({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
  // next-pwa では HTML を precache しておらず、動的ルートの /event/[id] まで precache 対象に
  // なってしまうため、ページは defaultCache の NetworkFirst に任せる
  precachePrerendered: false,
});
