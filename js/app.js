/**
 * Main Application Controller
 * Zero-dependency ES Module orchestrating shell state, event delegation,
 * WAI-ARIA keyboard navigation, focus preservation, shareable URL hashes / query params,
 * debounced screen-reader live announcements, and active view rendering.
 */

import {
  store,
  resolveTabSlug,
  encodeScenarioHash,
  applyScenarioSearch,
  applyScenarioHash
} from './state.js';
import { t } from './i18n/index.js';
import { round2, fmtEur, fmtSignedEur, fmtPct, fmtInputNum } from './utils/format.js';
import { countryFlag, UI_ICONS } from './utils/icons.js';
import { initFloatingTooltips, refreshActiveTooltip } from './utils/tooltip.js';
import { compareSloveniaRegimes } from './engines/slovenia.js';
import { evaluateCrossBorderArena } from './engines/arena.js';
import { reconcileSlovenia, reconcileByCountry } from './utils/reconcile.js';
import { renderSloveniaView } from './views/sloveniaView.js';
import {
  renderCroatiaView,
  renderItalyView,
  renderAustriaView,
  renderHungaryView,
  renderPolandView,
  renderCzechiaView,
  renderSlovakiaView,
  renderSpainView
} from './views/countryView.js';
import { renderCompareView } from './views/compareView.js';

const LANG_CYCLE = { sl: 'en', en: 'ua', ua: 'sl' };
const HTML_LANG_MAP = { sl: 'sl', en: 'en', ua: 'uk' };
const QUICK_REVENUES_YEARLY = [30000, 50000, 60000, 85000, 100000, 120000, 150000];
const QUICK_REVENUES_MONTHLY = [2500, 4000, 5000, 7000, 8500, 10000, 12500];

let srAnnounceTimer = null;
let isInitialBoot = true;

export function computeLiveSummary(state) {
  const { lang, activeTab, view, si } = state;
  const isMonthly = view === 'monthly';
  const per = t(lang, isMonthly ? 'per_mo' : 'per_yr');

  if (activeTab === 'si' && si.regimeView === 'compare') {
    const fam = state.family || { children: 0, dependentSpouse: false };
    const cmp = compareSloveniaRegimes({
      revenue: state.revenueEur,
      mode: si.mode,
      avgSalary: si.avgSalary,
      status: si.status,
      baseMethod: si.baseMethod,
      manualBase: si.manualBase,
      children: fam.children,
      dependentSpouse: fam.dependentSpouse
    });
    const dZpzr = reconcileSlovenia(cmp.zpzr, view);
    const dZiurs = reconcileSlovenia(cmp.ziurs, view);
    const diff = round2(dZiurs.net - dZpzr.net);
    return t(lang, 'sr_live_si_cmp', {
      zpzr: fmtEur(dZpzr.net, lang),
      ziurs: fmtEur(dZiurs.net, lang),
      diff: fmtSignedEur(diff, lang, 2),
      per
    });
  }

  const arena = evaluateCrossBorderArena(state);

  if (activeTab === 'compare') {
    const top = arena.ranked.find(r => r.isEligible) || arena.ranked[0];
    const topDisp = reconcileByCountry(top.countryCode, top.raw, view);
    const countryName = t(lang, `nav_${top.countryCode}`);
    return t(lang, 'sr_live_arena', {
      gross: fmtEur(topDisp.gross, lang),
      per,
      winner: `${countryName} (${top.regimeLabel})`,
      net: fmtEur(topDisp.net, lang)
    });
  }

  // Single country summary: evaluate withCustom persona so tab-specific tweaks are reflected
  const customArena = evaluateCrossBorderArena({
    ...state,
    compare: { ...state.compare, personaMode: 'custom' }
  });
  let targetId = activeTab;
  if (activeTab === 'si') {
    targetId = si.regimeView === 'ziurs' ? 'si_ziurs' : 'si_zpzr';
  } else if (activeTab === 'hu') {
    targetId = state.hu.regime === 'kata' ? 'hu_kata' : 'hu_ata';
  }
  const entry =
    customArena.ranked.find(r => r.id === targetId || r.countryCode === activeTab) ||
    customArena.ranked[0];
  const disp = reconcileByCountry(entry.countryCode, entry.raw, view);
  return t(lang, 'sr_live_single', {
    country: t(lang, `nav_${entry.countryCode}`),
    net: fmtEur(disp.net, lang),
    per,
    eff: fmtPct(entry.effectiveRatePct, lang)
  });
}

function scheduleScreenReaderAnnouncement(state) {
  if (isInitialBoot) return;
  clearTimeout(srAnnounceTimer);
  srAnnounceTimer = setTimeout(() => {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
      announcer.textContent = computeLiveSummary(state);
    }
  }, 450);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const metaTheme = document.getElementById('meta-theme-color');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#0a0c10' : '#f5f6f8');
  }
  const themeBtn = document.getElementById('btn-theme');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? UI_ICONS.sun : UI_ICONS.moon;
  }
}

function mountStaticFlags() {
  document.querySelectorAll('[data-flag]').forEach(el => {
    const code = el.getAttribute('data-flag');
    el.innerHTML = countryFlag(code);
  });
}

function renderQuickRevenueChips(state) {
  const row = document.getElementById('quick-rev-row');
  if (state.view === 'monthly') {
    row.innerHTML = QUICK_REVENUES_MONTHLY.map(mo => {
      const annual = mo * 12;
      const lbl = `${mo % 1000 === 0 ? mo / 1000 : (mo / 1000).toFixed(1)}k €/mo`;
      const isAct = Math.abs(annual - state.revenueEur) < 1;
      return `<button type="button" class="quick-chip ${isAct ? 'active' : ''}" data-quick-rev="${annual}" aria-pressed="${isAct}">${lbl}</button>`;
    }).join('');
  } else {
    row.innerHTML = QUICK_REVENUES_YEARLY.map(yr => {
      const isAct = Math.abs(yr - state.revenueEur) < 1;
      return `<button type="button" class="quick-chip ${isAct ? 'active' : ''}" data-quick-rev="${yr}" aria-pressed="${isAct}">${yr / 1000}k €</button>`;
    }).join('');
  }
}

function updateShellControls(state, forceRevenueSync = false) {
  const { lang, activeTab, view, revenueEur } = state;
  const isMonthly = view === 'monthly';

  document.documentElement.setAttribute('lang', HTML_LANG_MAP[lang] || 'en');
  document.title = t(lang, 'doc_title');

  const skipLink = document.getElementById('skip-link');
  if (skipLink) skipLink.innerText = t(lang, 'skip_to_calc');

  const tablist = document.getElementById('country-tablist');
  if (tablist) tablist.setAttribute('aria-label', t(lang, 'aria_countries_nav'));

  const periodToggle = document.getElementById('period-toggle');
  if (periodToggle) periodToggle.setAttribute('aria-label', t(lang, 'aria_billing_period'));

  const container = document.getElementById('app-container');
  const isWide =
    activeTab === 'compare' || (activeTab === 'si' && state.si.regimeView === 'compare');
  container.classList.toggle('wide', isWide);

  document.getElementById('brand-title').innerText = t(lang, 'brand_title');
  document.getElementById('brand-subtitle').innerText = t(lang, 'brand_subtitle');
  document.getElementById('btn-lang').innerText = lang.toUpperCase();

  const shareBtn = document.getElementById('btn-share');
  if (!shareBtn.dataset.copiedActive) {
    shareBtn.innerHTML = `${UI_ICONS.share} <span class="hide-xs">${t(lang, 'btn_share')}</span>`;
  }

  // Top Country / Arena Tabs (WAI-ARIA tablist + roving tabindex)
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const tab = btn.getAttribute('data-nav-tab');
    const isSelected = tab === activeTab;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    const lblSpan = btn.querySelector('.nav-lbl');
    if (lblSpan) lblSpan.innerText = t(lang, `nav_${tab}`);
  });

  const mount = document.getElementById('view-mount');
  if (mount) {
    mount.setAttribute('aria-labelledby', `tab-${activeTab}`);
  }

  // Shared Revenue Input, Contextual ARIA Labels & Period Equivalence Pill
  const revLabelText = t(lang, isMonthly ? 'label_revenue_mo' : 'label_revenue');
  document.getElementById('lbl-global-rev').innerText = revLabelText;

  const revInfoBtn = document.getElementById('btn-rev-info');
  if (revInfoBtn) {
    revInfoBtn.setAttribute('aria-label', t(lang, 'aria_info_about', { topic: revLabelText }));
  }
  const revDecBtn = document.getElementById('btn-rev-dec');
  if (revDecBtn) {
    revDecBtn.setAttribute('aria-label', t(lang, 'aria_decrease', { label: revLabelText }));
  }
  const revIncBtn = document.getElementById('btn-rev-inc');
  if (revIncBtn) {
    revIncBtn.setAttribute('aria-label', t(lang, 'aria_increase', { label: revLabelText }));
  }

  const equivEl = document.getElementById('rev-period-equiv');
  if (equivEl) {
    equivEl.innerText = isMonthly
      ? t(lang, 'equiv_annual', { val: fmtEur(revenueEur, lang) })
      : t(lang, 'equiv_monthly', { val: fmtEur(round2(revenueEur / 12), lang) });
  }

  const revInput = document.getElementById('global-revenue');
  revInput.setAttribute('data-step', isMonthly ? '500' : '5000');
  if (forceRevenueSync || document.activeElement !== revInput) {
    revInput.value = isMonthly ? fmtInputNum(revenueEur / 12) : fmtInputNum(revenueEur);
  }

  // Render period-matched quick-revenue chips
  renderQuickRevenueChips(state);

  // Monthly / Yearly toggle
  const btnMo = document.getElementById('view-mo');
  const btnYr = document.getElementById('view-yr');
  btnMo.innerText = t(lang, 'view_mo');
  btnYr.innerText = t(lang, 'view_yr');
  btnMo.classList.toggle('active', isMonthly);
  btnYr.classList.toggle('active', !isMonthly);
  btnMo.setAttribute('aria-pressed', isMonthly ? 'true' : 'false');
  btnYr.setAttribute('aria-pressed', !isMonthly ? 'true' : 'false');

  // Footer Disclaimer
  document.getElementById('footer-disclaimer').innerHTML = t(lang, 'footer_disclaimer');
}

function renderActiveView(state) {
  const mount = document.getElementById('view-mount');

  // Preserve focus & cursor value for tab-internal inputs and interactive SVG chart
  const activeEl = document.activeElement;
  const focusedId = activeEl && mount.contains(activeEl) ? activeEl.id : null;
  const focusedVal = focusedId && 'value' in activeEl ? activeEl.value : null;

  let html = '';
  switch (state.activeTab) {
    case 'si':
      html = renderSloveniaView(state);
      break;
    case 'hr':
      html = renderCroatiaView(state);
      break;
    case 'it':
      html = renderItalyView(state);
      break;
    case 'at':
      html = renderAustriaView(state);
      break;
    case 'hu':
      html = renderHungaryView(state);
      break;
    case 'pl':
      html = renderPolandView(state);
      break;
    case 'cz':
      html = renderCzechiaView(state);
      break;
    case 'sk':
      html = renderSlovakiaView(state);
      break;
    case 'es':
      html = renderSpainView(state);
      break;
    case 'compare':
      html = renderCompareView(state);
      break;
    default:
      html = renderSloveniaView(state);
  }

  mount.innerHTML = html;

  if (focusedId) {
    const restored = document.getElementById(focusedId);
    if (restored) {
      if (focusedVal !== null && 'value' in restored && restored.value !== focusedVal) {
        restored.value = focusedVal;
      }
      restored.focus();
    }
  }
}

function renderAll(state, forceRevenueSync = false) {
  applyTheme(state.theme);
  updateShellControls(state, forceRevenueSync);
  renderActiveView(state);
  refreshActiveTooltip();
  scheduleScreenReaderAnnouncement(state);
}

function bindEvents() {
  // Skip-to-calculator link focuses and selects the hero revenue input cleanly
  const skipLink = document.getElementById('skip-link');
  const revInput = document.getElementById('global-revenue');
  if (skipLink) {
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      revInput.focus();
      if (typeof revInput.select === 'function') revInput.select();
    });
  }

  // Global Revenue live input (interprets value as Monthly when view === 'monthly', else Yearly)
  revInput.addEventListener('input', () => {
    const v = parseFloat(revInput.value);
    const clean = Number.isFinite(v) && v >= 0 ? v : 0;
    store.update(s => {
      s.revenueEur = s.view === 'monthly' ? round2(clean * 12) : round2(clean);
    });
  });

  // Top Header Controls
  document.getElementById('btn-lang').addEventListener('click', () => {
    store.update(s => {
      s.lang = LANG_CYCLE[s.lang] || 'en';
    });
  });

  document.getElementById('btn-theme').addEventListener('click', () => {
    store.update(s => {
      s.theme = s.theme === 'light' ? 'dark' : 'light';
    });
  });

  document.getElementById('btn-share').addEventListener('click', async () => {
    const hash = encodeScenarioHash(store.state);
    window.history.replaceState(null, '', hash);
    const fullUrl = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      }
    } catch (_) {
      // Fallback: URL bar already updated with shareable hash
    }
    const shareBtn = document.getElementById('btn-share');
    shareBtn.dataset.copiedActive = '1';
    shareBtn.innerHTML = `${UI_ICONS.check} <span>${t(store.state.lang, 'btn_copied')}</span>`;
    setTimeout(() => {
      delete shareBtn.dataset.copiedActive;
      updateShellControls(store.state);
    }, 1800);
  });

  // WAI-ARIA Keyboard Navigation (Top Country Tablist, Regime Segmented Group, Interactive SVG Slider)
  document.addEventListener('keydown', e => {
    // 1. Top Country & Compare All Tablist (ArrowRight / ArrowLeft / Home / End)
    const navBtn = e.target.closest('[data-nav-tab]');
    if (navBtn) {
      const tabs = Array.from(document.querySelectorAll('[data-nav-tab]'));
      const curIdx = tabs.indexOf(navBtn);
      if (curIdx !== -1) {
        let nextIdx = -1;
        if (e.key === 'ArrowRight') nextIdx = (curIdx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') nextIdx = (curIdx - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = tabs.length - 1;

        if (nextIdx !== -1) {
          e.preventDefault();
          const targetBtn = tabs[nextIdx];
          const nextTab = targetBtn.getAttribute('data-nav-tab');
          store.update(s => {
            s.activeTab = nextTab;
          });
          targetBtn.focus();
          if (typeof targetBtn.scrollIntoView === 'function') {
            targetBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
          }
        }
      }
      return;
    }

    // 2. Interactive SVG Burden Chart Slider (ArrowLeft/Right/Up/Down, PageUp/Down, Home/End)
    const svg = e.target.closest('.burden-svg');
    if (svg) {
      const maxRev = Number(svg.getAttribute('data-max-rev')) || 160000;
      const curRev = store.state.revenueEur;
      let nextRev = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') nextRev = curRev + 2500;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nextRev = curRev - 2500;
      else if (e.key === 'PageUp') nextRev = curRev + 10000;
      else if (e.key === 'PageDown') nextRev = curRev - 10000;
      else if (e.key === 'Home') nextRev = 15000;
      else if (e.key === 'End') nextRev = maxRev;

      if (nextRev !== null) {
        e.preventDefault();
        const clamped = Math.min(maxRev, Math.max(0, Math.round(nextRev / 2500) * 2500));
        store.update(s => {
          s.revenueEur = clamped;
        });
        updateShellControls(store.state, true);
      }
    }
  });

  // Delegated Click Handler (Tabs, Toggles, Spinners, SVG Chart Scrubbing)
  document.addEventListener('click', e => {
    // 1. Top Nav Tabs
    const navBtn = e.target.closest('[data-nav-tab]');
    if (navBtn) {
      const tab = navBtn.getAttribute('data-nav-tab');
      store.update(s => {
        s.activeTab = tab;
      });
      return;
    }

    // 2. Quick Revenue Preset Chips (data-quick-rev always stores canonical annual EUR)
    const quickChip = e.target.closest('[data-quick-rev]');
    if (quickChip) {
      const annualVal = Number(quickChip.getAttribute('data-quick-rev'));
      store.update(s => {
        s.revenueEur = annualVal;
      });
      updateShellControls(store.state, true);
      return;
    }

    // 3. Monthly / Yearly View Switch
    const viewBtn = e.target.closest('[data-view-mode]');
    if (viewBtn) {
      const mode = viewBtn.getAttribute('data-view-mode');
      if (mode && mode !== store.state.view) {
        store.update(s => {
          s.view = mode;
        });
        updateShellControls(store.state, true);
      }
      return;
    }

    // 4. +/- Spinner Buttons (exact arithmetic without HTML5 step-base snapping)
    const spinBtn = e.target.closest('[data-step-target]');
    if (spinBtn) {
      const targetId = spinBtn.getAttribute('data-step-target');
      const dir = Number(spinBtn.getAttribute('data-step-dir'));
      const input = document.getElementById(targetId);
      if (input) {
        const step = Number(input.getAttribute('data-step') || input.getAttribute('step')) || 100;
        const minAttr = input.getAttribute('min');
        const maxAttr = input.getAttribute('max');
        const min = minAttr !== null ? Number(minAttr) : 0;
        const max = maxAttr !== null ? Number(maxAttr) : Infinity;
        const cur = parseFloat(input.value) || 0;
        const next = Math.min(max, Math.max(min, fmtInputNum(cur + dir * step)));
        input.value = next;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return;
    }

    // 5. Interactive SVG Chart Click-to-Select Revenue
    const svg = e.target.closest('.burden-svg');
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const maxRev = Number(svg.getAttribute('data-max-rev')) || 160000;
      const padL = Number(svg.getAttribute('data-pad-l')) || 44;
      const plotW = Number(svg.getAttribute('data-plot-w')) || 618;
      const viewBoxW = 680;
      const relX = ((e.clientX - rect.left) / rect.width) * viewBoxW;
      const ratio = Math.min(1, Math.max(0, (relX - padL) / plotW));
      const snappedRev = Math.round((ratio * maxRev) / 2500) * 2500;
      store.update(s => {
        s.revenueEur = snappedRev;
      });
      updateShellControls(store.state, true);
      return;
    }

    // 6. View Action Buttons
    const actEl = e.target.closest('[data-action]');
    if (actEl) {
      const action = actEl.getAttribute('data-action');
      const val = actEl.getAttribute('data-val');

      store.update(s => {
        if (action === 'si-regime') s.si.regimeView = val;
        else if (action === 'si-mode') s.si.mode = val;
        else if (action === 'cmp-mode') s.compare.personaMode = val;
        else if (action === 'cmp-emp') s.compare.employment = val;
        else if (action === 'cmp-stage') s.compare.stage = val;
        else if (action === 'cmp-client') {
          s.compare.clientType = val;
          s.hu.clientType = val;
        } else if (action === 'cmp-region') {
          s.compare.regionFilter = val;
        } else if (action === 'fam-kids') {
          s.family.children = Math.max(0, Math.floor(Number(val) || 0));
        } else if (action === 'fam-spouse') {
          s.family.dependentSpouse = val === '1';
        } else if (action === 'jump-tab') {
          s.activeTab = actEl.getAttribute('data-tab') || 'si';
          const siReg = actEl.getAttribute('data-si-reg');
          if (siReg) s.si.regimeView = siReg;
          const huReg = actEl.getAttribute('data-hu-reg');
          if (huReg) s.hu.regime = huReg;
        }
      });
    }
  });

  // Delegated Input Handler for Tab-Specific Numeric Fields
  document.getElementById('view-mount').addEventListener('input', e => {
    const key = e.target.getAttribute('data-input');
    if (!key) return;
    const num = parseFloat(e.target.value);

    store.update(s => {
      if (key === 'si-avg-salary' && Number.isFinite(num) && num > 0) s.si.avgSalary = num;
      else if (key === 'si-manual-base' && Number.isFinite(num) && num >= 0) s.si.manualBase = num;
      else if (key === 'hu-eur-huf' && Number.isFinite(num) && num > 0) s.hu.eurHuf = num;
      else if (key === 'pl-eur-pln' && Number.isFinite(num) && num > 0) s.pl.eurPln = num;
      else if (key === 'cz-eur-czk' && Number.isFinite(num) && num > 0) s.cz.eurCzk = num;
    });
  });

  // Delegated Change Handler for Select Dropdowns
  document.getElementById('view-mount').addEventListener('change', e => {
    const key = e.target.getAttribute('data-change');
    if (!key) return;
    const val = e.target.value;

    store.update(s => {
      switch (key) {
        case 'si-status':
          s.si.status = val;
          break;
        case 'si-base-type':
          s.si.baseMethod = val;
          if (val === 'manual') {
            s.si.manualBase = Number(s.si.lastAutoBase.toFixed(2));
          }
          break;
        case 'hr-employment':
          s.hr.employment = val;
          break;
        case 'hr-hok':
          s.hr.hokExempt = val === '1';
          break;
        case 'it-tax':
          s.it.taxRateType = val;
          break;
        case 'it-activity':
          s.it.activity = val;
          break;
        case 'it-inps':
          s.it.inpsScheme = val;
          break;
        case 'it-discount':
          s.it.forfettarioDiscount35 = val === '1';
          break;
        case 'at-scheme':
          s.at.scheme = val;
          break;
        case 'at-activity':
          s.at.activity = val;
          break;
        case 'at-employment':
          s.at.employment = val;
          break;
        case 'at-spouse-waiver':
          s.at.spouseChildRearingWaiver = val === '1';
          break;
        case 'fam-children':
          s.family.children = Math.max(0, Math.floor(Number(val) || 0));
          break;
        case 'fam-spouse':
          s.family.dependentSpouse = val === '1';
          break;
        case 'hu-regime':
          s.hu.regime = val;
          break;
        case 'hu-employment':
          s.hu.employment = val;
          break;
        case 'hu-expense':
          s.hu.expenseTier = val;
          break;
        case 'hu-wage':
          s.hu.wageFloor = val;
          break;
        case 'hu-hipa':
          s.hu.hipaMode = val;
          break;
        case 'pl-regime':
          s.pl.regime = val;
          break;
        case 'pl-rate':
          s.pl.ryczaltRate = val;
          break;
        case 'pl-employment':
          s.pl.employment = val;
          break;
        case 'pl-zus':
          s.pl.zusStage = val;
          break;
        case 'cz-regime':
          s.cz.regime = val;
          break;
        case 'cz-expense':
          s.cz.expenseRate = val;
          break;
        case 'cz-employment':
          s.cz.employment = val;
          break;
        case 'cz-stage':
          s.cz.stage = val;
          break;
        case 'cz-spouse-care':
          s.cz.spouseYoungChild = val === '1';
          break;
        case 'sk-employment':
          s.sk.employment = val;
          break;
        case 'sk-stage':
          s.sk.stage = val;
          break;
        case 'sk-spouse-care':
          s.sk.spouseCareQualifies = val === '1';
          break;
        case 'es-stage':
          s.es.stage = val;
          break;
        case 'es-cost':
          s.es.deductibleCostPct = val;
          break;
        case 'es-employment':
          s.es.employment = val;
          break;
      }
    });
  });

  // System dark-mode listener (when user hasn't forced manual preference)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ev => {
      if (!localStorage.getItem('si_tax_calc_theme')) {
        store.update(s => {
          s.theme = ev.matches ? 'dark' : 'light';
        });
      }
    });
  }

  // Browser back/forward hash sync
  window.addEventListener('hashchange', () => {
    store.update(s => {
      applyScenarioHash(s, window.location.hash);
    });
    updateShellControls(store.state, true);
  });
}

function init() {
  mountStaticFlags();
  initFloatingTooltips(trigger => {
    const key = trigger.getAttribute('data-tip-key');
    if (!key) return '';
    const rawVars = trigger.getAttribute('data-tip-vars');
    if (!rawVars) return t(store.state.lang, key);
    try {
      return t(store.state.lang, key, JSON.parse(rawVars));
    } catch (_) {
      return t(store.state.lang, key);
    }
  });

  // 3-tier initial tab & scenario resolution:
  // 1. Page-level default tab (e.g. /poland/index.html -> data-default-tab="pl")
  // 2. Query string parameters (?country=pl&rev=80000 or ?tab=compare)
  // 3. Shareable URL hash (#tab=si&rev=65000...)
  const defaultTab = resolveTabSlug(document.documentElement.dataset.defaultTab);
  if (defaultTab) {
    store.state.activeTab = defaultTab;
  }
  applyScenarioSearch(store.state, window.location.search);
  applyScenarioHash(store.state, window.location.hash);

  store.subscribe(s => renderAll(s, false));
  bindEvents();
  renderAll(store.state, true);
  isInitialBoot = false;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', init);
}
