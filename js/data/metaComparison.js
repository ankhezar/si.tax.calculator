/**
 * 7-Dimension Legal, Financial & Practical Meta-Comparison Dataset (2026)
 * Trilingual (SL, EN, UA) structured matrix + Pros/Cons cards for SI, HR, IT, AT, HU, PL, CZ, SK, ES.
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
        },
        pl: {
          rating: 'good',
          sl: 'Ryczałt (12 % IT / 8,5 % storitve) velja vse do 2.000.000 € letnih prihodkov! Skala (12 %/32 %) in Liniowy (19 %) nimata zgornje meje prihodkov.',
          en: 'Ryczałt (12% IT / 8.5% services) applies up to 2,000,000 €/yr turnover! Skala (12%/32%) and Liniowy (19%) have no statutory revenue ceiling.',
          ua: 'Ryczałt (12% IT / 8,5% послуги) діє аж до 2 000 000 €/рік доходу! Skala (12%/32%) та Liniowy (19%) не мають верхньої межі обороту.'
        },
        cz: {
          rating: 'good',
          sl: 'Paušální daň (3 pasovi) do 2.000.000 CZK (≈ 79,4k €); nad tem brezhiben prehod na 60 %/80 %/40 % pavšalne odhodke (omejene na osnovo 2M CZK, brez limita prihodkov).',
          en: 'Paušální daň (3 bands) up to 2,000,000 CZK (≈ 79.4k €); above 2M CZK seamlessly switches to 60%/80%/40% flat expenses (capped on 2M CZK base, no turnover cap).',
          ua: 'Paušální daň (3 рівні) до 2 000 000 CZK (≈ 79,4к €); вище — плавний перехід на 60%/80%/40% паушальних витрат (ліміт витрат з бази 2 млн CZK, без межі доходу).'
        },
        sk: {
          rating: 'good',
          sl: '60 % pavšalnih odhodkov (navzgor omejenih na 20.000 €/leto) + znižan 15 % davek SZČO do 100.000 € prometa; nad 100k € progresivna lestvica 19 %–35 %.',
          en: '60% flat expenses (capped at 20,000 €/yr) + reduced 15% SZČO income tax up to 100,000 € turnover; above 100k € switches to 19%–35% progressive brackets.',
          ua: '60% паушальних витрат (макс. 20 000 €/рік) + знижений 15% податок SZČO до 100 000 € обороту; понад 100к € діє прогресивна шкала 19%–35%.'
        },
        es: {
          rating: 'good',
          sl: 'Estimación Directa Simplificada velja vse do 600.000 €/leto (dejanski poslovni stroški + 5 % avtomatskih stroškov do največ 2.000 €/leto).',
          en: 'Estimación Directa Simplificada applies up to 600,000 €/yr turnover (documented expenses + automatic 5% difícil justificación capped at 2,000 €/yr).',
          ua: 'Estimación Directa Simplificada діє аж до 600 000 €/рік обороту (документальні витрати + автоматичні 5% difícil justificación до 2 000 €/рік).'
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
        },
        pl: {
          rating: 'good',
          sl: 'Prag za oprostitev DDV v 2026 zvišan na 240.000 PLN (≈ 56,1k €; 23 % VAT nad tem). Za B2B v EU registracija VAT-UE (obrnjena obveznost) + e-računi KSeF.',
          en: 'Domestic VAT exemption raised to 240,000 PLN (≈ 56.1k €) in 2026 (23% VAT above). EU B2B uses VAT-UE reverse charge; mandatory KSeF e-invoicing rolling out.',
          ua: 'Поріг без ПДВ у 2026 р. підвищено до 240 000 PLN (≈ 56,1к €; вище 23% VAT). Для B2B у ЄС — VAT-UE reverse charge + система е-фактур KSeF.'
        },
        cz: {
          rating: 'good',
          sl: 'Visok domači prag za DPH: 2.000.000 CZK (≈ 79,4k €; 21 % nad tem). Za B2B v EU status "Identifikovaná osoba" (0 % reverse charge; združljiv s Paušální daň!).',
          en: 'High 2,000,000 CZK (≈ 79.4k €) domestic DPH ceiling (21% above). EU B2B services use "Identifikovaná osoba" (reverse charge, compatible with Paušální daň!).',
          ua: 'Високий поріг DPH: 2 000 000 CZK (≈ 79,4к €; вище 21%). Для B2B у ЄС оформлюється «Identifikovaná osoba» (reverse charge, сумісно з Paušální daň!).'
        },
        sk: {
          rating: 'warn',
          sl: 'Domači prag za DPH je 50.000 € v koledarskem letu (23 % DPH nad mejo; takojšen vstop nad 62.500 €). Za B2B v EU registracija po § 7a zakona o DPH.',
          en: '50,000 € calendar-year domestic DPH threshold (23% DPH above; immediate entry if >62,500 €). EU B2B services require § 7a DPH registration & quarterly VIES.',
          ua: 'Внутрішній поріг DPH — 50 000 € за календарний рік (вище 23% DPH; миттєвий вхід понад 62 500 €). Для B2B у ЄС — реєстрація за § 7a DPH.'
        },
        es: {
          rating: 'strict',
          sl: '0 € praga za oprostitev IVA! Španija v 2026 še ni uvedla "IVA franquiciado" — 21 % IVA od prvega evra za domače stranke (Modelo 303). EU B2B prek ROI/VIES (0 %).',
          en: '0 € domestic VAT exemption! Spain still has NO small-business IVA threshold in 2026 — 21% IVA applies from euro 1 domestically (quarterly Modelo 303). EU B2B via ROI/VIES.',
          ua: '0 € порогу звільнення від IVA! Іспанія у 2026 р. не має безПДВ-ліміту — 21% IVA з першого євро на внутрішньому ринку (щоквартальний Modelo 303). EU B2B через ROI/VIES.'
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
        },
        pl: {
          rating: 'warn',
          sl: 'B2B JDG za 1 naročnika je v poljskem IT standard, a prepovedan Ryczałt/Liniowy in Mali ZUS pri delu za bivšega delodajalca (1–2 leti); poostren nadzor PIP.',
          en: 'Single-client B2B JDG is widespread in Polish IT, though invoicing a current/recent employer for identical duties bars Ryczałt/Liniowy & preferential ZUS; PIP scrutiny rising.',
          ua: 'B2B JDG з 1 клієнтом поширений у польському IT, але робота на колишнього роботодавця блокує Ryczałt/Liniowy та пільговий ZUS; посилюється контроль PIP.'
        },
        cz: {
          rating: 'strict',
          sl: 'Stroga zakonska prepoved "Švarcsystéma" (prikrite zaposlitve po § 2 delovnega zakonika) — inšpektorat SÚIP izreka visoke globe do 10M CZK ob delu pod nadzorom 1 naročnika.',
          en: 'Strict statutory ban on "Švarcsystém" (disguised employment, § 2 Labor Code) — SÚIP labor inspectorate levies heavy fines (up to 10M CZK) if subordinated to 1 client.',
          ua: 'Сувора заборона «Švarcsystém» (прихованого найму, § 2 Кодексу праці) — інспекція SÚIP штрафує до 10 млн CZK за роботу в підпорядкуванні 1 замовника.'
        },
        sk: {
          rating: 'strict',
          sl: 'Poostreni inšpekcijski nadzori v 2026 nad prikrito odvisno zaposlitvijo ("závislá práca" za 1 naročnika z določenim delovnim časom in opremo naročnika).',
          en: 'Tightened 2026 Labor Inspectorate crackdowns and higher fines on disguised "závislá práca" (single-client contractors integrated into client hours/tools).',
          ua: 'Посилені у 2026 р. перевірки Інспекції праці та штрафи за приховану «závislá práca» (роботу на 1 клієнта за його графіком та обладнанням).'
        },
        es: {
          rating: 'warn',
          sl: 'Ob ≥75 % prihodkov od 1 naročnika velja reguliran status TRADE (pogodbena zaščita), dejanska podrejenost pa sproži kazni za "falso autónomo".',
          en: 'Earning ≥75% from 1 client classifies you as a regulated TRADE contractor; genuine employer subordination triggers "falso autónomo" social-security penalties.',
          ua: 'При ≥75% доходу від 1 клієнта діє регульований статус TRADE, а фактичне підпорядкування загрожує штрафами за «falso autónomo».'
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
        },
        pl: {
          rating: 'warn',
          sl: 'Polno javno zdravstvo NFZ (498–1.495 PLN/mes. pri Ryczałtu); pokojninska osnova ZUS je zmerna in fiksna (60 % povp. plače pri Duży ZUS, 0 PLN med Ulga na start).',
          en: 'Full NFZ public healthcare (tiered 498–1,495 PLN/mo on Ryczałt); ZUS pension base is flat/moderate (60% avg wage on Duży ZUS; 0 PLN pension during 6-mo Ulga na start).',
          ua: 'Повна державна медицина NFZ (498–1 495 PLN/міс. на Ryczałt); пенсійна база ZUS помірна й фіксована (60% середньої ЗП на Duży ZUS; 0 PLN під час Ulga na start).'
        },
        cz: {
          rating: 'good',
          sl: 'Zanesljivo javno zdravstvo VZP (min. 3.306 CZK/mes.) in pokojninsko zavarovanje ČSSZ (min. osnova 40 % povp. plače; v Paušální daň Pasu 1 povišana za +15 %).',
          en: 'Solid VZP public healthcare (3,306 CZK/mo min) & ČSSZ pension coverage (40% avg-wage floor; Paušální daň Band 1 boosts pension base by 1.15×).',
          ua: 'Надійна державна медицина VZP (мін. 3 306 CZK/міс.) та пенсія ČSSZ (мін. база 40% середньої ЗП; на Paušální daň Рівень 1 база пенсії +15%).'
        },
        sk: {
          rating: 'warn',
          sl: 'Polno javno zdravstvo (16 % v 2026, min. 121,92 €/mes.) in Sociálna poisťovňa (33,15 %, min. 303,11 €/mes. na 60 % povp. plače; 1. leto brez socialnih prispevkov).',
          en: 'Full public health insurance (16% in 2026, min 121.92 €/mo) & Sociálna poisťovňa pension/sickness (33.15%, min 303.11 €/mo; 0 € social accrual during Year-1 holiday).',
          ua: 'Повна державна медицина (16% у 2026 р., мін. 121,92 €/міс.) та Sociálna poisťovňa (33,15%, мін. 303,11 €/міс.; у 1-й рік канікул пенсійний стаж не йде).'
        },
        es: {
          rating: 'good',
          sl: 'Univerzalno javno zdravstvo SNS + pokojninska, bolniška in brezposelnostna varnost RETA po 15 dohodkovnih razredih (205,88 €–607,35+ €/mes.).',
          en: 'Universal SNS public healthcare + comprehensive RETA pension, sickness & cessation-of-activity coverage scaled across 15 real-income brackets (205.88 €–607.35+ €/mo).',
          ua: 'Універсальна державна медицина SNS + повний соцзахист RETA (пенсія, лікарняні, припинення діяльності) за 15 рівнями доходу (205,88 €–607,35+ €/міс.).'
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
        },
        pl: {
          rating: 'strict',
          sl: 'Zahteva PESEL, vpis v CEIDG in dejansko davčno rezidentstvo na Poljskem (>183 dni / središče življenjskih interesov po konvenciji SI-PL).',
          en: 'Requires Polish PESEL, CEIDG registration, and genuine relocation (>183 days & center of vital interests in Poland under the SI–PL tax treaty).',
          ua: 'Потрібні PESEL, реєстрація CEIDG та реальне податкове резидентство Польщі (>183 днів і центр життєвих інтересів за конвенцією SI-PL).'
        },
        cz: {
          rating: 'strict',
          sl: 'Zahteva češko obrtno dovoljenje (živnostenský list), naslov in dejansko bivanje >183 dni na Češkem ter odjavo rezidentstva pri FURS.',
          en: 'Requires Czech trade license (živnostenský list), local address, and genuine >183-day relocation + severing SI tax residency with FURS.',
          ua: 'Потрібні чеська ліцензія (živnostenský list), місцева адреса та реальне проживання >183 днів у Чехії з виходом із резидентства SI.'
        },
        sk: {
          rating: 'strict',
          sl: 'Zahteva slovaško živnost, prebivališče na Slovaškem in dejansko selitev središča interesov (>183 dni/leto) po konvenciji SI-SK.',
          en: 'Requires Slovak živnosť, local residence registration, and genuine relocation (>183 days & center of vital interests) under the SI–SK treaty.',
          ua: 'Потрібні словацька živnosť, реєстрація проживання та реальний переїзд (>183 днів і центр інтересів) за конвенцією SI-SK.'
        },
        es: {
          rating: 'strict',
          sl: 'Zahteva španski NIE, vpis v RETA/Hacienda in >183 dni v Španiji (opomba: poseben 24 % režim "Ley Beckham" za običajne freelance autónome praviloma ne velja).',
          en: 'Requires Spanish NIE, RETA/Hacienda registration & >183 days in Spain (note: Spain’s 24% Beckham Law generally excludes standard freelance autónomos).',
          ua: 'Потрібні NIE, реєстрація RETA/Hacienda та >183 днів в Іспанії (спецрежим 24% «Ley Beckham» для звичайних фрілансерів autónomo зазвичай недоступний).'
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
        },
        pl: {
          rating: 'good',
          sl: '1-dnevna spletna registracija CEIDG in 30 mesecev popustov ZUS (6 mes. Ulga na start 0 PLN soc. + 24 mes. Preferencyjny ZUS 420,86 PLN/mes.); računovodska aplikacija ~50 €/mes.',
          en: '1-day online CEIDG setup + huge 30-month ZUS runway (6 mo Ulga na start 0 PLN social + 24 mo Preferencyjny ZUS 420.86 PLN/mo); online accounting ~50 €/mo.',
          ua: 'Онлайн-реєстрація CEIDG за 1 день + 30 місяців пільг ZUS (6 міс. Ulga na start 0 PLN соц. + 24 міс. Preferencyjny ZUS 420,86 PLN/міс.); онлайн-бухгалтерія ~50 €/міс.'
        },
        cz: {
          rating: 'good',
          sl: 'Paušální daň je vrhunec preprostosti v EU: 1 samo mesečno nakazilo (9.162 CZK v Pasu 1) in NIČ letnih davčnih ali socialnih obračunov! Klasični 60 % OSVČ odda 3 letne obrazce.',
          en: 'Paušální daň is Europe’s cleanest regime: 1 single monthly payment (9,162 CZK in Band 1) and ZERO annual tax or social filings! Standard 60% OSVČ files 3 annual forms.',
          ua: 'Paušální daň — взірець простоти в ЄС: 1 щомісячний платіж (9 162 CZK у Рівні 1) і ЖОДНИХ річних звітів! Стандартний 60% OSVČ подає 3 річні звіти.'
        },
        sk: {
          rating: 'good',
          sl: '1. leto popolna oprostitev socialnih prispevkov Sociálna poisťovňa (plačujete le 121,92 €/mes. zdravstva!) + preprost letni obračun s 60 % pavšalnimi stroški.',
          en: '1st-year Social Insurance holiday (0 € Sociálna poisťovňa in Year 1 — only 121.92 €/mo health paid!) + simple annual 60% flat-expense tax return.',
          ua: 'Канікули зі соцвнесків у 1-й рік (0 € Sociálna poisťovňa — сплачується лише 121,92 €/міс. медицини!) + проста річна декларація із 60% витрат.'
        },
        es: {
          rating: 'warn',
          sl: 'Ugodna Tarifa Plana 80 €/mes. v 1. letu (oz. 0 € Cuota Cero v Madridu/Andaluziji), a četrtletni obračuni IVA/IRPF (Modelo 303/130) in VeriFactu zahtevajo gestorío (~70 €/mes.).',
          en: 'Great 80 €/mo Tarifa Plana in Year 1 (0 € Cuota Cero in Madrid/Andalucía), but quarterly Modelo 303/130 filings & VeriFactu e-invoicing require a gestoría (~70 €/mo).',
          ua: 'Вигідна Tarifa Plana 80 €/міс. у 1-й рік (0 € Cuota Cero у Мадриді/Андалусії), але квартальні звіти Modelo 303/130 потребують gestoría (~70 €/міс.).'
        }
      }
    },
    {
      id: 'family_dependents',
      title: {
        sl: 'Družinske davčne olajšave (otroci) in zavarovanje nezaposlenega zakonca',
        en: 'Family Tax Credits (Children) & Non-Working Spouse Healthcare',
        ua: 'Сімейні податкові пільги (діти) та страхування непрацюючого подружжя'
      },
      cells: {
        si: {
          rating: 'strict',
          sl: '0 € davčne olajšave za otroke/zakonca (cedularni davek po 59. členu ZDoh-2). Otroci zavarovani za 0 €, nezaposlen zakonec pa plačuje obvezni OZP (39,36 €/mes. = 472,32 €/leto).',
          en: '0 € dependent tax relief (forfeited under ZDoh-2 Art. 59 cedular tax). Children co-insured free; non-working spouse still owes mandatory OZP (39.36 €/mo = 472.32 €/yr).',
          ua: '0 € податкової знижки на дітей/подружжя (цедулярний податок, ст. 59 ZDoh-2). Діти застраховані за 0 €, але непрацююче подружжя сплачує OZP (39,36 €/міс. = 472,32 €/рік).'
        },
        hr: {
          rating: 'warn',
          sl: '0 € davčne olajšave pri pavšalnem davku PO-SD, vendar sta nezaposlen zakonec in otroci brezplačno zdravstveno sozavarovani pri HZZO (0 € dodatnega stroška).',
          en: '0 € dependent tax relief on fixed PO-SD bracket tax, but unemployed spouse and children receive free HZZO public health co-insurance (0 € extra cost).',
          ua: '0 € податкової знижки на паушальному податку PO-SD, проте непрацююче подружжя та діти мають безкоштовне медстрахування HZZO (0 € витрат).'
        },
        it: {
          rating: 'warn',
          sl: '0 € davčnih olajšav IRPEF za vzdrževane člane (izgubljene zaradi 5 %/15 % davka), a brezplačno zdravstvo SSN za vso družino (0 € stroška; Assegno Unico ločeno).',
          en: '0 € IRPEF dependent deductions (forfeited under 5%/15% substitute tax), but universal SSN healthcare covers resident spouse & children at 0 € extra cost.',
          ua: '0 € податкових відрахувань IRPEF на утриманців (втрачаються на ставці 5%/15%), але медицина SSN для всієї родини безкоштовна (0 € витрат).'
        },
        at: {
          rating: 'good',
          sl: 'Izjemen prihranek: Familienbonus Plus 2.000,16 €/leto na otroka (<18) + AVAB 612–1.101+ €/leto ob nezaposlenem zakoncu! Brez otrok sozavarovanje zakonca stane +3,4 % SVS.',
          en: 'Massive relief: 2,000.16 €/yr Familienbonus Plus per child (<18) + 612–1,101+ €/yr AVAB sole-earner credit! Free spouse SVS with kids (+3.4% SVS only if childless).',
          ua: 'Величезна вигода: 2 000,16 €/рік Familienbonus Plus на дитину (<18) + 612–1 101+ €/рік AVAB! Безкоштовне SVS подружжя з дітьми (+3,4% SVS лише без дітей).'
        },
        hu: {
          rating: 'good',
          sl: 'Átalányadó (podvojeno v 2026!): ~600 € (1 otrok), ~2.400 € (2 otroka), ~5.940 €/leto (3 otroci) zniža 15 % SZJA in 18,5 % TBJ! KATA: 0 € olajšav. Zakonec brez zavarovanja: ~369 €/leto TB.',
          en: 'Átalányadó (doubled in 2026!): ~600 € (1 kid), ~2,400 € (2 kids), ~5,940 €/yr (3 kids) offsets both 15% SZJA & 18.5% TBJ! KATA: 0 € credit. Uninsured spouse owes ~369 €/yr health fee.',
          ua: 'Átalányadó (подвоєно у 2026!): ~600 € (1 дит.), ~2 400 € (2 дітей), ~5 940 €/рік (3 дітей) зменшує 15% SZJA та 18,5% TBJ! KATA: 0 € пільг. Медвнесок за подружжя: ~369 €/рік.'
        },
        pl: {
          rating: 'warn',
          sl: 'Ryczałt & Liniowy: 0 € družinskih davčnih olajšav, a 0 € NFZ zdravstveno sozavarovanje zakonca in otrok (ZCNA)! Skala (12 %/32 %): skupna napoved z zakoncem podvoji 30k PLN 0 % pas + Ulga na dzieci.',
          en: 'Ryczałt & Liniowy: 0 € family tax relief, but 0 € NFZ spouse/child health co-insurance (ZCNA)! Skala (12%/32%): joint spouse filing doubles the 30k PLN 0% band + Ulga na dzieci (1,112–2,700 PLN).',
          ua: 'Ryczałt і Liniowy: 0 € сімейних податкових пільг, але 0 € медстрахування NFZ для подружжя й дітей (ZCNA)! Skala (12%/32%): спільна декларація подвоює 30к PLN 0% бази + Ulga na dzieci.'
        },
        cz: {
          rating: 'good',
          sl: 'Paušální daň: 0 € olajšav. 60 % Výdaje: 15.204 / 22.320 / 27.840 CZK/leto za 1./2./3.+ otroka + 24.840 CZK za zakonca (otrok <3). Od 2026 zakonec brez otroka <7 plačuje OBZP (3.024 CZK/mes.).',
          en: 'Paušální daň: 0 € credits. 60% Výdaje: 15,204 / 22,320 / 27,840 CZK/yr per 1st/2nd/3rd+ child + 24,840 CZK spouse credit (child <3). From 2026, spouse not caring for child <7 owes OBZP (3,024 CZK/mo).',
          ua: 'Paušální daň: 0 € пільг. 60% Výdaje: 15 204 / 22 320 / 27 840 CZK/рік за 1/2/3+ дитину + 24 840 CZK за подружжя (дитина <3 р.). З 2026 р. подружжя без дитини <7 р. сплачує OBZP (3 024 CZK/міс.).'
        },
        sk: {
          rating: 'good',
          sl: 'Daňový bonus 1.200 €/leto na otroka (<15; omejen z % ČZD, postopni iztek nad 27.432 € ČZD) + NČZD za zakonca do 5.455,30 € (ob skrbi za mlajšega otroka). Zakonec brez otrok: 121,92 €/mes. ZP.',
          en: '1,200 €/yr Daňový bonus per child (<15; ČZD-% capped, phases out above 27,432 € ČZD) + up to 5,455.30 € spouse NČZD (with young child care). Childless uninsured spouse owes 121.92 €/mo health.',
          ua: '1 200 €/рік Daňový bonus на дитину (<15; ліміт % ČZD, спадає після 27 432 € ČZD) + до 5 455,30 € NČZD на подружжя (при догляді малої дитини). Бездітне подружжя сплачує 121,92 €/міс. ZP.'
        },
        es: {
          rating: 'good',
          sl: 'Brezplačno javno zdravstvo SNS za zakonca in otroke (0 €) + skupna napoved z nezaposlenim zakoncem (−3.400 € osnove IRPF) + mínimo por descendientes (2.400–4.500 € na otroka = ~456–855 € manj davka).',
          en: 'Free universal SNS healthcare for spouse & kids (0 €) + 3,400 € joint-filing IRPF base reduction for non-working spouse + mínimo por descendientes (2,400–4,500 €/child = ~456–855 € tax cut).',
          ua: 'Безкоштовна медицина SNS для подружжя й дітей (0 €) + 3 400 € зменшення бази IRPF за непрацююче подружжя + mínimo por descendientes (2 400–4 500 €/дитину = ~456–855 € економії).'
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
          'Familienbonus Plus (2.000,16 €/otroka) in AVAB (612–1.101+ €) močno znižata dohodnino družinam',
          'Avtomatski 15 % Grundfreibetrag (do 4.950 €) in 0 % dohodnine do 13.539 € davčne osnove',
          'Basispauschalierung sega vse do 420.000 € letnih prihodkov brez dvostavnega knjigovodstva',
          'Vrhunsko zdravstveno in pokojninsko zavarovanje SVS (prispevki v celoti znižujejo davčno osnovo)'
        ],
        en: [
          'Direct family tax credits: 2,000.16 €/yr per child (Familienbonus Plus) + 612–1,101+ €/yr sole-earner AVAB',
          '0% income tax up to 13,539 € taxable base plus automatic 15% Grundfreibetrag (up to 4,950 €)',
          'Basispauschalierung scales up to 420,000 € revenue without double-entry bookkeeping',
          'High-quality SVS healthcare, pension & severance fund (100% tax-deductible)'
        ],
        ua: [
          'Прямі сімейні податкові кредити: 2 000,16 €/рік на дитину (Familienbonus Plus) + 612–1 101+ €/рік AVAB',
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
          'Podvojena družinska olajšava 2026 v Átalányadó (~600 / 2.400 / 5.940 € za 1/2/3 otroke) zniža SZJA in TBJ',
          'Reformirani Átalányadó 2026: 45 % stroškov za storitve, neobdavčen pas do polovice letne min. plače in ukinjen 112,5 % SZOCHO faktor',
          'Popoldanski Átalányadó nima minimalnih prispevkov in je do ~8.800 € prometa skoraj povsem neobdavčen',
          'Za B2C stranke je KATA (50.000 HUF ≈ 125 €/mes.) med najcenejšimi pavšali v EU'
        ],
        en: [
          'Doubled 2026 family credit in Átalányadó (~600 / 2,400 / 5,940 €/yr for 1/2/3 kids) offsets both SZJA & TBJ',
          '2026 Átalányadó upgrades: 45% service expenses, tax-free half-min-wage profit band, and 112.5% SZOCHO surcharge repealed',
          'Side-job Átalányadó has zero minimum social floor and 0% tax/social inside the exempt profit band',
          'For pure B2C clients, KATA (50,000 HUF ≈ 125 €/mo) is almost unbeatable up to ~45,000 €'
        ],
        ua: [
          'Подвоєна сімейна знижка 2026 в Átalányadó (~600 / 2 400 / 5 940 €/рік за 1/2/3 дітей) зменшує SZJA і TBJ',
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
    },

    pl: {
      authorityName: 'KAS / Podatki.gov.pl / ZUS',
      authorityUrl: 'https://www.podatki.gov.pl/',
      bestFor: {
        sl: 'IT inženirje in B2B izvoznike storitev z visokimi prihodki (Ryczałt 12 % oz. 8,5 % vse do 2.000.000 €!) ter družine na Skali z zakoncem brez dohodkov.',
        en: 'High-earning IT engineers & B2B service exporters (12% or 8.5% Ryczałt all the way to 2,000,000 €!) or single-earner families using joint Skala filing.',
        ua: 'IT-інженерів та B2B-експортерів послуг із високим доходом (12% або 8,5% Ryczałt аж до 2 000 000 €!) або сімей на спільній декларації Skala.'
      },
      pros: {
        sl: [
          'Izjemen limit 2.000.000 €/leto za Ryczałt (12 % za IT/programiranje, samo 8,5 % za splošne storitve) brez vodenja stroškov',
          '30-mesečni začetniški popust ZUS: 6 mesecev Ulga na start (0 PLN socialnih prispevkov) + 24 mesecev Preferencyjny ZUS (~98 €/mes.)',
          'Brezplačno zdravstveno sozavarovanje NFZ (ZCNA) za nezaposlenega zakonca in otroke (0 € dodatnega stroška)',
          'Pri Skali (12 %/32 %) skupna davčna napoved z zakoncem podvoji 30.000 PLN neobdavčenega pasu in prag 120.000 PLN'
        ],
        en: [
          'Massive 2,000,000 €/yr ceiling on Ryczałt (12% IT/software, just 8.5% general services) with zero expense-receipt tracking',
          '30-month startup ZUS runway: 6 mo Ulga na start (0 PLN social ZUS) + 24 mo Preferencyjny ZUS (420.86 PLN ≈ 98 €/mo)',
          'Free NFZ public healthcare co-insurance (ZCNA) for non-working spouse and children (0 € extra cost)',
          'Under Skala (12%/32%), joint spouse filing doubles the 30,000 PLN tax-free allowance and 120,000 PLN bracket'
        ],
        ua: [
          'Величезний ліміт 2 000 000 €/рік на Ryczałt (12% для IT/ПЗ, лише 8,5% для загальних послуг) без обліку витрат',
          '30 місяців пільгового ZUS на старті: 6 міс. Ulga na start (0 PLN соцвнесків) + 24 міс. Preferencyjny ZUS (~98 €/міс.)',
          'Безкоштовне медстрахування NFZ (ZCNA) для непрацюючого подружжя та дітей (0 € додаткових витрат)',
          'На Skala (12%/32%) спільна декларація з подружжям подвоює неоподатковувані 30 000 PLN та поріг 120 000 PLN'
        ]
      },
      cons: {
        sl: [
          'Pri Ryczałtu ni mogoče uveljavljati dejanskih poslovnih stroškov niti družinskih davčnih olajšav za otroke ali zakonca',
          'Po 30 mesecih polni Duży ZUS + 3-stopenjski zdravstveni prispevek NFZ (~660–895 €/mes. fiksnih prispevkov)',
          'Valutno tveganje EUR/PLN, zmeren domači prag za DDV (240.000 PLN ≈ 56,1k €) in uvedba obveznih e-računov KSeF v 2026'
        ],
        en: [
          'Ryczałt allows zero business-cost deductions (other than ZUS + 50% health) and zero child/spouse tax credits',
          'After 30 months, full Duży ZUS + 3-tier NFZ health reaches ~660–895 €/mo in fixed contributions',
          'EUR/PLN FX risk, 240,000 PLN (≈ 56.1k €) domestic VAT threshold, and mandatory KSeF structured e-invoicing rollout'
        ],
        ua: [
          'На Ryczałt не вираховуються бізнес-витрати (крім ZUS + 50% медицини) і не діють податкові пільги на дітей/подружжя',
          'Після 30 місяців повний Duży ZUS + 3-рівневий внесок NFZ сягають ~660–895 €/міс. фіксованих платежів',
          'Валютний ризик EUR/PLN, поріг ПДВ 240 000 PLN (≈ 56,1к €) та обов’язкова система е-фактур KSeF у 2026 р.'
        ]
      }
    },

    cz: {
      authorityName: 'Finanční správa ČR / ČSSZ / VZP',
      authorityUrl: 'https://financnisprava.gov.cz/',
      bestFor: {
        sl: 'B2B in B2C svobodnjake do ~79,4k € (2M CZK), ki želijo najpreprostejši pavšal v EU (Paušální daň), ter družine z otroki na 60 % pavšalnih odhodkih.',
        en: 'Freelancers up to ~79.4k € (2M CZK) seeking Europe’s simplest single-payment regime (Paušální daň), or families using 60% flat expenses + child credits.',
        ua: 'Фрілансерів до ~79,4к € (2 млн CZK), які шукають найпростіший режим у ЄС (Paušální daň), або сімей з дітьми на 60% витрат.'
      },
      pros: {
        sl: [
          'Paušální daň (Pas 1 do 1,5M CZK ≈ 59,5k €): 1 samo nakazilo 9.162 CZK/mes. (~364 €/mes. za VSE!) in nič letnih davčnih obračunov',
          'Klasični OSVČ prizna 60 % pavšalnih odhodkov (80 % obrt) do osnove 2M CZK + splošno davčno olajšavo 30.840 CZK/leto (~1.224 €)',
          'Visok domači prag za oprostitev DDV (DPH): 2.000.000 CZK (≈ 79.365 €) — združljiv s čezmejnim EU B2B statusom Identifikovaná osoba',
          'Močni otroški davčni odbitki na 60 % odhodkih (~603 / 886 / 1.105 € na otroka) in popoldanski OSVČ brez minimalnega zdravstvenega praga'
        ],
        en: [
          'Paušální daň Band 1 (up to 1.5M CZK ≈ 59.5k €): 1 single monthly transfer of 9,162 CZK (~364 €/mo ALL-IN!) and zero annual tax filings',
          'Standard OSVČ grants 60% flat expenses (80% crafts) up to 2M CZK base + 30,840 CZK/yr (~1,224 €) basic taxpayer credit',
          'Generous 2,000,000 CZK (≈ 79,365 €) domestic DPH exemption — compatible with EU B2B reverse-charge (Identifikovaná osoba)',
          'Strong child tax credits on 60% výdaje (~603 / 886 / 1,105 € per child) & side-job OSVČ has no minimum VZP health floor'
        ],
        ua: [
          'Paušální daň Рівень 1 (до 1,5 млн CZK ≈ 59,5к €): 1 платіж 9 162 CZK/міс. (~364 €/міс. ЗА ВСЕ!) і жодних річних декларацій',
          'Стандартний OSVČ дає 60% паушальних витрат (80% ремесла) з бази до 2 млн CZK + базову знижку 30 840 CZK/рік (~1 224 €)',
          'Високий поріг без ПДВ (DPH): 2 000 000 CZK (≈ 79 365 €) — сумісний з EU B2B reverse-charge (Identifikovaná osoba)',
          'Високі дитячі кредити на 60% výdaje (~603 / 886 / 1 105 € на дитину) та відсутність мін. бази VZP для сумісників'
        ]
      },
      cons: {
        sl: [
          'Paušální daň ni dovoljena ob hkratni zaposlitvi (popoldanski OSVČ), ob prostovoljni/obvezni vključitvi v domači DPH in ne prizna otroških olajšav',
          'Strog pregon prikritega delovnega razmerja ("Švarcsystém") pri delu izključno za enega naročnika pod njegovim vodstvom',
          'Od 1. 1. 2026 mora nezaposlen zakonec, ki ne skrbi za otroka <7 let, sam plačevati zdravstveno zavarovanje OBZP (3.024 CZK ≈ 120 €/mes.)'
        ],
        en: [
          'Paušální daň bars side-job employees and full domestic DPH payers, and forfeits all child & spouse tax credits',
          'Strict SÚIP enforcement against "Švarcsystém" (disguised single-client employment) with heavy statutory fines',
          'From Jan 1, 2026, a non-working spouse not caring for a child <7 yrs owes mandatory OBZP health insurance (3,024 CZK ≈ 120 €/mo)'
        ],
        ua: [
          'Paušální daň недоступна для найманих працівників (сумісників) і платників DPH та скасовує всі сімейні податкові знижки',
          'Суворий контроль SÚIP проти «Švarcsystém» (прихованого працевлаштування на 1 клієнта) з великими штрафами',
          'З 1.01.2026 непрацююче подружжя, що не доглядає дитину <7 років, сплачує медвнесок OBZP (3 024 CZK ≈ 120 €/міс.)'
        ]
      }
    },

    sk: {
      authorityName: 'Finančná správa SR / Sociálna poisťovňa',
      authorityUrl: 'https://www.financnasprava.sk/',
      bestFor: {
        sl: 'Začetnike v 1. letu poslovanja (oprostitev socialnih prispevkov!) in podjetnike v evroobmočju z zmernimi prihodki do ~45.000 €.',
        en: '1st-year startups (0 € Social Insurance holiday!) and Eurozone freelancers with moderate turnover up to ~45,000 €/yr.',
        ua: 'Новачків у 1-й рік діяльності (канікули зі соцвнесків 0 €!) та фрілансерів у єврозоні з доходом до ~45 000 €/рік.'
      },
      pros: {
        sl: [
          'Evro (EUR) brez valutnega tveganja + 1. leto popolna oprostitev socialnih prispevkov Sociálna poisťovňa (plačate le 121,92 €/mes. zdravstva!)',
          'Znižana 15 % stopnja dohodnine za vse SZČO do 100.000 € letnih prihodkov + 5.966,73 € splošne davčne olajšave (NČZD)',
          '60 % pavšalnih odhodkov (do 20.000 €/leto) brez zbiranja računov + 1.200 €/leto otroškega davčnega bonusa (<15 let)'
        ],
        en: [
          'Native EUR currency + Year-1 Social Insurance holiday (0 € Sociálna poisťovňa in Year 1 — only 121.92 €/mo health paid!)',
          'Reduced 15% income tax rate for SZČO all the way up to 100,000 € turnover + 5,966.73 € basic tax-free allowance (NČZD)',
          '60% flat expenses (up to 20,000 €/yr) without receipt tracking + 1,200 €/yr child tax bonus (<15 yrs) & up to 5,455 € spouse NČZD'
        ],
        ua: [
          'Євро (EUR) без валютного ризику + звільнення від соцвнесків Sociálna poisťovňa у 1-й рік (лише 121,92 €/міс. медицини!)',
          'Знижена ставка 15% прибуткового податку SZČO аж до 100 000 € обороту + 5 966,73 € базової пільги (NČZD)',
          '60% паушальних витрат (до 20 000 €/рік) без чеків + 1 200 €/рік дитячого бонусу (<15 р.) та до 5 455 € NČZD на подружжя'
        ]
      },
      cons: {
        sl: [
          'Strop pavšalnih odhodkov pri 20.000 €/leto (dosežen že pri 33.333 € prihodkov) nad to mejo hitro dviguje davčno in prispevno osnovo',
          'Konsolidacijski dvig 2026: minimalni prispevki za uveljavljen polni SZČO so zrasli na 425,03 €/mes. (303,11 € soc. + 16 % zdravstvo 121,92 €)',
          'Nizek domači prag za 23 % DDV (50.000 €), poostren nadzor nad "závislá práca" in postopni iztek otroškega bonusa nad ~27,4k € ČZD'
        ],
        en: [
          '20,000 €/yr flat-expense cap (hit at just 33,333 € revenue) makes both tax and social bases climb steeply above 40k €',
          '2026 consolidation hike raised established full-time minimum contributions to 425.03 €/mo (303.11 € social + 16% health 121.92 €)',
          '50,000 € threshold for 23% DPH (VAT), stricter 2026 "závislá práca" audits, and child-bonus phase-out above 27,432 € ČZD'
        ],
        ua: [
          'Ліміт паушальних витрат 20 000 €/рік (досягається вже на 33 333 € доходу), вище якого стрімко зростають податок і соцвнески',
          'Консолідаційне підвищення 2026: мінімальні внески зросли до 425,03 €/міс. (303,11 € соц. + 16% медицина 121,92 €)',
          'Поріг 50 000 € для 23% DPH (ПДВ), жорсткіші перевірки «závislá práca» та поступове зменшення дитячого бонусу вище 27 432 € ČZD'
        ]
      }
    },

    es: {
      authorityName: 'Agencia Tributaria (AEAT) / Seguridad Social',
      authorityUrl: 'https://sede.agenciatributaria.gob.es/',
      bestFor: {
        sl: 'Začetnike v 1. letu s Tarifo Plano (80 €/mes. oz. 0 € Cuota Cero) ali podjetnike z visokimi dejanskimi poslovnimi stroški v evroobmočju.',
        en: '1st-year newcomers on Tarifa Plana (80 €/mo or 0 € Cuota Cero) or Eurozone entrepreneurs with substantial documented business costs.',
        ua: 'Новачків у 1-й рік на Tarifa Plana (80 €/міс. або 0 € Cuota Cero) або підприємців у єврозоні зі значними документальними витратами.'
      },
      pros: {
        sl: [
          'Ugoden vstop: Tarifa Plana samo 80 €/mes. v 1. letu (oz. 0 €/mes. Cuota Cero v Madridu, Andaluziji in nekaterih regijah)',
          'Brezplačno javno zdravstvo SNS za vso družino (0 € za zakonca in otroke) + močna socialna in pokojninska mreža RETA',
          'Družinske ugodnosti IRPF: −3.400 € znižanje osnove pri skupni napovedi z nezaposlenim zakoncem + 2.400–4.500 € mínimo na otroka'
        ],
        en: [
          'Low-cost Year-1 entry: 80 €/mo Tarifa Plana (or 0 €/mo regional Cuota Cero in Madrid, Andalucía & select regions)',
          'Universal SNS healthcare covers resident spouse & children at 0 € extra cost, paired with full RETA social protection',
          'Built-in IRPF family relief: 3,400 € joint-filing base deduction for a non-working spouse + 2,400–4,500 €/child tax-free minimums'
        ],
        ua: [
          'Дешевий старт у 1-й рік: Tarifa Plana 80 €/міс. (або 0 €/міс. Cuota Cero у Мадриді, Андалусії та низці регіонів)',
          'Універсальна медицина SNS безкоштовно покриває непрацююче подружжя та дітей (0 € витрат) + повний соцзахист RETA',
          'Сімейні пільги IRPF: −3 400 € бази при спільній декларації з непрацюючим подружжям + 2 400–4 500 € мінімуму на дитину'
        ]
      },
      cons: {
        sl: [
          'Španija NIMA pavšalnih odhodkov za storitve/IT (le 5 % gastos de difícil justificación, navzgor omejenih na zgolj 2.000 €/leto!)',
          'Strma progresivna dohodnina IRPF (19 %–47 %) + prispevki RETA po dejanskem dobičku (do 607+ €/mes.) pomenijo visoko obremenitev nad 50k €',
          '0 € praga za oprostitev DDV (21 % IVA od prvega evra za domače stranke) ter obvezni četrtletni obračuni Modelo 303 in Modelo 130'
        ],
        en: [
          'NO generous flat-expense regime for IT/consulting — automatic difícil justificación deduction is just 5% capped at 2,000 €/yr!',
          'Steep progressive IRPF (19%–47%) + 15-bracket RETA contributions (up to 607+ €/mo min) create heavy burden above 50,000 €',
          '0 € domestic VAT exemption threshold (21% IVA from euro 1 on domestic B2C) and 8+ mandatory quarterly Modelo 303/130 filings/yr'
        ],
        ua: [
          'НЕМАЄ високих нормативних витрат для IT/послуг — автоматичне відрахування difícil justificación становить лише 5% (макс. 2 000 €/рік!)',
          'Крута шкала IRPF (19%–47%) + 15 рівнів RETA за реальним доходом (до 607+ €/міс.) створюють високе навантаження понад 50 000 €',
          '0 € порогу без ПДВ (21% IVA з першого євро для внутрішніх B2C-клієнтів) та обов’язкові квартальні звіти Modelo 303 і 130'
        ]
      }
    }
  }
};
