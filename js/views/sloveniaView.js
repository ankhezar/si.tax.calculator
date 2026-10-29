/**
 * Slovenia View — 2026 Normiranec Tax Suite
 * Supports 3-way Regime Mode:
 *   1. 'zpzr'    — Current Law in Force (ZPZR + ZPZR-A 2026)
 *   2. 'ziurs'   — Contested Legislative Proposal (ZIURS — Dec 6, 2026 Referendum)
 *   3. 'compare' — Side-by-Side Now vs. Proposed Ledger + Interactive SVG Burden Curve
 */

import { compareSloveniaRegimes } from '../engines/slovenia.js';
import { META_COMPARISON_2026 } from '../data/metaComparison.js';
import { t } from '../i18n/index.js';
import { round2, fmtEur, fmtEurShort, fmtSignedEur, fmtPct, fmtSignedPct } from '../utils/format.js';
import { reconcileSlovenia } from '../utils/reconcile.js';
import { tipAttrs } from '../utils/tooltip.js';
import { renderCountryPanelHead, renderHeroAllocation, renderFamilyControls } from './components.js';

function renderSvgComparisonChart(cmp, currentRev, lang) {
  const pts = cmp.curvePoints;
  const maxX = cmp.maxChartRev;
  const maxY = 60; // 0% to 60% effective total burden

  const W = 680;
  const H = 236;
  const padL = 44;
  const padR = 18;
  const padT = 18;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xOf = rev => padL + Math.min(1, Math.max(0, rev / maxX)) * plotW;
  const yOf = pct => padT + (1 - Math.min(1, Math.max(0, pct / maxY))) * plotH;

  // Start curve at 15,000 € so fixed-contribution asymptote near 0 € doesn't distort the y-scale
  const validPts = pts.filter(p => p.revenue >= 15000);

  const zpzrLine = validPts
    .map(p => `${xOf(p.revenue).toFixed(1)},${yOf(p.zpzrEffPct).toFixed(1)}`)
    .join(' ');
  const ziursLine = validPts
    .map(p => `${xOf(p.revenue).toFixed(1)},${yOf(p.ziursEffPct).toFixed(1)}`)
    .join(' ');

  const areaPoints = [
    ...validPts.map(p => `${xOf(p.revenue).toFixed(1)},${yOf(p.zpzrEffPct).toFixed(1)}`),
    ...[...validPts].reverse().map(p => `${xOf(p.revenue).toFixed(1)},${yOf(p.ziursEffPct).toFixed(1)}`)
  ].join(' ');

  const yTicks = [0, 15, 30, 45, 60];
  const xStep = maxX <= 90000 ? 20000 : 30000;
  const xTicks = [];
  for (let x = 0; x <= maxX; x += xStep) xTicks.push(x);

  const zpzrLimX = xOf(cmp.zpzr.taxData.limit);
  const ziursLimX = xOf(cmp.ziurs.taxData.limit);

  const clampedCur = Math.min(maxX, Math.max(15000, currentRev));
  const curX = xOf(clampedCur);
  const curZpzrY = yOf(cmp.zpzr.effectiveRatePct);
  const curZiursY = yOf(cmp.ziurs.effectiveRatePct);

  return `
    <section class="panel-card chart-card">
      <div class="chart-header">
        <h3 class="card-heading">${t(lang, 'chart_title')}</h3>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-dot zpzr"></span>${t(lang, 'chart_legend_zpzr')}</span>
          <span class="legend-item"><span class="legend-dot ziurs"></span>${t(lang, 'chart_legend_ziurs')}</span>
        </div>
      </div>
      <svg id="si-burden-svg" class="burden-svg" viewBox="0 0 ${W} ${H}" data-max-rev="${maxX}" data-pad-l="${padL}" data-plot-w="${plotW}" tabindex="0" role="slider" aria-label="${t(lang, 'chart_title')}" aria-valuemin="0" aria-valuemax="${maxX}" aria-valuenow="${Math.round(currentRev)}" aria-valuetext="${t(lang, 'svg_chart_valuetext', {
        rev: fmtEur(currentRev, lang),
        zpzr: fmtPct(cmp.zpzr.effectiveRatePct, lang),
        ziurs: fmtPct(cmp.ziurs.effectiveRatePct, lang)
      })}">
        <defs>
          <linearGradient id="ziursGainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.04" />
          </linearGradient>
        </defs>

        ${yTicks
          .map(
            yv => `
          <line x1="${padL}" y1="${yOf(yv)}" x2="${W - padR}" y2="${yOf(yv)}" class="svg-grid" />
          <text x="${padL - 8}" y="${yOf(yv) + 4}" class="svg-axis-lbl" text-anchor="end">${yv}%</text>
        `
          )
          .join('')}

        ${xTicks
          .map(
            xv => `
          <text x="${xOf(xv)}" y="${H - 10}" class="svg-axis-lbl" text-anchor="middle">${Math.round(xv / 1000)}k €</text>
        `
          )
          .join('')}

        <line x1="${zpzrLimX}" y1="${padT}" x2="${zpzrLimX}" y2="${padT + plotH}" class="svg-limit-zpzr" />
        <text x="${zpzrLimX - 5}" y="${padT + 11}" class="svg-limit-txt zpzr" text-anchor="end">${Math.round(cmp.zpzr.taxData.limit / 1000)}k</text>

        <line x1="${ziursLimX}" y1="${padT}" x2="${ziursLimX}" y2="${padT + plotH}" class="svg-limit-ziurs" />
        <text x="${ziursLimX - 5}" y="${padT + 11}" class="svg-limit-txt ziurs" text-anchor="end">${Math.round(cmp.ziurs.taxData.limit / 1000)}k</text>

        <polygon points="${areaPoints}" fill="url(#ziursGainGrad)" />

        <polyline points="${zpzrLine}" fill="none" class="svg-line-zpzr" />
        <polyline points="${ziursLine}" fill="none" class="svg-line-ziurs" />

        ${
          currentRev >= 15000 && currentRev <= maxX
            ? `
          <line x1="${curX}" y1="${padT}" x2="${curX}" y2="${padT + plotH}" class="svg-active-line" />
          <circle cx="${curX}" cy="${curZpzrY}" r="4.5" class="svg-dot-zpzr" />
          <circle cx="${curX}" cy="${curZiursY}" r="4.5" class="svg-dot-ziurs" />
        `
            : ''
        }
      </svg>
    </section>
  `;
}

export function renderSloveniaView(state) {
  const { lang, view, revenueEur, si } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const familyActive = (Number(fam.children) || 0) > 0 || Boolean(fam.dependentSpouse);
  const isMonthly = view === 'monthly';
  const div = isMonthly ? 12 : 1;
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const profile = META_COMPARISON_2026.countryProfiles.si;

  const cmp = compareSloveniaRegimes({
    revenue: revenueEur,
    mode: si.mode,
    avgSalary: si.avgSalary,
    status: si.status,
    baseMethod: si.baseMethod,
    manualBase: si.manualBase,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });

  const dispZpzr = reconcileSlovenia(cmp.zpzr, view);
  const dispZiurs = reconcileSlovenia(cmp.ziurs, view);

  const activeRegimeKey = si.regimeView === 'ziurs' ? 'ziurs' : 'zpzr';
  const res = cmp[activeRegimeKey];
  const disp = activeRegimeKey === 'ziurs' ? dispZiurs : dispZpzr;

  si.lastAutoBase = res.autoBaseUsed;

  const expTipKey =
    activeRegimeKey === 'ziurs'
      ? si.mode === 'pop'
        ? 'desc_exp_ziurs_pop'
        : 'desc_exp_ziurs_polni'
      : si.mode === 'pop'
        ? 'desc_exp_zpzr_pop'
        : 'desc_exp_zpzr_polni';

  const netDiffPeriod = round2(dispZiurs.net - dispZpzr.net);
  const teaserKey = isMonthly ? 'si_teaser_gain_mo' : 'si_teaser_gain';
  const teaserText =
    Math.abs(cmp.delta.netDiff) >= 1
      ? t(lang, teaserKey, { diff: fmtSignedEur(netDiffPeriod, lang, 0) })
      : t(lang, 'si_teaser_same');

  // Top Regime Segmented Bar
  const regimeBarHtml = `
    <div class="regime-bar" role="group" aria-label="${t(lang, 'aria_si_regime_group')}">
      <button type="button" class="regime-pill ${si.regimeView === 'zpzr' ? 'active' : ''}" data-action="si-regime" data-val="zpzr" aria-pressed="${si.regimeView === 'zpzr'}">
        ${t(lang, 'si_reg_zpzr')}
      </button>
      <button type="button" class="regime-pill ${si.regimeView === 'ziurs' ? 'active' : ''}" data-action="si-regime" data-val="ziurs" aria-pressed="${si.regimeView === 'ziurs'}">
        ${t(lang, 'si_reg_ziurs')}
      </button>
      <button type="button" class="regime-pill ${si.regimeView === 'compare' ? 'active' : ''}" data-action="si-regime" data-val="compare" aria-pressed="${si.regimeView === 'compare'}">
        ${t(lang, 'si_reg_compare')}
      </button>
    </div>
  `;

  // Employment Mode Segmented Switch (Full-time / Afternoon) with aligned right-edge (?) trigger
  const modeToggleHtml = `
    <div class="form-group">
      <div class="label-row">
        <span>${t(lang, 'lbl_sp_type')}</span>
        <button type="button" class="info-trigger" data-tip-key="desc_sp_mode" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_sp_type') })}">?</button>
      </div>
      <div class="seg-control" role="group" aria-label="${t(lang, 'lbl_sp_type')}">
        <button type="button" class="seg-option ${si.mode === 'polni' ? 'active' : ''}" data-action="si-mode" data-val="polni" aria-pressed="${si.mode === 'polni'}">
          <span>${t(lang, 'full_sp')}</span>
        </button>
        <button type="button" class="seg-option ${si.mode === 'pop' ? 'active' : ''}" data-action="si-mode" data-val="pop" aria-pressed="${si.mode === 'pop'}">
          <span>${t(lang, 'pop_sp')}</span>
        </button>
      </div>
    </div>
  `;

  // Form Controls (reusable in vertical config sidebar or horizontal compare bar)
  const salaryGroupHtml = `
    <div class="form-group">
      <div class="label-row">
        <span class="lbl-with-link">
          <label for="si-avg-salary">${t(lang, 'label_salary')}</label>
          <a href="https://www.stat.si/StatWeb/Field/Index/15" target="_blank" rel="noopener" class="source-link">SURS ↗&#xFE0E;</a>
        </span>
        <button type="button" class="info-trigger" data-tip-key="desc_salary" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'label_salary') })}">?</button>
      </div>
      <div class="input-wrapper">
        <input type="number" id="si-avg-salary" class="form-control num-tabular" value="${si.avgSalary}" min="500" step="any" data-step="50" data-input="si-avg-salary">
        <div class="spinner-group">
          <button type="button" class="spin-btn" data-step-target="si-avg-salary" data-step-dir="-1" aria-label="${t(lang, 'aria_decrease', { label: t(lang, 'label_salary') })}">−</button>
          <button type="button" class="spin-btn" data-step-target="si-avg-salary" data-step-dir="1" aria-label="${t(lang, 'aria_increase', { label: t(lang, 'label_salary') })}">+</button>
        </div>
      </div>
    </div>
  `;

  const statusGroupHtml =
    si.mode === 'polni'
      ? `
    <div class="form-group">
      <div class="label-row">
        <label for="si-status">${t(lang, 'label_status')}</label>
        <button type="button" class="info-trigger" data-tip-key="desc_status" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'label_status') })}">?</button>
      </div>
      <select id="si-status" class="form-control" data-change="si-status">
        <option value="y1" ${si.status === 'y1' ? 'selected' : ''}>${t(lang, 'opt_y1')}</option>
        <option value="y2" ${si.status === 'y2' ? 'selected' : ''}>${t(lang, 'opt_y2')}</option>
        <option value="y3" ${si.status === 'y3' ? 'selected' : ''}>${t(lang, 'opt_y3')}</option>
        <option value="steady" ${si.status === 'steady' ? 'selected' : ''}>${t(lang, 'opt_steady')}</option>
      </select>
    </div>
  `
      : '';

  const baseTypeGroupHtml =
    si.mode === 'polni'
      ? `
    <div class="form-group">
      <div class="label-row">
        <span class="lbl-with-link">
          <label for="si-base-type">${t(lang, 'label_base')}</label>
          <a href="https://www.fu.gov.si/davki_in_druge_dajatve/podrocja/prispevki_za_socialno_varnost/osnove_za_placilo_ter_zneski_prispevkov_za_socialno_varnost/" target="_blank" rel="noopener" class="source-link">FURS ↗&#xFE0E;</a>
        </span>
        <button type="button" class="info-trigger" data-tip-key="desc_base" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'label_base') })}">?</button>
      </div>
      <select id="si-base-type" class="form-control" data-change="si-base-type">
        <option value="auto" ${si.baseMethod === 'auto' ? 'selected' : ''}>${t(lang, 'opt_real')}</option>
        <option value="manual" ${si.baseMethod === 'manual' ? 'selected' : ''}>${t(lang, 'opt_man')}</option>
      </select>
    </div>
  `
      : '';

  const manualBaseGroupHtml =
    si.mode === 'polni' && si.baseMethod === 'manual'
      ? `
    <div class="form-group">
      <div class="label-row">
        <label for="si-manual-base">${t(lang, 'label_man_month')}</label>
        <span class="label-meta">
          <span class="badge num-tabular">${fmtEur(res.limits.min, lang)} – ${fmtEur(res.limits.max, lang)}</span>
          <button type="button" class="info-trigger" data-tip-key="desc_si_man_base" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'label_man_month') })}">?</button>
        </span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="si-manual-base" class="form-control num-tabular" value="${si.manualBase}" min="0" step="any" data-step="50" data-input="si-manual-base">
        <div class="spinner-group">
          <button type="button" class="spin-btn" data-step-target="si-manual-base" data-step-dir="-1" aria-label="${t(lang, 'aria_decrease', { label: t(lang, 'label_man_month') })}">−</button>
          <button type="button" class="spin-btn" data-step-target="si-manual-base" data-step-dir="1" aria-label="${t(lang, 'aria_increase', { label: t(lang, 'label_man_month') })}">+</button>
        </div>
      </div>
    </div>
  `
      : '';

  const familyGroupHtml = renderFamilyControls(state, 'desc_si_family', 'si-fam');
  const familyNoteHtml = familyActive
    ? `<div class="callout-banner advisory compact">${t(lang, 'si_family_note')}</div>`
    : '';

  // --- Side-by-Side Comparison Mode ('compare') ---
  if (si.regimeView === 'compare') {
    const a = cmp.zpzr;
    const b = cmp.ziurs;
    const d = cmp.delta;

    const expDiff = round2(dispZiurs.expenses - dispZpzr.expenses);
    const baseDiff = round2(dispZiurs.taxBase - dispZpzr.taxBase);
    const taxDiff = round2(dispZiurs.tax - dispZpzr.tax);
    const socDiff = round2(dispZiurs.social - dispZpzr.social);
    const netDiff = round2(dispZiurs.net - dispZpzr.net);

    const deltaClass = (val, invertGood = false) => {
      if (Math.abs(val) < 0.005) return 'neutral';
      const isGood = invertGood ? val < 0 : val > 0;
      return isGood ? 'pos' : 'neg';
    };

    const limZpzrTxt = t(lang, si.mode === 'pop' ? 'cmp_limit_pop_zpzr' : 'cmp_limit_polni_zpzr');
    const limZiursTxt = t(lang, si.mode === 'pop' ? 'cmp_limit_pop_ziurs' : 'cmp_limit_polni_ziurs');
    const cmpItemsCount = si.mode === 'pop' ? 3 : si.baseMethod === 'manual' ? 6 : 5;

    return `
      <div class="regime-top-row">
        ${regimeBarHtml}
      </div>

      <section class="panel-card compare-config-card">
        ${renderCountryPanelHead({
          countryCode: 'si',
          countryName: t(lang, 'nav_si'),
          regimeSubtitle: t(lang, 'cmp_si_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl,
          wide: true
        })}

        <div class="callout-banner amber">${t(lang, 'si_referendum_banner')}</div>
        ${familyNoteHtml}

        <div class="compare-inputs-row items-${cmpItemsCount}">
          ${modeToggleHtml}
          ${salaryGroupHtml}
          ${statusGroupHtml}
          ${baseTypeGroupHtml}
          ${manualBaseGroupHtml}
          ${familyGroupHtml}
        </div>
      </section>

      <section class="cmp-hero-grid">
        <div class="panel-card cmp-kpi-card">
          <span class="overline">${t(lang, 'cmp_col_now')}</span>
          <div class="cmp-kpi-val num-tabular">${fmtEur(dispZpzr.net, lang)}</div>
          <div class="cmp-kpi-meta">
            <span>${t(lang, 'lbl_eff_rate')}: <strong class="num-tabular">${fmtPct(a.effectiveRatePct, lang)}</strong></span>
            <button type="button" class="badge num-tabular has-tip" ${tipAttrs('tip_si_cap_zpzr', { limit: fmtEur(a.taxData.limit, lang) }, 'si-cap-zpzr')}>${fmtEurShort(a.taxData.limit, lang)}</button>
          </div>
        </div>

        <div class="panel-card cmp-kpi-card featured">
          <span class="overline">${t(lang, 'cmp_col_ziurs')}</span>
          <div class="cmp-kpi-val num-tabular text-emerald">${fmtEur(dispZiurs.net, lang)}</div>
          <div class="cmp-kpi-meta">
            <span>${t(lang, 'lbl_eff_rate')}: <strong class="num-tabular">${fmtPct(b.effectiveRatePct, lang)}</strong></span>
            <button type="button" class="badge success num-tabular has-tip" ${tipAttrs('tip_si_cap_ziurs', { limit: fmtEur(b.taxData.limit, lang) }, 'si-cap-ziurs')}>${fmtEurShort(b.taxData.limit, lang)}</button>
          </div>
        </div>

        <div class="panel-card cmp-kpi-card delta-card ${deltaClass(netDiff)}">
          <span class="overline">${t(lang, 'cmp_col_diff')}</span>
          <div class="cmp-kpi-val num-tabular">${fmtSignedEur(netDiff, lang, 2)}</div>
          <div class="cmp-kpi-meta">
            <span>${t(lang, 'lbl_eff_rate')}: <strong class="num-tabular">${fmtSignedPct(d.effectiveRateDiff, lang)}</strong></span>
            <button type="button" class="delta-pill pos num-tabular has-tip" ${tipAttrs('tip_si_cap_diff', { diff: fmtEur(b.taxData.limit - a.taxData.limit, lang) }, 'si-cap-diff')}>+${fmtEurShort(b.taxData.limit - a.taxData.limit, lang)}</button>
          </div>
        </div>
      </section>

      <section class="panel-card table-card">
        <div class="table-scroll">
          <table class="fintech-table si-cmp-table">
            <caption class="sr-only">${t(lang, 'tbl_si_cmp_caption')}</caption>
            <thead>
              <tr>
                <th scope="col">${t(lang, 'cmp_col_metric')}</th>
                <th scope="col" class="num">${t(lang, 'cmp_col_now')}</th>
                <th scope="col" class="num highlight-col">${t(lang, 'cmp_col_ziurs')}</th>
                <th scope="col" class="num">${t(lang, 'cmp_col_diff')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${t(lang, 'cmp_row_limit')}</td>
                <td class="num">${limZpzrTxt}</td>
                <td class="num highlight-col"><strong>${limZiursTxt}</strong></td>
                <td class="num"><span class="delta-pill pos num-tabular">+${fmtEurShort(b.taxData.limit - a.taxData.limit, lang)}</span></td>
              </tr>
              <tr>
                <td>${grossLabel}</td>
                <td class="num num-tabular">${fmtEur(dispZpzr.gross, lang)}</td>
                <td class="num num-tabular highlight-col">${fmtEur(dispZiurs.gross, lang)}</td>
                <td class="num"><span class="delta-pill neutral num-tabular">${fmtSignedEur(0, lang, 2)}</span></td>
              </tr>
              <tr>
                <td>${t(lang, 'res_expenses')}</td>
                <td class="num num-tabular">${fmtEur(dispZpzr.expenses, lang)}</td>
                <td class="num num-tabular highlight-col">${fmtEur(dispZiurs.expenses, lang)}</td>
                <td class="num"><span class="delta-pill ${deltaClass(expDiff)} num-tabular">${fmtSignedEur(expDiff, lang, 2)}</span></td>
              </tr>
              <tr>
                <td>${t(lang, 'res_base')}</td>
                <td class="num num-tabular">${fmtEur(dispZpzr.taxBase, lang)}</td>
                <td class="num num-tabular highlight-col">${fmtEur(dispZiurs.taxBase, lang)}</td>
                <td class="num"><span class="delta-pill ${deltaClass(baseDiff, true)} num-tabular">${fmtSignedEur(baseDiff, lang, 2)}</span></td>
              </tr>
              <tr>
                <td>${t(lang, 'res_dohodnina')}</td>
                <td class="num num-tabular">${fmtEur(dispZpzr.tax, lang)}</td>
                <td class="num num-tabular highlight-col">${fmtEur(dispZiurs.tax, lang)}</td>
                <td class="num"><span class="delta-pill ${deltaClass(taxDiff, true)} num-tabular">${fmtSignedEur(taxDiff, lang, 2)}</span></td>
              </tr>
              <tr>
                <td>${t(lang, 'res_soc')}</td>
                <td class="num num-tabular">${fmtEur(dispZpzr.social, lang)}</td>
                <td class="num num-tabular highlight-col">${fmtEur(dispZiurs.social, lang)}</td>
                <td class="num"><span class="delta-pill ${deltaClass(socDiff, true)} num-tabular">${fmtSignedEur(socDiff, lang, 2)}</span></td>
              </tr>
              <tr class="total-row">
                <td><strong>${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</strong></td>
                <td class="num num-tabular strong">${fmtEur(dispZpzr.net, lang)}</td>
                <td class="num num-tabular strong text-emerald highlight-col">${fmtEur(dispZiurs.net, lang)}</td>
                <td class="num"><span class="delta-pill ${deltaClass(netDiff)} strong num-tabular">${fmtSignedEur(netDiff, lang, 2)}</span></td>
              </tr>
              <tr>
                <td>${t(lang, 'lbl_eff_rate')}</td>
                <td class="num num-tabular">${fmtPct(a.effectiveRatePct, lang)}</td>
                <td class="num num-tabular highlight-col">${fmtPct(b.effectiveRatePct, lang)}</td>
                <td class="num"><span class="delta-pill ${deltaClass(d.effectiveRateDiff, true)} num-tabular">${fmtSignedPct(d.effectiveRateDiff, lang)}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      ${renderSvgComparisonChart(cmp, revenueEur, lang)}
    `;
  }

  // --- Single Regime View ('zpzr' or 'ziurs') ---
  const soc = res.socData;
  const td = res.taxData;

  const breachBannerHtml = td.isBreach
    ? `<div class="callout-banner danger">${t(lang, 'alert_si_breach', { limit: td.limit.toLocaleString() })}</div>`
    : '';

  const ziursCalloutHtml =
    si.regimeView === 'ziurs'
      ? `<div class="callout-banner amber">${t(lang, 'si_referendum_banner')}</div>`
      : `<button type="button" class="ziurs-teaser-btn ${cmp.delta.netDiff > 0 ? 'gain' : ''}" data-action="si-regime" data-val="compare">
          <span class="status-dot ${cmp.delta.netDiff > 0 ? 'emerald' : 'neutral'}"></span>
          <span>${teaserText}</span>
         </button>`;

  const projectionHtml =
    res.projection && si.mode === 'polni'
      ? `
      <section class="panel-card trajectory-card">
        <div class="trajectory-header">
          <h3 class="card-heading">${t(lang, 'proj_title')}</h3>
          <button type="button" class="info-trigger" data-tip-key="desc_proj" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'proj_title') })}">?</button>
        </div>
        <div class="trajectory-grid">
          ${res.projection.columns
            .map(col => {
              const yearLbl = `${col.yearNumber}. ${t(lang, 'lbl_year')}${col.isPlus ? '+' : ''}`;
              let diffHtml = '';
              if (col.isActive) {
                diffHtml = `<span class="traj-tag current">${t(lang, 'label_here')}</span>`;
              } else if (col.colIndex > 0) {
                if (col.isStable) {
                  diffHtml = `<span class="traj-tag neutral">=</span>`;
                } else {
                  const cls = col.diffEur < 0 ? 'neg' : 'neutral';
                  diffHtml = `<span class="traj-tag ${cls} num-tabular">${fmtSignedPct(col.diffPct, lang)}</span>`;
                }
              }

              const colSocPeriod = round2(col.socAnnual / div);
              const colNetPeriod = round2(disp.gross - disp.tax - colSocPeriod);
              const barPct = disp.gross > 0 ? Math.min(100, Math.max(4, (colNetPeriod / disp.gross) * 100)) : 0;

              return `
                <div class="traj-step ${col.isActive ? 'current' : ''}">
                  <div class="traj-top">
                    <span class="traj-year">${yearLbl}</span>
                    ${diffHtml}
                  </div>
                  <div class="traj-net num-tabular">${fmtEurShort(colNetPeriod, lang)}</div>
                  <div class="traj-bar-track"><div class="traj-bar-fill" style="width:${barPct.toFixed(1)}%"></div></div>
                  <div class="traj-sub num-tabular">
                    <span>Soc ${fmtEurShort(colSocPeriod, lang)}</span>
                    ${col.isMin ? `<span class="micro-badge">${t(lang, 'badge_min')}</span>` : ''}
                    ${col.isMax ? `<span class="micro-badge warn">${t(lang, 'badge_max')}</span>` : ''}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </section>
    `
      : '';

  return `
    <div class="regime-top-row">
      ${regimeBarHtml}
    </div>

    <div class="calc-workspace">
      <!-- Left Column: Configuration Parameters -->
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'si',
          countryName: t(lang, 'nav_si'),
          regimeSubtitle: `Normiranec · ${t(lang, si.regimeView === 'ziurs' ? 'si_reg_ziurs' : 'si_reg_zpzr')}`,
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          ${modeToggleHtml}
          ${salaryGroupHtml}
          ${statusGroupHtml}
          ${baseTypeGroupHtml}
          ${manualBaseGroupHtml}
          ${familyGroupHtml}
        </div>

        <div class="config-footer">
          ${ziursCalloutHtml}
        </div>
      </aside>

      <!-- Right Column: Hero Net Allocation & Financial Ledger -->
      <section class="panel-card statement-panel">
        ${renderHeroAllocation({
          lang,
          isMonthly,
          gross: disp.gross,
          net: disp.net,
          tax: disp.tax,
          social: disp.social,
          totalPaid: disp.totalPaid,
          effectiveRatePct: res.effectiveRatePct
        })}

        ${breachBannerHtml}
        ${familyNoteHtml}

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'res_expenses')}</span>
              <span class="badge ${td.isBreach ? 'warn' : ''} num-tabular">${td.isBreach ? t(lang, 'badge_limit') : fmtPct(td.expenseSharePct, lang)}</span>
              <button type="button" class="info-trigger" data-tip-key="${expTipKey}" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_dohodnina')}</span>
              <span class="badge ${td.isBreach ? 'danger' : ''} num-tabular">${fmtPct(td.effectiveTaxPct, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')}</span>
              ${soc.pizDiscountPct > 0 ? `<span class="badge success num-tabular">-${soc.pizDiscountPct}% PIZ</span>` : ''}
              ${soc.isMin ? `<span class="badge">${t(lang, 'badge_min')}</span>` : ''}
              ${soc.isMax ? `<span class="badge warn">${t(lang, 'badge_max')}</span>` : ''}
              <span class="badge num-tabular">${fmtPct(res.socialSharePct, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
          </div>

          <div class="ledger-sub">
            ${
              si.mode === 'polni'
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'det_base')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.insBase, lang)}</span>
              </div>
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'det_main_polni')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.socMain, lang)}</span>
              </div>
            `
                : `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'det_main_pop')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.socMain, lang)}</span>
              </div>
            `
            }

            <div class="ledger-row sub">
              <span class="ledger-lbl">
                <span>${t(lang, 'lbl_do')}</span>
                <button type="button" class="info-trigger small" data-tip-key="desc_do" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_do') })}">?</button>
              </span>
              <span class="ledger-val num-tabular">${fmtEur(disp.socDo, lang)}</span>
            </div>

            ${
              si.mode === 'polni'
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">
                  <span>${t(lang, 'lbl_ozp')}</span>
                  <button type="button" class="info-trigger small" data-tip-key="desc_ozp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_ozp') })}">?</button>
                </span>
                <span class="ledger-val num-tabular">${fmtEur(disp.socOzp, lang)}</span>
              </div>
            `
                : ''
            }

            ${
              disp.socSpouseOzp > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">
                  <span>${t(lang, 'lbl_spouse_ozp')}</span>
                  <button type="button" class="info-trigger small" data-tip-key="desc_si_family" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_spouse_ozp') })}">?</button>
                </span>
                <span class="ledger-val num-tabular">${fmtEur(disp.socSpouseOzp, lang)}</span>
              </div>
            `
                : ''
            }
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)}</span>
          </div>
        </div>
      </section>
    </div>

    ${projectionHtml}
  `;
}
