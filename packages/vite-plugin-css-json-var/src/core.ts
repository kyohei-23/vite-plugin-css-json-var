import { Options } from "./types";

export function parseJson(json:JSON):Record<string, string>{
  const result = {};
  
  function recurse(obj:Object, currentKey:string) {
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

function getPrefix (type:Options["lang"]):string{
  switch(type){
    case "css":
      return "--"
    case "less":
      return "@"
    default:
      return "$"      
  }
}

export function convertObjToCssVar(obj:Record<string, string>, type: Options["lang"]):string{
  const prefix = getPrefix(type)
  const data = Object.entries(obj).reduce((result, [key, value]) =>  result+=`${prefix}${key}: ${value};\n` , "");
  return data
}