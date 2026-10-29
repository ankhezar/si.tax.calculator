/**
 * Official 2026 Austria Sole-Proprietor Engine — Einzelunternehmen (Pauschalierung)
 *
 * Covers:
 * - Kleinunternehmerpauschalierung (§ 17 Abs. 3a EStG): up to 55,000 € (60,500 € tolerance),
 *   20% services (max 11,000 €) / 45% goods (max 24,750 €).
 * - Basispauschalierung (§ 17 Abs. 1 EStG): up to 420,000 € (2026 cap),
 *   6% consulting/IT/scientific (max 25,200 €) / 15% general (max 63,000 €).
 * - 2026 SVS GSVG contributions (PV 18.50% + KV 6.80% + SV 1.53% = 26.83% + UV 144.84 €/yr,
 *   min base 6,613.20 €/yr, max base 97,020.00 €/yr), deductible from income tax.
 * - 15% Grundfreibetrag (§ 10 EStG, up to 4,950 €) & 2026 progressive Einkommensteuertarif.
 */

import { round2 } from '../utils/format.js';

export const AT_CONFIG_2026 = {
  klein: {
    limit: 55000,
    toleranceLimit: 60500,
    rates: {
      services: { rate: 0.20, maxExpense: 11000 },
      goods:    { rate: 0.45, maxExpense: 24750 }
    }
  },
  basis: {
    limit: 420000,
    rates: {
      services: { rate: 0.06, maxExpense: 25200 },
      goods:    { rate: 0.15, maxExpense: 63000 }
    }
  },
  svs: {
    minBaseMonthly: 551.10,
    minBaseAnnual: 6613.20,   // Also GSVG Versicherungsgrenze
    maxBaseMonthly: 8085.00,
    maxBaseAnnual: 97020.00,
    pvRate: 0.1850,           // Pensionsversicherung
    kvRate: 0.0680,           // Krankenversicherung
    bmsvgRate: 0.0153,        // Selbständigenvorsorge (total proportional = 26.83%)
    uvAnnual: 144.84          // Unfallversicherung (12.07 €/mo)
  },
  grundfreibetrag: {
    rate: 0.15,
    maxProfitEligible: 33000, // Max Grundfreibetrag = 4,950 €
    maxAllowance: 4950
  },
  estBrackets2026: [
    { upTo: 13539,   rate: 0.00 },
    { upTo: 21992,   rate: 0.20 },
    { upTo: 36458,   rate: 0.30 },
    { upTo: 70365,   rate: 0.40 },
    { upTo: 104859,  rate: 0.48 },
    { upTo: 1000000, rate: 0.50 },
    { upTo: Infinity, rate: 0.55 }
  ],
  family: {
    familienbonusUnder18Annual: 2000.16, // § 33 Abs. 3a EStG (166.68 €/mo per child <18)
    avab1ChildAnnual: 612.00,            // § 33 Abs. 4 Z 1 EStG (2026 valorized, spouse <= 7,411 €)
    avab2ChildrenAnnual: 828.00,
    avab3ChildrenAnnual: 1101.00,
    avabExtraChildAnnual: 273.00,
    spouseIncomeLimitAnnual: 7411.00,
    svsSpouseSurchargeRate: 0.034        // § 51d GSVG 3.4% Zusatzbeitrag (waived with children or >=4 yrs past child-rearing)
  }
};

export function computeProgressiveEst2026(taxableIncome) {
  const inc = Math.max(0, Number(taxableIncome) || 0);
  let tax = 0;
  let prev = 0;
  for (const b of AT_CONFIG_2026.estBrackets2026) {
    if (inc <= prev) break;
    const slice = Math.min(inc, b.upTo) - prev;
    tax += slice * b.rate;
    prev = b.upTo;
  }
  return round2(tax);
}

export function calculateAustria({
  revenue = 65000,
  scheme = 'auto',        // 'auto' | 'klein' | 'basis'
  activity = 'services',  // 'services' | 'goods'
  employment = 'full',    // 'full' | 'side'
  kleinSvsOptOut = false,
  children = 0,
  dependentSpouse = false,
  spouseChildRearingWaiver = false
} = {}) {
  const rev = Math.max(0, Number(revenue) || 0);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);
  const spouseSvsWaived = kids >= 1 || Boolean(spouseChildRearingWaiver);

  let resolvedScheme = scheme;
  if (scheme === 'auto') {
    resolvedScheme = rev <= AT_CONFIG_2026.klein.limit ? 'klein' : 'basis';
  }

  const schemeCfg = resolvedScheme === 'klein' ? AT_CONFIG_2026.klein : AT_CONFIG_2026.basis;
  const actCfg = schemeCfg.rates[activity] || schemeCfg.rates.services;

  const isBreach = rev > schemeCfg.limit;
  const isWithinTolerance =
    resolvedScheme === 'klein' && rev > AT_CONFIG_2026.klein.limit && rev <= AT_CONFIG_2026.klein.toleranceLimit;
  const isEligible = !isBreach;

  const cappedRevForExpense = Math.min(rev, schemeCfg.limit);
  const flatExpenses = round2(Math.min(cappedRevForExpense * actCfg.rate, actCfg.maxExpense));
  const preSvsProfit = round2(Math.max(0, rev - flatExpenses));

  // SVS 2026 calculation (§ 25 GSVG base corresponds to pre-SVS operating profit clamped to min/max)
  const svsCfg = AT_CONFIG_2026.svs;
  const famCfg = AT_CONFIG_2026.family;
  const qualifiesForExemptBelowLimit =
    (employment === 'side' || kleinSvsOptOut) &&
    preSvsProfit <= svsCfg.minBaseAnnual &&
    rev <= AT_CONFIG_2026.klein.limit;

  let svsBase = 0;
  let pvAnnual = 0;
  let kvAnnual = 0;
  let bmsvgAnnual = 0;
  let spouseSvsAnnual = 0;
  const uvAnnual = rev > 0 || employment === 'full' ? svsCfg.uvAnnual : 0;

  if (!qualifiesForExemptBelowLimit) {
    const minFloor = employment === 'side' ? 0 : svsCfg.minBaseAnnual;
    svsBase = round2(Math.min(Math.max(preSvsProfit, minFloor), svsCfg.maxBaseAnnual));
    pvAnnual = round2(svsBase * svsCfg.pvRate);
    kvAnnual = round2(svsBase * svsCfg.kvRate);
    bmsvgAnnual = round2(svsBase * svsCfg.bmsvgRate);
    if (hasSpouse && !spouseSvsWaived) {
      spouseSvsAnnual = round2(svsBase * famCfg.svsSpouseSurchargeRate);
    }
  }

  const socialAnnual = round2(pvAnnual + kvAnnual + bmsvgAnnual + uvAnnual + spouseSvsAnnual);

  // Mandatory SVS contributions (including § 51d GSVG Zusatzbeitrag) are deductible Betriebsausgaben
  const profitAfterSvs = round2(Math.max(0, rev - flatExpenses - socialAnnual));
  const gfb = round2(
    Math.min(profitAfterSvs, AT_CONFIG_2026.grundfreibetrag.maxProfitEligible) *
      AT_CONFIG_2026.grundfreibetrag.rate
  );
  const taxBaseAnnual = round2(Math.max(0, profitAfterSvs - gfb));
  const grossTaxAnnual = computeProgressiveEst2026(taxBaseAnnual);

  // Direct § 33 EStG family tax credits (Alleinverdienerabsetzbetrag + Familienbonus Plus)
  let avabMaxAnnual = 0;
  if (hasSpouse && kids >= 1) {
    if (kids === 1) avabMaxAnnual = famCfg.avab1ChildAnnual;
    else if (kids === 2) avabMaxAnnual = famCfg.avab2ChildrenAnnual;
    else avabMaxAnnual = famCfg.avab3ChildrenAnnual + (kids - 3) * famCfg.avabExtraChildAnnual;
  }
  const familienbonusMaxAnnual = round2(kids * famCfg.familienbonusUnder18Annual);
  const avabAppliedAnnual = round2(Math.min(grossTaxAnnual, avabMaxAnnual));
  const familienbonusAppliedAnnual = round2(
    Math.min(Math.max(0, grossTaxAnnual - avabAppliedAnnual), familienbonusMaxAnnual)
  );
  const familyTaxCreditAnnual = round2(avabAppliedAnnual + familienbonusAppliedAnnual);
  const taxAnnual = round2(Math.max(0, grossTaxAnnual - familyTaxCreditAnnual));

  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(rev - totalPaidAnnual);

  return {
    country: 'at',
    regimeName:
      resolvedScheme === 'klein' ? 'Kleinunternehmerpauschalierung' : 'Basispauschalierung',
    resolvedScheme,
    children: kids,
    dependentSpouse: hasSpouse,
    spouseSvsWaived,
    revenue: rev,
    limit: schemeCfg.limit,
    vatThreshold: AT_CONFIG_2026.klein.limit,
    isEligible,
    isBreach,
    isWithinTolerance,
    excessRevenue: isBreach ? round2(rev - schemeCfg.limit) : 0,
    expenseRate: actCfg.rate,
    expensesAnnual: flatExpenses,
    grundfreibetragAnnual: gfb,
    taxBaseAnnual,
    grossTaxAnnual,
    familyTaxCreditAnnual,
    spouseHealthAnnual: spouseSvsAnnual,
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: rev > 0 ? (totalPaidAnnual / rev) * 100 : 0,
    breakdown: {
      svsBase,
      pvAnnual,
      kvAnnual,
      bmsvgAnnual,
      uvAnnual,
      spouseSvsAnnual,
      avabMaxAnnual,
      familienbonusMaxAnnual,
      avabAppliedAnnual,
      familienbonusAppliedAnnual,
      qualifiesForExemptBelowLimit
    }
  };
}
