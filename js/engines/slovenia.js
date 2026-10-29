/**
 * Official 2026 Slovenian Normiranec Tax & Social Security Engine
 *
 * Covers:
 * 1. Current Law in Force (2026): ZPZR + ZPZR-A (effective Jan 1 / Mar 7, 2026),
 *    ZPIZ-2 Art. 145(2), ZZVZZ (OZP 39.36 € from Mar 1, 2026), ZDOsk-1 (2% / 1% DO),
 *    and FURS April 2026 Popoldanski S.P. flat rates (113.01 €/mo).
 * 2. Contested Legislative Proposal: ZIURS (Zakon o interventnih ukrepih za razvoj
 *    Slovenije — adopted by DZ May 11, 2026, subject to Dec 6, 2026 referendum).
 */

import { round2 } from '../utils/format.js';

export const SI_CONFIG_2026 = {
  avgSalaryDefault: 2536.03, // SURS 2025 average gross monthly salary
  baseMinFactor: 0.60,       // 60% of avg salary = 1,521.62 €
  baseMaxFactor: 3.50,       // 350% of avg salary = 8,876.11 €
  ozpMonthly: 39.36,         // Obvezni zdravstveni prispevek (from March 1, 2026)

  // OPSV split rates (insured + employer) matching FURS per-line 2-decimal rounding
  opsvRates: {
    pizInsured: 0.1550,
    pizEmployer: 0.0885,     // Total PIZ = 24.35%
    zzHealthInsured: 0.0636,
    zzHealthEmployer: 0.0656,
    zzInjury: 0.0053,        // Total ZZ = 13.45%
    parentalInsured: 0.0010,
    parentalEmployer: 0.0010,// Total Parental = 0.20%
    empInsured: 0.0014,
    empEmployer: 0.0006,     // Total Employment = 0.20%
    longTermCare: 0.0200     // Total Long-term Care (ZDOsk-1) = 2.00%
  },

  // FURS official Popoldanski S.P. flat monthly amounts (from April 1, 2026)
  popoldanski: {
    piz: 52.05,
    zzInjury: 54.53,
    longTermCare: 6.43,
    totalMonthly: 113.01
  },

  regimes: {
    zpzr: {
      id: 'zpzr',
      year: 2026,
      polni: {
        limit: 120000,
        minMonthsInsured: 9,
        expenseTiers: [
          { upTo: 60000, rate: 0.80 },
          { upTo: Infinity, rate: 0.00 }
        ],
        taxTiers: [
          { baseUpTo: 72000, rate: 0.20 },
          { baseUpTo: Infinity, rate: 0.35 }
        ]
      },
      pop: {
        limit: 50000,
        minMonthsInsured: 0,
        expenseTiers: [
          { upTo: 12500, rate: 0.80 },
          { upTo: 30000, rate: 0.40 },
          { upTo: Infinity, rate: 0.00 }
        ],
        taxTiers: [
          { baseUpTo: 33000, rate: 0.20 },
          { baseUpTo: Infinity, rate: 0.35 }
        ]
      }
    },

    ziurs: {
      id: 'ziurs',
      referendumDate: '2026-12-06',
      polni: {
        limit: 150000,
        minMonthsInsured: 5,
        expenseTiers: [
          { upTo: 100000, rate: 0.80 },
          { upTo: 120000, rate: 0.70 },
          { upTo: 150000, rate: 0.40 },
          { upTo: Infinity, rate: 0.00 }
        ],
        taxTiers: [
          { baseUpTo: 44000, rate: 0.20 }, // At 150k cap: expenses = 106k, base = 44k (20%); excess >150k taxed at 35%
          { baseUpTo: Infinity, rate: 0.35 }
        ]
      },
      pop: {
        limit: 70000,
        minMonthsInsured: 0,
        expenseTiers: [
          { upTo: 50000, rate: 0.80 },
          { upTo: 70000, rate: 0.70 },
          { upTo: Infinity, rate: 0.00 }
        ],
        taxTiers: [
          { baseUpTo: 16000, rate: 0.20 }, // At 70k cap: expenses = 54k, base = 16k (20%); excess >70k taxed at 35%
          { baseUpTo: Infinity, rate: 0.35 }
        ]
      }
    }
  }
};

export function getSocialBaseLimits(avgSalary = SI_CONFIG_2026.avgSalaryDefault) {
  return {
    min: round2(SI_CONFIG_2026.baseMinFactor * avgSalary),
    max: round2(SI_CONFIG_2026.baseMaxFactor * avgSalary)
  };
}

/**
 * Calculates tiered normalized expenses, tax base, cedular income tax (dohodnina),
 * and limit breach status for a given regime ('zpzr' or 'ziurs') and mode ('polni' or 'pop').
 */
export function calculateTaxAndExpenses(revenue, mode = 'polni', regime = 'zpzr') {
  const rev = Math.max(0, Number(revenue) || 0);
  const regCfg = SI_CONFIG_2026.regimes[regime] || SI_CONFIG_2026.regimes.zpzr;
  const modeCfg = regCfg[mode] || regCfg.polni;

  let expenses = 0;
  let prevBound = 0;
  for (const tier of modeCfg.expenseTiers) {
    if (rev <= prevBound) break;
    const slice = Math.min(rev, tier.upTo) - prevBound;
    expenses += slice * tier.rate;
    prevBound = tier.upTo;
  }
  expenses = round2(expenses);

  const taxBase = round2(Math.max(0, rev - expenses));

  let tax = 0;
  let prevTaxBound = 0;
  for (const tier of modeCfg.taxTiers) {
    if (taxBase <= prevTaxBound) break;
    const slice = Math.min(taxBase, tier.baseUpTo) - prevTaxBound;
    tax += slice * tier.rate;
    prevTaxBound = tier.baseUpTo;
  }
  tax = round2(tax);

  const isBreach = rev > modeCfg.limit;
  const excessRevenue = isBreach ? round2(rev - modeCfg.limit) : 0;

  return {
    expenses,
    taxBase,
    tax,
    limit: modeCfg.limit,
    minMonthsInsured: modeCfg.minMonthsInsured,
    isBreach,
    excessRevenue,
    expenseSharePct: rev > 0 ? (expenses / rev) * 100 : 0,
    effectiveTaxPct: rev > 0 ? (tax / rev) * 100 : 0
  };
}

/**
 * Computes monthly & annual OPSV social contributions for a given monthly insurance base
 * and business year stage ('y1' = -50% PIZ, 'y2' = -30% PIZ, 'y3'/'steady'/'reg' = full PIZ).
 */
export function computeMonthlyPolniContributions(monthlyBase, yearStage = 'steady') {
  const r = SI_CONFIG_2026.opsvRates;
  const base = round2(monthlyBase);

  const pizFull = round2(base * r.pizInsured) + round2(base * r.pizEmployer);
  let pizDiscountFactor = 1.0;
  if (yearStage === 'y1') pizDiscountFactor = 0.50;
  else if (yearStage === 'y2') pizDiscountFactor = 0.70;

  // Apply ZPIZ-2 Art. 145(last para) exemption to PIZ
  const piz =
    pizDiscountFactor === 1.0
      ? round2(pizFull)
      : round2(base * r.pizInsured * pizDiscountFactor) +
        round2(base * r.pizEmployer * pizDiscountFactor);

  const zz =
    round2(base * r.zzHealthInsured) +
    round2(base * r.zzHealthEmployer) +
    round2(base * r.zzInjury);

  const parental =
    round2(base * r.parentalInsured) + round2(base * r.parentalEmployer);

  const employment =
    round2(base * r.empInsured) + round2(base * r.empEmployer);

  const longTermCare = round2(base * r.longTermCare);
  const ozp = SI_CONFIG_2026.ozpMonthly;

  const mainPillar = round2(piz + zz + parental + employment);
  const monthlyTotal = round2(mainPillar + longTermCare + ozp);

  return {
    baseUsed: base,
    monthlyTotal,
    annualTotal: round2(monthlyTotal * 12),
    pizDiscountPct: yearStage === 'y1' ? 50 : yearStage === 'y2' ? 30 : 0,
    breakdown: {
      piz: round2(piz),
      zz: round2(zz),
      parental: round2(parental),
      employment: round2(employment),
      main: mainPillar,
      do: longTermCare,
      ozp
    }
  };
}

/**
 * Derives monthly ZPIZ-2 Art. 145(2) insurance base from prior year's tax profit
 * PLUS prior year's assessed mandatory social security contributions, reduced by 25%.
 */
export function deriveInsuranceBaseFromPriorYear(profit, priorYearAnnualSoc, limits) {
  const rawMonthlyBase = round2(((Math.max(0, profit) + Math.max(0, priorYearAnnualSoc)) * 0.75) / 12);
  if (rawMonthlyBase <= limits.min) {
    return { base: limits.min, rawMonthlyBase, isMin: true, isMax: false };
  }
  if (rawMonthlyBase >= limits.max) {
    return { base: limits.max, rawMonthlyBase, isMin: false, isMax: true };
  }
  return { base: rawMonthlyBase, rawMonthlyBase, isMin: false, isMax: false };
}

/**
 * Solves the exact converged steady-state social contribution fixed point
 * for an established Polni S.P. (4th+ year) at constant annual profit.
 */
export function solveSteadyStatePolni(profit, limits) {
  let prevSoc = computeMonthlyPolniContributions(limits.min, 'steady').annualTotal;
  let lastResult = null;

  for (let iter = 0; iter < 30; iter++) {
    const derived = deriveInsuranceBaseFromPriorYear(profit, prevSoc, limits);
    const contrib = computeMonthlyPolniContributions(derived.base, 'steady');
    lastResult = { ...contrib, isMin: derived.isMin, isMax: derived.isMax, rawBase: derived.rawMonthlyBase };
    if (Math.abs(contrib.annualTotal - prevSoc) < 0.005) break;
    prevSoc = contrib.annualTotal;
  }
  return lastResult;
}

/**
 * Full Slovenian Normiranec calculation including the 5-Year Stabilization trajectory.
 */
export function calculateSlovenia({
  revenue = 65000,
  mode = 'polni',
  regime = 'zpzr',
  avgSalary = SI_CONFIG_2026.avgSalaryDefault,
  status = 'y1',       // 'y1' | 'y2' | 'y3' | 'steady'
  baseMethod = 'auto', // 'auto' | 'manual'
  manualBase = 0,
  children = 0,
  dependentSpouse = false
} = {}) {
  const rev = Math.max(0, Number(revenue) || 0);
  const salary = Number(avgSalary) > 0 ? Number(avgSalary) : SI_CONFIG_2026.avgSalaryDefault;
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);
  // ZDoh-2 Art. 59(2): Normiranec cedular final tax grants 0 € dependent tax relief.
  // ZZVZZ Art. 24a: Children are co-insured free (0 €), while an uninsured dependent spouse
  // co-insured via M-DČ still owes mandatory fixed health contribution (OZP = 39.36 €/mo).
  const spouseOzpMonthly = hasSpouse ? SI_CONFIG_2026.ozpMonthly : 0;
  const spouseOzpAnnual = round2(spouseOzpMonthly * 12);

  const taxData = calculateTaxAndExpenses(rev, mode, regime);
  const limits = getSocialBaseLimits(salary);

  if (mode === 'pop') {
    const pop = SI_CONFIG_2026.popoldanski;
    const main = round2(pop.piz + pop.zzInjury);
    const monthlyTotal = round2(pop.totalMonthly + spouseOzpMonthly);
    const annualTotal = round2(monthlyTotal * 12);
    const totalPaid = round2(taxData.tax + annualTotal);
    const netAnnual = round2(rev - totalPaid);

    return {
      country: 'si',
      regime,
      mode,
      status,
      children: kids,
      dependentSpouse: hasSpouse,
      familyTaxCreditAnnual: 0,
      spouseHealthAnnual: spouseOzpAnnual,
      revenue: rev,
      taxData,
      limits,
      autoBaseUsed: round2(0.25 * salary),
      socData: {
        baseUsed: round2(0.25 * salary),
        entrepreneurMonthlyTotal: pop.totalMonthly,
        entrepreneurAnnualTotal: round2(pop.totalMonthly * 12),
        monthlyTotal,
        annualTotal,
        pizDiscountPct: 0,
        isMin: false,
        isMax: false,
        breakdown: {
          piz: pop.piz,
          zz: pop.zzInjury,
          main,
          do: pop.longTermCare,
          ozp: 0,
          spouseOzp: spouseOzpMonthly
        }
      },
      totalPaidAnnual: totalPaid,
      netAnnual,
      netMonthly: round2(netAnnual / 12),
      effectiveRatePct: rev > 0 ? (totalPaid / rev) * 100 : 0,
      socialSharePct: rev > 0 ? (annualTotal / rev) * 100 : 0,
      projection: null
    };
  }

  // --- Polni S.P. Recursive 5-Year Trajectory (Y1 -> Y2 -> Y3 -> Y4 -> Steady/Y5+) ---
  const profit = taxData.taxBase;

  // Step 1: Automatic canonical trajectory from Year 1 through Year 5+
  const y1Auto = {
    ...computeMonthlyPolniContributions(limits.min, 'y1'),
    isMin: true,
    isMax: false,
    yearIndex: 1,
    stage: 'y1'
  };

  const y2Derived = deriveInsuranceBaseFromPriorYear(profit, y1Auto.annualTotal, limits);
  const y2Auto = {
    ...computeMonthlyPolniContributions(y2Derived.base, 'y2'),
    isMin: y2Derived.isMin,
    isMax: y2Derived.isMax,
    yearIndex: 2,
    stage: 'y2'
  };

  const y3Derived = deriveInsuranceBaseFromPriorYear(profit, y2Auto.annualTotal, limits);
  const y3Auto = {
    ...computeMonthlyPolniContributions(y3Derived.base, 'y3'),
    isMin: y3Derived.isMin,
    isMax: y3Derived.isMax,
    yearIndex: 3,
    stage: 'y3'
  };

  const y4Derived = deriveInsuranceBaseFromPriorYear(profit, y3Auto.annualTotal, limits);
  const y4Auto = {
    ...computeMonthlyPolniContributions(y4Derived.base, 'steady'),
    isMin: y4Derived.isMin,
    isMax: y4Derived.isMax,
    yearIndex: 4,
    stage: 'steady'
  };

  const steadyAuto = {
    ...solveSteadyStatePolni(profit, limits),
    yearIndex: 5,
    stage: 'steady'
  };

  const autoMap = {
    y1: y1Auto,
    y2: y2Auto,
    y3: y3Auto,
    steady: steadyAuto
  };
  const selectedAuto = autoMap[status] || steadyAuto;

  // Step 2: Handle Manual Base override if selected
  let activeSoc = selectedAuto;
  if (baseMethod === 'manual') {
    const rawMan = Number(manualBase) || 0;
    const clampedMan = rawMan <= 0 ? limits.min : Math.min(Math.max(rawMan, limits.min), limits.max);
    activeSoc = {
      ...computeMonthlyPolniContributions(clampedMan, status),
      isMin: clampedMan <= limits.min + 0.005,
      isMax: clampedMan >= limits.max - 0.005,
      stage: status
    };
  }

  // Step 3: Build 5-column projection array with active highlight index
  const activeColMap = { y1: 0, y2: 1, y3: 2, steady: 4 };
  const activeColIndex = activeColMap[status] ?? 4;

  const rawCols = [y1Auto, y2Auto, y3Auto, y4Auto, steadyAuto];
  if (baseMethod === 'manual') {
    // Reflect manual override in the user's active column & propagate subsequent automatic years
    rawCols[activeColIndex] = { ...activeSoc, yearIndex: activeColIndex + 1 };
    for (let idx = activeColIndex + 1; idx < 5; idx++) {
      const stg = idx === 1 ? 'y2' : idx === 2 ? 'y3' : 'steady';
      const d = deriveInsuranceBaseFromPriorYear(profit, rawCols[idx - 1].annualTotal, limits);
      rawCols[idx] = {
        ...computeMonthlyPolniContributions(d.base, stg),
        isMin: d.isMin,
        isMax: d.isMax,
        yearIndex: idx + 1,
        stage: stg
      };
    }
  }

  const columns = rawCols.map((col, idx) => {
    const colSocWithSpouse = round2(col.annualTotal + spouseOzpAnnual);
    const net = round2(rev - taxData.tax - colSocWithSpouse);
    const prevSocWithSpouse = idx > 0 ? round2(rawCols[idx - 1].annualTotal + spouseOzpAnnual) : colSocWithSpouse;
    const prevNet = idx > 0 ? round2(rev - taxData.tax - prevSocWithSpouse) : net;
    const diffEur = idx > 0 ? round2(net - prevNet) : 0;
    const diffPct = idx > 0 && prevNet > 0 ? (diffEur / prevNet) * 100 : 0;

    return {
      colIndex: idx,
      yearNumber: idx + 1,
      isPlus: idx === 4,
      isActive: idx === activeColIndex,
      netAnnual: net,
      socAnnual: colSocWithSpouse,
      entrepreneurSocAnnual: col.annualTotal,
      baseMonthly: col.baseUsed,
      isMin: col.isMin,
      isMax: col.isMax,
      pizDiscountPct: col.pizDiscountPct,
      diffEur,
      diffPct,
      isStable: idx > 0 && Math.abs(diffEur) < 12
    };
  });

  const socMonthlyWithSpouse = round2(activeSoc.monthlyTotal + spouseOzpMonthly);
  const socAnnualWithSpouse = round2(activeSoc.annualTotal + spouseOzpAnnual);
  const totalPaid = round2(taxData.tax + socAnnualWithSpouse);
  const netAnnual = round2(rev - totalPaid);

  return {
    country: 'si',
    regime,
    mode,
    status,
    children: kids,
    dependentSpouse: hasSpouse,
    familyTaxCreditAnnual: 0,
    spouseHealthAnnual: spouseOzpAnnual,
    revenue: rev,
    taxData,
    limits,
    autoBaseUsed: selectedAuto.baseUsed,
    socData: {
      ...activeSoc,
      entrepreneurMonthlyTotal: activeSoc.monthlyTotal,
      entrepreneurAnnualTotal: activeSoc.annualTotal,
      monthlyTotal: socMonthlyWithSpouse,
      annualTotal: socAnnualWithSpouse,
      breakdown: {
        ...activeSoc.breakdown,
        spouseOzp: spouseOzpMonthly
      }
    },
    totalPaidAnnual: totalPaid,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: rev > 0 ? (totalPaid / rev) * 100 : 0,
    socialSharePct: rev > 0 ? (socAnnualWithSpouse / rev) * 100 : 0,
    projection: {
      activeColIndex,
      columns
    }
  };
}

/**
 * Side-by-side comparison of Current Law (ZPZR 2026) vs. Proposed Contested Law (ZIURS)
 * including 0–160k € curve data for visual charting.
 */
export function compareSloveniaRegimes(params = {}) {
  const zpzr = calculateSlovenia({ ...params, regime: 'zpzr' });
  const ziurs = calculateSlovenia({ ...params, regime: 'ziurs' });

  const delta = {
    expensesDiff: round2(ziurs.taxData.expenses - zpzr.taxData.expenses),
    taxBaseDiff: round2(ziurs.taxData.taxBase - zpzr.taxData.taxBase),
    taxDiff: round2(ziurs.taxData.tax - zpzr.taxData.tax),
    socDiff: round2(ziurs.socData.annualTotal - zpzr.socData.annualTotal),
    totalPaidDiff: round2(ziurs.totalPaidAnnual - zpzr.totalPaidAnnual),
    netDiff: round2(ziurs.netAnnual - zpzr.netAnnual),
    effectiveRateDiff: ziurs.effectiveRatePct - zpzr.effectiveRatePct
  };

  const maxChartRev = params.mode === 'pop' ? 85000 : 160000;
  const step = 2500;
  const curvePoints = [];
  for (let r = 0; r <= maxChartRev; r += step) {
    const a = calculateSlovenia({ ...params, revenue: r, regime: 'zpzr' });
    const b = calculateSlovenia({ ...params, revenue: r, regime: 'ziurs' });
    curvePoints.push({
      revenue: r,
      zpzrNet: a.netAnnual,
      ziursNet: b.netAnnual,
      netGain: round2(b.netAnnual - a.netAnnual),
      zpzrEffPct: a.effectiveRatePct,
      ziursEffPct: b.effectiveRatePct
    });
  }

  return { zpzr, ziurs, delta, curvePoints, maxChartRev };
}
