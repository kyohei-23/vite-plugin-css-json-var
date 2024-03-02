import vite from "vite"

export const plugin = ():vite.Plugin => {
  return {
    name: "vite-plugin-example",
    enforce: "pre",
  }
}