/**
 * Shared Fintech UI Primitives (Hero KPI Strip & Multi-Segment Revenue Allocation Bar)
 * Pure HTML renderers with zero decorative icons.
 */

import { t } from '../i18n/index.js';
import { fmtEur, fmtPct } from '../utils/format.js';

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

      <div class="alloc-bar" role="img" aria-label="Revenue allocation">
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
