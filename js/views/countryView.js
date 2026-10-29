/**
 * Tailored Single-Country Calculators for Croatia, Italy, Austria, Hungary,
 * Poland, Czechia, Slovakia, and Spain.
 * Unified 2-column fintech workspace + editorial regime profile card.
 */

import { calculateCroatia } from '../engines/croatia.js';
import { calculateItaly } from '../engines/italy.js';
import { calculateAustria } from '../engines/austria.js';
import { calculateHungary } from '../engines/hungary.js';
import { calculatePoland } from '../engines/poland.js';
import { calculateCzechia } from '../engines/czechia.js';
import { calculateSlovakia } from '../engines/slovakia.js';
import { calculateSpain } from '../engines/spain.js';
import { META_COMPARISON_2026 } from '../data/metaComparison.js';
import { t } from '../i18n/index.js';
import { fmtEur, fmtEurShort, fmtHuf, fmtPln, fmtCzk, fmtPct } from '../utils/format.js';
import {
  reconcileCroatia,
  reconcileItaly,
  reconcileAustria,
  reconcileHungary,
  reconcilePoland,
  reconcileCzechia,
  reconcileSlovakia,
  reconcileSpain
} from '../utils/reconcile.js';
import { renderCountryPanelHead, renderHeroAllocation, renderFamilyControls } from './components.js';

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
  const fam = state.family || { children: 0, dependentSpouse: false };
  const familyActive = (Number(fam.children) || 0) > 0 || Boolean(fam.dependentSpouse);
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateCroatia({
    revenue: revenueEur,
    employment: hr.employment,
    hokExempt: hr.hokExempt,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcileCroatia(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.hr;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'hr',
          countryName: t(lang, 'nav_hr'),
          regimeSubtitle: t(lang, 'hr_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="hr-employment">${t(lang, 'lbl_employment')}</label>
              <button type="button" class="info-trigger" data-tip-key="hr_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
            </div>
            <select id="hr-employment" class="form-control" data-change="hr-employment">
              <option value="full" ${hr.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${hr.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="hr-hok">${t(lang, 'hr_hok_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="hr_desc_hok" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hr_hok_label') })}">?</button>
            </div>
            <select id="hr-hok" class="form-control" data-change="hr-hok">
              <option value="0" ${!hr.hokExempt ? 'selected' : ''}>${t(lang, 'hr_hok_std')}</option>
              <option value="1" ${hr.hokExempt ? 'selected' : ''}>${t(lang, 'hr_hok_exempt')}</option>
            </select>
          </div>

          ${renderFamilyControls(state, 'desc_hr_family', 'hr-fam')}
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
        ${familyActive ? `<div class="callout-banner advisory compact">${t(lang, 'hr_family_note')}</div>` : ''}

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
              <button type="button" class="info-trigger" data-tip-key="hr_desc_rules" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hr_res_expenses') })}">?</button>
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
  const fam = state.family || { children: 0, dependentSpouse: false };
  const familyActive = (Number(fam.children) || 0) > 0 || Boolean(fam.dependentSpouse);
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateItaly({
    revenue: revenueEur,
    taxRateType: it.taxRateType,
    activity: it.activity,
    inpsScheme: it.inpsScheme,
    forfettarioDiscount35: it.forfettarioDiscount35,
    fullTimeEmployeeExempt: it.fullTimeEmployeeExempt,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcileItaly(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.it;
  const showArtCommDiscount = it.inpsScheme === 'artigiani' || it.inpsScheme === 'commercianti';

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'it',
          countryName: t(lang, 'nav_it'),
          regimeSubtitle: t(lang, 'it_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="it-tax">${t(lang, 'it_tax_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="it_desc_tax" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'it_tax_label') })}">?</button>
            </div>
            <select id="it-tax" class="form-control" data-change="it-tax">
              <option value="startup" ${it.taxRateType === 'startup' ? 'selected' : ''}>${t(lang, 'it_tax_startup')}</option>
              <option value="standard" ${it.taxRateType === 'standard' ? 'selected' : ''}>${t(lang, 'it_tax_std')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="it-activity">${t(lang, 'it_act_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="it_desc_activity" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'it_act_label') })}">?</button>
            </div>
            <select id="it-activity" class="form-control" data-change="it-activity">
              <option value="it_67" ${it.activity === 'it_67' ? 'selected' : ''}>${t(lang, 'it_act_it67')}</option>
              <option value="prof_78" ${it.activity === 'prof_78' ? 'selected' : ''}>${t(lang, 'it_act_prof78')}</option>
              <option value="artisan_67" ${it.activity === 'artisan_67' ? 'selected' : ''}>${t(lang, 'it_act_art67')}</option>
              <option value="commerce_40" ${it.activity === 'commerce_40' ? 'selected' : ''}>${t(lang, 'it_act_comm40')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="it-inps">${t(lang, 'it_inps_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="it_desc_inps" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'it_inps_label') })}">?</button>
            </div>
            <select id="it-inps" class="form-control" data-change="it-inps">
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
              <div class="label-row">
                <label for="it-discount">${t(lang, 'it_disc_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="it_desc_discount" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'it_disc_label') })}">?</button>
              </div>
              <select id="it-discount" class="form-control" data-change="it-discount">
                <option value="1" ${it.forfettarioDiscount35 ? 'selected' : ''}>${t(lang, 'it_disc_yes')}</option>
                <option value="0" ${!it.forfettarioDiscount35 ? 'selected' : ''}>${t(lang, 'it_disc_no')}</option>
              </select>
            </div>
          `
              : ''
          }

          ${renderFamilyControls(state, 'desc_it_family', 'it-fam')}
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
        ${familyActive ? `<div class="callout-banner advisory compact">${t(lang, 'it_family_note')}</div>` : ''}

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
              <button type="button" class="info-trigger" data-tip-key="it_desc_rules" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
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
  const fam = state.family || { children: 0, dependentSpouse: false };
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateAustria({
    revenue: revenueEur,
    scheme: at.scheme,
    activity: at.activity,
    employment: at.employment,
    kleinSvsOptOut: at.kleinSvsOptOut,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse,
    spouseChildRearingWaiver: at.spouseChildRearingWaiver
  });
  const disp = reconcileAustria(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.at;
  const showSpouseWaiverToggle = Boolean(fam.dependentSpouse) && (Number(fam.children) || 0) === 0;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'at',
          countryName: t(lang, 'nav_at'),
          regimeSubtitle: t(lang, 'at_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="at-scheme">${t(lang, 'at_scheme_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="at_desc_scheme" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'at_scheme_label') })}">?</button>
            </div>
            <select id="at-scheme" class="form-control" data-change="at-scheme">
              <option value="auto" ${at.scheme === 'auto' ? 'selected' : ''}>${t(lang, 'at_sch_auto')}</option>
              <option value="klein" ${at.scheme === 'klein' ? 'selected' : ''}>${t(lang, 'at_sch_klein')}</option>
              <option value="basis" ${at.scheme === 'basis' ? 'selected' : ''}>${t(lang, 'at_sch_basis')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="at-activity">${t(lang, 'at_act_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="at_desc_activity" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'at_act_label') })}">?</button>
            </div>
            <select id="at-activity" class="form-control" data-change="at-activity">
              <option value="services" ${at.activity === 'services' ? 'selected' : ''}>${t(lang, 'at_act_serv')}</option>
              <option value="goods" ${at.activity === 'goods' ? 'selected' : ''}>${t(lang, 'at_act_goods')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="at-employment">${t(lang, 'lbl_employment')}</label>
              <button type="button" class="info-trigger" data-tip-key="at_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
            </div>
            <select id="at-employment" class="form-control" data-change="at-employment">
              <option value="full" ${at.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${at.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          ${renderFamilyControls(state, 'desc_at_family', 'at-fam')}

          ${
            showSpouseWaiverToggle
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="at-spouse-waiver">${t(lang, 'at_spouse_waiver_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="at_desc_spouse_waiver" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'at_spouse_waiver_label') })}">?</button>
              </div>
              <select id="at-spouse-waiver" class="form-control" data-change="at-spouse-waiver">
                <option value="0" ${!at.spouseChildRearingWaiver ? 'selected' : ''}>${t(lang, 'at_spouse_waiver_no')}</option>
                <option value="1" ${at.spouseChildRearingWaiver ? 'selected' : ''}>${t(lang, 'at_spouse_waiver_yes')}</option>
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
              <button type="button" class="info-trigger" data-tip-key="at_desc_rules" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
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
            ${
              disp.spouseSvs > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'at_det_spouse_svs')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.spouseSvs, lang)}</span>
              </div>
            `
                : ''
            }
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

          ${
            disp.familyCredit > 0
              ? `
            <div class="ledger-sub">
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'at_det_gross_est')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossTax, lang)}</span>
              </div>
              ${
                disp.avabCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'at_det_avab')}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.avabCredit, lang)}</span>
                </div>
              `
                  : ''
              }
              ${
                disp.fbCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'at_det_fb_plus', { n: res.children })}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.fbCredit, lang)}</span>
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

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
  const fam = state.family || { children: 0, dependentSpouse: false };
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
    eurHuf: hu.eurHuf,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcileHungary(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.hu;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'hu',
          countryName: t(lang, 'nav_hu'),
          regimeSubtitle: t(lang, 'hu_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="hu-regime">${t(lang, 'hu_reg_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="hu_desc_regime" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hu_reg_label') })}">?</button>
            </div>
            <select id="hu-regime" class="form-control" data-change="hu-regime">
              <option value="atalanyado" ${hu.regime === 'atalanyado' ? 'selected' : ''}>${t(lang, 'hu_reg_ata')}</option>
              <option value="kata" ${hu.regime === 'kata' ? 'selected' : ''}>${t(lang, 'hu_reg_kata')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="hu-eur-huf">${t(lang, 'hu_fx_label')}</label>
              <span class="label-meta">
                <span class="badge num-tabular">${fmtHuf(disp.huf.gross, lang)}</span>
                <button type="button" class="info-trigger" data-tip-key="hu_desc_fx" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hu_fx_label') })}">?</button>
              </span>
            </div>
            <div class="input-wrapper">
              <input type="number" id="hu-eur-huf" class="form-control num-tabular" value="${hu.eurHuf}" min="200" max="800" step="any" data-step="5" data-input="hu-eur-huf">
              <div class="spinner-group">
                <button type="button" class="spin-btn" data-step-target="hu-eur-huf" data-step-dir="-1" aria-label="${t(lang, 'aria_decrease', { label: t(lang, 'hu_fx_label') })}">−</button>
                <button type="button" class="spin-btn" data-step-target="hu-eur-huf" data-step-dir="1" aria-label="${t(lang, 'aria_increase', { label: t(lang, 'hu_fx_label') })}">+</button>
              </div>
            </div>
          </div>

          ${
            hu.regime === 'atalanyado'
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="hu-employment">${t(lang, 'lbl_employment')}</label>
                <button type="button" class="info-trigger" data-tip-key="hu_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
              </div>
              <select id="hu-employment" class="form-control" data-change="hu-employment">
                <option value="full" ${hu.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
                <option value="side" ${hu.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
              </select>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="hu-expense">${t(lang, 'hu_exp_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="hu_desc_expense" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hu_exp_label') })}">?</button>
              </div>
              <select id="hu-expense" class="form-control" data-change="hu-expense">
                <option value="45" ${hu.expenseTier === '45' ? 'selected' : ''}>${t(lang, 'hu_exp_45')}</option>
                <option value="80" ${hu.expenseTier === '80' ? 'selected' : ''}>${t(lang, 'hu_exp_80')}</option>
                <option value="90" ${hu.expenseTier === '90' ? 'selected' : ''}>${t(lang, 'hu_exp_90')}</option>
              </select>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="hu-wage">${t(lang, 'hu_wage_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="hu_desc_wage" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hu_wage_label') })}">?</button>
              </div>
              <select id="hu-wage" class="form-control" data-change="hu-wage">
                <option value="guaranteed" ${hu.wageFloor === 'guaranteed' ? 'selected' : ''}>${t(lang, 'hu_wage_guar')}</option>
                <option value="minimal" ${hu.wageFloor === 'minimal' ? 'selected' : ''}>${t(lang, 'hu_wage_min')}</option>
              </select>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="hu-hipa">${t(lang, 'hu_hipa_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="hu_desc_hipa" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'hu_hipa_label') })}">?</button>
              </div>
              <select id="hu-hipa" class="form-control" data-change="hu-hipa">
                <option value="simplified" ${hu.hipaMode === 'simplified' ? 'selected' : ''}>${t(lang, 'hu_hipa_simp')}</option>
                <option value="standard2" ${hu.hipaMode === 'standard2' ? 'selected' : ''}>${t(lang, 'hu_hipa_std')}</option>
                <option value="none" ${hu.hipaMode === 'none' ? 'selected' : ''}>${t(lang, 'hu_hipa_none')}</option>
              </select>
            </div>
          `
              : ''
          }

          ${renderFamilyControls(state, 'desc_hu_family', 'hu-fam')}
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
              <button type="button" class="info-trigger" data-tip-key="${hu.regime === 'kata' ? 'hu_desc_kata' : 'hu_desc_rules'}" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
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
            ${
              disp.familyCreditSzja > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_gross_szja')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossSzja, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.grossSzja, lang)})</small></span>
              </div>
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_fam_szja')}</span>
                <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.familyCreditSzja, lang)} <small class="muted-fx">(−${fmtHuf(disp.huf.familyCreditSzja, lang)})</small></span>
              </div>
            `
                : ''
            }
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
            ${
              disp.familyCreditTbj > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_gross_tbj')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossTbj, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.grossTbj, lang)})</small></span>
              </div>
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_fam_tbj')}</span>
                <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.familyCreditTbj, lang)} <small class="muted-fx">(−${fmtHuf(disp.huf.familyCreditTbj, lang)})</small></span>
              </div>
            `
                : ''
            }
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
            ${
              disp.spouseHealth > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'hu_det_spouse_tb')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.spouseHealth, lang)} <small class="muted-fx">(${fmtHuf(disp.huf.spouseHealth, lang)})</small></span>
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

export function renderPolandView(state) {
  const { lang, view, revenueEur, pl } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const familyActive = (Number(fam.children) || 0) > 0 || Boolean(fam.dependentSpouse);
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculatePoland({
    revenue: revenueEur,
    regime: pl.regime,
    ryczaltRate: pl.ryczaltRate,
    employment: pl.employment,
    zusStage: pl.zusStage,
    eurPln: pl.eurPln,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcilePoland(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.pl;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'pl',
          countryName: t(lang, 'nav_pl'),
          regimeSubtitle: t(lang, 'pl_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="pl-regime">${t(lang, 'pl_reg_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="pl_desc_regime" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'pl_reg_label') })}">?</button>
            </div>
            <select id="pl-regime" class="form-control" data-change="pl-regime">
              <option value="ryczalt" ${pl.regime === 'ryczalt' ? 'selected' : ''}>${t(lang, 'pl_reg_ryczalt')}</option>
              <option value="skala" ${pl.regime === 'skala' ? 'selected' : ''}>${t(lang, 'pl_reg_skala')}</option>
              <option value="liniowy" ${pl.regime === 'liniowy' ? 'selected' : ''}>${t(lang, 'pl_reg_liniowy')}</option>
            </select>
          </div>

          ${
            pl.regime === 'ryczalt'
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="pl-rate">${t(lang, 'pl_rate_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="pl_desc_rate" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'pl_rate_label') })}">?</button>
              </div>
              <select id="pl-rate" class="form-control" data-change="pl-rate">
                <option value="12" ${pl.ryczaltRate === '12' ? 'selected' : ''}>${t(lang, 'pl_rate_12')}</option>
                <option value="8.5" ${pl.ryczaltRate === '8.5' ? 'selected' : ''}>${t(lang, 'pl_rate_8_5')}</option>
                <option value="14" ${pl.ryczaltRate === '14' ? 'selected' : ''}>${t(lang, 'pl_rate_14')}</option>
                <option value="15" ${pl.ryczaltRate === '15' ? 'selected' : ''}>${t(lang, 'pl_rate_15')}</option>
              </select>
            </div>
          `
              : ''
          }

          <div class="form-group">
            <div class="label-row">
              <label for="pl-eur-pln">${t(lang, 'pl_fx_label')}</label>
              <span class="label-meta">
                <span class="badge num-tabular">${fmtPln(disp.pln.gross, lang)}</span>
                <button type="button" class="info-trigger" data-tip-key="pl_desc_fx" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'pl_fx_label') })}">?</button>
              </span>
            </div>
            <div class="input-wrapper">
              <input type="number" id="pl-eur-pln" class="form-control num-tabular" value="${pl.eurPln}" min="2" max="10" step="any" data-step="0.05" data-input="pl-eur-pln">
              <div class="spinner-group">
                <button type="button" class="spin-btn" data-step-target="pl-eur-pln" data-step-dir="-1" aria-label="${t(lang, 'aria_decrease', { label: t(lang, 'pl_fx_label') })}">−</button>
                <button type="button" class="spin-btn" data-step-target="pl-eur-pln" data-step-dir="1" aria-label="${t(lang, 'aria_increase', { label: t(lang, 'pl_fx_label') })}">+</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="pl-employment">${t(lang, 'lbl_employment')}</label>
              <button type="button" class="info-trigger" data-tip-key="pl_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
            </div>
            <select id="pl-employment" class="form-control" data-change="pl-employment">
              <option value="full" ${pl.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${pl.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          ${
            pl.employment === 'full'
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="pl-zus">${t(lang, 'pl_zus_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="pl_desc_zus" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'pl_zus_label') })}">?</button>
              </div>
              <select id="pl-zus" class="form-control" data-change="pl-zus">
                <option value="ulga_y1" ${pl.zusStage === 'ulga_y1' ? 'selected' : ''}>${t(lang, 'pl_zus_ulga')}</option>
                <option value="pref" ${pl.zusStage === 'pref' ? 'selected' : ''}>${t(lang, 'pl_zus_pref')}</option>
                <option value="duzy" ${pl.zusStage === 'duzy' ? 'selected' : ''}>${t(lang, 'pl_zus_duzy')}</option>
              </select>
            </div>
          `
              : ''
          }

          ${renderFamilyControls(state, 'desc_pl_family', 'pl-fam')}
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
          secondaryNetText: `(${fmtPln(disp.pln.net, lang)})`
        })}

        ${
          res.isBreach
            ? `<div class="callout-banner danger">${t(lang, 'pl_alert_breach', { limit: fmtEurShort(res.limit, lang) })}</div>`
            : res.exceedsVatExempt
              ? `<div class="callout-banner amber">${t(lang, 'pl_alert_vat', { vatEur: fmtEurShort(res.vatThreshold, lang) })}</div>`
              : ''
        }
        ${
          familyActive && pl.regime !== 'skala'
            ? `<div class="callout-banner advisory compact">${t(lang, 'pl_family_note_ryczalt', { regime: res.regimeName })}</div>`
            : ''
        }

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)} <small class="muted-fx">(${fmtPln(disp.pln.gross, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'pl_res_deductions')}</span>
              <span class="badge num-tabular">${res.regimeName}</span>
              <button type="button" class="info-trigger" data-tip-key="pl_desc_rules" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'pl_res_deductions') })}">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)} <small class="muted-fx">(−${fmtPln(disp.pln.expenses, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)} <small class="muted-fx">(${fmtPln(disp.pln.taxBase, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (PIT)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)} <small class="muted-fx">(${fmtPln(disp.pln.tax, lang)})</small></span>
          </div>

          ${
            disp.familyCredit > 0
              ? `
            <div class="ledger-sub">
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'pl_det_gross_pit')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossTax, lang)} <small class="muted-fx">(${fmtPln(disp.pln.grossTax, lang)})</small></span>
              </div>
              ${
                disp.spouseCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'pl_det_spouse_split')}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.spouseCredit, lang)} <small class="muted-fx">(−${fmtPln(disp.pln.spouseCredit, lang)})</small></span>
                </div>
              `
                  : ''
              }
              ${
                disp.childCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'pl_det_child_credit', { n: res.children })}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.childCredit, lang)} <small class="muted-fx">(−${fmtPln(disp.pln.childCredit, lang)})</small></span>
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')} (ZUS + NFZ)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)} <small class="muted-fx">(${fmtPln(disp.pln.social, lang)})</small></span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'pl_det_zus')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.zusSocial, lang)} <small class="muted-fx">(${fmtPln(disp.pln.zusSocial, lang)})</small></span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'pl_det_nfz')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.health, lang)} <small class="muted-fx">(${fmtPln(disp.pln.health, lang)})</small></span>
            </div>
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)} <small class="muted-fx">(${fmtPln(disp.pln.net, lang)})</small></span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('pl', lang)}
  `;
}

export function renderCzechiaView(state) {
  const { lang, view, revenueEur, cz } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateCzechia({
    revenue: revenueEur,
    regime: cz.regime,
    expenseRate: cz.expenseRate,
    employment: cz.employment,
    stage: cz.stage,
    spouseYoungChild: cz.spouseYoungChild,
    eurCzk: cz.eurCzk,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcileCzechia(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.cz;
  const isPausal = res.resolvedRegime === 'pausalni_dan';
  const showSpouseCareToggle = Boolean(fam.dependentSpouse) && (Number(fam.children) || 0) >= 1;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'cz',
          countryName: t(lang, 'nav_cz'),
          regimeSubtitle: t(lang, 'cz_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="cz-regime">${t(lang, 'cz_reg_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="cz_desc_regime" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'cz_reg_label') })}">?</button>
            </div>
            <select id="cz-regime" class="form-control" data-change="cz-regime">
              <option value="auto" ${cz.regime === 'auto' ? 'selected' : ''}>${t(lang, 'cz_reg_auto')}</option>
              <option value="pausalni_dan" ${cz.regime === 'pausalni_dan' ? 'selected' : ''}>${t(lang, 'cz_reg_pausal')}</option>
              <option value="vydajovy_pausal" ${cz.regime === 'vydajovy_pausal' ? 'selected' : ''}>${t(lang, 'cz_reg_vydaje')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="cz-eur-czk">${t(lang, 'cz_fx_label')}</label>
              <span class="label-meta">
                <span class="badge num-tabular">${fmtCzk(disp.czk.gross, lang)}</span>
                <button type="button" class="info-trigger" data-tip-key="cz_desc_fx" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'cz_fx_label') })}">?</button>
              </span>
            </div>
            <div class="input-wrapper">
              <input type="number" id="cz-eur-czk" class="form-control num-tabular" value="${cz.eurCzk}" min="15" max="40" step="any" data-step="0.2" data-input="cz-eur-czk">
              <div class="spinner-group">
                <button type="button" class="spin-btn" data-step-target="cz-eur-czk" data-step-dir="-1" aria-label="${t(lang, 'aria_decrease', { label: t(lang, 'cz_fx_label') })}">−</button>
                <button type="button" class="spin-btn" data-step-target="cz-eur-czk" data-step-dir="1" aria-label="${t(lang, 'aria_increase', { label: t(lang, 'cz_fx_label') })}">+</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="cz-expense">${t(lang, 'cz_exp_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="cz_desc_expense" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'cz_exp_label') })}">?</button>
            </div>
            <select id="cz-expense" class="form-control" data-change="cz-expense">
              <option value="60" ${cz.expenseRate === '60' ? 'selected' : ''}>${t(lang, 'cz_exp_60')}</option>
              <option value="80" ${cz.expenseRate === '80' ? 'selected' : ''}>${t(lang, 'cz_exp_80')}</option>
              <option value="40" ${cz.expenseRate === '40' ? 'selected' : ''}>${t(lang, 'cz_exp_40')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="cz-employment">${t(lang, 'lbl_employment')}</label>
              <button type="button" class="info-trigger" data-tip-key="cz_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
            </div>
            <select id="cz-employment" class="form-control" data-change="cz-employment">
              <option value="full" ${cz.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${cz.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          ${
            !isPausal && cz.employment === 'full'
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="cz-stage">${t(lang, 'cz_stage_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="cz_desc_stage" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'cz_stage_label') })}">?</button>
              </div>
              <select id="cz-stage" class="form-control" data-change="cz-stage">
                <option value="established" ${cz.stage === 'established' ? 'selected' : ''}>${t(lang, 'cz_stage_est')}</option>
                <option value="new" ${cz.stage === 'new' ? 'selected' : ''}>${t(lang, 'cz_stage_new')}</option>
              </select>
            </div>
          `
              : ''
          }

          ${renderFamilyControls(state, 'desc_cz_family', 'cz-fam')}

          ${
            showSpouseCareToggle
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="cz-spouse-care">${t(lang, 'cz_spouse_care_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="cz_desc_spouse_care" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'cz_spouse_care_label') })}">?</button>
              </div>
              <select id="cz-spouse-care" class="form-control" data-change="cz-spouse-care">
                <option value="0" ${!cz.spouseYoungChild ? 'selected' : ''}>${t(lang, 'cz_spouse_care_no')}</option>
                <option value="1" ${cz.spouseYoungChild ? 'selected' : ''}>${t(lang, 'cz_spouse_care_yes')}</option>
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
          secondaryNetText: `(${fmtCzk(disp.czk.net, lang)})`
        })}

        ${
          res.isSideDisqualified
            ? `<div class="callout-banner danger">${t(lang, 'cz_alert_side')}</div>`
            : res.isBreach
              ? `<div class="callout-banner danger">${t(lang, 'cz_alert_breach', { limit: `${fmtEurShort(res.limit, lang)} / ${fmtCzk(res.limitCzk, lang)}` })}</div>`
              : res.exceedsVatExempt
                ? `<div class="callout-banner amber">${t(lang, 'cz_alert_vat', { vatEur: fmtEurShort(res.vatThreshold, lang) })}</div>`
                : ''
        }

        <div class="ledger">
          <div class="overline section-kicker">${t(lang, 'lbl_statement')}</div>

          <div class="ledger-row">
            <span class="ledger-lbl">${grossLabel}</span>
            <span class="ledger-val strong num-tabular">${fmtEur(disp.gross, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.gross, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span>${t(lang, 'res_expenses')}</span>
              <span class="badge ${res.isBreach ? 'danger' : 'num-tabular'}">
                ${isPausal ? t(lang, 'cz_band_lbl', { id: res.bandId }) : `${cz.expenseRate}%`}
              </span>
              <button type="button" class="info-trigger" data-tip-key="${isPausal ? 'cz_desc_pausal' : 'cz_desc_vydaje'}" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)} <small class="muted-fx">(−${fmtCzk(disp.czk.expenses, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.taxBase, lang)})</small></span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (${res.regimeName})</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.tax, lang)})</small></span>
          </div>

          ${
            disp.familyCredit > 0
              ? `
            <div class="ledger-sub">
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'cz_det_gross_dpfo')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossTax, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.grossTax, lang)})</small></span>
              </div>
              ${
                disp.spouseCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'cz_det_spouse_credit')}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.spouseCredit, lang)} <small class="muted-fx">(−${fmtCzk(disp.czk.spouseCredit, lang)})</small></span>
                </div>
              `
                  : ''
              }
              ${
                disp.childCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'cz_det_child_credit', { n: res.children })}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.childCredit, lang)} <small class="muted-fx">(−${fmtCzk(disp.czk.childCredit, lang)})</small></span>
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')} (ČSSZ + VZP)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.social, lang)})</small></span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'cz_det_soc')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.socPillar, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.socPillar, lang)})</small></span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'cz_det_vzp')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.healthPillar, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.healthPillar, lang)})</small></span>
            </div>
            ${
              disp.spouseObzp > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'cz_det_spouse_obzp')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.spouseObzp, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.spouseObzp, lang)})</small></span>
              </div>
            `
                : ''
            }
          </div>

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)} <small class="muted-fx">(${fmtCzk(disp.czk.net, lang)})</small></span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('cz', lang)}
  `;
}

export function renderSlovakiaView(state) {
  const { lang, view, revenueEur, sk } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateSlovakia({
    revenue: revenueEur,
    employment: sk.employment,
    stage: sk.stage,
    spouseCareQualifies: sk.spouseCareQualifies,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcileSlovakia(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.sk;
  const showSpouseCareToggle = Boolean(fam.dependentSpouse) && (Number(fam.children) || 0) >= 1;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'sk',
          countryName: t(lang, 'nav_sk'),
          regimeSubtitle: t(lang, 'sk_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="sk-employment">${t(lang, 'lbl_employment')}</label>
              <button type="button" class="info-trigger" data-tip-key="sk_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
            </div>
            <select id="sk-employment" class="form-control" data-change="sk-employment">
              <option value="full" ${sk.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${sk.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          ${
            sk.employment === 'full'
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="sk-stage">${t(lang, 'sk_stage_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="sk_desc_stage" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'sk_stage_label') })}">?</button>
              </div>
              <select id="sk-stage" class="form-control" data-change="sk-stage">
                <option value="established" ${sk.stage === 'established' ? 'selected' : ''}>${t(lang, 'sk_stage_est')}</option>
                <option value="new" ${sk.stage === 'new' ? 'selected' : ''}>${t(lang, 'sk_stage_new')}</option>
              </select>
            </div>
          `
              : ''
          }

          ${renderFamilyControls(state, 'desc_sk_family', 'sk-fam')}

          ${
            showSpouseCareToggle
              ? `
            <div class="form-group">
              <div class="label-row">
                <label for="sk-spouse-care">${t(lang, 'sk_spouse_care_label')}</label>
                <button type="button" class="info-trigger" data-tip-key="sk_desc_spouse_care" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'sk_spouse_care_label') })}">?</button>
              </div>
              <select id="sk-spouse-care" class="form-control" data-change="sk-spouse-care">
                <option value="1" ${sk.spouseCareQualifies ? 'selected' : ''}>${t(lang, 'sk_spouse_care_yes')}</option>
                <option value="0" ${!sk.spouseCareQualifies ? 'selected' : ''}>${t(lang, 'sk_spouse_care_no')}</option>
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

        ${res.isBreach ? `<div class="callout-banner amber">${t(lang, 'sk_alert_breach')}</div>` : ''}
        ${
          revenueEur > res.vatThreshold
            ? `<div class="callout-banner amber">${t(lang, 'sk_alert_vat')}</div>`
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
              <span class="badge num-tabular">60% (max 20k €)</span>
              <button type="button" class="info-trigger" data-tip-key="sk_desc_rules" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)}</span>
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
              <span class="ledger-lbl">${t(lang, 'sk_det_soc')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.socPillar, lang)}</span>
            </div>
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'sk_det_zp')}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.healthPillar, lang)}</span>
            </div>
            ${
              disp.spouseHealth > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'sk_det_spouse_zp')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.spouseHealth, lang)}</span>
              </div>
            `
                : ''
            }
            ${
              disp.nczdTaxpayer > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'sk_det_nczd')}</span>
                <span class="ledger-val num-tabular">−${fmtEur(disp.nczdTaxpayer, lang)}</span>
              </div>
            `
                : ''
            }
            ${
              disp.nczdSpouse > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'sk_det_nczd_spouse')}</span>
                <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.nczdSpouse, lang)}</span>
              </div>
            `
                : ''
            }
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (${res.isBreach ? '19–35%' : '15%'})</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          ${
            disp.familyCredit > 0
              ? `
            <div class="ledger-sub">
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'sk_det_gross_tax')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossTax, lang)}</span>
              </div>
              ${
                disp.spouseCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'sk_det_spouse_tax')}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.spouseCredit, lang)}</span>
                </div>
              `
                  : ''
              }
              ${
                disp.childCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'sk_det_child_bonus', { n: res.children })}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.childCredit, lang)}</span>
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)}</span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('sk', lang)}
  `;
}

export function renderSpainView(state) {
  const { lang, view, revenueEur, es } = state;
  const fam = state.family || { children: 0, dependentSpouse: false };
  const isMonthly = view === 'monthly';
  const grossLabel = t(lang, isMonthly ? 'res_gross_mo' : 'res_gross_yr');
  const res = calculateSpain({
    revenue: revenueEur,
    employment: es.employment,
    stage: es.stage,
    deductibleCostPct: es.deductibleCostPct,
    children: fam.children,
    dependentSpouse: fam.dependentSpouse
  });
  const disp = reconcileSpain(res, view);
  const profile = META_COMPARISON_2026.countryProfiles.es;
  const tramoBadge =
    es.stage === 'new' ? '80 €/mo' : es.stage === 'cuota_cero' ? '0 €' : res.tramoId;

  return `
    <div class="calc-workspace">
      <aside class="panel-card config-panel">
        ${renderCountryPanelHead({
          countryCode: 'es',
          countryName: t(lang, 'nav_es'),
          regimeSubtitle: t(lang, 'es_title'),
          authorityName: profile.authorityName,
          authorityUrl: profile.authorityUrl
        })}

        <div class="overline section-kicker">${t(lang, 'lbl_params')}</div>

        <div class="config-stack">
          <div class="form-group">
            <div class="label-row">
              <label for="es-stage">${t(lang, 'es_stage_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="es_desc_stage" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'es_stage_label') })}">?</button>
            </div>
            <select id="es-stage" class="form-control" data-change="es-stage">
              <option value="established" ${es.stage === 'established' ? 'selected' : ''}>${t(lang, 'es_stage_est')}</option>
              <option value="new" ${es.stage === 'new' ? 'selected' : ''}>${t(lang, 'es_stage_new')}</option>
              <option value="cuota_cero" ${es.stage === 'cuota_cero' ? 'selected' : ''}>${t(lang, 'es_stage_cero')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="es-cost">${t(lang, 'es_cost_label')}</label>
              <button type="button" class="info-trigger" data-tip-key="es_desc_cost" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'es_cost_label') })}">?</button>
            </div>
            <select id="es-cost" class="form-control" data-change="es-cost">
              <option value="0" ${es.deductibleCostPct === '0' ? 'selected' : ''}>${t(lang, 'es_cost_0')}</option>
              <option value="10" ${es.deductibleCostPct === '10' ? 'selected' : ''}>${t(lang, 'es_cost_10')}</option>
              <option value="20" ${es.deductibleCostPct === '20' ? 'selected' : ''}>${t(lang, 'es_cost_20')}</option>
            </select>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="es-employment">${t(lang, 'lbl_employment')}</label>
              <button type="button" class="info-trigger" data-tip-key="es_desc_emp" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'lbl_employment') })}">?</button>
            </div>
            <select id="es-employment" class="form-control" data-change="es-employment">
              <option value="full" ${es.employment === 'full' ? 'selected' : ''}>${t(lang, 'emp_full')}</option>
              <option value="side" ${es.employment === 'side' ? 'selected' : ''}>${t(lang, 'emp_side')}</option>
            </select>
          </div>

          ${renderFamilyControls(state, 'desc_es_family', 'es-fam')}
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

        ${res.isBreach ? `<div class="callout-banner danger">${t(lang, 'es_alert_breach')}</div>` : ''}
        ${
          revenueEur > 0
            ? `<div class="callout-banner advisory compact">${t(lang, 'es_alert_vat')}</div>`
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
              <span class="badge num-tabular">EDS</span>
              <button type="button" class="info-trigger" data-tip-key="es_desc_rules" aria-label="${t(lang, 'aria_info_about', { topic: t(lang, 'res_expenses') })}">?</button>
            </span>
            <span class="ledger-val muted num-tabular">−${fmtEur(disp.expenses, lang)}</span>
          </div>

          <div class="ledger-sub">
            ${
              disp.operatingCosts > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'es_det_op_costs', { pct: es.deductibleCostPct })}</span>
                <span class="ledger-val num-tabular">−${fmtEur(disp.operatingCosts, lang)}</span>
              </div>
            `
                : ''
            }
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'es_det_dificil')}</span>
              <span class="ledger-val num-tabular">−${fmtEur(disp.dificil, lang)}</span>
            </div>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot soc"></span>
              <span>${t(lang, 'res_soc')} (RETA)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.socialAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
          </div>

          <div class="ledger-sub">
            <div class="ledger-row sub">
              <span class="ledger-lbl">${t(lang, 'es_det_reta', { tramo: tramoBadge })}</span>
              <span class="ledger-val num-tabular">${fmtEur(disp.social, lang)}</span>
            </div>
            ${
              disp.conjunta > 0
                ? `
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'es_det_conjunta')}</span>
                <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.conjunta, lang)}</span>
              </div>
            `
                : ''
            }
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">${t(lang, 'res_base')}</span>
            <span class="ledger-val num-tabular">${fmtEur(disp.taxBase, lang)}</span>
          </div>

          <div class="ledger-row">
            <span class="ledger-lbl">
              <span class="dot tax"></span>
              <span>${t(lang, 'res_tax')} (IRPF 19–47%)</span>
              <span class="badge num-tabular">${fmtPct(revenueEur > 0 ? (res.taxAnnual / revenueEur) * 100 : 0, lang)}</span>
            </span>
            <span class="ledger-val num-tabular">${fmtEur(disp.tax, lang)}</span>
          </div>

          ${
            disp.familyCredit > 0
              ? `
            <div class="ledger-sub">
              <div class="ledger-row sub">
                <span class="ledger-lbl">${t(lang, 'es_det_gross_irpf')}</span>
                <span class="ledger-val num-tabular">${fmtEur(disp.grossTax, lang)}</span>
              </div>
              ${
                disp.spouseCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'es_det_spouse_irpf')}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.spouseCredit, lang)}</span>
                </div>
              `
                  : ''
              }
              ${
                disp.childCredit > 0
                  ? `
                <div class="ledger-row sub">
                  <span class="ledger-lbl">${t(lang, 'es_det_child_irpf', { n: res.children })}</span>
                  <span class="ledger-val text-emerald num-tabular">−${fmtEur(disp.childCredit, lang)}</span>
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          <div class="ledger-row net-total">
            <span class="ledger-lbl">${isMonthly ? t(lang, 'net_mo') : t(lang, 'net_yr')}</span>
            <span class="ledger-val text-emerald num-tabular">${fmtEur(disp.net, lang)}</span>
          </div>
        </div>
      </section>
    </div>

    ${renderCountryMiniProsCons('es', lang)}
  `;
}
