export const SL = {
  doc_title: 'NettoEU — Normiranec 2026 & Primerjava davkov S.P. v 9 državah EU',
  brand_title: 'NettoEU',
  brand_subtitle: 'Evropski S.P. & Normiranec davčni kalkulator 2026 — 9 držav EU',

  // Top nav
  nav_si: 'Slovenija',
  nav_hr: 'Hrvaška',
  nav_it: 'Italija',
  nav_at: 'Avstrija',
  nav_hu: 'Madžarska',
  nav_pl: 'Poljska',
  nav_cz: 'Češka',
  nav_sk: 'Slovaška',
  nav_es: 'Španija',
  nav_compare: 'Primerjaj vse',
  btn_share: 'Deli izračun',
  btn_copied: 'Povezava skopirana!',

  // Shared controls
  label_revenue: 'Letni prihodki (€)',
  label_revenue_mo: 'Mesečni prihodki (€)',
  equiv_annual: '= {val} / leto',
  equiv_monthly: '= {val} / mes.',
  desc_revenue:
    '<strong class="tt-head">Bruto poslovni prihodki (brez DDV)</strong>Vpišite letne ali mesečne obdavčljive prihodke brez DDV. Vrednost se sinhronizira med vsemi 9 državami in primerjalnikom (lokalne valute HUF, PLN in CZK se preračunajo po nastavljivem tečaju).',
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

  // Shared Household & Dependents Controls
  fam_label: 'Družina in vzdrževani člani',
  fam_kids_short: 'Otroci (<18)',
  fam_kids_0: '0 otrok',
  fam_kids_1: '1 otrok',
  fam_kids_2: '2 otroka',
  fam_kids_3: '3 otroci',
  fam_kids_4: '4 otroci',
  fam_spouse_short: 'Zakonec',
  fam_spouse_none: 'Brez vzdrž. zakonca',
  fam_spouse_dep: 'Nezaposlen zakonec',
  desc_family:
    '<strong class="tt-head">Družina: Otroci in nezaposlen zakonec (2026)</strong><strong>Režimi z družinskimi olajšavami (AT, HU Átalányadó, CZ 60 % Výdaje, SK, ES, PL Skala):</strong> Neposredni otroški odbitki in olajšave za zakonca močno znižajo davek (in HU TBJ) — npr. AT 2.000 €/otroka + AVAB, HU podvojene olajšave 2026, CZ 15,2k–27,8k Kč/otroka, SK 1.200 €/otroka + NČZD zakonca, ES −3.400 € skupna napoved + otroški minimumi, PL Skala skupna obdavčitev.<span class="tt-gap"></span><strong>Pavšalni / cedularni režimi (SI, HR, IT, HU KATA, PL Ryczałt, CZ Paušální daň):</strong> <strong>0 €</strong> davčne olajšave. Zdravstvo nezaposlenega zakonca stane <strong>0 €</strong> v HR, IT, PL in ES, medtem ko obvezni prispevki veljajo v SI (OZP 39,36 €/mes.), HU (~30,75 €/mes.), CZ (OBZP 3.024 Kč/mes. brez otroka &lt;7 let), SK (121,92 €/mes. brez otrok) in AT (+3,4 % SVS brez otrok).',
  badge_fam_delta: 'Družina {val}',
  badge_fam_zero: 'Družina 0 €',

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
  lbl_spouse_ozp: 'OZP vzdrževanega zakonca (M-DČ)',
  desc_si_family:
    '<strong class="tt-head">Slovenija Normiranec — Družina in OZP</strong>Po 59. členu ZDoh-2 je dohodnina normiranca cedularna (dokončna 20 % / 35 %), zato <strong>olajšave za vzdrževane družinske člane ni mogoče uveljavljati</strong> (pri popoldanskem S.P. jo uveljavljate pri redni plači).<span class="tt-gap"></span>Otroci so zdravstveno sozavarovani brezplačno (0 €). Nezaposlen zakonec ima brezplačno osnovno zavarovanje ZZZS (M-DČ), vendar mora osebno plačevati obvezni <strong>OZP (39,36 €/mes. = 472,32 €/leto)</strong>.',
  si_family_note:
    '<strong>Pravilo za normirance (Družina):</strong> Cedularna obdavčitev (20 %/35 %) ne omogoča davčne olajšave za otroke ali zakonca (<strong>0 €</strong> po 59. členu ZDoh-2). Otroci so zavarovani za 0 €, za nezaposlenega zakonca pa se plačuje obvezni OZP (39,36 €/mes.).',
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
  hr_title: 'Paušalni obrt · Pavšalni obrtnik',
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
  hr_family_note:
    '<strong>Paušalni obrt (Družina):</strong> Fiksni pavšalni davek PO-SD ne znižuje davka za vzdrževane člane (<strong>0 €</strong> olajšave), sta pa nezaposlen zakonec in otroci brezplačno zdravstveno sozavarovani prek HZZO (<strong>0 €</strong> dodatnega stroška).',

  // Italy
  it_title: 'Partita IVA · Regime Forfettario',
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
  it_family_note:
    '<strong>Forfettario (Družina):</strong> Nadomestni davek (5 %/15 %) izključuje davčne olajšave IRPEF za vzdrževane člane (<strong>0 €</strong> odbitka), imajo pa zakonec in otroci brezplačno javno zdravstvo SSN (<strong>0 €</strong> stroška; Assegno Unico izplačuje INPS ločeno).',

  // Austria
  at_title: 'Einzelunternehmen · § 17 Pauschalierung',
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
  at_spouse_waiver_label: 'SVS zavarovanje zakonca (+3,4 %)',
  at_spouse_waiver_no: 'Standardno (+3,4 % SVS Zusatzbeitrag)',
  at_spouse_waiver_yes: 'Oproščeno (≥4 leta vzgoje otrok — 0 %)',
  at_det_spouse_svs: 'SVS sozavarovanje zakonca (+3,4 %)',
  at_det_gross_est: 'Dohodnina po lestvici (pred olajšavami)',
  at_det_fb_plus: 'Familienbonus Plus ({n}× davčni odbitek)',
  at_det_avab: 'Olajšava za edinega hranitelja (AVAB)',
  at_alert_breach: '<strong>Prekoračitev limita ({limit} €):</strong> Za izbrani avstrijski pavšal ste presegli zakonsko mejo prihodkov.',

  // Hungary
  hu_title: 'Egyéni vállalkozó · Átalányadó & KATA',
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
  hu_det_gross_szja: 'SZJA 15 % (pred družinsko olajšavo)',
  hu_det_fam_szja: 'Družinska davčna olajšava (SZJA)',
  hu_det_gross_tbj: 'TBJ 18,5 % (pred družinsko olajšavo)',
  hu_det_fam_tbj: 'Družinska olajšava iz prispevkov (TBJ)',
  hu_det_spouse_tb: 'Zdravstveni prispevek zakonca (12.300 Ft/mes.)',
  hu_alert_vat: '<strong>Opozorilo za DDV (ÁFA):</strong> Prihodki presegajo prag oprostitve AAM (20.000.000 Ft ≈ {vatEur}), zato za domači promet postanete zavezanec za 27 % ÁFA (v Átalányadó ostajate do {capEur}).',
  hu_alert_kata_b2b: '<strong>KATA B2C omejitev:</strong> Na Madžarskem KATA dovoljuje izključno izdajanje računov fizičnim osebam (B2C) ob polni samozaposlitvi. Za B2B naročnike preklopite na <strong>Átalányadó</strong>.',
  hu_alert_breach: '<strong>Prekoračitev limita ({limit}):</strong> Presegli ste zgornjo mejo izbranega madžarskega režima.',

  // Poland
  pl_title: 'JDG · Ryczałt, Skala & Liniowy',
  pl_reg_label: 'Davčni režim (Forma opodatkowania)',
  pl_reg_ryczalt: 'Ryczałt (Pavšalni davek od prihodkov — do 2M €)',
  pl_reg_skala: 'Skala podatkowa (12 % / 32 % + Zakonec & Otroci)',
  pl_reg_liniowy: 'Podatek liniowy (19 % enotni davek)',
  pl_rate_label: 'Stopnja Ryczałta po dejavnosti',
  pl_rate_12: '12 % — IT, programiranje in razvoj programske opreme',
  pl_rate_8_5: '8,5 % — Splošne storitve',
  pl_rate_14: '14 % — Inženiring, arhitektura, zdravstvo',
  pl_rate_15: '15 % — Poslovno svetovanje, marketing, oglaševanje',
  pl_zus_label: 'Stopnja prispevkov ZUS',
  pl_zus_ulga: '1. leto (6 mes. Ulga na start + 6 mes. Preferencyjny)',
  pl_zus_pref: '7.–30. mesec: Preferencyjny ZUS (420,86 zł/mes.)',
  pl_zus_duzy: 'Standardno: Duży ZUS (1.788,29 zł/mes., brez bolniške)',
  pl_fx_label: 'Tečaj EUR / PLN',
  pl_desc_rules:
    '<strong class="tt-head">Poljska — JDG Samostojni podjetnik (2026)</strong><strong>Ryczałt (do 2.000.000 €):</strong> Obdavči bruto prihodke, zmanjšane za socialni ZUS in 50 % 3-stopenjskega zdravstvenega prispevka NFZ (498,35 / 830,58 / 1.495,04 zł/mes. za razrede ≤60k / ≤300k / &gt;300k zł).<span class="tt-gap"></span><strong>Skala (12 %/32 %):</strong> 30.000 zł neobdavčeno, 12 % do 120.000 zł, 32 % nad tem + 9 % zdravstvo; omogoča skupno napoved z zakoncem in <em>Ulga na dzieci</em>. <strong>Liniowy:</strong> 19 % + 4,9 % zdravstvo (odbitno do 14.100 zł). Ob zaposlitvi ≥4.806 zł/mes. je socialni ZUS 0 zł.',
  pl_res_deductions: 'Odbitni ZUS / Zdravstvo',
  pl_det_zus: 'Socialni ZUS (Pokojnina, invalidnost, nezgode, FP)',
  pl_det_nfz: 'Zdravstveni prispevek NFZ (Składka zdrowotna)',
  pl_det_gross_pit: 'Dohodnina PIT pred družinskimi olajšavami',
  pl_det_spouse_split: 'Prihranek skupne napovedi z zakoncem (Wspólne rozliczenie)',
  pl_det_child_credit: 'Otroška davčna olajšava (Ulga na dzieci, {n}×)',
  pl_alert_breach:
    '<strong>Prekoračitev meje 2.000.000 € za Ryczałt ({limit}):</strong> Promet presega zakonski strop za pavšalni Ryczałt; preklopite na Skalo ali Podatek liniowy.',
  pl_alert_vat:
    '<strong>Opozorilo za DDV (23 % VAT):</strong> Prihodki presegajo poljski domači prag oprostitve 240.000 zł v 2026 (≈ {vatEur}); za EU B2B storitve velja obrnjena davčna obveznost.',
  pl_family_note_ryczalt:
    '<strong>Pravilo JDG ({regime}):</strong> Nezaposlen zakonec in otroci imajo brezplačno javno zdravstveno sozavarovanje NFZ (ZCNA, <strong>0 zł</strong> stroška). Skupna obdavčitev z zakoncem in <em>Ulga na dzieci</em> veljata le pri režimu <strong>Skala podatkowa (12 %/32 %)</strong>.',

  // Czechia
  cz_title: 'OSVČ · Paušální daň & Výdajový paušál',
  cz_reg_label: 'Davčni režim OSVČ',
  cz_reg_auto: 'Avtomatsko optimalno (Najvišji neto)',
  cz_reg_pausal: 'Paušální daň (3 fiksni mesečni pasovi ≤2M Kč)',
  cz_reg_vydaje: 'Paušální výdaje (60 % / 80 % / 40 % normirani odhodki)',
  cz_exp_label: 'Dejavnost / Stopnja odhodkov',
  cz_exp_60: '60 % — Prosta obrt, IT, svetovanje (Volná živnost)',
  cz_exp_80: '80 % — Obrt in kmetijstvo (Řemeslná živnost)',
  cz_exp_40: '40 % — Regulirani poklici, odvetniki, avtorji',
  cz_stage_label: 'Faza poslovanja',
  cz_stage_est: 'Uveljavljen OSVČ (min. 5.005 Kč/mes. socialno)',
  cz_stage_new: 'Začetnik 1.–3. leto (min. 3.575 Kč/mes. socialno)',
  cz_spouse_care_label: 'Skrb zakonca za mlajšega otroka (pravilo 2026)',
  cz_spouse_care_no: 'Brez otroka <3 / <7 let (OBZP 3.024 Kč/mes.)',
  cz_spouse_care_yes: 'Skrb za otroka <3 let (24.840 Kč odbitek + državno VZP)',
  cz_fx_label: 'Tečaj EUR / CZK',
  cz_desc_pausal:
    '<strong class="tt-head">Češka — Paušální daň (2026)</strong>Združi davek, pokojninsko ČSSZ in zdravstvo VZP v <strong>eno samo fiksno mesečno plačilo</strong> brez letnih napovedi do 2.000.000 Kč: <strong>Pas 1</strong> (9.162 Kč/mes. do 1,5M Kč pri 60 %/80 % oz. 1M pri 40 %), <strong>Pas 2</strong> (16.745 Kč/mes. do 1,5M/2M), <strong>Pas 3</strong> (27.139 Kč/mes. do 2M Kč). Ni dovoljeno ob redni zaposlitvi ali za polne zavezance za domači DPH.',
  cz_desc_vydaje:
    '<strong class="tt-head">Češka — Paušální výdaje (2026)</strong>Prizna 60 %/80 %/40 % pavšalnih odhodkov (omejenih na osnovo 2.000.000 Kč). Socialni ČSSZ znaša 29,2 % na 55 % dobička (min. 5.005 Kč/mes. polni, 3.575 Kč začetnik; popoldanski oproščen pod 117.521 Kč dobička). Zdravstvo VZP je 13,5 % na 50 % dobička (min. 3.306 Kč/mes.). Dohodnina DPFO je 15 % (23 % nad 1.762.812 Kč) minus 30.840 Kč splošnega odbitka + družinski odbitki.',
  cz_band_lbl: 'Pas {id}/3',
  cz_det_soc: 'Socialno in pokojninsko zavarovanje ČSSZ',
  cz_det_vzp: 'Javno zdravstveno zavarovanje VZP',
  cz_det_spouse_obzp: 'Zdravstveni prispevek zakonca OBZP (3.024 Kč/mes.)',
  cz_det_gross_dpfo: 'Dohodnina DPFO po splošni olajšavi (30.840 Kč)',
  cz_det_spouse_credit: 'Olajšava za zakonca (Sleva na manželku, otrok <3)',
  cz_det_child_credit: 'Otroški davčni odbitek (Daňové zvýhodnění, {n}×)',
  cz_alert_breach:
    '<strong>Prekoračitev meje 2.000.000 Kč ({limit}):</strong> Prihodki presegajo zakonski strop za Paušální daň in prag za obvezni 21 % DPH. Preklopite na <strong>Paušální výdaje</strong>.',
  cz_alert_side:
    '<strong>Omejitev Paušální daň ob zaposlitvi:</strong> Podjetniki z dohodki iz redne zaposlitve na Češkem ne morejo uporabljati Paušální daň. Preklopite na <strong>Paušální výdaje</strong> ali Avtomatsko.',
  cz_alert_vat:
    '<strong>Opozorilo za DDV (21 % DPH):</strong> Prihodki presegajo češki domači prag oprostitve 2.000.000 Kč (≈ {vatEur}).',

  // Slovakia
  sk_title: 'SZČO · Paušálne výdavky 60 %',
  sk_stage_label: 'Faza poslovanja (Sociálna poisťovňa)',
  sk_stage_est: 'Uveljavljen SZČO (min. 303,11 € soc. + 121,92 € ZP)',
  sk_stage_new: '1. leto — Začetnik (0 € socialnih prispevkov!)',
  sk_spouse_care_label: 'Upravičena skrb zakonca (otrok <3 / <6 let)',
  sk_spouse_care_yes: 'Izpolnjuje pogoj (NČZD do 5.455 € + državno ZP)',
  sk_spouse_care_no: 'Ne izpolnjuje (0 € NČZD + 121,92 €/mes. ZP)',
  sk_desc_rules:
    '<strong class="tt-head">Slovaška — SZČO Normirani odhodki (2026)</strong>Odšteje 60 % pavšalnih odhodkov do največ <strong>20.000 €/leto</strong> ter plačane prispevke. Po slovaškem konsolidacijskem paketu 2026 minimalni prispevki znašajo <strong>303,11 €/mes.</strong> socialno (33,15 % od 60 % povp. plače; 0 € v 1. letu ali pod 9.144 € prihodkov) + <strong>121,92 €/mes.</strong> zdravstvo (16 % od 50 % povp. plače). Davek je <strong>15 %</strong> do 100.000 € prometa (19 %–35 % nad tem) po odbitku 5.966,73 € NČZD.',
  sk_det_nczd: 'Splošna davčna olajšava NČZD (do 5.966,73 €/leto)',
  sk_det_nczd_spouse: 'Olajšava za zakonca NČZD (do 5.455,30 €/leto)',
  sk_det_soc: 'Socialno zavarovanje Sociálna poisťovňa (33,15 %)',
  sk_det_zp: 'Javno zdravstveno zavarovanje ZP (16,00 %)',
  sk_det_spouse_zp: 'Zdravstveni prispevek zakonca ZP (121,92 €/mes.)',
  sk_det_gross_tax: 'Dohodnina pred družinskimi olajšavami',
  sk_det_spouse_tax: 'Davčni prihranek NČZD za zakonca',
  sk_det_child_bonus: 'Otroški davčni bonus (Daňový bonus, {n}×)',
  sk_alert_breach:
    '<strong>Prekoračitev meje 100.000 € za 15 % davek:</strong> Nad 100.000 € prometa znižano 15 % stopnjo SZČO zamenja progresivna lestvica 2026 (19 % / 25 % / 30 % / 35 %).',
  sk_alert_vat:
    '<strong>Opozorilo za DDV (23 % DPH):</strong> Prihodki presegajo slovaški koledarski prag 50.000 € za domači DPH (23 % DPH; nad 62.500 € takojšnja registracija).',

  // Spain
  es_title: 'Autónomo · Estimación Directa Simplificada',
  es_stage_label: 'Socialni prispevek RETA',
  es_stage_est: 'Uveljavljen Autónomo (15 razredov po dejanskem dohodku)',
  es_stage_new: '1. leto — Začetnik: Tarifa Plana (80 €/mes.)',
  es_stage_cero: '1. leto — Regionalna Cuota Cero (0 €/mes. — Madrid/Andaluzija)',
  es_cost_label: 'Dokumentirani poslovni stroški',
  es_cost_0: '0 % — Čisto IT / svetovanje na daljavo (brez stroškov)',
  es_cost_10: '10 % — Programska oprema, pisarna, gestoría, oprema',
  es_cost_20: '20 % — Višji operativni in podizvajalski stroški',
  es_desc_rules:
    '<strong class="tt-head">Španija — Autónomo EDS &amp; RETA (2026)</strong>Španija nima visokih normiranih odhodkov za storitve: <em>Estimación Directa Simplificada</em> (do 600.000 €) odšteje dejanske stroške + RETA prispevke + <strong>5 % gastos de difícil justificación (največ 2.000 €/leto)</strong>. Prispevki RETA 2026 sledijo 15 dohodkovnim razredom (205,88 €–607,35 €/mes. min. po 31,5 % z MEI, oz. 80 €/mes. Tarifa Plana v 1. letu). Progresivna IRPF (19 %–47 %) upošteva 5.550 € osebnega + družinske minimume.',
  es_det_op_costs: 'Dokumentirani poslovni stroški ({pct} %)',
  es_det_dificil: 'Gastos de difícil justificación (5 %, max 2.000 €)',
  es_det_conjunta: 'Skupna napoved z zakoncem (Declaración conjunta −3.400 €)',
  es_det_reta: 'Socialna varnost RETA ({tramo})',
  es_det_gross_irpf: 'Dohodnina IRPF (pred družinskimi olajšavami)',
  es_det_spouse_irpf: 'Prihranek IRPF zaradi skupne napovedi z zakoncem',
  es_det_child_irpf: 'Mínimo por descendientes ({n}× otroško znižanje IRPF)',
  es_alert_vat:
    '<strong>Obvezen 21 % IVA:</strong> Španija v 2026 <strong>nima praga oprostitve DDV za male podjetnike (prag 0 €)</strong> — domači računi vključujejo 21 % IVA (četrtletni Modelo 303), za EU B2B prek ROI/VIES pa velja 0 % obrnjena obveznost.',
  es_alert_breach:
    '<strong>Prekoračitev meje 600.000 € EDS:</strong> Promet presega 600.000 € za Estimación Directa Simplificada (prehod na Estimación Directa Normal).',

  // Compare All Arena & Meta-Comparison
  arena_title: 'Primerjalna arena: Slovenija vs. 8 držav EU (2026)',
  arena_subtitle: 'Živa lestvica neto izkupička in skupnih dajatev v 9 državah EU pri enakih prihodkih v EUR.',
  persona_title: 'Usklajen profil (Jabolka z jabolki)',
  desc_persona:
    '<strong class="tt-head">Usklajen profil 9 držav</strong>Poenoti obliko zavarovanja, začetniške olajšave (SI −50 % PIZ, IT 5 % davek, HR HOK, PL Ulga na start, CZ začetniški prag, SK 1. leto brez socialnih prispevkov, ES 80 € Tarifa Plana) in vrsto strank v vseh 9 državah.<span class="tt-gap"></span><strong>B2B vs. B2C:</strong> Pri B2B je DDV cenovno nevtralen (obrnjena obveznost v EU), madžarski KATA pa prepovedan. Preklop na B2C odklene KATA (polni S.P., ≤45k €) in označi nacionalne pragove za potrošniški DDV (od 0 € ES do 85k € IT).',
  persona_preset: 'Usklajen profil',
  persona_custom: 'Moje nastavitve iz zavihkov',
  persona_full: 'Polni S.P.',
  persona_side: 'Popoldanski',
  persona_est: 'Uveljavljen (4.+ leto)',
  persona_new: 'Nov začetnik (1. leto)',
  persona_b2b: 'B2B (Podjetja)',
  persona_b2c: 'B2C (Končne stranke)',
  persona_client_label: 'Vrsta strank',
  persona_note_b2b:
    '<strong>B2B (Podjetja):</strong> DDV je cenovno nevtralen (obrnjena davčna obveznost / odbitek vstopnega DDV). Madžarski pavšal <strong>KATA</strong> (50.000 Ft/mes.) je za B2B račune zakonsko prepovedan.',
  persona_note_b2c:
    '<strong>B2C (Končne stranke):</strong> Odklene madžarski pavšal <strong>KATA</strong> (polni S.P., ≤45k €) in označi nacionalne pragove oprostitve DDV (0 € ES · 50k € HU/SK · 55k € AT · 56k € PL · 60k € SI/HR · 79k € CZ · 85k € IT), nad katerimi je treba zaračunati DDV.',
  persona_custom_note:
    'Uporabljene so nastavitve iz posameznih zavihkov držav, skupaj z izbrano vrsto strank in družino zgoraj.',
  region_filter_label: 'Prikaz držav',
  region_all: 'Vseh 9 držav',
  region_neighbours: 'SI + Sosedje (5)',
  region_expansion: 'SI + PL · CZ · SK · ES (5)',

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
  per_yr: '/leto',
  per_mo: '/mes.',

  // Comparison View Badge, Pill & Header Tooltips
  desc_arena_eff:
    '<strong class="tt-head">Skupna efektivna obremenitev (% bruto)</strong><code>(Dohodnina + Socialni prispevki) ÷ Bruto prihodki</code><span class="tt-gap"></span>Vključuje lokalne davke (HU HIPA), zbornične članarine (HR HOK) in morebitne zdravstvene prispevke vzdrževanega zakonca, zmanjšano za otroške in družinske davčne olajšave.',
  desc_arena_delta:
    '<strong class="tt-head">Razlika neto izkupička proti Sloveniji (ZPZR zdaj)</strong>Prikazuje, koliko več (zeleno) ali manj (rdeče) neto prihodka v izbranem obdobju (mesečno ali letno) obdržite v primerjavi z veljavnim slovenskim zakonom ZPZR 2026 pri enakih bruto prihodkih in družinskem stanju.',
  tip_fam_si_spouse:
    '<strong class="tt-head">Slovenija Normiranec — Družina ({delta}{per})</strong><strong>Davčna olajšava: 0,00 €</strong> — Po 59. členu ZDoh-2 pri cedularni obdavčitvi normirancev olajšav za vzdrževane otroke in zakonca ni mogoče uveljavljati.<span class="tt-gap"></span><strong>Zdravstvo zakonca: −{spouseOzp}{per}</strong> — Otroci in osnovno zavarovanje zakonca (M-DČ) so brezplačni (0,00 €), za nezaposlenega zakonca pa je obvezen <strong>OZP (39,36 €/mes.)</strong> po 24.a členu ZZVZZ.',
  tip_fam_si_kids:
    '<strong class="tt-head">Slovenija Normiranec — Družina (0,00 €{per})</strong><strong>Olajšava za otroke: 0,00 €</strong> — Cedularna 20 %/35 % obdavčitev po 59. členu ZDoh-2 ne priznava olajšave za vzdrževane otroke ({kids}×) iz dejavnosti (popoldanski s.p. jo uveljavlja pri plači).<span class="tt-gap"></span><strong>Zdravstvo: 0,00 €</strong> — Otroci so pri ZZZS zavarovani brez doplačila.',
  tip_fam_hr:
    '<strong class="tt-head">Hrvaška Paušalni obrt — Družina (0,00 €{per})</strong><strong>Davčna olajšava: 0,00 €</strong> — Fiksni pavšalni razredi PO-SD ne omogočajo uveljavljanja osebne olajšave za vzdrževane člane (<em>osobni odbitak</em> velja le pri progresivni dohodnini).<span class="tt-gap"></span><strong>Zdravstvo: 0,00 €</strong> — Otroci in brezposelni zakonec imajo brezplačno javno zavarovanje HZZO.',
  tip_fam_it:
    '<strong class="tt-head">Italija Regime Forfettario — Družina (0,00 €{per})</strong><strong>Davčna olajšava: 0,00 €</strong> — Izbira nadomestnega 5 %/15 % davka izključuje družinske davčne olajšave IRPEF (<em>carichi di famiglia</em>).<span class="tt-gap"></span><strong>Zdravstvo: 0,00 €</strong> — Vzdrževani zakonec in otroci z rezidentstvom imajo brezplačno javno zdravstvo SSN (otroški dodatek <em>Assegno Unico</em> izplačuje INPS ločeno).',
  tip_fam_at_credits:
    '<strong class="tt-head">Avstrija Pauschalierung — Družina ({delta}{per})</strong>Tarifna dohodnina (<strong>{grossTax}{per}</strong>) se neposredno zniža za:<span class="tt-gap"></span>• <strong>Familienbonus Plus:</strong> +{fb}{per} (§ 33 Abs. 3a EStG)<br>• <strong>Olajšava edinega hranitelja (AVAB):</strong> +{avab}{per} (§ 33 Abs. 4 Z 1 EStG)<br>• <strong>Preostanek dohodnine:</strong> {netTax}{per}<br>• <strong>SVS pribitek zakonca:</strong> 0,00 € (oproščeno zaradi otrok po § 51d GSVG)',
  tip_fam_at_waived:
    '<strong class="tt-head">Avstrija Pauschalierung — Družina (0,00 €{per})</strong><strong>Davčni odbitki: 0,00 €</strong> — Olajšava edinega hranitelja (AVAB) zahteva vsaj 1 otroka z družinskim dodatkom (<em>Familienbeihilfe</em>).<span class="tt-gap"></span><strong>SVS pribitek zakonca: 0,00 €</strong> — +3,4 % SVS pribitek (§ 51d GSVG) je oproščen zaradi ≥4 let preteklega varstva otrok.',
  tip_fam_at_svs:
    '<strong class="tt-head">Avstrija Pauschalierung — Družina ({delta}{per})</strong><strong>SVS zavarovanje zakonca: −{svsFee}{per}</strong> — Sozavarovanje nezaposlenega zakonca brez otrok doda +3,4 % zdravstveni pribitek GSVG (§ 51d GSVG; AVAB zahteva ≥1 otroka).<span class="tt-gap"></span><strong>Davčni prihranek: +{taxSaved}{per}</strong> — Ker obvezni prispevki SVS znižujejo davčno osnovo, se progresivna dohodnina zniža za {taxSaved}{per}.',
  tip_fam_hu_ata:
    '<strong class="tt-head">Madžarska Átalányadó — Družina ({delta}{per})</strong>Podvojena družinska olajšava 2026 (Szja tv. 29/A. § in Tbj. 34. §) ter zdravstvo zakonca:<span class="tt-gap"></span>• <strong>Znižanje 15 % SZJA davka:</strong> +{szjaCred}{per}<br>• <strong>Prenos v 18,5 % TBJ prispevke:</strong> +{tbjCred}{per}<br>• <strong>Zdravstveni prispevek zakonca (12.300 Ft/mes.):</strong> −{spouseFee}{per}',
  tip_fam_hu_kata:
    '<strong class="tt-head">Madžarska Nova KATA — Družina ({delta}{per})</strong><strong>Otroška olajšava: 0,00 €</strong> — Fiksnega pavšala KATA (50.000 Ft/mes.) ni mogoče znižati z družinskimi davčnimi olajšavami.<span class="tt-gap"></span><strong>Zdravstvo zakonca: −{spouseFee}{per}</strong> — Nezavarovani zakonec plačuje obvezni zdravstveni prispevek 12.300 Ft/mes. (147.600 Ft/leto).',
  tip_fam_pl_ryczalt:
    '<strong class="tt-head">Poljska {regime} — Družina (0,00 €{per})</strong><strong>Davčna olajšava: 0,00 €</strong> — Pavšalni <em>Ryczałt</em> in 19 % <em>Liniowy</em> ne priznata otroških olajšav niti skupne obdavčitve z zakoncem (na voljo pri <em>Skali 12 %/32 %</em> v poljskem kalkulatorju).<span class="tt-gap"></span><strong>Zdravstvo: 0,00 €</strong> — Nezaposlen zakonec in otroci so brezplačno zdravstveno sozavarovani prek NFZ (<em>ZCNA</em>).',
  tip_fam_pl_skala:
    '<strong class="tt-head">Poljska Skala (12 %/32 %) — Družina ({delta}{per})</strong>• <strong>Skupna napoved z zakoncem:</strong> +{spouseCred}{per} (podvoji 30.000 zł neobdavčene osnove in razred 120.000 zł)<br>• <strong>Ulga na dzieci (otroški odbitek):</strong> +{childCred}{per}<br>• <strong>Družinsko zdravstvo NFZ (ZCNA):</strong> 0,00 € dodatnega stroška',
  tip_fam_cz_pausal:
    '<strong class="tt-head">Češka Paušální daň — Družina ({delta}{per})</strong><strong>Davčni odbitki: 0,00 €</strong> — Fiksni mesečni pasovi Paušální daň ne priznavajo otroških ali zakonskih odbitkov (Avtomatski režim sam preklopi na 60 % Výdaje, ko družinski odbitki prinesejo višji neto!).<span class="tt-gap"></span><strong>Zdravstvo zakonca (OBZP): −{spouseFee}{per}</strong> — Od 2026 nezaposlen zakonec brez otroka &lt;7 let plačuje 3.024 Kč/mes. VZP.',
  tip_fam_cz_vydaje:
    '<strong class="tt-head">Češka OSVČ Výdaje — Družina ({delta}{per})</strong>• <strong>Otroški odbitek (Daňové zvýhodnění):</strong> +{childCred}{per}<br>• <strong>Odbitek za zakonca (otrok &lt;3):</strong> +{spouseCred}{per}<br>• <strong>Zdravstvo zakonca OBZP:</strong> −{spouseFee}{per} (3.024 Kč/mes. brez otroka &lt;7 let)',
  tip_fam_sk:
    '<strong class="tt-head">Slovaška SZČO — Družina ({delta}{per})</strong>• <strong>Otroški davčni bonus (Daňový bonus):</strong> +{childCred}{per} (1.200 €/leto na otroka &lt;15 let, omejeno z ČZD)<br>• <strong>Davčni prihranek NČZD zakonca:</strong> +{spouseCred}{per} (do 5.455,30 € olajšave)<br>• <strong>Zdravstvo zakonca ZP:</strong> −{spouseFee}{per} (121,92 €/mes. brez otrok / pogoja)',
  tip_fam_es:
    '<strong class="tt-head">Španija Autónomo — Družina ({delta}{per})</strong>• <strong>Skupna napoved z zakoncem (Declaración conjunta):</strong> +{spouseCred}{per} (−3.400 €/leto osnove IRPF)<br>• <strong>Mínimo por descendientes:</strong> +{childCred}{per} (2.400–4.500 €/otroka neobdavčeno v spodnjih razredih IRPF)<br>• <strong>Družinsko zdravstvo SNS:</strong> 0,00 € univerzalno kritje',
  tip_status_eligible:
    '<strong class="tt-head">{country} — {regime} (Ustrezno)</strong>Bruto prihodki (<strong>{rev}{per}</strong>) so pod zakonsko mejo <strong>{limit}{per}</strong> in izpolnjujejo vse pogoje glede oblike zavarovanja ter vrste strank, zato je režim uvrščen na lestvico.',
  tip_status_proposed:
    '<strong class="tt-head">Slovenija ZIURS — Referendum 6. 12. 2026</strong>Zakon je Državni zbor sprejel 11. 5. 2026, njegova uveljavitev pa čaka na zakonodajni referendum 6. decembra 2026. Zvišuje mejo na <strong>150.000 €/leto</strong> (polni s.p., ≥5 mes. zavarovanja) oz. <strong>70.000 €/leto</strong> (popoldanski) s progresivno lestvico stroškov 80 % / 70 % / 40 % (aktivni prag: <strong>{limit}{per}</strong>).',
  tip_status_b2c_only:
    '<strong class="tt-head">Nedopustno za B2B — Samo fizične osebe</strong>Po madžarskem zakonu o novi KATA (2022. évi XIII. tv.) že en sam račun, izdan podjetju ali pravni osebi (<em>kifizető</em>, razen taksistov), takoj ukine status KATA. Za uvrstitev KATA zgoraj preklopite na <strong>B2C (Končne stranke)</strong>.',
  tip_status_fulltime_only:
    '<strong class="tt-head">Nedopustno za popoldanski S.P. — Samo polni</strong>Madžarska nova KATA (2022. évi XIII. tv.) je dovoljena izključno za polno samozaposlene (<em>főállású kisadózó</em>). Ob zaposlitvi za ≥36 ur/teden je treba uporabiti <strong>Átalányadó</strong>.',
  tip_status_fulltime_only_cz:
    '<strong class="tt-head">Nedopustno ob zaposlitvi — Samo glavni OSVČ</strong>Po češkem zakonu o dohodnini (§ 2a) podjetniki z redno zaposlitvijo ne morejo vstopiti v <em>Paušální daň</em>, temveč uporabljajo <strong>60 % Paušální výdaje</strong>.',
  tip_over_cap_si:
    '<strong class="tt-head">Slovenija {regime} — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo prag {limit}{per}. Presežek davčne osnove se obdavči po stopnji <strong>35 %</strong> (namesto 20 %), ob prekoračitvi 2-letnega povprečja pa sledi izstop iz normiranstva v naslednjem letu.',
  tip_over_cap_hr:
    '<strong class="tt-head">Hrvaška Paušalni obrt — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo trdo mejo 60.000 €/leto, kar sproži obvezni vstop v sistem <strong>25 % PDV (DDV)</strong> in prehod na vodenje poslovnih knjig po dejanskih stroških (<em>Dohodak</em>).',
  tip_over_cap_it:
    '<strong class="tt-head">Italija Forfettario — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo mejo 85.000 €/leto: med 85k in 100k € sledi prehod na progresivni IRPEF + 22 % IVA v naslednjem letu, nad <strong>100.000 €/leto</strong> pa režim preneha takoj med letom z obračunom 22 % IVA.',
  tip_over_cap_at:
    '<strong class="tt-head">Avstrija {regime} — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo izbrani prag po § 17 EStG (<strong>{limit}{per}</strong>), zato je potreben prehod na Basispauschalierung (do 420k €/leto) ali dejanske stroške (<em>E/A-Rechnung</em>).',
  tip_over_cap_hu_ata:
    '<strong class="tt-head">Madžarska Átalányadó — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo 10-kratnik letne minimalne plače (38.736.000 Ft ≈ {limit}{per}), zato pavšalna obdavčitev ni več dovoljena in je potreben prehod na dejanske stroške (<em>Vállalkozói SZJA</em>).',
  tip_over_cap_hu_kata:
    '<strong class="tt-head">Madžarska KATA — Nad kvoto {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo letno kvoto 18.000.000 Ft (≈ {limit}{per}); na ves presežni promet se poleg mesečnega pavšala 50.000 Ft obračuna še <strong>40 % posebni davek KATA</strong>.',
  tip_over_cap_pl:
    '<strong class="tt-head">Poljska Ryczałt — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo zakonsko mejo 2.000.000 €/leto za pavšalni <em>Ryczałt</em>, zato je potreben prehod na 19 % <em>Podatek liniowy</em> ali <em>Skalo</em>.',
  tip_over_cap_cz:
    '<strong class="tt-head">Češka Paušální daň — Nad mejo {limit}{per}</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo češko mejo 2.000.000 Kč/leto za <em>Paušální daň</em> in sprožijo obvezni 21 % DPH ter prehod na klasično obdavčitev OSVČ.',
  tip_over_cap_sk:
    '<strong class="tt-head">Slovaška SZČO — Nad mejo {limit}{per} za 15 % davek</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo slovaški prag 100.000 €/leto za znižano 15 % dohodnino SZČO; davčna osnova preide v progresivne razrede 2026 (19 %–35 %).',
  tip_over_cap_es:
    '<strong class="tt-head">Španija Autónomo — Nad mejo {limit}{per} EDS</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo mejo 600.000 €/leto za <em>Estimación Directa Simplificada</em>, kar zahteva prehod na <em>Estimación Directa Normal</em>.',
  tip_b2c_vat_free:
    '<strong class="tt-head">{country} — Brez DDV za B2C (≤{limit}{per})</strong>Prihodki (<strong>{rev}{per}</strong>) ne presegajo nacionalnega praga za male davčne zavezance (<strong>{limit}{per}</strong>). Končnim potrošnikom zaračunavate <strong>0 % DDV</strong> namesto splošne stopnje {rate} %.',
  tip_b2c_vat_req:
    '<strong class="tt-head">{country} — Obvezen +{rate} % DDV za B2C</strong>Prihodki (<strong>{rev}{per}</strong>) presegajo nacionalni prag oprostitve DDV (<strong>{limit}{per}</strong>), kar sproži obvezni <strong>{rate} % DDV</strong>. Ker fizične osebe (B2C) DDV ne morejo odbiti, to podraži končno ceno za +{rate} % ali zniža vašo maržo.',
  tip_delta_baseline:
    '<strong class="tt-head">Izhodišče — Veljavni zakon v Sloveniji (ZPZR 2026)</strong><strong>{net}{per}</strong> neto izkupička (<strong>{eff}</strong> skupna obremenitev). Vse razlike +/- v tem stolpcu kažejo odstopanje neto prihodka glede na trenutno veljavno slovensko ureditev normirancev.',
  tip_delta_vs_si:
    '<strong class="tt-head">{country} ({regime}) vs. Slovenija Zdaj</strong>• <strong>{country} neto:</strong> {net}{per} ({eff} dajatev)<br>• <strong>Slovenija (ZPZR) neto:</strong> {baseNet}{per} ({baseEff} dajatev)<span class="tt-gap"></span>Neto razlika: <strong>{delta}{per}</strong> pri enakih bruto prihodkih in družinskem stanju.',
  tip_si_cap_zpzr:
    '<strong class="tt-head">Veljavna meja prihodkov (ZPZR 2026)</strong>Letni oz. 2-letni povprečni izstopni prag znaša <strong>{limit}/leto</strong> (za prag 120k € je potrebnih ≥9 zaporednih mesecev polnega zavarovanja; presežek osnove nad mejo je obdavčen s 35 %).',
  tip_si_cap_ziurs:
    '<strong class="tt-head">Predlagana meja prihodkov (ZIURS)</strong>Zvišuje izstopni prag na <strong>{limit}/leto</strong> (150k € za polni s.p. ob omiljenem pogoju ≥5 mesecev zavarovanja; 70k € za popoldanski s.p.); uveljavitev čaka na referendum 6. 12. 2026.',
  tip_si_cap_diff:
    '<strong class="tt-head">Zvišanje praga po ZIURS (+{diff}/leto)</strong>Zvišuje dovoljeno zgornjo mejo prihodkov normirancev za <strong>+{diff}/leto</strong> in skrajšuje zahtevano obdobje polnega zavarovanja z 9 zaporednih mesecev na 5 mesecev.',

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

  // Accessibility & Screen-Reader Announcements
  skip_to_calc: 'Preskoči na kalkulator',
  aria_countries_nav: 'Države in čezmejna primerjava',
  aria_billing_period: 'Obračunsko obdobje',
  aria_si_regime_group: 'Slovenski davčni režim',
  aria_info_about: 'Podrobnosti: {topic}',
  aria_decrease: 'Zmanjšaj: {label}',
  aria_increase: 'Povečaj: {label}',
  aria_alloc_bar: 'Razporeditev prihodkov: {netPct} neto, {socPct} prispevki, {taxPct} davek',
  tbl_si_cmp_caption: 'Primerjava Normiranec 2026: Veljavni zakon (ZPZR) proti predlogu ZIURS',
  tbl_arena_caption: 'Primerjava neto izkupička samostojnih podjetnikov 2026 v 9 državah EU',
  svg_chart_valuetext: 'Prihodki {rev}: Zdaj {zpzr} obremenitev, Predlog ZIURS {ziurs} obremenitev',
  sr_live_single: '{country}: Neto ostane {net}{per} ({eff} efektivna obremenitev)',
  sr_live_si_cmp: 'Slovenija Primerjava: Zdaj {zpzr}{per}, Predlog ZIURS {ziurs}{per} ({diff})',
  sr_live_arena: 'Primerjaj vse pri {gross}{per}: Najugodnejši ustrezni režim {winner} z {net} neto',

  // Country Parameter & Household Statutory Tooltips (9 Countries)
  desc_si_man_base:
    '<strong class="tt-head">Prostovoljna ročna zavarovalna osnova — 145. člen ZPIZ-2</strong>Omogoča izbiro lastne mesečne zavarovalne osnove med zakonskim minimumom <strong>60 %</strong> (1.521,62 €/mes) in maksimumom <strong>350 %</strong> (8.876,11 €/mes) povprečne plače SURS 2025 (2.536,03 €). Višja osnova zviša bodočo pokojnino in nadomestila ob 40,20 % stopnji prispevkov (+ fiksni OZP 39,36 €/mes); znižanje pod odmerjeno dobičkovno osnovo pa zahteva vlogo na FURS ob padcu dobička (do −20 %).',

  hr_desc_emp:
    '<strong class="tt-head">Hrvaška — Polni obrt proti obrtu ob zaposlitvi</strong><strong>Primarna dejavnost (polni):</strong> Plačuje fiksne mesečne prispevke <strong>290,98 €/mes</strong> (3.491,76 €/leto) od zakonske osnove 797,20 € (15 % MIO I + 5 % MIO II + 16,5 % HZZO zdravstvo).<span class="tt-gap"></span><strong>Ob zaposlitvi (uz radni odnos):</strong> Če ste že polno zavarovani pri delodajalcu, mesečnih akontacij ni, letni prispevki pa znašajo le <strong>17,5 %</strong> od pavšalne 15 % davčne osnove razreda (296,63 €–1.575,00 €/leto).',
  hr_desc_hok:
    '<strong class="tt-head">Članarina obrtni zbornici HOK — 77. člen Zakona o obrtu</strong>Hrvaški obrtniki plačujejo četrtletno članarino <em>Hrvatski obrtnički komori (HOK)</em> v višini <strong>11,40 €/mes</strong> (34,20 €/četrtletje = 136,80 €/leto). Ob prvem vpisu obrta v register velja zakonska <strong>oprostitev plačila HOK za prvi 2 koledarski leti</strong>.',
  desc_hr_family:
    '<strong class="tt-head">Hrvaška Paušalni obrt — Družina in HZZO</strong>Ker se davek PO-SD odmerja po fiksnih pavšalnih razredih (12 % na 15 % vrha razreda), osebne olajšave za vzdrževane člane (<em>osobni odbitak</em>) pavšalnega davka ne znižajo (<strong>0 €</strong> olajšave; zaposleni jih uveljavljajo pri plači).<span class="tt-gap"></span>Vzdrževani otroci in brezposelni zakonec imajo brezplačno javno zdravstveno zavarovanje HZZO (<strong>0 €</strong>).',

  it_desc_tax:
    '<strong class="tt-head">Italija — 5 % Startup proti 15 % standardnemu davku</strong><strong>5 % Startup stopnja (prvih 5 let):</strong> Zahteva dejansko novo dejavnost — v zadnjih 3 letih niste smeli opravljati samostojne dejavnosti in delo ne sme biti zgolj nadaljevanje prejšnje zaposlitve ali dejavnosti (Legge 190/2014, čl. 1(65)).<span class="tt-gap"></span><strong>15 % Standardna stopnja:</strong> Velja od 6. leta dalje ali kadar pogoji za startup niso izpolnjeni.',
  it_desc_activity:
    '<strong class="tt-head">Količnik dobičkonosnosti ATECO (Coefficiente di redditività)</strong>Regime Forfettario ne upošteva dejanskih računov za stroške, temveč določi bruto davčno osnovo kot <code>Prihodki × ATECO %</code>:<span class="tt-gap"></span>• <strong>67 %</strong> (33 % normirani stroški): IT in programiranje (ATECO 62.01/62.02) ter obrtniki<br>• <strong>78 %</strong> (22 % normirani stroški): Svobodni poklici, svetovalci, inženirji in oblikovalci<br>• <strong>40 %</strong> (60 % normirani stroški): Trgovina, e-trgovina in gostinstvo',
  it_desc_inps:
    '<strong class="tt-head">Izbira pokojninske blagajne INPS (2026)</strong><strong>Gestione Separata (26,07 % polni / 24,00 % ob zaposlitvi):</strong> Za svobodne poklice in IT svetovalce brez zbornice. Ima <strong>0 € fiksnega minimuma</strong> — plačuje se sorazmerno od ATECO dobička do stropa 120.607 €.<span class="tt-gap"></span><strong>Artigiani (24 %) in Commercianti (24,48 %):</strong> Vpisani v zbornico plačujejo obvezni fiksni minimum (~4.521 € / 4.612 € do osnove 18.808 € <em>minimale</em>) + variabilni % nad 18.808 €. Vplačani INPS se odšteje pred 5 %/15 % davkom.',
  it_desc_discount:
    '<strong class="tt-head">Izbirni −35 % popust INPS za Forfettario</strong>Obrtniki (<em>Artigiani</em>) in trgovci (<em>Commercianti</em>) v režimu Forfettario lahko uveljavljajo <strong>−35 % znižanje</strong> fiksnih in variabilnih prispevkov INPS.<span class="tt-gap"></span><strong>Vpliv na pokojnino:</strong> Če znižano letno vplačilo ne doseže polnega minimuma na osnovi 18.808 €, INPS prizna sorazmerno manj pokojninske dobe (~7,8 namesto 12 mesecev/leto).',
  desc_it_family:
    '<strong class="tt-head">Italija Regime Forfettario — Družina in SSN</strong>Izbira nadomestnega davka 5 %/15 % nadomesti progresivno IRPEF in izključuje davčne olajšave za vzdrževane člane (<em>carichi di famiglia</em> = <strong>0 €</strong> davčnega znižanja).<span class="tt-gap"></span>Otroci in brezposelni zakonec imajo brezplačno javno zdravstvo <em>SSN</em> (<strong>0 €</strong>), družine pa ločeno pri INPS prejemajo neobdavčeni otroški dodatek <em>Assegno Unico</em>.',

  at_desc_scheme:
    '<strong class="tt-head">Avstrija — Pavšalni shemi po § 17 EStG (2026)</strong><strong>Samodejno optimalno:</strong> Izbere ustrezno shemo z višjim neto izkupičkom.<span class="tt-gap"></span><strong>Kleinunternehmerpauschalierung (§ 17 Abs. 3a):</strong> Do 55.000 € (toleranca 60.500 €, vezano na oprostitev DDV); prizna <strong>20 %</strong> odhodkov za storitve (maks. 11.000 €) ali <strong>45 %</strong> za blago (maks. 24.750 €).<span class="tt-gap"></span><strong>Basispauschalierung (§ 17 Abs. 1):</strong> Do 420.000 €; prizna <strong>6 %</strong> za svetovanje/IT (maks. 25.200 €) ali <strong>15 %</strong> splošno (maks. 63.000 €). Obe shemi odštejeta SVS + 15 % <em>Grundfreibetrag</em>.',
  at_desc_activity:
    '<strong class="tt-head">Dejavnost in stopnja pavšalnih odhodkov v Avstriji</strong>Določa zakonski odstotek pavšalnih odhodkov pred odbitkom SVS in <em>Grundfreibetrag</em>:<span class="tt-gap"></span>• <strong>IT / Svetovanje / Storitve:</strong> <strong>20 %</strong> v Kleinunternehmerpauschalierung oziroma <strong>6 %</strong> (<em>Beratung/IT</em>) v Basispauschalierung.<br>• <strong>Trgovina / Proizvodnja:</strong> <strong>45 %</strong> v Kleinunternehmerpauschalierung oziroma <strong>15 %</strong> v Basispauschalierung.',
  at_desc_emp:
    '<strong class="tt-head">Avstrija — Polni GSVG proti popoldanski dejavnosti (ASVG + GSVG)</strong><strong>Primarna dejavnost:</strong> Plačuje GSVG SVS (26,83 % = 18,5 % PV + 6,8 % KV + 1,53 % BMSVG od letne osnove 6.613,20 €–97.020 € + 144,84 €/leto nezgoda UV).<span class="tt-gap"></span><strong>Ob zaposlitvi:</strong> Ob sočasni zaposlitvi ASVG lahko pri letnem dobičku ≤6.613,20 € (<em>Versicherungsgrenze</em>) in prometu ≤55.000 € uveljavite izvzem iz PV/KV in plačujete le <strong>UV (12,07 €/mes)</strong>; nad 6.613,20 € velja polni SVS.',
  at_desc_spouse_waiver:
    '<strong class="tt-head">SVS sozavarovanje zakonca (+3,4 % Mitversicherung)</strong>Sozavarovanje brezposelnega zakonca brez otrok po § 51d / § 83 GSVG običajno doda <strong>+3,4 % zdravstveni pribitek SVS</strong> na KV osnovo podjetnika.<span class="tt-gap"></span>Izberite <strong>Oproščeno (0 %)</strong>, če je zakonec v preteklosti vsaj 4 leta vzgajal otroke, prejema dodatek za nego (<em>Pflegegeld</em> ≥ stopnja 3) ali neguje svojca.',
  desc_at_family:
    '<strong class="tt-head">Avstrija Pauschalierung — Družinski odbitki in SVS</strong>Progresivna avstrijska dohodnina ESt (0 %–55 %) priznava neposredne davčne odbitke:<span class="tt-gap"></span>• <strong>Familienbonus Plus:</strong> do <strong>2.000,16 €/leto</strong> na otroka &lt;18 let<br>• <strong>Alleinverdienerabsetzbetrag (AVAB):</strong> 612 € (1 otrok), 828 € (2), +273 € za vsakega naslednjega ob ≥1 otroku in dohodku zakonca ≤7.411 €<br>• <strong>SVS zdravstvo:</strong> 0 € za otroke in starše; +3,4 % pribitek le za zakonca brez otrok (brez oprostitve).',

  hu_desc_regime:
    '<strong class="tt-head">Madžarska — Átalányadó proti Novi KATA (2026)</strong><strong>Átalányadó (pavšalni odhodki):</strong> Dovoljuje poslovanje z <strong>B2B podjetji in B2C strankami</strong> do 38.736.000 Ft/leto (193,68M Ft trgovina), s 45 %/80 %/90 % normiranimi stroški in neobdavčenim dobičkom do 1.936.800 Ft.<span class="tt-gap"></span><strong>Nova KATA (50.000 Ft/mes):</strong> Fiksni davek do 18.000.000 Ft/leto, vendar strogo omejen na <strong>polni delovni čas in izključno fizične osebe (samo B2C)</strong> — en sam B2B račun izniči status KATA.',
  hu_desc_fx:
    '<strong class="tt-head">Vpliv tečaja EUR / HUF</strong>Preračuna vaše EUR prihodke glede na madžarske zakonske pragove v forintih: <strong>1.936.800 Ft</strong> neobdavčeni dobiček, <strong>18.000.000 Ft</strong> kvota KATA, <strong>20.000.000 Ft</strong> meja za DDV (<em>Alanyi adómentesség</em>, 27 % ÁFA) in <strong>38.736.000 Ft</strong> strop Átalányadó.',
  hu_desc_emp:
    '<strong class="tt-head">Madžarska — Polni s.p. (Főállású) proti popoldanskemu (Mellékállású)</strong><strong>Polni (Főállású):</strong> Plačuje mesečni minimum prispevkov TBJ (18,5 %) in SZOCHO (13 % na 100 % osnovo v 2026 — faktor 112,5 % je odpravljen) od minimalne plače tudi, ko je dobiček v neobdavčenem pasu.<span class="tt-gap"></span><strong>Ob zaposlitvi (≥36 ur/teden):</strong> Ni minimalne osnove za prispevke — znotraj neobdavčenega dobička 1.936.800 Ft (~3,52M Ft prihodkov pri 45 % stroških) znašajo SZJA, TBJ in SZOCHO <strong>0 Ft</strong>.',
  hu_desc_expense:
    '<strong class="tt-head">Zakonski razredi odhodkov Átalányadó (Szja tv. 53. §)</strong>Avtomatični odbitek od bruto prihodkov brez zbiranja računov:<span class="tt-gap"></span>• <strong>45 %</strong> (zvišano s 40 % v 2026): Splošne storitve, IT, programiranje, svetovanje in intelektualno delo<br>• <strong>80 %</strong>: Obrtne dejavnosti, gradbeništvo, proizvodnja, prevozi in fotografija<br>• <strong>90 %</strong>: Izključno trgovina na drobno z blagom (strop 50× letna minimalna plača)',
  hu_desc_wage:
    '<strong class="tt-head">Minimalna osnova za prispevke (2026)</strong>Določa mesečno minimalno osnovo za TBJ (18,5 %) in SZOCHO (13 %) pri polnem <em>Átalányadó</em>:<span class="tt-gap"></span>• <strong>Garantált bérminimum (373.200 Ft/mes):</strong> Obvezen za vse dejavnosti (FEOR), ki zahtevajo vsaj srednješolsko ali univerzitetno izobrazbo (vključuje IT, inženiring in svetovanje).<br>• <strong>Minimálbér (322.800 Ft/mes):</strong> Velja le za nekvalificirane dejavnosti.',
  hu_desc_hipa:
    '<strong class="tt-head">Lokalni občinski davek — HIPA (Iparűzési adó)</strong>Občinski davek na dejavnost (do 2 %):<span class="tt-gap"></span>• <strong>Poenostavljeni pasovi (Sávos):</strong> Fiksni letni znesek <strong>50.000 Ft</strong> (prihodki ≤12M Ft), <strong>120.000 Ft</strong> (12M–18M Ft) ali <strong>170.000 Ft</strong> (18M–25M Ft) brez izračuna osnove.<br>• <strong>Standardni 2 %:</strong> Odmerjen od 120 % neto dohodka Átalányadó.<br>• <strong>0 % občina:</strong> Občine brez davka HIPA.',
  desc_hu_family:
    '<strong class="tt-head">Madžarska — Podvojena družinska olajšava 2026 in zakonec</strong><strong>Átalányadó:</strong> Omogoča podvojeno olajšavo <em>Családi kedvezmény</em> za leto 2026, ki znižuje tako 15 % SZJA kot 18,5 % TBJ (prihranek do <strong>20.001 Ft/mes</strong> za 1 otroka, <strong>79.998 Ft/mes</strong> za 2, <strong>198.000 Ft/mes</strong> za 3). <strong>KATA:</strong> 0 Ft olajšave.<span class="tt-gap"></span>Za brezposelnega zakonca ni davčne olajšave, nezavarovani odrasli zakonec pa plačuje obvezni zdravstveni prispevek NEAK (<strong>12.300 Ft/mes</strong> = 147.600 Ft/leto).',

  pl_desc_regime:
    '<strong class="tt-head">Poljska — Davčni režimi JDG (Forma opodatkowania)</strong><strong>Ryczałt (do 2M €):</strong> Pavšalna stopnja po PKWiU (8,5 %–15 %) na bruto prihodke zmanjšane za ZUS in 50 % 3-stopenjskega NFZ zdravstva (498,35 / 830,58 / 1.495,04 zł/mes). Brez uveljavljanja stroškov.<span class="tt-gap"></span><strong>Skala (12 % / 32 %):</strong> 30.000 zł neobdavčeno, 12 % do 120.000 zł, 32 % nad tem + 9 % NFZ; edina omogoča <strong>skupno odmero z zakoncem in olajšavo za otroke</strong>.<span class="tt-gap"></span><strong>Podatek liniowy (19 %):</strong> Enotna 19 % stopnja + 4,9 % NFZ (odbitno do 14.100 zł/leto).',
  pl_desc_rate:
    '<strong class="tt-head">Poljska — Stopnje Ryczałt po klasifikaciji PKWiU</strong>Stopnja davka na prihodke je odvisna od uradne PKWiU šifre storitve:<span class="tt-gap"></span>• <strong>12 %</strong>: Razvoj programske opreme, programiranje, DevOps in IT svetovanje (PKWiU 62)<br>• <strong>8,5 %</strong>: Splošne storitve, ročno QA testiranje, ne-programerski PM/BA in administracija<br>• <strong>14 %</strong>: Arhitektura, gradbeni/industrijski inženiring in projektiranje (PKWiU 71)<br>• <strong>15 %</strong>: Poslovno svetovanje (management), marketing, oglaševanje in kadrovanje',
  pl_desc_fx:
    '<strong class="tt-head">Vpliv tečaja EUR / PLN</strong>Preračuna EUR prihodke glede na poljske pragove v zlotih: povišani prag za oprostitev DDV v 2026 <strong>240.000 zł</strong> (<em>zwolnienie z VAT</em>, prej 200k zł), razrede za zdravstveni prispevek NFZ pri <em>Ryczałt</em> (<strong>60.000 zł</strong> in <strong>300.000 zł</strong>) ter davčna razreda <em>Skala</em> (30.000 zł / 120.000 zł).',
  pl_desc_emp:
    '<strong class="tt-head">Poljska — Polni JDG proti dejavnosti ob zaposlitvi (Zbieg tytułów)</strong><strong>Polni JDG:</strong> Plačuje socialne prispevke ZUS glede na izbrano stopnjo ter zdravstveni prispevek NFZ.<span class="tt-gap"></span><strong>Ob zaposlitvi:</strong> Po pravilu <em>zbieg tytułów ubezpieczeń</em> pogodba o zaposlitvi z vsaj minimalno plačo 2026 (<strong>≥4.806 zł/mes</strong> bruto) v celoti oprosti JDG plačila socialnih prispevkov ZUS (<strong>0 zł</strong>) — plačujeta se le NFZ zdravstvo in PIT.',
  pl_desc_zus:
    '<strong class="tt-head">3-stopenjska lestvica prispevkov ZUS (2026)</strong>Novi ustanovitelji JDG (ki ne delajo za bivšega delodajalca) prvih 30 mesecev koristijo olajšave (brez izbirne bolniške <em>chorobowe</em>):<span class="tt-gap"></span>• <strong>1. leto (Ulga na start + Preferencyjny):</strong> 0 zł socialnega ZUS prvih 6 mesecev, nato 420,86 zł/mes v mesecih 7–12 (2.525,16 zł/leto).<br>• <strong>Meseci 7–30 (Preferencyjny ZUS):</strong> <strong>420,86 zł/mes</strong> od 30 % minimalne plače (osnova 1.441,80 zł).<br>• <strong>Standardni (Duży ZUS):</strong> <strong>1.788,29 zł/mes</strong> od 60 % napovedane povprečne plače (osnova 5.652,00 zł).',
  desc_pl_family:
    '<strong class="tt-head">Poljska JDG — Skupna odmera z zakoncem, otroci in NFZ</strong><strong>Skala podatkowa (12 %/32 %):</strong> Omogoča skupno davčno napoved z brezposelnim zakoncem (<em>wspólne rozliczenie</em> podvoji 0 % olajšavo na <strong>60.000 zł</strong> in 12 % razred na <strong>240.000 zł</strong>) ter odbitek <em>Ulga na dzieci</em> (1.112 / 1.112 / 2.000 / 2.700 zł/leto). Pri <em>Ryczałt</em> in <em>Liniowy</em> davčnih olajšav ni (0 zł).<span class="tt-gap"></span>V <strong>vseh 3 režimih</strong> prijava zakonca in otrok prek ZUS ZCNA zagotavlja <strong>brezplačno javno zdravstvo NFZ (0 zł)</strong>.',

  cz_desc_regime:
    '<strong class="tt-head">Češka — Paušální daň proti Výdajový paušál (2026)</strong><strong>Samodejno optimalno:</strong> Izbere ustrezni režim z višjim neto izkupičkom (samodejno preklopi na <em>Výdaje</em>, ko družinski bonusi presežejo Paušální daň).<span class="tt-gap"></span><strong>Paušální daň (≤2.000.000 Kč):</strong> Eno fiksno mesečno plačilo (9.162 / 16.745 / 27.139 Kč/mes) za davek + ČSSZ + VZP brez letnih obračunov; brez družinskih olajšav.<span class="tt-gap"></span><strong>Paušální výdaje (60 %/80 %/40 %):</strong> Brez zgornje meje prihodkov za upravičenost; prizna osnovno olajšavo 30.840 Kč ter otroške/zakonske odbitke.',
  cz_desc_fx:
    '<strong class="tt-head">Vpliv tečaja EUR / CZK</strong>Preračuna EUR prihodke glede na češke zakonske meje v kronah: pasove <em>Paušální daň</em> (<strong>1,0M / 1,5M / 2,0M Kč</strong>), prag za obvezni 21 % DDV (<strong>2.000.000 Kč</strong> DPH), kapice pavšalnih stroškov (800k / 1,2M / 1,6M Kč) in mejo 23 % dohodnine (1.762.812 Kč).',
  cz_desc_expense:
    '<strong class="tt-head">Dejavnost in kapice pavšalnih odhodkov (§ 7 ZDP)</strong>Določa odstotek normiranih stroškov (od osnove do 2M Kč) in meje pasov <em>Paušální daň</em>:<span class="tt-gap"></span>• <strong>60 % (maks. 1.200.000 Kč):</strong> Proste obrti (<em>živnost volná</em>) — IT, programiranje, marketing in svetovanje (1. pas do 1,5M Kč).<br>• <strong>80 % (maks. 1.600.000 Kč):</strong> Rokodelske obrti (<em>řemeslné živnosti</em>) in kmetijstvo (1. pas do 2,0M Kč).<br>• <strong>40 % (maks. 800.000 Kč):</strong> Licencirani poklici brez obrti — odvetniki, zdravniki, arhitekti in avtorji (1. pas do 1,0M Kč).',
  cz_desc_emp:
    '<strong class="tt-head">Češka — Glavna (Hlavní) proti stranski dejavnosti (Vedlejší OSVČ)</strong><strong>Primarna (Hlavní):</strong> Lahko izbere <em>Paušální daň</em> ali plačuje ČSSZ/VZP z mesečnimi minimumi 2026 (5.005 Kč socialno + 3.306 Kč zdravstvo).<span class="tt-gap"></span><strong>Ob zaposlitvi (Vedlejší):</strong> Nima pravice do <em>Paušální daň</em>, ne plačuje minimalne osnove VZP (le 13,5 % od 50 % dejanskega dobička) in plača <strong>0 Kč ČSSZ</strong>, če letni dobiček ne preseže <strong>117.521 Kč</strong> (<em>rozhodná částka</em>).',
  cz_desc_stage:
    '<strong class="tt-head">Znižana začetna osnova ČSSZ za nove OSVČ (2026)</strong>Pri standardnih <em>Paušální výdaje</em> <strong>ustaljeni OSVČ</strong> plačujejo minimalno mesečno akontacijo ČSSZ <strong>5.005 Kč/mes</strong> (29,2 % od 35 % povprečne plače 48.967 Kč).<span class="tt-gap"></span><strong>Novi OSVČ</strong> (prva registracija brez dejavnosti v zadnjih 20 letih) v začetnih koledarskih letih plačujejo znižani minimum na 25 % osnovi v višini <strong>3.575 Kč/mes</strong>.',
  cz_desc_spouse_care:
    '<strong class="tt-head">Češko pravilo 2026 — Skrb zakonca za mlajšega otroka</strong>Po češki konsolidacijski reformi zahteva uveljavljanje <strong>olajšave za zakonca 24.840 Kč/leto</strong> (<em>sleva na manželku</em>, dohodek zakonca ≤68.000 Kč) skrb za otroka, <strong>mlajšega od 3 let</strong>.<span class="tt-gap"></span>Celodnevna skrb za otroka pod 7 let zakoncu hkrati zagotavlja <strong>državno kritje zdravstva VZP</strong> in odpravi obvezno plačilo <strong>3.024 Kč/mes OBZP</strong>.',
  desc_cz_family:
    '<strong class="tt-head">Češka OSVČ — Družinski bonusi in OBZP zdravstvo</strong><strong>Paušální daň:</strong> Ne priznava nobenih olajšav za otroke ali zakonca (<strong>0 Kč</strong> po § 2a ZDP).<span class="tt-gap"></span><strong>Paušální výdaje:</strong> Omogoča vračljive otroške odbitke <em>Daňové zvýhodnění</em> (<strong>15.204 / 22.320 / 27.840 Kč/leto</strong> na otroka — presežek nad davkom se izplača kot <em>daňový bonus</em>) ter <strong>24.840 Kč/leto</strong> za zakonca z otrokom &lt;3 let. Nezavarovani zakonec brez varstva otroka &lt;7 let plačuje <strong>3.024 Kč/mes OBZP</strong>.',

  sk_desc_emp:
    '<strong class="tt-head">Slovaška — Polni SZČO proti dejavnosti ob zaposlitvi (Popri zamestnaní)</strong><strong>Polni SZČO:</strong> Od prvega dne plačuje zdravstveno zavarovanje ZP (16 % v 2026, minimum <strong>121,92 €/mes</strong>) in socialno zavarovanje SP (33,15 %, minimum <strong>303,11 €/mes</strong> nad 9.144 € prihodkov).<span class="tt-gap"></span><strong>Ob zaposlitvi:</strong> Zaposlitev odpravi minimalno osnovo ZP 121,92 €/mes (plača se 16 % le od dejanske osnove), SP pa znaša 0 €, če bruto prihodki ostanejo ≤9.144 €.',
  sk_desc_stage:
    '<strong class="tt-head">Slovaška — Faza poslovanja za Sociálna poisťovňa (2026)</strong><strong>Ustaljeni SZČO:</strong> Plačuje 33,15 % socialnih prispevkov (v 2026 zvišan minimum na 60 % povprečne plače 1.524 € = <strong>303,11 €/mes</strong>), kadar bruto prihodki presežejo 9.144 €.<span class="tt-gap"></span><strong>1. leto (Startup):</strong> Prikazuje začetno oprostitev socialnih prispevkov SP (0 € SP; plačuje se le 121,92 €/mes ZP). Opomba: slovaški konsolidacijski paket 2026 skrajšuje začetno SP počitnico za na novo odprte SZČO na prvih 5 mesecev.',
  sk_desc_spouse_care:
    '<strong class="tt-head">Slovaška — Pogoji za olajšavo za zakonca (§ 11 ods. 4 ZDP)</strong>Brezposelni zakonec je upravičen do davčne olajšave <strong>NČZD na manželku/manžela</strong> (do <strong>5.455,30 €/leto</strong>) in <strong>državnega zdravstvenega zavarovanja ZP (0 €)</strong> le, če skrbi za otroka do 3 let (oz. do 6 let ob invalidnosti), prejema dodatek za nego ali je invalid.<span class="tt-gap"></span>Brez teh pogojev je NČZD 0 €, nezavarovani zakonec pa kot samoplačnik plačuje <strong>121,92 €/mes</strong> ZP.',
  desc_sk_family:
    '<strong class="tt-head">Slovaška SZČO — Daňový bonus, NČZD za zakonca in ZP</strong>Slovaški 60 % pavšalni odhodki (maks. 20.000 €) ohranjajo vse družinske olajšave:<span class="tt-gap"></span>• <strong>Daňový bonus na dieťa:</strong> do <strong>1.200 €/leto</strong> (100 €/mes) na otroka &lt;15 let, omejen na 29 %–50 % davčne osnove in postopno znižan nad 27.432 € ČZD.<br>• <strong>NČZD za zakonca:</strong> do 5.455,30 € znižanja osnove ob izpolnjevanju pogojev varstva.<br>• <strong>Zdravstvo ZP:</strong> 0 € za otroke; <strong>121,92 €/mes</strong> za zakonca brez upravičene skrbi za otroka.',

  es_desc_stage:
    '<strong class="tt-head">Španija — Lestvica RETA po dejanskem dohodku in Tarifa Plana (2026)</strong><strong>Ustaljeni (15 razredov):</strong> Mesečni prispevek RETA (31,5 % vključno z 0,9 % MEI) raste glede na čisti donos od <strong>205,88 €/mes</strong> (R1 ≤670 €/mes) do <strong>607,35 €/mes</strong> min. osnove v 12. razredu (&gt;6.000 €/mes).<span class="tt-gap"></span><strong>Tarifa Plana (80 €/mes):</strong> Fiksni prispevek prvih 12 mesecev ob prvi registraciji RETA.<span class="tt-gap"></span><strong>Cuota Cero (0 €/mes):</strong> 100 % regionalno povračilo v 1. letu (Madrid, Andaluzija, Murcia, Kanarski otoki idr.).',
  es_desc_cost:
    '<strong class="tt-head">Španija — Dejanski stroški + 5 % Difícil Justificación</strong>Španija nima visokih normiranih stroškov za storitve. V režimu <em>Estimación Directa Simplificada</em> (do 600.000 €) davčno osnovo znižujejo:<span class="tt-gap"></span>1. <strong>Dokumentirani poslovni stroški</strong> (0 % / 10 % / 20 % z veljavnimi DDV računi)<br>2. <strong>100 % plačanih prispevkov RETA</strong><br>3. Avtomatični <strong>5 % odbitek gastos de difícil justificación</strong> od čistega donosa, omejen na <strong>2.000 €/leto</strong>.',
  es_desc_emp:
    '<strong class="tt-head">Španija — Polni Autónomo proti Pluriactividad</strong><strong>Polni Autónomo:</strong> RETA je vaše edino obvezno socialno zavarovanje.<span class="tt-gap"></span><strong>Ob zaposlitvi (Pluriactividad):</strong> Sočasna zaposlitev (<em>Régimen General</em>) in RETA. Mesečni prispevki RETA se med letom plačujejo redno, ob preseganju letnega stropa dvojnih vplačil pa TGSS naslednjo pomlad vrne 50 % presežka (do 50 % vplačanih RETA prispevkov).',
  desc_es_family:
    '<strong class="tt-head">Španija Autónomo — Declaración Conjunta, otroci in SNS</strong>Progresivna dohodnina IRPF (19 %–47 %) nudi dve družinski ugodnosti:<span class="tt-gap"></span>• <strong>Declaración conjunta (84. člen LIRPF):</strong> Skupna napoved z brezposelnim zakoncem neposredno zniža davčno osnovo za <strong>3.400 €/leto</strong>.<br>• <strong>Mínimo por descendientes:</strong> Oprosti <strong>2.400 € / 2.700 € / 4.000 € / 4.500 €</strong> na otroka v najnižjih razredih IRPF.<br>• <strong>Zdravstvo:</strong> Brezplačno javno zdravstvo (<strong>0 €</strong>) v sistemu <em>Sistema Nacional de Salud (SNS)</em>.',

  footer_disclaimer:
    'Izračun je informativne narave na podlagi uradnih predpisov za leto 2026 (ZPZR, ZPZR-A, ZPIZ-2, predlog ZIURS ter predpisi HR, IT, AT, HU, PL, CZ, SK, ES). Pred poslovnimi ali davčnimi odločitvami se vedno posvetujte z davčnim svetovalcem. Vsi izračuni potekajo izključno v vašem brskalniku.'
};
