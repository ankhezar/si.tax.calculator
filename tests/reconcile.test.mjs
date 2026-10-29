import test from 'node:test';
import assert from 'node:assert/strict';

import { round2 } from '../js/utils/format.js';
import {
  reconcileSlovenia,
  reconcileCroatia,
  reconcileItaly,
  reconcileAustria,
  reconcileHungary,
  reconcileByCountry
} from '../js/utils/reconcile.js';
import { calculateSlovenia } from '../js/engines/slovenia.js';
import { calculateCroatia } from '../js/engines/croatia.js';
import { calculateItaly } from '../js/engines/italy.js';
import { calculateAustria } from '../js/engines/austria.js';
import { calculateHungary } from '../js/engines/hungary.js';
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
