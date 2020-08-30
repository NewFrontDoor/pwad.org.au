require('dotenv').config();
const bundleAnalyzer = require('@next/bundle-analyzer');
const transpileModules = require('next-transpile-modules');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

const withTM = transpileModules(['pretty-bytes']);

module.exports = withBundleAnalyzer(
  withTM({
    webpack(config) {
      config.node = {fs: 'empty'};
      return config;
    }
  })
);
