const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  runtimeCaching,
});

module.exports = withPWA({
  // パフォーマンス最適化
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
});
