export const EN = {
  doc_title: 'NettoEU — European Sole-Proprietor & Freelance Tax Calculator 2026 (9 Countries)',
  brand_title: 'NettoEU',
  brand_subtitle: 'European Sole-Proprietor & Freelance Tax Suite 2026 — 9 Countries',

  // Top nav
  nav_si: 'Slovenia',
  nav_hr: 'Croatia',
  nav_it: 'Italy',
  nav_at: 'Austria',
  nav_hu: 'Hungary',
  nav_pl: 'Poland',
  nav_cz: 'Czechia',
  nav_sk: 'Slovakia',
  nav_es: 'Spain',
  nav_compare: 'Compare All',
  btn_share: 'Share Scenario',
  btn_copied: 'Link Copied!',

  // Shared controls
  label_revenue: 'Annual Revenue (€)',
  label_revenue_mo: 'Monthly Revenue (€)',
  equiv_annual: '= {val} / yr',
  equiv_monthly: '= {val} / mo',
  desc_revenue:
    '<strong class="tt-head">Gross Business Revenue (Excl. VAT)</strong>Enter annual or monthly gross turnover excluding VAT. Synchronized across all 9 country calculators and Compare All (local currencies HUF, PLN, and CZK convert automatically using editable FX rates).',
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

  // Shared Household & Dependents Controls
  fam_label: 'Household & Dependents',
  fam_kids_short: 'Children (<18)',
  fam_kids_0: '0 children',
  fam_kids_1: '1 child',
  fam_kids_2: '2 children',
  fam_kids_3: '3 children',
  fam_kids_4: '4 children',
  fam_spouse_short: 'Spouse',
  fam_spouse_none: 'No dependent spouse',
  fam_spouse_dep: 'Non-working spouse',
  desc_family:
    '<strong class="tt-head">Household: Children &amp; Non-Working Spouse (2026)</strong><strong>Family-Relief Regimes (AT, HU Átalányadó, CZ 60% Výdaje, SK, ES, PL Skala):</strong> Direct child credits &amp; spouse allowances cut income tax (and HU TBJ) — e.g. AT 2,000 €/child + AVAB, HU doubled 2026 credits, CZ 15.2k–27.8k Kč/child, SK 1,200 €/child + spouse NČZD, ES 3,400 € joint spouse deduction + child minimums, PL Skala joint filing.<span class="tt-gap"></span><strong>Flat / Cedular Regimes (SI, HR, IT, HU KATA, PL Ryczałt, CZ Paušální daň):</strong> <strong>0 €</strong> family tax credit. Non-working spouse health coverage costs <strong>0 €</strong> in HR, IT, PL &amp; ES, while mandatory fees apply in SI (OZP 39.36 €/mo), HU (~30.75 €/mo), CZ (OBZP 3,024 Kč/mo unless child &lt;7), SK (121.92 €/mo if childless), and AT (+3.4% SVS if childless).',
  badge_fam_delta: 'Family {val}',
  badge_fam_zero: 'Family 0 €',

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
  lbl_spouse_ozp: 'Spouse OZP (M-DČ Dependent)',
  desc_si_family:
    '<strong class="tt-head">Slovenia Normiranec — Family &amp; OZP</strong>Under ZDoh-2 Art. 59(2), Normiranec pays a final cedular 20%/35% tax and <strong>cannot claim dependent tax allowances</strong> (children/spouse) against business revenue (Afternoon S.P. holders claim them on their employment salary).<span class="tt-gap"></span>Children are co-insured free (0 €). An uninsured spouse gets free basic ZZZS coverage (M-DČ) but personally owes mandatory <strong>OZP (39.36 €/mo = 472.32 €/yr)</strong>.',
  si_family_note:
    '<strong>Normiranec Family Rule:</strong> Cedular 20%/35% tax grants <strong>0 €</strong> dependent tax relief (ZDoh-2 Art. 59). Children are co-insured for 0 €; an uninsured spouse owes mandatory OZP (39.36 €/mo).',
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
  hr_title: 'Paušalni obrt · Lump-Sum Sole Trader',
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
  hr_family_note:
    '<strong>Paušalni obrt Family Rule:</strong> Fixed PO-SD bracket tax grants <strong>0 €</strong> dependent tax deduction, while unemployed spouse &amp; children receive free HZZO health co-insurance (<strong>0 €</strong> extra cost).',

  // Italy
  it_title: 'Partita IVA · Regime Forfettario',
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
  it_family_note:
    '<strong>Forfettario Family Rule:</strong> Choosing the 5%/15% substitute tax forfeits IRPEF dependent deductions (<strong>0 €</strong> tax relief), while resident spouse &amp; children have free SSN healthcare (<strong>0 €</strong> extra cost; Assegno Unico is paid separately via INPS).',

  // Austria
  at_title: 'Einzelunternehmen · § 17 Pauschalierung',
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
  at_spouse_waiver_label: 'SVS Spouse Co-Insurance (+3.4%)',
  at_spouse_waiver_no: 'Standard (+3.4% SVS Zusatzbeitrag)',
  at_spouse_waiver_yes: 'Waived (≥4 yrs past child-rearing — 0%)',
  at_det_spouse_svs: 'SVS Spouse Co-Insurance (+3.4%)',
  at_det_gross_est: 'Tariff Income Tax (before credits)',
  at_det_fb_plus: 'Familienbonus Plus ({n}× child credit)',
  at_det_avab: 'Sole-Earner Credit (AVAB)',
  at_alert_breach: '<strong>Exceeds Cap ({limit} €):</strong> Revenue exceeds the statutory ceiling for the selected Austrian flat-rate scheme.',

  // Hungary
  hu_title: 'Egyéni vállalkozó · Átalányadó & KATA',
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
  hu_det_gross_szja: 'SZJA 15% (before family credit)',
  hu_det_fam_szja: 'Family Tax Credit (Családi adókedvezmény)',
  hu_det_gross_tbj: 'TBJ 18.5% (before family credit)',
  hu_det_fam_tbj: 'Family TBJ Credit (Járulékkedvezmény)',
  hu_det_spouse_tb: 'Spouse Mandatory Health Fee (12,300 Ft/mo)',
  hu_alert_vat: '<strong>VAT (ÁFA) Threshold Note:</strong> Revenue exceeds the 20,000,000 Ft (≈ {vatEur}) AAM exemption threshold, triggering 27% domestic ÁFA (you still remain eligible for Átalányadó up to {capEur}).',
  hu_alert_kata_b2b: '<strong>KATA B2C Restriction:</strong> Hungarian KATA strictly prohibits invoicing companies/B2B clients and requires full-time self-employment. Switch to <strong>Átalányadó</strong> for B2B.',
  hu_alert_breach: '<strong>Exceeds Cap ({limit}):</strong> Revenue exceeds the statutory ceiling of the selected Hungarian regime.',

  // Poland
  pl_title: 'JDG · Ryczałt, Skala & Liniowy',
  pl_reg_label: 'Tax Regime (Forma opodatkowania)',
  pl_reg_ryczalt: 'Ryczałt (Lump-Sum Revenue Tax — up to 2M €)',
  pl_reg_skala: 'Skala podatkowa (12% / 32% + Joint Spouse & Kids)',
  pl_reg_liniowy: 'Podatek liniowy (19% Flat Tax)',
  pl_rate_label: 'Ryczałt Activity Rate',
  pl_rate_12: '12% — IT, Software & Programming',
  pl_rate_8_5: '8.5% — General Services',
  pl_rate_14: '14% — Engineering, Architecture, Healthcare',
  pl_rate_15: '15% — Management Consulting, Marketing, Ads',
  pl_zus_label: 'ZUS Social Security Stage',
  pl_zus_ulga: 'Year 1 (6 mo Ulga na start + 6 mo Preferencyjny)',
  pl_zus_pref: 'Months 7–30: Preferencyjny ZUS (420.86 zł/mo)',
  pl_zus_duzy: 'Standard: Duży ZUS (1,788.29 zł/mo, excl. sickness)',
  pl_fx_label: 'EUR / PLN Exchange Rate',
  pl_desc_rules:
    '<strong class="tt-head">Poland — JDG Sole Proprietorship (2026)</strong><strong>Ryczałt (up to 2,000,000 €):</strong> Taxes gross revenue minus ZUS social &amp; 50% of 3-tier NFZ health (498.35 / 830.58 / 1,495.04 zł/mo across ≤60k / ≤300k / &gt;300k zł brackets).<span class="tt-gap"></span><strong>Skala (12%/32%):</strong> 30,000 zł tax-free band, 12% up to 120,000 zł, 32% above + 9% non-deductible health; unlocks joint spouse splitting &amp; <em>Ulga na dzieci</em>. <strong>Liniowy:</strong> 19% flat + 4.9% health (deductible up to 14,100 zł). Side-job employed ≥4,806 zł/mo pays 0 zł social ZUS.',
  pl_res_deductions: 'Deductible ZUS / Health',
  pl_det_zus: 'ZUS Social (Pension, Disability, Accident, FP)',
  pl_det_nfz: 'NFZ Health Insurance (Składka zdrowotna)',
  pl_det_gross_pit: 'PIT before family relief',
  pl_det_spouse_split: 'Joint Spouse Filing Saving (Wspólne rozliczenie)',
  pl_det_child_credit: 'Child Tax Credit (Ulga na dzieci, {n}×)',
  pl_alert_breach:
    '<strong>Exceeds 2,000,000 € Ryczałt Cap ({limit}):</strong> Turnover exceeds Poland’s statutory ceiling for Ryczałt lump-sum taxation; switch to Skala or Podatek liniowy.',
  pl_alert_vat:
    '<strong>VAT (23%) Threshold Note:</strong> Revenue exceeds Poland’s 2026 domestic VAT exemption ceiling of 240,000 zł (≈ {vatEur}); EU B2B reverse-charge remains VAT-neutral.',
  pl_family_note_ryczalt:
    '<strong>JDG Family Rule ({regime}):</strong> Non-working spouse and children receive free NFZ public healthcare co-insurance (ZCNA, <strong>0 zł</strong> extra cost). Joint spouse tax splitting and <em>Ulga na dzieci</em> apply only under <strong>Skala podatkowa (12%/32%)</strong>.',

  // Czechia
  cz_title: 'OSVČ · Paušální daň & Výdajový paušál',
  cz_reg_label: 'OSVČ Tax Regime',
  cz_reg_auto: 'Auto-Optimal (Best Eligible Net)',
  cz_reg_pausal: 'Paušální daň (3 Flat Monthly Bands ≤2M Kč)',
  cz_reg_vydaje: 'Paušální výdaje (60% / 80% / 40% Flat Expenses)',
  cz_exp_label: 'Trade / Expense Category',
  cz_exp_60: '60% — Free Trade, IT, Consulting (Volná živnost)',
  cz_exp_80: '80% — Crafts & Agriculture (Řemeslná živnost)',
  cz_exp_40: '40% — Licensed Professions, Lawyers, Authors',
  cz_stage_label: 'Business Stage',
  cz_stage_est: 'Established OSVČ (5,005 Kč/mo min social)',
  cz_stage_new: 'New Startup Years 1–3 (3,575 Kč/mo min social)',
  cz_spouse_care_label: 'Spouse Young-Child Care (2026 Rule)',
  cz_spouse_care_no: 'No child <3 / <7 (OBZP 3,024 Kč/mo applies)',
  cz_spouse_care_yes: 'Caring for child <3 (24,840 Kč credit + state VZP)',
  cz_fx_label: 'EUR / CZK Exchange Rate',
  cz_desc_pausal:
    '<strong class="tt-head">Czechia — Paušální daň (2026)</strong>Replaces income tax, ČSSZ social, and VZP health with <strong>one fixed monthly payment</strong> and zero annual filings up to 2,000,000 Kč: <strong>Band 1</strong> (9,162 Kč/mo up to 1.5M Kč on 60%/80%, or 1M on 40%), <strong>Band 2</strong> (16,745 Kč/mo up to 1.5M/2M), <strong>Band 3</strong> (27,139 Kč/mo up to 2M Kč). Unavailable for side-job employees or full domestic DPH payers.',
  cz_desc_vydaje:
    '<strong class="tt-head">Czechia — Paušální výdaje (2026)</strong>Deducts 60%/80%/40% flat expenses (capped on 2,000,000 Kč turnover base). ČSSZ social is 29.2% on 55% of profit (min 5,005 Kč/mo full-time, 3,575 Kč startup; side-job exempt below 117,521 Kč profit). VZP health is 13.5% on 50% of profit (min 3,306 Kč/mo). DPFO tax is 15% (23% above 1,762,812 Kč) minus 30,840 Kč taxpayer credit + family credits.',
  cz_band_lbl: 'Band {id}/3',
  cz_det_soc: 'ČSSZ Social & Pension Insurance',
  cz_det_vzp: 'VZP Public Health Insurance',
  cz_det_spouse_obzp: 'Spouse OBZP Health Fee (3,024 Kč/mo)',
  cz_det_gross_dpfo: 'DPFO after basic taxpayer credit (30,840 Kč)',
  cz_det_spouse_credit: 'Spouse Tax Credit (Sleva na manželku, child <3)',
  cz_det_child_credit: 'Child Tax Credit (Daňové zvýhodnění, {n}×)',
  cz_alert_breach:
    '<strong>Exceeds 2,000,000 Kč Cap ({limit}):</strong> Turnover exceeds Czechia’s 2,000,000 Kč ceiling for Paušální daň and triggers 21% domestic DPH registration. Switch to <strong>Paušální výdaje</strong>.',
  cz_alert_side:
    '<strong>Paušální daň Side-Job Restriction:</strong> Entrepreneurs with concurrent salaried employment cannot use Paušální daň in Czechia. Switch to <strong>Paušální výdaje</strong> or Auto-Optimal.',
  cz_alert_vat:
    '<strong>DPH (21%) Threshold Note:</strong> Revenue exceeds Czechia’s 2,000,000 Kč (≈ {vatEur}) domestic DPH exemption ceiling.',

  // Slovakia
  sk_title: 'SZČO · Paušálne výdavky 60%',
  sk_stage_label: 'Business Stage (Sociálna poisťovňa)',
  sk_stage_est: 'Established SZČO (Min 303.11 € soc + 121.92 € ZP)',
  sk_stage_new: 'Year-1 Startup (0 € Social Insurance Holiday!)',
  sk_spouse_care_label: 'Spouse Qualifying Care (Child <3 / <6)',
  sk_spouse_care_yes: 'Qualifies (NČZD up to 5,455 € + state health)',
  sk_spouse_care_no: 'Does not qualify (0 € NČZD + 121.92 €/mo ZP)',
  sk_desc_rules:
    '<strong class="tt-head">Slovakia — SZČO Flat Expenses (2026)</strong>Deducts 60% flat expenses capped at <strong>20,000 €/yr</strong> plus paid social &amp; health contributions. Under Slovakia’s 2026 consolidation package, full-time minimums are <strong>303.11 €/mo</strong> social (33.15% on 60% avg wage; 0 € in Year 1 or if revenue ≤9,144 €) + <strong>121.92 €/mo</strong> health (16% on 50% avg wage). Tax is <strong>15%</strong> up to 100,000 € turnover (19%–35% above) after 5,966.73 € NČZD.',
  sk_det_nczd: 'Taxpayer NČZD Allowance (max 5,966.73 €/yr)',
  sk_det_nczd_spouse: 'Spouse NČZD Allowance (max 5,455.30 €/yr)',
  sk_det_soc: 'Sociálna poisťovňa (33.15%)',
  sk_det_zp: 'Public Health Insurance ZP (16.00%)',
  sk_det_spouse_zp: 'Spouse Self-Payer Health ZP (121.92 €/mo)',
  sk_det_gross_tax: 'Income Tax before family relief',
  sk_det_spouse_tax: 'Spouse NČZD Tax Saving',
  sk_det_child_bonus: 'Child Tax Bonus (Daňový bonus, {n}×)',
  sk_alert_breach:
    '<strong>Exceeds 100,000 € Reduced-Tax Cap:</strong> Above 100,000 € turnover, Slovakia’s reduced 15% SZČO tax rate transitions to 2026 progressive brackets (19% / 25% / 30% / 35%).',
  sk_alert_vat:
    '<strong>DPH (23%) Threshold Note:</strong> Revenue exceeds Slovakia’s 50,000 € calendar-year domestic DPH threshold (23% DPH applies domestically; >62,500 € triggers immediate registration).',

  // Spain
  es_title: 'Autónomo · Estimación Directa Simplificada',
  es_stage_label: 'RETA Social Security Quota',
  es_stage_est: 'Established Autónomo (15-Bracket Ingresos Reales)',
  es_stage_new: 'Year-1 Startup: Tarifa Plana (80 €/mo)',
  es_stage_cero: 'Year-1 Regional Cuota Cero (0 €/mo — Madrid/Andalucía)',
  es_cost_label: 'Documented Deductible Business Costs',
  es_cost_0: '0% — Pure Remote IT / Consulting (No external costs)',
  es_cost_10: '10% — Software, Coworking, Gestoría & Equipment',
  es_cost_20: '20% — Higher Operating & Subcontracting Costs',
  es_desc_rules:
    '<strong class="tt-head">Spain — Autónomo EDS &amp; RETA (2026)</strong>Spain has no generous flat-expense regime for services: <em>Estimación Directa Simplificada</em> (up to 600,000 €) deducts documented costs + RETA social security + <strong>5% gastos de difícil justificación (max 2,000 €/yr)</strong>. 2026 RETA scales across 15 real-income brackets (205.88 €–607.35 €/mo min at 31.5% incl. 0.9% MEI, or 80 €/mo Year-1 Tarifa Plana). Progressive IRPF (19%–47%) applies 5,550 € personal + family minimums.',
  es_det_op_costs: 'Documented Operating Expenses ({pct}%)',
  es_det_dificil: 'Gastos de difícil justificación (5%, max 2,000 €)',
  es_det_conjunta: 'Joint Spouse Reduction (Declaración conjunta −3,400 €)',
  es_det_reta: 'Seguridad Social RETA ({tramo})',
  es_det_gross_irpf: 'IRPF Tariff Tax (before family relief)',
  es_det_spouse_irpf: 'Joint Spouse IRPF Saving',
  es_det_child_irpf: 'Mínimo por descendientes ({n}× child IRPF cut)',
  es_alert_vat:
    '<strong>Mandatory 21% IVA Note:</strong> Spain has <strong>no small-business VAT exemption (0 € threshold)</strong> in 2026 — domestic invoices carry 21% IVA (quarterly Modelo 303), while intra-EU B2B via ROI/VIES uses 0% reverse charge.',
  es_alert_breach:
    '<strong>Exceeds 600,000 € EDS Cap:</strong> Turnover exceeds the 600,000 € ceiling for Estimación Directa Simplificada (transitions to Estimación Directa Normal).',

  // Compare All Arena & Meta-Comparison
  arena_title: 'Cross-Border Arena: Slovenia vs. 8 EU Countries (2026)',
  arena_subtitle: 'Live ranking of net take-home pay and total tax/social burden across 9 EU jurisdictions at identical EUR revenue.',
  persona_title: 'Apples-to-Apples Persona Filter',
  desc_persona:
    '<strong class="tt-head">Synchronized 9-Country Persona</strong>Aligns employment basis, startup reliefs (SI −50% PIZ, IT 5% tax, HR HOK, PL Ulga na start, CZ startup floor, SK Year-1 social holiday, ES 80 € Tarifa Plana), and client type across all 9 countries.<span class="tt-gap"></span><strong>B2B vs. B2C:</strong> In B2B, EU reverse-charge keeps VAT price-neutral, while Hungary’s KATA is banned. Switching to B2C unlocks Hungary KATA (full-time, ≤45k €) and flags each country’s domestic consumer VAT ceiling (0 € ES to 85k € IT).',
  persona_preset: 'Synchronized Persona',
  persona_custom: 'My Custom Tab Settings',
  persona_full: 'Full-time',
  persona_side: 'Side-job',
  persona_est: 'Established (4th+ Year)',
  persona_new: 'New Startup (Year 1)',
  persona_b2b: 'B2B (Companies)',
  persona_b2c: 'B2C (Private Clients)',
  persona_client_label: 'Client Type',
  persona_note_b2b:
    '<strong>B2B (Companies):</strong> VAT is price-neutral (EU reverse-charge / deductible input VAT). Hungary’s 50,000 Ft/mo <strong>KATA</strong> regime is legally banned for B2B invoicing.',
  persona_note_b2c:
    '<strong>B2C (Private Clients):</strong> Unlocks Hungary’s <strong>KATA</strong> flat tax (full-time, ≤45k €) and flags domestic VAT-free ceilings (0 € ES · 50k € HU/SK · 55k € AT · 56k € PL · 60k € SI/HR · 79k € CZ · 85k € IT) above which consumer VAT applies.',
  persona_custom_note:
    'Using each country tab’s custom settings, combined with the selected Client Type and Household settings above.',
  region_filter_label: 'Matrix Scope',
  region_all: 'All 9 Countries',
  region_neighbours: 'SI + Neighbours (5)',
  region_expansion: 'SI + PL · CZ · SK · ES (5)',

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
  per_yr: '/yr',
  per_mo: '/mo',

  // Comparison View Badge, Pill & Header Tooltips
  desc_arena_eff:
    '<strong class="tt-head">Effective Total Burden (% of Gross)</strong><code>(Income Tax + Social Contributions) ÷ Gross Revenue</code><span class="tt-gap"></span>Includes local taxes (HU HIPA), chamber fees (HR HOK), and any dependent spouse healthcare fees, net of applicable child &amp; sole-earner tax/TBJ credits.',
  desc_arena_delta:
    '<strong class="tt-head">Net Take-Home Delta vs. Slovenia (ZPZR Now)</strong>Shows your net take-home gain (green) or loss (red) in the selected period (Monthly or Yearly) compared to Slovenia’s currently enacted 2026 ZPZR Normiranec law at identical gross EUR revenue and household settings.',
  tip_fam_si_spouse:
    '<strong class="tt-head">Slovenia Normiranec — Household ({delta}{per})</strong><strong>Tax relief: 0.00 €</strong> — ZDoh-2 Art. 59(2) bars dependent child and spouse tax allowances under flat-expense cedular taxation.<span class="tt-gap"></span><strong>Spouse healthcare: −{spouseOzp}{per}</strong> — Children and basic ZZZS dependent spouse coverage (M-DČ) cost 0.00 €, while a non-working spouse owes mandatory <strong>OZP (39.36 €/mo)</strong> under ZZVZZ Art. 24a.',
  tip_fam_si_kids:
    '<strong class="tt-head">Slovenia Normiranec — Household (0.00 €{per})</strong><strong>Child tax relief: 0.00 €</strong> — Under ZDoh-2 Art. 59(2), the final 20%/35% cedular tax grants no dependent child deductions ({kids}×) against business revenue (Afternoon S.P. holders claim them on employment salary).<span class="tt-gap"></span><strong>Healthcare: 0.00 €</strong> — Dependent children are co-insured via ZZZS free of charge.',
  tip_fam_hr:
    '<strong class="tt-head">Croatia Paušalni obrt — Household (0.00 €{per})</strong><strong>Tax relief: 0.00 €</strong> — Fixed PO-SD lump-sum tax brackets do not permit personal dependent tax allowances (<em>osobni odbitak</em> applies only to progressive income).<span class="tt-gap"></span><strong>Healthcare: 0.00 €</strong> — Dependent children and an unemployed resident spouse receive free HZZO public health co-insurance.',
  tip_fam_it:
    '<strong class="tt-head">Italy Regime Forfettario — Household (0.00 €{per})</strong><strong>Tax relief: 0.00 €</strong> — Electing the 5%/15% substitute tax forfeits progressive IRPEF family deductions (<em>carichi di famiglia</em>).<span class="tt-gap"></span><strong>Healthcare: 0.00 €</strong> — Resident dependent spouse and children are covered free under SSN public healthcare (universal <em>Assegno Unico</em> child benefit is paid separately by INPS).',
  tip_fam_at_credits:
    '<strong class="tt-head">Austria Pauschalierung — Household ({delta}{per})</strong>Tariff income tax (<strong>{grossTax}{per}</strong>) is offset euro-for-euro by:<span class="tt-gap"></span>• <strong>Familienbonus Plus:</strong> +{fb}{per} (§ 33 Abs. 3a EStG)<br>• <strong>Sole-Earner Credit (AVAB):</strong> +{avab}{per} (§ 33 Abs. 4 Z 1 EStG)<br>• <strong>Remaining ESt:</strong> {netTax}{per}<br>• <strong>SVS Spouse Fee:</strong> 0.00 € (waived for child-rearing under § 51d GSVG)',
  tip_fam_at_waived:
    '<strong class="tt-head">Austria Pauschalierung — Household (0.00 €{per})</strong><strong>Tax credits: 0.00 €</strong> — Sole-earner credit (AVAB) requires at least 1 child receiving <em>Familienbeihilfe</em>.<span class="tt-gap"></span><strong>SVS Spouse Fee: 0.00 €</strong> — The +3.4% SVS spouse co-insurance surcharge (§ 51d GSVG) is waived due to ≥4 years of prior child-rearing.',
  tip_fam_at_svs:
    '<strong class="tt-head">Austria Pauschalierung — Household ({delta}{per})</strong><strong>SVS Spouse Co-Insurance: −{svsFee}{per}</strong> — Co-insuring a childless non-working spouse adds a +3.4% GSVG health surcharge (§ 51d GSVG; AVAB requires ≥1 child).<span class="tt-gap"></span><strong>Tax deductibility offset: +{taxSaved}{per}</strong> — Because mandatory SVS contributions reduce taxable profit, progressive ESt drops by {taxSaved}{per}.',
  tip_fam_hu_ata:
    '<strong class="tt-head">Hungary Átalányadó — Household ({delta}{per})</strong>2026 doubled family allowance (Szja tv. 29/A. § &amp; Tbj. 34. §) &amp; spouse health coverage:<span class="tt-gap"></span>• <strong>15% SZJA Tax Offset:</strong> +{szjaCred}{per}<br>• <strong>18.5% TBJ Spillover Offset:</strong> +{tbjCred}{per}<br>• <strong>Spouse Health Fee (12,300 Ft/mo):</strong> −{spouseFee}{per}',
  tip_fam_hu_kata:
    '<strong class="tt-head">Hungary New KATA — Household ({delta}{per})</strong><strong>Child tax/TBJ credit: 0.00 €</strong> — The flat 50,000 Ft/mo itemized KATA tax cannot be reduced by family tax or contribution credits.<span class="tt-gap"></span><strong>Spouse Health Fee: −{spouseFee}{per}</strong> — An uninsured non-working spouse owes mandatory health coverage of 12,300 Ft/mo (147,600 Ft/yr).',
  tip_fam_pl_ryczalt:
    '<strong class="tt-head">Poland {regime} — Household (0.00 €{per})</strong><strong>Tax relief: 0.00 €</strong> — Lump-sum <em>Ryczałt</em> and 19% <em>Liniowy</em> do not grant child tax credits or joint spouse tax splitting (available on <em>Skala 12%/32%</em> in the Poland calculator).<span class="tt-gap"></span><strong>Healthcare: 0.00 €</strong> — Non-working spouse and children receive free NFZ public health co-insurance (<em>ZCNA</em>).',
  tip_fam_pl_skala:
    '<strong class="tt-head">Poland Skala (12%/32%) — Household ({delta}{per})</strong>• <strong>Joint Spouse Splitting:</strong> +{spouseCred}{per} (doubles 30,000 zł 0% allowance &amp; 120,000 zł bracket)<br>• <strong>Ulga na dzieci (Child Credit):</strong> +{childCred}{per}<br>• <strong>NFZ Family Healthcare (ZCNA):</strong> 0.00 € extra cost',
  tip_fam_cz_pausal:
    '<strong class="tt-head">Czechia Paušální daň — Household ({delta}{per})</strong><strong>Tax credits: 0.00 €</strong> — Fixed monthly Paušální daň bands forfeit child and spouse tax credits (Auto-Optimal switches to 60% Výdaje whenever family credits yield higher net!).<span class="tt-gap"></span><strong>Spouse Health (OBZP): −{spouseFee}{per}</strong> — From 2026, a non-working spouse not caring for a child &lt;7 yrs owes 3,024 Kč/mo VZP health fee.',
  tip_fam_cz_vydaje:
    '<strong class="tt-head">Czechia OSVČ Výdaje — Household ({delta}{per})</strong>• <strong>Child Tax Credit (Daňové zvýhodnění):</strong> +{childCred}{per}<br>• <strong>Spouse Credit (child &lt;3):</strong> +{spouseCred}{per}<br>• <strong>Spouse OBZP Health Fee:</strong> −{spouseFee}{per} (3,024 Kč/mo unless caring for child &lt;7)',
  tip_fam_sk:
    '<strong class="tt-head">Slovakia SZČO — Household ({delta}{per})</strong>• <strong>Child Tax Bonus (Daňový bonus):</strong> +{childCred}{per} (1,200 €/yr per child &lt;15, ČZD-capped)<br>• <strong>Spouse NČZD Tax Saving:</strong> +{spouseCred}{per} (up to 5,455.30 € base deduction)<br>• <strong>Spouse Health ZP:</strong> −{spouseFee}{per} (121.92 €/mo if childless / non-qualifying)',
  tip_fam_es:
    '<strong class="tt-head">Spain Autónomo — Household ({delta}{per})</strong>• <strong>Joint Spouse Filing (Declaración conjunta):</strong> +{spouseCred}{per} (3,400 €/yr IRPF base reduction)<br>• <strong>Mínimo por descendientes:</strong> +{childCred}{per} (2,400–4,500 €/child exempt at bottom IRPF rates)<br>• <strong>SNS Family Healthcare:</strong> 0.00 € universal coverage',
  tip_status_eligible:
    '<strong class="tt-head">{country} — {regime} (Eligible)</strong>Gross revenue (<strong>{rev}{per}</strong>) is within the statutory ceiling of <strong>{limit}{per}</strong> and satisfies all selected employment and client-type criteria, so this regime is actively ranked.',
  tip_status_proposed:
    '<strong class="tt-head">Slovenia ZIURS — Dec 6, 2026 Referendum</strong>Adopted by Parliament on May 11, 2026 and currently suspended pending the December 6, 2026 legislative referendum. Raises caps to <strong>150,000 €/yr</strong> (full-time, ≥5 mo insurance) and <strong>70,000 €/yr</strong> (afternoon) with progressive 80% / 70% / 40% expenses (active cap: <strong>{limit}{per}</strong>).',
  tip_status_b2c_only:
    '<strong class="tt-head">Disqualified for B2B — Private Clients Only</strong>Under Hungary’s New KATA Act (2022. évi XIII. tv.), issuing even a single invoice to a company or legal entity (<em>kifizető</em>, except taxi services) immediately terminates KATA status. Switch Client Type above to <strong>B2C (Private Clients)</strong> to rank KATA.',
  tip_status_fulltime_only:
    '<strong class="tt-head">Disqualified for Side-Job — Full-Time Only</strong>Hungarian New KATA (2022. évi XIII. tv.) is legally restricted to primary full-time sole proprietors (<em>főállású kisadózó</em>). Entrepreneurs with ≥36h/wk employment elsewhere must use <strong>Átalányadó</strong>.',
  tip_status_fulltime_only_cz:
    '<strong class="tt-head">Disqualified for Side-Job — Full-Time OSVČ Only</strong>Under Czech Income Tax Act § 2a, entrepreneurs with concurrent salaried employment income cannot opt into <em>Paušální daň</em>; they use <strong>60% Paušální výdaje</strong> instead.',
  tip_over_cap_si:
    '<strong class="tt-head">Slovenia {regime} — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds the {limit}{per} ceiling. Excess tax base is taxed at <strong>35%</strong> (instead of 20%), and exceeding the cap on a 2-year average forces exit to real-expense accounting next year.',
  tip_over_cap_hr:
    '<strong class="tt-head">Croatia Paušalni obrt — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) breaches Croatia’s hard 60,000 €/yr ceiling, triggering mandatory <strong>25% PDV (VAT)</strong> registration and immediate transition to real-expense bookkeeping (<em>Dohodak</em>).',
  tip_over_cap_it:
    '<strong class="tt-head">Italy Forfettario — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds the 85,000 €/yr ceiling: 85k–100k € forces exit to progressive IRPEF + 22% IVA next year, while exceeding <strong>100,000 €/yr</strong> terminates Forfettario immediately mid-year with 22% IVA.',
  tip_over_cap_at:
    '<strong class="tt-head">Austria {regime} — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds the selected § 17 EStG ceiling of <strong>{limit}{per}</strong>, requiring transition to Basispauschalierung (up to 420k €/yr) or actual-expense accounting (<em>E/A-Rechnung</em>).',
  tip_over_cap_hu_ata:
    '<strong class="tt-head">Hungary Átalányadó — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds 10× the annual minimum wage (38,736,000 Ft ≈ {limit}{per}), disqualifying flat-expense taxation and requiring standard entrepreneurial accounting (<em>Vállalkozói SZJA</em>).',
  tip_over_cap_hu_kata:
    '<strong class="tt-head">Hungary KATA — Exceeds {limit}{per} Quota</strong>Revenue (<strong>{rev}{per}</strong>) exceeds the 18,000,000 Ft/yr (≈ {limit}{per}) KATA quota; all excess turnover is hit with a <strong>40% KATA surtax</strong> on top of the 50,000 Ft/mo flat tax.',
  tip_over_cap_pl:
    '<strong class="tt-head">Poland Ryczałt — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds Poland’s 2,000,000 €/yr statutory ceiling for lump-sum <em>Ryczałt</em> taxation, requiring transition to 19% <em>Podatek liniowy</em> or <em>Skala podatkowa</em>.',
  tip_over_cap_cz:
    '<strong class="tt-head">Czechia Paušální daň — Exceeds {limit}{per} Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds Czechia’s 2,000,000 Kč/yr ceiling for <em>Paušální daň</em> and triggers mandatory 21% DPH registration, requiring standard OSVČ taxation.',
  tip_over_cap_sk:
    '<strong class="tt-head">Slovakia SZČO — Exceeds {limit}{per} 15%-Tax Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds Slovakia’s 100,000 €/yr threshold for the reduced 15% SZČO income tax rate; taxable base shifts to 2026 progressive brackets (19%–35%).',
  tip_over_cap_es:
    '<strong class="tt-head">Spain Autónomo — Exceeds {limit}{per} EDS Cap</strong>Revenue (<strong>{rev}{per}</strong>) exceeds Spain’s 600,000 €/yr ceiling for <em>Estimación Directa Simplificada</em>, requiring mercantile accounting under <em>Estimación Directa Normal</em>.',
  tip_b2c_vat_free:
    '<strong class="tt-head">{country} — B2C VAT-Exempt (≤{limit}{per})</strong>Revenue (<strong>{rev}{per}</strong>) stays within {country}’s domestic small-business VAT ceiling (<strong>{limit}{per}</strong>). You charge <strong>0% VAT</strong> to private consumers instead of {rate}% standard VAT.',
  tip_b2c_vat_req:
    '<strong class="tt-head">{country} — Mandatory +{rate}% Consumer VAT</strong>Revenue (<strong>{rev}{per}</strong>) exceeds {country}’s domestic VAT-free ceiling (<strong>{limit}{per}</strong>), triggering mandatory <strong>{rate}% VAT</strong>. Because private B2C clients cannot deduct VAT, this raises consumer prices by +{rate}% or compresses your margin.',
  tip_delta_baseline:
    '<strong class="tt-head">Benchmark — Slovenia Current Law (ZPZR 2026)</strong><strong>{net}{per}</strong> net take-home (<strong>{eff}</strong> total burden). All +/- figures in this column measure how much more or less net income you keep compared to Slovenia’s currently enacted Normiranec law.',
  tip_delta_vs_si:
    '<strong class="tt-head">{country} ({regime}) vs. Slovenia Now</strong>• <strong>{country} Net:</strong> {net}{per} ({eff} burden)<br>• <strong>Slovenia (ZPZR) Net:</strong> {baseNet}{per} ({baseEff} burden)<span class="tt-gap"></span>Net difference: <strong>{delta}{per}</strong> at identical gross EUR revenue and household settings.',
  tip_si_cap_zpzr:
    '<strong class="tt-head">Current Law (ZPZR 2026) Revenue Cap</strong>Annual / 2-year average exit ceiling is <strong>{limit}/yr</strong> (requires ≥9 continuous months of full-time insurance for the 120k € tier; excess tax base above the cap is taxed at 35%).',
  tip_si_cap_ziurs:
    '<strong class="tt-head">Proposed ZIURS Revenue Cap</strong>Raises the exit ceiling to <strong>{limit}/yr</strong> (150k € full-time with eased ≥5-month insurance rule; 70k € afternoon), currently suspended pending the Dec 6, 2026 referendum.',
  tip_si_cap_diff:
    '<strong class="tt-head">ZIURS Cap Expansion (+{diff}/yr)</strong>Expands the permitted Normiranec revenue ceiling by <strong>+{diff}/yr</strong> and shortens the full-time qualifying insurance threshold from 9 continuous months to 5 months.',

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

  // Accessibility & Screen-Reader Announcements
  skip_to_calc: 'Skip to calculator',
  aria_countries_nav: 'Countries and Cross-Border Comparison',
  aria_billing_period: 'Billing Period',
  aria_si_regime_group: 'Slovenia Tax Regime',
  aria_info_about: 'Details: {topic}',
  aria_decrease: 'Decrease {label}',
  aria_increase: 'Increase {label}',
  aria_alloc_bar: 'Revenue allocation: {netPct} net take-home, {socPct} social contributions, {taxPct} income tax',
  tbl_si_cmp_caption: 'Slovenia 2026 Normiranec comparison: Current Law (ZPZR) versus Proposed ZIURS',
  tbl_arena_caption: '2026 European sole-proprietor net take-home comparison across 9 countries',
  svg_chart_valuetext: 'Revenue {rev}: Current Law {zpzr} burden, Proposed ZIURS {ziurs} burden',
  sr_live_single: '{country}: Net take-home {net}{per} ({eff} effective burden)',
  sr_live_si_cmp: 'Slovenia Compare: Current Law {zpzr}{per}, Proposed ZIURS {ziurs}{per} ({diff})',
  sr_live_arena: 'Compare All at {gross}{per}: Top eligible regime {winner} with {net} net',

  // Country Parameter & Household Statutory Tooltips (9 Countries)
  desc_si_man_base:
    '<strong class="tt-head">Voluntary Manual Insurance Base — ZPIZ-2 Art. 145(6)</strong>Allows electing a custom monthly contribution base clamped between <strong>60%</strong> (1,521.62 €/mo) and <strong>350%</strong> (8,876.11 €/mo) of the 2025 SURS average wage (2,536.03 €). Raising the base increases future pension and sick-leave benefits at a 40.20% social rate (+ fixed 39.36 €/mo OZP); lowering below your assessed profit base requires a formal FURS profit-drop petition (up to −20%).',

  hr_desc_emp:
    '<strong class="tt-head">Croatia — Primary Obrt vs. Side-Job</strong><strong>Primary / Full-time:</strong> Pays mandatory fixed monthly contributions of <strong>290.98 €/mo</strong> (3,491.76 €/yr) on the 2026 797.20 € statutory base (15% MIO I + 5% MIO II + 16.5% HZZO health).<span class="tt-gap"></span><strong>Side-job (uz radni odnos):</strong> When insured full-time via an employer, monthly advances drop to 0 € and annual contributions fall to <strong>17.5%</strong> of your bracket’s flat 15% tax base (296.63 €–1,575.00 €/yr).',
  hr_desc_hok:
    '<strong class="tt-head">HOK Chamber of Trades Fee — Zakon o obrtu Art. 77</strong>Registered Croatian sole traders pay a flat quarterly membership fee to <em>Hrvatska obrtnička komora (HOK)</em> equal to <strong>11.40 €/mo</strong> (34.20 €/qtr = 136.80 €/yr). First-time <em>obrt</em> registrants are statutorily <strong>exempt for their first 2 calendar years</strong>.',
  desc_hr_family:
    '<strong class="tt-head">Croatia Paušalni obrt — Household &amp; HZZO</strong>Because PO-SD tax is assessed on fixed lump-sum brackets (12% on 15% of bracket ceiling), personal dependent allowances (<em>osobni odbitak</em>) cannot reduce Paušalni tax (<strong>0 €</strong> tax relief; side-jobbers claim them on salary).<span class="tt-gap"></span>Dependent children and an unemployed resident spouse receive free HZZO public healthcare co-insurance (<strong>0 €</strong> extra cost).',

  it_desc_tax:
    '<strong class="tt-head">Italy — 5% Startup vs. 15% Standard Substitute Tax</strong><strong>5% Startup Rate (First 5 years):</strong> Requires a genuinely new activity — you must not have run a business/profession in the prior 3 years, and the activity cannot merely continue a prior employment or self-employment role (Legge 190/2014 Art. 1 c. 65).<span class="tt-gap"></span><strong>15% Standard Rate:</strong> Applies from Year 6 onward or whenever startup anti-continuation rules are not met.',
  it_desc_activity:
    '<strong class="tt-head">ATECO Profitability Coefficient (Coefficiente di redditività)</strong>Regime Forfettario ignores actual expense receipts and sets gross taxable income to <code>Revenue × ATECO %</code>:<span class="tt-gap"></span>• <strong>67%</strong> (33% flat expenses): Software &amp; IT (ATECO 62.01/62.02) and general artisans<br>• <strong>78%</strong> (22% flat expenses): Freelance professionals, consultants, engineers &amp; designers<br>• <strong>40%</strong> (60% flat expenses): Retail, e-commerce &amp; hospitality',
  it_desc_inps:
    '<strong class="tt-head">INPS Social Security Fund Selection (2026)</strong><strong>Gestione Separata (26.07% full-time / 24.00% side-job):</strong> For unlicensed freelancers, IT consultants &amp; professionals. Has <strong>0 € fixed minimum floor</strong> — scales strictly with ATECO profit up to 120,607 €.<span class="tt-gap"></span><strong>Artigiani (24%) &amp; Commercianti (24.48%):</strong> Chamber-registered trades/e-commerce owe a mandatory fixed minimum (~4,521 € / 4,612 € on 18,808 € <em>minimale</em>) plus variable % above 18,808 €. Paid INPS is deducted before the 5%/15% tax.',
  it_desc_discount:
    '<strong class="tt-head">Optional −35% Forfettario INPS Reduction</strong>Chamber-registered <em>Artigiani</em> and <em>Commercianti</em> in Regime Forfettario may elect a <strong>−35% discount</strong> on both fixed minimum and variable INPS contributions.<span class="tt-gap"></span><strong>Pension trade-off:</strong> If reduced annual payments fall below the full 18,808 € <em>minimale</em> contribution, INPS credits proportionally fewer pension months (~7.8 instead of 12 months/yr).',
  desc_it_family:
    '<strong class="tt-head">Italy Regime Forfettario — Household &amp; SSN</strong>Electing the 5%/15% substitute tax replaces progressive IRPEF and forfeits dependent tax deductions (<em>detrazioni per carichi di famiglia</em> = <strong>0 €</strong> tax cut).<span class="tt-gap"></span>Resident children and a non-working spouse receive free universal healthcare under <em>Servizio Sanitario Nazionale (SSN)</em> (<strong>0 €</strong>). Families apply separately to INPS for the universal tax-free <em>Assegno Unico</em> child allowance.',

  at_desc_scheme:
    '<strong class="tt-head">Austria — § 17 EStG Flat-Rate Schemes (2026)</strong><strong>Auto-Optimal:</strong> Picks the eligible scheme yielding higher net pay.<span class="tt-gap"></span><strong>Kleinunternehmerpauschalierung (§ 17 Abs. 3a):</strong> Up to 55,000 € (60,500 € tolerance, coupled with USt VAT exemption); deducts <strong>20%</strong> services (max 11,000 €) or <strong>45%</strong> goods (max 24,750 €).<span class="tt-gap"></span><strong>Basispauschalierung (§ 17 Abs. 1):</strong> Up to 420,000 €; deducts <strong>6%</strong> consulting/IT (max 25,200 €) or <strong>15%</strong> general/trade (max 63,000 €). Both deduct SVS + 15% <em>Grundfreibetrag</em>.',
  at_desc_activity:
    '<strong class="tt-head">Austrian Flat-Expense Activity Tier</strong>Determines the statutory flat expense ratio before SVS and <em>Grundfreibetrag</em>:<span class="tt-gap"></span>• <strong>IT / Consulting / Services:</strong> <strong>20%</strong> under Kleinunternehmerpauschalierung, or <strong>6%</strong> (<em>Beratung/IT</em>) under Basispauschalierung.<br>• <strong>Trade / Manufacturing:</strong> <strong>45%</strong> under Kleinunternehmerpauschalierung, or <strong>15%</strong> under Basispauschalierung.',
  at_desc_emp:
    '<strong class="tt-head">Austria — Full-Time GSVG vs. Side-Job (ASVG + GSVG)</strong><strong>Primary / Full-time:</strong> Pays GSVG SVS (26.83% = 18.5% PV + 6.8% KV + 1.53% BMSVG on 6,613.20 €–97,020 € annual base + 144.84 €/yr accident UV).<span class="tt-gap"></span><strong>Side-job:</strong> With concurrent ASVG employment, if annual business profit stays ≤6,613.20 € (<em>Versicherungsgrenze</em>) and turnover ≤55,000 €, you can opt out of PV/KV and pay <strong>UV only (12.07 €/mo)</strong>; above 6,613.20 €, full SVS applies.',
  at_desc_spouse_waiver:
    '<strong class="tt-head">SVS Spouse Co-Insurance (+3.4% Mitversicherung)</strong>Co-insuring a childless non-working spouse under GSVG § 51d / § 83 normally adds a <strong>+3.4% SVS health surcharge</strong> on the entrepreneur’s KV base.<span class="tt-gap"></span>Select <strong>Waived (0%)</strong> if your spouse previously raised children for at least 4 years, receives care allowance (<em>Pflegegeld</em> ≥ Level 3), or provides qualifying care.',
  desc_at_family:
    '<strong class="tt-head">Austria Pauschalierung — Family Tax Credits &amp; SVS</strong>Progressive Austrian ESt (0%–55%) grants direct euro-for-euro credits:<span class="tt-gap"></span>• <strong>Familienbonus Plus:</strong> up to <strong>2,000.16 €/yr</strong> per child &lt;18<br>• <strong>Sole-Earner Credit (AVAB):</strong> 612 € (1 child), 828 € (2), +273 € per extra child when ≥1 child and spouse earns ≤7,411 €<br>• <strong>SVS Healthcare:</strong> 0 € for children &amp; parents; +3.4% KV surcharge for a childless uninsured spouse unless waived.',

  hu_desc_regime:
    '<strong class="tt-head">Hungary — Átalányadó vs. New KATA (2026)</strong><strong>Átalányadó (Flat-Rate Expenses):</strong> Open to both <strong>B2B (companies) and B2C</strong> up to 38,736,000 Ft/yr (193.68M Ft retail), with 45%/80%/90% flat expenses and a 1,936,800 Ft tax-free profit band.<span class="tt-gap"></span><strong>New KATA (50,000 Ft/mo):</strong> Covers tax + social security up to 18,000,000 Ft/yr, but is strictly restricted to <strong>full-time sole proprietors invoicing private consumers (B2C only)</strong> — a single B2B invoice voids KATA.',
  hu_desc_fx:
    '<strong class="tt-head">EUR / HUF Exchange Rate Impact</strong>Converts your EUR revenue against Hungary’s HUF statutory thresholds: <strong>1,936,800 Ft</strong> tax-free profit band, <strong>18,000,000 Ft</strong> KATA quota, <strong>20,000,000 Ft</strong> <em>Alanyi adómentesség</em> (27% ÁFA exemption), and <strong>38,736,000 Ft</strong> general Átalányadó ceiling.',
  hu_desc_emp:
    '<strong class="tt-head">Hungary — Full-Time (Főállású) vs. Side-Job (Mellékállású)</strong><strong>Full-time:</strong> Owes monthly minimum TBJ (18.5%) and SZOCHO (13% on a 100% base in 2026 — the 112.5% multiplier was repealed) on the statutory wage floor even when profit falls inside the tax-free band.<span class="tt-gap"></span><strong>Side-job (≥36h/wk employment):</strong> Waives the monthly minimum contribution floor — inside the 1,936,800 Ft exempt profit band (~3.52M Ft revenue at 45% expenses), SZJA, TBJ, and SZOCHO are all <strong>0 Ft</strong>.',
  hu_desc_expense:
    '<strong class="tt-head">Statutory Átalányadó Expense Tiers (Szja tv. 53. §)</strong>Deducted automatically from gross revenue without expense receipts:<span class="tt-gap"></span>• <strong>45%</strong> (raised from 40% in 2026): General services, IT, software, consulting &amp; professional work<br>• <strong>80%</strong>: Listed skilled trades, construction, manufacturing, transport &amp; photography<br>• <strong>90%</strong>: Retail goods trade only (up to 50× annual minimum wage)',
  hu_desc_wage:
    '<strong class="tt-head">Minimum Contribution Wage Floor (2026)</strong>Sets the monthly minimum TBJ (18.5%) and SZOCHO (13%) base for full-time <em>Átalányadó</em>:<span class="tt-gap"></span>• <strong>Garantált bérminimum (373,200 Ft/mo):</strong> Mandatory when your registered FEOR activity requires secondary or university qualification (applies to IT, engineering &amp; consulting).<br>• <strong>Minimálbér (322,800 Ft/mo):</strong> Applies only to activities not requiring formal qualification.',
  hu_desc_hipa:
    '<strong class="tt-head">Local Municipal Business Tax — HIPA (Iparűzési adó)</strong>Levied by Hungarian municipalities (up to 2%):<span class="tt-gap"></span>• <strong>Simplified Banded (Sávos):</strong> Fixed annual payment of <strong>50,000 Ft</strong> (≤12M Ft revenue), <strong>120,000 Ft</strong> (12M–18M Ft), or <strong>170,000 Ft</strong> (18M–25M Ft) with zero base calculation.<br>• <strong>Standard 2%:</strong> Assessed on 120% of Átalányadó net income.<br>• <strong>0% Municipality:</strong> Models HIPA-free municipalities.',
  desc_hu_family:
    '<strong class="tt-head">Hungary — Doubled 2026 Family Credit &amp; Spouse Fee</strong><strong>Átalányadó:</strong> Unlocks Hungary’s doubled 2026 <em>Családi kedvezmény</em> against both 15% SZJA and 18.5% TBJ (saving up to <strong>20,001 Ft/mo</strong> for 1 child, <strong>79,998 Ft/mo</strong> for 2, <strong>198,000 Ft/mo</strong> for 3). <strong>KATA:</strong> 0 Ft family credit.<span class="tt-gap"></span>Hungary grants 0 Ft spouse tax credit, and an uninsured non-working spouse owes mandatory NEAK health fee (<strong>12,300 Ft/mo</strong> = 147,600 Ft/yr).',

  pl_desc_regime:
    '<strong class="tt-head">Poland — JDG Tax Regimes (Forma opodatkowania)</strong><strong>Ryczałt (up to 2M €):</strong> Flat PKWiU rate (8.5%–15%) on gross revenue minus social ZUS &amp; 50% of 3-tier fixed NFZ health (498.35 / 830.58 / 1,495.04 zł/mo). Zero cost receipts needed.<span class="tt-gap"></span><strong>Skala (12% / 32%):</strong> 30,000 zł tax-free band, 12% up to 120,000 zł, 32% above + 9% NFZ; unlocks <strong>joint spouse splitting &amp; child credits</strong>.<span class="tt-gap"></span><strong>Podatek liniowy (19%):</strong> Flat 19% + 4.9% NFZ (deductible up to 14,100 zł/yr); no family credits.',
  pl_desc_rate:
    '<strong class="tt-head">Poland — Ryczałt PKWiU Service Rates</strong>Your flat revenue tax rate depends on official PKWiU service classification:<span class="tt-gap"></span>• <strong>12%</strong>: Software development, coding, DevOps &amp; IT system consulting (PKWiU 62)<br>• <strong>8.5%</strong>: General services, manual QA, non-coding PM/BA &amp; administrative support<br>• <strong>14%</strong>: Architecture, civil/industrial engineering &amp; specialized design (PKWiU 71)<br>• <strong>15%</strong>: Management consulting, marketing, advertising &amp; recruitment',
  pl_desc_fx:
    '<strong class="tt-head">EUR / PLN Exchange Rate Impact</strong>Converts EUR revenue against Poland’s PLN thresholds: the upgraded 2026 <strong>240,000 zł</strong> VAT exemption limit (<em>zwolnienie z VAT</em>, raised from 200k zł), <em>Ryczałt</em> NFZ health tiers (<strong>60,000 zł</strong> &amp; <strong>300,000 zł</strong>), and <em>Skala</em> 30,000 zł / 120,000 zł tax brackets.',
  pl_desc_emp:
    '<strong class="tt-head">Poland — Full-Time JDG vs. Side-Job (Zbieg tytułów)</strong><strong>Full-time JDG:</strong> Pays mandatory ZUS social contributions according to your ZUS stage plus NFZ health insurance.<span class="tt-gap"></span><strong>Side-job (Employed elsewhere):</strong> Under <em>zbieg tytułów ubezpieczeń</em>, holding an employment contract paying at least the 2026 minimum wage (<strong>≥4,806 zł/mo</strong> gross) exempts your JDG from social ZUS (<strong>0 zł</strong>) — only NFZ health and PIT apply.',
  pl_desc_zus:
    '<strong class="tt-head">3-Stage ZUS Social Security Ramp (2026)</strong>New Polish JDG founders (not working for a former employer) ramp up over 30 months (excl. optional sickness <em>chorobowe</em>):<span class="tt-gap"></span>• <strong>Year 1 (Ulga na start + Preferencyjny):</strong> 0 zł social ZUS for months 1–6, then 420.86 zł/mo for months 7–12 (2,525.16 zł/yr).<br>• <strong>Months 7–30 (Preferencyjny ZUS):</strong> <strong>420.86 zł/mo</strong> on 30% of minimum wage (1,441.80 zł base).<br>• <strong>Standard (Duży ZUS):</strong> <strong>1,788.29 zł/mo</strong> on 60% of forecast avg wage (5,652.00 zł base).',
  desc_pl_family:
    '<strong class="tt-head">Poland JDG — Joint Spouse Splitting, Kids &amp; NFZ</strong><strong>Skala podatkowa (12%/32%):</strong> Unlocks <em>wspólne rozliczenie</em> with a non-working spouse (doubling the 0% band to <strong>60,000 zł</strong> and the 12% bracket to <strong>240,000 zł</strong>) plus <em>Ulga na dzieci</em> (1,112 / 1,112 / 2,000 / 2,700 zł/yr). <em>Ryczałt</em> and <em>Liniowy</em> grant 0 zł tax credits.<span class="tt-gap"></span>On <strong>all 3 regimes</strong>, registering a non-working spouse and children via ZUS ZCNA gives <strong>free NFZ healthcare (0 zł)</strong>.',

  cz_desc_regime:
    '<strong class="tt-head">Czechia — Paušální daň vs. Výdajový paušál (2026)</strong><strong>Auto-Optimal:</strong> Picks whichever eligible regime yields higher net income (automatically switching to <em>Výdaje</em> when family credits beat Band 1/2).<span class="tt-gap"></span><strong>Paušální daň (≤2,000,000 Kč):</strong> Single fixed monthly payment (9,162 / 16,745 / 27,139 Kč/mo) covering tax + ČSSZ + VZP with zero annual filings; forfeits family credits.<span class="tt-gap"></span><strong>Paušální výdaje (60%/80%/40%):</strong> No revenue eligibility cap; unlocks basic 30,840 Kč + child/spouse tax credits.',
  cz_desc_fx:
    '<strong class="tt-head">EUR / CZK Exchange Rate Impact</strong>Converts EUR revenue against Czechia’s CZK thresholds: <strong>1.0M / 1.5M / 2.0M Kč</strong> <em>Paušální daň</em> band limits, <strong>2,000,000 Kč</strong> mandatory 21% DPH registration cap, 800k / 1.2M / 1.6M Kč flat-expense caps, and 1,762,812 Kč 23% DPFO bracket.',
  cz_desc_expense:
    '<strong class="tt-head">Czech Trade Category &amp; Flat Expense Caps (§ 7 ZDP)</strong>Determines both flat expense percentage (capped on 2M Kč base) and <em>Paušální daň</em> band thresholds:<span class="tt-gap"></span>• <strong>60% (max 1,200,000 Kč):</strong> Free trades (<em>živnost volná</em>) — IT, software, marketing &amp; consulting (Band 1 up to 1.5M Kč).<br>• <strong>80% (max 1,600,000 Kč):</strong> Crafts (<em>řemeslné živnosti</em>) &amp; agriculture (Band 1 up to 2.0M Kč).<br>• <strong>40% (max 800,000 Kč):</strong> Licensed non-trade professions — lawyers, doctors, architects &amp; authors (Band 1 up to 1.0M Kč).',
  cz_desc_emp:
    '<strong class="tt-head">Czechia — Primary (Hlavní) vs. Side-Job (Vedlejší OSVČ)</strong><strong>Primary (Hlavní):</strong> Eligible for <em>Paušální daň</em>, or pays standard ČSSZ/VZP subject to 2026 monthly minimums (5,005 Kč social + 3,306 Kč health).<span class="tt-gap"></span><strong>Side-job (Vedlejší):</strong> Cannot use <em>Paušální daň</em>, waives the VZP minimum floor (paying 13.5% on 50% actual profit), and owes <strong>0 Kč ČSSZ social</strong> if annual profit stays below <strong>117,521 Kč</strong> (<em>rozhodná částka</em>).',
  cz_desc_stage:
    '<strong class="tt-head">Czech ČSSZ Startup Minimum Base Relief (2026)</strong>Under standard <em>Paušální výdaje</em>, <strong>Established OSVČ</strong> pay a minimum ČSSZ social advance of <strong>5,005 Kč/mo</strong> (29.2% on 35% of the 48,967 Kč avg wage).<span class="tt-gap"></span><strong>New Startup OSVČ</strong> (first-time registrants without OSVČ activity in the prior 20 years) pay a reduced 25%-base minimum of <strong>3,575 Kč/mo</strong> in their initial calendar years.',
  cz_desc_spouse_care:
    '<strong class="tt-head">Czech Consolidation Rule — Young-Child Spouse Care</strong>Since Czechia’s consolidation reform, claiming the <strong>24,840 Kč/yr spouse tax credit</strong> (<em>sleva na manželku</em>, spouse income ≤68,000 Kč) requires caring for a child <strong>under age 3</strong>.<span class="tt-gap"></span>Full-time care for a child under age 7 also qualifies the spouse for <strong>state-paid VZP health insurance</strong>, waiving the mandatory <strong>3,024 Kč/mo OBZP</strong> self-payer health fee.',
  desc_cz_family:
    '<strong class="tt-head">Czechia OSVČ — Family Credits &amp; OBZP Health</strong><strong>Paušální daň:</strong> Grants <strong>0 Kč</strong> child or spouse tax credits (§ 2a ZDP).<span class="tt-gap"></span><strong>Paušální výdaje:</strong> Unlocks refundable <em>Daňové zvýhodnění</em> child credits (<strong>15,204 / 22,320 / 27,840 Kč/yr</strong> per child, paid out as a cash tax bonus when exceeding tax) plus <strong>24,840 Kč/yr</strong> spouse credit if caring for a child &lt;3. An uninsured spouse without qualifying childcare owes <strong>3,024 Kč/mo OBZP</strong>.',

  sk_desc_emp:
    '<strong class="tt-head">Slovakia — Full-Time SZČO vs. Side-Job (Popri zamestnaní)</strong><strong>Full-time SZČO:</strong> Owes mandatory ZP health insurance from day 1 (16% in 2026, minimum <strong>121.92 €/mo</strong>) plus <em>Sociálna poisťovňa</em> (33.15%, minimum <strong>303.11 €/mo</strong> once established above 9,144 € revenue).<span class="tt-gap"></span><strong>Side-job:</strong> Concurrent employment waives the 121.92 €/mo ZP minimum floor (paying 16% on actual base only), and SP social remains 0 € if gross business revenue stays ≤9,144 €.',
  sk_desc_stage:
    '<strong class="tt-head">Slovakia — Sociálna poisťovňa Stage (2026)</strong><strong>Established SZČO:</strong> Pays 33.15% social insurance on assessment base (2026 minimum raised to 60% of 1,524 € avg wage = <strong>303.11 €/mo</strong>) whenever gross revenue exceeds 9,144 €.<span class="tt-gap"></span><strong>Year-1 Startup:</strong> Models the initial 0 € social insurance holiday (only 121.92 €/mo ZP health applies). Note: Slovakia’s 2026 consolidation package shortens the first-entry SP holiday for newly opened SZČO to the first 5 months.',
  sk_desc_spouse_care:
    '<strong class="tt-head">Slovakia — Qualifying Spouse Care (§ 11 ods. 4 ZDP)</strong>A non-working spouse qualifies for the <strong>NČZD na manželku/manžela</strong> tax-base deduction (up to <strong>5,455.30 €/yr</strong>) and <strong>state-paid ZP healthcare (0 €)</strong> only when caring for a child under age 3 (or &lt;6 with disability), receiving care allowance, or registered disabled.<span class="tt-gap"></span>Without qualifying care, 0 € NČZD applies and an uninsured spouse owes <strong>121.92 €/mo</strong> self-payer ZP.',
  desc_sk_family:
    '<strong class="tt-head">Slovakia SZČO — Daňový Bonus, Spouse NČZD &amp; ZP</strong>Slovakia’s 60% flat-expense regime (max 20,000 €) preserves full family reliefs:<span class="tt-gap"></span>• <strong>Daňový bonus na dieťa:</strong> up to <strong>1,200 €/yr</strong> (100 €/mo) per child &lt;15, capped at 29%–50% of tax base and phased out above 27,432 € ČZD.<br>• <strong>Spouse NČZD:</strong> up to 5,455.30 € base deduction with qualifying childcare.<br>• <strong>ZP Health:</strong> 0 € for children; <strong>121.92 €/mo</strong> for a non-qualifying uninsured spouse.',

  es_desc_stage:
    '<strong class="tt-head">Spain — RETA Real-Income Brackets vs. Tarifa Plana (2026)</strong><strong>Established (15 Tramos):</strong> Monthly RETA quota scales with net yield at 31.5% (incl. 0.9% MEI), from <strong>205.88 €/mo</strong> (R1 ≤670 €/mo) up to <strong>607.35 €/mo</strong> min base in Tramo 12 (&gt;6,000 €/mo net).<span class="tt-gap"></span><strong>Tarifa Plana (80 €/mo):</strong> Flat 80 €/mo quota during the first 12 months of initial RETA registration.<span class="tt-gap"></span><strong>Cuota Cero (0 €/mo):</strong> 100% Year-1 regional rebate in Madrid, Andalucía, Murcia, Canarias &amp; participating regions.',
  es_desc_cost:
    '<strong class="tt-head">Spain — Documented Expenses + 5% Difícil Justificación</strong>Spain has no high flat-rate deduction for service freelancers. Under <em>Estimación Directa Simplificada</em> (up to 600,000 €), taxable profit deducts:<span class="tt-gap"></span>1. <strong>Documented business costs</strong> (0% / 10% / 20% with valid VAT invoices)<br>2. <strong>100% of paid RETA</strong> social security quotas<br>3. Automatic <strong>5% gastos de difícil justificación</strong> on net yield, capped at <strong>2,000 €/yr</strong>.',
  es_desc_emp:
    '<strong class="tt-head">Spain — Full-Time Autónomo vs. Pluriactividad</strong><strong>Full-time:</strong> RETA is your sole social security regime.<span class="tt-gap"></span><strong>Side-job (Pluriactividad):</strong> Concurrent salaried employment (<em>Régimen General</em>) plus RETA. Monthly RETA quotas remain payable during the year, while TGSS refunds 50% of excess combined common-contingency contributions (up to 50% of paid RETA quotas) if annual dual contributions exceed Spain’s <em>Pluriactividad</em> cap.',
  desc_es_family:
    '<strong class="tt-head">Spain Autónomo — Declaración Conjunta, Kids &amp; SNS</strong>Progressive IRPF (19%–47%) grants two household reliefs:<span class="tt-gap"></span>• <strong>Declaración conjunta (Art. 84 LIRPF):</strong> Joint filing with a non-working spouse deducts <strong>3,400 €/yr</strong> directly from the IRPF tax base.<br>• <strong>Mínimo por descendientes:</strong> Exempts <strong>2,400 € / 2,700 € / 4,000 € / 4,500 €</strong> per child at the bottom IRPF brackets.<br>• <strong>Healthcare:</strong> Free universal coverage (<strong>0 €</strong>) under <em>Sistema Nacional de Salud (SNS)</em>.',

  footer_disclaimer:
    'For informational purposes only, modeled on official 2026 rules (Slovenia ZPZR, ZPZR-A, ZPIZ-2 & contested ZIURS proposal, plus HR, IT, AT, HU, PL, CZ, SK, ES 2026 statutory rates). Always consult a certified tax advisor before making financial or relocation decisions. All calculations run locally in your browser.'
};
