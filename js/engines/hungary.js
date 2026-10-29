/**
 * Official 2026 Hungary Sole-Proprietor Engine — Egyéni vállalkozó (Átalányadó & KATA)
 *
 * Sources: NAV 2026 official parameters:
 * - Minimálbér 2026: 322,800 HUF/mo (3,873,600 HUF/yr)
 * - Garantált bérminimum 2026: 373,200 HUF/mo (4,478,400 HUF/yr)
 * - Átalányadó general expense ratio increased to 45% in 2026 (plus 80% / 90% tiers)
 * - Tax-free profit allowance: 50% of annual min wage = 1,936,800 HUF
 * - SZOCHO 112.5% multiplier abolished in 2026 -> 100% floor on minimum wage
 * - Alanyi adómentesség (VAT exemption): 20,000,000 HUF
 * - KATA: 50,000 HUF/mo up to 18,000,000 HUF/yr (strictly full-time + B2C private clients only)
 */

import { round2 } from '../utils/format.js';

export const HU_CONFIG_2026 = {
  minimalberMonthly: 322800,
  minimalberAnnual: 3873600,
  garantaltMonthly: 373200,
  garantaltAnnual: 4478400,
  vatExemptLimitHuf: 20000000, // Alanyi adómentesség (AAM)

  atalanyado: {
    generalCapFactor: 10,      // 10x annual min wage = 38,736,000 HUF
    retailCapFactor: 50,       // 50x annual min wage = 193,680,000 HUF
    exemptProfitHuf: 1936800,  // 0.5x annual min wage
    expenseTiers: {
      '45': 0.45,              // General / IT / Consulting (2026 statutory rate)
      '80': 0.80,              // Crafts / construction / transport
      '90': 0.90               // Retail only
    },
    szjaRate: 0.15,
    tbjRate: 0.185,
    szochoRate: 0.130          // 100% wage floor in 2026 (112.5% abolished)
  },

  kata: {
    limitHuf: 18000000,
    monthlyFlatHuf: 50000,
    annualFlatHuf: 600000,
    excessSurtaxRate: 0.40,
    simplifiedHipaAnnualHuf: 50000 // 2.5M HUF fixed base * 2%
  }
};

function computeSimplifiedHipaHuf(revHuf, profitHuf, mode = 'simplified', isRetail = false) {
  if (mode === 'none' || revHuf <= 0) return 0;
  if (mode === 'standard2') return Math.round(profitHuf * 0.02);

  // Sávos egyszerűsített HIPA (2% max municipal rate on statutory flat bases)
  if (revHuf <= 12000000) return 50000;  // 2.5M * 2%
  if (revHuf <= 18000000) return 120000; // 6.0M * 2%
  const topBand = isRetail ? 120000000 : 25000000;
  if (revHuf <= topBand) return 170000;  // 8.5M * 2%
  return Math.round(profitHuf * 0.02);
}

export function calculateHungary({
  revenue = 65000,
  regime = 'atalanyado',    // 'atalanyado' | 'kata'
  employment = 'full',      // 'full' | 'side'
  expenseTier = '45',       // '45' | '80' | '90'
  wageFloor = 'guaranteed', // 'guaranteed' | 'minimal'
  hipaMode = 'simplified',  // 'simplified' | 'standard2' | 'none'
  clientType = 'b2b',       // 'b2b' | 'b2c'
  eurHuf = 400
} = {}) {
  const revEur = Math.max(0, Number(revenue) || 0);
  const fx = Number(eurHuf) > 0 ? Number(eurHuf) : 400;
  const revHuf = Math.round(revEur * fx);
  const toEur = huf => round2(huf / fx);

  const vatThresholdEur = toEur(HU_CONFIG_2026.vatExemptLimitHuf);
  const exceedsVatExempt = revHuf > HU_CONFIG_2026.vatExemptLimitHuf;

  if (regime === 'kata') {
    const k = HU_CONFIG_2026.kata;
    const limitEur = toEur(k.limitHuf);
    const isOverCap = revHuf > k.limitHuf;
    const isB2bDisqualified = clientType === 'b2b';
    const isSideDisqualified = employment === 'side';
    const isEligible = !isOverCap && !isB2bDisqualified && !isSideDisqualified;

    const excessHuf = Math.max(0, revHuf - k.limitHuf);
    const surtaxHuf = Math.round(excessHuf * k.excessSurtaxRate);
    const hipaHuf = hipaMode === 'none' || revHuf === 0 ? 0 : k.simplifiedHipaAnnualHuf;

    // Split flat KATA conceptually into social vs tax for normalized cross-country charts
    const flatKataHuf = k.annualFlatHuf;
    const taxAnnualHuf = surtaxHuf + hipaHuf;
    const socialAnnualHuf = flatKataHuf;
    const totalPaidHuf = socialAnnualHuf + taxAnnualHuf;
    const netHuf = revHuf - totalPaidHuf;

    const szjaEur = toEur(surtaxHuf);
    const hipaEur = toEur(hipaHuf);
    const tbjEur = toEur(flatKataHuf);
    const szochoEur = 0;

    const taxAnnual = round2(szjaEur + hipaEur);
    const socialAnnual = round2(tbjEur + szochoEur);
    const totalPaidAnnual = round2(taxAnnual + socialAnnual);
    const netAnnual = round2(revEur - totalPaidAnnual);

    return {
      country: 'hu',
      regime: 'kata',
      regimeName: 'KATA (B2C)',
      revenue: revEur,
      revenueHuf: revHuf,
      eurHuf: fx,
      limit: limitEur,
      limitHuf: k.limitHuf,
      vatThreshold: vatThresholdEur,
      exceedsVatExempt,
      isEligible,
      isBreach: isOverCap,
      isB2bDisqualified,
      isSideDisqualified,
      excessRevenue: isOverCap ? round2(revEur - limitEur) : 0,
      expensesAnnual: 0,
      exemptProfitAnnual: 0,
      taxBaseAnnual: revEur,
      taxAnnual,
      socialAnnual,
      totalPaidAnnual,
      netAnnual,
      netMonthly: round2(netAnnual / 12),
      effectiveRatePct: revEur > 0 ? (totalPaidAnnual / revEur) * 100 : 0,
      breakdown: {
        szjaEur,
        hipaEur,
        tbjEur,
        szochoEur
      },
      huf: {
        expenses: 0,
        exemptProfit: 0,
        taxBase: revHuf,
        szja: surtaxHuf,
        tbj: flatKataHuf,
        szocho: 0,
        hipa: hipaHuf,
        totalPaid: totalPaidHuf,
        net: netHuf
      }
    };
  }

  // --- Átalányadó (Flat-Rate Expense Sole Proprietor) ---
  const a = HU_CONFIG_2026.atalanyado;
  const ratio = a.expenseTiers[expenseTier] ?? 0.45;
  const isRetail = expenseTier === '90';
  const limitHuf =
    (isRetail ? a.retailCapFactor : a.generalCapFactor) * HU_CONFIG_2026.minimalberAnnual;
  const limitEur = toEur(limitHuf);

  const isBreach = revHuf > limitHuf;
  const isEligible = !isBreach;

  const expensesHuf = Math.round(revHuf * ratio);
  const profitHuf = Math.max(0, revHuf - expensesHuf);
  const exemptAppliedHuf = Math.min(profitHuf, a.exemptProfitHuf);
  const taxableProfitHuf = Math.max(0, profitHuf - exemptAppliedHuf);

  const szjaHuf = Math.round(taxableProfitHuf * a.szjaRate);

  const annualFloorHuf =
    wageFloor === 'minimal' ? HU_CONFIG_2026.minimalberAnnual : HU_CONFIG_2026.garantaltAnnual;

  const contribBaseHuf =
    employment === 'side' ? taxableProfitHuf : Math.max(taxableProfitHuf, annualFloorHuf);

  const tbjHuf = Math.round(contribBaseHuf * a.tbjRate);
  const szochoHuf = Math.round(contribBaseHuf * a.szochoRate);
  const hipaHuf = computeSimplifiedHipaHuf(revHuf, profitHuf, hipaMode, isRetail);

  const taxAnnualHuf = szjaHuf + hipaHuf;
  const socialAnnualHuf = tbjHuf + szochoHuf;
  const totalPaidHuf = taxAnnualHuf + socialAnnualHuf;
  const netHuf = revHuf - totalPaidHuf;

  const expensesAnnual = toEur(expensesHuf);
  const exemptProfitAnnual = toEur(exemptAppliedHuf);
  const taxBaseAnnual = round2(Math.max(0, revEur - expensesAnnual - exemptProfitAnnual));

  const szjaEur = toEur(szjaHuf);
  const hipaEur = toEur(hipaHuf);
  const tbjEur = toEur(tbjHuf);
  const szochoEur = toEur(szochoHuf);

  const taxAnnual = round2(szjaEur + hipaEur);
  const socialAnnual = round2(tbjEur + szochoEur);
  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(revEur - totalPaidAnnual);

  return {
    country: 'hu',
    regime: 'atalanyado',
    regimeName: 'Átalányadó',
    revenue: revEur,
    revenueHuf: revHuf,
    eurHuf: fx,
    limit: limitEur,
    limitHuf,
    vatThreshold: vatThresholdEur,
    exceedsVatExempt,
    isEligible,
    isBreach,
    isB2bDisqualified: false,
    isSideDisqualified: false,
    excessRevenue: isBreach ? round2(revEur - limitEur) : 0,
    expenseRatio: ratio,
    expensesAnnual,
    exemptProfitAnnual,
    taxBaseAnnual,
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: revEur > 0 ? (totalPaidAnnual / revEur) * 100 : 0,
    breakdown: {
      szjaEur,
      hipaEur,
      tbjEur,
      szochoEur
    },
    huf: {
      expenses: expensesHuf,
      profit: profitHuf,
      exemptProfit: exemptAppliedHuf,
      taxBase: taxableProfitHuf,
      contribBase: contribBaseHuf,
      szja: szjaHuf,
      tbj: tbjHuf,
      szocho: szochoHuf,
      hipa: hipaHuf,
      totalPaid: totalPaidHuf,
      net: netHuf
    }
  };
}
