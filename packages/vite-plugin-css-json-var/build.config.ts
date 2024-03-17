import type { BuildConfig } from "unbuild"
export default {
  entries: ["./src/index"],
  declaration: "node16",
  clean: true,
  replace: {
    "import.meta.vitest": "undefined",
  }
} satisfies BuildConfig