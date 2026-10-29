/**
 * Tailored Single-Country Calculators for Croatia, Italy, Austria, and Hungary.
 * Unified 2-column fintech workspace + editorial regime profile card.
 */

import { calculateCroatia } from '../engines/croatia.js';
import { calculateItaly } from '../engines/italy.js';
import { calculateAustria } from '../engines/austria.js';
import { calculateHungary } from '../engines/hungary.js';
import { META_COMPARISON_2026 } from '../data/metaComparison.js';
import { t } from '../i18n/index.js';
import { fmtEur, fmtEurShort, fmtHuf, fmtPct } from '../utils/format.js';
import {
  reconcileCroatia,
  reconcileItaly,
  reconcileAustria,
  reconcileHungary
} from '../utils/reconcile.js';
import { countryFlag } from '../utils/icons.js';
import { renderHeroAllocation } from './components.js';

function renderCountryMiniProsCons(countryCode, lang) {
  const profile = META_COMPARISON_2026.countryProfiles[countryCode];
  if (!profile) return '';
  return `
    <section class="panel-card country-notes-card">
      <div class="country-bestfor">
        <span class="overline">${t(lang, 'meta_best_for')}</span>
        <p>${profile.bestFor[lang]}</p>
      </div>
      <div class="pros-cons-grid">
        <div class="pros-box">
          <h4><span class="status-dot emerald"></span>${t(lang, 'meta_pros')}</h4>
          <ul>${profile.pros[lang].map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="cons-box">
          <h4><span class="status-dot amber"></span>${t(lang, 'meta_cons')}</h4>
          <ul>${profile.cons[lang].map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
    </section>
  `;
}

export function renderCroatiaView(state) {
  const { lang, view, revenueEur, hr } = state;
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateCroatia({
    revenue: revenueEur,
    employment: hr.employment,
    hokExempt: hr.hokExempt
  });
  const disp = reconcileCroatia(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.hr;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        <div class="panel-head">
          <div class="country-title-wrap">
            ${countryFlag('hr')}
            <h2 class="panel-title">${t(lang, 'hr_title')}</h2>
          </div>
          <a href="${profile.authorityUrl}" target="_blank" rel="noopener" class="source-link">${profile.authorityName} ↗&#xFE0E;</a>
        </div>

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'lbl_employment')}</span></div>
            <select class="form-control" data-change="hr-employment">
              <option value="full" ${hr.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${hr.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'hr_hok_label')}</span></div>
            <select class="form-control" data-change="hr-hok">
              <option value="0" ${!hr.hokExempt ? 'selected' : ''}>${t(lang, 'hr_hok_std')}</option>
              <option value="1" ${hr.hokExempt ? 'selected' : ''}>${t(lang, 'hr_hok_exempt')}</option>
            </select>
          </div>
        </div>
      </aside>

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

        ${res.isBreach ? `<div class="callout-banner danger">${t(lang, 'hr_alert_breach')}</div>` : ''}

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'hr_res_expenses')}</span>
              <span class="badge ${res.isBreach ? 'danger' : 'success'}">
                ${res.isBreach ? t(lang, 'badge_over_cap') : t(lang, 'hr_bracket_lbl', { id: res.bracket.id })}
              </span>
              <button type="button" class="info-trigger" data-tip-key="hr_desc_rules" aria-label="Info">?</button>
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
              <span>${t(lang, 'res_tax')}</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')}</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'hr_det_mio')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.mio, lang)}</span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'hr_det_zo')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.health, lang)}</span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'hr_det_hok')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.hok, lang)}</span>
            </div>
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)}</span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('hr', lang)}
  `;
}

export function renderItalyView(state) {
  const { lang, view, revenueEur, it } = state;
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateItaly({
    revenue: revenueEur,
    taxRateType: it.taxRateType,
    activity: it.activity,
    inpsScheme: it.inpsScheme,
    forfettarioDiscount35: it.forfettarioDiscount35,
    fullTimeEmployeeExempt: it.fullTimeEmployeeExempt
  });
  const disp = reconcileItaly(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.it;
  const showArtCommDiscount = it.inpsScheme === 'artigiani' || it.inpsScheme === 'commercianti';

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        <div class="panel-head">
          <div class="country-title-wrap">
            ${countryFlag('it')}
            <h2 class="panel-title">${t(lang, 'it_title')}</h2>
          </div>
          <a href="${profile.authorityUrl}" target="_blank" rel="noopener" class="source-link">${profile.authorityName} ↗&#xFE0E;</a>
        </div>

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'it_tax_label')}</span></div>
            <select class="form-control" data-change="it-tax">
              <option value="startup" ${it.taxRateType === 'startup' ? 'selected' : ''}>${t(lang, 'it_tax_startup')}</option>
              <option value="standard" ${it.taxRateType === 'standard' ? 'selected' : ''}>${t(lang, 'it_tax_std')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'it_act_label')}</span></div>
            <select class="form-control" data-change="it-activity">
              <option value="it_67" ${it.activity === 'it_67' ? 'selected' : ''}>${t(lang, 'it_act_it67')}</option>
              <option value="prof_78" ${it.activity === 'prof_78' ? 'selected' : ''}>${t(lang, 'it_act_prof78')}</option>
              <option value="artisan_67" ${it.activity === 'artisan_67' ? 'selected' : ''}>${t(lang, 'it_act_art67')}</option>
              <option value="commerce_40" ${it.activity === 'commerce_40' ? 'selected' : ''}>${t(lang, 'it_act_comm40')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'it_inps_label')}</span></div>
            <select class="form-control" data-change="it-inps">
              <option value="separata" ${it.inpsScheme === 'separata' ? 'selected' : ''}>${t(lang, 'it_inps_sep')}</option>
              <option value="separata_side" ${it.inpsScheme === 'separata_side' ? 'selected' : ''}>${t(lang, 'it_inps_sep_side')}</option>
              <option value="artigiani" ${it.inpsScheme === 'artigiani' ? 'selected' : ''}>${t(lang, 'it_inps_art')}</option>
              <option value="commercianti" ${it.inpsScheme === 'commercianti' ? 'selected' : ''}>${t(lang, 'it_inps_comm')}</option>
            </select>
          </div>

          ${
            showArtCommDiscount
              ? `
            <div class="form-group">
              <div class="label-row"><span>${t(lang, 'it_disc_label')}</span></div>
              <select class="form-control" data-change="it-discount">
                <option value="1" ${it.forfettarioDiscount35 ? 'selected' : ''}>${t(lang, 'it_disc_yes')}</option>
                <option value="0" ${!it.forfettarioDiscount35 ? 'selected' : ''}>${t(lang, 'it_disc_no')}</option>
              </select>
            </div>
          `
              : ''
          }
        </div>
      </aside>

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

        ${
          res.isImmediateExit
            ? `<div class="callout-banner danger">${t(lang, 'it_alert_100k')}</div>`
            : res.isBreach
              ? `<div class="callout-banner amber">${t(lang, 'it_alert_85k')}</div>`
              : ''
        }

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'res_expenses')}</span>
              <span class="badge num-tabular">${Math.round((1 - res.coeff) * 100)}%</span>
              <button type="button" class="info-trigger" data-tip-key="it_desc_rules" aria-label="Info">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)}</span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'it_det_gross')} (${Math.round(res.coeff * 100)}%)</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.grossProfit, lang)}</span>
            </div>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')} (INPS)</span>
              ${res.breakdown.discountAppliedPct > 0 ? `<span class="badge success num-tabular">-${res.breakdown.discountAppliedPct}%</span>` : ''}
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
          </div>

          <div class="ledger-sub">
            ${
              res.breakdown.inpsFixed > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'it_det_inps_fix')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.inpsFixed, lang)}</span>
              </div>
            `
                : ''
            }
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'it_det_inps_var')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.inpsVariable, lang)}</span>
            </div>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')} (ATECO − INPS)</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (${Math.round(res.taxRate * 100)}%)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)}</span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('it', lang)}
  `;
}

export function renderAustriaView(state) {
  const { lang, view, revenueEur, at } = state;
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateAustria({
    revenue: revenueEur,
    scheme: at.scheme,
    activity: at.activity,
    employment: at.employment,
    kleinSvsOptOut: at.kleinSvsOptOut
  });
  const disp = reconcileAustria(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.at;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        <div class="panel-head">
          <div class="country-title-wrap">
            ${countryFlag('at')}
            <h2 class="panel-title">${t(lang, 'at_title')}</h2>
          </div>
          <a href="${profile.authorityUrl}" target="_blank" rel="noopener" class="source-link">${profile.authorityName} ↗&#xFE0E;</a>
        </div>

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'at_scheme_label')}</span></div>
            <select class="form-control" data-change="at-scheme">
              <option value="auto" ${at.scheme === 'auto' ? 'selected' : ''}>${t(lang, 'at_sch_auto')}</option>
              <option value="klein" ${at.scheme === 'klein' ? 'selected' : ''}>${t(lang, 'at_sch_klein')}</option>
              <option value="basis" ${at.scheme === 'basis' ? 'selected' : ''}>${t(lang, 'at_sch_basis')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'at_act_label')}</span></div>
            <select class="form-control" data-change="at-activity">
              <option value="services" ${at.activity === 'services' ? 'selected' : ''}>${t(lang, 'at_act_serv')}</option>
              <option value="goods" ${at.activity === 'goods' ? 'selected' : ''}>${t(lang, 'at_act_goods')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'lbl_employment')}</span></div>
            <select class="form-control" data-change="at-employment">
              <option value="full" ${at.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${at.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>
        </div>
      </aside>

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

        ${
          res.isBreach
            ? `<div class="callout-banner danger">${t(lang, 'at_alert_breach', { limit: res.limit.toLocaleString() })}</div>`
            : ''
        }

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'res_expenses')} (${res.regimeName})</span>
              <span class="badge num-tabular">${Math.round(res.expenseRate * 100)}%</span>
              <button type="button" class="info-trigger" data-tip-key="at_desc_rules" aria-label="Info">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')} (SVS)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'at_det_pv')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.pv, lang)}</span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'at_det_kv')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.kv, lang)}</span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'at_det_sv')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.sv, lang)}</span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'at_det_gfb')}</span>
              <span class="ledger-val num-tabular">−${fmtEur(disp.gfb, lang)}</span>
            </div>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (ESt 2026)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)}</span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('at', lang)}
  `;
}

export function renderHungaryView(state) {
  const { lang, view, revenueEur, hu } = state;
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateHungary({
    revenue: revenueEur,
    regime: hu.regime,
    employment: hu.employment,
    expenseTier: hu.expenseTier,
    wageFloor: hu.wageFloor,
    hipaMode: hu.hipaMode,
    clientType: hu.clientType,
    eurHuf: hu.eurHuf
  });
  const disp = reconcileHungary(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.hu;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        <div class="panel-head">
          <div class="country-title-wrap">
            ${countryFlag('hu')}
            <h2 class="panel-title">${t(lang, 'hu_title')}</h2>
          </div>
          <a href="${profile.authorityUrl}" target="_blank" rel="noopener" class="source-link">${profile.authorityName} ↗&#xFE0E;</a>
        </div>

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row"><span>${t(lang, 'hu_reg_label')}</span></div>
            <select class="form-control" data-change="hu-regime">
              <option value="atalanyado" ${hu.regime === 'atalanyado' ? 'selected' : ''}>${t(lang, 'hu_reg_ata')}</option>
              <option value="kata" ${hu.regime === 'kata' ? 'selected' : ''}>${t(lang, 'hu_reg_kata')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <span>${t(lang, 'hu_fx_label')}</span>
              <span class="badge num-tabular">${fmtHuf(disp.huf.gross, lang)}</span>
            </div>
            <div class="input-wrapper">
              <input type="number" id="hu-eur-huf" class="form-control num-tabular" value="${hu.eurHuf}" min="200" max="800" step="any" data-step="5" data-input="hu-eur-huf">
              <div class="spinner-group">
                <button type="button" class="spin-btn" data-step-target="hu-eur-huf" data-step-dir="-1" aria-label="Decrease">−</button>
                <button type="button" class="spin-btn" data-step-target="hu-eur-huf" data-step-dir="1" aria-label="Increase">+</button>
              </div>
            </div>
          </div>

          ${
            hu.regime === 'atalanyado'
              ? `
            <div class="form-group">
              <div class="label-row"><span>${t(lang, 'lbl_employment')}</span></div>
              <select class="form-control" data-change="hu-employment">
                <option value="full" ${hu.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
                <option value="side" ${hu.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
              </select>
            </div>

            <div class="form-group">
              <div class="label-row"><span>${t(lang, 'hu_exp_label')}</span></div>
              <select class="form-control" data-change="hu-expense">
                <option value="45" ${hu.expenseTier === '45' ? 'selected' : ''}>${t(lang, 'hu_exp_45')}</option>
                <option value="80" ${hu.expenseTier === '80' ? 'selected' : ''}>${t(lang, 'hu_exp_80')}</option>
                <option value="90" ${hu.expenseTier === '90' ? 'selected' : ''}>${t(lang, 'hu_exp_90')}</option>
              </select>
            </div>

            <div class="form-group">
              <div class="label-row"><span>${t(lang, 'hu_wage_label')}</span></div>
              <select class="form-control" data-change="hu-wage">
                <option value="guaranteed" ${hu.wageFloor === 'guaranteed' ? 'selected' : ''}>${t(lang, 'hu_wage_guar')}</option>
                <option value="minimal" ${hu.wageFloor === 'minimal' ? 'selected' : ''}>${t(lang, 'hu_wage_min')}</option>
              </select>
            </div>

            <div class="form-group">
              <div class="label-row"><span>${t(lang, 'hu_hipa_label')}</span></div>
              <select class="form-control" data-change="hu-hipa">
                <option value="simplified" ${hu.hipaMode === 'simplified' ? 'selected' : ''}>${t(lang, 'hu_hipa_simp')}</option>
                <option value="standard2" ${hu.hipaMode === 'standard2' ? 'selected' : ''}>${t(lang, 'hu_hipa_std')}</option>
                <option value="none" ${hu.hipaMode === 'none' ? 'selected' : ''}>${t(lang, 'hu_hipa_none')}</option>
              </select>
            </div>
          `
              : ''
          }
        </div>
      </aside>

      <section class="panel-card statement-panel">
        ${renderHeroAllocation({
          lang,
          isMonthly,
          gross: disp.gross,
          net: disp.net,
          tax: disp.tax,
          social: disp.social,
          totalPaid: disp.totalPaid,
          effectiveRatePct: res.effectiveRatePct,
          secondaryNetText: `(${fmtHuf(disp.huf.net, lang)})`
        })}

        ${hu.regime === 'kata' ? `<div class="callout-banner danger">${t(lang, 'hu_alert_kata_b2b')}</div>` : ''}

        ${
          res.isBreach
            ? `<div class="callout-banner danger">${t(lang, 'hu_alert_breach', { limit: `${fmtEurShort(res.limit, lang)} / ${fmtHuf(res.limitHuf, lang)}` })}</div>`
            : res.exceedsVatExempt && hu.regime === 'atalanyado'
              ? `<div class="callout-banner amber">${t(lang, 'hu_alert_vat', { vatEur: fmtEurShort(res.vatThreshold, lang), capEur: fmtEurShort(res.limit, lang) })}</div>`
              : ''
        }

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.gross, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'res_expenses')}</span>
              <span class="badge num-tabular">${hu.regime === 'kata' ? 'KATA' : `${Math.round((res.expenseRatio || 0) * 100)}%`}</span>
              <button type="button" class="info-trigger" data-tip-key="${hu.regime === 'kata' ? 'hu_desc_kata' : 'hu_desc_rules'}" aria-label="Info">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.expenses, lang)})</small></span>
          </div>

          ${
            hu.regime === 'atalanyado'
              ? `
            <div class="ledger-sub">
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_exempt')}</span>
                <span class="ledger-val num-tabular">−${fmtEur(disp.exempt, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.exempt, lang)})</small></span>
              </div>
            </div>
          `
              : ''
          }

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.taxBase, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (SZJA + HIPA)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'hu_det_szja')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.szja, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.szja, lang)})</small></span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'hu_det_hipa')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.hipa, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.hipa, lang)})</small></span>
            </div>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')} (TBJ + SZOCHO)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'hu_det_tbj')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.tbj, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.tbj, lang)})</small></span>
            </div>
            ${
              hu.regime === 'atalanyado'
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_szocho')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.szocho, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.szocho, lang)})</small></span>
              </div>
            `
                : ''
            }
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.net, lang)})</small></span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('hu', lang)}
  `;
}
