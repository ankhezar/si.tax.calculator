import { SL } from './sl.js';
import { EN } from './en.js';
import { UA } from './ua.js';

export const DICTIONARIES = {
  sl: SL,
  en: EN,
  ua: UA
};

export function t(lang, key, vars = null) {
  const dict = DICTIONARIES[lang] || DICTIONARIES.en;
  let str = dict[key] ?? DICTIONARIES.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}
