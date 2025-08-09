const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  runtimeCaching,
});

module.exports = withPWA({
  experimental: {
    // Node.js 22の新機能を活用
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  // パフォーマンス最適化
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
});
