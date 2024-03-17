# 🎨vite-plugin-css-json-var
This is a vite plugin for make and adding css (and preprocessors) variable from json file.  
This plugin depends on vite's [virtual module system](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention) and 
[css.preprocessorOptions[extension].additionalData](https://vitejs.dev/config/shared-options.html#css-preprocessoroptions-extension-additionaldata).

## install
via npm
```shell
npm i vite-plugin-css-json-var
```

## usage
### import vite plugin
plugin object is exported as default.
```vite.config.ts
import jsonConfigPlugin from "vite-plugin-css-json-var"
```

### create setting json file
exsample: 
```json
{
  "color": {
    "primary": "#ff0000",
    "secondary": "#ffffff"
  }
}
```
this code will be transformed below
```css
:root{
  --color-primary: #ff0000;
  --color-secondary: #ffffff;
}
```

### add plugin options
add plugin option in your `vite.config.js`.
```vite.config.ts
import jsonConfigPlugin from "vite-plugin-css-json-var"

export default {
  plugin: [
    jsonConfigPlugin({
      file: "./site-setting.json",
      lang: "css",
      style: "css",
    })
  ]
}
```

### import virtual file (only choosed "css" style option)
If you choosed "css" option in style field, you should import virtual css file in entry file.  
```js
import "virtual:css-vars.css"
import "main.css"
```

## plugin options
all options are required.

### file
pass or laod setting json file.  
**type**: `JSON | string`  
exsample:
```vite.config.ts
jsonConfigPlugin({
  //path to your setting json file.
  file: "./site.config.json",
})

// Or, you can pass setting file directly.
import setting_json from "./site-config.json"
jsonConfigPlugin({
  file: setting_json,
})
```

### lang
choose your using style language.   
**type**: `"css" | "sass" | "scss" | "less" | "stylus"`  

### style
choose output style which you need.
1. CSS custom properties
2. Preprocessor's variable style

**type**: `"css" | "preprocessor"`  
>[!NOTE]
> If you choose "css" in lang option,  you can select only "css" option.

"preprocessor" option, the plugin will automatically convert to the variable style of the `lang` option.  

## License
MIT
