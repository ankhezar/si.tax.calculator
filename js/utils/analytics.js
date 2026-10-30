/**
 * Privacy-First Cookieless Analytics Helper (Umami Cloud)
 *
 * Guarantees:
 * - Zero cookies or persistent identifiers (no GDPR banner required).
 * - Never transmits simulated revenue, salary, manual contribution base, or family/dependent figures.
 * - Gracefully no-ops in Node tests, localhost, or when blocked by content blockers.
 */

export const UMAMI_WEBSITE_ID = 'f9f5ad70-ab4c-4a1e-830b-06bc9e8fcbc5';
export const UMAMI_ALLOWED_DOMAIN = 'ankhezar.github.io';

export const TAB_CANONICAL_SLUGS = {
  si: 'slovenia',
  hr: 'croatia',
  it: 'italy',
  at: 'austria',
  hu: 'hungary',
  pl: 'poland',
  cz: 'czechia',
  sk: 'slovakia',
  es: 'spain',
  compare: 'compare'
};

export const TAB_CANONICAL_TITLES = {
  si: 'NettoEU — Slovenia (Normiranec S.P. 2026)',
  hr: 'NettoEU — Croatia (Paušalni obrt 2026)',
  it: 'NettoEU — Italy (Regime Forfettario 2026)',
  at: 'NettoEU — Austria (Einzelunternehmen 2026)',
  hu: 'NettoEU — Hungary (Átalányadó & KATA 2026)',
  pl: 'NettoEU — Poland (JDG B2B 2026)',
  cz: 'NettoEU — Czechia (OSVČ 2026)',
  sk: 'NettoEU — Slovakia (SZČO 2026)',
  es: 'NettoEU — Spain (Autónomo 2026)',
  compare: 'NettoEU — Compare All 9 EU Countries (2026)'
};

const ALLOWED_EVENT_KEYS = new Set(['tab', 'lang', 'view', 'regime', 'region', 'client']);

/**
 * Builds a clean canonical path for virtual SPA tab navigation without query strings or hashes.
 * Automatically preserves the `/si.tax.calculator` base path on GitHub Pages while supporting
 * root-domain hosting if a custom domain is attached later.
 */
export function buildCanonicalTabPath(tabCode, currentPathname = '/') {
  const slug = TAB_CANONICAL_SLUGS[tabCode] || TAB_CANONICAL_SLUGS.si;
  const cleanPath = String(currentPathname || '/').split(/[?#]/)[0];
  const basePrefix = cleanPath.startsWith('/si.tax.calculator') ? '/si.tax.calculator' : '';
  return `${basePrefix}/${slug}/`;
}

/**
 * Strips any non-allowlisted or financial fields so personal tax simulations never leave the browser.
 */
export function sanitizeEventProps(data = {}) {
  const clean = {};
  if (!data || typeof data !== 'object') return clean;
  for (const [k, v] of Object.entries(data)) {
    if (ALLOWED_EVENT_KEYS.has(k) && (typeof v === 'string' || typeof v === 'boolean')) {
      clean[k] = String(v).slice(0, 32);
    }
  }
  return clean;
}

function resolveTracker(explicitTracker) {
  if (explicitTracker && typeof explicitTracker.track === 'function') {
    return explicitTracker;
  }
  if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
    return window.umami;
  }
  return null;
}

/**
 * Records a virtual SPA pageview in Umami when the user switches country tabs or Compare All.
 */
export function trackTabPageview(tabCode, { tracker, pathname } = {}) {
  const umami = resolveTracker(tracker);
  if (!umami) return false;

  const currentPathname =
    pathname !== undefined
      ? pathname
      : typeof window !== 'undefined' && window.location
        ? window.location.pathname
        : '/';

  const url = buildCanonicalTabPath(tabCode, currentPathname);
  const title = TAB_CANONICAL_TITLES[tabCode] || 'NettoEU';

  try {
    umami.track(props => ({
      ...props,
      url,
      title
    }));
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Records a lightweight, non-PII UI interaction event in Umami.
 */
export function trackEvent(eventName, data = {}, { tracker } = {}) {
  if (!eventName || typeof eventName !== 'string') return false;
  const umami = resolveTracker(tracker);
  if (!umami) return false;

  const cleanProps = sanitizeEventProps(data);
  try {
    if (Object.keys(cleanProps).length > 0) {
      umami.track(eventName, cleanProps);
    } else {
      umami.track(eventName);
    }
    return true;
  } catch (_) {
    return false;
  }
}
