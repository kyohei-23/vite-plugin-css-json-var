interface CommonOptions {
  /**
   * path to configure file (format: json)
   */
  file: JSON | string;
}


interface CssOptions extends CommonOptions {
  /**
   * Your using language for styling
   */
  lang: "css";
  /**
   * Output style for variable
   */
  style: "css";
}

interface PreprocessorOptions extends CommonOptions {
  lang: "scss" | "sass" | "less" | "stylus";
  style: "css" | "preprocessor";
}

export type Options = CssOptions | PreprocessorOptions;
