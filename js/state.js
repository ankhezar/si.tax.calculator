/**
 * Centralized reactive state store with localStorage preference persistence
 * and 100% client-side URL hash scenario encoding/decoding.
 */

const STORAGE_KEYS = {
  lang: 'si_tax_calc_lang',
  theme: 'si_tax_calc_theme'
};

export function detectLanguage() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEYS.lang);
    if (saved === 'sl' || saved === 'en' || saved === 'ua') return saved;
  }
  if (typeof navigator !== 'undefined') {
    const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (lang.startsWith('sl')) return 'sl';
    if (lang.startsWith('uk') || lang.startsWith('ua')) return 'ua';
  }
  return 'en';
}

export function detectTheme() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === 'light' || saved === 'dark') return saved;
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

export function createDefaultState() {
  return {
    activeTab: 'si',        // 'si' | 'hr' | 'it' | 'at' | 'hu' | 'compare'
    revenueEur: 65000,
    view: 'yearly',         // 'yearly' | 'monthly'
    lang: detectLanguage(), // 'sl' | 'en' | 'ua'
    theme: detectTheme(),   // 'light' | 'dark'

    si: {
      regimeView: 'zpzr',   // 'zpzr' | 'ziurs' | 'compare'
      mode: 'polni',        // 'polni' | 'pop'
      avgSalary: 2536.03,
      status: 'y1',         // 'y1' | 'y2' | 'y3' | 'steady'
      baseMethod: 'auto',   // 'auto' | 'manual'
      manualBase: 1521.62,
      lastAutoBase: 1521.62
    },

    hr: {
      employment: 'full',   // 'full' | 'side'
      hokExempt: false      // true = first 2 years exempt from HOK 11.40 €/mo
    },

    it: {
      taxRateType: 'standard', // 'startup' (5%) | 'standard' (15%)
      activity: 'it_67',       // 'prof_78' | 'it_67' | 'artisan_67' | 'commerce_40'
      inpsScheme: 'separata',  // 'separata' | 'separata_side' | 'artigiani' | 'commercianti'
      forfettarioDiscount35: true,
      fullTimeEmployeeExempt: false
    },

    at: {
      scheme: 'auto',          // 'auto' | 'klein' | 'basis'
      activity: 'services',    // 'services' (20% KU / 6% Basis) | 'goods' (45% KU / 15% Basis)
      employment: 'full',      // 'full' | 'side'
      kleinSvsOptOut: false
    },

    hu: {
      regime: 'atalanyado',    // 'atalanyado' | 'kata'
      employment: 'full',      // 'full' (főállású) | 'side' (mellékállású)
      expenseTier: '45',       // '45' | '80' | '90'
      wageFloor: 'guaranteed', // 'guaranteed' (373,200 HUF) | 'minimal' (322,800 HUF)
      hipaMode: 'simplified',  // 'simplified' | 'standard2' | 'none'
      clientType: 'b2b',       // 'b2b' | 'b2c'
      eurHuf: 400
    },

    compare: {
      personaMode: 'preset',   // 'preset' | 'custom'
      employment: 'full',      // 'full' | 'side'
      stage: 'established',    // 'established' | 'new'
      clientType: 'b2b'        // 'b2b' | 'b2c'
    }
  };
}

export const store = {
  state: createDefaultState(),
  listeners: new Set(),

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  },

  notify() {
    for (const fn of this.listeners) fn(this.state);
  },

  update(mutator) {
    mutator(this.state);
    this.persistPreferences();
    this.notify();
  },

  persistPreferences() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.lang, this.state.lang);
      localStorage.setItem(STORAGE_KEYS.theme, this.state.theme);
    } catch (_) {
      // Ignore storage quota / privacy mode errors
    }
  }
};

/**
 * Compact URL hash serialization so users can bookmark or share exact scenarios
 * without any server or analytics.
 */
export function encodeScenarioHash(state) {
  const params = new URLSearchParams();
  params.set('tab', state.activeTab);
  params.set('rev', String(Math.round(state.revenueEur)));
  params.set('view', state.view);
  params.set('lang', state.lang);

  // Slovenia params
  params.set('si_reg', state.si.regimeView);
  params.set('si_mode', state.si.mode);
  params.set('si_st', state.si.status);
  if (state.si.avgSalary !== 2536.03) params.set('si_sal', String(state.si.avgSalary));
  if (state.si.baseMethod === 'manual') {
    params.set('si_bm', 'manual');
    params.set('si_mb', String(state.si.manualBase));
  }

  // Country & compare key toggles
  params.set('hr_emp', state.hr.employment);
  if (state.hr.hokExempt) params.set('hr_hok', '1');

  params.set('it_tx', state.it.taxRateType);
  params.set('it_act', state.it.activity);
  params.set('it_inps', state.it.inpsScheme);
  if (!state.it.forfettarioDiscount35) params.set('it_d35', '0');

  params.set('at_sch', state.at.scheme);
  params.set('at_act', state.at.activity);

  params.set('hu_reg', state.hu.regime);
  params.set('hu_emp', state.hu.employment);
  params.set('hu_exp', state.hu.expenseTier);
  if (state.hu.eurHuf !== 400) params.set('hu_fx', String(state.hu.eurHuf));

  params.set('cmp_m', state.compare.personaMode);
  params.set('cmp_emp', state.compare.employment);
  params.set('cmp_st', state.compare.stage);
  params.set('cmp_cl', state.compare.clientType);

  return '#' + params.toString();
}

export function applyScenarioHash(state, hashString) {
  if (!hashString || hashString.length <= 1) return false;
  const raw = hashString.startsWith('#') ? hashString.slice(1) : hashString;
  const p = new URLSearchParams(raw);
  if (!p.has('rev') && !p.has('tab')) return false;

  const validTabs = ['si', 'hr', 'it', 'at', 'hu', 'compare'];
  if (validTabs.includes(p.get('tab'))) state.activeTab = p.get('tab');

  const rev = parseFloat(p.get('rev'));
  if (Number.isFinite(rev) && rev >= 0) state.revenueEur = rev;

  if (p.get('view') === 'monthly' || p.get('view') === 'yearly') state.view = p.get('view');
  if (['sl', 'en', 'ua'].includes(p.get('lang'))) state.lang = p.get('lang');
  if (['light', 'dark'].includes(p.get('theme'))) state.theme = p.get('theme');

  if (['zpzr', 'ziurs', 'compare'].includes(p.get('si_reg'))) state.si.regimeView = p.get('si_reg');
  if (['polni', 'pop'].includes(p.get('si_mode'))) state.si.mode = p.get('si_mode');
  if (['y1', 'y2', 'y3', 'steady'].includes(p.get('si_st'))) state.si.status = p.get('si_st');

  const sal = parseFloat(p.get('si_sal'));
  if (Number.isFinite(sal) && sal > 0) state.si.avgSalary = sal;

  if (p.get('si_bm') === 'manual') {
    state.si.baseMethod = 'manual';
    const mb = parseFloat(p.get('si_mb'));
    if (Number.isFinite(mb) && mb >= 0) state.si.manualBase = mb;
  }

  if (['full', 'side'].includes(p.get('hr_emp'))) state.hr.employment = p.get('hr_emp');
  if (p.get('hr_hok') === '1') state.hr.hokExempt = true;

  if (['startup', 'standard'].includes(p.get('it_tx'))) state.it.taxRateType = p.get('it_tx');
  if (['prof_78', 'it_67', 'artisan_67', 'commerce_40'].includes(p.get('it_act'))) {
    state.it.activity = p.get('it_act');
  }
  if (['separata', 'separata_side', 'artigiani', 'commercianti'].includes(p.get('it_inps'))) {
    state.it.inpsScheme = p.get('it_inps');
  }
  if (p.get('it_d35') === '0') state.it.forfettarioDiscount35 = false;

  if (['auto', 'klein', 'basis'].includes(p.get('at_sch'))) state.at.scheme = p.get('at_sch');
  if (['services', 'goods'].includes(p.get('at_act'))) state.at.activity = p.get('at_act');

  if (['atalanyado', 'kata'].includes(p.get('hu_reg'))) state.hu.regime = p.get('hu_reg');
  if (['full', 'side'].includes(p.get('hu_emp'))) state.hu.employment = p.get('hu_emp');
  if (['45', '80', '90'].includes(p.get('hu_exp'))) state.hu.expenseTier = p.get('hu_exp');
  const fx = parseFloat(p.get('hu_fx'));
  if (Number.isFinite(fx) && fx > 0) state.hu.eurHuf = fx;

  if (['preset', 'custom'].includes(p.get('cmp_m'))) state.compare.personaMode = p.get('cmp_m');
  if (['full', 'side'].includes(p.get('cmp_emp'))) state.compare.employment = p.get('cmp_emp');
  if (['established', 'new'].includes(p.get('cmp_st'))) state.compare.stage = p.get('cmp_st');
  if (['b2b', 'b2c'].includes(p.get('cmp_cl'))) state.compare.clientType = p.get('cmp_cl');

  return true;
}
