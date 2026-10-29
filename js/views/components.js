/**
 * Shared Fintech UI Primitives (Hero KPI Strip & Multi-Segment Revenue Allocation Bar)
 * Pure HTML renderers with zero decorative icons.
 */

import { t } from '../i18n/index.js';
import { fmtEur, fmtPct } from '../utils/format.js';
import { countryFlag, UI_ICONS } from '../utils/icons.js';

export function renderCountryPanelHead({
  countryCode,
  countryName,
  regimeSubtitle,
  authorityName,
  authorityUrl,
  year = '2026',
  wide = false
}) {
  return `
    <header class="panel-head${wide ? ' panel-head-wide' : ''}">
      <div class="panel-head-main">
        <div class="country-flag-badge" aria-hidden="true">
          ${countryFlag(countryCode)}
        </div>
        <div class="panel-head-copy">
          <div class="panel-title-row">
            <h2 class="panel-title">${countryName}</h2>
            <span class="year-pill num-tabular">${year}</span>
          </div>
          <p class="panel-subtitle">${regimeSubtitle}</p>
        </div>
      </div>
      <a href="${authorityUrl}" target="_blank" rel="noopener" class="authority-chip" title="${authorityName}">
        <span class="authority-chip-label">${authorityName}</span>
        ${UI_ICONS.externalLink}
      </a>
    </header>
  `;
}

export function renderHeroAllocation({
  lang,
  isMonthly,
  gross,
  net,
  tax,
  social,
  totalPaid,
  effectiveRatePct,
  secondaryNetText = ''
}) {
  const hasRev = gross > 0;
  const keptPct = hasRev ? Math.max(0, (net / gross) * 100) : 0;
  const taxPct = hasRev ? Math.min(100, Math.max(0, (tax / gross) * 100)) : 0;
  const socPct = hasRev ? Math.min(100, Math.max(0, (social / gross) * 100)) : 0;
  const netBarPct = hasRev ? Math.max(0, 100 - taxPct - socPct) : 100;

  return `
    <div class="hero-kpi">
      <div class="hero-top">
        <div>
          <div class="overline">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</div>
          <div class="hero-net-row">
            <span class="hero-net-val num-tabular">${fmtEur(net, lang)}</span>
            ${secondaryNetText ? `<span class="hero-net-fx num-tabular">${secondaryNetText}</span>` : ''}
          </div>
        </div>
        <span class="kept-pill num-tabular">${t(lang, 'kpi_kept', { pct: fmtPct(keptPct, lang) })}</span>
      </div>

      <div class="alloc-bar" role="img" aria-label="${t(lang, 'aria_alloc_bar', {
        netPct: fmtPct(keptPct, lang),
        socPct: fmtPct(socPct, lang),
        taxPct: fmtPct(taxPct, lang)
      })}">
        ${netBarPct > 0.2 ? `<div class="alloc-seg net" style="width:${netBarPct.toFixed(2)}%"></div>` : ''}
        ${socPct > 0.2 ? `<div class="alloc-seg soc" style="width:${socPct.toFixed(2)}%"></div>` : ''}
        ${taxPct > 0.2 ? `<div class="alloc-seg tax" style="width:${taxPct.toFixed(2)}%"></div>` : ''}
      </div>

      <div class="kpi-mini-grid">
        <div class="kpi-mini">
          <span class="kpi-mini-lbl"><span class="dot net"></span>${t(lang, 'res_net')}</span>
          <span class="kpi-mini-val num-tabular">${fmtPct(keptPct, lang)}</span>
        </div>
        <div class="kpi-mini">
          <span class="kpi-mini-lbl"><span class="dot soc"></span>${t(lang, 'res_soc')}</span>
          <span class="kpi-mini-val num-tabular">${fmtEur(social, lang)} <small>(${fmtPct(socPct, lang)})</small></span>
        </div>
        <div class="kpi-mini">
          <span class="kpi-mini-lbl"><span class="dot tax"></span>${t(lang, 'res_tax')}</span>
          <span class="kpi-mini-val num-tabular">${fmtEur(tax, lang)} <small>(${fmtPct(taxPct, lang)})</small></span>
        </div>
        <div class="kpi-mini">
          <span class="kpi-mini-lbl">${t(lang, 'lbl_eff_rate')}</span>
          <span class="kpi-mini-val strong num-tabular">${fmtEur(totalPaid, lang)} <small>(${fmtPct(effectiveRatePct, lang)})</small></span>
        </div>
      </div>
    </div>
  `;
}

export function renderFamilyControls(state, tipKey = 'desc_family', idPrefix = 'fam') {
  const { lang } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const kids = Math.max(0, Math.min(4, Math.floor(Number(fam.children) || 0)));
  const hasSpouse = Boolean(fam.dependentSpouse);
  const kidsId = `${idPrefix}-children`;
  const spouseId = `${idPrefix}-spouse`;

  return `
    <div class="form-group">
      <div class="label-row">
        <span>${t(lang, 'fam_label')}</span>
        <button type="button" class="info-trigger" data-tip-key="${tipKey}" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'fam_label') })}">?</button>
      </div>
      <div class="family-dual-grid">
        <div>
          <label class="sr-only" for="${kidsId}">${t(lang, 'fam_kids_short')}</label>
          <select id="${kidsId}" class="form-control" data-change="fam-children" aria-label="${t(lang, 'fam_kids_short')}">
            <option value="0" ${kids === 0 ? 'selected' : ''}>${t(lang, 'fam_kids_0')}</option>
            <option value="1" ${kids === 1 ? 'selected' : ''}>${t(lang, 'fam_kids_1')}</option>
            <option value="2" ${kids === 2 ? 'selected' : ''}>${t(lang, 'fam_kids_2')}</option>
            <option value="3" ${kids === 3 ? 'selected' : ''}>${t(lang, 'fam_kids_3')}</option>
            <option value="4" ${kids === 4 ? 'selected' : ''}>${t(lang, 'fam_kids_4')}</option>
          </select>
        </div>
        <div>
          <label class="sr-only" for="${spouseId}">${t(lang, 'fam_spouse_short')}</label>
          <select id="${spouseId}" class="form-control" data-change="fam-spouse" aria-label="${t(lang, 'fam_spouse_short')}">
            <option value="0" ${!hasSpouse ? 'selected' : ''}>${t(lang, 'fam_spouse_none')}</option>
            <option value="1" ${hasSpouse ? 'selected' : ''}>${t(lang, 'fam_spouse_dep')}</option>
          </select>
        </div>
      </div>
    </div>
  `;
}
