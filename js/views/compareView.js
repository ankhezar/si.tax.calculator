/**
 * Cross-Border Compare All Arena & 6-Dimension Meta-Comparison View
 * Pure typographic + flat vector flag presentation (zero decorative emojis).
 */

import { evaluateCrossBorderArena } from '../engines/arena.js';
import { META_COMPARISON_2026 } from '../data/metaComparison.js';
import { t } from '../i18n/index.js';
import { round2, fmtEur, fmtEurShort, fmtSignedEur, fmtPct } from '../utils/format.js';
import { reconcileByCountry } from '../utils/reconcile.js';
import { countryFlag } from '../utils/icons.js';

const COUNTRY_NAME_KEYS = {
  si: 'nav_si',
  hr: 'nav_hr',
  it: 'nav_it',
  at: 'nav_at',
  hu: 'nav_hu'
};

const CHEVRON_SVG = `<svg class="acc-chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>`;

export function renderCompareView(state) {
  const { lang, view, compare } = state;
  const isMonthly = view === 'monthly';
  const div = isMonthly ? 12 : 1;
  const arena = evaluateCrossBorderArena(state);
  const baselineDisp = reconcileByCountry('si', arena.baselineSiNow.raw, view);

  const personaFiltersHtml = `
    <section class="panel-card persona-card">
      <div class="persona-top-row">
        <span class="persona-title-wrap">
          <span class="overline">${t(lang, 'persona_title')}</span>
          <button type="button" class="info-trigger" data-tip-key="desc_persona" aria-label="Info">?</button>
        </span>
        <div class="seg-mini-group">
          <button type="button" class="seg-mini-btn ${compare.personaMode === 'preset' ? 'active' : ''}" data-action="cmp-mode" data-val="preset">
            ${t(lang, 'persona_preset')}
          </button>
          <button type="button" class="seg-mini-btn ${compare.personaMode === 'custom' ? 'active' : ''}" data-action="cmp-mode" data-val="custom">
            ${t(lang, 'persona_custom')}
          </button>
        </div>
      </div>

      ${
        compare.personaMode === 'preset'
          ? `
        <div class="persona-chips-grid">
          <div class="seg-mini-group full-w">
            <button type="button" class="seg-mini-btn ${compare.employment === 'full' ? 'active' : ''}" data-action="cmp-emp" data-val="full">${t(lang, 'persona_full')}</button>
            <button type="button" class="seg-mini-btn ${compare.employment === 'side' ? 'active' : ''}" data-action="cmp-emp" data-val="side">${t(lang, 'persona_side')}</button>
          </div>
          <div class="seg-mini-group full-w">
            <button type="button" class="seg-mini-btn ${compare.stage === 'established' ? 'active' : ''}" data-action="cmp-stage" data-val="established">${t(lang, 'persona_est')}</button>
            <button type="button" class="seg-mini-btn ${compare.stage === 'new' ? 'active' : ''}" data-action="cmp-stage" data-val="new">${t(lang, 'persona_new')}</button>
          </div>
          <div class="seg-mini-group full-w">
            <button type="button" class="seg-mini-btn ${compare.clientType === 'b2b' ? 'active' : ''}" data-action="cmp-client" data-val="b2b">${t(lang, 'persona_b2b')}</button>
            <button type="button" class="seg-mini-btn ${compare.clientType === 'b2c' ? 'active' : ''}" data-action="cmp-client" data-val="b2c">${t(lang, 'persona_b2c')}</button>
          </div>
        </div>
        <div class="persona-context-note">
          ${t(lang, compare.clientType === 'b2c' ? 'persona_note_b2c' : 'persona_note_b2b')}
        </div>
      `
          : `
        <div class="persona-context-note">
          <div class="persona-custom-client-row">
            <span>${t(lang, 'persona_custom_note')}</span>
            <div class="seg-mini-group">
              <button type="button" class="seg-mini-btn ${compare.clientType === 'b2b' ? 'active' : ''}" data-action="cmp-client" data-val="b2b">${t(lang, 'persona_b2b')}</button>
              <button type="button" class="seg-mini-btn ${compare.clientType === 'b2c' ? 'active' : ''}" data-action="cmp-client" data-val="b2c">${t(lang, 'persona_b2c')}</button>
            </div>
          </div>
        </div>
      `
      }
    </section>
  `;

  const leaderboardRowsHtml = arena.ranked
    .map(item => {
      const countryName = t(lang, COUNTRY_NAME_KEYS[item.countryCode]);
      const barWidth = Math.min(100, Math.max(2, item.effectiveRatePct)).toFixed(1);
      const disp = reconcileByCountry(item.countryCode, item.raw, view);
      const diffPeriod = round2(disp.net - baselineDisp.net);
      const limitPeriod = round2(item.limit / div);
      const vatLimitPeriod = round2(item.vatThreshold / div);

      let statusBadge = `<span class="badge success"><span class="status-dot emerald"></span>${t(lang, 'badge_eligible')}</span>`;
      if (!item.isEligible) {
        if (item.disqualifiedReason === 'b2b_banned') {
          statusBadge = `<span class="badge danger"><span class="status-dot rose"></span>${t(lang, 'badge_b2c_only')}</span>`;
        } else if (item.disqualifiedReason === 'fulltime_only') {
          statusBadge = `<span class="badge danger"><span class="status-dot rose"></span>${t(lang, 'badge_fulltime_only')}</span>`;
        } else {
          statusBadge = `<span class="badge danger"><span class="status-dot rose"></span>${t(lang, 'badge_over_cap')} (${fmtEurShort(limitPeriod, lang)})</span>`;
        }
      } else if (item.isProposed) {
        statusBadge = `<span class="badge warn"><span class="status-dot amber"></span>${t(lang, 'arena_proposed_tag')}</span>`;
      }

      let b2cVatBadge = '';
      if (compare.clientType === 'b2c') {
        const vatThreshTxt = `${fmtEurShort(vatLimitPeriod, lang)}${isMonthly ? '/mo' : ''}`;
        b2cVatBadge = item.exceedsB2cVat
          ? `<span class="badge warn num-tabular">${t(lang, 'badge_b2c_vat_req', { rate: item.vatRatePct, limit: vatThreshTxt })}</span>`
          : `<span class="badge num-tabular">${t(lang, 'badge_b2c_vat_free', { limit: vatThreshTxt })}</span>`;
      }

      let diffBadge = `<span class="delta-pill neutral">${t(lang, 'arena_baseline')}</span>`;
      if (item.id !== 'si_zpzr') {
        const cls =
          Math.abs(diffPeriod) < 0.005 ? 'neutral' : diffPeriod > 0 ? 'pos' : 'neg';
        diffBadge = `<span class="delta-pill ${cls} num-tabular">${fmtSignedEur(diffPeriod, lang, 2)}</span>`;
      }

      const rankDisplay = item.rank
        ? `<span class="rank-badge ${item.rank === 1 ? 'top' : ''} num-tabular">${item.rank}</span>`
        : `<span class="rank-badge disqualified">—</span>`;

      return `
        <tr class="arena-row ${!item.isEligible ? 'ineligible-row' : ''} ${item.id === 'si_zpzr' ? 'baseline-row' : ''}">
          <td class="rank-cell">${rankDisplay}</td>
          <td>
            <div class="arena-country-cell">
              <span class="arena-flag">${countryFlag(item.countryCode)}</span>
              <div>
                <div class="arena-country-title">
                  <strong>${countryName}</strong>
                  ${statusBadge}
                  ${b2cVatBadge}
                </div>
                <div class="arena-regime-sub">
                  <span class="num-tabular">${item.regimeLabel} · Max ${fmtEurShort(limitPeriod, lang)}${isMonthly ? '/mo' : ''}</span>
                  <button type="button" class="link-jump" data-action="jump-tab" data-tab="${item.tabTarget}" data-si-reg="${item.siRegimeTarget || ''}" data-hu-reg="${item.huRegimeTarget || ''}">${t(lang, 'arena_open_calc')}</button>
                </div>
              </div>
            </div>
          </td>
          <td class="num num-tabular strong text-emerald arena-net">${fmtEur(disp.net, lang)}</td>
          <td class="num num-tabular">
            <div class="arena-paid-main">${fmtEur(disp.totalPaid, lang)}</div>
            <small class="muted-split">${t(lang, 'arena_tax_short')} ${fmtEur(disp.tax, lang)} · ${t(lang, 'arena_soc_short')} ${fmtEur(disp.social, lang)}</small>
          </td>
          <td class="num">
            <div class="eff-cell">
              <span class="num-tabular strong">${fmtPct(item.effectiveRatePct, lang)}</span>
              <div class="eff-bar-track"><div class="eff-bar-fill ${!item.isEligible ? 'danger' : ''}" style="width:${barWidth}%"></div></div>
            </div>
          </td>
          <td class="num">${diffBadge}</td>
        </tr>
      `;
    })
    .join('');

  // --- 6-Dimension Meta-Comparison Matrix ---
  const ratingLabel = r =>
    r === 'good'
      ? t(lang, 'rating_good')
      : r === 'strict'
        ? t(lang, 'rating_strict')
        : t(lang, 'rating_warn');

  const ratingDotColor = r => (r === 'good' ? 'emerald' : r === 'strict' ? 'rose' : 'amber');

  const matrixHtml = META_COMPARISON_2026.dimensions
    .map((dim, idx) => {
      const numStr = String(idx + 1).padStart(2, '0');
      const cols = ['si', 'hr', 'it', 'at', 'hu']
        .map(cc => {
          const cell = dim.cells[cc];
          return `
            <div class="meta-dim-cell ${cell.rating}">
              <div class="meta-cell-top">
                <span class="meta-cc">${countryFlag(cc)} <span>${t(lang, COUNTRY_NAME_KEYS[cc])}</span></span>
                <span class="rating-pill ${cell.rating}"><span class="status-dot ${ratingDotColor(cell.rating)}"></span>${ratingLabel(cell.rating)}</span>
              </div>
              <p>${cell[lang]}</p>
            </div>
          `;
        })
        .join('');

      return `
        <div class="meta-dim-block">
          <div class="meta-dim-header">
            <span class="dim-index num-tabular">${numStr}</span>
            <h4 class="meta-dim-title">${dim.title[lang]}</h4>
          </div>
          <div class="meta-dim-grid">${cols}</div>
        </div>
      `;
    })
    .join('');

  // --- Expandable Country Pros & Cons Summary Cards ---
  const countryCardsHtml = ['si', 'hr', 'it', 'at', 'hu']
    .map(cc => {
      const p = META_COMPARISON_2026.countryProfiles[cc];
      return `
        <details class="panel-card country-acc-card" ${cc === 'si' ? 'open' : ''}>
          <summary class="country-acc-summary">
            <span class="acc-title-wrap">
              ${countryFlag(cc)}
              <strong>${t(lang, COUNTRY_NAME_KEYS[cc])}</strong>
              <span class="acc-sep">—</span>
              <span class="muted-best">${p.bestFor[lang]}</span>
            </span>
            ${CHEVRON_SVG}
          </summary>
          <div class="country-acc-body">
            <div class="pros-cons-grid">
              <div class="pros-box">
                <h4><span class="status-dot emerald"></span>${t(lang, 'meta_pros')}</h4>
                <ul>${p.pros[lang].map(x => `<li>${x}</li>`).join('')}</ul>
              </div>
              <div class="cons-box">
                <h4><span class="status-dot amber"></span>${t(lang, 'meta_cons')}</h4>
                <ul>${p.cons[lang].map(x => `<li>${x}</li>`).join('')}</ul>
              </div>
            </div>
          </div>
        </details>
      `;
    })
    .join('');

  return `
    <header class="arena-header">
      <h2>${t(lang, 'arena_title')}</h2>
      <p class="arena-sub">${t(lang, 'arena_subtitle')}</p>
    </header>

    ${personaFiltersHtml}

    <section class="panel-card table-card">
      <div class="table-scroll">
        <table class="fintech-table arena-table">
          <thead>
            <tr>
              <th>${t(lang, 'arena_col_rank')}</th>
              <th>${t(lang, 'arena_col_country')}</th>
              <th class="num">${t(lang, isMonthly ? 'net_mo' : 'net_yr')}</th>
              <th class="num">${t(lang, 'arena_col_tax_soc')}</th>
              <th class="num">${t(lang, 'arena_col_eff')}</th>
              <th class="num">${t(lang, 'arena_col_vs_si')}</th>
            </tr>
          </thead>
          <tbody>
            ${leaderboardRowsHtml}
          </tbody>
        </table>
      </div>
    </section>

    <section class="callout-banner advisory">
      <div class="advisory-title">${t(lang, 'residency_warning_title')}</div>
      <div class="advisory-body">${t(lang, 'residency_warning_body')}</div>
    </section>

    <section class="meta-section">
      <h3 class="section-heading">${t(lang, 'meta_matrix_title')}</h3>
      ${matrixHtml}
    </section>

    <section class="meta-section">
      <h3 class="section-heading">${t(lang, 'meta_cards_title')}</h3>
      <div class="country-acc-list">
        ${countryCardsHtml}
      </div>
    </section>
  `;
}
