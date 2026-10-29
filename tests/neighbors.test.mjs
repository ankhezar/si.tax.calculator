import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateCroatia } from '../js/engines/croatia.js';
import { calculateItaly } from '../js/engines/italy.js';
import { calculateAustria, computeProgressiveEst2026 } from '../js/engines/austria.js';
import { calculateHungary } from '../js/engines/hungary.js';
import { calculatePoland } from '../js/engines/poland.js';
import { calculateCzechia } from '../js/engines/czechia.js';
import { calculateSlovakia } from '../js/engines/slovakia.js';
import { calculateSpain } from '../js/engines/spain.js';
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

test('2026 Family & Non-working Spouse rules across AT, HU, HR, IT and URL hash persistence', () => {
  // 1. Austria: 2 children + non-working spouse at 80,000 € -> 4,000.32 € FB+ + 828.00 € AVAB = 4,828.32 € credit, 0 € SVS spouse fee
  const atSingle = calculateAustria({ revenue: 80000, scheme: 'auto', activity: 'services' });
  const atFam2 = calculateAustria({
    revenue: 80000,
    scheme: 'auto',
    activity: 'services',
    children: 2,
    dependentSpouse: true
  });
  assert.equal(atFam2.spouseHealthAnnual, 0);
  assert.equal(atFam2.familyTaxCreditAnnual, 4828.32);
  assert.equal(Number((atFam2.netAnnual - atSingle.netAnnual).toFixed(2)), 4828.32);

  // Austria childless non-working spouse -> +3.4% SVS Zusatzbeitrag (deductible from ESt base), waived if 4-yr past child-rearing
  const atKuSingle = calculateAustria({ revenue: 50000, scheme: 'auto', activity: 'services' });
  const atKuSpouseNoKids = calculateAustria({
    revenue: 50000,
    scheme: 'auto',
    activity: 'services',
    children: 0,
    dependentSpouse: true
  });
  // SVS base = 40,000 € -> 3.4% = 1,360.00 € extra SVS
  assert.equal(atKuSpouseNoKids.spouseHealthAnnual, 1360.00);
  assert.equal(
    Number((atKuSpouseNoKids.socialAnnual - atKuSingle.socialAnnual).toFixed(2)),
    1360.00
  );
  // Tax is slightly lower because the 1,360 € mandatory SVS surcharge reduces taxable profit
  assert.ok(atKuSpouseNoKids.taxAnnual < atKuSingle.taxAnnual);

  const atKuSpouseWaived = calculateAustria({
    revenue: 50000,
    scheme: 'auto',
    activity: 'services',
    children: 0,
    dependentSpouse: true,
    spouseChildRearingWaiver: true
  });
  assert.equal(atKuSpouseWaived.spouseHealthAnnual, 0);
  assert.equal(atKuSpouseWaived.netAnnual, atKuSingle.netAnnual);

  // 2. Hungary Átalányadó: doubled 2026 family credit offsets 15% SZJA AND spills over into 18.5% TBJ!
  // At 35,000 € (14,000,000 HUF), 45% exp -> profit 7,700,000 HUF, exempt 1,936,800 -> taxable 5,763,200 HUF
  // Gross SZJA = 864,480 HUF. With 2 children: allowance = 6,399,840 HUF (> 5,763,200!) -> SZJA = 0, spillover = (6,399,840 - 5,763,200)*15% = 95,496 HUF off TBJ!
  const huSingle = calculateHungary({ revenue: 35000, regime: 'atalanyado', eurHuf: 400 });
  const huKids2 = calculateHungary({
    revenue: 35000,
    regime: 'atalanyado',
    eurHuf: 400,
    children: 2,
    dependentSpouse: false
  });
  assert.equal(huKids2.huf.szja, 0);
  assert.ok(huKids2.huf.familyCreditTbj > 90000, 'Unused SZJA child credit spills over into 18.5% TBJ');
  assert.equal(huKids2.huf.familyCreditSzja + huKids2.huf.familyCreditTbj, 959976); // Full 79,998 Ft/mo * 12

  // Hungary KATA: 0 Ft child credit, +147,600 HUF (369 €) non-working spouse mandatory TB fee
  const huKataFam = calculateHungary({
    revenue: 35000,
    regime: 'kata',
    clientType: 'b2c',
    eurHuf: 400,
    children: 2,
    dependentSpouse: true
  });
  assert.equal(huKataFam.familyTaxCreditAnnual, 0);
  assert.equal(huKataFam.huf.spouseHealth, 147600);
  assert.equal(huKataFam.spouseHealthAnnual, 369);

  // 3. Croatia & Italy: 0 € family tax relief and 0 € extra dependent healthcare cost
  const hrSingle = calculateCroatia({ revenue: 50000 });
  const hrFam = calculateCroatia({ revenue: 50000, children: 3, dependentSpouse: true });
  assert.equal(hrFam.netAnnual, hrSingle.netAnnual);

  const itSingle = calculateItaly({ revenue: 50000 });
  const itFam = calculateItaly({ revenue: 50000, children: 3, dependentSpouse: true });
  assert.equal(itFam.netAnnual, itSingle.netAnnual);

  // 4. URL hash round-trip for family state
  const st = createDefaultState();
  st.family.children = 3;
  st.family.dependentSpouse = true;
  st.at.spouseChildRearingWaiver = true;
  const hash = encodeScenarioHash(st);
  const restored = createDefaultState();
  applyScenarioHash(restored, hash);
  assert.equal(restored.family.children, 3);
  assert.equal(restored.family.dependentSpouse, true);
  assert.equal(restored.at.spouseChildRearingWaiver, true);
});

test('Poland 2026 JDG: Ryczałt 12%, ZUS stages, 240k PLN VAT limit, Skala spouse splitting & Ulga na dzieci', () => {
  // 75,000 € at 4.00 PLN/EUR = 300,000 PLN (> 240,000 PLN 2026 VAT threshold)
  const rycDuzy = calculatePoland({
    revenue: 75000,
    regime: 'ryczalt',
    ryczaltRate: '12',
    zusStage: 'duzy',
    employment: 'full',
    eurPln: 4.0
  });
  assert.equal(rycDuzy.isEligible, true);
  assert.equal(rycDuzy.exceedsVatExempt, true);
  assert.equal(rycDuzy.pln.zusSocial, 21459); // 1,788.29 * 12 rounded
  assert.equal(rycDuzy.healthTier, 2);        // 300,000 - 21,459 = 278,541 PLN (60k–300k tier -> 830.58/mo)
  assert.equal(rycDuzy.pln.health, 9967);

  // Ulga na start Year-1 (6m 0 PLN + 6m 420.86 PLN = 2,525 PLN) & Side-job (0 PLN ZUS social)
  const rycUlga = calculatePoland({ revenue: 50000, zusStage: 'ulga_y1', eurPln: 4.0 });
  assert.equal(rycUlga.exceedsVatExempt, false); // 200,000 PLN <= 240,000 PLN
  assert.equal(rycUlga.pln.zusSocial, 2525);

  const rycSide = calculatePoland({ revenue: 50000, employment: 'side', eurPln: 4.0 });
  assert.equal(rycSide.pln.zusSocial, 0);

  // Ryczałt forfeits joint spouse filing & child credits, 0 PLN ZCNA family health
  const rycFam = calculatePoland({
    revenue: 75000,
    regime: 'ryczalt',
    children: 2,
    dependentSpouse: true,
    eurPln: 4.0
  });
  assert.equal(rycFam.familyTaxCreditAnnual, 0);
  assert.equal(rycFam.spouseHealthAnnual, 0);
  assert.equal(rycFam.netAnnual, rycDuzy.netAnnual);

  // Skala podatkowa (12%/32%): joint spouse splitting doubles 30k free band & 120k threshold + Ulga na dzieci
  const skalaSingle = calculatePoland({ revenue: 60000, regime: 'skala', eurPln: 4.0 });
  const skalaFam = calculatePoland({
    revenue: 60000,
    regime: 'skala',
    children: 2,
    dependentSpouse: true,
    eurPln: 4.0
  });
  assert.ok(skalaFam.pln.spouseJointSaving > 20000, 'Joint spouse splitting saves >20k PLN at 240k PLN gross');
  assert.equal(skalaFam.pln.childCredit, 2224); // 2 * 1,112.04 PLN rounded
  assert.ok(skalaFam.netAnnual > skalaSingle.netAnnual + 5500);

  // 2,000,000 € Ryczałt ceiling
  assert.equal(calculatePoland({ revenue: 2100000 }).isEligible, false);
});

test('Czechia 2026 OSVČ: Paušální daň Bands 1–3, side-job rule, 60% Výdaje cap, OBZP & Auto-Optimal family switch', () => {
  // Band 1 (<=1.5M CZK for 60% IT): 9,162 CZK/mo = 109,944 CZK/yr
  const b1 = calculateCzechia({
    revenue: 50000,
    regime: 'pausalni_dan',
    expenseRate: '60',
    eurCzk: 25
  });
  assert.equal(b1.isEligible, true);
  assert.equal(b1.bandId, 1);
  assert.equal(b1.czk.totalPaid, 109944);

  // Band 2 (1.5M–2.0M CZK for 60% IT): 16,745 CZK/mo = 200,940 CZK/yr
  const b2 = calculateCzechia({
    revenue: 70000,
    regime: 'pausalni_dan',
    expenseRate: '60',
    eurCzk: 25
  });
  assert.equal(b2.bandId, 2);
  assert.equal(b2.czk.totalPaid, 200940);

  // Band 3 (1.5M–2.0M CZK for 40% activity): 27,139 CZK/mo = 325,668 CZK/yr
  const b3 = calculateCzechia({
    revenue: 70000,
    regime: 'pausalni_dan',
    expenseRate: '40',
    eurCzk: 25
  });
  assert.equal(b3.bandId, 3);
  assert.equal(b3.czk.totalPaid, 325668);

  // Side-job & >2M CZK disqualify Paušální daň
  assert.equal(
    calculateCzechia({ revenue: 40000, regime: 'pausalni_dan', employment: 'side', eurCzk: 25 }).isSideDisqualified,
    true
  );
  assert.equal(
    calculateCzechia({ revenue: 90000, regime: 'pausalni_dan', eurCzk: 25 }).isBreach,
    true
  );

  // 60% Paušální výdaje caps flat expenses at 1,200,000 CZK (60% of 2,000,000 CZK)
  const vydHigh = calculateCzechia({
    revenue: 100000,
    regime: 'vydajovy_pausal',
    expenseRate: '60',
    eurCzk: 25
  });
  assert.equal(vydHigh.czk.expenses, 1200000);

  // Non-working spouse OBZP (3,024 CZK/mo = 36,288 CZK/yr) vs. young-child waiver + 24,840 CZK spouse credit + child credits
  const czSpouseNoKid = calculateCzechia({
    revenue: 60000,
    regime: 'vydajovy_pausal',
    children: 0,
    dependentSpouse: true,
    eurCzk: 25
  });
  assert.equal(czSpouseNoKid.czk.spouseObzp, 36288);

  const czAutoFam = calculateCzechia({
    revenue: 70000,
    regime: 'auto',
    children: 2,
    dependentSpouse: true,
    spouseYoungChild: true,
    eurCzk: 25
  });
  assert.equal(czAutoFam.resolvedRegime, 'vydajovy_pausal'); // Family credits beat Band 2 Paušální daň!
  assert.equal(czAutoFam.czk.spouseObzp, 0);
  assert.equal(czAutoFam.czk.spouseCredit, 24840);
  assert.equal(czAutoFam.czk.childCredit, 37524); // 15,204 + 22,320
});

test('Slovakia 2026 SZČO: 60% max 20k € expenses, 2026 consolidation minimums, Year-1 holiday, 15% cap & family rules', () => {
  // At 30,000 € -> 60% = 18,000 € expenses; min social 303.11 €/mo (3,637.32 €) + min health 121.92 €/mo (1,463.04 €) = 5,100.36 €
  const sk30 = calculateSlovakia({ revenue: 30000, stage: 'established', employment: 'full' });
  assert.equal(sk30.expensesAnnual, 18000);
  assert.equal(sk30.breakdown.socPillarAnnual, 3637.32);
  assert.equal(sk30.breakdown.healthPillarAnnual, 1463.04);
  assert.equal(sk30.socialAnnual, 5100.36);

  // At 55,000 € -> flat expenses capped at 20,000 €; Year-1 startup pays 0 € social insurance
  const skNew = calculateSlovakia({ revenue: 55000, stage: 'new', employment: 'full' });
  assert.equal(skNew.expensesAnnual, 20000);
  assert.equal(skNew.breakdown.socPillarAnnual, 0);

  // Family: qualifying spouse NČZD (5,455.30 €) + Daňový bonus na dieťa vs. childless spouse health fee (1,463.04 €)
  const sk55Single = calculateSlovakia({ revenue: 55000 });
  const sk55Fam = calculateSlovakia({
    revenue: 55000,
    children: 2,
    dependentSpouse: true,
    spouseCareQualifies: true
  });
  assert.equal(sk55Fam.spouseHealthAnnual, 0);
  assert.equal(sk55Fam.nczdSpouseAnnual, 5455.3);
  assert.ok(sk55Fam.familyTaxCreditAnnual > 2000);
  assert.ok(sk55Fam.netAnnual > sk55Single.netAnnual + 2000);

  const skChildlessSpouse = calculateSlovakia({
    revenue: 55000,
    children: 0,
    dependentSpouse: true
  });
  assert.equal(skChildlessSpouse.spouseHealthAnnual, 1463.04);

  // Above 100,000 € breaches reduced 15% SZČO rate
  assert.equal(calculateSlovakia({ revenue: 110000 }).isEligible, false);
});

test('Spain 2026 Autónomo: Tarifa Plana 80 €/mo, Cuota Cero, 15-tramo RETA, 0 € B2C VAT threshold & IRPF conjunta', () => {
  const esNew = calculateSpain({ revenue: 65000, stage: 'new' });
  assert.equal(esNew.socialAnnual, 960);

  const esZero = calculateSpain({ revenue: 65000, stage: 'cuota_cero' });
  assert.equal(esZero.socialAnnual, 0);

  const esEst = calculateSpain({ revenue: 65000, stage: 'established', deductibleCostPct: '0' });
  assert.equal(esEst.tramoId, 'T11');
  assert.equal(esEst.dificilJustificacionAnnual, 2000);
  assert.equal(esEst.vatThreshold, 0);

  const esFam = calculateSpain({
    revenue: 65000,
    stage: 'established',
    children: 2,
    dependentSpouse: true
  });
  assert.equal(esFam.spouseHealthAnnual, 0);
  assert.equal(esFam.conjuntaReductionAnnual, 3400);
  assert.equal(esFam.minimoDescendientesAnnual, 5100);
  assert.ok(esFam.familyTaxCreditAnnual > 2000);
  assert.ok(esFam.netAnnual > esEst.netAnnual + 2000);

  assert.equal(calculateSpain({ revenue: 650000 }).isEligible, false);
});

test('9-Country Arena & URL hash round-trip for PL, CZ, SK, ES, and region filter', () => {
  const st = createDefaultState();
  st.revenueEur = 40000;
  st.compare.clientType = 'b2c';
  const arenaB2c = evaluateCrossBorderArena(st);
  // All 9 countries (11 regimes: 2 SI + 2 HU + 7 single) are evaluated
  assert.equal(arenaB2c.ranked.length, 11);
  // Spain has 0 € domestic B2C IVA exemption -> exceedsB2cVat even at 40,000 €, whereas CZ (<= ~79.4k €) & PL (<= ~56.1k €) & SK (<= 50k €) do not!
  assert.equal(arenaB2c.ranked.find(e => e.id === 'es').exceedsB2cVat, true);
  assert.equal(arenaB2c.ranked.find(e => e.id === 'cz').exceedsB2cVat, false);
  assert.equal(arenaB2c.ranked.find(e => e.id === 'pl').exceedsB2cVat, false);
  assert.equal(arenaB2c.ranked.find(e => e.id === 'sk').exceedsB2cVat, false);

  // URL hash round-trip for new countries & regionFilter
  st.activeTab = 'pl';
  st.pl.regime = 'skala';
  st.pl.ryczaltRate = '8.5';
  st.pl.employment = 'side';
  st.pl.zusStage = 'pref';
  st.pl.eurPln = 4.35;
  st.cz.regime = 'vydajovy_pausal';
  st.cz.expenseRate = '80';
  st.cz.employment = 'side';
  st.cz.stage = 'new';
  st.cz.spouseYoungChild = true;
  st.cz.eurCzk = 25.5;
  st.sk.employment = 'side';
  st.sk.stage = 'new';
  st.sk.spouseCareQualifies = false;
  st.es.employment = 'side';
  st.es.stage = 'cuota_cero';
  st.es.deductibleCostPct = '20';
  st.compare.regionFilter = 'expansion';

  const hash = encodeScenarioHash(st);
  const restored = createDefaultState();
  applyScenarioHash(restored, hash);

  assert.equal(restored.activeTab, 'pl');
  assert.equal(restored.pl.regime, 'skala');
  assert.equal(restored.pl.ryczaltRate, '8.5');
  assert.equal(restored.pl.employment, 'side');
  assert.equal(restored.pl.zusStage, 'pref');
  assert.equal(restored.pl.eurPln, 4.35);
  assert.equal(restored.cz.regime, 'vydajovy_pausal');
  assert.equal(restored.cz.expenseRate, '80');
  assert.equal(restored.cz.employment, 'side');
  assert.equal(restored.cz.stage, 'new');
  assert.equal(restored.cz.spouseYoungChild, true);
  assert.equal(restored.cz.eurCzk, 25.5);
  assert.equal(restored.sk.employment, 'side');
  assert.equal(restored.sk.stage, 'new');
  assert.equal(restored.sk.spouseCareQualifies, false);
  assert.equal(restored.es.employment, 'side');
  assert.equal(restored.es.stage, 'cuota_cero');
  assert.equal(restored.es.deductibleCostPct, '20');
  assert.equal(restored.compare.regionFilter, 'expansion');
});
