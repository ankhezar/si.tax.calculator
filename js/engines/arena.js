/**
 * Cross-Border Apples-to-Apples Arena Evaluator
 * Normalizes and ranks Slovenia (ZPZR Now), Slovenia (ZIURS Proposed),
 * Croatia, Italy, Austria, and Hungary for any EUR revenue & persona.
 */

import { round2 } from '../utils/format.js';
import { calculateSlovenia } from './slovenia.js';
import { calculateCroatia } from './croatia.js';
import { calculateItaly } from './italy.js';
import { calculateAustria } from './austria.js';
import { calculateHungary } from './hungary.js';
import { calculatePoland } from './poland.js';
import { calculateCzechia } from './czechia.js';
import { calculateSlovakia } from './slovakia.js';
import { calculateSpain } from './spain.js';

export function evaluateCrossBorderArena(state) {
  const rev = Math.max(0, Number(state.revenueEur) || 0);
  const cmp = state.compare;
  const isCustom = cmp.personaMode === 'custom';

  const emp = cmp.employment;   // 'full' | 'side'
  const stage = cmp.stage;      // 'established' | 'new'
  const cl = cmp.clientType;    // 'b2b' | 'b2c'
  const fam = state.family || { children: 0, dependentSpouse: false };
  const kids = Math.max(0, Math.floor(Number(fam.children) || 0));
  const hasSpouse = Boolean(fam.dependentSpouse);
  const familyActive = kids > 0 || hasSpouse;

  // 1. Slovenia — Current Law (ZPZR 2026) & Proposed (ZIURS)
  const siBaseParams = isCustom
    ? {
        revenue: rev,
        mode: state.si.mode,
        avgSalary: state.si.avgSalary,
        status: state.si.status,
        baseMethod: state.si.baseMethod,
        manualBase: state.si.manualBase
      }
    : {
        revenue: rev,
        mode: emp === 'side' ? 'pop' : 'polni',
        avgSalary: state.si.avgSalary,
        status: stage === 'new' ? 'y1' : 'steady',
        baseMethod: 'auto',
        manualBase: 0
      };

  const siZpzrRaw = calculateSlovenia({ ...siBaseParams, regime: 'zpzr', children: kids, dependentSpouse: hasSpouse });
  const siZiursRaw = calculateSlovenia({ ...siBaseParams, regime: 'ziurs', children: kids, dependentSpouse: hasSpouse });
  const siZpzrNoFam = familyActive ? calculateSlovenia({ ...siBaseParams, regime: 'zpzr' }) : siZpzrRaw;
  const siZiursNoFam = familyActive ? calculateSlovenia({ ...siBaseParams, regime: 'ziurs' }) : siZiursRaw;

  // 2. Croatia — Paušalni obrt
  const hrBaseParams = isCustom
    ? { revenue: rev, employment: state.hr.employment, hokExempt: state.hr.hokExempt }
    : { revenue: rev, employment: emp, hokExempt: stage === 'new' };
  const hrRaw = calculateCroatia({ ...hrBaseParams, children: kids, dependentSpouse: hasSpouse });
  const hrNoFam = familyActive ? calculateCroatia(hrBaseParams) : hrRaw;

  // 3. Italy — Regime Forfettario
  const itBaseParams = isCustom
    ? {
        revenue: rev,
        taxRateType: state.it.taxRateType,
        activity: state.it.activity,
        inpsScheme: state.it.inpsScheme,
        forfettarioDiscount35: state.it.forfettarioDiscount35,
        fullTimeEmployeeExempt: state.it.fullTimeEmployeeExempt
      }
    : {
        revenue: rev,
        taxRateType: stage === 'new' ? 'startup' : 'standard',
        activity: 'it_67',
        inpsScheme: emp === 'side' ? 'separata_side' : 'separata',
        forfettarioDiscount35: true,
        fullTimeEmployeeExempt: false
      };
  const itRaw = calculateItaly({ ...itBaseParams, children: kids, dependentSpouse: hasSpouse });
  const itNoFam = familyActive ? calculateItaly(itBaseParams) : itRaw;

  // 4. Austria — Einzelunternehmen (Pauschalierung)
  const atBaseParams = isCustom
    ? {
        revenue: rev,
        scheme: state.at.scheme,
        activity: state.at.activity,
        employment: state.at.employment,
        kleinSvsOptOut: state.at.kleinSvsOptOut
      }
    : {
        revenue: rev,
        scheme: 'auto',
        activity: 'services',
        employment: emp,
        kleinSvsOptOut: false
      };
  const atRaw = calculateAustria({
    ...atBaseParams,
    children: kids,
    dependentSpouse: hasSpouse,
    spouseChildRearingWaiver: isCustom ? Boolean(state.at.spouseChildRearingWaiver) : false
  });
  const atNoFam = familyActive ? calculateAustria(atBaseParams) : atRaw;

  // 5. Hungary — Evaluate both Átalányadó (B2B & B2C, 96.8k € cap) & KATA (B2C-only, 45k € flat band)
  const fx = state.hu.eurHuf || 400;
  const effectiveHuEmp = isCustom ? state.hu.employment : emp;
  const effectiveHuClient = cl;

  const huAtaBaseParams = isCustom
    ? {
        revenue: rev,
        regime: 'atalanyado',
        employment: state.hu.employment,
        expenseTier: state.hu.expenseTier,
        wageFloor: state.hu.wageFloor,
        hipaMode: state.hu.hipaMode,
        clientType: effectiveHuClient,
        eurHuf: fx
      }
    : {
        revenue: rev,
        regime: 'atalanyado',
        employment: emp,
        expenseTier: '45',
        wageFloor: 'guaranteed',
        hipaMode: 'simplified',
        clientType: effectiveHuClient,
        eurHuf: fx
      };
  const huAtaRaw = calculateHungary({ ...huAtaBaseParams, children: kids, dependentSpouse: hasSpouse });
  const huAtaNoFam = familyActive ? calculateHungary(huAtaBaseParams) : huAtaRaw;

  const huKataBaseParams = {
    revenue: rev,
    regime: 'kata',
    employment: effectiveHuEmp,
    hipaMode: isCustom ? state.hu.hipaMode : 'simplified',
    clientType: effectiveHuClient,
    eurHuf: fx
  };
  const huKataRaw = calculateHungary({ ...huKataBaseParams, children: kids, dependentSpouse: hasSpouse });
  const huKataNoFam = familyActive ? calculateHungary(huKataBaseParams) : huKataRaw;

  // 6. Poland — JDG (Ryczałt 12% IT default in Preset, or Custom Tab Settings)
  const plState = state.pl || {};
  const plBaseParams = isCustom
    ? {
        revenue: rev,
        regime: plState.regime || 'ryczalt',
        ryczaltRate: plState.ryczaltRate || '12',
        employment: plState.employment || 'full',
        zusStage: plState.zusStage || 'duzy',
        eurPln: plState.eurPln || 4.28
      }
    : {
        revenue: rev,
        regime: 'ryczalt',
        ryczaltRate: '12',
        employment: emp,
        zusStage: stage === 'new' ? 'ulga_y1' : 'duzy',
        eurPln: plState.eurPln || 4.28
      };
  const plRaw = calculatePoland({ ...plBaseParams, children: kids, dependentSpouse: hasSpouse });
  const plNoFam = familyActive ? calculatePoland(plBaseParams) : plRaw;

  // 7. Czechia — OSVČ (Auto-Optimal Paušální daň vs. 60% Výdaje in Preset)
  const czState = state.cz || {};
  const czBaseParams = isCustom
    ? {
        revenue: rev,
        regime: czState.regime || 'auto',
        expenseRate: czState.expenseRate || '60',
        employment: czState.employment || 'full',
        stage: czState.stage || 'established',
        spouseYoungChild: Boolean(czState.spouseYoungChild),
        eurCzk: czState.eurCzk || 25.2
      }
    : {
        revenue: rev,
        regime: 'auto',
        expenseRate: '60',
        employment: emp,
        stage,
        spouseYoungChild: false,
        eurCzk: czState.eurCzk || 25.2
      };
  const czRaw = calculateCzechia({ ...czBaseParams, children: kids, dependentSpouse: hasSpouse });
  const czNoFam = familyActive ? calculateCzechia(czBaseParams) : czRaw;

  // 8. Slovakia — SZČO (60% Paušálne výdavky + 15% Reduced Tax up to 100k €)
  const skState = state.sk || {};
  const skBaseParams = isCustom
    ? {
        revenue: rev,
        employment: skState.employment || 'full',
        stage: skState.stage || 'established',
        spouseCareQualifies: skState.spouseCareQualifies !== false
      }
    : {
        revenue: rev,
        employment: emp,
        stage,
        spouseCareQualifies: true
      };
  const skRaw = calculateSlovakia({ ...skBaseParams, children: kids, dependentSpouse: hasSpouse });
  const skNoFam = familyActive ? calculateSlovakia(skBaseParams) : skRaw;

  // 9. Spain — Autónomo (Estimación Directa Simplificada + 15-Tramo RETA / Tarifa Plana)
  const esState = state.es || {};
  const esBaseParams = isCustom
    ? {
        revenue: rev,
        employment: esState.employment || 'full',
        stage: esState.stage || 'established',
        deductibleCostPct: esState.deductibleCostPct || '0'
      }
    : {
        revenue: rev,
        employment: emp,
        stage,
        deductibleCostPct: '0'
      };
  const esRaw = calculateSpain({ ...esBaseParams, children: kids, dependentSpouse: hasSpouse });
  const esNoFam = familyActive ? calculateSpain(esBaseParams) : esRaw;

  const normalizeSi = (raw, noFamilyRaw, id, isProposed = false) => ({
    id,
    raw,
    noFamilyRaw,
    familyNetDeltaAnnual: round2(raw.netAnnual - noFamilyRaw.netAnnual),
    tabTarget: 'si',
    siRegimeTarget: raw.regime,
    countryCode: 'si',
    isProposed,
    regimeLabel: raw.regime === 'ziurs' ? 'Normiranec (ZIURS)' : 'Normiranec (ZPZR)',
    limit: raw.taxData.limit,
    vatThreshold: 60000,
    vatRatePct: 22,
    exceedsB2cVat: cl === 'b2c' && rev > 60000,
    isEligible: !raw.taxData.isBreach,
    isBreach: raw.taxData.isBreach,
    disqualifiedReason: raw.taxData.isBreach ? 'over_cap' : null,
    revenue: rev,
    expensesAnnual: raw.taxData.expenses,
    taxAnnual: raw.taxData.tax,
    socialAnnual: raw.socData.annualTotal,
    totalPaidAnnual: raw.totalPaidAnnual,
    netAnnual: raw.netAnnual,
    netMonthly: raw.netMonthly,
    effectiveRatePct: raw.effectiveRatePct
  });

  const normalizeHu = (raw, noFamilyRaw, id) => ({
    id,
    raw,
    noFamilyRaw,
    familyNetDeltaAnnual: round2(raw.netAnnual - noFamilyRaw.netAnnual),
    tabTarget: 'hu',
    huRegimeTarget: raw.regime,
    countryCode: 'hu',
    isProposed: false,
    regimeLabel: raw.regimeName,
    limit: raw.limit,
    vatThreshold: raw.vatThreshold,
    vatRatePct: 27,
    exceedsB2cVat: cl === 'b2c' && raw.exceedsVatExempt,
    isEligible: raw.isEligible,
    isBreach: raw.isBreach,
    disqualifiedReason: raw.isB2bDisqualified
      ? 'b2b_banned'
      : raw.isSideDisqualified
        ? 'fulltime_only'
        : raw.isBreach
          ? 'over_cap'
          : null,
    revenue: rev,
    expensesAnnual: raw.expensesAnnual,
    taxAnnual: raw.taxAnnual,
    socialAnnual: raw.socialAnnual,
    totalPaidAnnual: raw.totalPaidAnnual,
    netAnnual: raw.netAnnual,
    netMonthly: raw.netMonthly,
    effectiveRatePct: raw.effectiveRatePct
  });

  const entries = [
    normalizeSi(siZpzrRaw, siZpzrNoFam, 'si_zpzr', false),
    normalizeSi(siZiursRaw, siZiursNoFam, 'si_ziurs', true),
    {
      id: 'hr',
      raw: hrRaw,
      noFamilyRaw: hrNoFam,
      familyNetDeltaAnnual: round2(hrRaw.netAnnual - hrNoFam.netAnnual),
      tabTarget: 'hr',
      countryCode: 'hr',
      isProposed: false,
      regimeLabel: hrRaw.regimeName,
      limit: hrRaw.limit,
      vatThreshold: hrRaw.vatThreshold,
      vatRatePct: 25,
      exceedsB2cVat: cl === 'b2c' && rev > hrRaw.vatThreshold,
      isEligible: hrRaw.isEligible,
      isBreach: hrRaw.isBreach,
      disqualifiedReason: hrRaw.isBreach ? 'over_cap' : null,
      revenue: rev,
      expensesAnnual: hrRaw.expensesAnnual,
      taxAnnual: hrRaw.taxAnnual,
      socialAnnual: hrRaw.socialAnnual,
      totalPaidAnnual: hrRaw.totalPaidAnnual,
      netAnnual: hrRaw.netAnnual,
      netMonthly: hrRaw.netMonthly,
      effectiveRatePct: hrRaw.effectiveRatePct
    },
    {
      id: 'it',
      raw: itRaw,
      noFamilyRaw: itNoFam,
      familyNetDeltaAnnual: round2(itRaw.netAnnual - itNoFam.netAnnual),
      tabTarget: 'it',
      countryCode: 'it',
      isProposed: false,
      regimeLabel: `${itRaw.regimeName} (${Math.round(itRaw.taxRate * 100)}%)`,
      limit: itRaw.limit,
      vatThreshold: itRaw.vatThreshold,
      vatRatePct: 22,
      exceedsB2cVat: cl === 'b2c' && rev > itRaw.vatThreshold,
      isEligible: itRaw.isEligible,
      isBreach: itRaw.isBreach,
      disqualifiedReason: itRaw.isBreach ? 'over_cap' : null,
      revenue: rev,
      expensesAnnual: itRaw.expensesAnnual,
      taxAnnual: itRaw.taxAnnual,
      socialAnnual: itRaw.socialAnnual,
      totalPaidAnnual: itRaw.totalPaidAnnual,
      netAnnual: itRaw.netAnnual,
      netMonthly: itRaw.netMonthly,
      effectiveRatePct: itRaw.effectiveRatePct
    },
    {
      id: 'at',
      raw: atRaw,
      noFamilyRaw: atNoFam,
      familyNetDeltaAnnual: round2(atRaw.netAnnual - atNoFam.netAnnual),
      tabTarget: 'at',
      countryCode: 'at',
      isProposed: false,
      regimeLabel: atRaw.resolvedScheme === 'klein' ? 'KU-Pauschalierung' : 'Basispauschalierung',
      limit: atRaw.limit,
      vatThreshold: atRaw.vatThreshold,
      vatRatePct: 20,
      exceedsB2cVat: cl === 'b2c' && rev > atRaw.vatThreshold,
      isEligible: atRaw.isEligible,
      isBreach: atRaw.isBreach,
      disqualifiedReason: atRaw.isBreach ? 'over_cap' : null,
      revenue: rev,
      expensesAnnual: atRaw.expensesAnnual,
      taxAnnual: atRaw.taxAnnual,
      socialAnnual: atRaw.socialAnnual,
      totalPaidAnnual: atRaw.totalPaidAnnual,
      netAnnual: atRaw.netAnnual,
      netMonthly: atRaw.netMonthly,
      effectiveRatePct: atRaw.effectiveRatePct
    },
    normalizeHu(huAtaRaw, huAtaNoFam, 'hu_ata'),
    normalizeHu(huKataRaw, huKataNoFam, 'hu_kata'),
    {
      id: 'pl',
      raw: plRaw,
      noFamilyRaw: plNoFam,
      familyNetDeltaAnnual: round2(plRaw.netAnnual - plNoFam.netAnnual),
      tabTarget: 'pl',
      countryCode: 'pl',
      isProposed: false,
      regimeLabel: plRaw.regimeName,
      limit: plRaw.limit,
      vatThreshold: plRaw.vatThreshold,
      vatRatePct: 23,
      exceedsB2cVat: cl === 'b2c' && plRaw.exceedsVatExempt,
      isEligible: plRaw.isEligible,
      isBreach: plRaw.isBreach,
      disqualifiedReason: plRaw.isBreach ? 'over_cap' : null,
      revenue: rev,
      expensesAnnual: plRaw.expensesAnnual,
      taxAnnual: plRaw.taxAnnual,
      socialAnnual: plRaw.socialAnnual,
      totalPaidAnnual: plRaw.totalPaidAnnual,
      netAnnual: plRaw.netAnnual,
      netMonthly: plRaw.netMonthly,
      effectiveRatePct: plRaw.effectiveRatePct
    },
    {
      id: 'cz',
      raw: czRaw,
      noFamilyRaw: czNoFam,
      familyNetDeltaAnnual: round2(czRaw.netAnnual - czNoFam.netAnnual),
      tabTarget: 'cz',
      countryCode: 'cz',
      isProposed: false,
      regimeLabel: czRaw.regimeName,
      limit: czRaw.limit,
      vatThreshold: czRaw.vatThreshold,
      vatRatePct: 21,
      exceedsB2cVat: cl === 'b2c' && czRaw.exceedsVatExempt,
      isEligible: czRaw.isEligible,
      isBreach: czRaw.isBreach,
      disqualifiedReason: czRaw.isSideDisqualified
        ? 'fulltime_only'
        : czRaw.isBreach
          ? 'over_cap'
          : null,
      revenue: rev,
      expensesAnnual: czRaw.expensesAnnual,
      taxAnnual: czRaw.taxAnnual,
      socialAnnual: czRaw.socialAnnual,
      totalPaidAnnual: czRaw.totalPaidAnnual,
      netAnnual: czRaw.netAnnual,
      netMonthly: czRaw.netMonthly,
      effectiveRatePct: czRaw.effectiveRatePct
    },
    {
      id: 'sk',
      raw: skRaw,
      noFamilyRaw: skNoFam,
      familyNetDeltaAnnual: round2(skRaw.netAnnual - skNoFam.netAnnual),
      tabTarget: 'sk',
      countryCode: 'sk',
      isProposed: false,
      regimeLabel: skRaw.regimeName,
      limit: skRaw.limit,
      vatThreshold: skRaw.vatThreshold,
      vatRatePct: 23,
      exceedsB2cVat: cl === 'b2c' && rev > skRaw.vatThreshold,
      isEligible: skRaw.isEligible,
      isBreach: skRaw.isBreach,
      disqualifiedReason: skRaw.isBreach ? 'over_cap' : null,
      revenue: rev,
      expensesAnnual: skRaw.expensesAnnual,
      taxAnnual: skRaw.taxAnnual,
      socialAnnual: skRaw.socialAnnual,
      totalPaidAnnual: skRaw.totalPaidAnnual,
      netAnnual: skRaw.netAnnual,
      netMonthly: skRaw.netMonthly,
      effectiveRatePct: skRaw.effectiveRatePct
    },
    {
      id: 'es',
      raw: esRaw,
      noFamilyRaw: esNoFam,
      familyNetDeltaAnnual: round2(esRaw.netAnnual - esNoFam.netAnnual),
      tabTarget: 'es',
      countryCode: 'es',
      isProposed: false,
      regimeLabel: esRaw.regimeName,
      limit: esRaw.limit,
      vatThreshold: esRaw.vatThreshold,
      vatRatePct: 21,
      exceedsB2cVat: cl === 'b2c' && rev > esRaw.vatThreshold,
      isEligible: esRaw.isEligible,
      isBreach: esRaw.isBreach,
      disqualifiedReason: esRaw.isBreach ? 'over_cap' : null,
      revenue: rev,
      expensesAnnual: esRaw.expensesAnnual,
      taxAnnual: esRaw.taxAnnual,
      socialAnnual: esRaw.socialAnnual,
      totalPaidAnnual: esRaw.totalPaidAnnual,
      netAnnual: esRaw.netAnnual,
      netMonthly: esRaw.netMonthly,
      effectiveRatePct: esRaw.effectiveRatePct
    }
  ];

  const baselineNet = entries[0].netAnnual; // SI ZPZR Now
  for (const item of entries) {
    item.diffVsSiNow = round2(item.netAnnual - baselineNet);
  }

  // Sort eligible regimes first by highest netAnnual, then ineligible regimes by highest netAnnual
  const ranked = [...entries].sort((a, b) => {
    if (a.isEligible !== b.isEligible) return a.isEligible ? -1 : 1;
    return b.netAnnual - a.netAnnual;
  });

  let eligibleRank = 1;
  for (const item of ranked) {
    item.rank = item.isEligible ? eligibleRank++ : null;
  }

  return {
    revenue: rev,
    familyActive,
    baselineSiNow: entries[0],
    entries,
    ranked
  };
}
