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

export function evaluateCrossBorderArena(state) {
  const rev = Math.max(0, Number(state.revenueEur) || 0);
  const cmp = state.compare;
  const isCustom = cmp.personaMode === 'custom';

  const emp = cmp.employment;   // 'full' | 'side'
  const stage = cmp.stage;      // 'established' | 'new'
  const cl = cmp.clientType;    // 'b2b' | 'b2c'

  // 1. Slovenia — Current Law (ZPZR 2026) & Proposed (ZIURS)
  const siParams = isCustom
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

  const siZpzrRaw = calculateSlovenia({ ...siParams, regime: 'zpzr' });
  const siZiursRaw = calculateSlovenia({ ...siParams, regime: 'ziurs' });

  // 2. Croatia — Paušalni obrt
  const hrRaw = calculateCroatia(
    isCustom
      ? { revenue: rev, employment: state.hr.employment, hokExempt: state.hr.hokExempt }
      : { revenue: rev, employment: emp, hokExempt: stage === 'new' }
  );

  // 3. Italy — Regime Forfettario
  const itRaw = calculateItaly(
    isCustom
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
        }
  );

  // 4. Austria — Einzelunternehmen (Pauschalierung)
  const atRaw = calculateAustria(
    isCustom
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
        }
  );

  // 5. Hungary — Evaluate both Átalányadó (B2B & B2C, 96.8k € cap) & KATA (B2C-only, 45k € flat band)
  const fx = state.hu.eurHuf || 400;
  const effectiveHuEmp = isCustom ? state.hu.employment : emp;
  const effectiveHuClient = cl;

  const huAtaRaw = calculateHungary(
    isCustom
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
        }
  );

  const huKataRaw = calculateHungary({
    revenue: rev,
    regime: 'kata',
    employment: effectiveHuEmp,
    hipaMode: isCustom ? state.hu.hipaMode : 'simplified',
    clientType: effectiveHuClient,
    eurHuf: fx
  });

  const normalizeSi = (raw, id, isProposed = false) => ({
    id,
    raw,
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

  const normalizeHu = (raw, id) => ({
    id,
    raw,
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
    normalizeSi(siZpzrRaw, 'si_zpzr', false),
    normalizeSi(siZiursRaw, 'si_ziurs', true),
    {
      id: 'hr',
      raw: hrRaw,
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
    normalizeHu(huAtaRaw, 'hu_ata'),
    normalizeHu(huKataRaw, 'hu_kata')
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
    baselineSiNow: entries[0],
    entries,
    ranked
  };
}
