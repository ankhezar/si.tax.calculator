import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateCroatia } from '../js/engines/croatia.js';
import { calculateItaly } from '../js/engines/italy.js';
import { calculateAustria, computeProgressiveEst2026 } from '../js/engines/austria.js';
import { calculateHungary } from '../js/engines/hungary.js';
import { evaluateCrossBorderArena } from '../js/engines/arena.js';
import { createDefaultState, encodeScenarioHash, applyScenarioHash } from '../js/state.js';

test('Croatia 2026 Paušalni obrt: brackets, 290.98 €/mo contributions, HOK exemption, and 60k cap', () => {
  // At 55,000 € -> Bracket 7 (taxBase 9,000 €, tax 1,080 €)
  const full = calculateCroatia({ revenue: 55000, employment: 'full', hokExempt: false });
  assert.equal(full.isEligible, true);
  assert.equal(full.bracket.id, 7);
  assert.equal(full.taxAnnual, 1080);
  // 290.98 * 12 = 3491.76 + HOK 136.80 = 3628.56 €
  assert.equal(full.socialAnnual, 3628.56);
  assert.equal(full.totalPaidAnnual, 4708.56);
  assert.equal(full.netAnnual, 50291.44);

  // HOK exempt in years 1-2 saves 136.80 €
  const hokFree = calculateCroatia({ revenue: 55000, employment: 'full', hokExempt: true });
  assert.equal(hokFree.socialAnnual, 3491.76);

  // Side-job (obrt uz rad) at 55,000 € -> 17.5% on 9,000 € bracket base = 1,575 € + 136.80 HOK
  const side = calculateCroatia({ revenue: 55000, employment: 'side', hokExempt: false });
  assert.equal(side.socialAnnual, 1711.80);

  // Breach above 60,000 €
  const breach = calculateCroatia({ revenue: 65000, employment: 'full' });
  assert.equal(breach.isEligible, false);
  assert.equal(breach.isBreach, true);
});

test('Italy 2026 Regime Forfettario: ATECO coeff, INPS deductibility, 5% vs 15%, and 85k/100k thresholds', () => {
  // Official example: 30,000 € Professional (78%) in Gestione Separata (26.07%), 15% tax
  const prof = calculateItaly({
    revenue: 30000,
    activity: 'prof_78',
    inpsScheme: 'separata',
    taxRateType: 'standard'
  });
  assert.equal(prof.grossProfitAnnual, 23400);
  // INPS = 23,400 * 26.07% = 6,100.38 €
  assert.equal(prof.socialAnnual, 6100.38);
  // Deductible INPS -> taxBase = 23,400 - 6,100.38 = 17,299.62 €
  assert.equal(prof.taxBaseAnnual, 17299.62);
  // 15% imposta sostitutiva = 2,594.94 €
  assert.equal(prof.taxAnnual, 2594.94);

  // Startup 5% cuts substitute tax to 1/3
  const startup = calculateItaly({
    revenue: 30000,
    activity: 'prof_78',
    inpsScheme: 'separata',
    taxRateType: 'startup'
  });
  assert.equal(startup.taxAnnual, 864.98);

  // Artigiani with -35% Forfettario INPS discount below 18,808 € minimale
  const art = calculateItaly({
    revenue: 20000,
    activity: 'artisan_67', // gross = 13,400 (< 18,808 minimale)
    inpsScheme: 'artigiani',
    forfettarioDiscount35: true,
    taxRateType: 'standard'
  });
  // Fixed 4,521.36 * 0.65 = 2,938.88 €
  assert.equal(art.socialAnnual, 2938.88);

  // Threshold checks
  assert.equal(calculateItaly({ revenue: 90000 }).isEligible, false);
  assert.equal(calculateItaly({ revenue: 90000 }).isImmediateExit, false);
  assert.equal(calculateItaly({ revenue: 105000 }).isImmediateExit, true);
});

test('Austria 2026 Einzelunternehmen: Pauschalierung auto-switch, SVS deductibility, Grundfreibetrag, 2026 ESt', () => {
  // Zero tax up to 13,539 €
  assert.equal(computeProgressiveEst2026(13539), 0);
  // 20,000 € -> (20,000 - 13,539) * 20% = 1,292.20 €
  assert.equal(computeProgressiveEst2026(20000), 1292.20);

  // At 50,000 € auto -> Kleinunternehmerpauschalierung (20% services = 10,000 € flat expenses)
  const ku = calculateAustria({ revenue: 50000, scheme: 'auto', activity: 'services' });
  assert.equal(ku.resolvedScheme, 'klein');
  assert.equal(ku.expensesAnnual, 10000);
  // Pre-SVS profit = 40,000 € -> SVS = 40,000 * 26.83% (10,732) + 144.84 = 10,876.84 €
  assert.equal(ku.socialAnnual, 10876.84);
  // Profit after SVS = 29,123.16 € -> 15% Grundfreibetrag = 4,368.47 €
  assert.equal(ku.grundfreibetragAnnual, 4368.47);
  assert.equal(ku.isEligible, true);

  // At 80,000 € auto -> switches to Basispauschalierung (6% services = 4,800 €)
  const basis = calculateAustria({ revenue: 80000, scheme: 'auto', activity: 'services' });
  assert.equal(basis.resolvedScheme, 'basis');
  assert.equal(basis.expensesAnnual, 4800);
  assert.equal(basis.grundfreibetragAnnual, 4950); // Capped at 15% of 33,000 €
});

test('Hungary 2026 Átalányadó (45% ratio, 100% SZOCHO floor, exempt band) & KATA B2B disqualification', () => {
  // Low revenue side-job: 8,000 € * 400 = 3,200,000 HUF -> 45% exp -> profit 1,760,000 HUF (< 1,936,800 exempt!)
  const sideLow = calculateHungary({
    revenue: 8000,
    regime: 'atalanyado',
    employment: 'side',
    expenseTier: '45',
    hipaMode: 'none',
    eurHuf: 400
  });
  assert.equal(sideLow.huf.taxBase, 0);
  assert.equal(sideLow.huf.szja, 0);
  assert.equal(sideLow.huf.tbj, 0);
  assert.equal(sideLow.huf.szocho, 0);

  // Full-time low revenue pays 100% floor on Garantált bérminimum (4,478,400 HUF/yr)
  const fullLow = calculateHungary({
    revenue: 8000,
    regime: 'atalanyado',
    employment: 'full',
    wageFloor: 'guaranteed',
    hipaMode: 'none',
    eurHuf: 400
  });
  assert.equal(fullLow.huf.tbj, Math.round(4478400 * 0.185));
  assert.equal(fullLow.huf.szocho, Math.round(4478400 * 0.13));

  // KATA with B2B client is flagged ineligible
  const kataB2b = calculateHungary({
    revenue: 30000,
    regime: 'kata',
    employment: 'full',
    clientType: 'b2b',
    eurHuf: 400
  });
  assert.equal(kataB2b.isEligible, false);
  assert.equal(kataB2b.isB2bDisqualified, true);
});

test('Cross-Border Arena ranks eligible regimes above over-cap regimes and URL hash round-trips state', () => {
  const st = createDefaultState();
  st.revenueEur = 75000; // Above Croatia 60k cap, within SI 120k, IT 85k, AT 420k, HU ~96.8k
  const arena = evaluateCrossBorderArena(st);

  const hrEntry = arena.ranked.find(e => e.id === 'hr');
  assert.equal(hrEntry.isEligible, false);
  assert.equal(hrEntry.rank, null);
  assert.equal(arena.ranked[0].isEligible, true);
  assert.equal(arena.ranked[0].rank, 1);

  // URL hash round-trip
  st.activeTab = 'compare';
  st.compare.stage = 'new';
  const hash = encodeScenarioHash(st);
  const restored = createDefaultState();
  applyScenarioHash(restored, hash);
  assert.equal(restored.activeTab, 'compare');
  assert.equal(restored.revenueEur, 75000);
  assert.equal(restored.compare.stage, 'new');
});

test('Cross-Border Arena B2B vs. B2C switch updates Hungary KATA eligibility and B2C consumer VAT thresholds at all revenues', () => {
  // 1. At 40,000 € (within 45k € KATA flat band): B2B disqualifies KATA; B2C unlocks KATA to Rank #1
  const sLow = createDefaultState();
  sLow.revenueEur = 40000;
  sLow.compare.employment = 'full';
  sLow.compare.clientType = 'b2b';
  const b2bLow = evaluateCrossBorderArena(sLow);
  const kataB2b = b2bLow.ranked.find(e => e.id === 'hu_kata');
  assert.equal(kataB2b.isEligible, false);
  assert.equal(kataB2b.disqualifiedReason, 'b2b_banned');

  sLow.compare.clientType = 'b2c';
  const b2cLow = evaluateCrossBorderArena(sLow);
  const kataB2c = b2cLow.ranked.find(e => e.id === 'hu_kata');
  assert.equal(kataB2c.isEligible, true);
  assert.equal(kataB2c.rank, 1);

  // 2. Side-job + B2C at 35,000 € marks KATA as fulltime_only
  sLow.compare.employment = 'side';
  const sideB2c = evaluateCrossBorderArena(sLow);
  assert.equal(sideB2c.ranked.find(e => e.id === 'hu_kata').disqualifiedReason, 'fulltime_only');

  // 3. At 65,000 € (default revenue): B2C flips KATA from b2b_banned to over_cap and flags B2C VAT >50k-60k while IT stays VAT-exempt (<=85k)
  const sDef = createDefaultState(); // revenueEur = 65000
  sDef.compare.clientType = 'b2c';
  const b2cDef = evaluateCrossBorderArena(sDef);
  assert.equal(b2cDef.ranked.find(e => e.id === 'hu_kata').disqualifiedReason, 'over_cap');
  assert.equal(b2cDef.ranked.find(e => e.id === 'it').exceedsB2cVat, false);
  assert.equal(b2cDef.ranked.find(e => e.id === 'si_zpzr').exceedsB2cVat, true);
  assert.equal(b2cDef.ranked.find(e => e.id === 'at').exceedsB2cVat, true);
  assert.equal(b2cDef.ranked.find(e => e.id === 'hu_ata').exceedsB2cVat, true);
});
