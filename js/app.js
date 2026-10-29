/**
 * Main Application Controller
 * Zero-dependency ES Module orchestrating shell state, event delegation,
 * focus preservation, shareable URL hashes, and active view rendering.
 */

import { store, encodeScenarioHash, applyScenarioHash } from './state.js';
import { t } from './i18n/index.js';
import { round2, fmtEur, fmtInputNum } from './utils/format.js';
import { countryFlag, UI_ICONS } from './utils/icons.js';
import { initFloatingTooltips, refreshActiveTooltip } from './utils/tooltip.js';
import { renderSloveniaView } from './views/sloveniaView.js';
import {
  renderCroatiaView,
  renderItalyView,
  renderAustriaView,
  renderHungaryView
} from './views/countryView.js';
import { renderCompareView } from './views/compareView.js';

const LANG_CYCLE = { sl: 'en', en: 'ua', ua: 'sl' };
const HTML_LANG_MAP = { sl: 'sl', en: 'en', ua: 'uk' };
const QUICK_REVENUES_YEARLY = [30000, 50000, 60000, 85000, 100000, 120000, 150000];
const QUICK_REVENUES_MONTHLY = [2500, 4000, 5000, 7000, 8500, 10000, 12500];

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
      return `<button type="button" class="quick-chip ${isAct ? 'active' : ''}" data-quick-rev="${annual}">${lbl}</button>`;
    }).join('');
  } else {
    row.innerHTML = QUICK_REVENUES_YEARLY.map(yr => {
      const isAct = Math.abs(yr - state.revenueEur) < 1;
      return `<button type="button" class="quick-chip ${isAct ? 'active' : ''}" data-quick-rev="${yr}">${yr / 1000}k €</button>`;
    }).join('');
  }
}

function updateShellControls(state, forceRevenueSync = false) {
  const { lang, activeTab, view, revenueEur } = state;
  const isMonthly = view === 'monthly';

  document.documentElement.setAttribute('lang', HTML_LANG_MAP[lang] || 'en');
  document.title = t(lang, 'doc_title');

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

  // Top Country / Arena Tabs
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const tab = btn.getAttribute('data-nav-tab');
    btn.classList.toggle('active', tab === activeTab);
    const lblSpan = btn.querySelector('.nav-lbl');
    if (lblSpan) lblSpan.innerText = t(lang, `nav_${tab}`);
  });

  // Shared Revenue Input & Period Equivalence Pill
  document.getElementById('lbl-global-rev').innerText = t(
    lang,
    isMonthly ? 'label_revenue_mo' : 'label_revenue'
  );
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

  // Footer Disclaimer
  document.getElementById('footer-disclaimer').innerHTML = t(lang, 'footer_disclaimer');
}

function renderActiveView(state) {
  const mount = document.getElementById('view-mount');

  // Preserve focus & cursor position for tab-internal numeric inputs during live typing
  const activeEl = document.activeElement;
  const focusedId = activeEl && mount.contains(activeEl) ? activeEl.id : null;
  const focusedVal = focusedId ? activeEl.value : null;

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
      if (focusedVal !== null && restored.value !== focusedVal) {
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
}

function bindEvents() {
  // Global Revenue live input (interprets value as Monthly when view === 'monthly', else Yearly)
  const revInput = document.getElementById('global-revenue');
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

    // 3. Quick Revenue Preset Chips (data-quick-rev always stores canonical annual EUR)
    const quickChip = e.target.closest('[data-quick-rev]');
    if (quickChip) {
      const annualVal = Number(quickChip.getAttribute('data-quick-rev'));
      store.update(s => {
        s.revenueEur = annualVal;
      });
      updateShellControls(store.state, true);
      return;
    }

    // 4. Monthly / Yearly View Switch
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

    // 5. +/- Spinner Buttons (exact arithmetic without HTML5 step-base snapping)
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

    // 6. Interactive SVG Chart Click-to-Select Revenue
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

    // 7. View Action Buttons
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
        }
        else if (action === 'jump-tab') {
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
    return key ? t(store.state.lang, key) : '';
  });
  applyScenarioHash(store.state, window.location.hash);
  store.subscribe(s => renderAll(s, false));
  bindEvents();
  renderAll(store.state, true);
}

window.addEventListener('DOMContentLoaded', init);
