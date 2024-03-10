import { UserConfig } from "vite";
import {plugin as jsonConfigPlugin} from 'vite-plugin-css-json-var';
import json from "./site.config.json"

export default {
  plugins: [
    jsonConfigPlugin({
      file: "./site.config.json",
      lang: "css",
      style: "css",
    })
  ]
}satisfies UserConfig