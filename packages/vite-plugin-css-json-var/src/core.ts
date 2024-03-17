import { Options } from "./types";

export function parseJson(json: JSON): Record<string, string> {
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

function getConnector(type: Options["lang"]) {
  if (type === "stylus") {
    return "= "
  }
  else {
    return ": "
  }
}

function getEOL(type: Options["lang"]) {
  switch (type) {
    case "sass":
    case "stylus":
      return "\n"
    default: return ";\n"
  }
}

export function convertObjToCssVar(obj: Record<string, string>, option: Options): string {
  const outputLang = option.style === "css" ? "css" : option.lang
  const prefix = getPrefix(outputLang)
  const connector = getConnector(outputLang)
  const eol = getEOL(outputLang)
  const data = Object.entries(obj).reduce((result, [key, value]) => result += `${prefix}${key}${connector}${value}${eol}`, "");
  return data
}