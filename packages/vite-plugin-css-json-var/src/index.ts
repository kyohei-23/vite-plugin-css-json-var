import vite, { normalizePath, mergeConfig, UserConfig } from "vite"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { convertObjToCssVar, parseJson } from "./core"
import { Options } from "./types"



const plugin = (option: Options): vite.Plugin => {
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

        const userAddedData: string | undefined = config.css?.preprocessorOptions?.[option.lang]?.additionalData

        const userAddedStrings = typeof userAddedData === "string" ? userAddedData : ""

        const pluginConfig = {
          css: {
            preprocessorOptions: {
              [option.lang]: {
                additionalData: userAddedStrings + "\n" + result
              }
            }
          }
        } satisfies UserConfig

        return mergeConfig(config, pluginConfig)
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
    },
    handleHotUpdate(ctx) {
      /**
       * Managed by flags, since there is no need to manually update the HMR when JSON is passed directly
       */
      if ("string" === typeof option.file && resolve(ctx.file) === resolve(option.file)) {
        ctx.server.restart()
      }
    }
  }
}

export default plugin
