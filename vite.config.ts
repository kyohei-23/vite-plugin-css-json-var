import { UserConfig } from "vite";
import {plugin as jsonConfigPlugin} from 'vite-plugin-css-json-var';

export default {
  plugins: [
    jsonConfigPlugin({
      lang: "css",
      mode: "css"
    })
  ]
}satisfies UserConfig