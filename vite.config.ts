import { UserConfig } from "vite";
import jsonConfigPlugin from 'vite-plugin-css-json-var';
import json from "./site.config.json"

export default {
  plugins: [
    jsonConfigPlugin({
      file: "./site.config.json",
      lang: "scss",
      style: "preprocessor",
    })
  ]
} satisfies UserConfig