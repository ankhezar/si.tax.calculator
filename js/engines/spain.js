/**
 * Spain 2026 — Autónomo (Estimación Directa Simplificada + 15-Tramo RETA) Engine
 *
 * Official 2026 Statutory Parameters (Native EUR):
 * - Regime Ceiling (Estimación Directa Simplificada): 600,000.00 €/yr net turnover
 * - IVA (21% VAT) Domestic Threshold: 0.00 € (Spain has NO general IVA franquiciado in 2026;
 *   every domestic B2C invoice carries 21% IVA from 1 €, whereas EU B2B uses reverse-charge)
 * - 2026 RETA Social Security (Cotización por Ingresos Reales — 15 official tramos at 31.5% incl. 0.9% MEI):
 *   • Year-1 Startup Tarifa Plana (stage === 'new'): 80.00 €/mo (960.00 €/yr)
 *   • Regional Cuota Cero (stage === 'cuota_cero', e.g. Madrid / Andalucía): 0.00 €/mo
 *   • Established (15 tramos on monthly computable net yield = (Revenue - Costs) × 0.93 / 12):
 *     R1 ≤670 €: 653.59 € base (205.88 €/mo) ... Tramo 12 >6,000 €: 1,928.10 € min base (607.35 €/mo)
 * - Deductible Expenses:
 *   • Optional documented operating costs (0% / 10% / 20%) + deductible RETA social contributions
 *   • Gastos de difícil justificación (Art. 30 RIRPF): 5% of net yield after RETA, capped at 2,000.00 €/yr
 * - 2026 Progressive IRPF (General State + Reference Autonomous Scale: 19% / 24% / 30% / 37% / 45% / 47%):
 *   • Declaración conjunta with non-working spouse (Art. 84.2.3º LIRPF): 3,400.00 € direct base reduction
 *   • Mínimo personal y familiar (Arts. 57–58 & 63 LIRPF — credited at bottom IRPF brackets):
 *     - Personal minimum: 5,550.00 €
 *     - Descendants (<25 yrs): +2,400 € (1st), +2,700 € (2nd), +4,000 € (3rd), +4,500 € (4th+)
 * - Spouse & Child Healthcare: 0.00 € universal coverage under Sistema Nacional de Salud (SNS)
 */

import { round2 } from '../utils/format.js';

export const ES_CONFIG_2026 = {
  edsCapEur: 600000,
  vatThresholdEur: 0, // Mandatory 21% IVA from first euro on domestic B2C
  vatRatePct: 21,
  retaRate: 0.315, // 28.3% CC + 1.3% CP + 0.9% Cese + 0.1% FP + 0.9% MEI
  tarifaPlanaMonthlyEur: 80,
  ssGeneralDeductionRate: 0.07,
  dificilJustificacionRate: 0.05,
  dificilJustificacionMaxEur: 2000,
  conjuntaSpouseReductionEur: 3400,
  minimoPersonalEur: 5550,
  retaTramos2026: [
    { id: 'R1', maxNetMo: 670, minBaseMo: 653.59 },
    { id: 'R2', maxNetMo: 900, minBaseMo: 718.95 },
    { id: 'R3', maxNetMo: 1166.7, minBaseMo: 849.67 },
    { id: 'T1', maxNetMo: 1300, minBaseMo: 950.98 },
    { id: 'T2', maxNetMo: 1500, minBaseMo: 960.78 },
    { id: 'T3', maxNetMo: 1700, minBaseMo: 960.78 },
    { id: 'T4', maxNetMo: 1850, minBaseMo: 1143.79 },
    { id: 'T5', maxNetMo: 2030, minBaseMo: 1209.15 },
    { id: 'T6', maxNetMo: 2330, minBaseMo: 1274.51 },
    { id: 'T7', maxNetMo: 2760, minBaseMo: 1356.21 },
    { id: 'T8', maxNetMo: 3190, minBaseMo: 1437.91 },
    { id: 'T9', maxNetMo: 3620, minBaseMo: 1519.61 },
    { id: 'T10', maxNetMo: 4050, minBaseMo: 1601.31 },
    { id: 'T11', maxNetMo: 6000, minBaseMo: 1732.03 },
    { id: 'T12', maxNetMo: Infinity, minBaseMo: 1928.1 }
  ],
  irpfBrackets2026: [
    { upTo: 12450, rate: 0.19 },
    { upTo: 20200, rate: 0.24 },
    { upTo: 35200, rate: 0.3 },
    { upTo: 60000, rate: 0.37 },
    { upTo: 300000, rate: 0.45 },
    { upTo: Infinity, rate: 0.47 }
  ]
};

function computeSpanishIrpfScale(base) {
  if (base <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (const br of ES_CONFIG_2026.irpfBrackets2026) {
    if (base <= prev) break;
    const slice = Math.min(base, br.upTo) - prev;
    tax += slice * br.rate;
    prev = br.upTo;
  }
  return round2(tax);
}

function computeMinimoDescendientesEur(kids) {
  if (kids <= 0) return 0;
  let sum = 2400;
  if (kids >= 2) sum += 2700;
  if (kids >= 3) sum += 4000;
  if (kids >= 4) sum += (kids - 3) * 4500;
  return sum;
}

export function calculateSpain({
  revenue = 65000,
  employment = 'full',      // 'full' | 'side'
  stage = 'established',    // 'established' | 'new' | 'cuota_cero'
  deductibleCostPct = '0',  // '0' | '10' | '20'
  children = 0,
  dependentSpouse = false
} = {}) {
  const rev = Math.max(0, Number(revenue) || 0);
  const kids = Math.max(0, Math.floor(Number(children) || 0));
  const hasSpouse = Boolean(dependentSpouse);
  const costRatio = Math.max(0, Math.min(0.8, (parseFloat(deductibleCostPct) || 0) / 100));

  const isBreach = rev > ES_CONFIG_2026.edsCapEur;
  const isEligible = !isBreach;

  const operatingCosts = round2(rev * costRatio);
  const netBeforeReta = round2(Math.max(0, rev - operatingCosts));

  // 1. RETA Social Security (15 Tramos or Tarifa Plana 80 €/mo or Cuota Cero 0 €)
  const computableNetMonthly = (netBeforeReta * (1 - ES_CONFIG_2026.ssGeneralDeductionRate)) / 12;
  const tramo =
    ES_CONFIG_2026.retaTramos2026.find(t => computableNetMonthly <= t.maxNetMo) ||
    ES_CONFIG_2026.retaTramos2026[ES_CONFIG_2026.retaTramos2026.length - 1];

  let retaMonthly = 0;
  if (rev > 0) {
    if (stage === 'cuota_cero') {
      retaMonthly = 0;
    } else if (stage === 'new') {
      retaMonthly = ES_CONFIG_2026.tarifaPlanaMonthlyEur;
    } else {
      const baseQuota = round2(tramo.minBaseMo * ES_CONFIG_2026.retaRate);
      // Pluriactividad (side-job employed elsewhere): statutory 50% min-base reduction option / ceiling refund approximation
      retaMonthly = employment === 'side' ? round2(Math.max(160, baseQuota * 0.75)) : baseQuota;
    }
  }
  const socialAnnual = round2(retaMonthly * 12);

  // 2. Gastos de difícil justificación (5% of yield after RETA, max 2,000 €)
  const yieldAfterReta = round2(Math.max(0, netBeforeReta - socialAnnual));
  const dificilJustificacion = round2(
    Math.min(
      ES_CONFIG_2026.dificilJustificacionMaxEur,
      yieldAfterReta * ES_CONFIG_2026.dificilJustificacionRate
    )
  );
  const totalRecognizedExpenses = round2(operatingCosts + dificilJustificacion);
  const rendimientoNetoIrpf = round2(Math.max(0, yieldAfterReta - dificilJustificacion));

  // 3. IRPF: Baseline single taxpayer vs. Joint Spouse Reduction (3,400 €) + Mínimo por descendientes
  const singleGrossTax = round2(
    Math.max(
      0,
      computeSpanishIrpfScale(rendimientoNetoIrpf) -
        computeSpanishIrpfScale(Math.min(rendimientoNetoIrpf, ES_CONFIG_2026.minimoPersonalEur))
    )
  );

  const conjuntaReduction = hasSpouse
    ? Math.min(rendimientoNetoIrpf, ES_CONFIG_2026.conjuntaSpouseReductionEur)
    : 0;
  const baseLiquidable = round2(Math.max(0, rendimientoNetoIrpf - conjuntaReduction));

  const taxAfterSpouseOnly = round2(
    Math.max(
      0,
      computeSpanishIrpfScale(baseLiquidable) -
        computeSpanishIrpfScale(Math.min(baseLiquidable, ES_CONFIG_2026.minimoPersonalEur))
    )
  );
  const spouseTaxSavingAnnual = round2(Math.max(0, singleGrossTax - taxAfterSpouseOnly));

  const minimoDescendientes = computeMinimoDescendientesEur(kids);
  const totalMinimoFamiliar = ES_CONFIG_2026.minimoPersonalEur + minimoDescendientes;

  const taxAnnual = round2(
    Math.max(
      0,
      computeSpanishIrpfScale(baseLiquidable) -
        computeSpanishIrpfScale(Math.min(baseLiquidable, totalMinimoFamiliar))
    )
  );
  const childTaxSavingAnnual = round2(Math.max(0, taxAfterSpouseOnly - taxAnnual));
  const familyTaxCreditAnnual = round2(spouseTaxSavingAnnual + childTaxSavingAnnual);

  const totalPaidAnnual = round2(taxAnnual + socialAnnual);
  const netAnnual = round2(rev - totalPaidAnnual);

  return {
    country: 'es',
    regimeName:
      stage === 'new'
        ? 'Autónomo (Tarifa Plana)'
        : stage === 'cuota_cero'
          ? 'Autónomo (Cuota Cero)'
          : `Autónomo (RETA ${tramo.id})`,
    tramoId: tramo.id,
    tramoMinBaseMo: tramo.minBaseMo,
    employment,
    stage,
    deductibleCostPct,
    children: kids,
    dependentSpouse: hasSpouse,
    revenue: rev,
    limit: ES_CONFIG_2026.edsCapEur,
    vatThreshold: ES_CONFIG_2026.vatThresholdEur,
    isEligible,
    isBreach,
    excessRevenue: isBreach ? round2(rev - ES_CONFIG_2026.edsCapEur) : 0,
    operatingCostsAnnual: operatingCosts,
    dificilJustificacionAnnual: dificilJustificacion,
    expensesAnnual: totalRecognizedExpenses,
    conjuntaReductionAnnual: conjuntaReduction,
    minimoDescendientesAnnual: minimoDescendientes,
    taxBaseAnnual: baseLiquidable,
    grossTaxAnnual: singleGrossTax,
    familyTaxCreditAnnual,
    spouseHealthAnnual: 0,
    taxAnnual,
    socialAnnual,
    totalPaidAnnual,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    effectiveRatePct: rev > 0 ? (totalPaidAnnual / rev) * 100 : 0,
    breakdown: {
      retaMonthly,
      retaAnnual: socialAnnual,
      grossTaxBeforeFamily: singleGrossTax,
      spouseTaxSavingAnnual,
      childTaxSavingAnnual
    }
  };
}
