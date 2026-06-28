import { KO_KR_TEXT } from "./ko-KR.js?v=492";

export const DEFAULT_LOCALE = "ko-KR";

const DICTIONARIES = {
  "ko-KR": KO_KR_TEXT,
};

export function getLocaleText(locale = DEFAULT_LOCALE) {
  return DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
}

export function t(path, fallback = "", locale = DEFAULT_LOCALE) {
  const dictionary = getLocaleText(locale);
  const value = path.split(".").reduce((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return current[key];
  }, dictionary);

  return typeof value === "string" ? value : fallback;
}

export function formatText(template, values = {}) {
  return String(template || "").replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!Object.prototype.hasOwnProperty.call(values, key)) return match;
    return String(values[key]);
  }).replace(/\{(\w+)\}/g, (match, key) => {
    if (!Object.prototype.hasOwnProperty.call(values, key)) return match;
    return String(values[key]);
  });
}

export function tf(path, values = {}, fallback = "", locale = DEFAULT_LOCALE) {
  return formatText(t(path, fallback, locale), values);
}



