export const SL = {
  doc_title: 'Normiranec 2026 & Primerjava s sosedi (SI, HR, IT, AT, HU)',
  brand_title: 'Normiranec',
  brand_subtitle: 'Slovenija & Srednja Evropa — S.P. Kalkulator 2026',

  // Top nav
  nav_si: 'Slovenija',
  nav_hr: 'Hrvaška',
  nav_it: 'Italija',
  nav_at: 'Avstrija',
  nav_hu: 'Madžarska',
  nav_compare: 'Primerjaj vse',
  btn_share: 'Deli izračun',
  btn_copied: 'Povezava skopirana!',

  // Shared controls
  label_revenue: 'Letni prihodki (€)',
  label_revenue_mo: 'Mesečni prihodki (€)',
  equiv_annual: '= {val} / leto',
  equiv_monthly: '= {val} / mes.',
  desc_revenue:
    '<strong class="tt-head">Bruto poslovni prihodki (brez DDV)</strong>Vpišite letne ali mesečne obdavčljive prihodke brez DDV (fakturirani prihodki v SI/AT; prejeta plačila v HR/IT/HU). Vrednost se sinhronizira med vsemi državami in primerjalnikom.',
  view_mo: 'Mesečno',
  view_yr: 'Letno',
  res_gross_yr: 'Bruto prihodki (Letno)',
  res_gross_mo: 'Bruto prihodki (Mesečno)',
  net_mo: 'Neto (Mesečno)',
  net_yr: 'Neto (Letno)',
  lbl_total_tax: 'Skupaj davek in prispevki',
  lbl_eff_rate: 'Efektivna obremenitev',
  kpi_kept: '{pct} bruto',
  lbl_params: 'Nastavitve',
  lbl_statement: 'Razčlenitev',

  // Common result rows
  res_expenses: 'Priznani stroški',
  res_base: 'Davčna osnova',
  res_tax: 'Davek na dohodek',
  res_soc: 'Socialni prispevki',
  res_net: 'Neto ostane',
  badge_limit: 'PREKORAČITEV',
  badge_eligible: 'Ustrezno',
  badge_over_cap: 'Nad limitom',
  badge_b2c_only: 'Samo B2C',
  badge_fulltime_only: 'Samo polni S.P.',
  badge_b2c_vat_free: '0 % DDV (≤{limit})',
  badge_b2c_vat_req: '+{rate} % DDV (>{limit})',

  // Slovenia Regime Switcher (ZPZR vs ZIURS)
  si_reg_zpzr: 'Veljavni zakon (ZPZR)',
  si_reg_ziurs: 'Predlog (ZIURS)',
  si_reg_compare: 'Primerjava: Zdaj vs. ZIURS',
  si_teaser_gain: 'Z ZIURS: {diff} neto/leto → Primerjaj',
  si_teaser_gain_mo: 'Z ZIURS: {diff} neto/mes. → Primerjaj',
  si_teaser_same: 'ZIURS vs. ZPZR: enako pri teh prihodkih → Primerjaj',
  si_referendum_banner:
    '<strong>Zakonodajni referendum · 6. 12. 2026:</strong> Zakon ZIURS je Državni zbor sprejel 11. maja 2026, njegova uveljavitev pa je zadržana do referenduma. Izračun prikazuje predlagana pravila ZIURS (limit 150k € / 70k €, pogoj 5 mesecev zavarovanja, lestvica odhodkov 80 % / 70 % / 40 %).',

  // Slovenia inputs & results
  lbl_sp_type: 'Oblika zavarovanja S.P.',
  full_sp: 'Polni S.P.',
  pop_sp: 'Popoldanski S.P.',
  desc_sp_mode:
    '<strong class="tt-head">Polni vs. Popoldanski S.P.</strong><strong>Polni S.P.:</strong> Samozaposlitev je vaša glavna podlaga zavarovanja (40 ur/teden). Višja lestvica odhodkov in prag 120k € (ZPZR) veljata, če je v davčnem letu vsaj 1 oseba neprekinjeno polno zavarovana ≥9 mesecev — osebno ali prek zaposlenega (po predlogu ZIURS ≥5 mesecev in prag 150k €).<span class="tt-gap"></span><strong>Popoldanski S.P.:</strong> Obvezno zavarovanje imate že urejeno z zaposlitvijo za polni delovni čas drugje; plačujete fiksne pavšalne prispevke (113,01 €/mes. od aprila 2026).',
  label_salary: 'Povprečna bruto plača (2025)',
  desc_salary:
    '<strong class="tt-head">Povprečna bruto plača (SURS)</strong>Uradni podatek SURS za leto 2025 znaša <strong>2.536,03 €</strong> in določa zakonsko minimalno (60 % = 1.521,62 €; min. prispevki 651,04 €/mes.) ter maksimalno (350 % = 8.876,11 €) mesečno zavarovalno osnovo za 2026. Vrednost lahko prilagodite za simulacijo prihodnjih let.',
  label_status: 'Leto poslovanja',
  desc_status:
    '<strong class="tt-head">Leto poslovanja in oprostitev PIZ</strong>Po 145. členu ZPIZ-2 ob <strong>prvem vpisu</strong> v poslovni register pripada znižanje prispevka PIZ za <strong>−50 %</strong> v prvih 12 mesecih in <strong>−30 %</strong> v naslednjih 12 mesecih (ob ponovnem odprtju S.P. popusta ni). Do 4. leta se prispevki popolnoma stabilizirajo.',
  opt_y1: '1. leto (-50 % PIZ)',
  opt_y2: '2. leto (-30 % PIZ)',
  opt_y3: '3. leto (brez popusta)',
  opt_steady: '4.+ leto (Stabilizirano)',
  label_base: 'Osnova za prispevke',
  desc_base:
    '<strong class="tt-head">Zavarovalna osnova — 145. člen ZPIZ-2</strong><code>Mesečna osnova = ((Davčni dobiček + Obračunani prispevki preteklega leta) × 0,75) ÷ 12</code><span class="tt-gap"></span>Omejena med 60 % in 350 % povprečne plače SURS. Zavezanec se lahko prostovoljno odloči tudi za višjo ročno osnovo.',
  opt_real: 'Po dobičku (Avtomatsko)',
  opt_man: 'Ročni vnos',
  label_man_month: 'Mesečna osnova (€)',
  res_dohodnina: 'Dohodnina',
  det_base: 'Zavarovalna osnova',
  det_main_polni: 'PIZ + ZZ + Starš. + Zap.',
  det_main_pop: 'Pavšal PIZ (52,05 €) + ZZ (54,53 €)',
  lbl_do: 'Dolgotrajna oskrba',
  desc_do:
    '<strong class="tt-head">Dolgotrajna oskrba (ZDOsk-1)</strong>Polni S.P. plačuje <strong>2,00 %</strong> od zavarovalne osnove (1 % prispevek zavarovanca + 1 % prispevek delodajalca). Popoldanski S.P. plačuje pavšal <strong>6,43 €/mes.</strong> (od aprila 2026) poleg odtegljaja pri plači.',
  lbl_ozp: 'OZP (Zdravstveni)',
  desc_ozp:
    '<strong class="tt-head">Obvezni zdravstveni prispevek (OZP)</strong>Fiksni mesečni prispevek po 24.a členu ZZVZZ (nadomestil dopolnilno zavarovanje), ki se usklajuje vsako leto 1. marca in od marca 2026 znaša <strong>39,36 €/mes.</strong> Pri popoldanskem S.P. je odtegnjen že pri plači.',
  desc_exp_zpzr_polni:
    '<strong class="tt-head">ZPZR 2026 — Polni S.P. (odhodki in davek)</strong>80 % normiranih odhodkov do 60.000 € prihodkov, nad 60.000 € pa 0 % (največ 48.000 €; izstopni prag 120.000 €). Cedularna dohodnina: <strong>20 %</strong> do 72.000 € osnove, <strong>35 %</strong> na presežek nad mejo 120k €.',
  desc_exp_zpzr_pop:
    '<strong class="tt-head">ZPZR 2026 — Popoldanski S.P. (odhodki in davek)</strong>80 % do 12.500 €, 40 % med 12.500 € in 30.000 €, nad 30.000 € pa 0 % (največ 17.000 €; izstopni prag 50.000 €). Cedularna dohodnina: <strong>20 %</strong> do 33.000 € osnove, <strong>35 %</strong> na presežek nad mejo 50k €.',
  desc_exp_ziurs_polni:
    '<strong class="tt-head">Predlog ZIURS — Polni S.P. (odhodki in davek)</strong>80 % do 100.000 €, 70 % med 100k in 120k €, 40 % med 120k in 150k € (največ 106.000 €; prag 150.000 € ob ≥5 mes. zavarovanja). Dohodnina: <strong>20 %</strong> do 44.000 € osnove, <strong>35 %</strong> na presežek nad 150k €.',
  desc_exp_ziurs_pop:
    '<strong class="tt-head">Predlog ZIURS — Popoldanski S.P. (odhodki in davek)</strong>80 % do 50.000 € in 70 % med 50k in 70k € (največ 54.000 €; prag 70.000 €). Dohodnina: <strong>20 %</strong> do 16.000 € osnove, <strong>35 %</strong> na presežek nad 70k €.',
  alert_si_breach:
    '<strong>Prekoračitev limita ({limit} €):</strong> Presežek davčne osnove se obdavči s <strong>35 %</strong>. Če 2-letno povprečje prihodkov preseže {limit} €, morate v naslednjem letu izstopiti iz sistema normirancev (5-letna prepoved vrnitve je bila z novelo ZPZR-A marca 2026 odpravljena).',
  proj_title: 'Stabilizacija neto dohodka (5 let — ZPIZ-2)',
  desc_proj:
    '<strong class="tt-head">5-letna stabilizacija prispevkov (ZPIZ-2)</strong>Predpostavlja stalne letne prihodke. Neto dohodek se v 1.–4. letu postopoma zniža zaradi izteka začetniških popustov PIZ (−50 % v 1. letu, −30 % v 2. letu) ter prištevanja obračunanih prispevkov preteklega leta v novo osnovo po 145. členu ZPIZ-2.',
  lbl_year: 'Leto',
  label_here: 'TUKAJ',
  badge_min: 'MIN BAZA',
  badge_max: 'MAX BAZA',

  // Slovenia ZPZR vs ZIURS Comparison Table & Chart
  cmp_si_title: 'Primerjava: Veljavni ZPZR vs. Predlog ZIURS',
  cmp_col_metric: 'Postavka',
  cmp_col_now: 'Zdaj (ZPZR)',
  cmp_col_ziurs: 'Predlog (ZIURS)',
  cmp_col_diff: 'Razlika (ZIURS)',
  cmp_row_limit: 'Prihodkovni prag / pogoj',
  cmp_limit_polni_zpzr: '120.000 € (≥9 mes.)',
  cmp_limit_polni_ziurs: '150.000 € (≥5 mes.)',
  cmp_limit_pop_zpzr: '50.000 €',
  cmp_limit_pop_ziurs: '70.000 €',
  chart_title: 'Krivulja skupne obremenitve (Davek + Prispevki % prihodkov)',
  chart_legend_zpzr: 'Zdaj (ZPZR)',
  chart_legend_ziurs: 'Predlog (ZIURS)',
  chart_current_rev: 'Izbrani prihodki',

  // Neighbouring Country Controls & Labels
  lbl_employment: 'Status zaposlitve',
  emp_full: 'Glavna dejavnost (Polni)',
  emp_side: 'Ob zaposlitvi (Popoldanski)',

  // Croatia
  hr_title: 'Hrvaška — Paušalni obrt (2026)',
  hr_hok_label: 'Oprostitev HOK zbornice',
  hr_hok_std: 'Redno plačilo (11,40 €/mes.)',
  hr_hok_exempt: '1.–2. leto (Oproščeno HOK)',
  hr_desc_rules:
    '<strong class="tt-head">Hrvaška — Paušalni obrt (2026)</strong>7 fiksnih razredov do 60.000 € določa pavšalno davčno osnovo (15 % zgornje meje razreda, kar pomeni ≥85 % priznanih odhodkov; davek 12 % = 203,40 €–1.080 €/leto). Fiksni prispevki znašajo 290,98 €/mes. (oz. 17,5 % od osnove ob zaposlitvi) + 11,40 €/mes. HOK.',
  hr_bracket_lbl: 'Razred {id}/7',
  hr_res_expenses: 'Pavšalni odhodki (razred)',
  hr_det_mio: 'Pokojninsko (MIO I 15 % + MIO II 5 %)',
  hr_det_zo: 'Zdravstveno zavarovanje (ZO 16,5 %)',
  hr_det_hok: 'Obrtniška zbornica (HOK)',
  hr_alert_breach: '<strong>Prekoračitev 60.000 €:</strong> Na Hrvaškem je 60.000 € trda meja za Paušalni obrt in hkrati prag za obvezni vstop v 25 % PDV ter prehod na poslovne knjige po dejanskih stroških.',

  // Italy
  it_title: 'Italija — Regime Forfettario (2026)',
  it_tax_label: 'Stopnja davka (Imposta sostitutiva)',
  it_tax_startup: '5 % Startup (prvih 5 let)',
  it_tax_std: '15 % Standardna stopnja',
  it_act_label: 'Dejavnost (ATECO koeficient)',
  it_act_prof78: 'Svetovanje / Strokovnjaki (78 % osnova)',
  it_act_it67: 'IT & Programiranje ATECO 62 (67 % osnova)',
  it_act_art67: 'Obrtniki / Storitve (67 % osnova)',
  it_act_comm40: 'Trgovina / E-commerce (40 % osnova)',
  it_inps_label: 'Pokojninska shema INPS',
  it_inps_sep: 'Gestione Separata — Freelancer (26,07 %)',
  it_inps_sep_side: 'Gestione Separata — Ob zaposlitvi (24,00 %)',
  it_inps_art: 'Gestione Artigiani (fiksni min. + 24 %)',
  it_inps_comm: 'Gestione Commercianti (fiksni min. + 24,48 %)',
  it_disc_label: 'Forfettario INPS popust (-35 %)',
  it_disc_yes: 'Uveljavljam -35 % INPS popust',
  it_disc_no: 'Polni prispevki (brez popusta)',
  it_desc_rules:
    '<strong class="tt-head">Italija — Regime Forfettario (2026)</strong>Limit 85.000 € (oproščeno IVA; >100.000 € pomeni takojšen izstop). Bruto obdavčljivi dobiček = Prihodki × koeficient ATECO. Plačani prispevki INPS se v celoti odštejejo pred obračunom 5 % startup ali 15 % standardnega davka.',
  it_det_gross: 'Bruto forfettario dobiček (ATECO)',
  it_det_inps_fix: 'INPS fiksni del (minimale 18.808 €)',
  it_det_inps_var: 'INPS variabilni / sorazmerni del',
  it_alert_85k: '<strong>Prekoračitev 85.000 €:</strong> Med 85.000 € in 100.000 € letos še obdržite Forfettario, a v naslednjem letu obvezno preidete v redni režim (IRPEF + IVA).',
  it_alert_100k: '<strong>Takojšen izstop (> 100.000 €):</strong> Prekoračitev 100.000 € pomeni takojšen izstop iz Forfettaria že v tekočem letu in obvezen obračun 22 % IVA.',

  // Austria
  at_title: 'Avstrija — Einzelunternehmen Pauschalierung (2026)',
  at_scheme_label: 'Vrsta pavšala (§ 17 EStG)',
  at_sch_auto: 'Avtomatsko optimalno (KU ≤55k / Basis >55k)',
  at_sch_klein: 'Kleinunternehmerpauschalierung (do 55.000 €)',
  at_sch_basis: 'Basispauschalierung (do 420.000 €)',
  at_act_label: 'Vrsta dejavnosti',
  at_act_serv: 'IT / Svetovanje / Storitve (20 % KU / 6 % Basis)',
  at_act_goods: 'Trgovina / Proizvodnja (45 % KU / 15 % Basis)',
  at_desc_rules:
    '<strong class="tt-head">Avstrija — § 17 EStG Pauschalierung (2026)</strong>Pavšalni odhodki (20 %/45 % KU do 55k €; 6 %/15 % Basis do 420k €) + odbitni prispevki SVS (26,83 % na osnovo 6.613 €–97.020 € + 144,84 € UV) + 15 % Grundfreibetrag (do 4.950 €) znižajo osnovo pred progresivno dohodnino (0 % do 13.539 €, nato 20 %–50 %).',
  at_det_gfb: 'Grundfreibetrag (15 % olajšava)',
  at_det_pv: 'SVS Pokojninsko (PV 18,50 %)',
  at_det_kv: 'SVS Zdravstveno (KV 6,80 %)',
  at_det_sv: 'SVS Odpravninski sklad (1,53 %) + Nezgodno',
  at_alert_breach: '<strong>Prekoračitev limita ({limit} €):</strong> Za izbrani avstrijski pavšal ste presegli zakonsko mejo prihodkov.',

  // Hungary
  hu_title: 'Madžarska — Átalányadó & KATA (2026)',
  hu_reg_label: 'Davčni režim',
  hu_reg_ata: 'Átalányadó (Pavšalni stroški — B2B & B2C)',
  hu_reg_kata: 'KATA (50.000 Ft/mes. — SAMO B2C!)',
  hu_exp_label: 'Stopnja normiranih stroškov',
  hu_exp_45: '45 % — Splošne storitve, IT, svetovanje (2026)',
  hu_exp_80: '80 % — Obrt, gradbeništvo, prevozi',
  hu_exp_90: '90 % — Trgovina na drobno',
  hu_wage_label: 'Minimalna osnova prispevkov',
  hu_wage_guar: 'Garantált bérminimum (373.200 Ft — strokovni poklici)',
  hu_wage_min: 'Minimálbér (322.800 Ft — nekvalificirano)',
  hu_hipa_label: 'Lokalni občinski davek (HIPA)',
  hu_hipa_simp: 'Poenostavljeni sávos HIPA (50k–170k Ft)',
  hu_hipa_std: 'Standardni 2 % od dobička',
  hu_hipa_none: 'Brez HIPA (0 %)',
  hu_fx_label: 'Tečaj EUR / HUF',
  hu_desc_rules:
    '<strong class="tt-head">Madžarska — Átalányadó (2026)</strong>Prizna 45 % normiranih stroškov za storitve (80 % obrt / 90 % trgovina), oprosti dobiček do 1.936.800 Ft plačila 15 % SZJA ter obračuna TBJ (18,5 %) in SZOCHO (13 %) na 100 % minimalne osnove (112,5 % pribitek SZOCHO je v 2026 odpravljen).',
  hu_desc_kata:
    '<strong class="tt-head">Madžarska — Nova KATA (2026)</strong>Brez odbitka stroškov: fiksni mesečni pavšal 50.000 Ft/mes. (600.000 Ft/leto) pokrije dohodnino in socialne prispevke do 18.000.000 Ft/leto (40 % davek na presežek) + pavšalni HIPA (50.000 Ft/leto). Dovoljeno izključno za polni S.P., ki posluje samo s fizičnimi osebami (B2C).',
  hu_det_exempt: 'Neobdavčen del dobička (Adómentes keret)',
  hu_det_szja: 'Dohodnina SZJA (15 % / KATA presežek)',
  hu_det_hipa: 'Lokalni davek HIPA (Iparűzési adó)',
  hu_det_tbj: 'Socialni prispevek TBJ (18,5 % / KATA pavšal)',
  hu_det_szocho: 'Socialni davek SZOCHO (13,0 %)',
  hu_alert_vat: '<strong>Opozorilo za DDV (ÁFA):</strong> Prihodki presegajo prag oprostitve AAM (20.000.000 Ft ≈ {vatEur}), zato za domači promet postanete zavezanec za 27 % ÁFA (v Átalányadó ostajate do {capEur}).',
  hu_alert_kata_b2b: '<strong>KATA B2C omejitev:</strong> Na Madžarskem KATA dovoljuje izključno izdajanje računov fizičnim osebam (B2C) ob polni samozaposlitvi. Za B2B naročnike preklopite na <strong>Átalányadó</strong>.',
  hu_alert_breach: '<strong>Prekoračitev limita ({limit}):</strong> Presegli ste zgornjo mejo izbranega madžarskega režima.',

  // Compare All Arena & Meta-Comparison
  arena_title: 'Primerjalna arena: Slovenija vs. sosednje države (2026)',
  arena_subtitle: 'Primerjava neto izkupička in celotnih dajatev pri enakih letnih prihodkih v EUR.',
  persona_title: 'Usklajen profil (Jabolka z jabolki)',
  desc_persona:
    '<strong class="tt-head">Usklajen čezmejni profil</strong>Poenoti obliko zavarovanja, začetniške olajšave (SI −50 % PIZ, IT 5 % davek, HR oprostitev HOK) in vrsto strank v vseh 5 državah.<span class="tt-gap"></span><strong>B2B vs. B2C:</strong> Pri B2B poslovanju z zavezanci je DDV cenovno nevtralen (obrnjena davčna obveznost v EU), madžarski pavšal KATA pa je zakonsko prepovedan. Preklop na B2C odklene madžarski KATA (polni S.P., ≤45k €) in prikaže nacionalne pragove za obračun DDV končnim potrošnikom (50k–85k €).',
  persona_preset: 'Usklajen profil',
  persona_custom: 'Moje nastavitve iz zavihkov',
  persona_full: 'Polni S.P.',
  persona_side: 'Popoldanski',
  persona_est: 'Uveljavljen (Stabilizirano)',
  persona_new: 'Nov začetnik (1. leto)',
  persona_b2b: 'B2B (Podjetja)',
  persona_b2c: 'B2C (Končne stranke)',
  persona_note_b2b:
    '<strong>B2B (Podjetja):</strong> DDV je cenovno nevtralen (obrnjena davčna obveznost / odbitek vstopnega DDV). Madžarski pavšal <strong>KATA</strong> (50.000 Ft/mes.) je za B2B račune zakonsko prepovedan.',
  persona_note_b2c:
    '<strong>B2C (Končne stranke):</strong> Odklene madžarski pavšal <strong>KATA</strong> (polni S.P., ≤45k €) in označi nacionalne pragove oprostitve DDV (50k € HU · 55k € AT · 60k € SI/HR · 85k € IT), nad katerimi je treba zaračunati DDV.',
  persona_custom_note:
    'Uporabljene so nastavitve iz posameznih zavihkov držav. Vrsta strank za KATA in B2C DDV oznake:',

  arena_col_rank: '#',
  arena_col_country: 'Država & Režim',
  arena_col_net: 'Neto izkupiček',
  arena_col_tax_soc: 'Davek + Prispevki',
  arena_col_eff: 'Skupna obremenitev',
  arena_col_vs_si: 'Razlika vs. SI (Zdaj)',
  arena_open_calc: 'Odpri kalkulator →',
  arena_baseline: 'Izhodišče (Zdaj)',
  arena_proposed_tag: 'Referendum 6.12.',
  arena_tax_short: 'Davek',
  arena_soc_short: 'Prisp.',

  residency_warning_title: 'Pomembno pravno opozorilo o davčnem rezidentstvu (183 dni)',
  residency_warning_body:
    'Odprtje s.p.-ja v sosednji državi (npr. hrvaški Paušalni obrt), medtem ko še naprej živite v Sloveniji, <strong>ne zniža vaših davkov</strong>. Po 6. členu ZDoh-2 in mednarodnih konvencijah (središče življenjskih interesov + pravilo 183 dni) slovenski davčni rezidenti plačujejo davek po načelu svetovnega dohodka. Tuj režim velja le ob dejanski selitvi prebivališča in življenjskega središča.',

  meta_matrix_title: 'Meta-primerjava: Zakonske omejitve, tveganja in ugodnosti',
  meta_cards_title: 'Prednosti in slabosti po državah',
  meta_best_for: 'Najboljše za:',
  meta_pros: 'Prednosti',
  meta_cons: 'Omejitve in pasti',
  rating_good: 'Ugodno',
  rating_warn: 'Omejitve',
  rating_strict: 'Strogo',

  footer_disclaimer:
    'Izračun je informativne narave na podlagi uradnih predpisov za leto 2026 (ZPZR, ZPZR-A, ZPIZ-2, predlog ZIURS ter predpisi HR, IT, AT, HU). Pred poslovnimi ali davčnimi odločitvami se vedno posvetujte z davčnim svetovalcem. Vsi izračuni potekajo izključno v vašem brskalniku.'
};
