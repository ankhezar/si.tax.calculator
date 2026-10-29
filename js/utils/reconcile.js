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
  const socSpouseOzp = round2((res.socData.breakdown.spouseOzp || 0) * mult);
  const social = round2(socMain + socDo + socOzp + socSpouseOzp);

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
    socSpouseOzp,
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
  const spouseSvs = round2((res.breakdown.spouseSvsAnnual || 0) / div);
  const social = round2(pv + kv + sv + spouseSvs);

  const gfb = round2(res.grundfreibetragAnnual / div);
  const taxBase = round2(Math.max(0, gross - expenses - social - gfb));
  const tax = round2(res.taxAnnual / div);
  const grossTax = round2((res.grossTaxAnnual ?? res.taxAnnual) / div);
  const familyCredit = round2(Math.max(0, grossTax - tax));
  const avabCredit = round2(Math.min(familyCredit, (res.breakdown.avabAppliedAnnual || 0) / div));
  const fbCredit = round2(Math.max(0, familyCredit - avabCredit));

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    expenses,
    pv,
    kv,
    sv,
    spouseSvs,
    social,
    gfb,
    taxBase,
    grossTax,
    familyCredit,
    avabCredit,
    fbCredit,
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

  const grossSzja = round2((res.breakdown.grossSzjaEur ?? res.breakdown.szjaEur) / div);
  const szja = round2(res.breakdown.szjaEur / div);
  const familyCreditSzja = round2(Math.max(0, grossSzja - szja));
  const hipa = round2(res.breakdown.hipaEur / div);
  const tax = round2(szja + hipa);

  const grossTbj = round2((res.breakdown.grossTbjEur ?? res.breakdown.tbjEur) / div);
  const tbj = round2(res.breakdown.tbjEur / div);
  const familyCreditTbj = round2(Math.max(0, grossTbj - tbj));
  const familyCreditTotal = round2(familyCreditSzja + familyCreditTbj);
  const szocho = round2(res.breakdown.szochoEur / div);
  const spouseHealth = round2((res.breakdown.spouseHealthEur || 0) / div);
  const social = round2(tbj + szocho + spouseHealth);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  // Integer-reconciled HUF figures for period display
  const grossHuf = Math.round(res.revenueHuf / div);
  const expensesHuf = Math.round(res.huf.expenses / div);
  const exemptHuf = Math.round((res.huf.exemptProfit || 0) / div);
  const taxBaseHuf =
    res.regime === 'kata' ? grossHuf : Math.max(0, grossHuf - expensesHuf - exemptHuf);
  const grossSzjaHuf = Math.round((res.huf.grossSzja ?? res.huf.szja) / div);
  const szjaHuf = Math.round(res.huf.szja / div);
  const familyCreditSzjaHuf = Math.max(0, grossSzjaHuf - szjaHuf);
  const hipaHuf = Math.round(res.huf.hipa / div);
  const grossTbjHuf = Math.round((res.huf.grossTbj ?? res.huf.tbj) / div);
  const tbjHuf = Math.round(res.huf.tbj / div);
  const familyCreditTbjHuf = Math.max(0, grossTbjHuf - tbjHuf);
  const familyCreditTotalHuf = familyCreditSzjaHuf + familyCreditTbjHuf;
  const szochoHuf = Math.round(res.huf.szocho / div);
  const spouseHealthHuf = Math.round((res.huf.spouseHealth || 0) / div);
  const totalPaidHuf = szjaHuf + hipaHuf + tbjHuf + szochoHuf + spouseHealthHuf;
  const netHuf = grossHuf - totalPaidHuf;

  return {
    gross,
    expenses,
    exempt,
    taxBase,
    grossSzja,
    szja,
    familyCreditSzja,
    hipa,
    tax,
    grossTbj,
    tbj,
    familyCreditTbj,
    familyCreditTotal,
    szocho,
    spouseHealth,
    social,
    totalPaid,
    net,
    huf: {
      gross: grossHuf,
      expenses: expensesHuf,
      exempt: exemptHuf,
      taxBase: taxBaseHuf,
      grossSzja: grossSzjaHuf,
      szja: szjaHuf,
      familyCreditSzja: familyCreditSzjaHuf,
      hipa: hipaHuf,
      grossTbj: grossTbjHuf,
      tbj: tbjHuf,
      familyCreditTbj: familyCreditTbjHuf,
      familyCreditTotal: familyCreditTotalHuf,
      szocho: szochoHuf,
      spouseHealth: spouseHealthHuf,
      totalPaid: totalPaidHuf,
      net: netHuf
    }
  };
}

export function reconcilePoland(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const expenses = round2(res.expensesAnnual / div);
  const taxBase = round2(Math.max(0, gross - expenses));

  const grossTax = round2((res.grossTaxAnnual ?? res.taxAnnual) / div);
  const tax = round2(res.taxAnnual / div);
  const familyCredit = round2(Math.max(0, grossTax - tax));
  const spouseCredit = round2(
    Math.min(familyCredit, (res.breakdown.spouseJointSavingEur || 0) / div)
  );
  const childCredit = round2(Math.max(0, familyCredit - spouseCredit));

  const zusSocial = round2(res.breakdown.zusSocialEur / div);
  const health = round2(res.breakdown.healthEur / div);
  const social = round2(zusSocial + health);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  const grossPln = Math.round(res.revenuePln / div);
  const expensesPln = Math.round(res.pln.expenses / div);
  const taxBasePln = Math.max(0, grossPln - expensesPln);
  const grossTaxPln = Math.round((res.pln.grossTax ?? res.pln.tax) / div);
  const taxPln = Math.round(res.pln.tax / div);
  const familyCreditPln = Math.max(0, grossTaxPln - taxPln);
  const spouseCreditPln = Math.min(
    familyCreditPln,
    Math.round((res.pln.spouseJointSaving || 0) / div)
  );
  const childCreditPln = Math.max(0, familyCreditPln - spouseCreditPln);
  const zusSocialPln = Math.round(res.pln.zusSocial / div);
  const healthPln = Math.round(res.pln.health / div);
  const socialPln = zusSocialPln + healthPln;
  const totalPaidPln = taxPln + socialPln;
  const netPln = grossPln - totalPaidPln;

  return {
    gross,
    expenses,
    taxBase,
    grossTax,
    familyCredit,
    spouseCredit,
    childCredit,
    tax,
    zusSocial,
    health,
    social,
    totalPaid,
    net,
    pln: {
      gross: grossPln,
      expenses: expensesPln,
      taxBase: taxBasePln,
      grossTax: grossTaxPln,
      familyCredit: familyCreditPln,
      spouseCredit: spouseCreditPln,
      childCredit: childCreditPln,
      tax: taxPln,
      zusSocial: zusSocialPln,
      health: healthPln,
      social: socialPln,
      totalPaid: totalPaidPln,
      net: netPln
    }
  };
}

export function reconcileCzechia(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const expenses = round2(res.expensesAnnual / div);
  const taxBase =
    res.resolvedRegime === 'pausalni_dan' ? gross : round2(Math.max(0, gross - expenses));

  const grossTax = round2((res.grossTaxAnnual ?? res.taxAnnual) / div);
  const tax = round2(res.taxAnnual / div);
  const familyCredit = round2(Math.max(0, grossTax - tax));
  const spouseCredit = round2(
    Math.min(familyCredit, (res.breakdown.spouseCreditEur || 0) / div)
  );
  const childCredit = round2(Math.max(0, familyCredit - spouseCredit));

  const socPillar = round2(res.breakdown.socPillarEur / div);
  const healthPillar = round2(res.breakdown.healthPillarEur / div);
  const spouseObzp = round2((res.breakdown.spouseObzpEur || 0) / div);
  const social = round2(socPillar + healthPillar + spouseObzp);

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  const grossCzk = Math.round(res.revenueCzk / div);
  const expensesCzk = Math.round(res.czk.expenses / div);
  const taxBaseCzk =
    res.resolvedRegime === 'pausalni_dan' ? grossCzk : Math.max(0, grossCzk - expensesCzk);
  const grossTaxCzk = Math.round((res.czk.grossTax ?? res.czk.tax) / div);
  const taxCzk = Math.round(res.czk.tax / div);
  const familyCreditCzk = Math.max(0, grossTaxCzk - taxCzk);
  const spouseCreditCzk = Math.min(
    familyCreditCzk,
    Math.round((res.czk.spouseCredit || 0) / div)
  );
  const childCreditCzk = Math.max(0, familyCreditCzk - spouseCreditCzk);
  const socPillarCzk = Math.round(res.czk.socPillar / div);
  const healthPillarCzk = Math.round(res.czk.healthPillar / div);
  const spouseObzpCzk = Math.round((res.czk.spouseObzp || 0) / div);
  const socialCzk = socPillarCzk + healthPillarCzk + spouseObzpCzk;
  const totalPaidCzk = taxCzk + socialCzk;
  const netCzk = grossCzk - totalPaidCzk;

  return {
    gross,
    expenses,
    taxBase,
    grossTax,
    familyCredit,
    spouseCredit,
    childCredit,
    tax,
    socPillar,
    healthPillar,
    spouseObzp,
    social,
    totalPaid,
    net,
    czk: {
      gross: grossCzk,
      expenses: expensesCzk,
      taxBase: taxBaseCzk,
      grossTax: grossTaxCzk,
      familyCredit: familyCreditCzk,
      spouseCredit: spouseCreditCzk,
      childCredit: childCreditCzk,
      tax: taxCzk,
      socPillar: socPillarCzk,
      healthPillar: healthPillarCzk,
      spouseObzp: spouseObzpCzk,
      social: socialCzk,
      totalPaid: totalPaidCzk,
      net: netCzk
    }
  };
}

export function reconcileSlovakia(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const expenses = round2(res.expensesAnnual / div);
  const socPillar = round2(res.breakdown.socPillarAnnual / div);
  const healthPillar = round2(res.breakdown.healthPillarAnnual / div);
  const spouseHealth = round2((res.breakdown.spouseHealthAnnual || 0) / div);
  const social = round2(socPillar + healthPillar + spouseHealth);

  const nczdTaxpayer = round2((res.nczdTaxpayerAnnual || 0) / div);
  const nczdSpouse = round2((res.nczdSpouseAnnual || 0) / div);
  const czd = round2(Math.max(0, gross - expenses - socPillar - healthPillar));
  const taxBase = round2(Math.max(0, czd - nczdTaxpayer - nczdSpouse));

  const grossTax = round2((res.grossTaxAnnual ?? res.taxAnnual) / div);
  const tax = round2(res.taxAnnual / div);
  const familyCredit = round2(Math.max(0, grossTax - tax));
  const spouseCredit = round2(
    Math.min(familyCredit, (res.breakdown.spouseTaxSavingAnnual || 0) / div)
  );
  const childCredit = round2(Math.max(0, familyCredit - spouseCredit));

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    expenses,
    czd,
    nczdTaxpayer,
    nczdSpouse,
    taxBase,
    socPillar,
    healthPillar,
    spouseHealth,
    social,
    grossTax,
    familyCredit,
    spouseCredit,
    childCredit,
    tax,
    totalPaid,
    net
  };
}

export function reconcileSpain(res, view = 'yearly') {
  const div = view === 'monthly' ? 12 : 1;

  const gross = round2(res.revenue / div);
  const operatingCosts = round2((res.operatingCostsAnnual || 0) / div);
  const dificil = round2((res.dificilJustificacionAnnual || 0) / div);
  const expenses = round2(operatingCosts + dificil);
  const social = round2(res.socialAnnual / div);

  const conjunta = round2((res.conjuntaReductionAnnual || 0) / div);
  const minimoDesc = round2((res.minimoDescendientesAnnual || 0) / div);
  const taxBase = round2(Math.max(0, gross - expenses - social - conjunta));

  const grossTax = round2((res.grossTaxAnnual ?? res.taxAnnual) / div);
  const tax = round2(res.taxAnnual / div);
  const familyCredit = round2(Math.max(0, grossTax - tax));
  const spouseCredit = round2(
    Math.min(familyCredit, (res.breakdown.spouseTaxSavingAnnual || 0) / div)
  );
  const childCredit = round2(Math.max(0, familyCredit - spouseCredit));

  const totalPaid = round2(tax + social);
  const net = round2(gross - totalPaid);

  return {
    gross,
    operatingCosts,
    dificil,
    expenses,
    conjunta,
    minimoDesc,
    taxBase,
    social,
    grossTax,
    familyCredit,
    spouseCredit,
    childCredit,
    tax,
    totalPaid,
    net
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
    case 'pl':
      return reconcilePoland(raw, view);
    case 'cz':
      return reconcileCzechia(raw, view);
    case 'sk':
      return reconcileSlovakia(raw, view);
    case 'es':
      return reconcileSpain(raw, view);
    default:
      return reconcileSlovenia(raw, view);
  }
}
