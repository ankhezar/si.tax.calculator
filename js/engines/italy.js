/**
 * Official 2026 Italy Sole-Proprietor Engine — Regime Forfettario
 *
 * Sources: Legge 190/2014 as amended (85,000 € cap / 100,000 € immediate exit),
 * Circulars Agenzia delle Entrate & INPS 2026 rates (Gestione Separata 26.07%,
 * Gestione Artigiani & Commercianti 2026 minimale 18,808.00 €).
 */

import { round2 } from '../utils/format.js';

export const IT_CONFIG_2026 = {
  limit: 85000,
  immediateExitLimit: 100000,
  activities: {
    prof_78:     { id: 'prof_78',     coeff: 0.78 }, // Professionals, consultants, technical/scientific
    it_67:       { id: 'it_67',       coeff: 0.67 }, // ATECO 62.01 / 62.02 Software & IT services
    artisan_67:  { id: 'artisan_67',  coeff: 0.67 }, // General artisans & services
    commerce_40: { id: 'commerce_40', coeff: 0.40 }  // Commerce, retail, e-commerce, hospitality
  },
  inps: {
    separataRate: 0.2607,      // Full-time Gestione Separata (25% IVS + 0.72% + 0.35% ISCRO)
    separataSideRate: 0.2400,  // Concurrent mandatory pension coverage (employee/pensioner)
    separataCeiling: 120607,   // INPS annual contribution ceiling
    minimale: 18808.00,        // 2026 ISTAT-adjusted Artigiani/Commercianti minimum income
    artigianiFixed: 4521.36,
    artigianiExcessRate: 0.2400,
    commerciantiFixed: 4611.64,
    commerciantiExcessRate: 0.2448,
    forfettarioReductionFactor: 0.65 // -35% optional INPS reduction for Artigiani/Commercianti
  },
  taxRates: {
    startup: 0.05,  // First 5 years (new eligible activity)
    standard: 0.15  // Ordinary Forfettario substitute tax
  }
};

export function calculateItaly({
  revenue = 65000,
  taxRateType = 'standard',   // 'startup' | 'standard'
  activity = 'it_67',         // 'prof_78' | 'it_67' | 'artisan_67' | 'commerce_40'
  inpsScheme = 'separata',    // 'separata' | 'separata_side' | 'artigiani' | 'commercianti'
  forfettarioDiscount35 = true,
  fullTimeEmployeeExempt = false,
  children = 0,
  dependentSpouse = false
} = {}) {
  const rev = Math.max(0, Number(revenue) || 0);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);
  const act = IT_CONFIG_2026.activities[activity] || IT_CONFIG_2026.activities.it_67;
  const coeff = act.coeff;

  const isBreach = rev > IT_CONFIG_2026.limit;
  const isImmediateExit = rev > IT_CONFIG_2026.immediateExitLimit;
  const isEligible = !isBreach;

  const grossForfettarioIncome = round2(rev * coeff);
  const expensesAnnual = round2(rev - grossForfettarioIncome);

  const cfg = IT_CONFIG_2026.inps;
  let inpsFixed = 0;
  let inpsVariable = 0;
  let discountAppliedPct = 0;

  if (inpsScheme === 'separata' || inpsScheme === 'separata_side') {
    const rate = inpsScheme === 'separata_side' ? cfg.separataSideRate : cfg.separataRate;
    const cappedProfit = Math.min(grossForfettarioIncome, cfg.separataCeiling);
    inpsVariable = round2(cappedProfit * rate);
  } else {
    // Artigiani or Commercianti
    if (!fullTimeEmployeeExempt) {
      const isComm = inpsScheme === 'commercianti';
      const baseFixed = isComm ? cfg.commerciantiFixed : cfg.artigianiFixed;
      const excessRate = isComm ? cfg.commerciantiExcessRate : cfg.artigianiExcessRate;
      const excessIncome = Math.max(0, Math.min(grossForfettarioIncome, cfg.separataCeiling) - cfg.minimale);
      const baseVar = excessIncome * excessRate;

      const factor = forfettarioDiscount35 ? cfg.forfettarioReductionFactor : 1.0;
      if (forfettarioDiscount35) discountAppliedPct = 35;

      inpsFixed = round2(baseFixed * factor);
      inpsVariable = round2(baseVar * factor);
    }
  }

  const socialAnnual = round2(inpsFixed + inpsVariable);
  // Mandatory INPS contributions are deductible from gross Forfettario income
  const taxBaseAnnual = round2(Math.max(0, grossForfettarioIncome - socialAnnual));
  const taxRate = IT_CONFIG_2026.taxRates[taxRateType] ?? IT_CONFIG_2026.taxRates.standard;
  const taxAnnual = round2(taxBaseAnnual * taxRate);

  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(rev - totalPaidAnnual);

  return {
    country: 'it',
    regimeName: 'Regime Forfettario',
    children: kids,
    dependentSpouse: hasSpouse,
    familyTaxCreditAnnual: 0,
    spouseHealthAnnual: 0,
    revenue: rev,
    limit: IT_CONFIG_2026.limit,
    immediateExitLimit: IT_CONFIG_2026.immediateExitLimit,
    vatThreshold: IT_CONFIG_2026.limit,
    isEligible,
    isBreach,
    isImmediateExit,
    excessRevenue: isBreach ? round2(rev - IT_CONFIG_2026.limit) : 0,
    coeff,
    taxRate,
    expensesAnnual,
    grossProfitAnnual: grossForfettarioIncome,
    taxBaseAnnual,
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: rev > 0 ? (totalPaidAnnual / rev) * 100 : 0,
    breakdown: {
      inpsScheme,
      inpsFixed,
      inpsVariable,
      discountAppliedPct
    }
  };
}
