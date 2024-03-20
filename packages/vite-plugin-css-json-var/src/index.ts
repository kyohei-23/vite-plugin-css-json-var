import vite, { normalizePath, mergeConfig, UserConfig } from "vite"
import { readFileSync } from "node:fs"
import { convertObjToCssVar, parseJson } from "./core"
import { Options } from "./types"


export const plugin = (option: Options): vite.Plugin => {
  let jsonFile: Object
  if (typeof option.file === 'string') {
    const path = normalizePath(option.file)
    const fileContent = JSON.parse(readFileSync(path).toString())
    jsonFile = fileContent
  } else {
    jsonFile = option.file;
  }

  const rawData = parseJson(jsonFile)
  const result = convertObjToCssVar(rawData, option)

  const virtualModuleId = "virtual:css-vars.css"
  const resolvedVirtualModuleId = "\0" + virtualModuleId

  return {
    name: "vite-plugin-example",
    enforce: "pre",
    config(config) {
      if (option.style === "preprocessor") {
        const pluginConfig = {
          css: {
            preprocessorOptions: {
              [option.lang]: {
                additionalData: result
              }
            }
          }
        } satisfies UserConfig

        return mergeConfig(pluginConfig, config)
      }

      return config
    },

    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },

    load(id) {
      if (id === resolvedVirtualModuleId && option.style === "css") {
        return {
          code: `
            :root{
              ${result}
            }
          `
        }
      }
    }
  }
}
