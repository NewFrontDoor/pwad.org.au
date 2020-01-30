require('dotenv').config();
const bundleAnalyzer = require('@next/bundle-analyzer')
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

let HOST_URL = 'http://localhost:3000'

if (process.env.NODE_ENV === 'production') {
  HOST_URL = process.env.HOST_URL
}

module.exports = withBundleAnalyzer({
  env: {
    STRIPE_CLIENT_TOKEN: process.env.STRIPE_CLIENT_TOKEN,
    HOST_URL,
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.node = {fs: 'empty'};
    return config;
  }
})
