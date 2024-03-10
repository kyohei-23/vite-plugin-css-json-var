import vite from "vite"

type CssOptions = {
  lang: "css";
  mode: "css";
}

type PreprocessorOptions = {
  lang: "scss" | "sass" | "less" | "stylus";
  mode: "css" | "preprocessor";
}

type Options = CssOptions | PreprocessorOptions;

export const plugin = (option: Options):vite.Plugin => {
  return {
    name: "vite-plugin-example",
    enforce: "pre",
    config(config) {
      console.log(config, option.mode);
      return config
    },
  }
}