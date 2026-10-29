/**
 * Czechia 2026 — OSVČ (Paušální daň & Paušální výdaje 60%/80%/40%) Engine
 *
 * Official 2026 Statutory Parameters:
 * - Average Wage 2026: 48,967 CZK/mo
 * - Minimum Wage 2026: 22,400 CZK/mo
 * - DPH (21% VAT) Registration Ceiling: 2,000,000 CZK/yr (next-year; 2,536,500 CZK immediate)
 * - Regime A: Paušální daň 2026 (All-in 3 bands, full-time OSVČ only, non-VAT payer ≤ 2,000,000 CZK):
 *   • Band 1: 9,162 CZK/mo (100 CZK tax + 5,756 CZK social + 3,306 CZK health)
 *     - ≤1.0M CZK (any), ≤1.5M CZK (60% or 80% activity), ≤2.0M CZK (80% crafts/agri)
 *   • Band 2: 16,745 CZK/mo (4,963 CZK tax + 8,191 CZK social + 3,591 CZK health)
 *     - 1.0M–1.5M CZK (40% activity) or 1.5M–2.0M CZK (60% IT/trade activity)
 *   • Band 3: 27,139 CZK/mo (9,320 CZK tax + 12,527 CZK social + 5,292 CZK health)
 *     - 1.5M–2.0M CZK (40% activity)
 *   • Forfeits all child & spouse tax credits (§ 2a ZDP).
 * - Regime B: Standard OSVČ with Paušální výdaje (60% IT/trade max 1.2M CZK; 80% crafts max 1.6M; 40% max 800k; NO revenue ceiling):
 *   • Social Insurance (29.2% on 55% of profit):
 *     - Full-time 2026 min: 5,005 CZK/mo (60,060 CZK/yr); Startup Year 1–2 min: 3,575 CZK/mo (42,900 CZK/yr)
 *     - Max annual assessment base: 48 × 48,967 = 2,350,416 CZK (max social = 686,321 CZK/yr)
 *     - Side-job (vedlejší): 0 CZK below rozhodná částka 117,521 CZK profit (2.4 × 48,967), else min 1,574 CZK/mo
 *   • Health Insurance (13.5% on 50% of profit):
 *     - Full-time 2026 min: 3,306 CZK/mo (39,672 CZK/yr); Side-job: 13.5% × 50% × profit (no min floor)
 *   • Income Tax: 15% up to 1,762,812 CZK (36 × 48,967), 23% above
 *     - Sleva na poplatníka: 30,840 CZK/yr
 *     - Sleva na manžela/manželku: 24,840 CZK/yr (requires spouse income ≤68k CZK AND caring for child <3)
 *     - Daňové zvýhodnění na děti: 15,204 CZK (1st), 22,320 CZK (2nd), 27,840 CZK (3rd+)
 * - Non-working Spouse Health Insurance (OBZP 2026):
 *   • Mandatory 13.5% × 22,400 CZK = 3,024 CZK/mo (36,288 CZK/yr) UNLESS state-insured for caring for ≥1 child <7 yrs.
 */

import { round2 } from '../utils/format.js';

export const CZ_CONFIG_2026 = {
  defaultEurCzk: 25.2,
  avgWageMonthlyCzk: 48967,
  minWageMonthlyCzk: 22400,
  vatLimitCzk: 2000000,
  vatRatePct: 21,
  pausalniDanCapCzk: 2000000,
  vydajovyNominalCapEur: 2000000, // Unlimited statutory eligibility; 2M € display benchmark
  tax23ThresholdCzk: 1762812,     // 36 × 48,967 CZK
  slevaPoplatnikCzk: 30840,
  slevaManzelkaCzk: 24840,
  obzpMonthlyCzk: 3024,           // 13.5% × 22,400 CZK
  bands2026: {
    1: { totalMo: 9162, taxMo: 100, socMo: 5756, healthMo: 3306 },
    2: { totalMo: 16745, taxMo: 4963, socMo: 8191, healthMo: 3591 },
    3: { totalMo: 27139, taxMo: 9320, socMo: 12527, healthMo: 5292 }
  },
  social: {
    rate: 0.292,
    baseShare: 0.55,
    minFullMonthlyCzk: 5005,
    minStartupMonthlyCzk: 3575,
    minSideMonthlyCzk: 1574,
    sideThresholdProfitCzk: 117521, // 2.4 × 48,967 CZK
    maxAnnualBaseCzk: 48 * 48967    // 2,350,416 CZK
  },
  health: {
    rate: 0.135,
    baseShare: 0.5,
    minFullMonthlyCzk: 3306
  }
};

function computeChildCreditCzk(kids) {
  if (kids <= 0) return 0;
  let sum = 15204;
  if (kids >= 2) sum += 22320;
  if (kids >= 3) sum += (kids - 2) * 27840;
  return sum;
}

function resolvePausalniBand(revCzk, expenseRate) {
  if (revCzk <= 1000000) return 1;
  if (revCzk <= 1500000) {
    return expenseRate === '80' || expenseRate === '60' ? 1 : 2;
  }
  if (expenseRate === '80') return 1;
  if (expenseRate === '60') return 2;
  return 3;
}

function evaluateCzechSingleRegime({
  revEur,
  revCzk,
  fx,
  resolvedRegime,
  expenseRate,
  employment,
  stage,
  kids,
  hasSpouse,
  spouseYoungChild
}) {
  const toEur = czk => round2(czk / fx);
  const vatThresholdEur = toEur(CZ_CONFIG_2026.vatLimitCzk);
  const exceedsVatExempt = revCzk > CZ_CONFIG_2026.vatLimitCzk;

  // Non-working spouse OBZP health fee: waived only if caring for ≥1 child <7 yrs (2026 VZP amendment)
  const spouseStateInsured = kids >= 1 && spouseYoungChild;
  const spouseObzpCzk = hasSpouse && !spouseStateInsured ? CZ_CONFIG_2026.obzpMonthlyCzk * 12 : 0;
  const spouseObzpEur = toEur(spouseObzpCzk);

  if (resolvedRegime === 'pausalni_dan') {
    const isSideDisqualified = employment === 'side';
    const isOverCap = revCzk > CZ_CONFIG_2026.pausalniDanCapCzk;
    const isEligible = !isSideDisqualified && !isOverCap;
    const bandId = resolvePausalniBand(Math.min(revCzk, CZ_CONFIG_2026.pausalniDanCapCzk), expenseRate);
    const band = CZ_CONFIG_2026.bands2026[bandId];

    const taxCzk = revCzk > 0 ? band.taxMo * 12 : 0;
    const socPillarCzk = revCzk > 0 ? band.socMo * 12 : 0;
    const healthPillarCzk = revCzk > 0 ? band.healthMo * 12 : 0;
    const socialCzk = socPillarCzk + healthPillarCzk + spouseObzpCzk;
    const totalPaidCzk = taxCzk + socialCzk;
    const netCzk = revCzk - totalPaidCzk;

    const limitEur = toEur(CZ_CONFIG_2026.pausalniDanCapCzk);
    const taxAnnual = toEur(taxCzk);
    const socPillarEur = toEur(socPillarCzk);
    const healthPillarEur = toEur(healthPillarCzk);
    const socialAnnual = round2(socPillarEur + healthPillarEur + spouseObzpEur);
    const totalPaidAnnual = round2(taxAnnual + socialAnnual);
    const netAnnual = round2(revEur - totalPaidAnnual);

    return {
      country: 'cz',
      regime: 'pausalni_dan',
      resolvedRegime: 'pausalni_dan',
      regimeName: `Paušální daň (Band ${bandId})`,
      bandId,
      expenseRate,
      employment,
      stage,
      children: kids,
      dependentSpouse: hasSpouse,
      spouseYoungChild,
      revenue: revEur,
      revenueCzk: revCzk,
      eurCzk: fx,
      limit: limitEur,
      limitCzk: CZ_CONFIG_2026.pausalniDanCapCzk,
      vatThreshold: vatThresholdEur,
      exceedsVatExempt,
      isEligible,
      isBreach: isOverCap,
      isSideDisqualified,
      excessRevenue: isOverCap ? round2(revEur - limitEur) : 0,
      expensesAnnual: 0,
      taxBaseAnnual: revEur,
      grossTaxAnnual: taxAnnual,
      familyTaxCreditAnnual: 0,
      spouseHealthAnnual: spouseObzpEur,
      taxAnnual,
      socialAnnual,
      totalPaidAnnual,
      netAnnual,
      netMonthly: round2(netAnnual / 12),
      effectiveRatePct: revEur > 0 ? (totalPaidAnnual / revEur) * 100 : 0,
      breakdown: {
        socPillarEur,
        healthPillarEur,
        spouseObzpEur,
        grossTaxEur: taxAnnual,
        childCreditEur: 0,
        spouseCreditEur: 0
      },
      czk: {
        gross: revCzk,
        expenses: 0,
        taxBase: revCzk,
        grossTax: taxCzk,
        childCredit: 0,
        spouseCredit: 0,
        tax: taxCzk,
        socPillar: socPillarCzk,
        healthPillar: healthPillarCzk,
        spouseObzp: spouseObzpCzk,
        social: socialCzk,
        totalPaid: totalPaidCzk,
        net: netCzk
      }
    };
  }

  // Standard OSVČ with Paušální výdaje (60% / 80% / 40%, capped on 2,000,000 CZK revenue base)
  const expPct = expenseRate === '80' ? 0.8 : expenseRate === '40' ? 0.4 : 0.6;
  const maxExpCzk = Math.round(2000000 * expPct);
  const expensesCzk = Math.min(maxExpCzk, Math.round(revCzk * expPct));
  const profitCzk = Math.max(0, revCzk - expensesCzk);

  // Social Insurance (ČSSZ)
  const sCfg = CZ_CONFIG_2026.social;
  const rawSocBaseCzk = Math.min(sCfg.maxAnnualBaseCzk, Math.round(profitCzk * sCfg.baseShare));
  let socPillarCzk = 0;
  if (revCzk > 0) {
    if (employment === 'side') {
      if (profitCzk >= sCfg.sideThresholdProfitCzk) {
        socPillarCzk = Math.max(sCfg.minSideMonthlyCzk * 12, Math.ceil(rawSocBaseCzk * sCfg.rate));
      }
    } else {
      const minSocAnnual =
        (stage === 'new' ? sCfg.minStartupMonthlyCzk : sCfg.minFullMonthlyCzk) * 12;
      socPillarCzk = Math.max(minSocAnnual, Math.ceil(rawSocBaseCzk * sCfg.rate));
    }
  }

  // Health Insurance (VZP)
  const hCfg = CZ_CONFIG_2026.health;
  const rawHealthBaseCzk = Math.round(profitCzk * hCfg.baseShare);
  let healthPillarCzk = 0;
  if (revCzk > 0) {
    const computedHealth = Math.ceil(rawHealthBaseCzk * hCfg.rate);
    healthPillarCzk =
      employment === 'side' ? computedHealth : Math.max(hCfg.minFullMonthlyCzk * 12, computedHealth);
  }

  // Income Tax (DPFO 15% / 23%)
  let tariffTaxCzk = 0;
  if (profitCzk <= CZ_CONFIG_2026.tax23ThresholdCzk) {
    tariffTaxCzk = Math.round(profitCzk * 0.15);
  } else {
    tariffTaxCzk = Math.round(
      CZ_CONFIG_2026.tax23ThresholdCzk * 0.15 +
        (profitCzk - CZ_CONFIG_2026.tax23ThresholdCzk) * 0.23
    );
  }

  const taxAfterBasicCzk = Math.max(0, tariffTaxCzk - CZ_CONFIG_2026.slevaPoplatnikCzk);
  const spouseCredMaxCzk =
    hasSpouse && kids >= 1 && spouseYoungChild ? CZ_CONFIG_2026.slevaManzelkaCzk : 0;
  const spouseCreditCzk = Math.min(taxAfterBasicCzk, spouseCredMaxCzk);
  const taxAfterSpouseCzk = Math.max(0, taxAfterBasicCzk - spouseCreditCzk);

  const childCredMaxCzk = computeChildCreditCzk(kids);
  const childCreditCzk = Math.min(taxAfterSpouseCzk, childCredMaxCzk);
  const taxCzk = Math.max(0, taxAfterSpouseCzk - childCreditCzk);

  const socialCzk = socPillarCzk + healthPillarCzk + spouseObzpCzk;
  const totalPaidCzk = taxCzk + socialCzk;
  const netCzk = revCzk - totalPaidCzk;

  const expensesAnnual = toEur(expensesCzk);
  const taxBaseAnnual = round2(Math.max(0, revEur - expensesAnnual));
  const grossTaxEur = toEur(taxAfterBasicCzk);
  const taxAnnual = toEur(taxCzk);
  const familyTaxCreditAnnual = round2(Math.max(0, grossTaxEur - taxAnnual));

  const socPillarEur = toEur(socPillarCzk);
  const healthPillarEur = toEur(healthPillarCzk);
  const socialAnnual = round2(socPillarEur + healthPillarEur + spouseObzpEur);
  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(revEur - totalPaidAnnual);

  return {
    country: 'cz',
    regime: 'vydajovy_pausal',
    resolvedRegime: 'vydajovy_pausal',
    regimeName: `OSVČ ${expenseRate}% výdaje`,
    bandId: null,
    expenseRate,
    employment,
    stage,
    children: kids,
    dependentSpouse: hasSpouse,
    spouseYoungChild,
    revenue: revEur,
    revenueCzk: revCzk,
    eurCzk: fx,
    limit: CZ_CONFIG_2026.vydajovyNominalCapEur,
    limitCzk: Math.round(CZ_CONFIG_2026.vydajovyNominalCapEur * fx),
    vatThreshold: vatThresholdEur,
    exceedsVatExempt,
    isEligible: true,
    isBreach: false,
    isSideDisqualified: false,
    excessRevenue: 0,
    expensesAnnual,
    taxBaseAnnual,
    grossTaxAnnual: grossTaxEur,
    familyTaxCreditAnnual,
    spouseHealthAnnual: spouseObzpEur,
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: revEur > 0 ? (totalPaidAnnual / revEur) * 100 : 0,
    breakdown: {
      socPillarEur,
      healthPillarEur,
      spouseObzpEur,
      grossTaxEur,
      childCreditEur: toEur(childCreditCzk),
      spouseCreditEur: toEur(spouseCreditCzk)
    },
    czk: {
      gross: revCzk,
      expenses: expensesCzk,
      taxBase: profitCzk,
      grossTax: taxAfterBasicCzk,
      childCredit: childCreditCzk,
      spouseCredit: spouseCreditCzk,
      tax: taxCzk,
      socPillar: socPillarCzk,
      healthPillar: healthPillarCzk,
      spouseObzp: spouseObzpCzk,
      social: socialCzk,
      totalPaid: totalPaidCzk,
      net: netCzk
    }
  };
}

export function calculateCzechia({
  revenue = 65000,
  regime = 'auto',          // 'auto' | 'pausalni_dan' | 'vydajovy_pausal'
  expenseRate = '60',       // '60' | '80' | '40'
  employment = 'full',      // 'full' | 'side'
  stage = 'established',    // 'established' | 'new'
  spouseYoungChild = false,
  eurCzk = CZ_CONFIG_2026.defaultEurCzk,
  children = 0,
  dependentSpouse = false
} = {}) {
  const revEur = Math.max(0, Number(revenue) || 0);
  const fx = Math.max(1, Number(eurCzk) || CZ_CONFIG_2026.defaultEurCzk);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);
  const revCzk = Math.round(revEur * fx);

  const common = {
    revEur,
    revCzk,
    fx,
    expenseRate,
    employment,
    stage,
    kids,
    hasSpouse,
    spouseYoungChild: Boolean(spouseYoungChild)
  };

  if (regime === 'pausalni_dan' || regime === 'vydajovy_pausal') {
    return evaluateCzechSingleRegime({ ...common, resolvedRegime: regime });
  }

  // Auto-Optimal: select highest net take-home among eligible Czech OSVČ regimes
  const pausalRes = evaluateCzechSingleRegime({ ...common, resolvedRegime: 'pausalni_dan' });
  const vydajeRes = evaluateCzechSingleRegime({ ...common, resolvedRegime: 'vydajovy_pausal' });

  if (pausalRes.isEligible && pausalRes.netAnnual >= vydajeRes.netAnnual) {
    return { ...pausalRes, regime: 'auto' };
  }
  return { ...vydajeRes, regime: 'auto' };
}
