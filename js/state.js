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
    activeTab: 'si',        // 'si' | 'hr' | 'it' | 'at' | 'hu' | 'pl' | 'cz' | 'sk' | 'es' | 'compare'
    revenueEur: 65000,
    view: 'yearly',         // 'yearly' | 'monthly'
    lang: detectLanguage(), // 'sl' | 'en' | 'ua'
    theme: detectTheme(),   // 'light' | 'dark'

    family: {
      children: 0,           // 0..4+ dependent children (<18)
      dependentSpouse: false // true = non-working / uninsured dependent spouse
    },

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
      kleinSvsOptOut: false,
      spouseChildRearingWaiver: false // true = >=4 yrs past child-rearing waives 3.4% SVS spouse surcharge
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

    pl: {
      regime: 'ryczalt',       // 'ryczalt' | 'skala' | 'liniowy'
      ryczaltRate: '12',       // '12' (IT) | '8.5' (Services) | '14' (Eng/Arch) | '15' (Consulting)
      employment: 'full',      // 'full' | 'side' (employed >= 4,806 PLN -> 0 social ZUS)
      zusStage: 'duzy',        // 'ulga_y1' (6m Ulga + 6m Pref) | 'pref' (Preferencyjny) | 'duzy' (Standard)
      eurPln: 4.28
    },

    cz: {
      regime: 'auto',          // 'auto' | 'pausalni_dan' | 'vydajovy_pausal'
      expenseRate: '60',       // '60' (IT/Trade) | '80' (Crafts) | '40' (Licensed/Authors)
      employment: 'full',      // 'full' | 'side'
      stage: 'established',    // 'established' | 'new' (3,575 CZK/mo social floor on 60% výdaje)
      spouseYoungChild: false, // true = caring for child <3 (24,840 CZK spouse credit & state VZP <7)
      eurCzk: 25.2
    },

    sk: {
      employment: 'full',      // 'full' | 'side'
      stage: 'established',    // 'established' | 'new' (Year-1 Social Insurance holiday)
      spouseCareQualifies: true // true = caring for young child (<3/<6) when children>=1 -> NČZD & state ZP
    },

    es: {
      employment: 'full',      // 'full' | 'side'
      stage: 'established',    // 'established' (15-tramo RETA) | 'new' (80 €/mo Tarifa Plana) | 'cuota_cero' (0 €)
      deductibleCostPct: '0'   // '0' | '10' | '20' documented operating expenses before 5% difícil justificación
    },

    compare: {
      personaMode: 'preset',   // 'preset' | 'custom'
      employment: 'full',      // 'full' | 'side'
      stage: 'established',    // 'established' | 'new'
      clientType: 'b2b',       // 'b2b' | 'b2c'
      regionFilter: 'all'      // 'all' | 'neighbours' | 'expansion'
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
  if (state.at.spouseChildRearingWaiver) params.set('at_spw', '1');

  if (state.family.children > 0) params.set('fam_c', String(state.family.children));
  if (state.family.dependentSpouse) params.set('fam_s', '1');

  params.set('hu_reg', state.hu.regime);
  params.set('hu_emp', state.hu.employment);
  params.set('hu_exp', state.hu.expenseTier);
  if (state.hu.eurHuf !== 400) params.set('hu_fx', String(state.hu.eurHuf));

  if (state.pl.regime !== 'ryczalt') params.set('pl_reg', state.pl.regime);
  if (state.pl.ryczaltRate !== '12') params.set('pl_rt', state.pl.ryczaltRate);
  if (state.pl.employment !== 'full') params.set('pl_emp', state.pl.employment);
  if (state.pl.zusStage !== 'duzy') params.set('pl_zus', state.pl.zusStage);
  if (state.pl.eurPln !== 4.28) params.set('pl_fx', String(state.pl.eurPln));

  if (state.cz.regime !== 'auto') params.set('cz_reg', state.cz.regime);
  if (state.cz.expenseRate !== '60') params.set('cz_exp', state.cz.expenseRate);
  if (state.cz.employment !== 'full') params.set('cz_emp', state.cz.employment);
  if (state.cz.stage !== 'established') params.set('cz_st', state.cz.stage);
  if (state.cz.spouseYoungChild) params.set('cz_syc', '1');
  if (state.cz.eurCzk !== 25.2) params.set('cz_fx', String(state.cz.eurCzk));

  if (state.sk.employment !== 'full') params.set('sk_emp', state.sk.employment);
  if (state.sk.stage !== 'established') params.set('sk_st', state.sk.stage);
  if (!state.sk.spouseCareQualifies) params.set('sk_sc', '0');

  if (state.es.employment !== 'full') params.set('es_emp', state.es.employment);
  if (state.es.stage !== 'established') params.set('es_st', state.es.stage);
  if (state.es.deductibleCostPct !== '0') params.set('es_cost', state.es.deductibleCostPct);

  params.set('cmp_m', state.compare.personaMode);
  params.set('cmp_emp', state.compare.employment);
  params.set('cmp_st', state.compare.stage);
  params.set('cmp_cl', state.compare.clientType);
  if (state.compare.regionFilter !== 'all') params.set('cmp_rf', state.compare.regionFilter);

  return '#' + params.toString();
}

const VALID_TABS = ['si', 'hr', 'it', 'at', 'hu', 'pl', 'cz', 'sk', 'es', 'compare'];

const SLUG_TO_TAB = {
  si: 'si',
  slovenia: 'si',
  hr: 'hr',
  croatia: 'hr',
  it: 'it',
  italy: 'it',
  at: 'at',
  austria: 'at',
  hu: 'hu',
  hungary: 'hu',
  pl: 'pl',
  poland: 'pl',
  cz: 'cz',
  czechia: 'cz',
  sk: 'sk',
  slovakia: 'sk',
  es: 'es',
  spain: 'es',
  compare: 'compare',
  arena: 'compare'
};

export function resolveTabSlug(val) {
  if (!val || typeof val !== 'string') return null;
  const clean = val.trim().toLowerCase();
  return SLUG_TO_TAB[clean] || null;
}

export function applyScenarioParams(state, rawParamsString) {
  if (!rawParamsString || rawParamsString.length <= 1) return false;
  const raw =
    rawParamsString.startsWith('#') || rawParamsString.startsWith('?')
      ? rawParamsString.slice(1)
      : rawParamsString;
  const p = new URLSearchParams(raw);

  const tabCandidate = resolveTabSlug(p.get('tab') || p.get('country'));
  const hasKnownKey =
    Boolean(tabCandidate) ||
    p.has('rev') ||
    p.has('view') ||
    p.has('lang') ||
    p.has('theme');
  if (!hasKnownKey) return false;

  if (tabCandidate && VALID_TABS.includes(tabCandidate)) state.activeTab = tabCandidate;

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
  if (p.get('at_spw') === '1' || p.get('at_spw') === '0') {
    state.at.spouseChildRearingWaiver = p.get('at_spw') === '1';
  }

  const famKids = parseInt(p.get('fam_c'), 10);
  if (Number.isInteger(famKids) && famKids >= 0 && famKids <= 10) {
    state.family.children = famKids;
  }
  if (p.get('fam_s') === '1' || p.get('fam_s') === '0') {
    state.family.dependentSpouse = p.get('fam_s') === '1';
  }

  if (['atalanyado', 'kata'].includes(p.get('hu_reg'))) state.hu.regime = p.get('hu_reg');
  if (['full', 'side'].includes(p.get('hu_emp'))) state.hu.employment = p.get('hu_emp');
  if (['45', '80', '90'].includes(p.get('hu_exp'))) state.hu.expenseTier = p.get('hu_exp');
  const fx = parseFloat(p.get('hu_fx'));
  if (Number.isFinite(fx) && fx > 0) state.hu.eurHuf = fx;

  if (['ryczalt', 'skala', 'liniowy'].includes(p.get('pl_reg'))) state.pl.regime = p.get('pl_reg');
  if (['12', '8.5', '14', '15'].includes(p.get('pl_rt'))) state.pl.ryczaltRate = p.get('pl_rt');
  if (['full', 'side'].includes(p.get('pl_emp'))) state.pl.employment = p.get('pl_emp');
  if (['ulga_y1', 'pref', 'duzy'].includes(p.get('pl_zus'))) state.pl.zusStage = p.get('pl_zus');
  const plFx = parseFloat(p.get('pl_fx'));
  if (Number.isFinite(plFx) && plFx > 0) state.pl.eurPln = plFx;

  if (['auto', 'pausalni_dan', 'vydajovy_pausal'].includes(p.get('cz_reg'))) state.cz.regime = p.get('cz_reg');
  if (['60', '80', '40'].includes(p.get('cz_exp'))) state.cz.expenseRate = p.get('cz_exp');
  if (['full', 'side'].includes(p.get('cz_emp'))) state.cz.employment = p.get('cz_emp');
  if (['established', 'new'].includes(p.get('cz_st'))) state.cz.stage = p.get('cz_st');
  if (p.get('cz_syc') === '1' || p.get('cz_syc') === '0') state.cz.spouseYoungChild = p.get('cz_syc') === '1';
  const czFx = parseFloat(p.get('cz_fx'));
  if (Number.isFinite(czFx) && czFx > 0) state.cz.eurCzk = czFx;

  if (['full', 'side'].includes(p.get('sk_emp'))) state.sk.employment = p.get('sk_emp');
  if (['established', 'new'].includes(p.get('sk_st'))) state.sk.stage = p.get('sk_st');
  if (p.get('sk_sc') === '1' || p.get('sk_sc') === '0') state.sk.spouseCareQualifies = p.get('sk_sc') === '1';

  if (['full', 'side'].includes(p.get('es_emp'))) state.es.employment = p.get('es_emp');
  if (['established', 'new', 'cuota_cero'].includes(p.get('es_st'))) state.es.stage = p.get('es_st');
  if (['0', '10', '20'].includes(p.get('es_cost'))) state.es.deductibleCostPct = p.get('es_cost');

  if (['preset', 'custom'].includes(p.get('cmp_m'))) state.compare.personaMode = p.get('cmp_m');
  if (['full', 'side'].includes(p.get('cmp_emp'))) state.compare.employment = p.get('cmp_emp');
  if (['established', 'new'].includes(p.get('cmp_st'))) state.compare.stage = p.get('cmp_st');
  if (['b2b', 'b2c'].includes(p.get('cmp_cl'))) state.compare.clientType = p.get('cmp_cl');
  if (['all', 'neighbours', 'expansion'].includes(p.get('cmp_rf'))) state.compare.regionFilter = p.get('cmp_rf');

  return true;
}

export function applyScenarioHash(state, hashString) {
  return applyScenarioParams(state, hashString);
}

export function applyScenarioSearch(state, searchString) {
  return applyScenarioParams(state, searchString);
}
