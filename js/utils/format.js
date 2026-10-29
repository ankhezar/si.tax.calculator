/**
 * Statutory 2-decimal rounding and locale-aware currency/percentage formatters.
 * Zero external dependencies.
 */

const LOCALE_MAP = {
  sl: 'sl-SI',
  en: 'en-US',
  ua: 'uk-UA'
};

export function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function fmtInputNum(value) {
  const r = round2(Number(value) || 0);
  return Number(r.toFixed(2));
}

export function getLocale(lang = 'en') {
  return LOCALE_MAP[lang] || 'en-US';
}

export function fmtEur(amount, lang = 'en', decimals = 2) {
  const num = Number.isFinite(amount) ? amount : 0;
  const locale = getLocale(lang);
  return (
    num.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + ' €'
  );
}

export function fmtEurShort(amount, lang = 'en') {
  return fmtEur(amount, lang, 0);
}

export function fmtSignedEur(amount, lang = 'en', decimals = 0) {
  const num = Number.isFinite(amount) ? amount : 0;
  const sign = num > 0.005 ? '+' : num < -0.005 ? '−' : '';
  return sign + fmtEur(Math.abs(num), lang, decimals);
}

export function fmtHuf(amount, lang = 'en') {
  const num = Number.isFinite(amount) ? Math.round(amount) : 0;
  const locale = getLocale(lang);
  return num.toLocaleString(locale, { maximumFractionDigits: 0 }) + ' Ft';
}

export function fmtPct(pct, lang = 'en', decimals = 1) {
  const num = Number.isFinite(pct) ? pct : 0;
  const locale = getLocale(lang);
  return (
    num.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + '%'
  );
}

export function fmtSignedPct(pct, lang = 'en', decimals = 1) {
  const num = Number.isFinite(pct) ? pct : 0;
  const sign = num > 0.05 ? '+' : num < -0.05 ? '−' : '';
  return sign + fmtPct(Math.abs(num), lang, decimals);
}
