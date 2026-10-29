/**
 * Cent-exact period (Yearly / Monthly) reconciliation for all 5 country engines.
 *
 * Guarantees that every visible arithmetic identity on screen holds with 0.00 €
 * rounding drift in BOTH Yearly and Monthly modes, and that Compare All matches
 * each single-country calculator tab to the exact cent.
 */

import { round2 } from './format.js';

export function reconcileSlovenia(res, view = 'yearly') {
  const isMonthly = view === 'monthly';
  const div = isMonthly ? 12 : 1;
  const mult = isMonthly ? 1 : 12;

  const gross = round2(res.revenue / div);
  const expenses = round2(res.taxData.expenses / div);
  const taxBase = round2(Math.max(0, gross - expenses));
  const tax = round2(res.taxData.tax / div);

  const insBase = round2(res.socData.baseUsed * mult);
  const socMain = round2(res.socData.breakdown.main * mult);
  const socDo = round2(res.socData.breakdown.do * mult);
  const socOzp = round2(res.socData.breakdown.ozp * mult);
  const social = round2(socMain + socDo + socOzp);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    expenses,
    taxBase,
    tax,
    insBase,
    socMain,
    socDo,
    socOzp,
    social,
    totalPaid,
    net
  };
}

export function reconcileCroatia(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const limitPeriod = round2(res.limit / div);
  const taxBase = round2(res.taxBaseAnnual / div);
  const expenses = round2(Math.max(0, Math.min(gross, limitPeriod) - taxBase));
  const tax = round2(res.taxAnnual / div);

  const mio = round2(res.breakdown.mioAnnual / div);
  const health = round2(res.breakdown.healthAnnual / div);
  const hok = round2(res.breakdown.chamberAnnual / div);
  const social = round2(mio + health + hok);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    expenses,
    taxBase,
    tax,
    mio,
    health,
    hok,
    social,
    totalPaid,
    net
  };
}

export function reconcileItaly(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const grossProfit = round2(res.grossProfitAnnual / div);
  const expenses = round2(Math.max(0, gross - grossProfit));

  const inpsFixed = round2(res.breakdown.inpsFixed / div);
  const inpsVariable = round2(res.breakdown.inpsVariable / div);
  const social = round2(inpsFixed + inpsVariable);

  const taxBase = round2(Math.max(0, grossProfit - social));
  const tax = round2(res.taxAnnual / div);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    expenses,
    grossProfit,
    inpsFixed,
    inpsVariable,
    social,
    taxBase,
    tax,
    totalPaid,
    net
  };
}

export function reconcileAustria(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const expenses = round2(res.expensesAnnual / div);

  const pv = round2(res.breakdown.pvAnnual / div);
  const kv = round2(res.breakdown.kvAnnual / div);
  const sv = round2((res.breakdown.bmsvgAnnual + res.breakdown.uvAnnual) / div);
  const social = round2(pv + kv + sv);

  const gfb = round2(res.grundfreibetragAnnual / div);
  const taxBase = round2(Math.max(0, gross - expenses - social - gfb));
  const tax = round2(res.taxAnnual / div);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    expenses,
    pv,
    kv,
    sv,
    social,
    gfb,
    taxBase,
    tax,
    totalPaid,
    net
  };
}

export function reconcileHungary(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const expenses = round2(res.expensesAnnual / div);
  const exempt = round2((res.exemptProfitAnnual || 0) / div);
  const taxBase =
    res.regime === 'kata' ? gross : round2(Math.max(0, gross - expenses - exempt));

  const szja = round2(res.breakdown.szjaEur / div);
  const hipa = round2(res.breakdown.hipaEur / div);
  const tax = round2(szja + hipa);

  const tbj = round2(res.breakdown.tbjEur / div);
  const szocho = round2(res.breakdown.szochoEur / div);
  const social = round2(tbj + szocho);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  // Integer-reconciled HUF figures for period display
  const grossHuf = Math.round(res.revenueHuf / div);
  const expensesHuf = Math.round(res.huf.expenses / div);
  const exemptHuf = Math.round((res.huf.exemptProfit || 0) / div);
  const taxBaseHuf =
    res.regime === 'kata' ? grossHuf : Math.max(0, grossHuf - expensesHuf - exemptHuf);
  const szjaHuf = Math.round(res.huf.szja / div);
  const hipaHuf = Math.round(res.huf.hipa / div);
  const tbjHuf = Math.round(res.huf.tbj / div);
  const szochoHuf = Math.round(res.huf.szocho / div);
  const totalPaidHuf = szjaHuf + hipaHuf + tbjHuf + szochoHuf;
  const netHuf = grossHuf - totalPaidHuf;

  return {
    gross,
    expenses,
    exempt,
    taxBase,
    szja,
    hipa,
    tax,
    tbj,
    szocho,
    social,
    totalPaid,
    net,
    huf: {
      gross: grossHuf,
      expenses: expensesHuf,
      exempt: exemptHuf,
      taxBase: taxBaseHuf,
      szja: szjaHuf,
      hipa: hipaHuf,
      tbj: tbjHuf,
      szocho: szochoHuf,
      totalPaid: totalPaidHuf,
      net: netHuf
    }
  };
}

export function reconcileByCountry(countryCode, raw, view = 'yearly') {
  switch (countryCode) {
    case 'si':
      return reconcileSlovenia(raw, view);
    case 'hr':
      return reconcileCroatia(raw, view);
    case 'it':
      return reconcileItaly(raw, view);
    case 'at':
      return reconcileAustria(raw, view);
    case 'hu':
      return reconcileHungary(raw, view);
    default:
      return reconcileSlovenia(raw, view);
  }
}
