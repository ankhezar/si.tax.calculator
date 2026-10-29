import test from 'node:test';
import assert from 'node:assert/strict';

import { round2 } from '../js/utils/format.js';
import {
  reconcileSlovenia,
  reconcileCroatia,
  reconcileItaly,
  reconcileAustria,
  reconcileHungary,
  reconcilePoland,
  reconcileCzechia,
  reconcileSlovakia,
  reconcileSpain,
  reconcileByCountry
} from '../js/utils/reconcile.js';
import { calculateSlovenia } from '../js/engines/slovenia.js';
import { calculateCroatia } from '../js/engines/croatia.js';
import { calculateItaly } from '../js/engines/italy.js';
import { calculateAustria } from '../js/engines/austria.js';
import { calculateHungary } from '../js/engines/hungary.js';
import { calculatePoland } from '../js/engines/poland.js';
import { calculateCzechia } from '../js/engines/czechia.js';
import { calculateSlovakia } from '../js/engines/slovakia.js';
import { calculateSpain } from '../js/engines/spain.js';
import { evaluateCrossBorderArena } from '../js/engines/arena.js';
import { createDefaultState } from '../js/state.js';

const TEST_REVENUES = [0, 11111.11, 25000, 33333.33, 50000, 55000, 65000, 77777.77, 85000, 100000, 135000, 160000];

test('Slovenia Yearly & Monthly views satisfy 0.00 € cent-exact accounting identities across all revenues & modes', () => {
  for (const rev of TEST_REVENUES) {
    for (const mode of ['polni', 'pop']) {
      for (const regime of ['zpzr', 'ziurs']) {
        for (const status of ['y1', 'y2', 'y3', 'steady']) {
          const raw = calculateSlovenia({ revenue: rev, mode, regime, status });
          for (const view of ['yearly', 'monthly']) {
            const d = reconcileSlovenia(raw, view);
            assert.equal(round2(d.gross - d.expenses), d.taxBase, `SI taxBase mismatch at ${rev} ${view}`);
            assert.equal(round2(d.socMain + d.socDo + d.socOzp), d.social, `SI social breakdown mismatch at ${rev} ${view}`);
            assert.equal(round2(d.tax + d.social), d.totalPaid, `SI totalPaid mismatch at ${rev} ${view}`);
            assert.equal(round2(d.gross - d.totalPaid), d.net, `SI net mismatch at ${rev} ${view}`);
          }
        }
      }
    }
  }
});

test('Croatia, Italy, Austria & Hungary Yearly & Monthly views satisfy 0.00 € cent-exact accounting identities', () => {
  for (const rev of TEST_REVENUES) {
    for (const view of ['yearly', 'monthly']) {
      // Croatia
      for (const employment of ['full', 'side']) {
        const hrRaw = calculateCroatia({ revenue: rev, employment, hokExempt: false });
        const hr = reconcileCroatia(hrRaw, view);
        if (!hrRaw.isBreach && rev >= hrRaw.taxBaseAnnual) {
          assert.equal(round2(hr.gross - hr.expenses), hr.taxBase, `HR taxBase mismatch at ${rev} ${view}`);
        }
        assert.equal(round2(hr.mio + hr.health + hr.hok), hr.social, `HR social breakdown mismatch at ${rev} ${view}`);
        assert.equal(round2(hr.tax + hr.social), hr.totalPaid, `HR totalPaid mismatch at ${rev} ${view}`);
        assert.equal(round2(hr.gross - hr.totalPaid), hr.net, `HR net mismatch at ${rev} ${view}`);
      }

      // Italy
      for (const inpsScheme of ['separata', 'artigiani']) {
        const itRaw = calculateItaly({ revenue: rev, inpsScheme });
        const it = reconcileItaly(itRaw, view);
        assert.equal(round2(it.gross - it.expenses), it.grossProfit, `IT grossProfit mismatch at ${rev} ${view}`);
        assert.equal(round2(it.inpsFixed + it.inpsVariable), it.social, `IT INPS breakdown mismatch at ${rev} ${view}`);
        if (it.grossProfit >= it.social) {
          assert.equal(round2(it.grossProfit - it.social), it.taxBase, `IT taxBase mismatch at ${rev} ${view}`);
        }
        assert.equal(round2(it.tax + it.social), it.totalPaid, `IT totalPaid mismatch at ${rev} ${view}`);
        assert.equal(round2(it.gross - it.totalPaid), it.net, `IT net mismatch at ${rev} ${view}`);
      }

      // Austria
      const atRaw = calculateAustria({ revenue: rev, scheme: 'auto', activity: 'services', employment: 'full' });
      const at = reconcileAustria(atRaw, view);
      assert.equal(round2(at.pv + at.kv + at.sv), at.social, `AT SVS breakdown mismatch at ${rev} ${view}`);
      if (at.gross >= round2(at.expenses + at.social + at.gfb)) {
        assert.equal(round2(at.gross - at.expenses - at.social - at.gfb), at.taxBase, `AT taxBase mismatch at ${rev} ${view}`);
      }
      assert.equal(round2(at.tax + at.social), at.totalPaid, `AT totalPaid mismatch at ${rev} ${view}`);
      assert.equal(round2(at.gross - at.totalPaid), at.net, `AT net mismatch at ${rev} ${view}`);

      // Hungary (Átalányadó & KATA)
      for (const regime of ['atalanyado', 'kata']) {
        const huRaw = calculateHungary({ revenue: rev, regime, eurHuf: 403 });
        const hu = reconcileHungary(huRaw, view);
        if (regime === 'atalanyado' && hu.gross >= round2(hu.expenses + hu.exempt)) {
          assert.equal(round2(hu.gross - hu.expenses - hu.exempt), hu.taxBase, `HU taxBase mismatch at ${rev} ${view}`);
        }
        assert.equal(round2(hu.szja + hu.hipa), hu.tax, `HU tax breakdown mismatch at ${rev} ${view}`);
        assert.equal(round2(hu.tbj + hu.szocho), hu.social, `HU social breakdown mismatch at ${rev} ${view}`);
        assert.equal(round2(hu.tax + hu.social), hu.totalPaid, `HU totalPaid mismatch at ${rev} ${view}`);
        assert.equal(round2(hu.gross - hu.totalPaid), hu.net, `HU net mismatch at ${rev} ${view}`);
      }
    }
  }
});

test('Compare All Arena matches single-country calculators to the exact cent in Yearly and Monthly views', () => {
  for (const rev of [50000, 55000, 65000, 77777.77, 100000]) {
    for (const view of ['yearly', 'monthly']) {
      const s = createDefaultState();
      s.revenueEur = rev;
      s.view = view;
      s.compare.personaMode = 'custom';
      const arena = evaluateCrossBorderArena(s);

      for (const entry of arena.ranked) {
        const d = reconcileByCountry(entry.countryCode, entry.raw, view);
        assert.equal(round2(d.tax + d.social), d.totalPaid);
        assert.equal(round2(d.gross - d.totalPaid), d.net);
      }
    }
  }
});

test('Family & Spouse configurations satisfy 0.00 € cent-exact Yearly & Monthly identities across SI, AT, and HU', () => {
  const familyConfigs = [
    { children: 0, dependentSpouse: true },
    { children: 1, dependentSpouse: false },
    { children: 2, dependentSpouse: true },
    { children: 3, dependentSpouse: true }
  ];

  for (const fam of familyConfigs) {
    for (const rev of [0, 25000, 50000, 65000, 77777.77, 100000]) {
      for (const view of ['yearly', 'monthly']) {
        // Slovenia
        for (const mode of ['polni', 'pop']) {
          const siRaw = calculateSlovenia({ revenue: rev, mode, ...fam });
          const si = reconcileSlovenia(siRaw, view);
          assert.equal(round2(si.socMain + si.socDo + si.socOzp + si.socSpouseOzp), si.social);
          assert.equal(round2(si.tax + si.social), si.totalPaid);
          assert.equal(round2(si.gross - si.totalPaid), si.net);
        }

        // Austria
        const atRaw = calculateAustria({ revenue: rev, ...fam });
        const at = reconcileAustria(atRaw, view);
        assert.equal(round2(at.pv + at.kv + at.sv + at.spouseSvs), at.social);
        assert.equal(round2(at.grossTax - at.familyCredit), at.tax);
        assert.equal(round2(at.avabCredit + at.fbCredit), at.familyCredit);
        assert.equal(round2(at.tax + at.social), at.totalPaid);
        assert.equal(round2(at.gross - at.totalPaid), at.net);

        // Hungary
        for (const regime of ['atalanyado', 'kata']) {
          const huRaw = calculateHungary({ revenue: rev, regime, eurHuf: 403, ...fam });
          const hu = reconcileHungary(huRaw, view);
          assert.equal(round2(hu.grossSzja - hu.familyCreditSzja), hu.szja);
          assert.equal(round2(hu.grossTbj - hu.familyCreditTbj), hu.tbj);
          assert.equal(round2(hu.tbj + hu.szocho + hu.spouseHealth), hu.social);
          assert.equal(round2(hu.tax + hu.social), hu.totalPaid);
          assert.equal(round2(hu.gross - hu.totalPaid), hu.net);
        }

        // Poland (EUR + integer PLN across Ryczałt, Skala, Liniowy)
        for (const regime of ['ryczalt', 'skala', 'liniowy']) {
          const plRaw = calculatePoland({ revenue: rev, regime, eurPln: 4.29, ...fam });
          const pl = reconcilePoland(plRaw, view);
          if (pl.gross >= pl.expenses) {
            assert.equal(round2(pl.gross - pl.expenses), pl.taxBase);
          }
          assert.equal(round2(pl.grossTax - pl.familyCredit), pl.tax);
          assert.equal(round2(pl.spouseCredit + pl.childCredit), pl.familyCredit);
          assert.equal(round2(pl.zusSocial + pl.health), pl.social);
          assert.equal(round2(pl.tax + pl.social), pl.totalPaid);
          assert.equal(round2(pl.gross - pl.totalPaid), pl.net);

          assert.equal(pl.pln.grossTax - pl.pln.familyCredit, pl.pln.tax);
          assert.equal(pl.pln.spouseCredit + pl.pln.childCredit, pl.pln.familyCredit);
          assert.equal(pl.pln.zusSocial + pl.pln.health, pl.pln.social);
          assert.equal(pl.pln.tax + pl.pln.social, pl.pln.totalPaid);
          assert.equal(pl.pln.gross - pl.pln.totalPaid, pl.pln.net);
        }

        // Czechia (EUR + integer CZK across Auto, Paušální daň, and 60% Výdaje)
        for (const regime of ['auto', 'pausalni_dan', 'vydajovy_pausal']) {
          for (const spouseYoungChild of [false, true]) {
            const czRaw = calculateCzechia({
              revenue: rev,
              regime,
              spouseYoungChild,
              eurCzk: 25.17,
              ...fam
            });
            const cz = reconcileCzechia(czRaw, view);
            if (czRaw.resolvedRegime !== 'pausalni_dan' && cz.gross >= cz.expenses) {
              assert.equal(round2(cz.gross - cz.expenses), cz.taxBase);
            }
            assert.equal(round2(cz.grossTax - cz.familyCredit), cz.tax);
            assert.equal(round2(cz.spouseCredit + cz.childCredit), cz.familyCredit);
            assert.equal(round2(cz.socPillar + cz.healthPillar + cz.spouseObzp), cz.social);
            assert.equal(round2(cz.tax + cz.social), cz.totalPaid);
            assert.equal(round2(cz.gross - cz.totalPaid), cz.net);

            assert.equal(cz.czk.grossTax - cz.czk.familyCredit, cz.czk.tax);
            assert.equal(cz.czk.spouseCredit + cz.czk.childCredit, cz.czk.familyCredit);
            assert.equal(cz.czk.socPillar + cz.czk.healthPillar + cz.czk.spouseObzp, cz.czk.social);
            assert.equal(cz.czk.tax + cz.czk.social, cz.czk.totalPaid);
            assert.equal(cz.czk.gross - cz.czk.totalPaid, cz.czk.net);
          }
        }

        // Slovakia (Established & Year-1 New)
        for (const stage of ['established', 'new']) {
          const skRaw = calculateSlovakia({ revenue: rev, stage, ...fam });
          const sk = reconcileSlovakia(skRaw, view);
          assert.equal(round2(sk.socPillar + sk.healthPillar + sk.spouseHealth), sk.social);
          if (sk.gross >= round2(sk.expenses + sk.socPillar + sk.healthPillar)) {
            assert.equal(round2(sk.gross - sk.expenses - sk.socPillar - sk.healthPillar), sk.czd);
          }
          if (sk.czd >= round2(sk.nczdTaxpayer + sk.nczdSpouse)) {
            assert.equal(round2(sk.czd - sk.nczdTaxpayer - sk.nczdSpouse), sk.taxBase);
          }
          assert.equal(round2(sk.grossTax - sk.familyCredit), sk.tax);
          assert.equal(round2(sk.spouseCredit + sk.childCredit), sk.familyCredit);
          assert.equal(round2(sk.tax + sk.social), sk.totalPaid);
          assert.equal(round2(sk.gross - sk.totalPaid), sk.net);
        }

        // Spain (Established, Tarifa Plana, Cuota Cero, with 0% and 20% operating costs)
        for (const stage of ['established', 'new', 'cuota_cero']) {
          for (const deductibleCostPct of ['0', '20']) {
            const esRaw = calculateSpain({ revenue: rev, stage, deductibleCostPct, ...fam });
            const es = reconcileSpain(esRaw, view);
            assert.equal(round2(es.operatingCosts + es.dificil), es.expenses);
            if (es.gross >= round2(es.expenses + es.social + es.conjunta)) {
              assert.equal(round2(es.gross - es.expenses - es.social - es.conjunta), es.taxBase);
            }
            assert.equal(round2(es.grossTax - es.familyCredit), es.tax);
            assert.equal(round2(es.spouseCredit + es.childCredit), es.familyCredit);
            assert.equal(round2(es.tax + es.social), es.totalPaid);
            assert.equal(round2(es.gross - es.totalPaid), es.net);
          }
        }
      }
    }
  }
});
