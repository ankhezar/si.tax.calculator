/**
 * Poland 2026 — JDG (Jednoosobowa Działalność Gospodarcza) Tax & ZUS Engine
 *
 * Official 2026 Statutory Parameters:
 * - Minimum Wage 2026: 4,806.00 PLN/mo (57,672 PLN/yr)
 * - GUS Q4 2025 Enterprise Sector Avg Wage: 9,228.64 PLN/mo
 * - Forecast 2026 Avg Wage: 9,420.00 PLN/mo (Duży ZUS 60% base = 5,652.00 PLN/mo)
 * - ZUS Social Contributions (excl. voluntary chorobowe):
 *   • Ulga na start (months 1–6) + Preferencyjny (months 7–12) Year-1 avg: 210.43 PLN/mo (2,525.16 PLN/yr)
 *   • Preferencyjny ZUS (30% of 4,806 PLN = 1,441.80 PLN base, excl. Fundusz Pracy): 420.86 PLN/mo (5,050.32 PLN/yr)
 *   • Duży ZUS (60% of 9,420 PLN = 5,652.00 PLN base, incl. Fundusz Pracy): 1,788.29 PLN/mo (21,459.48 PLN/yr)
 *   • Side-job (Zbieg tytułów, employed ≥ 4,806 PLN): 0 PLN social ZUS (mandatory NFZ health still applies)
 * - VAT (23%) Small-Business Exemption Ceiling (Art. 113 ust. 1): raised to 240,000 PLN/yr from Jan 1, 2026
 * - Regimes:
 *   1. Ryczałt od przychodów ewidencjonowanych (cap 2,000,000 € in 2026; rates 12% IT, 8.5% services, 14% eng, 15% consulting):
 *      - 2026 NFZ Health (9% of 60% / 100% / 180% of 9,228.64 PLN based on revenue net of social ZUS):
 *        ≤60k PLN: 498.35 PLN/mo | 60k–300k PLN: 830.58 PLN/mo | >300k PLN: 1,495.04 PLN/mo
 *      - Deductible from revenue before Ryczałt tax: 100% paid social ZUS + 50% paid NFZ health
 *      - Family rules: 0 PLN child tax credit & no joint spouse filing on PIT-28; 0 PLN NFZ co-insurance (ZCNA)
 *   2. Skala podatkowa (12% up to 120,000 PLN, 32% above; 30,000 PLN kwota wolna = 3,600 PLN tax reduction):
 *      - NFZ Health: 9% of profit after social ZUS (min 9% × 4,806 = 432.54 PLN/mo = 5,190.48 PLN/yr), non-deductible
 *      - Joint filing with non-working spouse (wspólne rozliczenie): 2 × tax(base / 2) -> 60k PLN free & 240k PLN 12% threshold!
 *      - Ulga na dzieci: 1,112.04 PLN (1st — capped at 112k PLN income if 1 child only), 1,112.04 PLN (2nd),
 *        2,000.04 PLN (3rd), 2,700.00 PLN (4th+), refundable up to paid social + health ZUS!
 *   3. Podatek liniowy (19% flat PIT-36L):
 *      - NFZ Health: 4.9% of profit after social ZUS (min 432.54 PLN/mo), deductible from tax base up to 14,100 PLN/yr
 *      - 0 PLN family credits, 0 PLN NFZ spouse/child co-insurance (ZCNA)
 */

import { round2 } from '../utils/format.js';

export const PL_CONFIG_2026 = {
  defaultEurPln: 4.28,
  minWageMonthlyPln: 4806,
  gusQ4EnterpriseWagePln: 9228.64,
  vatLimitPln: 240000,
  vatRatePct: 23,
  ryczaltCapEur: 2000000,
  skalaCapEur: 2000000, // simplified bookkeeping (KPiR) ceiling 2,000,000 EUR
  zusSocialAnnualPln: {
    ulga_y1: round2(6 * 0 + 6 * 420.86), // 2,525.16 PLN/yr (6m Ulga na start + 6m Preferencyjny)
    pref: round2(12 * 420.86),           // 5,050.32 PLN/yr (420.86 PLN/mo)
    duzy: round2(12 * 1788.29)           // 21,459.48 PLN/yr (1,788.29 PLN/mo)
  },
  ryczaltHealthMonthlyPln: {
    tier1MaxPln: 60000,
    tier2MaxPln: 300000,
    tier1Monthly: 498.35,
    tier2Monthly: 830.58,
    tier3Monthly: 1495.04
  },
  minHealthMonthlySkalaLiniowyPln: 432.54, // 9% × 4,806 PLN
  liniowyHealthDeductionCapPln: 14100,
  skala: {
    freeAllowancePln: 30000,
    bracket1LimitPln: 120000,
    rate1: 0.12,
    rate2: 0.32,
    oneChildIncomeCapMarriedPln: 112000,
    oneChildIncomeCapSinglePln: 56000
  }
};

function computeSkalaSinglePln(basePln) {
  const b = Math.max(0, basePln);
  const s = PL_CONFIG_2026.skala;
  if (b <= s.freeAllowancePln) return 0;
  if (b <= s.bracket1LimitPln) {
    return (b - s.freeAllowancePln) * s.rate1;
  }
  return (s.bracket1LimitPln - s.freeAllowancePln) * s.rate1 + (b - s.bracket1LimitPln) * s.rate2;
}

function computePolishChildCreditMaxPln(kids, taxBasePln, hasSpouse) {
  if (kids <= 0) return 0;
  if (kids === 1) {
    const cap = hasSpouse
      ? PL_CONFIG_2026.skala.oneChildIncomeCapMarriedPln
      : PL_CONFIG_2026.skala.oneChildIncomeCapSinglePln;
    return taxBasePln <= cap ? 1112.04 : 0;
  }
  let total = 1112.04 + 1112.04; // 1st + 2nd child (no income cap for 2+ children)
  if (kids >= 3) total += 2000.04;
  if (kids >= 4) total += (kids - 3) * 2700.0;
  return round2(total);
}

export function calculatePoland({
  revenue = 65000,
  regime = 'ryczalt',       // 'ryczalt' | 'skala' | 'liniowy'
  ryczaltRate = '12',       // '12' | '8.5' | '14' | '15'
  employment = 'full',      // 'full' | 'side'
  zusStage = 'duzy',        // 'ulga_y1' | 'pref' | 'duzy'
  eurPln = PL_CONFIG_2026.defaultEurPln,
  children = 0,
  dependentSpouse = false
} = {}) {
  const revEur = Math.max(0, Number(revenue) || 0);
  const fx = Math.max(0.5, Number(eurPln) || PL_CONFIG_2026.defaultEurPln);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);

  const revPln = Math.round(revEur * fx);
  const toEur = pln => round2(pln / fx);

  const vatThresholdEur = toEur(PL_CONFIG_2026.vatLimitPln);
  const exceedsVatExempt = revPln > PL_CONFIG_2026.vatLimitPln;

  // 1. ZUS Social Contributions (Składki społeczne)
  const zusSocialExactPln =
    employment === 'side'
      ? 0
      : PL_CONFIG_2026.zusSocialAnnualPln[zusStage] ?? PL_CONFIG_2026.zusSocialAnnualPln.duzy;
  const zusSocialPln = Math.round(zusSocialExactPln);

  // 2. Regime-specific NFZ Health Insurance & PIT Income Tax
  const limitEur = PL_CONFIG_2026.ryczaltCapEur;
  const limitPln = Math.round(limitEur * fx);
  const isBreach = revEur > limitEur;
  const isEligible = !isBreach;

  let healthPln = 0;
  let healthTier = 1;
  let deductibleCostsPln = 0; // ZUS + 50% health (Ryczałt) or ZUS + capped health (Liniowy) or ZUS (Skala)
  let taxBasePln = 0;
  let grossTaxPln = 0;
  let spouseJointSavingPln = 0;
  let childCreditPln = 0;
  let taxPln = 0;
  let regimeLabel = `Ryczałt ${ryczaltRate}%`;

  if (regime === 'ryczalt') {
    const rateNum = parseFloat(ryczaltRate) || 12;
    regimeLabel = `Ryczałt ${rateNum}%`;
    const revAfterZusPln = Math.max(0, revPln - zusSocialPln);
    const hCfg = PL_CONFIG_2026.ryczaltHealthMonthlyPln;
    let healthMo = hCfg.tier1Monthly;
    if (revAfterZusPln > hCfg.tier2MaxPln) {
      healthMo = hCfg.tier3Monthly;
      healthTier = 3;
    } else if (revAfterZusPln > hCfg.tier1MaxPln) {
      healthMo = hCfg.tier2Monthly;
      healthTier = 2;
    }
    healthPln = Math.round(healthMo * 12);
    const halfHealthDeductionPln = Math.round(healthPln * 0.5);
    deductibleCostsPln = Math.min(revPln, zusSocialPln + halfHealthDeductionPln);
    taxBasePln = Math.max(0, revPln - deductibleCostsPln);
    grossTaxPln = Math.round(taxBasePln * (rateNum / 100));
    taxPln = grossTaxPln;
  } else if (regime === 'liniowy') {
    regimeLabel = 'Liniowy 19%';
    const profitAfterZusPln = Math.max(0, revPln - zusSocialPln);
    const minHealthAnnualPln = Math.round(PL_CONFIG_2026.minHealthMonthlySkalaLiniowyPln * 12);
    healthPln = Math.max(minHealthAnnualPln, Math.round(profitAfterZusPln * 0.049));
    const deductibleHealthPln = Math.min(healthPln, PL_CONFIG_2026.liniowyHealthDeductionCapPln);
    deductibleCostsPln = Math.min(revPln, zusSocialPln + deductibleHealthPln);
    taxBasePln = Math.max(0, revPln - deductibleCostsPln);
    grossTaxPln = Math.round(taxBasePln * 0.19);
    taxPln = grossTaxPln;
  } else {
    // Skala podatkowa (12% / 32%)
    regimeLabel = 'Skala 12%/32%';
    const profitAfterZusPln = Math.max(0, revPln - zusSocialPln);
    const minHealthAnnualPln = Math.round(PL_CONFIG_2026.minHealthMonthlySkalaLiniowyPln * 12);
    healthPln = Math.max(minHealthAnnualPln, Math.round(profitAfterZusPln * 0.09));
    deductibleCostsPln = Math.min(revPln, zusSocialPln);
    taxBasePln = profitAfterZusPln;

    const singleTaxPln = Math.round(computeSkalaSinglePln(taxBasePln));
    grossTaxPln = singleTaxPln;

    const afterJointTaxPln = hasSpouse
      ? Math.round(2 * computeSkalaSinglePln(taxBasePln / 2))
      : singleTaxPln;
    spouseJointSavingPln = Math.max(0, singleTaxPln - afterJointTaxPln);

    const maxChildCredPln = Math.round(computePolishChildCreditMaxPln(kids, taxBasePln, hasSpouse));
    // Ulga prorodzinna offsets PIT first and unused credit is refundable up to paid ZUS + NFZ
    const maxRefundableCapPln = afterJointTaxPln + zusSocialPln + healthPln;
    // Cap applied credit at afterJointTaxPln on the tax line so income tax >= 0 in ledger
    childCreditPln = Math.min(afterJointTaxPln, Math.min(maxChildCredPln, maxRefundableCapPln));
    taxPln = Math.max(0, afterJointTaxPln - childCreditPln);
  }

  const socialPln = zusSocialPln + healthPln;
  const totalPaidPln = taxPln + socialPln;
  const netPln = revPln - totalPaidPln;

  const expensesAnnual = toEur(deductibleCostsPln);
  const taxBaseAnnual = toEur(taxBasePln);
  const grossTaxEur = toEur(grossTaxPln);
  const taxAnnual = toEur(taxPln);
  const familyTaxCreditAnnual = round2(Math.max(0, grossTaxEur - taxAnnual));

  const zusSocialEur = toEur(zusSocialPln);
  const healthEur = toEur(healthPln);
  const socialAnnual = round2(zusSocialEur + healthEur);

  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(revEur - totalPaidAnnual);

  return {
    country: 'pl',
    regime,
    regimeName: regimeLabel,
    ryczaltRate,
    employment,
    zusStage,
    healthTier,
    children: kids,
    dependentSpouse: hasSpouse,
    revenue: revEur,
    revenuePln: revPln,
    eurPln: fx,
    limit: limitEur,
    limitPln,
    vatThreshold: vatThresholdEur,
    exceedsVatExempt,
    isEligible,
    isBreach,
    excessRevenue: isBreach ? round2(revEur - limitEur) : 0,
    expensesAnnual,
    taxBaseAnnual,
    grossTaxAnnual: grossTaxEur,
    familyTaxCreditAnnual,
    spouseHealthAnnual: 0, // ZCNA family NFZ co-insurance is 0 PLN
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: revEur > 0 ? (totalPaidAnnual / revEur) * 100 : 0,
    breakdown: {
      zusSocialEur,
      healthEur,
      grossTaxEur,
      spouseJointSavingEur: toEur(spouseJointSavingPln),
      childCreditEur: toEur(childCreditPln)
    },
    pln: {
      gross: revPln,
      expenses: deductibleCostsPln,
      taxBase: taxBasePln,
      grossTax: grossTaxPln,
      spouseJointSaving: spouseJointSavingPln,
      childCredit: childCreditPln,
      tax: taxPln,
      zusSocial: zusSocialPln,
      health: healthPln,
      social: socialPln,
      totalPaid: totalPaidPln,
      net: netPln
    }
  };
}
