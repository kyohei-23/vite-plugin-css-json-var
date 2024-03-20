import { Options } from "./types";

export function parseJson(json: Object): Record<string, string> {
  const result = {};

  function recurse(obj: Object, currentKey: string) {
    for (const key in obj) {
      const value = obj[key];
      const newKey = currentKey ? currentKey + '-' + key : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  recurse(json, '');
  return result;
}

function getPrefix(type: Options["lang"]) {
  switch (type) {
    case "css":
      return "--"
    case "less":
      return "@"
    case "stylus":
      return ""
    default:
      return "$"
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it("getConnector", () => {
    expect(getPrefix("css")).toBe("--")
    expect(getPrefix("sass")).toBe("$")
    expect(getPrefix("scss")).toBe("$")
    expect(getPrefix("less")).toBe("@")
    expect(getPrefix("stylus")).toBe("")
  })
}

function getConnector(type: Options["lang"]) {
  if (type === "stylus") {
    return "= "
  }
  else {
    return ": "
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it("getConnector", () => {
    expect(getConnector("css")).toBe(": ")
    expect(getConnector("sass")).toBe(": ")
    expect(getConnector("scss")).toBe(": ")
    expect(getConnector("less")).toBe(": ")
    expect(getConnector("stylus")).toBe("= ")
  })
}

function getEOL(type: Options["lang"]) {
  switch (type) {
    case "sass":
    case "stylus":
      return "\n"
    default: return ";\n"
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it("getEOL", () => {
    expect(getEOL("css")).toBe(";\n")
    expect(getEOL("sass")).toBe("\n")
    expect(getEOL("scss")).toBe(";\n")
    expect(getEOL("less")).toBe(";\n")
    expect(getEOL("stylus")).toBe("\n")
  })
}

function getVariableGenerator(lang: Options["lang"]) {
  const prefix = getPrefix(lang)
  const connector = getConnector(lang)
  const eol = getEOL(lang)

  return function (key: string, value: string) {
    return `${prefix}${key}${connector}${value}${eol}`
  }

}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const key = "main-color",
    value = "#f00000"
  it("outputTest", () => {
    expect(getVariableGenerator("css")(key, value)).toBe(`--${key}: ${value};\n`)
    expect(getVariableGenerator("sass")(key, value)).toBe(`$${key}: ${value}\n`)
    expect(getVariableGenerator("scss")(key, value)).toBe(`$${key}: ${value};\n`)
    expect(getVariableGenerator("less")(key, value)).toBe(`@${key}: ${value};\n`)
    expect(getVariableGenerator("stylus")(key, value)).toBe(`${key}= ${value}\n`)
  })
}

export function convertObjToCssVar(obj: Record<string, string>, option: Options): string {
  const outputLang = option.style === "css" ? "css" : option.lang
  const variiableGenerator = getVariableGenerator(outputLang)
  const data = Object.entries(obj).reduce((result, [key, value]) => result += variiableGenerator(key, value), "");
  return data
}
