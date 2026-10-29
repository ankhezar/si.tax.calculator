/**
 * Cross-Border Compare All Arena & 7-Dimension Meta-Comparison View (9 Countries)
 * Pure typographic + flat vector flag presentation (zero decorative emojis).
 */

import { evaluateCrossBorderArena } from '../engines/arena.js';
import { META_COMPARISON_2026 } from '../data/metaComparison.js';
import { t } from '../i18n/index.js';
import { round2, fmtEur, fmtEurShort, fmtSignedEur, fmtPct } from '../utils/format.js';
import { reconcileByCountry } from '../utils/reconcile.js';
import { countryFlag } from '../utils/icons.js';
import { tipAttrs } from '../utils/tooltip.js';

const COUNTRY_NAME_KEYS = {
  si: 'nav_si',
  hr: 'nav_hr',
  it: 'nav_it',
  at: 'nav_at',
  hu: 'nav_hu',
  pl: 'nav_pl',
  cz: 'nav_cz',
  sk: 'nav_sk',
  es: 'nav_es'
};

const ALL_COUNTRIES = ['si', 'hr', 'it', 'at', 'hu', 'pl', 'cz', 'sk', 'es'];
const NEIGHBOUR_COUNTRIES = ['si', 'hr', 'it', 'at', 'hu'];
const EXPANSION_COUNTRIES = ['si', 'pl', 'cz', 'sk', 'es'];

const CHEVRON_SVG = `<svg class="acc-chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>`;

export function renderCompareView(state) {
  const { lang, view, compare } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const kids = Math.max(0, Math.min(4, Math.floor(Number(fam.children) || 0)));
  const hasSpouse = Boolean(fam.dependentSpouse);
  const isMonthly = view === 'monthly';
  const div = isMonthly ? 12 : 1;
  const arena = evaluateCrossBorderArena(state);
  const baselineDisp = reconcileByCountry('si', arena.baselineSiNow.raw, view);

  const clientFieldHtml = `
    <div class="persona-field">
      <div class="persona-field-lbl">
        <span>${t(lang, 'persona_client_label')}</span>
      </div>
      <div class="seg-mini-group full-w" role="group" aria-label="${t(lang, 'persona_client_label')}">
        <button type="button" class="seg-mini-btn ${compare.clientType === 'b2b' ? 'active' : ''}" data-action="cmp-client" data-val="b2b" aria-pressed="${compare.clientType === 'b2b'}">${t(lang, 'persona_b2b')}</button>
        <button type="button" class="seg-mini-btn ${compare.clientType === 'b2c' ? 'active' : ''}" data-action="cmp-client" data-val="b2c" aria-pressed="${compare.clientType === 'b2c'}">${t(lang, 'persona_b2c')}</button>
      </div>
    </div>
  `;

  const kidsFieldHtml = `
    <div class="persona-field">
      <div class="persona-field-lbl">
        <span>${t(lang, 'fam_kids_short')}</span>
      </div>
      <div class="seg-mini-group kids-grid" role="group" aria-label="${t(lang, 'fam_kids_short')}">
        ${[0, 1, 2, 3, 4]
          .map(
            n =>
              `<button type="button" class="seg-mini-btn kid-btn num-tabular ${kids === n ? 'active' : ''}" data-action="fam-kids" data-val="${n}" aria-pressed="${kids === n}">${n}</button>`
          )
          .join('')}
      </div>
    </div>
  `;

  const spouseFieldHtml = `
    <div class="persona-field persona-field-spouse">
      <div class="persona-field-lbl">
        <span>${t(lang, 'fam_label')}</span>
        <button type="button" class="info-trigger small" data-tip-key="desc_family" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'fam_label') })}">?</button>
      </div>
      <div class="seg-mini-group full-w spouse-group" role="group" aria-label="${t(lang, 'fam_spouse_short')}">
        <button type="button" class="seg-mini-btn ${!hasSpouse ? 'active' : ''}" data-action="fam-spouse" data-val="0" aria-pressed="${!hasSpouse}">${t(lang, 'fam_spouse_none')}</button>
        <button type="button" class="seg-mini-btn ${hasSpouse ? 'active' : ''}" data-action="fam-spouse" data-val="1" aria-pressed="${hasSpouse}">${t(lang, 'fam_spouse_dep')}</button>
      </div>
    </div>
  `;

  const personaFiltersHtml = `
    <section class="panel-card persona-card">
      <div class="persona-top-row">
        <span class="persona-title-wrap">
          <span class="overline">${t(lang, 'persona_title')}</span>
          <button type="button" class="info-trigger" data-tip-key="desc_persona" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'persona_title') })}">?</button>
        </span>
        <div class="seg-mini-group persona-mode-switch" role="group" aria-label="${t(lang, 'persona_title')}">
          <button type="button" class="seg-mini-btn ${compare.personaMode === 'preset' ? 'active' : ''}" data-action="cmp-mode" data-val="preset" aria-pressed="${compare.personaMode === 'preset'}">
            ${t(lang, 'persona_preset')}
          </button>
          <button type="button" class="seg-mini-btn ${compare.personaMode === 'custom' ? 'active' : ''}" data-action="cmp-mode" data-val="custom" aria-pressed="${compare.personaMode === 'custom'}">
            ${t(lang, 'persona_custom')}
          </button>
        </div>
      </div>

      ${
        compare.personaMode === 'preset'
          ? `
        <div class="persona-filters-grid items-5">
          <div class="persona-field">
            <div class="persona-field-lbl">
              <span>${t(lang, 'lbl_employment')}</span>
            </div>
            <div class="seg-mini-group full-w" role="group" aria-label="${t(lang, 'lbl_employment')}">
              <button type="button" class="seg-mini-btn ${compare.employment === 'full' ? 'active' : ''}" data-action="cmp-emp" data-val="full" aria-pressed="${compare.employment === 'full'}">${t(lang, 'persona_full')}</button>
              <button type="button" class="seg-mini-btn ${compare.employment === 'side' ? 'active' : ''}" data-action="cmp-emp" data-val="side" aria-pressed="${compare.employment === 'side'}">${t(lang, 'persona_side')}</button>
            </div>
          </div>

          <div class="persona-field">
            <div class="persona-field-lbl">
              <span>${t(lang, 'label_status')}</span>
            </div>
            <div class="seg-mini-group full-w" role="group" aria-label="${t(lang, 'label_status')}">
              <button type="button" class="seg-mini-btn ${compare.stage === 'established' ? 'active' : ''}" data-action="cmp-stage" data-val="established" aria-pressed="${compare.stage === 'established'}">${t(lang, 'persona_est')}</button>
              <button type="button" class="seg-mini-btn ${compare.stage === 'new' ? 'active' : ''}" data-action="cmp-stage" data-val="new" aria-pressed="${compare.stage === 'new'}">${t(lang, 'persona_new')}</button>
            </div>
          </div>

          ${clientFieldHtml}
          ${kidsFieldHtml}
          ${spouseFieldHtml}
        </div>
        <div class="persona-context-note">
          ${t(lang, compare.clientType === 'b2c' ? 'persona_note_b2c' : 'persona_note_b2b')}
        </div>
      `
          : `
        <div class="persona-filters-grid items-3">
          ${clientFieldHtml}
          ${kidsFieldHtml}
          ${spouseFieldHtml}
        </div>
        <div class="persona-context-note">
          ${t(lang, 'persona_custom_note')} ${t(lang, compare.clientType === 'b2c' ? 'persona_note_b2c' : 'persona_note_b2b')}
        </div>
      `
      }
    </section>
  `;

  const per = t(lang, isMonthly ? 'per_mo' : 'per_yr');

  const leaderboardRowsHtml = arena.ranked
    .map(item => {
      const countryName = t(lang, COUNTRY_NAME_KEYS[item.countryCode]);
      const barWidth = Math.min(100, Math.max(2, item.effectiveRatePct)).toFixed(1);
      const disp = reconcileByCountry(item.countryCode, item.raw, view);
      const diffPeriod = round2(disp.net - baselineDisp.net);
      const limitPeriod = round2(item.limit / div);
      const vatLimitPeriod = round2(item.vatThreshold / div);
      const revTxt = fmtEur(disp.gross, lang);
      const limitFullTxt = fmtEur(limitPeriod, lang);
      const vatLimitFullTxt = fmtEur(vatLimitPeriod, lang);

      let statusBadge = `<button type="button" class="badge success has-tip" ${tipAttrs('tip_status_eligible', { country: countryName, regime: item.regimeLabel, rev: revTxt, limit: limitFullTxt, per }, `status-${item.id}`)}><span class="status-dot emerald"></span>${t(lang, 'badge_eligible')}</button>`;
      if (!item.isEligible) {
        if (item.disqualifiedReason === 'b2b_banned') {
          statusBadge = `<button type="button" class="badge danger has-tip" ${tipAttrs('tip_status_b2c_only', null, `status-${item.id}`)}><span class="status-dot rose"></span>${t(lang, 'badge_b2c_only')}</button>`;
        } else if (item.disqualifiedReason === 'fulltime_only') {
          const ftKey =
            item.countryCode === 'cz' ? 'tip_status_fulltime_only_cz' : 'tip_status_fulltime_only';
          statusBadge = `<button type="button" class="badge danger has-tip" ${tipAttrs(ftKey, null, `status-${item.id}`)}><span class="status-dot rose"></span>${t(lang, 'badge_fulltime_only')}</button>`;
        } else {
          const overCapMap = {
            si: 'tip_over_cap_si',
            hr: 'tip_over_cap_hr',
            it: 'tip_over_cap_it',
            at: 'tip_over_cap_at',
            pl: 'tip_over_cap_pl',
            cz: 'tip_over_cap_cz',
            sk: 'tip_over_cap_sk',
            es: 'tip_over_cap_es'
          };
          const overCapKey =
            overCapMap[item.countryCode] ||
            (item.id === 'hu_kata' ? 'tip_over_cap_hu_kata' : 'tip_over_cap_hu_ata');
          statusBadge = `<button type="button" class="badge danger has-tip" ${tipAttrs(overCapKey, { regime: item.regimeLabel, rev: revTxt, limit: limitFullTxt, per }, `status-${item.id}`)}><span class="status-dot rose"></span>${t(lang, 'badge_over_cap')} (${fmtEurShort(limitPeriod, lang)})</button>`;
        }
      } else if (item.isProposed) {
        statusBadge = `<button type="button" class="badge warn has-tip" ${tipAttrs('tip_status_proposed', { limit: limitFullTxt, per }, `status-${item.id}`)}><span class="status-dot amber"></span>${t(lang, 'arena_proposed_tag')}</button>`;
      }

      let b2cVatBadge = '';
      if (compare.clientType === 'b2c') {
        const vatThreshTxt =
          vatLimitPeriod === 0
            ? '0 €'
            : `${fmtEurShort(vatLimitPeriod, lang)}${isMonthly ? '/mo' : ''}`;
        const vatVars = {
          country: countryName,
          rev: revTxt,
          limit: vatLimitFullTxt,
          rate: item.vatRatePct,
          per
        };
        b2cVatBadge = item.exceedsB2cVat
          ? `<button type="button" class="badge warn num-tabular has-tip" ${tipAttrs('tip_b2c_vat_req', vatVars, `vat-${item.id}`)}>${t(lang, 'badge_b2c_vat_req', { rate: item.vatRatePct, limit: vatThreshTxt })}</button>`
          : `<button type="button" class="badge num-tabular has-tip" ${tipAttrs('tip_b2c_vat_free', vatVars, `vat-${item.id}`)}>${t(lang, 'badge_b2c_vat_free', { limit: vatThreshTxt })}</button>`;
      }

      let familyBadge = '';
      if (arena.familyActive) {
        const noFamDisp = reconcileByCountry(item.countryCode, item.noFamilyRaw, view);
        const famDelta = round2(disp.net - noFamDisp.net);
        const famDeltaFull = fmtSignedEur(famDelta, lang, 2);

        let famTipKey = 'tip_fam_hr';
        let famTipVars = { per };
        if (item.countryCode === 'si') {
          if (hasSpouse) {
            famTipKey = 'tip_fam_si_spouse';
            famTipVars = {
              delta: famDeltaFull,
              spouseOzp: fmtEur(disp.socSpouseOzp, lang),
              per
            };
          } else {
            famTipKey = 'tip_fam_si_kids';
            famTipVars = { kids, per };
          }
        } else if (item.countryCode === 'hr') {
          famTipKey = 'tip_fam_hr';
          famTipVars = { per };
        } else if (item.countryCode === 'it') {
          famTipKey = 'tip_fam_it';
          famTipVars = { per };
        } else if (item.countryCode === 'at') {
          if (disp.spouseSvs > 0) {
            famTipKey = 'tip_fam_at_svs';
            famTipVars = {
              delta: famDeltaFull,
              per,
              svsFee: fmtEur(disp.spouseSvs, lang),
              taxSaved: fmtEur(Math.max(0, round2(noFamDisp.tax - disp.tax)), lang)
            };
          } else if (kids === 0) {
            famTipKey = 'tip_fam_at_waived';
            famTipVars = { per };
          } else {
            famTipKey = 'tip_fam_at_credits';
            famTipVars = {
              delta: famDeltaFull,
              per,
              grossTax: fmtEur(disp.grossTax, lang),
              fb: fmtEur(disp.fbCredit, lang),
              avab: fmtEur(disp.avabCredit, lang),
              netTax: fmtEur(disp.tax, lang)
            };
          }
        } else if (item.countryCode === 'pl') {
          if (item.raw.regime === 'skala') {
            famTipKey = 'tip_fam_pl_skala';
            famTipVars = {
              delta: famDeltaFull,
              per,
              spouseCred: fmtEur(disp.spouseCredit, lang),
              childCred: fmtEur(disp.childCredit, lang)
            };
          } else {
            famTipKey = 'tip_fam_pl_ryczalt';
            famTipVars = { regime: item.regimeLabel, per };
          }
        } else if (item.countryCode === 'cz') {
          if (item.raw.resolvedRegime === 'pausalni_dan') {
            famTipKey = 'tip_fam_cz_pausal';
            famTipVars = {
              delta: famDeltaFull,
              per,
              spouseFee: fmtEur(disp.spouseObzp, lang)
            };
          } else {
            famTipKey = 'tip_fam_cz_vydaje';
            famTipVars = {
              delta: famDeltaFull,
              per,
              childCred: fmtEur(disp.childCredit, lang),
              spouseCred: fmtEur(disp.spouseCredit, lang),
              spouseFee: fmtEur(disp.spouseObzp, lang)
            };
          }
        } else if (item.countryCode === 'sk') {
          famTipKey = 'tip_fam_sk';
          famTipVars = {
            delta: famDeltaFull,
            per,
            childCred: fmtEur(disp.childCredit, lang),
            spouseCred: fmtEur(disp.spouseCredit, lang),
            spouseFee: fmtEur(disp.spouseHealth, lang)
          };
        } else if (item.countryCode === 'es') {
          famTipKey = 'tip_fam_es';
          famTipVars = {
            delta: famDeltaFull,
            per,
            spouseCred: fmtEur(disp.spouseCredit, lang),
            childCred: fmtEur(disp.childCredit, lang)
          };
        } else if (item.id === 'hu_kata') {
          famTipKey = 'tip_fam_hu_kata';
          famTipVars = {
            delta: famDeltaFull,
            per,
            spouseFee: fmtEur(disp.spouseHealth, lang)
          };
        } else {
          famTipKey = 'tip_fam_hu_ata';
          famTipVars = {
            delta: famDeltaFull,
            per,
            szjaCred: fmtEur(disp.familyCreditSzja, lang),
            tbjCred: fmtEur(disp.familyCreditTbj, lang),
            spouseFee: fmtEur(disp.spouseHealth, lang)
          };
        }

        const famCls = famDelta > 0.005 ? 'success' : famDelta < -0.005 ? 'warn' : '';
        const famLbl =
          Math.abs(famDelta) > 0.005
            ? t(lang, 'badge_fam_delta', { val: fmtSignedEur(famDelta, lang, 0) })
            : t(lang, 'badge_fam_zero');
        familyBadge = `<button type="button" class="badge ${famCls} num-tabular has-tip" ${tipAttrs(famTipKey, famTipVars, `fam-${item.id}`)}>${famLbl}</button>`;
      }

      let diffBadge = `<button type="button" class="delta-pill neutral has-tip" ${tipAttrs('tip_delta_baseline', { net: fmtEur(baselineDisp.net, lang), eff: fmtPct(arena.baselineSiNow.effectiveRatePct, lang), per }, `delta-${item.id}`)}>${t(lang, 'arena_baseline')}</button>`;
      if (item.id !== 'si_zpzr') {
        const cls =
          Math.abs(diffPeriod) < 0.005 ? 'neutral' : diffPeriod > 0 ? 'pos' : 'neg';
        diffBadge = `<button type="button" class="delta-pill ${cls} num-tabular has-tip" ${tipAttrs('tip_delta_vs_si', { country: countryName, regime: item.regimeLabel, delta: fmtSignedEur(diffPeriod, lang, 2), net: fmtEur(disp.net, lang), baseNet: fmtEur(baselineDisp.net, lang), eff: fmtPct(item.effectiveRatePct, lang), baseEff: fmtPct(arena.baselineSiNow.effectiveRatePct, lang), per }, `delta-${item.id}`)}>${fmtSignedEur(diffPeriod, lang, 2)}</button>`;
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
                  ${familyBadge}
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

  // --- 7-Dimension Meta-Comparison Matrix (9 Countries or 5-Country Region Subset) ---
  const regionFilter = compare.regionFilter || 'all';
  const activeCountries =
    regionFilter === 'neighbours'
      ? NEIGHBOUR_COUNTRIES
      : regionFilter === 'expansion'
        ? EXPANSION_COUNTRIES
        : ALL_COUNTRIES;
  const gridColsClass = activeCountries.length === 5 ? 'cols-5' : 'cols-9';

  const regionFilterBarHtml = `
    <div class="meta-region-bar" role="group" aria-label="${t(lang, 'region_filter_label')}">
      <div class="seg-mini-group">
        <button type="button" class="seg-mini-btn ${regionFilter === 'all' ? 'active' : ''}" data-action="cmp-region" data-val="all" aria-pressed="${regionFilter === 'all'}">${t(lang, 'region_all')}</button>
        <button type="button" class="seg-mini-btn ${regionFilter === 'neighbours' ? 'active' : ''}" data-action="cmp-region" data-val="neighbours" aria-pressed="${regionFilter === 'neighbours'}">${t(lang, 'region_neighbours')}</button>
        <button type="button" class="seg-mini-btn ${regionFilter === 'expansion' ? 'active' : ''}" data-action="cmp-region" data-val="expansion" aria-pressed="${regionFilter === 'expansion'}">${t(lang, 'region_expansion')}</button>
      </div>
    </div>
  `;

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
      const cols = activeCountries
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
          <div class="meta-dim-grid ${gridColsClass}">${cols}</div>
        </div>
      `;
    })
    .join('');

  // --- Expandable Country Pros & Cons Summary Cards ---
  const countryCardsHtml = activeCountries
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
          <caption class="sr-only">${t(lang, 'tbl_arena_caption')}</caption>
          <thead>
            <tr>
              <th scope="col">${t(lang, 'arena_col_rank')}</th>
              <th scope="col">${t(lang, 'arena_col_country')}</th>
              <th scope="col" class="num">${t(lang, isMonthly ? 'net_mo' : 'net_yr')}</th>
              <th scope="col" class="num">${t(lang, 'arena_col_tax_soc')}</th>
              <th scope="col" class="num"><span class="th-tip-wrap"><span>${t(lang, 'arena_col_eff')}</span><button type="button" class="info-trigger small" data-tip-key="desc_arena_eff" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'arena_col_eff') })}">?</button></span></th>
              <th scope="col" class="num"><span class="th-tip-wrap"><span>${t(lang, 'arena_col_vs_si')}</span><button type="button" class="info-trigger small" data-tip-key="desc_arena_delta" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'arena_col_vs_si') })}">?</button></span></th>
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
      <div class="meta-section-head">
        <h3 class="section-heading">${t(lang, 'meta_matrix_title')}</h3>
        ${regionFilterBarHtml}
      </div>
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
