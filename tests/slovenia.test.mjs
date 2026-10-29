import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SI_CONFIG_2026,
  getSocialBaseLimits,
  calculateTaxAndExpenses,
  computeMonthlyPolniContributions,
  calculateSlovenia,
  compareSloveniaRegimes
} from '../js/engines/slovenia.js';

test('SURS 2025 avg salary yields exact 2026 FURS min and max insurance bases', () => {
  const limits = getSocialBaseLimits(2536.03);
  assert.equal(limits.min, 1521.62);
  assert.equal(limits.max, 8876.11);
});

test('OPSV minimum full-time contribution matches official March 2026 FURS figure (651.04 €/mo)', () => {
  const minContrib = computeMonthlyPolniContributions(1521.62, 'steady');
  assert.equal(minContrib.breakdown.piz, 370.51);
  assert.equal(minContrib.breakdown.zz, 204.66);
  assert.equal(minContrib.breakdown.parental, 3.04);
  assert.equal(minContrib.breakdown.employment, 3.04);
  assert.equal(minContrib.breakdown.do, 30.43);
  assert.equal(minContrib.breakdown.ozp, 39.36);
  assert.equal(minContrib.monthlyTotal, 651.04);
});

test('Year 1 (-50% PIZ) and Year 2 (-30% PIZ) discounts apply strictly to PIZ pillar', () => {
  const y1 = computeMonthlyPolniContributions(1521.62, 'y1');
  const y2 = computeMonthlyPolniContributions(1521.62, 'y2');
  const reg = computeMonthlyPolniContributions(1521.62, 'steady');

  assert.equal(y1.pizDiscountPct, 50);
  assert.equal(y2.pizDiscountPct, 30);
  assert.ok(y1.monthlyTotal < y2.monthlyTotal);
  assert.ok(y2.monthlyTotal < reg.monthlyTotal);
  // ZZ, DO, and OZP remain identical across Y1/Y2/Reg
  assert.equal(y1.breakdown.zz, reg.breakdown.zz);
  assert.equal(y1.breakdown.do, reg.breakdown.do);
  assert.equal(y1.breakdown.ozp, 39.36);
});

test('ZPZR 2026 official FURS example: 130,000 € Polni S.P. -> 48,000 € expenses, 17,900 € tax', () => {
  const res = calculateTaxAndExpenses(130000, 'polni', 'zpzr');
  assert.equal(res.expenses, 48000);
  assert.equal(res.taxBase, 82000);
  // 72,000 * 20% = 14,400 + 10,000 * 35% = 3,500 -> 17,900 €
  assert.equal(res.tax, 17900);
  assert.equal(res.isBreach, true);
  assert.equal(res.excessRevenue, 10000);
});

test('ZPZR 2026 Popoldanski S.P. tiers and April 2026 113.01 €/mo flat contribution', () => {
  const at50k = calculateSlovenia({ revenue: 50000, mode: 'pop', regime: 'zpzr' });
  // 12,500 * 80% = 10,000; 17,500 * 40% = 7,000; 20,000 * 0% = 0 -> 17,000 € expenses, 33,000 € base
  assert.equal(at50k.taxData.expenses, 17000);
  assert.equal(at50k.taxData.taxBase, 33000);
  assert.equal(at50k.taxData.tax, 6600);
  assert.equal(at50k.taxData.isBreach, false);
  assert.equal(at50k.socData.monthlyTotal, 113.01);
  assert.equal(at50k.socData.annualTotal, 1356.12);

  const at60k = calculateTaxAndExpenses(60000, 'pop', 'zpzr');
  assert.equal(at60k.isBreach, true);
  // 6,600 + 10,000 * 35% = 10,100 €
  assert.equal(at60k.tax, 10100);
});

test('ZPIZ-2 Art. 145(2) prior-year contribution add-back restores true 5-year convergence', () => {
  // At 85,000 € under ZPZR: expenses = 48,000 €, tax profit = 37,000 €.
  // Without adding contributions back, base would be 37,000 * 0.75 / 12 = 2,312.50 € (static from Y3).
  // With ZPIZ-2 Art. 145(2) add-back, base rises recursively Y1 -> Y2 -> Y3 -> Y4 -> Steady!
  const res = calculateSlovenia({ revenue: 85000, mode: 'polni', regime: 'zpzr', status: 'steady' });
  const cols = res.projection.columns;

  assert.equal(cols.length, 5);
  assert.ok(cols[0].socAnnual < cols[1].socAnnual, 'Y2 soc > Y1 soc');
  assert.ok(cols[1].socAnnual < cols[2].socAnnual, 'Y3 soc > Y2 soc');
  assert.ok(cols[2].socAnnual < cols[3].socAnnual, 'Y4 soc > Y3 soc due to ZPIZ-2 recursive add-back');
  assert.ok(cols[3].socAnnual <= cols[4].socAnnual, 'Y5+ converges monotonically');
  assert.ok(res.socData.baseUsed > 2312.50, 'Steady-state base exceeds naive non-add-back formula');
  assert.equal(res.projection.activeColIndex, 4);
});

test('ZIURS proposal vs ZPZR comparison computes exact income tax AND social contribution savings', () => {
  // At 100,000 € Polni S.P. (Steady-state):
  // ZPZR: expenses = 48,000 €, base = 52,000 €, tax = 10,400 €
  // ZIURS: expenses = 80,000 € (80% up to 100k), base = 20,000 €, tax = 4,000 €
  const cmp = compareSloveniaRegimes({ revenue: 100000, mode: 'polni', status: 'steady' });

  assert.equal(cmp.zpzr.taxData.expenses, 48000);
  assert.equal(cmp.zpzr.taxData.tax, 10400);

  assert.equal(cmp.ziurs.taxData.expenses, 80000);
  assert.equal(cmp.ziurs.taxData.tax, 4000);
  assert.equal(cmp.delta.taxDiff, -6400);

  // Because ZIURS lowers tax profit from 52k to 20k, steady-state social contributions ALSO drop!
  assert.ok(cmp.delta.socDiff < -1000, 'ZIURS also reduces steady-state social contributions at 100k €');
  assert.ok(cmp.delta.netDiff > 6400, 'Total net gain exceeds 6,400 € thanks to lower social base');

  // Verify ZIURS at 150,000 € Polni cap: 100k*80% (80k) + 20k*70% (14k) + 30k*40% (12k) = 106,000 € expenses
  const ziurs150 = calculateSlovenia({ revenue: 150000, mode: 'polni', regime: 'ziurs' });
  assert.equal(ziurs150.taxData.expenses, 106000);
  assert.equal(ziurs150.taxData.taxBase, 44000);
  assert.equal(ziurs150.taxData.tax, 8800);
  assert.equal(ziurs150.taxData.isBreach, false);

  // Verify ZIURS Popoldanski at 70,000 € cap: 50k*80% (40k) + 20k*70% (14k) = 54,000 € expenses
  const ziursPop70 = calculateSlovenia({ revenue: 70000, mode: 'pop', regime: 'ziurs' });
  assert.equal(ziursPop70.taxData.expenses, 54000);
  assert.equal(ziursPop70.taxData.taxBase, 16000);
  assert.equal(ziursPop70.taxData.tax, 3200);
  assert.equal(ziursPop70.taxData.isBreach, false);

  // Verify ZIURS 35% breach tax kicks in immediately above 150,000 € (Polni) and 70,000 € (Popoldanski)
  const ziurs160 = calculateSlovenia({ revenue: 160000, mode: 'polni', regime: 'ziurs' });
  assert.equal(ziurs160.taxData.isBreach, true);
  assert.equal(ziurs160.taxData.taxBase, 54000);
  // 44,000 * 20% (8,800) + 10,000 * 35% (3,500) = 12,300 €
  assert.equal(ziurs160.taxData.tax, 12300);

  const ziursPop80 = calculateSlovenia({ revenue: 80000, mode: 'pop', regime: 'ziurs' });
  assert.equal(ziursPop80.taxData.isBreach, true);
  assert.equal(ziursPop80.taxData.taxBase, 26000);
  // 16,000 * 20% (3,200) + 10,000 * 35% (3,500) = 6,700 €
  assert.equal(ziursPop80.taxData.tax, 6700);
});
