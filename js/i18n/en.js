export const EN = {
  doc_title: 'Slovenia & Neighbours Sole-Proprietor Tax Suite 2026 (SI, HR, IT, AT, HU)',
  brand_title: 'Normiranec',
  brand_subtitle: 'Slovenia & Central Europe — Sole-Proprietor Tax Suite 2026',

  // Top nav
  nav_si: 'Slovenia',
  nav_hr: 'Croatia',
  nav_it: 'Italy',
  nav_at: 'Austria',
  nav_hu: 'Hungary',
  nav_compare: 'Compare All',
  btn_share: 'Share Scenario',
  btn_copied: 'Link Copied!',

  // Shared controls
  label_revenue: 'Annual Revenue (€)',
  label_revenue_mo: 'Monthly Revenue (€)',
  equiv_annual: '= {val} / yr',
  equiv_monthly: '= {val} / mo',
  desc_revenue:
    '<strong class="tt-head">Gross Business Revenue (Excl. VAT)</strong>Enter annual or monthly gross turnover excluding VAT (invoiced revenue in SI/AT; collected receipts in HR/IT/HU). Synchronized across all country calculators and Compare All.',
  view_mo: 'Monthly',
  view_yr: 'Yearly',
  res_gross_yr: 'Gross Revenue (Yearly)',
  res_gross_mo: 'Gross Revenue (Monthly)',
  net_mo: 'Net (Monthly)',
  net_yr: 'Net (Yearly)',
  lbl_total_tax: 'Total Tax & Social',
  lbl_eff_rate: 'Effective Burden',
  kpi_kept: '{pct} of gross',
  lbl_params: 'Parameters',
  lbl_statement: 'Breakdown',

  // Common result rows
  res_expenses: 'Recognized Expenses',
  res_base: 'Tax Base',
  res_tax: 'Income Tax',
  res_soc: 'Social Contributions',
  res_net: 'Net Take-Home',
  badge_limit: 'LIMIT BREACH',
  badge_eligible: 'Eligible',
  badge_over_cap: 'Over Cap',
  badge_b2c_only: 'B2C Only',
  badge_fulltime_only: 'Full-time Only',
  badge_b2c_vat_free: '0% VAT (≤{limit})',
  badge_b2c_vat_req: '+{rate}% VAT (>{limit})',

  // Slovenia Regime Switcher (ZPZR vs ZIURS)
  si_reg_zpzr: 'Current Law (ZPZR)',
  si_reg_ziurs: 'Proposed (ZIURS)',
  si_reg_compare: 'Compare: Now vs. ZIURS',
  si_teaser_gain: 'With ZIURS: {diff} net/yr → Compare',
  si_teaser_gain_mo: 'With ZIURS: {diff} net/mo → Compare',
  si_teaser_same: 'ZIURS vs. ZPZR: identical at this revenue → Compare',
  si_referendum_banner:
    '<strong>Legislative Referendum · Dec 6, 2026:</strong> ZIURS was adopted by Parliament on May 11, 2026, and is currently suspended pending the referendum vote. Figures below reflect the proposed rules (150k € / 70k € caps, 5-month insurance rule, 80% / 70% / 40% progressive expenses).',

  // Slovenia inputs & results
  lbl_sp_type: 'Insurance & S.P. Form',
  full_sp: 'Full-time S.P.',
  pop_sp: 'Afternoon S.P.',
  desc_sp_mode:
    '<strong class="tt-head">Full-time vs. Afternoon S.P.</strong><strong>Full-time (Polni):</strong> Self-employment is your primary 40h/wk insurance basis. Note: qualifying for the higher full-time expense scale &amp; cap (120k € ZPZR / 150k € ZIURS) requires ≥9 continuous months of full-time insurance (personally or via 1 employee) in the tax year — eased to ≥5 months under ZIURS.<span class="tt-gap"></span><strong>Afternoon (Popoldanski):</strong> Available when you already hold full-time (40h/wk) employment elsewhere; pays flat contributions (113.01 €/mo from Apr 2026).',
  label_salary: 'Avg Gross Salary (2025)',
  desc_salary:
    '<strong class="tt-head">SURS Prior-Year Average Gross Wage</strong>Official 2025 SURS benchmark is <strong>2,536.03 €</strong>, setting the 2026 statutory monthly insurance floor (60% = 1,521.62 €; min contributions 651.04 €/mo) and ceiling (350% = 8,876.11 €). Editable to simulate future wage growth.',
  label_status: 'Business Year',
  desc_status:
    '<strong class="tt-head">Business Year &amp; First-Entry PIZ Relief</strong>Under ZPIZ-2 Art. 145(14), <strong>first-time</strong> S.P. registrants receive a <strong>−50%</strong> pension (PIZ) reduction in months 1–12 and <strong>−30%</strong> in months 13–24 (repeat registrants start without PIZ discounts). By Year 4+, recursive contribution add-back stabilizes.',
  opt_y1: '1st Year (-50% PIZ)',
  opt_y2: '2nd Year (-30% PIZ)',
  opt_y3: '3rd Year (No discount)',
  opt_steady: '4th+ Year (Steady-State)',
  label_base: 'Contribution Base',
  desc_base:
    '<strong class="tt-head">Insurance Base — ZPIZ-2 Art. 145(2)</strong><code>Monthly base = ((Prior-Year Tax Profit + Prior-Year Assessed Contributions) × 0.75) ÷ 12</code><span class="tt-gap"></span>Clamped between 60% and 350% of the SURS average wage. You may also voluntarily elect a higher manual base.',
  opt_real: 'Automatic (Profit-based)',
  opt_man: 'Manual Input',
  label_man_month: 'Monthly Base (€)',
  res_dohodnina: 'Income Tax (Dohodnina)',
  det_base: 'Insurance Base',
  det_main_polni: 'PIZ + Health + Parent + Emp',
  det_main_pop: 'Flat PIZ (52.05 €) + Injury ZZ (54.53 €)',
  lbl_do: 'Long-term Care',
  desc_do:
    '<strong class="tt-head">Long-Term Care Insurance (ZDOsk-1)</strong>Full-time S.P. pays <strong>2.00%</strong> of the insurance base (both 1% insured + 1% employer shares). Afternoon S.P. pays a flat <strong>6.43 €/mo</strong> (from April 2026) in addition to employment payroll deductions.',
  lbl_ozp: 'OZP (Fixed Health)',
  desc_ozp:
    '<strong class="tt-head">Mandatory Health Contribution (OZP)</strong>Fixed monthly health contribution under ZZVZZ Art. 24a (replaced supplemental health insurance), indexed every March 1 to <strong>39.36 €/mo</strong> from March 2026. Afternoon S.P. already pays OZP via main employer payroll.',
  desc_exp_zpzr_polni:
    '<strong class="tt-head">ZPZR 2026 — Full-Time Expenses &amp; Tax</strong>80% normalized expenses up to 60,000 € revenue, 0% above 60,000 € (max 48,000 €; 120,000 € 2-yr exit cap). Cedular tax: <strong>20%</strong> up to 72,000 € tax base, <strong>35%</strong> on excess above the 120k € cap.',
  desc_exp_zpzr_pop:
    '<strong class="tt-head">ZPZR 2026 — Afternoon Expenses &amp; Tax</strong>80% up to 12,500 €, 40% from 12,500 € to 30,000 €, 0% above 30,000 € (max 17,000 €; 50,000 € 2-yr exit cap). Cedular tax: <strong>20%</strong> up to 33,000 € tax base, <strong>35%</strong> on excess above the 50k € cap.',
  desc_exp_ziurs_polni:
    '<strong class="tt-head">Proposed ZIURS — Full-Time Expenses &amp; Tax</strong>80% up to 100,000 €, 70% from 100k–120k €, 40% from 120k–150k € (max 106,000 €; 150,000 € cap with ≥5 mo insurance). Cedular tax: <strong>20%</strong> up to 44,000 € tax base, <strong>35%</strong> on excess above 150k €.',
  desc_exp_ziurs_pop:
    '<strong class="tt-head">Proposed ZIURS — Afternoon Expenses &amp; Tax</strong>80% up to 50,000 € and 70% from 50k–70k € (max 54,000 €; 70,000 € cap). Cedular tax: <strong>20%</strong> up to 16,000 € tax base, <strong>35%</strong> on excess above 70k €.',
  alert_si_breach:
    '<strong>Limit Exceeded ({limit} €):</strong> Excess tax base is taxed at <strong>35%</strong>. If your 2-year average revenue exceeds {limit} €, you must exit the normirani regime next year (the 5-year re-entry ban was repealed by ZPZR-A in March 2026).',
  proj_title: 'Net Income Stabilization (5 Years — ZPIZ-2)',
  desc_proj:
    '<strong class="tt-head">5-Year ZPIZ-2 Convergence</strong>Assumes constant annual revenue. Net take-home steps down across Years 1–4 as first-entry PIZ discounts (−50% Yr 1, −30% Yr 2) expire and each year’s assessed contributions feed into the next year’s Art. 145 insurance base, stabilizing by Year 4–5.',
  lbl_year: 'Year',
  label_here: 'YOU ARE HERE',
  badge_min: 'MIN BASE',
  badge_max: 'MAX BASE',

  // Slovenia ZPZR vs ZIURS Comparison Table & Chart
  cmp_si_title: 'Side-by-Side: Current ZPZR vs. Proposed ZIURS',
  cmp_col_metric: 'Line Item',
  cmp_col_now: 'Now (ZPZR)',
  cmp_col_ziurs: 'Proposed (ZIURS)',
  cmp_col_diff: 'Delta (ZIURS)',
  cmp_row_limit: 'Revenue Cap / Rule',
  cmp_limit_polni_zpzr: '120,000 € (≥9 mo)',
  cmp_limit_polni_ziurs: '150,000 € (≥5 mo)',
  cmp_limit_pop_zpzr: '50,000 €',
  cmp_limit_pop_ziurs: '70,000 €',
  chart_title: 'Effective Total Burden Curve (Tax + Social % of Revenue)',
  chart_legend_zpzr: 'Now (ZPZR)',
  chart_legend_ziurs: 'Proposed (ZIURS)',
  chart_current_rev: 'Selected Revenue',

  // Neighbouring Country Controls & Labels
  lbl_employment: 'Employment Status',
  emp_full: 'Primary / Full-time',
  emp_side: 'Side-job (Employed elsewhere)',

  // Croatia
  hr_title: 'Croatia — Paušalni obrt (2026)',
  hr_hok_label: 'HOK Chamber Fee Exemption',
  hr_hok_std: 'Standard HOK Fee (11.40 €/mo)',
  hr_hok_exempt: 'Years 1–2 (HOK Exempt)',
  hr_desc_rules:
    '<strong class="tt-head">Croatia — Paušalni obrt (2026)</strong>7 statutory brackets up to 60,000 € set a fixed lump-sum tax base (15% of bracket ceiling, implying ≥85% deemed expenses; 12% tax = 203.40 €–1,080 €/yr max). Full-time social contributions are fixed at 290.98 €/mo (or 17.5% of bracket base if side-job) + 11.40 €/mo HOK fee.',
  hr_bracket_lbl: 'Bracket {id}/7',
  hr_res_expenses: 'Implied Flat Expenses',
  hr_det_mio: 'Pension (MIO I 15% + MIO II 5%)',
  hr_det_zo: 'Health Insurance (ZO 16.5%)',
  hr_det_hok: 'Chamber of Trades (HOK)',
  hr_alert_breach: '<strong>Exceeds 60,000 € Cap:</strong> In Croatia, 60,000 € is a hard ceiling for Paušalni obrt and triggers mandatory 25% VAT (PDV) registration plus real-expense bookkeeping.',

  // Italy
  it_title: 'Italy — Regime Forfettario (2026)',
  it_tax_label: 'Substitute Tax Rate (Imposta sostitutiva)',
  it_tax_startup: '5% Startup Rate (First 5 years)',
  it_tax_std: '15% Standard Rate',
  it_act_label: 'Activity Type (ATECO Coefficient)',
  it_act_prof78: 'Consulting / Professionals (78% base)',
  it_act_it67: 'IT & Software ATECO 62 (67% base)',
  it_act_art67: 'Artisans / General Services (67% base)',
  it_act_comm40: 'Commerce / E-Commerce (40% base)',
  it_inps_label: 'INPS Social Security Scheme',
  it_inps_sep: 'Gestione Separata — Freelancer (26.07%)',
  it_inps_sep_side: 'Gestione Separata — Side-job (24.00%)',
  it_inps_art: 'Gestione Artigiani (Fixed min + 24%)',
  it_inps_comm: 'Gestione Commercianti (Fixed min + 24.48%)',
  it_disc_label: 'Forfettario INPS Discount (-35%)',
  it_disc_yes: 'Apply -35% INPS Reduction',
  it_disc_no: 'Full INPS (No reduction)',
  it_desc_rules:
    '<strong class="tt-head">Italy — Regime Forfettario (2026)</strong>85,000 € cap (IVA-exempt; >100,000 € triggers immediate mid-year exit). Gross taxable profit = Revenue × ATECO coefficient. Paid INPS social contributions are deducted before applying the 5% startup or 15% standard substitute tax.',
  it_det_gross: 'Gross Forfettario Income (ATECO)',
  it_det_inps_fix: 'INPS Fixed Minimum (18,808 € threshold)',
  it_det_inps_var: 'INPS Variable / Proportional',
  it_alert_85k: '<strong>Exceeds 85,000 €:</strong> Between 85,000 € and 100,000 €, Forfettario still applies this year, but you exit to Ordinary Regime (IRPEF + IVA) next year.',
  it_alert_100k: '<strong>Immediate Exit (> 100,000 €):</strong> Exceeding 100,000 € terminates Regime Forfettario immediately mid-year with mandatory 22% IVA.',

  // Austria
  at_title: 'Austria — Einzelunternehmen Pauschalierung (2026)',
  at_scheme_label: 'Flat-Rate Scheme (§ 17 EStG)',
  at_sch_auto: 'Auto-Optimal (KU ≤55k / Basis >55k)',
  at_sch_klein: 'Kleinunternehmerpauschalierung (up to 55,000 €)',
  at_sch_basis: 'Basispauschalierung (up to 420,000 €)',
  at_act_label: 'Activity Category',
  at_act_serv: 'IT / Consulting / Services (20% KU / 6% Basis)',
  at_act_goods: 'Trade / Manufacturing (45% KU / 15% Basis)',
  at_desc_rules:
    '<strong class="tt-head">Austria — § 17 EStG Pauschalierung (2026)</strong>Flat expenses (20%/45% KU up to 55k €; 6%/15% Basis up to 420k €) + deductible SVS contributions (26.83% on 6,613 €–97,020 € base + 144.84 € UV) + automatic 15% Grundfreibetrag (max 4,950 €) reduce taxable income before progressive ESt (0% up to 13,539 €, then 20%–50%).',
  at_det_gfb: 'Grundfreibetrag (15% tax-free allowance)',
  at_det_pv: 'SVS Pension (PV 18.50%)',
  at_det_kv: 'SVS Healthcare (KV 6.80%)',
  at_det_sv: 'SVS Severance Fund (1.53%) + Accident',
  at_alert_breach: '<strong>Exceeds Cap ({limit} €):</strong> Revenue exceeds the statutory ceiling for the selected Austrian flat-rate scheme.',

  // Hungary
  hu_title: 'Hungary — Átalányadó & KATA (2026)',
  hu_reg_label: 'Tax Regime',
  hu_reg_ata: 'Átalányadó (Flat-Rate Expenses — B2B & B2C)',
  hu_reg_kata: 'KATA (50,000 Ft/mo — B2C ONLY!)',
  hu_exp_label: 'Statutory Expense Ratio',
  hu_exp_45: '45% — General Services, IT, Consulting (2026)',
  hu_exp_80: '80% — Crafts, Construction, Transport',
  hu_exp_90: '90% — Retail Trade Only',
  hu_wage_label: 'Minimum Contribution Wage Floor',
  hu_wage_guar: 'Garantált bérminimum (373,200 Ft — skilled/degree)',
  hu_wage_min: 'Minimálbér (322,800 Ft — unskilled)',
  hu_hipa_label: 'Local Municipal Business Tax (HIPA)',
  hu_hipa_simp: 'Simplified Banded HIPA (50k–170k Ft)',
  hu_hipa_std: 'Standard 2% of Profit',
  hu_hipa_none: '0% Municipality (No HIPA)',
  hu_fx_label: 'EUR / HUF Exchange Rate',
  hu_desc_rules:
    '<strong class="tt-head">Hungary — Átalányadó (2026)</strong>Recognizes 45% flat expenses for services (80% crafts / 90% retail), exempts the first 1,936,800 Ft of profit from 15% SZJA, and levies TBJ (18.5%) &amp; SZOCHO (13%) on a 100% minimum-wage floor for full-time entrepreneurs (112.5% SZOCHO multiplier repealed in 2026).',
  hu_desc_kata:
    '<strong class="tt-head">Hungary — New KATA (2026)</strong>No expense deduction applies: a flat 50,000 Ft/mo (600,000 Ft/yr) itemized tax covers both income tax and social security up to 18,000,000 Ft/yr (40% surtax on excess), plus simplified HIPA (50,000 Ft/yr). Strictly restricted to full-time sole proprietors invoicing private individuals (B2C only).',
  hu_det_exempt: 'Tax-Free Profit Allowance (Adómentes keret)',
  hu_det_szja: 'Personal Income Tax SZJA (15% / KATA surtax)',
  hu_det_hipa: 'Local Business Tax HIPA (Iparűzési adó)',
  hu_det_tbj: 'Social Security TBJ (18.5% / KATA flat)',
  hu_det_szocho: 'Social Contribution Tax SZOCHO (13.0%)',
  hu_alert_vat: '<strong>VAT (ÁFA) Threshold Note:</strong> Revenue exceeds the 20,000,000 Ft (≈ {vatEur}) AAM exemption threshold, triggering 27% domestic ÁFA (you still remain eligible for Átalányadó up to {capEur}).',
  hu_alert_kata_b2b: '<strong>KATA B2C Restriction:</strong> Hungarian KATA strictly prohibits invoicing companies/B2B clients and requires full-time self-employment. Switch to <strong>Átalányadó</strong> for B2B.',
  hu_alert_breach: '<strong>Exceeds Cap ({limit}):</strong> Revenue exceeds the statutory ceiling of the selected Hungarian regime.',

  // Compare All Arena & Meta-Comparison
  arena_title: 'Cross-Border Arena: Slovenia vs. Neighbouring Countries (2026)',
  arena_subtitle: 'Live ranking of net take-home pay and total tax/social burden at identical EUR revenue.',
  persona_title: 'Apples-to-Apples Persona Filter',
  desc_persona:
    '<strong class="tt-head">Synchronized Cross-Border Persona</strong>Aligns employment basis, startup reliefs (SI −50% PIZ, IT 5% tax, HR HOK exemption), and client type across all 5 countries.<span class="tt-gap"></span><strong>B2B vs. B2C:</strong> In B2B, EU reverse-charge keeps VAT price-neutral, while Hungary’s ultra-low KATA flat tax is legally banned. Switching to B2C unlocks Hungary KATA (full-time, ≤45k €) and flags each country’s domestic consumer VAT threshold (50k–85k €).',
  persona_preset: 'Synchronized Persona',
  persona_custom: 'My Custom Tab Settings',
  persona_full: 'Full-time',
  persona_side: 'Side-job',
  persona_est: 'Established (4th+ Year)',
  persona_new: 'New Startup (Year 1)',
  persona_b2b: 'B2B (Companies)',
  persona_b2c: 'B2C (Private Clients)',
  persona_note_b2b:
    '<strong>B2B (Companies):</strong> VAT is price-neutral (EU reverse-charge / deductible input VAT). Hungary’s 50,000 Ft/mo <strong>KATA</strong> regime is legally banned for B2B invoicing.',
  persona_note_b2c:
    '<strong>B2C (Private Clients):</strong> Unlocks Hungary’s <strong>KATA</strong> flat tax (full-time, ≤45k €) and shows each country’s domestic VAT-free ceiling (50k € HU · 55k € AT · 60k € SI/HR · 85k € IT) above which consumer VAT applies.',
  persona_custom_note:
    'Using each country tab’s custom settings. Client type for KATA eligibility & B2C VAT badges:',

  arena_col_rank: '#',
  arena_col_country: 'Country & Regime',
  arena_col_net: 'Net Take-Home',
  arena_col_tax_soc: 'Tax + Social',
  arena_col_eff: 'Total Burden',
  arena_col_vs_si: 'Delta vs. SI (Now)',
  arena_open_calc: 'Open calculator →',
  arena_baseline: 'Baseline (Now)',
  arena_proposed_tag: 'Dec 6 Referendum',
  arena_tax_short: 'Tax',
  arena_soc_short: 'Soc',

  residency_warning_title: 'Critical Legal Note on 183-Day Tax Residency & Substance',
  residency_warning_body:
    'Registering a sole proprietorship in a neighbouring country (e.g. a Croatian Paušalni obrt) while continuing to live in Slovenia <strong>does not legally reduce your taxes</strong>. Under ZDoh-2 Art. 6 and OECD tax treaties (center of vital interests + 183-day rule), Slovenian tax residents are taxed on worldwide income. Foreign regimes apply only with genuine physical relocation.',

  meta_matrix_title: 'Meta-Comparison: Statutory Limits, Audit Risks & Benefits',
  meta_cards_title: 'Country-by-Country Benefits & Limitations',
  meta_best_for: 'Best suited for:',
  meta_pros: 'Key Benefits',
  meta_cons: 'Limitations & Traps',
  rating_good: 'Favorable',
  rating_warn: 'Nuanced',
  rating_strict: 'Strict',

  footer_disclaimer:
    'For informational purposes only, modeled on official 2026 rules (Slovenia ZPZR, ZPZR-A, ZPIZ-2 & contested ZIURS proposal, plus HR, IT, AT, HU 2026 statutory rates). Always consult a certified tax advisor before making financial or relocation decisions. All calculations run locally in your browser.'
};
