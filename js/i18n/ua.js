export const UA = {
  doc_title: 'NettoEU — Калькулятор податків ФОП у 9 країнах ЄС (2026)',
  brand_title: 'NettoEU',
  brand_subtitle: 'Європейський калькулятор податків ФОП 2026 — 9 країн ЄС',

  // Top nav
  nav_si: 'Словенія',
  nav_hr: 'Хорватія',
  nav_it: 'Італія',
  nav_at: 'Австрія',
  nav_hu: 'Угорщина',
  nav_pl: 'Польща',
  nav_cz: 'Чехія',
  nav_sk: 'Словаччина',
  nav_es: 'Іспанія',
  nav_compare: 'Порівняти всі',
  btn_share: 'Поділитися',
  btn_copied: 'Посилання скопійовано!',

  // Shared controls
  label_revenue: 'Річний дохід (€)',
  label_revenue_mo: 'Місячний дохід (€)',
  equiv_annual: '= {val} / рік',
  equiv_monthly: '= {val} / міс.',
  desc_revenue:
    '<strong class="tt-head">Валовий дохід бізнесу (без ПДВ)</strong>Введіть річний або місячний оборот без ПДВ. Синхронізується між усіма 9 країнами та ареною порівняння (локальні валюти HUF, PLN і CZK конвертуються за редагованим курсом).',
  view_mo: 'Щомісяця',
  view_yr: 'Щорічно',
  res_gross_yr: 'Валовий дохід (Рік)',
  res_gross_mo: 'Валовий дохід (Місяць)',
  net_mo: 'Нетто (Місяць)',
  net_yr: 'Нетто (Рік)',
  lbl_total_tax: 'Разом податок і внески',
  lbl_eff_rate: 'Ефективне навантаження',
  kpi_kept: '{pct} від брутто',
  lbl_params: 'Параметри',
  lbl_statement: 'Деталізація',

  // Common result rows
  res_expenses: 'Визнані витрати',
  res_base: 'Податкова база',
  res_tax: 'Податок на дохід',
  res_soc: 'Соціальні внески',
  res_net: 'Чистий дохід (Нетто)',
  badge_limit: 'ПЕРЕВИЩЕННЯ',
  badge_eligible: 'Доступно',
  badge_over_cap: 'Понад ліміт',
  badge_b2c_only: 'Лише B2C',
  badge_fulltime_only: 'Лише повний ФОП',
  badge_b2c_vat_free: '0% ПДВ (≤{limit})',
  badge_b2c_vat_req: '+{rate}% ПДВ (>{limit})',

  // Shared Household & Dependents Controls
  fam_label: 'Сім’я та утриманці',
  fam_kids_short: 'Діти (<18)',
  fam_kids_0: '0 дітей',
  fam_kids_1: '1 дитина',
  fam_kids_2: '2 дітей',
  fam_kids_3: '3 дітей',
  fam_kids_4: '4 дітей',
  fam_spouse_short: 'Подружжя',
  fam_spouse_none: 'Без утриманця',
  fam_spouse_dep: 'Непрацююче подружжя',
  desc_family:
    '<strong class="tt-head">Сім’я: Діти та непрацююче подружжя (2026)</strong><strong>Режими з сімейними пільгами (AT, HU Átalányadó, CZ 60% Výdaje, SK, ES, PL Skala):</strong> Прямі дитячі кредити та пільги на подружжя суттєво зменшують податок (і HU TBJ) — AT 2 000 €/дитину + AVAB, HU подвоєні пільги 2026, CZ 15,2к–27,8к Kč/дитину, SK 1 200 €/дитину + NČZD подружжя, ES −3 400 € спільна декларація + дитячі мінімуми, PL Skala спільне оподаткування.<span class="tt-gap"></span><strong>Паушальні / цедулярні режими (SI, HR, IT, HU KATA, PL Ryczałt, CZ Paušální daň):</strong> <strong>0 €</strong> податкової знижки. Медицина непрацюючого подружжя коштує <strong>0 €</strong> у HR, IT, PL та ES, а обов’язкові внески діють у SI (OZP 39,36 €/міс.), HU (~30,75 €/міс.), CZ (OBZP 3 024 Kč/міс. без дитини &lt;7 р.), SK (121,92 €/міс. без дітей) та AT (+3,4% SVS без дітей).',
  badge_fam_delta: 'Сім’я {val}',
  badge_fam_zero: 'Сім’я 0 €',

  // Slovenia Regime Switcher (ZPZR vs ZIURS)
  si_reg_zpzr: 'Чинний закон (ZPZR)',
  si_reg_ziurs: 'Проєкт (ZIURS)',
  si_reg_compare: 'Порівняння: Зараз vs. ZIURS',
  si_teaser_gain: 'Зі ZIURS: {diff} нетто/рік → Порівняти',
  si_teaser_gain_mo: 'Зі ZIURS: {diff} нетто/міс. → Порівняти',
  si_teaser_same: 'ZIURS vs. ZPZR: однаково при цьому доході → Порівняти',
  si_referendum_banner:
    '<strong>Законодавчий референдум · 6.12.2026:</strong> Закон ZIURS ухвалено Парламентом 11 травня 2026 р., але призупинено до голосування на референдумі. Розрахунок нижче відображає правила проєкту ZIURS (ліміти 150к € / 70к €, умова 5 міс. страхування, витрати 80% / 70% / 40%).',

  // Slovenia inputs & results
  lbl_sp_type: 'Форма страхування ФОП',
  full_sp: 'Повний ФОП (Polni)',
  pop_sp: 'Додатковий ФОП (Pop.)',
  desc_sp_mode:
    '<strong class="tt-head">Повний vs. Додатковий ФОП</strong><strong>Повний (Polni S.P.):</strong> Самозайнятість є вашою основною базою страхування (40 год/тиж.). Вища шкала витрат і ліміт 120к € (ZPZR) діють за умови безперервного повного страхування ≥9 місяців у році — особисто або через 1 працівника (за проєктом ZIURS ≥5 міс. та ліміт 150к €).<span class="tt-gap"></span><strong>Додатковий (Popoldanski S.P.):</strong> Доступний за наявності повної зайнятості (40 год/тиж.) в іншого роботодавця; сплачуються фіксовані внески (113,01 €/міс. з квітня 2026 р.).',
  label_salary: 'Середня брутто-зарплата (2025)',
  desc_salary:
    '<strong class="tt-head">Середня брутто-зарплата (SURS)</strong>Офіційний показник SURS за 2025 рік становить <strong>2 536,03 €</strong> і встановлює на 2026 рік мінімальну (60% = 1 521,62 €; мін. внески 651,04 €/міс.) та максимальну (350% = 8 876,11 €) місячну страхову базу. Поле можна змінити для моделювання наступних років.',
  label_status: 'Рік діяльності',
  desc_status:
    '<strong class="tt-head">Рік діяльності та пільга PIZ</strong>За ст. 145(14) ZPIZ-2 при <strong>першій реєстрації</strong> ФОП діє знижка на пенсійний внесок (PIZ): <strong>−50%</strong> у перші 12 місяців та <strong>−30%</strong> у наступні 12 місяців (при повторному відкритті ФОП пільга не діє). З 4-го року база стабілізується.',
  opt_y1: '1-й рік (-50% PIZ)',
  opt_y2: '2-й рік (-30% PIZ)',
  opt_y3: '3-й рік (без знижки)',
  opt_steady: '4+ рік (Стабілізовано)',
  label_base: 'База соцвнесків',
  desc_base:
    '<strong class="tt-head">Страхова база — ст. 145(2) ZPIZ-2</strong><code>Місячна база = ((Податковий прибуток + Нараховані внески попереднього року) × 0,75) ÷ 12</code><span class="tt-gap"></span>Обмежена в межах 60%–350% середньої зарплати SURS. За бажанням можна обрати вищу базу вручну.',
  opt_real: 'Автоматично (за прибутком)',
  opt_man: 'Ручне введення',
  label_man_month: 'Місячна база (€)',
  res_dohodnina: 'Податок на дохід (Dohodnina)',
  det_base: 'Страхова база',
  det_main_polni: 'PIZ + Мед. + Батьк. + Безроб.',
  det_main_pop: 'Фікс. PIZ (52,05 €) + Травми ZZ (54,53 €)',
  lbl_do: 'Довготривалий догляд',
  desc_do:
    '<strong class="tt-head">Довготривалий догляд (ZDOsk-1)</strong>Повний ФОП сплачує <strong>2,00%</strong> від страхової бази (1% частка застрахованого + 1% частка роботодавця). Додатковий ФОП сплачує фіксовані <strong>6,43 €/міс.</strong> (з квітня 2026 р.) додатково до утримань із зарплати.',
  lbl_ozp: 'ОЗП (Фікс. медичний)',
  desc_ozp:
    '<strong class="tt-head">Обов’язковий медичний внесок (OZP)</strong>Фіксований внесок за ст. 24a ZZVZZ (замінив додаткове медстрахування), індексується щороку 1 березня і з березня 2026 р. становить <strong>39,36 €/міс.</strong> Для додаткового ФОП вже утримується із зарплати.',
  lbl_spouse_ozp: 'ОЗП непрацюючого подружжя (M-DČ)',
  desc_si_family:
    '<strong class="tt-head">Словенія Normiranec — Сім’я та OZP</strong>За ст. 59(2) ZDoh-2 нормований ФОП сплачує остаточний цедулярний податок 20%/35%, тому <strong>податкові пільги на утриманців (дітей чи подружжя) не застосовуються</strong> (у додатковому ФОП їх заявляють за основною зарплатою).<span class="tt-gap"></span>Діти застраховані безкоштовно (0 €). Непрацюючий чоловік/дружина має безкоштовне базове покриття ZZZS (M-DČ), але зобов’язаний сплачувати фіксований <strong>OZP (39,36 €/міс. = 472,32 €/рік)</strong>.',
  si_family_note:
    '<strong>Правило Normiranec (Сім’я):</strong> Цедулярний податок 20%/35% не дає знижки на дітей чи подружжя (<strong>0 €</strong> за ст. 59 ZDoh-2). Діти застраховані за 0 €, а за непрацююче подружжя сплачується обов’язковий OZP (39,36 €/міс.).',
  desc_exp_zpzr_polni:
    '<strong class="tt-head">ZPZR 2026 — Повний ФОП (витрати й податок)</strong>80% нормативних витрат до 60 000 € доходу, 0% понад 60 000 € (макс. 48 000 €; ліміт 120 000 €). Цедулярний податок: <strong>20%</strong> до 72 000 € бази, <strong>35%</strong> на надлишок понад 120к €.',
  desc_exp_zpzr_pop:
    '<strong class="tt-head">ZPZR 2026 — Додатковий ФОП (витрати й податок)</strong>80% до 12 500 €, 40% від 12 500 € до 30 000 €, 0% понад 30 000 € (макс. 17 000 €; ліміт 50 000 €). Цедулярний податок: <strong>20%</strong> до 33 000 € бази, <strong>35%</strong> на надлишок понад 50к €.',
  desc_exp_ziurs_polni:
    '<strong class="tt-head">Проєкт ZIURS — Повний ФОП (витрати й податок)</strong>80% до 100 000 €, 70% від 100к–120к €, 40% від 120к–150к € (макс. 106 000 €; ліміт 150 000 € за ≥5 міс. страхування). Податок: <strong>20%</strong> до 44 000 € бази, <strong>35%</strong> на надлишок понад 150к €.',
  desc_exp_ziurs_pop:
    '<strong class="tt-head">Проєкт ZIURS — Додатковий ФОП (витрати й податок)</strong>80% до 50 000 € та 70% від 50к–70к € (макс. 54 000 €; ліміт 70 000 €). Податок: <strong>20%</strong> до 16 000 € бази, <strong>35%</strong> на надлишок понад 70к €.',
  alert_si_breach:
    '<strong>Перевищення ліміту ({limit} €):</strong> Надлишок бази оподатковується за ставкою <strong>35%</strong>. Якщо середній дохід за 2 послідовні роки перевищує {limit} €, потрібно вийти з нормованої системи (5-річну заборону повернення скасовано ZPZR-A у березні 2026 р.).',
  proj_title: 'Стабілізація чистого доходу (5 років — ZPIZ-2)',
  desc_proj:
    '<strong class="tt-head">5-річна стабілізація внесків (ZPIZ-2)</strong>Припускає сталий річний дохід. Чистий дохід поступово знижується протягом 1–4 років через завершення стартових знижок PIZ (−50% 1-й рік, −30% 2-й рік) та включення нарахованих внесків попереднього року до бази наступного року за ст. 145 ZPIZ-2.',
  lbl_year: 'Рік',
  label_here: 'ВИ ТУТ',
  badge_min: 'МІН БАЗА',
  badge_max: 'МАКС БАЗА',

  // Slovenia ZPZR vs ZIURS Comparison Table & Chart
  cmp_si_title: 'Порівняння: Чинний ZPZR vs. Проєкт ZIURS',
  cmp_col_metric: 'Показник',
  cmp_col_now: 'Зараз (ZPZR)',
  cmp_col_ziurs: 'Проєкт (ZIURS)',
  cmp_col_diff: 'Різниця (ZIURS)',
  cmp_row_limit: 'Ліміт доходу / умова',
  cmp_limit_polni_zpzr: '120 000 € (≥9 міс.)',
  cmp_limit_polni_ziurs: '150 000 € (≥5 міс.)',
  cmp_limit_pop_zpzr: '50 000 €',
  cmp_limit_pop_ziurs: '70 000 €',
  chart_title: 'Крива загального навантаження (Податок + Внески % від доходу)',
  chart_legend_zpzr: 'Зараз (ZPZR)',
  chart_legend_ziurs: 'Проєкт (ZIURS)',
  chart_current_rev: 'Обраний дохід',

  // Neighbouring Country Controls & Labels
  lbl_employment: 'Статус зайнятості',
  emp_full: 'Основна діяльність (Повний)',
  emp_side: 'Паралельно з роботою (Додатковий)',

  // Croatia
  hr_title: 'Paušalni obrt · Паушальний ФОП',
  hr_hok_label: 'Внесок ремісничої палати (HOK)',
  hr_hok_std: 'Стандартний внесок (11,40 €/міс.)',
  hr_hok_exempt: '1–2-й рік (Звільнення від HOK)',
  hr_desc_rules:
    '<strong class="tt-head">Хорватія — Paušalni obrt (2026)</strong>7 фіксованих розрядів до 60 000 € встановлюють фіксовану базу оподаткування (15% верхньої межі розряду, тобто ≥85% умовних витрат; податок 12% = 203,40 €–1 080 €/рік). Соцвнески фіксовані: 290,98 €/міс. (або 17,5% від бази паралельно з роботою) + 11,40 €/міс. HOK.',
  hr_bracket_lbl: 'Розряд {id}/7',
  hr_res_expenses: 'Умовні паушальні витрати',
  hr_det_mio: 'Пенсійний внесок (MIO I 15% + MIO II 5%)',
  hr_det_zo: 'Медичне страхування (ZO 16,5%)',
  hr_det_hok: 'Реміснича палата (HOK)',
  hr_alert_breach: '<strong>Перевищення 60 000 €:</strong> У Хорватії 60 000 € — жорстка межа Paušalni obrt та поріг обов’язкової реєстрації платником 25% ПДВ (PDV) і переходу на облік реальних витрат.',
  hr_family_note:
    '<strong>Paušalni obrt (Сім’я):</strong> Фіксований податок PO-SD не зменшується за утриманців (<strong>0 €</strong> знижки), проте непрацююче подружжя та діти безкоштовно застраховані в HZZO (<strong>0 €</strong> додаткових витрат).',

  // Italy
  it_title: 'Partita IVA · Regime Forfettario',
  it_tax_label: 'Ставка єдиного податку (Imposta sostitutiva)',
  it_tax_startup: '5% Стартап (перші 5 років)',
  it_tax_std: '15% Стандартна ставка',
  it_act_label: 'Вид діяльності (Коефіцієнт ATECO)',
  it_act_prof78: 'Консалтинг / Фахівці (78% база)',
  it_act_it67: 'IT та ПЗ ATECO 62 (67% база)',
  it_act_art67: 'Ремісники / Послуги (67% база)',
  it_act_comm40: 'Торгівля / E-commerce (40% база)',
  it_inps_label: 'Пенсійна схема INPS',
  it_inps_sep: 'Gestione Separata — Фрілансер (26,07%)',
  it_inps_sep_side: 'Gestione Separata — Додатково з роботою (24,00%)',
  it_inps_art: 'Gestione Artigiani (фікс. мін. + 24%)',
  it_inps_comm: 'Gestione Commercianti (фікс. мін. + 24,48%)',
  it_disc_label: 'Знижка INPS Forfettario (-35%)',
  it_disc_yes: 'Застосувати знижку -35% INPS',
  it_disc_no: 'Повні внески INPS (без знижки)',
  it_desc_rules:
    '<strong class="tt-head">Італія — Regime Forfettario (2026)</strong>Ліміт 85 000 € (без ПДВ/IVA; >100 000 € — миттєвий вихід). Валовий прибуток = Дохід × коефіцієнт ATECO. Сплачені соцвнески INPS повністю вираховуються з бази перед нарахуванням єдиного податку 5% (стартап) або 15%.',
  it_det_gross: 'Валовий дохід Forfettario (ATECO)',
  it_det_inps_fix: 'INPS фіксований мінімум (поріг 18 808 €)',
  it_det_inps_var: 'INPS змінна / пропорційна частина',
  it_alert_85k: '<strong>Перевищення 85 000 €:</strong> Між 85 000 € та 100 000 € режим діє до кінця року, але з наступного року обов’язковий перехід на загальну систему (IRPEF + IVA).',
  it_alert_100k: '<strong>Миттєвий вихід (> 100 000 €):</strong> Перевищення 100 000 € негайно скасовує Forfettario вже в поточному році з обов’язковим 22% ПДВ (IVA).',
  it_family_note:
    '<strong>Forfettario (Сім’я):</strong> Єдиний податок 5%/15% скасовує відрахування IRPEF на утриманців (<strong>0 €</strong> знижки), але подружжя та діти мають безкоштовну медицину SSN (<strong>0 €</strong> витрат; допомога Assegno Unico виплачується INPS окремо).',

  // Austria
  at_title: 'Einzelunternehmen · § 17 Pauschalierung',
  at_scheme_label: 'Тип паушалу (§ 17 EStG)',
  at_sch_auto: 'Авто-оптимально (KU ≤55k / Basis >55k)',
  at_sch_klein: 'Kleinunternehmerpauschalierung (до 55 000 €)',
  at_sch_basis: 'Basispauschalierung (до 420 000 €)',
  at_act_label: 'Категорія діяльності',
  at_act_serv: 'IT / Консалтинг / Послуги (20% KU / 6% Basis)',
  at_act_goods: 'Торгівля / Виробництво (45% KU / 15% Basis)',
  at_desc_rules:
    '<strong class="tt-head">Австрія — § 17 EStG Pauschalierung (2026)</strong>Нормативні витрати (20%/45% KU до 55к €; 6%/15% Basis до 420к €) + соцвнески SVS (26,83% на базу 6 613 €–97 020 € + 144,84 € UV) + пільга 15% Grundfreibetrag (до 4 950 €) зменшують базу перед прогресивним податком ESt (0% до 13 539 €, далі 20%–50%).',
  at_det_gfb: 'Grundfreibetrag (15% неоподатковувана пільга)',
  at_det_pv: 'SVS Пенсійне (PV 18,50%)',
  at_det_kv: 'SVS Медичне (KV 6,80%)',
  at_det_sv: 'SVS Накопичувальний фонд (1,53%) + Страх. випадки',
  at_spouse_waiver_label: 'SVS страхування подружжя (+3,4%)',
  at_spouse_waiver_no: 'Стандартно (+3,4% SVS Zusatzbeitrag)',
  at_spouse_waiver_yes: 'Звільнено (≥4 р. виховання дітей — 0%)',
  at_det_spouse_svs: 'SVS співстрахування подружжя (+3,4%)',
  at_det_gross_est: 'Податок за шкалою (до знижок)',
  at_det_fb_plus: 'Familienbonus Plus ({n}× дитячий кредит)',
  at_det_avab: 'Кредит єдиного годувальника (AVAB)',
  at_alert_breach: '<strong>Перевищення ліміту ({limit} €):</strong> Дохід перевищує встановлену межу для обраної австрійської схеми.',

  // Hungary
  hu_title: 'Egyéni vállalkozó · Átalányadó & KATA',
  hu_reg_label: 'Податковий режим',
  hu_reg_ata: 'Átalányadó (Нормативні витрати — B2B і B2C)',
  hu_reg_kata: 'KATA (50 000 Ft/міс. — ЛИШЕ B2C!)',
  hu_exp_label: 'Частка нормативних витрат',
  hu_exp_45: '45% — Послуги, IT, консалтинг (2026)',
  hu_exp_80: '80% — Ремесла, будівництво, транспорт',
  hu_exp_90: '90% — Роздрібна торгівля',
  hu_wage_label: 'Мінімальна база внесків',
  hu_wage_guar: 'Garantált bérminimum (373 200 Ft — кваліфіковані)',
  hu_wage_min: 'Minimálbér (322 800 Ft — базова мінзарплата)',
  hu_hipa_label: 'Місцевий податок (HIPA / Iparűzési adó)',
  hu_hipa_simp: 'Спрощений ступінчастий HIPA (50k–170k Ft)',
  hu_hipa_std: 'Стандартні 2% від прибутку',
  hu_hipa_none: 'Без HIPA (0%)',
  hu_fx_label: 'Курс EUR / HUF',
  hu_desc_rules:
    '<strong class="tt-head">Угорщина — Átalányadó (2026)</strong>Визнає 45% нормативних витрат для послуг (80% ремесла / 90% торгівля), звільняє прибуток до 1 936 800 Ft від 15% SZJA та нараховує TBJ (18,5%) і SZOCHO (13%) на 100% мінімальної бази (множник 112,5% для SZOCHO скасовано у 2026 р.).',
  hu_desc_kata:
    '<strong class="tt-head">Угорщина — Нова KATA (2026)</strong>Витрати не вираховуються: фіксований податок 50 000 Ft/міс. (600 000 Ft/рік) покриває прибутковий податок і соцвнески до 18 000 000 Ft/рік (40% на надлишок) + спрощений HIPA (50 000 Ft/рік). Дозволено виключно для основної зайнятості та клієнтів — фізосіб (лише B2C).',
  hu_det_exempt: 'Неоподатковуваний прибуток (Adómentes keret)',
  hu_det_szja: 'Прибутковий податок SZJA (15% / KATA надлишок)',
  hu_det_hipa: 'Місцевий податок HIPA (Iparűzési adó)',
  hu_det_tbj: 'Соцвнесок TBJ (18,5% / фікс. KATA)',
  hu_det_szocho: 'Соціальний податок SZOCHO (13,0%)',
  hu_det_gross_szja: 'SZJA 15% (до сімейної знижки)',
  hu_det_fam_szja: 'Сімейна податкова знижка (SZJA)',
  hu_det_gross_tbj: 'TBJ 18,5% (до сімейної знижки)',
  hu_det_fam_tbj: 'Сімейна знижка з внесків (TBJ)',
  hu_det_spouse_tb: 'Медвнесок за непрацююче подружжя (12 300 Ft/міс.)',
  hu_alert_vat: '<strong>Поріг ПДВ (ÁFA):</strong> Дохід перевищує безПДВ-ліміт AAM (20 000 000 Ft ≈ {vatEur}), що вмикає 27% ÁFA на внутрішньому ринку (Átalányadó діє до {capEur}).',
  hu_alert_kata_b2b: '<strong>Обмеження KATA (лише B2C):</strong> Угорська KATA забороняє виставляти рахунки компаніям (B2B) і вимагає основної зайнятості. Для B2B оберіть <strong>Átalányadó</strong>.',
  hu_alert_breach: '<strong>Перевищення ліміту ({limit}):</strong> Дохід перевищує межу обраного угорського режиму.',

  // Poland
  pl_title: 'JDG · Ryczałt, Skala & Liniowy',
  pl_reg_label: 'Податковий режим (Forma opodatkowania)',
  pl_reg_ryczalt: 'Ryczałt (Паушальний податок з доходу — до 2M €)',
  pl_reg_skala: 'Skala podatkowa (12% / 32% + Подружжя й діти)',
  pl_reg_liniowy: 'Podatek liniowy (19% лінійний податок)',
  pl_rate_label: 'Ставка Ryczałt за видом діяльності',
  pl_rate_12: '12% — IT, програмування та розробка ПЗ',
  pl_rate_8_5: '8,5% — Загальні послуги',
  pl_rate_14: '14% — Інженерія, архітектура, медицина',
  pl_rate_15: '15% — Бізнес-консалтинг, маркетинг, реклама',
  pl_zus_label: 'Етап соцвнесків ZUS',
  pl_zus_ulga: '1-й рік (6 міс. Ulga na start + 6 міс. Preferencyjny)',
  pl_zus_pref: '7–30-й місяці: Preferencyjny ZUS (420,86 zł/міс.)',
  pl_zus_duzy: 'Стандарт: Duży ZUS (1 788,29 zł/міс., без лікарняних)',
  pl_fx_label: 'Курс EUR / PLN',
  pl_desc_rules:
    '<strong class="tt-head">Польща — JDG Фізична особа-підприємець (2026)</strong><strong>Ryczałt (до 2 000 000 €):</strong> Оподатковує валовий дохід мінус соцвнески ZUS та 50% 3-рівневого медвнеску NFZ (498,35 / 830,58 / 1 495,04 zł/міс. для порогів ≤60k / ≤300k / &gt;300k zł).<span class="tt-gap"></span><strong>Skala (12%/32%):</strong> 30 000 zł неоподатковувано, 12% до 120 000 zł, 32% вище + 9% медицина; дає спільну декларацію з подружжям та <em>Ulga na dzieci</em>. <strong>Liniowy:</strong> 19% + 4,9% медицина (вираховується до 14 100 zł). При роботі в наймі ≥4 806 zł/міс. соцвнесок ZUS = 0 zł.',
  pl_res_deductions: 'Вирахування ZUS / Медицини',
  pl_det_zus: 'Соціальний ZUS (Пенсія, інвалідність, нещасні випадки, FP)',
  pl_det_nfz: 'Медичний внесок NFZ (Składka zdrowotna)',
  pl_det_gross_pit: 'Податок PIT до сімейних пільг',
  pl_det_spouse_split: 'Економія від спільної декларації з подружжям',
  pl_det_child_credit: 'Податкова пільга на дітей (Ulga na dzieci, {n}×)',
  pl_alert_breach:
    '<strong>Перевищення ліміту 2 000 000 € для Ryczałt ({limit}):</strong> Оборот перевищує межу Ryczałt; оберіть Skala або Podatek liniowy.',
  pl_alert_vat:
    '<strong>Поріг ПДВ (23% VAT):</strong> Дохід перевищує безПДВ-ліміт Польщі 2026 року — 240 000 zł (≈ {vatEur}); для EU B2B діє reverse-charge.',
  pl_family_note_ryczalt:
    '<strong>Правило JDG ({regime}):</strong> Непрацююче подружжя та діти мають безкоштовне медстрахування NFZ (ZCNA, <strong>0 zł</strong> витрат). Спільне оподаткування з подружжям та <em>Ulga na dzieci</em> діють лише на <strong>Skala podatkowa (12%/32%)</strong>.',

  // Czechia
  cz_title: 'OSVČ · Paušální daň & Výdajový paušál',
  cz_reg_label: 'Податковий режим OSVČ',
  cz_reg_auto: 'Авто-оптимально (Найвищий нетто)',
  cz_reg_pausal: 'Paušální daň (3 фіксовані місячні рівні ≤2M Kč)',
  cz_reg_vydaje: 'Paušální výdaje (60% / 80% / 40% паушальні витрати)',
  cz_exp_label: 'Категорія діяльності / витрат',
  cz_exp_60: '60% — Вільна ліцензія, IT, консалтинг (Volná živnost)',
  cz_exp_80: '80% — Ремесла та агросектор (Řemeslná živnost)',
  cz_exp_40: '40% — Ліцензовані професії, адвокати, автори',
  cz_stage_label: 'Етап бізнесу',
  cz_stage_est: 'Досвідчений OSVČ (мін. 5 005 Kč/міс. соцвнесок)',
  cz_stage_new: 'Новий ФОП 1–3 роки (мін. 3 575 Kč/міс. соцвнесок)',
  cz_spouse_care_label: 'Догляд подружжям малої дитини (правило 2026)',
  cz_spouse_care_no: 'Немає дитини <3 / <7 р. (діє OBZP 3 024 Kč/міс.)',
  cz_spouse_care_yes: 'Догляд дитини <3 р. (знижка 24 840 Kč + держ. VZP)',
  cz_fx_label: 'Курс EUR / CZK',
  cz_desc_pausal:
    '<strong class="tt-head">Чехія — Paušální daň (2026)</strong>Замінює податок, пенсійний ČSSZ та медвнесок VZP <strong>одним фіксованим щомісячним платежем</strong> без річних звітів до 2 000 000 Kč: <strong>Рівень 1</strong> (9 162 Kč/міс. до 1,5 млн Kč на 60%/80% або 1 млн на 40%), <strong>Рівень 2</strong> (16 745 Kč/міс. до 1,5/2 млн), <strong>Рівень 3</strong> (27 139 Kč/міс. до 2 млн Kč). Недоступно для найманих працівників та платників внутрішнього DPH.',
  cz_desc_vydaje:
    '<strong class="tt-head">Чехія — Paušální výdaje (2026)</strong>Вираховує 60%/80%/40% нормативних витрат (з бази до 2 000 000 Kč). Соцвнесок ČSSZ — 29,2% із 55% прибутку (мін. 5 005 Kč/міс. основний, 3 575 Kč стартап; сумісник звільнений до 117 521 Kč прибутку). Медицина VZP — 13,5% із 50% прибутку (мін. 3 306 Kč/міс.). Податок DPFO — 15% (23% понад 1 762 812 Kč) мінус базова знижка 30 840 Kč + сімейні кредити.',
  cz_band_lbl: 'Рівень {id}/3',
  cz_det_soc: 'Соціальне та пенсійне страхування ČSSZ',
  cz_det_vzp: 'Державне медстрахування VZP',
  cz_det_spouse_obzp: 'Медвнесок за подружжя OBZP (3 024 Kč/міс.)',
  cz_det_gross_dpfo: 'Податок DPFO після базової знижки (30 840 Kč)',
  cz_det_spouse_credit: 'Знижка на подружжя (Sleva na manželku, дитина <3)',
  cz_det_child_credit: 'Дитячий податковий кредит (Daňové zvýhodnění, {n}×)',
  cz_alert_breach:
    '<strong>Перевищення ліміту 2 000 000 Kč ({limit}):</strong> Дохід перевищує стелю Paušální daň та вмикає обов’язкову реєстрацію 21% DPH. Перейдіть на <strong>Paušální výdaje</strong>.',
  cz_alert_side:
    '<strong>Обмеження Paušální daň при сумісництві:</strong> Підприємці з зарплатою за наймом у Чехії не можуть застосовувати Paušální daň. Оберіть <strong>Paušální výdaje</strong> або Авто-оптимально.',
  cz_alert_vat:
    '<strong>Поріг ПДВ (21% DPH):</strong> Дохід перевищує чеський внутрішній поріг звільнення 2 000 000 Kč (≈ {vatEur}).',

  // Slovakia
  sk_title: 'SZČO · Paušálne výdavky 60%',
  sk_stage_label: 'Етап бізнесу (Sociálna poisťovňa)',
  sk_stage_est: 'Досвідчений SZČO (мін. 303,11 € соц. + 121,92 € ZP)',
  sk_stage_new: '1-й рік — Стартап (0 € соцвнесків — канікули!)',
  sk_spouse_care_label: 'Кваліфікований догляд подружжям (дитина <3 / <6 р.)',
  sk_spouse_care_yes: 'Підпадає (NČZD до 5 455 € + держ. медстрахування)',
  sk_spouse_care_no: 'Не підпадає (0 € NČZD + 121,92 €/міс. ZP)',
  sk_desc_rules:
    '<strong class="tt-head">Словаччина — SZČO Паушальні витрати (2026)</strong>Вираховує 60% нормативних витрат до <strong>20 000 €/рік</strong> та сплачені внески. За консолідаційним пакетом 2026 мінімальні внески становлять <strong>303,11 €/міс.</strong> соцстраху (33,15% із 60% середньої ЗП; 0 € у 1-й рік або при доході ≤9 144 €) + <strong>121,92 €/міс.</strong> медицини (16% із 50% середньої ЗП). Податок — <strong>15%</strong> до 100 000 € обороту (вище 19%–35%) після 5 966,73 € NČZD.',
  sk_det_nczd: 'Базова податкова пільга NČZD (до 5 966,73 €/рік)',
  sk_det_nczd_spouse: 'Пільга на подружжя NČZD (до 5 455,30 €/рік)',
  sk_det_soc: 'Соцстрахування Sociálna poisťovňa (33,15%)',
  sk_det_zp: 'Державне медстрахування ZP (16,00%)',
  sk_det_spouse_zp: 'Медвнесок за подружжя ZP (121,92 €/міс.)',
  sk_det_gross_tax: 'Податок на дохід до сімейних пільг',
  sk_det_spouse_tax: 'Економія податку від NČZD на подружжя',
  sk_det_child_bonus: 'Дитячий податковий бонус (Daňový bonus, {n}×)',
  sk_alert_breach:
    '<strong>Перевищення межі 100 000 € для ставки 15%:</strong> Понад 100 000 € обороту знижена ставка 15% SZČO змінюється прогресивною шкалою 2026 року (19% / 25% / 30% / 35%).',
  sk_alert_vat:
    '<strong>Поріг ПДВ (23% DPH):</strong> Дохід перевищує календарний поріг Словаччини 50 000 € для внутрішнього DPH (23% DPH; понад 62 500 € — негайна реєстрація).',

  // Spain
  es_title: 'Autónomo · Estimación Directa Simplificada',
  es_stage_label: 'Квота соцстрахування RETA',
  es_stage_est: 'Досвідчений Autónomo (15 рівнів за реальним доходом)',
  es_stage_new: '1-й рік — Стартап: Tarifa Plana (80 €/міс.)',
  es_stage_cero: '1-й рік — Регіональна Cuota Cero (0 €/міс. — Мадрид/Андалусія)',
  es_cost_label: 'Документальні бізнес-витрати',
  es_cost_0: '0% — Чистий віддалений IT / консалтинг (без витрат)',
  es_cost_10: '10% — ПЗ, коворкінг, gestoría та обладнання',
  es_cost_20: '20% — Вищі операційні витрати та субпідряд',
  es_desc_rules:
    '<strong class="tt-head">Іспанія — Autónomo EDS та RETA (2026)</strong>Іспанія не має високих паушальних витрат для послуг: <em>Estimación Directa Simplificada</em> (до 600 000 €) вираховує документальні витрати + соцвнески RETA + <strong>5% gastos de difícil justificación (макс. 2 000 €/рік)</strong>. Внески RETA 2026 мають 15 рівнів реального доходу (205,88 €–607,35 €/міс. мін. за 31,5% із MEI, або 80 €/міс. Tarifa Plana у 1-й рік). Прогресивний IRPF (19%–47%) враховує 5 550 € особистого + сімейні мінімуми.',
  es_det_op_costs: 'Документальні операційні витрати ({pct}%)',
  es_det_dificil: 'Gastos de difícil justificación (5%, макс. 2 000 €)',
  es_det_conjunta: 'Спільна декларація з подружжям (Declaración conjunta −3 400 €)',
  es_det_reta: 'Соцстрахування RETA ({tramo})',
  es_det_gross_irpf: 'Податок IRPF за шкалою (до сімейних пільг)',
  es_det_spouse_irpf: 'Економія IRPF від спільної декларації з подружжям',
  es_det_child_irpf: 'Mínimo por descendientes ({n}× дитяче зменшення IRPF)',
  es_alert_vat:
    '<strong>Обов’язковий 21% IVA:</strong> Іспанія у 2026 р. <strong>не має безПДВ-ліміту для малого бізнесу (поріг 0 €)</strong> — внутрішні рахунки містять 21% IVA (квартальний Modelo 303), тоді як EU B2B через ROI/VIES використовує 0% reverse-charge.',
  es_alert_breach:
    '<strong>Перевищення ліміту 600 000 € EDS:</strong> Оборот перевищує межу 600 000 € для Estimación Directa Simplificada (перехід на Estimación Directa Normal).',

  // Compare All Arena & Meta-Comparison
  arena_title: 'Арена порівняння: Словенія та 8 країн ЄС (2026)',
  arena_subtitle: 'Рейтинг чистого доходу та загального навантаження в 9 країнах ЄС за однакового доходу в EUR.',
  persona_title: 'Узгоджений профіль (Чесне порівняння)',
  desc_persona:
    '<strong class="tt-head">Узгоджений профіль 9 країн</strong>Синхронізує форму зайнятості, стартові пільги (SI −50% PIZ, IT 5% податку, HR HOK, PL Ulga na start, CZ стартова база, SK канікули соцвнесків у 1-й рік, ES 80 € Tarifa Plana) та тип клієнтів у всіх 9 країнах.<span class="tt-gap"></span><strong>B2B vs. B2C:</strong> У B2B ПДВ є ціново нейтральним (reverse-charge у ЄС), але угорська KATA заборонена. Перемикання на B2C відкриває KATA (повна зайнятість, ≤45к €) та показує пороги споживчого ПДВ (від 0 € ES до 85к € IT).',
  persona_preset: 'Узгоджений профіль',
  persona_custom: 'Мої налаштування з вкладок',
  persona_full: 'Повна зайнятість',
  persona_side: 'Паралельно з роботою',
  persona_est: 'Досвідчений (4+ рік)',
  persona_new: 'Новий ФОП (1-й рік)',
  persona_b2b: 'B2B (Компанії)',
  persona_b2c: 'B2C (Фізособи)',
  persona_client_label: 'Тип клієнтів',
  persona_note_b2b:
    '<strong>B2B (Компанії):</strong> ПДВ є ціново нейтральним (reverse-charge у ЄС / податковий кредит). Угорський режим <strong>KATA</strong> (50 000 Ft/міс.) законодавчо заборонений для рахунків B2B.',
  persona_note_b2c:
    '<strong>B2C (Фізособи):</strong> Відкриває угорський режим <strong>KATA</strong> (повна зайнятість, ≤45к €) та показує безПДВ-пороги (0 € ES · 50к € HU/SK · 55к € AT · 56к € PL · 60к € SI/HR · 79к € CZ · 85к € IT), понад які нараховується споживчий ПДВ.',
  persona_custom_note:
    'Використовуються власні налаштування з вкладок країн разом із обраним вище типом клієнтів та складом сім’ї.',
  region_filter_label: 'Група країн',
  region_all: 'Усі 9 країн',
  region_neighbours: 'SI + Сусіди (5)',
  region_expansion: 'SI + PL · CZ · SK · ES (5)',

  arena_col_rank: '#',
  arena_col_country: 'Країна та режим',
  arena_col_net: 'Чистий дохід',
  arena_col_tax_soc: 'Податок + Внески',
  arena_col_eff: 'Загальне навантаження',
  arena_col_vs_si: 'Різниця vs. SI (Зараз)',
  arena_open_calc: 'Відкрити калькулятор →',
  arena_baseline: 'База (Зараз)',
  arena_proposed_tag: 'Референдум 6.12',
  arena_tax_short: 'Под.',
  arena_soc_short: 'Внески',
  per_yr: '/рік',
  per_mo: '/міс.',

  // Comparison View Badge, Pill & Header Tooltips
  desc_arena_eff:
    '<strong class="tt-head">Ефективне загальне навантаження (% від валу)</strong><code>(Податок + Соцвнески) ÷ Валовий дохід</code><span class="tt-gap"></span>Включає місцеві податки (HU HIPA), внески палат (HR HOK) та обов’язкові медвнески за непрацююче подружжя за вирахуванням сімейних податкових знижок.',
  desc_arena_delta:
    '<strong class="tt-head">Різниця чистого доходу проти Словенії (ZPZR зараз)</strong>Показує виграш (зелений) або втрату (червоний) чистого доходу за обраний період (місяць або рік) порівняно з чинним законом Словенії ZPZR 2026 за однакового доходу в EUR та складу сім’ї.',
  tip_fam_si_spouse:
    '<strong class="tt-head">Словенія Normiranec — Сім’я ({delta}{per})</strong><strong>Податкова пільга: 0,00 €</strong> — За ст. 59(2) ZDoh-2 цедулярне оподаткування норміранців не дозволяє вираховувати пільги на дітей чи подружжя.<span class="tt-gap"></span><strong>Медицина подружжя: −{spouseOzp}{per}</strong> — Діти та базове страхування подружжя (M-DČ) безкоштовні (0,00 €), але непрацююче подружжя сплачує обов’язковий <strong>OZP (39,36 €/міс.)</strong> за ст. 24a ZZVZZ.',
  tip_fam_si_kids:
    '<strong class="tt-head">Словенія Normiranec — Сім’я (0,00 €{per})</strong><strong>Пільга на дітей: 0,00 €</strong> — За ст. 59(2) ZDoh-2 фінальний цедулярний податок 20%/35% не зменшується на податкові пільги на дітей ({kids}×) (для Popoldanski S.P. пільга враховується в зарплаті).<span class="tt-gap"></span><strong>Медицина: 0,00 €</strong> — Діти застраховані в ZZZS безкоштовно.',
  tip_fam_hr:
    '<strong class="tt-head">Хорватія Paušalni obrt — Сім’я (0,00 €{per})</strong><strong>Податкова пільга: 0,00 €</strong> — Фіксовані шкали PO-SD не передбачають податкових вирахувань на утриманців (<em>osobni odbitak</em> діє лише для прогресивного податку).<span class="tt-gap"></span><strong>Медицина: 0,00 €</strong> — Діти та непрацююче подружжя мають безкоштовне державне медстрахування HZZO.',
  tip_fam_it:
    '<strong class="tt-head">Італія Regime Forfettario — Сім’я (0,00 €{per})</strong><strong>Податкова пільга: 0,00 €</strong> — Вибір замінного податку 5%/15% скасовує сімейні вирахування IRPEF (<em>carichi di famiglia</em>).<span class="tt-gap"></span><strong>Медицина: 0,00 €</strong> — Подружжя та діти-резиденти мають безкоштовну медицину SSN (універсальна допомога <em>Assegno Unico</em> виплачується INPS окремо).',
  tip_fam_at_credits:
    '<strong class="tt-head">Австрія Pauschalierung — Сім’я ({delta}{per})</strong>Тарифний прибутковий податок (<strong>{grossTax}{per}</strong>) зменшується євро-до-євро на:<span class="tt-gap"></span>• <strong>Familienbonus Plus:</strong> +{fb}{per} (§ 33 Abs. 3a EStG)<br>• <strong>Кредит єдиного годувальника (AVAB):</strong> +{avab}{per} (§ 33 Abs. 4 Z 1 EStG)<br>• <strong>Залишок податку ESt:</strong> {netTax}{per}<br>• <strong>Доплата SVS за подружжя:</strong> 0,00 € (скасовано за наявності дітей за § 51d GSVG)',
  tip_fam_at_waived:
    '<strong class="tt-head">Австрія Pauschalierung — Сім’я (0,00 €{per})</strong><strong>Податкові кредити: 0,00 €</strong> — Кредит єдиного годувальника (AVAB) вимагає щонайменше 1 дитину з <em>Familienbeihilfe</em>.<span class="tt-gap"></span><strong>Доплата SVS за подружжя: 0,00 €</strong> — Надбавку +3,4% SVS (§ 51d GSVG) скасовано завдяки ≥4 рокам попереднього виховання дітей.',
  tip_fam_at_svs:
    '<strong class="tt-head">Австрія Pauschalierung — Сім’я ({delta}{per})</strong><strong>Страхування подружжя SVS: −{svsFee}{per}</strong> — Співстрахування бездітного непрацюючого подружжя додає +3,4% внеску GSVG (§ 51d GSVG; AVAB вимагає ≥1 дитину).<span class="tt-gap"></span><strong>Податкова економія: +{taxSaved}{per}</strong> — Оскільки внески SVS зменшують оподатковуваний прибуток, прогресивний ESt зменшується на {taxSaved}{per}.',
  tip_fam_hu_ata:
    '<strong class="tt-head">Угорщина Átalányadó — Сім’я ({delta}{per})</strong>Подвоєна у 2026 р. сімейна пільга (Szja tv. 29/A. § і Tbj. 34. §) та медицина подружжя:<span class="tt-gap"></span>• <strong>Зменшення 15% податку SZJA:</strong> +{szjaCred}{per}<br>• <strong>Перенесення на 18,5% внесок TBJ:</strong> +{tbjCred}{per}<br>• <strong>Медвнесок за подружжя (12 300 Ft/міс.):</strong> −{spouseFee}{per}',
  tip_fam_hu_kata:
    '<strong class="tt-head">Угорщина Нова KATA — Сім’я ({delta}{per})</strong><strong>Дитяча податкова знижка: 0,00 €</strong> — Фіксований податок KATA (50 000 Ft/міс.) не зменшується на сімейні пільги.<span class="tt-gap"></span><strong>Медицина подружжя: −{spouseFee}{per}</strong> — Незастраховане подружжя сплачує обов’язковий медвнесок 12 300 Ft/міс. (147 600 Ft/рік).',
  tip_fam_pl_ryczalt:
    '<strong class="tt-head">Польща {regime} — Сім’я (0,00 €{per})</strong><strong>Податкова пільга: 0,00 €</strong> — Паушальний <em>Ryczałt</em> та 19% <em>Liniowy</em> не надають знижок на дітей чи спільного оподаткування з подружжям (вони доступні на <em>Skala 12%/32%</em> у калькуляторі Польщі).<span class="tt-gap"></span><strong>Медицина: 0,00 €</strong> — Непрацююче подружжя та діти безкоштовно застраховані в NFZ (<em>ZCNA</em>).',
  tip_fam_pl_skala:
    '<strong class="tt-head">Польща Skala (12%/32%) — Сім’я ({delta}{per})</strong>• <strong>Спільна декларація з подружжям:</strong> +{spouseCred}{per} (подвоює 30 000 zł 0% бази та поріг 120 000 zł)<br>• <strong>Ulga na dzieci (дитяча пільга):</strong> +{childCred}{per}<br>• <strong>Сімейна медицина NFZ (ZCNA):</strong> 0,00 € додаткових витрат',
  tip_fam_cz_pausal:
    '<strong class="tt-head">Чехія Paušální daň — Сім’я ({delta}{per})</strong><strong>Податкові кредити: 0,00 €</strong> — Фіксовані місячні рівні Paušální daň не враховують пільги на дітей чи подружжя (Авто-режим автоматично перемикає на 60% Výdaje, коли сімейні кредити дають вищий нетто!).<span class="tt-gap"></span><strong>Медицина подружжя (OBZP): −{spouseFee}{per}</strong> — З 2026 р. непрацююче подружжя без дитини &lt;7 р. сплачує 3 024 Kč/міс. VZP.',
  tip_fam_cz_vydaje:
    '<strong class="tt-head">Чехія OSVČ Výdaje — Сім’я ({delta}{per})</strong>• <strong>Дитячий кредит (Daňové zvýhodnění):</strong> +{childCred}{per}<br>• <strong>Знижка на подружжя (дитина &lt;3 р.):</strong> +{spouseCred}{per}<br>• <strong>Медвнесок за подружжя OBZP:</strong> −{spouseFee}{per} (3 024 Kč/міс. без дитини &lt;7 р.)',
  tip_fam_sk:
    '<strong class="tt-head">Словаччина SZČO — Сім’я ({delta}{per})</strong>• <strong>Дитячий бонус (Daňový bonus):</strong> +{childCred}{per} (1 200 €/рік на дитину &lt;15 р., ліміт ČZD)<br>• <strong>Економія від NČZD на подружжя:</strong> +{spouseCred}{per} (до 5 455,30 € вирахування)<br>• <strong>Медицина подружжя ZP:</strong> −{spouseFee}{per} (121,92 €/міс. без дітей / умови)',
  tip_fam_es:
    '<strong class="tt-head">Іспанія Autónomo — Сім’я ({delta}{per})</strong>• <strong>Спільна декларація (Declaración conjunta):</strong> +{spouseCred}{per} (−3 400 €/рік бази IRPF)<br>• <strong>Mínimo por descendientes:</strong> +{childCred}{per} (2 400–4 500 €/дитину звільнено в нижніх ставках IRPF)<br>• <strong>Сімейна медицина SNS:</strong> 0,00 € універсальне покриття',
  tip_status_eligible:
    '<strong class="tt-head">{country} — {regime} (Доступно)</strong>Валовий дохід (<strong>{rev}{per}</strong>) не перевищує встановлений ліміт <strong>{limit}{per}</strong> та відповідає всім обраним умовам зайнятості й типу клієнтів, тому режим бере участь у рейтингу.',
  tip_status_proposed:
    '<strong class="tt-head">Словенія ZIURS — Референдум 6.12.2026</strong>Закон ухвалено парламентом 11.05.2026 і наразі призупинено до законодавчого референдуму 6 грудня 2026 р. Підвищує ліміти до <strong>150 000 €/рік</strong> (повний S.P., ≥5 міс. страхування) та <strong>70 000 €/рік</strong> (паралельний) із прогресивними витратами 80% / 70% / 40% (активний ліміт: <strong>{limit}{per}</strong>).',
  tip_status_b2c_only:
    '<strong class="tt-head">Недоступно для B2B — Лише фізособи</strong>За законом про нову KATA (2022. évi XIII. tv.) навіть один рахунок компанії чи юрособі (<em>kifizető</em>, крім таксі) негайно анулює статус KATA. Перемкніть тип клієнтів вище на <strong>B2C (Фізособи)</strong>, щоб активувати KATA.',
  tip_status_fulltime_only:
    '<strong class="tt-head">Недоступно при сумісництві — Лише повна зайнятість</strong>Угорська нова KATA (2022. évi XIII. tv.) дозволена виключно для основних ФОП (<em>főállású kisadózó</em>). За наявності роботи ≥36 год/тиждень необхідно обрати <strong>Átalányadó</strong>.',
  tip_status_fulltime_only_cz:
    '<strong class="tt-head">Недоступно при сумісництві — Лише основний OSVČ</strong>За законом Чехії про податок на дохід (§ 2a) підприємці з одночасною роботою за наймом не можуть обрати <em>Paušální daň</em> і застосовують <strong>60% Paušální výdaje</strong>.',
  tip_over_cap_si:
    '<strong class="tt-head">Словенія {regime} — Перевищено ліміт {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує межу {limit}{per}. Надлишок бази оподатковується за ставкою <strong>35%</strong> (замість 20%), а перевищення середнього ліміту за 2 роки вимагає переходу на облік реальних витрат.',
  tip_over_cap_hr:
    '<strong class="tt-head">Хорватія Paušalni obrt — Перевищено {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує жорстку стелю 60 000 €/рік, що вимагає обов’язкової реєстрації платником <strong>25% PDV (ПДВ)</strong> та переходу на облік реальних витрат (<em>Dohodak</em>).',
  tip_over_cap_it:
    '<strong class="tt-head">Італія Forfettario — Перевищено {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує ліміт 85 000 €/рік: 85к–100к € означає перехід на прогресивний IRPEF + 22% IVA з наступного року, а понад <strong>100 000 €/рік</strong> — негайне припинення режиму посеред року з 22% IVA.',
  tip_over_cap_at:
    '<strong class="tt-head">Австрія {regime} — Перевищено {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує ліміт обраної схеми § 17 EStG (<strong>{limit}{per}</strong>), що вимагає переходу на Basispauschalierung (до 420к €/рік) або облік фактичних витрат (<em>E/A-Rechnung</em>).',
  tip_over_cap_hu_ata:
    '<strong class="tt-head">Угорщина Átalányadó — Перевищено {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує 10-кратну річну мінімальну зарплату (38 736 000 Ft ≈ {limit}{per}), що скасовує право на нормативні витрати й вимагає стандартного обліку (<em>Vállalkozói SZJA</em>).',
  tip_over_cap_hu_kata:
    '<strong class="tt-head">Угорщина KATA — Перевищено квоту {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує річну квоту 18 000 000 Ft (≈ {limit}{per}); увесь надлишок оподатковується <strong>40% додатковим податком KATA</strong> понад фіксовані 50 000 Ft/міс.',
  tip_over_cap_pl:
    '<strong class="tt-head">Польща Ryczałt — Перевищено {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує встановлену стелю 2 000 000 €/рік для паушального <em>Ryczałt</em>, що вимагає переходу на 19% <em>Podatek liniowy</em> або <em>Skala podatkowa</em>.',
  tip_over_cap_cz:
    '<strong class="tt-head">Чехія Paušální daň — Перевищено {limit}{per}</strong>Дохід (<strong>{rev}{per}</strong>) перевищує межу 2 000 000 Kč/рік для <em>Paušální daň</em> та вмикає обов’язковий 21% DPH і перехід на стандартний режим OSVČ.',
  tip_over_cap_sk:
    '<strong class="tt-head">Словаччина SZČO — Перевищено {limit}{per} для ставки 15%</strong>Дохід (<strong>{rev}{per}</strong>) перевищує поріг 100 000 €/рік для зниженої ставки 15% SZČO; база переходить на прогресивні ставки 2026 року (19%–35%).',
  tip_over_cap_es:
    '<strong class="tt-head">Іспанія Autónomo — Перевищено {limit}{per} EDS</strong>Дохід (<strong>{rev}{per}</strong>) перевищує межу 600 000 €/рік для <em>Estimación Directa Simplificada</em>, що вимагає переходу на повний облік <em>Estimación Directa Normal</em>.',
  tip_b2c_vat_free:
    '<strong class="tt-head">{country} — Без ПДВ для B2C (≤{limit}{per})</strong>Дохід (<strong>{rev}{per}</strong>) не перевищує національний поріг звільнення від ПДВ (<strong>{limit}{per}</strong>). Ви виставляєте рахунки фізособам із <strong>0% ПДВ</strong> замість стандартних {rate}%.',
  tip_b2c_vat_req:
    '<strong class="tt-head">{country} — Обов’язковий +{rate}% ПДВ для B2C</strong>Дохід (<strong>{rev}{per}</strong>) перевищує національний безПДВ-поріг (<strong>{limit}{per}</strong>), що вмикає обов’язковий <strong>{rate}% ПДВ</strong>. Оскільки приватні клієнти (B2C) не відшкодовують ПДВ, це підвищує ціну на +{rate}% або зменшує вашу маржу.',
  tip_delta_baseline:
    '<strong class="tt-head">Еталон — Чинний закон Словенії (ZPZR 2026)</strong><strong>{net}{per}</strong> чистого доходу (<strong>{eff}</strong> загального навантаження). Усі значення +/- у цьому стовпці показують різницю чистого доходу порівняно з чинною системою Normiranec у Словенії.',
  tip_delta_vs_si:
    '<strong class="tt-head">{country} ({regime}) vs. Словенія Зараз</strong>• <strong>{country} чистими:</strong> {net}{per} ({eff} навантаження)<br>• <strong>Словенія (ZPZR) чистими:</strong> {baseNet}{per} ({baseEff} навантаження)<span class="tt-gap"></span>Різниця: <strong>{delta}{per}</strong> за однакового доходу в EUR та складу сім’ї.',
  tip_si_cap_zpzr:
    '<strong class="tt-head">Чинний ліміт доходу (ZPZR 2026)</strong>Річна / середньодворічна межа виходу становить <strong>{limit}/рік</strong> (для порогу 120к € потрібно ≥9 безперервних місяців повного страхування; надлишок бази понад ліміт оподатковується за ставкою 35%).',
  tip_si_cap_ziurs:
    '<strong class="tt-head">Запропонований ліміт доходу (ZIURS)</strong>Підвищує межу виходу до <strong>{limit}/рік</strong> (150к € для повного S.P. за пом’якшеної вимоги ≥5 місяців страхування; 70к € для паралельного); очікує на референдум 6.12.2026.',
  tip_si_cap_diff:
    '<strong class="tt-head">Розширення ліміту за ZIURS (+{diff}/рік)</strong>Збільшує допустиму стелю доходу норміранців на <strong>+{diff}/рік</strong> та скорочує вимогу повного страхування з 9 безперервних місяців до 5 місяців.',

  residency_warning_title: 'Важливе юридичне зауваження щодо податкового резидентства (183 днів)',
  residency_warning_body:
    'Реєстрація ФОП у сусідній країні (наприклад, хорватського Paušalni obrt) без переїзду зі Словенії <strong>не зменшує ваші податки</strong>. За ст. 6 ZDoh-2 та конвенціями OECD (центр життєвих інтересів + правило 183 днів) податкові резиденти Словенії сплачують податок зі світового доходу. Іноземний режим діє лише за умови реального переїзду.',

  meta_matrix_title: 'Мета-порівняння: Ліміти, ризики перевірок та переваги',
  meta_cards_title: 'Переваги та обмеження за країнами',
  meta_best_for: 'Найкраще підходить для:',
  meta_pros: 'Переваги',
  meta_cons: 'Обмеження та пастки',
  rating_good: 'Вигідно',
  rating_warn: 'Нюанси',
  rating_strict: 'Суворо',

  // Accessibility & Screen-Reader Announcements
  skip_to_calc: 'Перейти до калькулятора',
  aria_countries_nav: 'Країни та міждержавне порівняння',
  aria_billing_period: 'Розрахунковий період',
  aria_si_regime_group: 'Податковий режим Словенії',
  aria_info_about: 'Детальніше: {topic}',
  aria_decrease: 'Зменшити: {label}',
  aria_increase: 'Збільшити: {label}',
  aria_alloc_bar: 'Розподіл доходу: {netPct} нетто, {socPct} соцвнески, {taxPct} податок',
  tbl_si_cmp_caption: 'Порівняння Словенія Normiranec 2026: чинний закон (ZPZR) проти проєкту ZIURS',
  tbl_arena_caption: 'Порівняння чистого доходу ФОП 2026 у 9 країнах ЄС',
  svg_chart_valuetext: 'Дохід {rev}: Чинний закон {zpzr} навантаження, Проєкт ZIURS {ziurs} навантаження',
  sr_live_single: '{country}: Чистий дохід {net}{per} ({eff} ефективне навантаження)',
  sr_live_si_cmp: 'Словенія Порівняння: Зараз {zpzr}{per}, Проєкт ZIURS {ziurs}{per} ({diff})',
  sr_live_arena: 'Порівняти всі при {gross}{per}: Найвигідніший режим {winner} — {net} чистими',

  // Country Parameter & Household Statutory Tooltips (9 Countries)
  desc_si_man_base:
    '<strong class="tt-head">Добровільна ручна страхова база — ст. 145 ZPIZ-2</strong>Дозволяє обрати власну місячну базу для соцвнесків у межах законного коридору від <strong>60%</strong> (1 521,62 €/міс) до <strong>350%</strong> (8 876,11 €/міс) середньої зарплати SURS 2025 (2 536,03 €). Підвищення бази збільшує майбутню пенсію та лікарняні за ставкою 40,20% (+ фіксований OZP 39,36 €/міс); зниження нижче розрахованої бази вимагає офіційної заяви до FURS при падінні прибутку (до −20%).',

  hr_desc_emp:
    '<strong class="tt-head">Хорватія — Основний obrt проти сумісництва</strong><strong>Основна діяльність (повна):</strong> Сплачує фіксовані щомісячні внески <strong>290,98 €/міс</strong> (3 491,76 €/рік) від законної бази 797,20 € (15% MIO I + 5% MIO II + 16,5% HZZO медицина).<span class="tt-gap"></span><strong>Сумісництво (uz radni odnos):</strong> Якщо ви вже застраховані за наймом на повний день, щомісячні аванси дорівнюють 0 €, а річний соцвнесок становить лише <strong>17,5%</strong> від фіксованої 15%-ї податкової бази вашого розряду (296,63 €–1 575,00 €/рік).',
  hr_desc_hok:
    '<strong class="tt-head">Внесок до Ремісничої палати HOK — ст. 77 Zakon o obrtu</strong>Хорватські підприємці сплачують квартальний членський внесок до <em>Hrvatska obrtnička komora (HOK)</em> у розмірі <strong>11,40 €/міс</strong> (34,20 €/кв. = 136,80 €/рік). Підприємці, які відкривають <em>obrt</em> уперше, за законом <strong>звільнені від сплати HOK протягом перших 2 календарних років</strong>.',
  desc_hr_family:
    '<strong class="tt-head">Хорватія Paušalni obrt — Сім’я та медицина HZZO</strong>Оскільки податок PO-SD нараховується за фіксованими розрядами (12% на 15% стелі розряду), податкові пільги на утриманців (<em>osobni odbitak</em>) не зменшують паушальний податок (<strong>0 €</strong> знижки; сумісники заявляють їх у зарплаті).<span class="tt-gap"></span>Діти та безробітний чоловік/дружина отримують безкоштовне державне медстрахування HZZO (<strong>0 €</strong> доплат).',

  it_desc_tax:
    '<strong class="tt-head">Італія — Ставка 5% Startup проти 15% стандартної</strong><strong>5% Startup (перші 5 років):</strong> Вимагає справді нової діяльності — ви не мали бізнесу/практики протягом попередніх 3 років, і діяльність не може бути продовженням попередньої роботи за наймом або ФОП (Legge 190/2014, ст. 1 п. 65).<span class="tt-gap"></span><strong>15% Стандартна ставка:</strong> Діє з 6-го року або якщо умови startup не виконано.',
  it_desc_activity:
    '<strong class="tt-head">Коефіцієнт прибутковості ATECO (Coefficiente di redditività)</strong>Regime Forfettario не враховує чеки на витрати, а визначає валовий оподатковуваний дохід як <code>Дохід × ATECO %</code>:<span class="tt-gap"></span>• <strong>67%</strong> (33% фіксовані витрати): Розробка ПЗ та IT (ATECO 62.01/62.02) і ремісники<br>• <strong>78%</strong> (22% фіксовані витрати): Вільнопрактикуючі фахівці, консультанти, інженери та дизайнери<br>• <strong>40%</strong> (60% фіксовані витрати): Роздрібна торгівля, e-commerce та HoReCa',
  it_desc_inps:
    '<strong class="tt-head">Вибір пенсійного фонду INPS (2026)</strong><strong>Gestione Separata (26,07% повна / 24,00% сумісництво):</strong> Для фрілансерів, IT-спеціалістів та консультантів без торгової палати. Має <strong>0 € мінімального платежу</strong> — нараховується суто від ATECO-прибутку до стелі 120 607 €.<span class="tt-gap"></span><strong>Artigiani (24%) та Commercianti (24,48%):</strong> Ремісники й торгівці сплачують обов’язковий фіксований мінімум (~4 521 € / 4 612 € на базі 18 808 € <em>minimale</em>) + змінний % понад 18 808 €. Сплачений INPS вираховується перед податком 5%/15%.',
  it_desc_discount:
    '<strong class="tt-head">Опційна знижка −35% INPS для Forfettario</strong>Зареєстровані в палаті <em>Artigiani</em> та <em>Commercianti</em> на режимі Forfettario можуть подати заяву на <strong>знижку −35%</strong> як на фіксовані мінімальні, так і на змінні внески INPS.<span class="tt-gap"></span><strong>Компроміс із пенсією:</strong> Якщо зменшені річні внески нижчі за повний мінімум з бази 18 808 €, INPS зараховує пропорційно менше місяців пенсійного стажу (~7,8 замість 12 міс/рік).',
  desc_it_family:
    '<strong class="tt-head">Італія Regime Forfettario — Сім’я та медицина SSN</strong>Вибір замінного податку 5%/15% скасовує прогресивний IRPEF і право на сімейні податкові вирахування (<em>carichi di famiglia</em> = <strong>0 €</strong> знижки податку).<span class="tt-gap"></span>Діти та непрацюючий чоловік/дружина мають безкоштовну державну медицину <em>SSN</em> (<strong>0 €</strong>), а універсальна допомога на дітей <em>Assegno Unico</em> виплачується окремо через INPS.',

  at_desc_scheme:
    '<strong class="tt-head">Австрія — Схеми фіксованих витрат § 17 EStG (2026)</strong><strong>Авто-оптимально:</strong> Обирає доступну схему з вищим чистим доходом.<span class="tt-gap"></span><strong>Kleinunternehmerpauschalierung (§ 17 Abs. 3a):</strong> До 55 000 € (допуск 60 500 €, прив’язано до звільнення від ПДВ); списує <strong>20%</strong> витрат для послуг (макс. 11 000 €) або <strong>45%</strong> для товарів (макс. 24 750 €).<span class="tt-gap"></span><strong>Basispauschalierung (§ 17 Abs. 1):</strong> До 420 000 €; списує <strong>6%</strong> для консалтингу/IT (макс. 25 200 €) або <strong>15%</strong> загальних витрат (макс. 63 000 €). Обидві додатково вираховують SVS + 15% <em>Grundfreibetrag</em>.',
  at_desc_activity:
    '<strong class="tt-head">Категорія діяльності в Австрії</strong>Визначає законну частку паушальних витрат до вирахування SVS та <em>Grundfreibetrag</em>:<span class="tt-gap"></span>• <strong>IT / Консалтинг / Послуги:</strong> <strong>20%</strong> за Kleinunternehmerpauschalierung або <strong>6%</strong> (<em>Beratung/IT</em>) за Basispauschalierung.<br>• <strong>Торгівля / Виробництво:</strong> <strong>45%</strong> за Kleinunternehmerpauschalierung або <strong>15%</strong> за Basispauschalierung.',
  at_desc_emp:
    '<strong class="tt-head">Австрія — Основний GSVG проти сумісництва (ASVG + GSVG)</strong><strong>Основна діяльність:</strong> Сплачує GSVG SVS (26,83% = 18,5% PV + 6,8% KV + 1,53% BMSVG з річної бази 6 613,20 €–97 020 € + 144,84 €/рік страхування нещасних випадків UV).<span class="tt-gap"></span><strong>Сумісництво:</strong> За наявності роботи за наймом (ASVG), якщо річний прибуток ≤6 613,20 € (<em>Versicherungsgrenze</em>) і оборот ≤55 000 €, можна відмовитися від PV/KV і платити лише <strong>UV (12,07 €/міс)</strong>; вище 6 613,20 € діє повний SVS.',
  at_desc_spouse_waiver:
    '<strong class="tt-head">Співстрахування чоловіка/дружини SVS (+3,4% Mitversicherung)</strong>Співстрахування бездітного непрацюючого чоловіка/дружини за § 51d / § 83 GSVG стандартно додає <strong>+3,4% медичної надбавки SVS</strong> до бази KV підприємця.<span class="tt-gap"></span>Оберіть <strong>Звільнено (0%)</strong>, якщо чоловік/дружина раніше виховували дітей щонайменше 4 роки, отримують допомогу з догляду (<em>Pflegegeld</em> ≥ 3 рівня) або здійснюють пільговий догляд.',
  desc_at_family:
    '<strong class="tt-head">Австрія Pauschalierung — Сімейні кредити та SVS</strong>Прогресивний податок ESt (0%–55%) прямо зменшують податкові кредити:<span class="tt-gap"></span>• <strong>Familienbonus Plus:</strong> до <strong>2 000,16 €/рік</strong> за кожну дитину &lt;18 років<br>• <strong>Кредит єдиного годувальника (AVAB):</strong> 612 € (1 дитина), 828 € (2), +273 € за наступну за наявності ≥1 дитини й доходу партнера ≤7 411 €<br>• <strong>Медицина SVS:</strong> 0 € для дітей і батьків; +3,4% KV лише за бездітного партнера без пільги.',

  hu_desc_regime:
    '<strong class="tt-head">Угорщина — Átalányadó проти Нової KATA (2026)</strong><strong>Átalányadó (фіксовані витрати):</strong> Дозволяє працювати з <strong>B2B компаніями та B2C клієнтами</strong> до 38 736 000 Ft/рік (193,68M Ft роздріб), із 45%/80%/90% витрат та неоподатковуваним прибутком 1 936 800 Ft.<span class="tt-gap"></span><strong>Нова KATA (50 000 Ft/міс):</strong> Єдиний податок до 18 000 000 Ft/рік, але суворо лише для <strong>основних ФОП при розрахунках із фізособами (тільки B2C)</strong> — один інвойс компанії анулює KATA.',
  hu_desc_fx:
    '<strong class="tt-head">Вплив курсу EUR / HUF</strong>Перераховує ваш дохід у EUR відносно законних порогів у форинтах: <strong>1 936 800 Ft</strong> неоподатковуваний прибуток, <strong>18 000 000 Ft</strong> квота KATA, <strong>20 000 000 Ft</strong> звільнення від 27% ПДВ (<em>Alanyi adómentesség</em>) та <strong>38 736 000 Ft</strong> ліміт Átalányadó.',
  hu_desc_emp:
    '<strong class="tt-head">Угорщина — Основний ФОП (Főállású) проти сумісництва (Mellékállású)</strong><strong>Основний (Főállású):</strong> Сплачує щомісячний мінімум TBJ (18,5%) та SZOCHO (13% зі 100% бази у 2026 — множник 112,5% скасовано) від мінімальної зарплати навіть у межах неоподатковуваної зони.<span class="tt-gap"></span><strong>Сумісництво (найм ≥36 год/тиж):</strong> Мінімальна база соцвнесків не застосовується — у межах неоподатковуваного прибутку 1 936 800 Ft (~3,52M Ft доходу при 45% витрат) SZJA, TBJ та SZOCHO дорівнюють <strong>0 Ft</strong>.',
  hu_desc_expense:
    '<strong class="tt-head">Нормативи витрат Átalányadó (Szja tv. 53. §)</strong>Автоматично вираховуються з валового доходу без документальних чеків:<span class="tt-gap"></span>• <strong>45%</strong> (підвищено з 40% у 2026): Загальні послуги, IT, розробка ПЗ, консалтинг та інтелектуальні професії<br>• <strong>80%</strong>: Кваліфіковані ремесла, будівництво, виробництво, транспорт і фотографія<br>• <strong>90%</strong>: Виключно роздрібна торгівля товарами (ліміт до 50× річних мінімальних зарплат)',
  hu_desc_wage:
    '<strong class="tt-head">Мінімальна зарплатна база соцвнесків (2026)</strong>Визначає щомісячний мінімум бази TBJ (18,5%) та SZOCHO (13%) для основного <em>Átalányadó</em>:<span class="tt-gap"></span>• <strong>Garantált bérminimum (373 200 Ft/міс):</strong> Обов’язковий, якщо зареєстрований код діяльності FEOR вимагає середньої спеціальної або вищої освіти (включає IT, інженерію та консалтинг).<br>• <strong>Minimálbér (322 800 Ft/міс):</strong> Лише для видів діяльності без вимог до кваліфікації.',
  hu_desc_hipa:
    '<strong class="tt-head">Місцевий муніципальний податок — HIPA (Iparűzési adó)</strong>Муніципальний податок на бізнес (до 2%):<span class="tt-gap"></span>• <strong>Спрощені діапазони (Sávos):</strong> Фіксований річний платіж <strong>50 000 Ft</strong> (дохід ≤12M Ft), <strong>120 000 Ft</strong> (12M–18M Ft) або <strong>170 000 Ft</strong> (18M–25M Ft) без складного обліку.<br>• <strong>Стандартні 2%:</strong> Нараховується на 120% чистого доходу Átalányadó.<br>• <strong>0% муніципалітет:</strong> Громади без податку HIPA.',
  desc_hu_family:
    '<strong class="tt-head">Угорщина — Подвоєна сімейна пільга 2026 та медвнесок партнера</strong><strong>Átalányadó:</strong> Відкриває подвоєну у 2026 році пільгу <em>Családi kedvezmény</em>, яка зменшує і 15% SZJA, і 18,5% TBJ (економія до <strong>20 001 Ft/міс</strong> за 1 дитину, <strong>79 998 Ft/міс</strong> за 2, <strong>198 000 Ft/міс</strong> за 3). <strong>KATA:</strong> 0 Ft сімейної знижки.<span class="tt-gap"></span>Пільги на партнера немає, а незастрахований непрацюючий чоловік/дружина сплачує медвнесок NEAK (<strong>12 300 Ft/міс</strong> = 147 600 Ft/рік).',

  pl_desc_regime:
    '<strong class="tt-head">Польща — Податкові режими JDG (Forma opodatkowania)</strong><strong>Ryczałt (до 2M €):</strong> Фіксована ставка за PKWiU (8,5%–15%) від валового доходу мінус соцвнески ZUS та 50% трирівневого медвнеску NFZ (498,35 / 830,58 / 1 495,04 zł/міс). Витрати не враховуються.<span class="tt-gap"></span><strong>Skala (12% / 32%):</strong> 30 000 zł неоподатковуваний мінімум, 12% до 120 000 zł, 32% вище + 9% NFZ; відкриває <strong>спільну декларацію з подружжям та пільгу на дітей</strong>.<span class="tt-gap"></span><strong>Podatek liniowy (19%):</strong> Плоскі 19% + 4,9% NFZ (вираховується до 14 100 zł/рік); без сімейних пільг.',
  pl_desc_rate:
    '<strong class="tt-head">Польща — Ставки Ryczałt за кодами PKWiU</strong>Ставка податку з обороту залежить від офіційної класифікації послуги за PKWiU:<span class="tt-gap"></span>• <strong>12%</strong>: Розробка ПЗ, програмування, DevOps та IT-консалтинг щодо систем (PKWiU 62)<br>• <strong>8,5%</strong>: Загальні послуги, мануальне QA, нетехнічний PM/BA та адмінпідтримка<br>• <strong>14%</strong>: Архітектура, будівельний/промисловий інжиніринг і проєктування (PKWiU 71)<br>• <strong>15%</strong>: Управлінський консалтинг, маркетинг, реклама та рекрутинг',
  pl_desc_fx:
    '<strong class="tt-head">Вплив курсу EUR / PLN</strong>Перераховує дохід у EUR відносно польських порогів у злотих: підвищеного у 2026 ліміту звільнення від ПДВ <strong>240 000 zł</strong> (<em>zwolnienie z VAT</em>, замість 200k zł), порогів медвнеску NFZ на <em>Ryczałt</em> (<strong>60 000 zł</strong> і <strong>300 000 zł</strong>) та прогресивних порогів <em>Skala</em> (30 000 zł / 120 000 zł).',
  pl_desc_emp:
    '<strong class="tt-head">Польща — Основний JDG проти сумісництва (Zbieg tytułów)</strong><strong>Основний JDG:</strong> Сплачує соціальні внески ZUS відповідно до обраного етапу та медичний внесок NFZ.<span class="tt-gap"></span><strong>Сумісництво (робота за наймом):</strong> За правилом <em>zbieg tytułów ubezpieczeń</em>, трудовий договір із зарплатою не нижче мінімальної 2026 року (<strong>≥4 806 zł/міс</strong> брутто) повністю звільняє JDG від соціальних внесків ZUS (<strong>0 zł</strong>) — сплачуються лише NFZ та PIT.',
  pl_desc_zus:
    '<strong class="tt-head">3 етапи соціальних внесків ZUS (2026)</strong>Нові засновники JDG (які не надають послуги колишньому роботодавцю) мають 30 місяців пільгового ZUS (без добровільного лікарняного <em>chorobowe</em>):<span class="tt-gap"></span>• <strong>1-й рік (Ulga na start + Preferencyjny):</strong> 0 zł соцвнесків ZUS у місяці 1–6, далі 420,86 zł/міс у місяці 7–12 (2 525,16 zł/рік).<br>• <strong>Місяці 7–30 (Preferencyjny ZUS):</strong> <strong>420,86 zł/міс</strong> від 30% мінімальної зарплати (база 1 441,80 zł).<br>• <strong>Стандартний (Duży ZUS):</strong> <strong>1 788,29 zł/міс</strong> від 60% прогнозної середньої зарплати (база 5 652,00 zł).',
  desc_pl_family:
    '<strong class="tt-head">Польща JDG — Спільне оподаткування подружжя, діти та NFZ</strong><strong>Skala podatkowa (12%/32%):</strong> Дозволяє спільну декларацію з непрацюючим чоловіком/дружиною (<em>wspólne rozliczenie</em> подвоює 0% мінімум до <strong>60 000 zł</strong> і поріг 12% до <strong>240 000 zł</strong>) та пільгу <em>Ulga na dzieci</em> (1 112 / 1 112 / 2 000 / 2 700 zł/рік). На <em>Ryczałt</em> і <em>Liniowy</em> податкові пільги — 0 zł.<span class="tt-gap"></span>На <strong>всіх 3 режимах</strong> реєстрація родини через ZUS ZCNA дає <strong>безкоштовну медицину NFZ (0 zł)</strong>.',

  cz_desc_regime:
    '<strong class="tt-head">Чехія — Paušální daň проти Výdajový paušál (2026)</strong><strong>Авто-оптимально:</strong> Обирає доступний режим із вищим чистим доходом (автоматично переходить на <em>Výdaje</em>, коли бонуси на дітей вигідніші за Paušální daň).<span class="tt-gap"></span><strong>Paušální daň (≤2 000 000 Kč):</strong> Єдиний фіксований платіж (9 162 / 16 745 / 27 139 Kč/міс) за податок + ČSSZ + VZP без річних декларацій; скасовує сімейні знижки.<span class="tt-gap"></span><strong>Paušální výdaje (60%/80%/40%):</strong> Без обмеження максимального доходу; зберігає базову знижку 30 840 Kč та пільги на сім’ю.',
  cz_desc_fx:
    '<strong class="tt-head">Вплив курсу EUR / CZK</strong>Перераховує дохід у EUR відносно чеських порогів у кронах: лімітів діапазонів <em>Paušální daň</em> (<strong>1,0M / 1,5M / 2,0M Kč</strong>), порогу обов’язкової реєстрації 21% ПДВ (<strong>2 000 000 Kč</strong> DPH), стель фіксованих витрат (800k / 1,2M / 1,6M Kč) і порогу ставки 23% (1 762 812 Kč).',
  cz_desc_expense:
    '<strong class="tt-head">Категорія діяльності та ліміти витрат у Чехії (§ 7 ZDP)</strong>Визначає і відсоток нормативних витрат (з бази до 2M Kč), і межі груп <em>Paušální daň</em>:<span class="tt-gap"></span>• <strong>60% (макс. 1 200 000 Kč):</strong> Вільні види діяльності (<em>živnost volná</em>) — IT, розробка ПЗ, маркетинг і консалтинг (Група 1 до 1,5M Kč).<br>• <strong>80% (макс. 1 600 000 Kč):</strong> Ремесла (<em>řemeslné živnosti</em>) та агросектор (Група 1 до 2,0M Kč).<br>• <strong>40% (макс. 800 000 Kč):</strong> Ліцензовані професії — адвокати, лікарі, архітектори та автори (Група 1 до 1,0M Kč).',
  cz_desc_emp:
    '<strong class="tt-head">Чехія — Основний (Hlavní) проти сумісництва (Vedlejší OSVČ)</strong><strong>Основний (Hlavní):</strong> Може обрати <em>Paušální daň</em> або сплачувати ČSSZ/VZP з місячними мінімумами 2026 (5 005 Kč соцвнесок + 3 306 Kč медицина).<span class="tt-gap"></span><strong>Сумісництво (Vedlejší):</strong> Не має права на <em>Paušální daň</em>, не має мінімального порогу VZP (сплачує 13,5% від 50% фактичного прибутку) та платить <strong>0 Kč ČSSZ</strong>, якщо річний прибуток нижчий за <strong>117 521 Kč</strong> (<em>rozhodná částka</em>).',
  cz_desc_stage:
    '<strong class="tt-head">Пільговий мінімум ČSSZ для нових OSVČ (2026)</strong>На режимі <em>Paušální výdaje</em> <strong>діючі OSVČ</strong> сплачують мінімальний соцвнесок ČSSZ <strong>5 005 Kč/міс</strong> (29,2% від 35% середньої зарплати 48 967 Kč).<span class="tt-gap"></span><strong>Нові OSVČ</strong> (перша реєстрація без підприємницької діяльності за останні 20 років) у перші календарні роки мають знижену 25%-ву мінімальну базу — <strong>3 575 Kč/міс</strong>.',
  cz_desc_spouse_care:
    '<strong class="tt-head">Правило Чехії 2026 — Догляд за малолітньою дитиною</strong>Після консолідаційної реформи право на <strong>знижку на партнера 24 840 Kč/рік</strong> (<em>sleva na manželku</em> за доходу партнера ≤68 000 Kč) вимагає догляду за дитиною <strong>віком до 3 років</strong>.<span class="tt-gap"></span>Повний догляд за дитиною до 7 років також дає партнеру <strong>державне медстрахування VZP</strong>, скасовуючи обов’язковий платіж <strong>3 024 Kč/міс OBZP</strong>.',
  desc_cz_family:
    '<strong class="tt-head">Чехія OSVČ — Сімейні бонуси та медицина OBZP</strong><strong>Paušální daň:</strong> Не надає жодних знижок на дітей чи партнера (<strong>0 Kč</strong> за § 2a ZDP).<span class="tt-gap"></span><strong>Paušální výdaje:</strong> Відкриває відшкодовувані дитячі кредити <em>Daňové zvýhodnění</em> (<strong>15 204 / 22 320 / 27 840 Kč/рік</strong> за дитину — залишок понад податок виплачується грошима як <em>daňový bonus</em>) та <strong>24 840 Kč/рік</strong> на партнера з дитиною &lt;3 р. Без пільгового догляду за дитиною &lt;7 р. партнер сплачує <strong>3 024 Kč/міс OBZP</strong>.',

  sk_desc_emp:
    '<strong class="tt-head">Словаччина — Основний SZČO проти сумісництва (Popri zamestnaní)</strong><strong>Основний SZČO:</strong> З першого дня сплачує медстрахування ZP (16% у 2026, мінімум <strong>121,92 €/міс</strong>) та соцстрах SP (33,15%, мінімум <strong>303,11 €/міс</strong> після перевищення порогу 9 144 € доходу).<span class="tt-gap"></span><strong>Сумісництво:</strong> Наймана робота скасовує мінімальний платіж ZP 121,92 €/міс (16% платиться лише з фактичної бази), а соцстрах SP дорівнює 0 € при валовому доході ≤9 144 €.',
  sk_desc_stage:
    '<strong class="tt-head">Словаччина — Етап діяльності Sociálna poisťovňa (2026)</strong><strong>Діючий SZČO:</strong> Сплачує 33,15% соцвнеску (у 2026 мінімум підвищено до 60% середньої зарплати 1 524 € = <strong>303,11 €/міс</strong>), якщо річний дохід перевищує 9 144 €.<span class="tt-gap"></span><strong>1-й рік (Startup):</strong> Моделює початкові канікули зі сплати соцстраху SP (0 € SP; сплачується лише 121,92 €/міс ZP). Примітка: консолідаційний пакет 2026 року скорочує стартові канікули SP для нововідкритих SZČO до перших 5 місяців.',
  sk_desc_spouse_care:
    '<strong class="tt-head">Словаччина — Пільговий догляд партнера (§ 11 ods. 4 ZDP)</strong>Непрацюючий чоловік/дружина дає право на податкове вирахування <strong>NČZD na manželku/manžela</strong> (до <strong>5 455,30 €/рік</strong>) та <strong>державну медицину ZP (0 €)</strong> лише за умови догляду за дитиною до 3 років (до 6 при інвалідності), отримання допомоги з догляду або інвалідності.<span class="tt-gap"></span>Без цього NČZD становить 0 €, а незастрахований партнер сплачує <strong>121,92 €/міс</strong> ZP.',
  desc_sk_family:
    '<strong class="tt-head">Словаччина SZČO — Daňový bonus, NČZD на партнера та ZP</strong>Режим 60% фіксованих витрат (макс. 20 000 €) зберігає всі сімейні пільги:<span class="tt-gap"></span>• <strong>Daňový bonus na dieťa:</strong> до <strong>1 200 €/рік</strong> (100 €/міс) за дитину &lt;15 р., з лімітом 29%–50% бази та поступовим зменшенням понад 27 432 € ČZD.<br>• <strong>NČZD на партнера:</strong> вирахування до 5 455,30 € з бази за наявності пільгового догляду.<br>• <strong>Медицина ZP:</strong> 0 € для дітей; <strong>121,92 €/міс</strong> для партнера без пільгового догляду.',

  es_desc_stage:
    '<strong class="tt-head">Іспанія — Шкала RETA за реальним доходом та Tarifa Plana (2026)</strong><strong>Діючий (15 рівнів):</strong> Місячний внесок RETA (31,5% включно з 0,9% MEI) залежить від чистого доходу — від <strong>205,88 €/міс</strong> (R1 ≤670 €/міс) до <strong>607,35 €/міс</strong> мін. бази в 12-му транші (&gt;6 000 €/міс).<span class="tt-gap"></span><strong>Tarifa Plana (80 €/міс):</strong> Пільгова фіксована квота протягом перших 12 місяців нової реєстрації.<span class="tt-gap"></span><strong>Cuota Cero (0 €/міс):</strong> 100% регіональна компенсація 1-го року (Мадрид, Андалусія, Мурсія, Канари тощо).',
  es_desc_cost:
    '<strong class="tt-head">Іспанія — Документальні витрати + 5% Difícil Justificación</strong>В Іспанії немає великих нормативних витрат для сфери послуг. За <em>Estimación Directa Simplificada</em> (до 600 000 €) з бази IRPF вираховуються:<span class="tt-gap"></span>1. <strong>Документально підтверджені витрати</strong> (0% / 10% / 20% з офіційними ПДВ-фактурами)<br>2. <strong>100% сплачених внесків RETA</strong><br>3. Автоматичні <strong>5% gastos de difícil justificación</strong> від чистого доходу, але не більше <strong>2 000 €/рік</strong>.',
  es_desc_emp:
    '<strong class="tt-head">Іспанія — Основний Autónomo проти Pluriactividad</strong><strong>Основна діяльність:</strong> RETA є вашим єдиним режимом соцстрахування.<span class="tt-gap"></span><strong>Сумісництво (Pluriactividad):</strong> Одночасна робота за наймом (<em>Régimen General</em>) та RETA. Протягом року квоти RETA сплачуються стандартно, але якщо сумарні річні внески перевищують встановлену стелю <em>Pluriactividad</em>, TGSS автоматично повертає 50% перевищення (до 50% сплачених квот RETA).',
  desc_es_family:
    '<strong class="tt-head">Іспанія Autónomo — Declaración Conjunta, діти та медицина SNS</strong>Прогресивний IRPF (19%–47%) надає дві вагомі сімейні пільги:<span class="tt-gap"></span>• <strong>Declaración conjunta (ст. 84 LIRPF):</strong> Спільна декларація з непрацюючим чоловіком/дружиною прямо зменшує базу IRPF на <strong>3 400 €/рік</strong>.<br>• <strong>Mínimo por descendientes:</strong> Звільняє <strong>2 400 € / 2 700 € / 4 000 € / 4 500 €</strong> на дитину за нижніми ставками IRPF.<br>• <strong>Медицина:</strong> Безкоштовне універсальне покриття (<strong>0 €</strong>) у державній системі <em>SNS</em>.',

  footer_disclaimer:
    'Інформаційний розрахунок на основі офіційних норм 2026 року (Словенія ZPZR, ZPZR-A, ZPIZ-2, проєкт ZIURS та законодавство HR, IT, AT, HU, PL, CZ, SK, ES). Перед прийняттям фінансових рішень проконсультуйтеся з податковим консультантом. Усі розрахунки виконуються локально у вашому браузері.'
};
