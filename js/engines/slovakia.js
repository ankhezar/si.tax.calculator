/**
 * Slovakia 2026 — SZČO (60% Paušálne výdavky + 2026 Consolidation Rules) Engine
 *
 * Official 2026 Statutory Parameters (Native EUR):
 * - Paušálne výdavky (§ 6 ods. 10 ZDP): 60% of gross revenue, capped at 20,000.00 €/yr
 * - Reduced SZČO Income Tax Rate: 15% up to 100,000.00 € annual taxable revenue
 *   (above 100,000 €: 2026 4-bracket progressive scale 19% / 25% / 30% / 35%)
 * - DPH (23% VAT) Domestic Threshold: 50,000 € (next-year; 62,500 € immediate)
 * - 2026 Social & Health Contributions (based on 2024 avg wage 1,524.00 €):
 *   • Assessment Base Formula: ((Revenue - FlatExpenses) / 1.486) / 12
 *   • Social Insurance (Sociálna poisťovňa — 33.15%):
 *     - Min base raised to 60% × 1,524 = 914.40 €/mo -> 303.11 €/mo (3,637.32 €/yr)
 *     - Max base: 11 × 1,524 = 16,764.00 €/mo (5,557.27 €/mo)
 *     - Year-1 Startup Holiday (stage === 'new') or revenue ≤ 9,144 €: 0.00 €!
 *   • Health Insurance (Zdravotná poisťovňa — raised from 15% to 16% in 2026):
 *     - Full-time min base: 50% × 1,524 = 762.00 €/mo -> 121.92 €/mo (1,463.04 €/yr); no upper cap
 *     - Side-job (employed elsewhere): no minimum health base (16% on actual VZ)
 * - 2026 Non-Taxable Allowances (Životné minimum Jan 1, 2026 = 284.13 €):
 *   • NČZD na daňovníka: 5,966.73 € up to ČZD 26,367.26 €, phased out as max(0, 12,558.55 - ČZD/4)
 *   • NČZD na manželku/manžela: 5,455.30 € up to ČZD 50,234.18 € (phased out above) when caring for young child / qualifying
 * - 2026 Daňový bonus na dieťa (<15 yrs = 100 €/mo = 1,200 €/yr):
 *   • Capped at 29% (1 child), 36% (2), 43% (3), 50% (4+) of ČZD
 *   • High-earner phase-out: reduced by 10% of (ČZD - 27,432.00 €) above 27,432 €/yr
 * - Non-working Spouse Health (Samoplatiteľ 2026):
 *   • 121.92 €/mo (1,463.04 €/yr) if uninsured without qualifying child-care exemption; 0 € when state-insured (child <6)
 */

import { round2 } from '../utils/format.js';

export const SK_CONFIG_2026 = {
  reducedTaxCapEur: 100000,
  vatThresholdEur: 50000,
  vatRatePct: 23,
  flatExpenseRate: 0.6,
  flatExpenseMaxEur: 20000,
  avgWage2024Eur: 1524,
  zivotneMinimum2026Eur: 284.13,
  vzDivisor: 1.486,
  social: {
    rate: 0.3315,
    revenueObligationThresholdEur: 9144, // 6 × 1,524 €
    minMonthlyBaseEur: 914.4,            // 60% × 1,524 €
    minMonthlyEur: 303.11,
    maxMonthlyBaseEur: 16764             // 11 × 1,524 €
  },
  health: {
    rate: 0.16,
    minMonthlyBaseEur: 762,              // 50% × 1,524 €
    minMonthlyEur: 121.92
  },
  nczd: {
    taxpayerFullEur: 5966.73,
    taxpayerPhaseStartEur: 26367.26,
    taxpayerFormulaConstEur: 12558.55,
    spouseFullEur: 5455.3,
    spousePhaseStartEur: 50234.18,
    spouseFormulaConstEur: 18013.84
  },
  childBonus: {
    annualPerChildEur: 1200, // 100 €/mo (<15 yrs benchmark)
    czdCapsByCount: { 1: 0.29, 2: 0.36, 3: 0.43, 4: 0.5 },
    phaseOutStartCzdEur: 27432,
    phaseOutRate: 0.1
  },
  progressive2026: [
    { upTo: 43983.32, rate: 0.19 },
    { upTo: 60349.21, rate: 0.25 },
    { upTo: 75010.32, rate: 0.3 },
    { upTo: Infinity, rate: 0.35 }
  ]
};

function computeSlovakProgressiveTax2026(taxableBase) {
  if (taxableBase <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (const br of SK_CONFIG_2026.progressive2026) {
    if (taxableBase <= prev) break;
    const slice = Math.min(taxableBase, br.upTo) - prev;
    tax += slice * br.rate;
    prev = br.upTo;
  }
  return round2(tax);
}

export function calculateSlovakia({
  revenue = 65000,
  employment = 'full',      // 'full' | 'side'
  stage = 'established',    // 'established' | 'new'
  spouseCareQualifies = true,
  children = 0,
  dependentSpouse = false
} = {}) {
  const rev = Math.max(0, Number(revenue) || 0);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);

  const isBreach = rev > SK_CONFIG_2026.reducedTaxCapEur;
  const isEligible = !isBreach;

  // 1. Flat expenses (60%, max 20,000 €/yr)
  const flatExpenses = round2(
    Math.min(SK_CONFIG_2026.flatExpenseMaxEur, rev * SK_CONFIG_2026.flatExpenseRate)
  );
  const profitBeforeOdvody = round2(Math.max(0, rev - flatExpenses));

  // 2. Entrepreneur Social & Health Contributions (steady-state VZ = profitBeforeOdvody / 1.486 / 12)
  const rawMonthlyVz = profitBeforeOdvody / SK_CONFIG_2026.vzDivisor / 12;

  let socPillarAnnual = 0;
  if (stage !== 'new' && rev > SK_CONFIG_2026.social.revenueObligationThresholdEur) {
    const socBaseMo =
      Math.floor(
        Math.min(
          SK_CONFIG_2026.social.maxMonthlyBaseEur,
          Math.max(SK_CONFIG_2026.social.minMonthlyBaseEur, rawMonthlyVz)
        ) * 100
      ) / 100;
    // Sociálna poisťovňa rounds each of the 4 sub-pillars (4.4% + 18% + 6% + 4.75% = 33.15%) down to 0.01 €
    const socPillarsMo =
      Math.floor(socBaseMo * 0.044 * 100) / 100 +
      Math.floor(socBaseMo * 0.18 * 100) / 100 +
      Math.floor(socBaseMo * 0.06 * 100) / 100 +
      Math.floor(socBaseMo * 0.0475 * 100) / 100;
    const socMo = round2(Math.max(SK_CONFIG_2026.social.minMonthlyEur, socPillarsMo));
    socPillarAnnual = round2(socMo * 12);
  }

  let healthPillarAnnual = 0;
  if (rev > 0 || employment === 'full') {
    const computedHealthMo = Math.floor(rawMonthlyVz * SK_CONFIG_2026.health.rate * 100) / 100;
    const healthMo =
      employment === 'side'
        ? rev > 0
          ? computedHealthMo
          : 0
        : rev > 0
          ? Math.max(SK_CONFIG_2026.health.minMonthlyEur, computedHealthMo)
          : 0;
    healthPillarAnnual = round2(healthMo * 12);
  }

  const entrepreneurOdvodyAnnual = round2(socPillarAnnual + healthPillarAnnual);

  // Non-working spouse health fee (Samoplatiteľ 121.92 €/mo unless state-insured via qualifying child care)
  const spouseQualifiesCare = kids >= 1 && Boolean(spouseCareQualifies);
  const spouseHealthAnnual =
    hasSpouse && !spouseQualifiesCare ? round2(SK_CONFIG_2026.health.minMonthlyEur * 12) : 0;

  const socialAnnual = round2(entrepreneurOdvodyAnnual + spouseHealthAnnual);

  // 3. Partial Tax Base (ČZD) & Non-Taxable Allowances (NČZD)
  const czdAnnual = round2(Math.max(0, rev - flatExpenses - entrepreneurOdvodyAnnual));

  const nCfg = SK_CONFIG_2026.nczd;
  const nczdTaxpayer =
    czdAnnual <= nCfg.taxpayerPhaseStartEur
      ? nCfg.taxpayerFullEur
      : round2(Math.max(0, nCfg.taxpayerFormulaConstEur - czdAnnual / 4));

  let nczdSpouse = 0;
  if (hasSpouse && spouseQualifiesCare) {
    nczdSpouse =
      czdAnnual <= nCfg.spousePhaseStartEur
        ? nCfg.spouseFullEur
        : round2(Math.max(0, nCfg.spouseFormulaConstEur - czdAnnual / 4));
  }

  const taxBaseBeforeSpouse = round2(Math.max(0, czdAnnual - nczdTaxpayer));
  const taxBaseAnnual = round2(Math.max(0, czdAnnual - nczdTaxpayer - nczdSpouse));

  const calcTax = base =>
    rev <= SK_CONFIG_2026.reducedTaxCapEur
      ? round2(base * 0.15)
      : computeSlovakProgressiveTax2026(base);

  const grossTaxBeforeFamily = calcTax(taxBaseBeforeSpouse);
  const taxAfterSpouse = calcTax(taxBaseAnnual);
  const spouseTaxSavingAnnual = round2(Math.max(0, grossTaxBeforeFamily - taxAfterSpouse));

  // 4. 2026 Daňový bonus na dieťa
  let childBonusAppliedAnnual = 0;
  if (kids > 0 && czdAnnual > 0) {
    const bCfg = SK_CONFIG_2026.childBonus;
    const rawBonus = kids * bCfg.annualPerChildEur;
    const capPct =
      kids >= 4 ? Math.min(0.64, 0.5 + (kids - 4) * 0.07) : bCfg.czdCapsByCount[kids] || 0.29;
    const czdCappedBonus = round2(czdAnnual * capPct);
    const excessCzd = Math.max(0, czdAnnual - bCfg.phaseOutStartCzdEur);
    const phaseOutReduction = round2(excessCzd * bCfg.phaseOutRate * kids);
    const eligibleBonus = round2(Math.max(0, Math.min(rawBonus, czdCappedBonus) - phaseOutReduction));
    childBonusAppliedAnnual = round2(Math.min(taxAfterSpouse, eligibleBonus));
  }

  const taxAnnual = round2(Math.max(0, taxAfterSpouse - childBonusAppliedAnnual));
  const familyTaxCreditAnnual = round2(spouseTaxSavingAnnual + childBonusAppliedAnnual);

  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(rev - totalPaidAnnual);

  return {
    country: 'sk',
    regimeName: rev <= SK_CONFIG_2026.reducedTaxCapEur ? 'SZČO 60% · 15% Tax' : 'SZČO 60% · 19–35%',
    employment,
    stage,
    children: kids,
    dependentSpouse: hasSpouse,
    spouseQualifiesCare,
    revenue: rev,
    limit: SK_CONFIG_2026.reducedTaxCapEur,
    vatThreshold: SK_CONFIG_2026.vatThresholdEur,
    isEligible,
    isBreach,
    excessRevenue: isBreach ? round2(rev - SK_CONFIG_2026.reducedTaxCapEur) : 0,
    expensesAnnual: flatExpenses,
    czdAnnual,
    nczdTaxpayerAnnual: nczdTaxpayer,
    nczdSpouseAnnual: nczdSpouse,
    taxBaseAnnual,
    grossTaxAnnual: grossTaxBeforeFamily,
    familyTaxCreditAnnual,
    spouseHealthAnnual,
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: rev > 0 ? (totalPaidAnnual / rev) * 100 : 0,
    breakdown: {
      socPillarAnnual,
      healthPillarAnnual,
      spouseHealthAnnual,
      grossTaxBeforeFamily,
      spouseTaxSavingAnnual,
      childBonusAppliedAnnual
    }
  };
}
