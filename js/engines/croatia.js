/**
 * Official 2026 Croatia Sole-Proprietor Engine — Paušalni obrt
 *
 * Sources: Porezna uprava RH & Naredba o iznosima osnovica za obračun doprinosa za 2026. (NN 150/2025),
 * Hrvatska obrtnička komora (HOK) 2026 decision.
 */

import { round2 } from '../utils/format.js';

export const HR_CONFIG_2026 = {
  limit: 60000, // Hard cap & simultaneous PDV (VAT 25%) mandatory entry threshold
  brackets: [
    { id: 1, min: 0,        max: 11300, taxBase: 1695, annualTax: 203.40, quarterlyTax: 50.85,  monthlyTax: 16.95 },
    { id: 2, min: 11300.01, max: 15300, taxBase: 2295, annualTax: 275.40, quarterlyTax: 68.85,  monthlyTax: 22.95 },
    { id: 3, min: 15300.01, max: 19900, taxBase: 2985, annualTax: 358.20, quarterlyTax: 89.55,  monthlyTax: 29.85 },
    { id: 4, min: 19900.01, max: 30600, taxBase: 4590, annualTax: 550.80, quarterlyTax: 137.70, monthlyTax: 45.90 },
    { id: 5, min: 30600.01, max: 40000, taxBase: 6000, annualTax: 720.00, quarterlyTax: 180.00, monthlyTax: 60.00 },
    { id: 6, min: 40000.01, max: 50000, taxBase: 7500, annualTax: 900.00, quarterlyTax: 225.00, monthlyTax: 75.00 },
    { id: 7, min: 50000.01, max: 60000, taxBase: 9000, annualTax: 1080.00, quarterlyTax: 270.00, monthlyTax: 90.00 }
  ],
  fullTimeContrib: {
    monthlyBase: 797.20, // 0.4 * avg gross salary
    mio1Monthly: 119.58, // 15%
    mio2Monthly: 39.86,  // 5%
    zoMonthly: 131.54,   // 16.5%
    totalMonthly: 290.98
  },
  sideJobRates: {
    mio1: 0.075,
    mio2: 0.025,
    zo: 0.075 // Total 17.5% assessed annually on bracket's flat taxBase
  },
  hok: {
    monthly: 11.40,
    quarterly: 34.20,
    annual: 136.80 // Exempt for first 2 years of first-time obrt registration
  }
};

export function calculateCroatia({
  revenue = 65000,
  employment = 'full', // 'full' | 'side'
  hokExempt = false,
  children = 0,
  dependentSpouse = false
} = {}) {
  const rev = Math.max(0, Number(revenue) || 0);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);
  const isBreach = rev > HR_CONFIG_2026.limit;
  const isEligible = !isBreach;

  // Match bracket up to 60k cap
  const cappedRev = Math.min(rev, HR_CONFIG_2026.limit);
  const bracket =
    HR_CONFIG_2026.brackets.find(b => cappedRev <= b.max) ||
    HR_CONFIG_2026.brackets[HR_CONFIG_2026.brackets.length - 1];

  const impliedExpenses = round2(Math.max(0, cappedRev - bracket.taxBase));
  const incomeTaxAnnual = bracket.annualTax;

  let mio1Annual = 0;
  let mio2Annual = 0;
  let zoAnnual = 0;
  let contribBaseAnnual = 0;

  if (employment === 'side') {
    contribBaseAnnual = bracket.taxBase;
    mio1Annual = round2(bracket.taxBase * HR_CONFIG_2026.sideJobRates.mio1);
    mio2Annual = round2(bracket.taxBase * HR_CONFIG_2026.sideJobRates.mio2);
    zoAnnual = round2(bracket.taxBase * HR_CONFIG_2026.sideJobRates.zo);
  } else {
    const fc = HR_CONFIG_2026.fullTimeContrib;
    contribBaseAnnual = round2(fc.monthlyBase * 12);
    mio1Annual = round2(fc.mio1Monthly * 12);
    mio2Annual = round2(fc.mio2Monthly * 12);
    zoAnnual = round2(fc.zoMonthly * 12);
  }

  const hokAnnual = hokExempt ? 0 : HR_CONFIG_2026.hok.annual;
  const socialAnnual = round2(mio1Annual + mio2Annual + zoAnnual + hokAnnual);
  const totalPaidAnnual = round2(incomeTaxAnnual + socialAnnual);
  const netAnnual = round2(rev - totalPaidAnnual);

  return {
    country: 'hr',
    regimeName: 'Paušalni obrt',
    children: kids,
    dependentSpouse: hasSpouse,
    familyTaxCreditAnnual: 0,
    spouseHealthAnnual: 0,
    revenue: rev,
    limit: HR_CONFIG_2026.limit,
    vatThreshold: HR_CONFIG_2026.limit,
    isEligible,
    isBreach,
    excessRevenue: isBreach ? round2(rev - HR_CONFIG_2026.limit) : 0,
    bracket,
    expensesAnnual: impliedExpenses,
    taxBaseAnnual: bracket.taxBase,
    taxAnnual: incomeTaxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: rev > 0 ? (totalPaidAnnual / rev) * 100 : 0,
    breakdown: {
      contribBaseAnnual,
      mioAnnual: round2(mio1Annual + mio2Annual),
      mio1Annual,
      mio2Annual,
      healthAnnual: zoAnnual,
      chamberAnnual: hokAnnual
    }
  };
}
