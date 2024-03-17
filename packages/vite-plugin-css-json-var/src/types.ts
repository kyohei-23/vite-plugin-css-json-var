interface CommonOptions {
  /**
   * path to setting json file or setting json object.  
   * @property { JSON | string } file
   * @example <caption>using path to setting file</caption>
   * ```ts 
   * file: "./site-config.json"
   * ```
   * @example <caption>passing setting file directly</caption>
   * ```ts
   * import setting_json from "./site-config.json"
   * ~~~
   * file: setting_json
   * ```
   */
  file: JSON | string;
}


interface CssOptions extends CommonOptions {
  /**
   * Your using language for styling
   * @property { "css" } lang
   */
  lang: "css";
  /**
   * Output style for variable.\
   *   if you are using css for styling, you can select only "css" option.
   * @property { "css" } style
  */
  style: "css";
}

interface PreprocessorOptions extends CommonOptions {
  /**
   * Your using language for styling.
   * @property { "sass" | "scss" | "less" | "stylus" } lang
  */
  lang: "scss" | "sass" | "less" | "stylus";
  /**
   * Output style for variable.
   * @property { "css" | "preprocessor" } style
  */
  style: "css" | "preprocessor";
}

export type Options = CssOptions | PreprocessorOptions;
