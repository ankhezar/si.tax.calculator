/**
 * 6-Dimension Legal, Financial & Practical Meta-Comparison Dataset (2026)
 * Trilingual (SL, EN, UA) structured matrix + Pros/Cons cards for SI, HR, IT, AT, HU.
 */

export const META_COMPARISON_2026 = {
  dimensions: [
    {
      id: 'cap_cliff',
      title: {
        sl: 'Prihodkovni limit in posledica prekoračitve',
        en: 'Revenue Ceiling & Breach Cliff',
        ua: 'Ліміт доходу та наслідки перевищення'
      },
      cells: {
        si: {
          rating: 'warn',
          sl: '120k € polni / 50k € pop. (ZIURS predlog: 150k / 70k €). Izstop šele ob 2-letnem povprečju nad mejo; presežek obdavčen s 35 %. ZPZR-A odpravil 5-letno prepoved vrnitve.',
          en: '120k € full / 50k € side (ZIURS proposal: 150k / 70k €). Exit based on 2-year average; excess taxed at 35%. 5-yr re-entry ban repealed (ZPZR-A).',
          ua: '120к € повний / 50к € додатк. (ZIURS: 150к / 70к €). Вихід лише за середнім за 2 роки; надлишок під 35%. 5-річну заборону скасовано (ZPZR-A).'
        },
        hr: {
          rating: 'strict',
          sl: 'Trda meja 60.000 €/leto (plačani računi). Takojšen obvezen vstop v PDV (25 %) in prehod na vodenje poslovnih knjig (dejanski stroški).',
          en: 'Hard 60,000 €/yr cap (collected receipts). Crossing triggers mandatory 25% VAT (PDV) and forced switch to real-expense bookkeeping.',
          ua: 'Жорсткий ліміт 60 000 €/рік. Перевищення = обов’язковий ПДВ (25%) і перехід на повний облік реальних витрат.'
        },
        it: {
          rating: 'warn',
          sl: '85.000 €/leto. Med 85k in 100k € izstop v naslednjem letu; nad 100.000 € takojšen izstop sredi leta in obračun IVA že na tem računu!',
          en: '85,000 €/yr. 85k–100k € exits next year; exceeding 100,000 € triggers immediate mid-year exit and IVA on the breaching invoice.',
          ua: '85 000 €/рік. При 85–100к € вихід з наступного року; понад 100 000 € — миттєвий вихід і нарахування IVA.'
        },
        at: {
          rating: 'good',
          sl: 'KU-Pauschalierung do 55.000 € (+10 % toleranca enkrat v 5 letih); nad tem Basispauschalierung vse do 420.000 € letnega prometa.',
          en: 'KU-Pauschalierung up to 55,000 € (+10% tolerance once in 5 yrs); seamlessly scales to Basispauschalierung up to 420,000 €.',
          ua: 'KU-Pauschalierung до 55 000 € (+10% допуск раз на 5 років); далі Basispauschalierung аж до 420 000 €/рік.'
        },
        hu: {
          rating: 'good',
          sl: 'Átalányadó: 10× letna min. plača (38,74M HUF ≈ 96,8k €; trgovina 50×). KATA: 18M HUF (≈ 45k €), nad tem 40 % kazenski davek.',
          en: 'Átalányadó: 10× annual min wage (38.74M HUF ≈ 96.8k €; retail 50×). KATA: 18M HUF (≈ 45k €) with 40% surtax on excess.',
          ua: 'Átalányadó: 10× річних мінзарплат (38,74 млн HUF ≈ 96,8к €). KATA: 18 млн HUF (≈ 45к €), понад ліміт — 40% податку.'
        }
      }
    },
    {
      id: 'vat_b2b',
      title: {
        sl: 'Prag za DDV in izdajanje računov v EU / tujino (B2B)',
        en: 'VAT Exemption Threshold & EU Cross-Border B2B',
        ua: 'Поріг ПДВ та зовнішньоекономічні B2B-послуги (ЄС)'
      },
      cells: {
        si: {
          rating: 'good',
          sl: 'Domači prag za DDV je 60.000 €; za B2B storitve v EU postanete atipični DDV zavezanec (obrnjena davčna obveznost, brez zaračunavanja DDV).',
          en: '60,000 € domestic DDV threshold; EU B2B services use "atypical VAT ID" (reverse charge, 0% VAT, does not force full domestic VAT).',
          ua: 'Внутрішній поріг ПДВ — 60 000 €; для B2B у ЄС оформлюється атиповий VAT-номер (reverse charge, 0% ПДВ).'
        },
        hr: {
          rating: 'warn',
          sl: 'Prag za PDV je 60.000 € (izenačen z mejo pavšala). Za B2B v EU potrebujete PDV-ID in mesečno oddajo obrazcev ZP/PDV.',
          en: '60,000 € PDV threshold (matches Paušalni cap). EU B2B requires PDV-ID registration and monthly VIES/PDV filings.',
          ua: 'Поріг ПДВ — 60 000 € (збігається з лімітом паушалу). Для B2B у ЄС потрібен PDV-ID та щомісячні звіти.'
        },
        it: {
          rating: 'good',
          sl: 'Popolna oprostitev IVA vse do 85.000 €! Za B2B v EU obvezna vključitev v VIES in elektronsko izdajanje računov (FatturaPA / SdI).',
          en: 'IVA-exempt all the way to 85,000 €! EU B2B uses VIES reverse charge via Italy’s mandatory SdI e-invoicing platform.',
          ua: 'Звільнення від IVA аж до 85 000 €! Для B2B у ЄС обов’язкова реєстрація VIES та е-фактури (SdI).'
        },
        at: {
          rating: 'good',
          sl: 'Kleinunternehmer oproščen USt do 55.000 € (tudi čezmejno po EU SME pravilih); pri Basispauschalierung redni obračun 20 % USt / Reverse-Charge.',
          en: 'USt-exempt up to 55,000 € under Kleinunternehmerregelung; Basispauschalierung operates with standard USt / EU reverse charge.',
          ua: 'Звільнення від USt до 55 000 € (Kleinunternehmer); на Basispauschalierung — стандартний ПДВ / EU reverse charge.'
        },
        hu: {
          rating: 'warn',
          sl: 'Oprostitev ÁFA (AAM) le do 20M HUF (≈ 50.000 €) — nad tem vstop v 27 % ÁFA, čeprav ostajate v Átalányadó do ≈ 96,8k €! EU B2B prek EU VAT št.',
          en: 'AAM VAT exemption stops at 20M HUF (≈ 50,000 €) — above that you enter 27% ÁFA domestically even while still in Átalányadó!',
          ua: 'Звільнення від ПДВ (AAM) лише до 20 млн HUF (≈ 50 000 €), вище — 27% ÁFA на внутрішньому ринку.'
        }
      }
    },
    {
      id: 'single_client',
      title: {
        sl: 'Tveganje prikritega delovnega razmerja (1 naročnik / B2B)',
        en: 'Single-Client & Disguised-Employment Risk',
        ua: 'Ризик прихованого працевлаштування (1 клієнт / B2B)'
      },
      cells: {
        si: {
          rating: 'warn',
          sl: 'Prepovedano opravljati delo z elementi delovnega razmerja (ZDR-1); nad 80 % prihodkov od 1 naročnika pomeni status ekonomsko odvisne osebe.',
          en: 'Must avoid employment-relationship elements (ZDR-1); >80% revenue from one client triggers "economically dependent person" rules.',
          ua: 'Заборонено роботу з ознаками трудових відносин (ZDR-1); >80% від 1 клієнта = статус економічно залежної особи.'
        },
        hr: {
          rating: 'strict',
          sl: 'Zelo strogi nadzori Porezne uprave (obrazec UPZ — "prikriveno zapošljavanje") pri delu pretežno za enega naročnika; retroaktivna obdavčitev kot plača!',
          en: 'Aggressive Porezna uprava audits (UPZ questionnaire for disguised employment) when working mainly for 1 client; retroactive salary tax!',
          ua: 'Жорсткі перевірки податкової («приховане працевлаштування», опитувальник UPZ) при роботі на 1 клієнта.'
        },
        it: {
          rating: 'strict',
          sl: 'Izključitev iz Forfettaria, če >50 % računov izdate sedanjemu ali bivšemu delodajalcu (iz zadnjih 2 let). Sicer B2B freelancing dovoljen.',
          en: 'Statutorily barred from Forfettario if >50% of billing goes to a current or recent (last 2 yrs) employer. External B2B clients allowed.',
          ua: 'Заборона Forfettario, якщо >50% доходу від поточного або колишнього (за 2 роки) роботодавця.'
        },
        at: {
          rating: 'warn',
          sl: 'Preverjanje Scheinselbständigkeit (organizacijska vključenost, fiksni urnik, brez lastnega tveganja) s strani ÖGK/SVS in finančne uprave.',
          en: 'Standard EU Scheinselbständigkeit scrutiny (organizational integration, fixed hours, lack of entrepreneurial risk) by ÖGK/BMF.',
          ua: 'Перевірки Scheinselbständigkeit (інтеграція в компанію замовника, фіксований графік, відсутність ризику).'
        },
        hu: {
          rating: 'strict',
          sl: 'KATA: POPOLNA prepoved B2B (izdaja računa podjetju takoj ukine status KATA!). Átalányadó: B2B dovoljen za tuje in domače naročnike.',
          en: 'KATA: TOTAL B2B ban (even one invoice to a company terminates KATA!). Átalányadó: B2B fully allowed for domestic & foreign clients.',
          ua: 'KATA: ПОВНА заборона B2B (рахунок юрособі миттєво скасовує KATA!). Átalányadó: B2B повністю дозволений.'
        }
      }
    },
    {
      id: 'social_quality',
      title: {
        sl: 'Pokojninska osnova in kakovost socialne varnosti',
        en: 'Pension Accrual & Healthcare Coverage',
        ua: 'Пенсійна база та якість соцстрахування'
      },
      cells: {
        si: {
          rating: 'good',
          sl: 'Polno javno zdravstvo (ZZZS + OZP) in starševsko varstvo; pri višjem dobičku višja osnova pomeni tudi višjo pokojninsko osnovo.',
          en: 'Full public healthcare (ZZZS + OZP) & parental leave; higher profit scales contribution base (60%–350% avg wage) and pension accrual.',
          ua: 'Повна державна медицина (ZZZS + OZP); вищий прибуток збільшує базу внесків та майбутню пенсію.'
        },
        hr: {
          rating: 'warn',
          sl: 'Polno osnovno zdravstvo (HZZO), vendar zelo nizka fiksna pokojninska osnova (797,20 €/mes.) — pomeni minimalno državno pokojnino.',
          en: 'Full public HZZO healthcare, but tiny fixed pension base (797.20 €/mo) yields minimal future state pension regardless of revenue.',
          ua: 'Повна базова медицина (HZZO), але дуже низька фіксована пенсійна база (797,20 €/міс.) = мінімальна пенсія.'
        },
        it: {
          rating: 'good',
          sl: 'Visoki prispevki INPS (~24–26 %) gredo skoraj v celoti v pokojninsko blagajno + javno zdravstvo SSN brez dodatnega mesečnega OZP.',
          en: 'Substantial INPS contributions (~24–26%) build proportional pension credits; universal SSN public healthcare included via residency.',
          ua: 'Високі внески INPS (~24–26%) формують пропорційну пенсію; державна медицина SSN включена.'
        },
        at: {
          rating: 'good',
          sl: 'Vrhunski avstrijski sistem SVS (zdravstvo, pokojnina in obvezni odpravninski sklad Selbständigenvorsorge 1,53 %), vezan na dejanski dobiček.',
          en: 'Top-tier Austrian SVS coverage (healthcare, strong earnings-linked pension, plus 1.53% tax-advantaged severance/retirement fund).',
          ua: 'Високоякісна система SVS (медицина, висока пенсія та накопичувальний фонд 1,53%), прив’язана до прибутку.'
        },
        hu: {
          rating: 'warn',
          sl: 'Átalányadó daje sorazmerno pokojninsko osnovo (najmanj min. plača); pri KATA je pokojninska osnova ekstremno nizka (~108k HUF/mes.).',
          en: 'Átalányadó provides proportional pension accrual (floored at min wage); KATA accrues only fractional service years on a tiny base.',
          ua: 'Átalányadó дає пропорційний стаж і базу; на KATA пенсійна база та стаж нараховуються урізано.'
        }
      }
    },
    {
      id: 'residency_183',
      title: {
        sl: 'Davčno rezidentstvo (183 dni) in dejanska prisotnost',
        en: '183-Day Tax Residency & Physical Substance',
        ua: 'Податкове резидентство (183 дні) та реальна присутність'
      },
      cells: {
        si: {
          rating: 'good',
          sl: 'Brez selitve za rezidente Slovenije (e-VEM / SPOT registracija v 1 dnevu). Obdavčitev svetovnega dohodka za slovenske rezidente (6. člen ZDoh-2).',
          en: 'Native option for Slovenian residents (1-day free SPOT setup). Note: Slovenian tax residents are taxed on worldwide income (ZDoh-2 Art. 6).',
          ua: 'Без переїзду для резидентів Словенії (реєстрація через SPOT за 1 день). Світовий дохід оподатковується у Словенії.'
        },
        hr: {
          rating: 'strict',
          sl: 'Zahteva prebivališče na Hrvaškem IN odjavo davčnega rezidentstva v SI (selitev družine/središča življenjskih interesov + >183 dni na HR).',
          en: 'Requires Croatian residence AND severing SI tax residency (moving center of vital interests & spending >183 days/yr outside SI).',
          ua: 'Потрібне проживання в Хорватії ТА вихід із податкового резидентства Словенії (>183 днів + центр життєвих інтересів).'
        },
        it: {
          rating: 'strict',
          sl: 'Zahteva italijansko rezidentstvo (>183 dni / domicilio v Italiji). Za dejanske priseljence obstaja tudi ločen režim "Impatriati" (50 % olajšava).',
          en: 'Requires genuine Italian tax residency (>183 days / habitual abode). Genuine movers may also evaluate Italy’s separate Impatriati regime.',
          ua: 'Потрібне реальне податкове резидентство Італії (>183 днів). Без переїзду зі Словенії FURS донарахує податки.'
        },
        at: {
          rating: 'strict',
          sl: 'Možna čezmejna dejavnost s stalno poslovno enoto v AT, a za obdavčitev izključno v AT je potrebna selitev središča interesov po KIDO SI-AT.',
          en: 'Requires Austrian permanent establishment / residence; without relocating your center of vital interests, SI-AT treaty rules still involve FURS.',
          ua: 'Потрібна реальна база/проживання в Австрії; без перенесення центру життєвих інтересів діє конвенція SI-AT та FURS.'
        },
        hu: {
          rating: 'strict',
          sl: 'Zahteva madžarski naslov, davčno in TAJ številko ter dejansko selitev (>183 dni), sicer FURS obdavči dohodek po svetovnem načelu.',
          en: 'Requires Hungarian address, TAJ social ID, and genuine relocation (>183 days); paper registration while living in SI fails residency tests.',
          ua: 'Потрібна угорська адреса, номер TAJ та реальний переїзд (>183 днів), інакше FURS оподаткує світовий дохід.'
        }
      }
    },
    {
      id: 'admin_perks',
      title: {
        sl: 'Birokracija, računovodstvo in ugodnosti za začetnike',
        en: 'Admin Burden, Accounting & Startup Perks',
        ua: 'Бюрократія, бухгалтерія та пільги для новачків'
      },
      cells: {
        si: {
          rating: 'good',
          sl: 'Minimalna birokracija (samo evidenca izdanih računov + 1 letni DDD-DDD v eDavkih; 0–30 €/mes.). -50 % PIZ v 1. letu in -30 % PIZ v 2. letu!',
          en: 'Ultra-simple (invoice log + 1 annual eDavki return; DIY or ~20 €/mo). Strong startup relief: -50% pension (Yr 1) & -30% pension (Yr 2).',
          ua: 'Мінімум бюрократії (книга рахунків + 1 річний звіт в eDavki). Пільга: -50% пенсійного внеску в 1-й рік та -30% у 2-й рік!'
        },
        hr: {
          rating: 'good',
          sl: 'Zelo preprosto (knjiga prometa KPR + letni obrazec PO-SD v ePorezna; obvezna fiskalizacija gotovine). Prvi 2 leti oprostitev HOK (136,80 €/leto).',
          en: 'Very simple (KPR receipt log + annual PO-SD form via ePorezna; fiscalization rules apply). 2-year HOK chamber fee exemption for newcomers.',
          ua: 'Дуже просто (книга KPR + річний звіт PO-SD в ePorezna). Перші 2 роки — звільнення від внеску палати HOK (136,80 €/рік).'
        },
        it: {
          rating: 'warn',
          sl: 'Izjemen 5 % davek prvih 5 let! Vendar zapleteni roki akontacij (saldo + acconti junij/november) in obvezen commercialista (~600–1.200 €/leto).',
          en: 'Huge 5% tax rate for first 5 years! However, complex advance-tax cashflow (saldo + acconti) & SdI e-invoicing usually require a commercialista (~800 €/yr).',
          ua: 'Чудова ставка 5% перші 5 років! Але складні авансові платежі (saldo + acconti) потребують бухгалтера (~600–1200 €/рік).'
        },
        at: {
          rating: 'warn',
          sl: 'FinanzOnline je pregleden, a WKO članarina, SVS poračuni za nazaj (Nachbemessung po 2–3 letih) in davčna napoved pogosto zahtevajo svetovalca.',
          en: 'Clean FinanzOnline portal, but WKO chamber membership & 2–3 year delayed SVS back-assessments (Nachbemessung) require disciplined tax reserves.',
          ua: 'Зручний FinanzOnline, але внески палати WKO та перерахунки SVS із затримкою 2–3 роки потребують резервування коштів.'
        },
        hu: {
          rating: 'warn',
          sl: 'Pri Átalányadó četrtletni obračuni prispevkov (obrazec 2658) v madžarščini — računovodja skoraj nujen (~50–100 €/mes.) + letna članarina zbornici (5.000 HUF).',
          en: 'Átalányadó requires quarterly payroll-style filings (form 2658) in Hungarian — local accountant strongly advised (~50–100 €/mo) + 5,000 HUF chamber fee.',
          ua: 'Átalányadó вимагає щоквартальних звітів угорською мовою — бухгалтер майже обов’язковий (~50–100 €/міс.).'
        }
      }
    }
  ],

  countryProfiles: {
    si: {
      authorityName: 'FURS / eDavki',
      authorityUrl: 'https://www.fu.gov.si/',
      bestFor: {
        sl: 'Slovenske rezidente do 60k € (ZPZR) oz. do 150k € (če na referendumu uspe ZIURS) ter začetnike v prvih 2 letih.',
        en: 'Slovenian residents up to 60k € (current ZPZR) or up to 150k € (if ZIURS passes the Dec 2026 referendum), especially Years 1–2.',
        ua: 'Резидентів Словенії з доходом до 60к € (ZPZR) або до 150к € (якщо пройде ZIURS), особливо в перші 2 роки.'
      },
      pros: {
        sl: [
          'Brezplačna 1-dnevna registracija (SPOT) in skoraj nič računovodskih stroškov',
          'Močan popust za začetnike: -50 % PIZ v 1. letu in -30 % PIZ v 2. letu',
          'Popoldanski S.P. ima nizke fiksne prispevke (113,01 €/mes.)',
          'Če obvelja ZIURS: vrhunskih 80 % odhodkov do 100k € in meja 150k €'
        ],
        en: [
          'Free 1-day setup (SPOT) and near-zero ongoing accounting overhead',
          'Generous startup pension discounts: -50% PIZ (Year 1) and -30% PIZ (Year 2)',
          'Low fixed contributions for side-job Popoldanski S.P. (113.01 €/mo)',
          'If ZIURS passes referendum: 80% expenses up to 100k € and 150k € ceiling'
        ],
        ua: [
          'Безкоштовна реєстрація за 1 день (SPOT) і майже нульові витрати на бухгалтерію',
          'Суттєві знижки на старті: -50% PIZ у 1-й рік та -30% PIZ у 2-й рік',
          'Низькі фіксовані внески для додаткового ФОП (113,01 €/міс.)',
          'Якщо на референдумі пройде ZIURS: 80% витрат до 100к € та ліміт 150к €'
        ]
      },
      cons: {
        sl: [
          'Po veljavnem ZPZR nad 60.000 € prihodkov ni več dodatnih normiranih odhodkov (0 %)',
          'Prištevanje prispevkov v zavarovalno osnovo (145. člen ZPIZ-2) močno zviša prispevke po 2.–4. letu pri višjih prihodkih',
          'Zakonodajna negotovost do referenduma o ZIURS (6. 12. 2026)'
        ],
        en: [
          'Under current ZPZR, 0% additional expenses recognized above 60,000 € (12,5k/30k € for side-job)',
          'ZPIZ-2 Art. 145 recursive contribution add-back sharply raises Year 3–4+ contributions above 60k €',
          'Legislative uncertainty ahead of the December 6, 2026 ZIURS referendum'
        ],
        ua: [
          'За чинним ZPZR понад 60 000 € додаткові витрати не визнаються (0%)',
          'Рекурсивне додавання внесків у базу (ст. 145 ZPIZ-2) суттєво підвищує внески на 3–4+ рік',
          'Законодавча невизначеність до референдуму щодо ZIURS (6.12.2026)'
        ]
      }
    },

    hr: {
      authorityName: 'Porezna uprava RH',
      authorityUrl: 'https://www.porezna-uprava.gov.hr/',
      bestFor: {
        sl: 'Dejanske rezidente Hrvaške z razpršenimi naročniki in stabilnimi prihodki pod 60.000 €/leto.',
        en: 'Genuine Croatian residents with multiple clients and annual revenue comfortably below 60,000 €.',
        ua: 'Реальних резидентів Хорватії з кількома клієнтами та доходом стабільно до 60 000 €/рік.'
      },
      pros: {
        sl: [
          'Najnižja skupna obremenitev v regiji do 60.000 € (~7,8 % skupnih dajatev pri 60k €!)',
          'Fiksni mesečni prispevki (290,98 €/mes.) ne rastejo z dobičkom do 60k €',
          'Izjemno ugoden obrt ob zaposlitvi (prispevki le ~1.575 €/leto pri najvišjem razredu)'
        ],
        en: [
          'Lowest total burden in the region up to 60,000 € (~7.8% total tax + social at 60k €!)',
          'Fixed monthly social contributions (290.98 €/mo) never scale up with profit inside the 60k € cap',
          'Ultra-low side-job contributions (max 1,575 €/yr even in the top 50k–60k € bracket)'
        ],
        ua: [
          'Найнижче загальне навантаження в регіоні до 60 000 € (~7,8% усіх податків і внесків на 60к €!)',
          'Фіксовані щомісячні соцвнески (290,98 €/міс.) не зростають із прибутком',
          'Дуже вигідний ФОП паралельно з роботою (макс. 1 575 €/рік соцвнесків)'
        ]
      },
      cons: {
        sl: [
          'Trd prepad pri 60.000 €: obvezen 25 % PDV in izguba pavšalnega statusa',
          'Agresivni inšpekcijski nadzori prikritega delovnega razmerja (UPZ) za IT/svetovalce z 1 glavnim naročnikom',
          'Minimalna pokojninska osnova pomeni zelo nizko pokojnino v starosti'
        ],
        en: [
          'Hard 60,000 € cliff forcing immediate 25% VAT (PDV) & full real-expense accounting',
          'Strict Porezna uprava "disguised employment" (UPZ) crackdowns on single-client B2B contractors',
          'Minimal pension assessment base results in very low state pension accrual'
        ],
        ua: [
          'Жорсткий обрив на 60 000 €: обов’язковий 25% ПДВ і втрата паушального режиму',
          'Суворі перевірки «прихованого працевлаштування» (UPZ) для B2B-підрядників з 1 клієнтом',
          'Мінімальна пенсійна база означає дуже низьку державну пенсію'
        ]
      }
    },

    it: {
      authorityName: 'Agenzia delle Entrate / INPS',
      authorityUrl: 'https://www.agenziaentrate.gov.it/',
      bestFor: {
        sl: 'Novoustanovljene dejavnosti v prvih 5 letih (5 % davek!) in trgovce/e-commerce (60 % priznanih stroškov) do 85.000 €.',
        en: 'First-5-year startups (5% tax!), e-commerce/merchants (40% taxable coeff), and freelancers up to 85,000 €.',
        ua: 'Новий бізнес у перші 5 років (податок 5%!) та e-commerce/фрілансерів з доходом до 85 000 €.'
      },
      pros: {
        sl: [
          'Samo 5 % dohodnine prvih 5 let (15 % kasneje), pri čemer se prispevki INPS odštejejo od davčne osnove',
          'Visok prag 85.000 € s popolno oprostitvijo DDV (IVA)',
          'V Gestione Separata ni minimalnih fiksnih prispevkov (plačate le % od dejanskega prometa)'
        ],
        en: [
          '5% flat tax for the first 5 years (15% thereafter), applied AFTER deducting INPS contributions',
          'Generous 85,000 € revenue cap with full IVA (VAT) exemption',
          'Zero fixed minimum social contribution in Gestione Separata (strictly proportional to revenue)'
        ],
        ua: [
          'Лише 5% податку перші 5 років (далі 15%), причому внески INPS зменшують базу оподаткування',
          'Високий ліміт 85 000 € із повним звільненням від ПДВ (IVA)',
          'У Gestione Separata немає мінімального фіксованого внеску (лише % від доходу)'
        ]
      },
      cons: {
        sl: [
          'Visoka stopnja prispevkov INPS (26,07 %) pri nizkih priznanih stroških ( le 22 % za svetovalce / 33 % za IT)',
          'Prekoračitev 100.000 € sproži takojšen retroaktiven obračun IVA in prehod na progresivni IRPEF (do 43 %)',
          'Zapleten sistem predplačil (saldo + acconti) in obvezna e-fakturacija zahtevata računovodjo'
        ],
        en: [
          'Steep 26.07% INPS rate combined with modest implied expenses (only 22% consultants / 33% IT)',
          'Crossing 100,000 € triggers immediate mid-year IVA & steep progressive IRPEF (up to 43%)',
          'Complex advance tax payments (saldo + acconti) create Year-2 cashflow shock'
        ],
        ua: [
          'Висока ставка INPS (26,07%) при невеликих нормативних витратах (22% консультанти / 33% IT)',
          'Перевищення 100 000 € спричиняє миттєвий перехід на ПДВ і прогресивний IRPEF (до 43%)',
          'Складна система авансів (saldo + acconti) створює касове навантаження на 2-й рік'
        ]
      }
    },

    at: {
      authorityName: 'BMF / WKO / SVS',
      authorityUrl: 'https://www.usp.gv.at/',
      bestFor: {
        sl: 'Podjetnike z zelo visokimi prihodki (do 420k €) ali zmernimi prihodki do ~35k € (zaradi 0 % dohodnine do 13.539 € in 15 % Grundfreibetrag).',
        en: 'Low-to-mid earners benefiting from the 13,539 € 0%-tax band, or high earners needing a 420,000 € flat-rate ceiling with strong social security.',
        ua: 'Підприємців з невеликим доходом (0% податку до 13 539 €) або високим оборотом (ліміт до 420 000 €) і сильним соцзахистом.'
      },
      pros: {
        sl: [
          'Avtomatski 15 % Grundfreibetrag (do 4.950 €) in 0 % dohodnine do 13.539 € davčne osnove',
          'Basispauschalierung sega vse do 420.000 € letnih prihodkov brez dvostavnega knjigovodstva',
          'Vrhunsko zdravstveno in pokojninsko zavarovanje SVS (prispevki v celoti znižujejo davčno osnovo)'
        ],
        en: [
          '0% income tax up to 13,539 € taxable base plus automatic 15% Grundfreibetrag (up to 4,950 €)',
          'Basispauschalierung scales up to 420,000 € revenue without double-entry bookkeeping',
          'High-quality SVS healthcare, pension & severance fund (100% tax-deductible)'
        ],
        ua: [
          '0% прибуткового податку до 13 539 € бази плюс автоматична пільга 15% Grundfreibetrag (до 4 950 €)',
          'Basispauschalierung діє аж до 420 000 € доходу без подвійної бухгалтерії',
          'Преміальне страхування SVS (медицина, пенсія, вихідний фонд), що повністю зменшує базу податку'
        ]
      },
      cons: {
        sl: [
          'Zelo nizki pavšalni stroški za IT in svetovanje (le 20 % do 55k € in zgolj 6 % nad 55k €!)',
          'Strma progresivna dohodnina (30 % / 40 % / 48 % / 50 %) močno obremeni prihodke nad 60.000 €',
          'SVS poračuni za nazaj (Nachbemessung) lahko presenetijo v 3. letu poslovanja'
        ],
        en: [
          'Very low flat-expense ratios for IT/consulting (20% up to 55k €, dropping to just 6% above 55k €!)',
          'Steep progressive income tax brackets (30%–50%) make total burden the highest above 60,000 €',
          'Delayed SVS back-assessments (Nachbemessung) require careful multi-year cash reserves'
        ],
        ua: [
          'Дуже низькі нормативні витрати для IT/консалтингу (20% до 55к € і лише 6% понад 55к €!)',
          'Крута прогресивна шкала податку (30%–50%) робить навантаження найвищим після 60 000 €',
          'Донарахування SVS за попередні роки (Nachbemessung) потребують фінансового резерву'
        ]
      }
    },

    hu: {
      authorityName: 'NAV (Nemzeti Adó- és Vámhivatal)',
      authorityUrl: 'https://nav.gov.hu/',
      bestFor: {
        sl: 'B2C storitve do ~45k € (KATA ~125 €/mes.) ali B2B/obrtne dejavnosti v Átalányadó (45 % / 80 % stroškov) do ~96,8k €.',
        en: 'Pure B2C freelancers under ~45k € (KATA ~125 €/mo) or B2B contractors / trades under Átalányadó (45% / 80% expenses) up to ~96.8k €.',
        ua: 'Чистий B2C до ~45к € (KATA ~125 €/міс.) або B2B-фахівці на Átalányadó (45% / 80% витрат) до ~96,8к €.'
      },
      pros: {
        sl: [
          'Reformirani Átalányadó 2026: 45 % stroškov za storitve, neobdavčen pas do polovice letne min. plače in ukinjen 112,5 % SZOCHO faktor',
          'Popoldanski Átalányadó nima minimalnih prispevkov in je do ~8.800 € prometa skoraj povsem neobdavčen',
          'Za B2C stranke je KATA (50.000 HUF ≈ 125 €/mes.) med najcenejšimi pavšali v EU'
        ],
        en: [
          '2026 Átalányadó upgrades: 45% service expenses, tax-free half-min-wage profit band, and 112.5% SZOCHO surcharge repealed',
          'Side-job Átalányadó has zero minimum social floor and 0% tax/social inside the exempt profit band',
          'For pure B2C clients, KATA (50,000 HUF ≈ 125 €/mo) is almost unbeatable up to ~45,000 €'
        ],
        ua: [
          'Покращення Átalányadó 2026: 45% витрат для послуг, неоподатковуваний ліміт прибутку та скасування коефіцієнта 112,5% для SZOCHO',
          'Додатковий ФОП (mellékállású) не має мінімального внеску і не платить податків у межах пільги',
          'Для B2C-клієнтів KATA (50 000 HUF ≈ 125 €/міс.) є одним із найдешевших режимів у ЄС'
        ]
      },
      cons: {
        sl: [
          'KATA je strogo prepovedana za B2B (izdaja računa kateremukoli podjetju takoj ukine KATA)',
          'Valutno tveganje EUR/HUF in nizek prag za oprostitev DDV (20M HUF ≈ 50.000 €, nad tem 27 % ÁFA)',
          'Obvezni četrtletni obračuni v madžarščini + lokalni občinski davek HIPA (do 2 %)'
        ],
        en: [
          'KATA strictly bans all B2B invoicing (domestic or foreign corporate clients disqualify you)',
          'EUR/HUF FX exposure and relatively low ~50,000 € (20M HUF) VAT exemption ceiling (27% ÁFA above)',
          'Quarterly Hungarian-language payroll filings + municipal business tax (HIPA up to 2%)'
        ],
        ua: [
          'KATA суворо заборонена для B2B (будь-який рахунок компанії скасовує KATA)',
          'Валютний ризик EUR/HUF та низький поріг без ПДВ (20 млн HUF ≈ 50 000 €, вище — 27% ÁFA)',
          'Щоквартальна звітність угорською мовою + місцевий податок HIPA (до 2%)'
        ]
      }
    }
  }
};
