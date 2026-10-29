/**
 * Minimal, purposeful vector iconography:
 * 1. Flat geometric country flag micro-badges (zero 3D OS emoji gloss).
 * 2. Strictly functional 1.5px-stroke UI utility icons (share, check, theme).
 */

const FLAGS = {
  si: `<svg class="country-flag flag-si" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="4.34" fill="#ffffff"/>
    <rect y="4.33" width="18" height="4.34" fill="#005ce6"/>
    <rect y="8.66" width="18" height="4.34" fill="#e11d48"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  hr: `<svg class="country-flag flag-hr" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="4.34" fill="#dc2626"/>
    <rect y="4.33" width="18" height="4.34" fill="#ffffff"/>
    <rect y="8.66" width="18" height="4.34" fill="#1d4ed8"/>
    <rect x="7.4" y="4.1" width="3.2" height="3.8" rx="0.7" fill="#dc2626"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  it: `<svg class="country-flag flag-it" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="6" height="13" fill="#059669"/>
    <rect x="6" width="6" height="13" fill="#ffffff"/>
    <rect x="12" width="6" height="13" fill="#dc2626"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  at: `<svg class="country-flag flag-at" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="4.34" fill="#dc2626"/>
    <rect y="4.33" width="18" height="4.34" fill="#ffffff"/>
    <rect y="8.66" width="18" height="4.34" fill="#dc2626"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  hu: `<svg class="country-flag flag-hu" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="4.34" fill="#dc2626"/>
    <rect y="4.33" width="18" height="4.34" fill="#ffffff"/>
    <rect y="8.66" width="18" height="4.34" fill="#15803d"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  pl: `<svg class="country-flag flag-pl" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="6.5" fill="#ffffff"/>
    <rect y="6.5" width="18" height="6.5" fill="#dc2626"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  cz: `<svg class="country-flag flag-cz" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="6.5" fill="#ffffff"/>
    <rect y="6.5" width="18" height="6.5" fill="#dc2626"/>
    <polygon points="0,0 8.6,6.5 0,13" fill="#1d4ed8"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  sk: `<svg class="country-flag flag-sk" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="4.34" fill="#ffffff"/>
    <rect y="4.33" width="18" height="4.34" fill="#1d4ed8"/>
    <rect y="8.66" width="18" height="4.34" fill="#dc2626"/>
    <rect x="3.4" y="3.8" width="3.3" height="4.4" rx="0.9" fill="#dc2626" stroke="#ffffff" stroke-width="0.5"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`,

  es: `<svg class="country-flag flag-es" viewBox="0 0 18 13" width="18" height="13" aria-hidden="true">
    <rect width="18" height="3.25" fill="#dc2626"/>
    <rect y="3.25" width="18" height="6.5" fill="#facc15"/>
    <rect y="9.75" width="18" height="3.25" fill="#dc2626"/>
    <rect x="3.8" y="4.8" width="2.2" height="3.4" rx="0.5" fill="#dc2626"/>
    <rect x="0.25" y="0.25" width="17.5" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.16" stroke-width="0.5"/>
  </svg>`
};

export function countryFlag(code) {
  return FLAGS[code] || '';
}

export const UI_ICONS = {
  share: `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.7 9.3a3.2 3.2 0 0 0 4.5 0l2.1-2.1a3.2 3.2 0 0 0-4.5-4.5L7.6 3.9"/><path d="M9.3 6.7a3.2 3.2 0 0 0-4.5 0L2.7 8.8a3.2 3.2 0 0 0 4.5 4.5l1.2-1.2"/></svg>`,
  check: `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.2 8.4 6.5 11.7 12.8 4.6"/></svg>`,
  sun: `<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.4M8 13.1v1.4M1.5 8h1.4M13.1 8h1.4M3.4 3.4l1 1M11.6 11.6l1 1M12.6 3.4l-1 1M4.4 11.6l-1 1"/></svg>`,
  moon: `<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.4 10.1A5.8 5.8 0 0 1 5.9 2.6a5.8 5.8 0 1 0 7.5 7.5Z"/></svg>`,
  externalLink: `<svg class="ext-icon" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.25 8.75 8.75 3.25"/><path d="M4.25 3.25h4.5v4.5"/></svg>`
};
