const bundleAnalyzer = require("@next/bundle-analyzer");
const transpileModules = require("next-transpile-modules");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withTM = transpileModules(["pretty-bytes"]);

module.exports = withBundleAnalyzer(
  withTM({
    webpack(config) {
      config.node = { fs: "empty" };
      return config;
    },
    env: {
      AUTH0_BASE_URL: process.env.VERCEL_URL || process.env.AUTH0_BASE_URL,
      RESTRICTED_PAGES_PASSWORD: process.env.RESTRICTED_PAGES_PASSWORD,
    },
  })
);
