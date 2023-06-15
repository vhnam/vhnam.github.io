const withNextra = require("nextra")({
  defaultShowCopyCode: true,
  readingTime: false,
  staticImage: true,
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.tsx",
  back: true,
});

module.exports = withNextra({
  cleanDistDir: true,
  reactStrictMode: true,
});
