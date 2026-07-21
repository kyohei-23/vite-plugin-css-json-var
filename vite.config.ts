import jsonConfigPlugin from "vite-plugin-css-json-var";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    includeSource: ["packages/vite-plugin-css-json-var/src/**/*.ts"],
  },
  plugins: lazyPlugins(() => [
    jsonConfigPlugin({
      file: "./site.config.json",
      lang: "scss",
      style: "preprocessor",
    }),
  ]),
});
