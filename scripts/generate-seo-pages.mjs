/**
 * Zero-dependency Static SEO Entry Page, Sitemap & Robots Generator
 * Generates:
 *   - /index.html (Global NettoEU 9-Country Suite)
 *   - /slovenia/index.html, /croatia/index.html, /italy/index.html, /austria/index.html,
 *     /hungary/index.html, /poland/index.html, /czechia/index.html, /slovakia/index.html,
 *     /spain/index.html, /compare/index.html
 *   - /sitemap.xml & /robots.txt
 *
 * Zero build step required at runtime: every page loads Vanilla ES Modules (./js/app.js or ../js/app.js)
 * with tailored <title>, <meta name="description">, <link rel="canonical">, Open Graph / Twitter Card,
 * Schema.org JSON-LD (@graph: WebApplication + FAQPage + BreadcrumbList), WAI-ARIA tablist,
 * and pre-rendered semantic statutory HTML inside <main id="view-mount">.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_URL = 'https://ankhezar.github.io/si.tax.calculator';
const LAST_MOD = '2026-10-29';

const NAV_TABS = [
  { code: 'si', slug: 'slovenia', label: 'Slovenia', isCountry: true },
  { code: 'hr', slug: 'croatia', label: 'Croatia', isCountry: true },
  { code: 'it', slug: 'italy', label: 'Italy', isCountry: true },
  { code: 'at', slug: 'austria', label: 'Austria', isCountry: true },
  { code: 'hu', slug: 'hungary', label: 'Hungary', isCountry: true },
  { code: 'pl', slug: 'poland', label: 'Poland', isCountry: true },
  { code: 'cz', slug: 'czechia', label: 'Czechia', isCountry: true },
  { code: 'sk', slug: 'slovakia', label: 'Slovakia', isCountry: true },
  { code: 'es', slug: 'spain', label: 'Spain', isCountry: true },
  { code: 'compare', slug: 'compare', label: 'Compare All', isCountry: false }
];

const PAGES = [
  {
    slug: '',
    defaultTab: null,
    activeNavCode: 'si',
    title: 'NettoEU — European Sole-Proprietor & Freelance Tax Calculator 2026 (9 Countries)',
    description:
      'Free 2026 European freelance & sole-proprietor net take-home tax calculator across 9 EU countries: Slovenia (Normiranec S.P. ZPZR vs. ZIURS), Croatia, Italy, Austria, Hungary, Poland, Czechia, Slovakia, and Spain.',
    heading: 'NettoEU 2026 — 9-Country European Sole-Proprietor & Freelance Tax Suite',
    summary:
      'Compare exact 2026 net take-home income, income tax, mandatory social & health contributions, VAT thresholds, and family tax credits across 9 European Union sole-proprietor regimes in real time.',
    bullets: [
      'Slovenia (Normiranec S.P.): Side-by-side 2026 Current Law (ZPZR 120k € / 50k € cap) vs. Proposed ZIURS (150k € / 70k € cap) and 5-year PIZ social discount trajectory.',
      'Croatia (Paušalni obrt): 60,000 € lump-sum & VAT ceiling, 7 fixed tax brackets (~1.8% effective tax), and 290.98 €/mo social contributions.',
      'Italy (Regime Forfettario): 85,000 € ceiling, 5% startup / 15% standard substitute tax, ATECO coefficients (67% IT / 78% professional), and INPS Gestione Separata or Artigiani -35%.',
      'Austria (Einzelunternehmen): 55,000 € Kleinunternehmerpauschalierung (20%/45%) & Basispauschalierung (6%/15%), 15% GFB, SVS 26.83%, and Familienbonus Plus.',
      'Hungary (Átalányadó & KATA): 2026 upgraded 45%/80%/90% flat expenses, equalized 1.0× TBJ/SZOCHO base, doubled family credits, and 18M HUF B2C-only KATA.',
      'Poland (JDG B2B): Ryczałt (12% IT / 8.5% services / 14% / 15%), Skala (12%/32% with joint spouse split), Liniowy (19%), 3-stage ZUS, and 240,000 PLN VAT exemption.',
      'Czechia (OSVČ): 3-band Paušální daň (Band 1: 9,984 Kč/mo up to 2M Kč) vs. 60%/80%/40% Výdajový paušál with refundable child credits.',
      'Slovakia (SZČO): 60% lump-sum expenses (max 20,000 €/yr), 15% reduced tax up to 100,000 €, 16% ZP health + 33.15% SP social pillars, and Year-1 social holiday.',
      'Spain (Autónomo): Estimación Directa Simplificada, 2026 15-tramo RETA table (~205–598 €/mo) or 80 €/mo Tarifa Plana, progressive IRPF (19–47%), and family minimums.'
    ],
    faqs: [
      {
        q: 'Which EU countries are included in the NettoEU 2026 freelance tax calculator?',
        a: 'NettoEU models 9 European Union sole-proprietor regimes for 2026: Slovenia (Normiranec S.P. ZPZR & ZIURS), Croatia (Paušalni obrt), Italy (Partita IVA Regime Forfettario), Austria (Einzelunternehmen Kleinunternehmer- & Basispauschalierung), Hungary (Egyéni vállalkozó Átalányadó & KATA), Poland (JDG Ryczałt, Skala, Liniowy), Czechia (OSVČ Paušální daň & Výdajový paušál), Slovakia (SZČO Paušálne výdavky 60%), and Spain (Autónomo Estimación Directa Simplificada).'
      },
      {
        q: 'How does Slovenia Normiranec 2026 (ZPZR) compare to the proposed ZIURS reform?',
        a: 'Under Slovenia’s enacted ZPZR 2026 law, full-time Normiranec S.P.s have a 120,000 €/yr cap with 80% recognized expenses up to 60,000 € (max 48,000 € deduction) and a 20%/35% tax schedule. The contested ZIURS proposal (subject to the Dec 6, 2026 referendum) raises the cap to 150,000 €/yr (full-time, 80% expenses up to 85,000 €) and 70,000 €/yr (afternoon s.p., 80% up to 35,000 €).'
      },
      {
        q: 'Does household status (children and non-working spouse) affect freelance taxes in Europe?',
        a: 'Yes, depending on the regime. Progressive and allowance-based regimes (Austria ESt, Hungary Átalányadó, Poland Skala, Czechia Výdajový paušál, Slovakia SZČO, and Spain Autónomo IRPF) grant substantial child and spouse tax reductions, whereas pure flat-tax regimes (Slovenia Normiranec, Croatia Paušalni obrt, Italy Forfettario, Poland Ryczałt, Czechia Paušální daň) disallow personal tax credits and several countries levy mandatory health surcharges for an uninsured dependent spouse.'
      },
      {
        q: 'Can I register a sole proprietorship in another EU country without moving there?',
        a: 'No. Under OECD Model Tax Conventions (Article 4 center of vital interests and 183-day physical presence rules), sole proprietors are taxed on worldwide income where they physically reside. Foreign sole-proprietor regimes apply legally only with genuine physical relocation and tax residency transfer.'
      }
    ]
  },
  {
    slug: 'slovenia',
    defaultTab: 'si',
    activeNavCode: 'si',
    title: 'Slovenia Normiranec S.P. Tax Calculator 2026 (ZPZR vs. ZIURS) — NettoEU',
    description:
      'Exact 2026 Slovenia Normiranec S.P. tax & social contributions calculator: compare Current Law (ZPZR 120k €/50k € cap) vs. Proposed ZIURS (150k €/70k €), full-time vs. popoldanski s.p., and Year 1–2 PIZ discounts.',
    heading: 'Slovenia — Normiranec S.P. Tax Calculator 2026 (ZPZR vs. ZIURS)',
    summary:
      'Calculate 2026 Slovenian sole-proprietor (Samostojni podjetnik — Normiranec) net take-home pay, Dohodnina (20% / 35%), ZPIZ-2 pension & ZZZS health contributions (40.20% incl. 2% DO + 37.17 €/mo OZP), and 5-year net trajectory.',
    bullets: [
      'Current Law (ZPZR + ZPZR-A 2026): 120,000 €/yr cap for full-time Polni s.p. (80% flat expenses up to 60,000 € = max 48,000 € deduction); 50,000 €/yr cap for Popoldanski s.p. (max 17,000 € deduction).',
      'Proposed ZIURS (Dec 6, 2026 Referendum): 150,000 €/yr cap for Polni s.p. (80% up to 85,000 € = max 68,000 €; eased ≥5-month insurance rule) and 70,000 €/yr for Popoldanski s.p. (80% up to 35,000 €).',
      '2026 Social Security: 40.20% total rate (38.20% standard + 2.00% Dolgotrajna oskrba) on 60%–350% of average gross salary (2,536.03 €), plus 37.17 €/mo mandatory OZP health contribution; -50% Year-1 and -30% Year-2 PIZ startup relief.'
    ],
    faqs: [
      {
        q: 'What is the revenue limit for a Normiranec S.P. in Slovenia in 2026?',
        a: 'Under currently enacted ZPZR 2026 law, the annual exit threshold is 120,000 € for a full-time s.p. (with at least 9 continuous months of full-time insurance) and 50,000 € for an afternoon (popoldanski) s.p. Under the contested ZIURS proposal, limits would rise to 150,000 € and 70,000 € respectively.'
      },
      {
        q: 'How much are minimum monthly s.p. social contributions in Slovenia in 2026?',
        a: 'At the 2026 reference average gross wage of 2,536.03 €, the minimum 60% insurance base is 1,521.62 €/mo. Standard steady-state contributions (40.20% including 2% long-term care plus 37.17 € OZP) total approximately 648.86 €/mo, while first-year entrepreneurs (-50% PIZ discount) pay approximately 463.61 €/mo.'
      },
      {
        q: 'What is Slovenia’s domestic VAT (DDV) registration threshold in 2026?',
        a: 'Slovenia’s domestic small-business VAT exemption threshold is 60,000 € of taxable domestic turnover (standard DDV rate 22%). Cross-border EU B2B services require an atypical VAT ID for reverse-charge VIES reporting from day one.'
      }
    ]
  },
  {
    slug: 'croatia',
    defaultTab: 'hr',
    activeNavCode: 'hr',
    title: 'Croatia Paušalni Obrt Tax Calculator 2026 (60,000 € Cap) — NettoEU',
    description:
      '2026 Croatia Paušalni obrt calculator: 7 fixed lump-sum revenue brackets up to 60,000 €/yr (~1.8% effective tax), 290.98 €/mo MIO & HZZO contributions, HOK exemption, and side-job rules.',
    heading: 'Croatia — Paušalni Obrt Lump-Sum Tax Calculator 2026',
    summary:
      'Compute 2026 Croatian sole-proprietor (Paušalni obrt) net income across all 7 Porezna uprava brackets up to 60,000 €/yr, including MIO I & II pension, HZZO health insurance, and HOK chamber dues.',
    bullets: [
      'Ceiling & VAT: Synchronized 60,000 €/yr ceiling for both Paušalni obrt and domestic 25% PDV (VAT) exemption.',
      '7 Fixed Tax Brackets: 85% notional expense deduction and 12% flat tax rate (~1.8% effective income tax at the top of each bracket; max 1,080 €/yr at 60,000 €).',
      '2026 Contributions: Full-time fixed monthly base of 797.20 € (0.4 × 1,993 € average gross wage) × 36.5% = 290.98 €/mo (3,491.76 €/yr) plus 11.40 €/mo HOK fee (exempt in Years 1–2).'
    ],
    faqs: [
      {
        q: 'What is the maximum annual revenue for Croatia’s Paušalni obrt in 2026?',
        a: 'The maximum annual turnover for Paušalni obrt in 2026 is 60,000 €, aligned with Croatia’s 60,000 € domestic VAT (PDV) registration threshold.'
      },
      {
        q: 'How much are monthly contributions for a full-time Paušalni obrt in 2026?',
        a: 'Full-time Paušalni obrt owners pay 290.98 €/mo (3,491.76 €/yr) in mandatory social contributions (15% MIO I, 5% MIO II, and 16.5% HZZO health insurance on the 797.20 € base), plus 11.40 €/mo HOK chamber fee after the 2-year startup exemption.'
      },
      {
        q: 'How are side-job (uz radni odnos) Paušalni obrt contributions calculated?',
        a: 'Entrepreneurs employed full-time elsewhere pay annual contributions equal to 17.5% (10% pension + 7.5% health) solely on their bracket’s 15% lump-sum tax base (at most 1,575 €/yr in the highest 50k–60k € bracket).'
      }
    ]
  },
  {
    slug: 'italy',
    defaultTab: 'it',
    activeNavCode: 'it',
    title: 'Italy Regime Forfettario Calculator 2026 (Partita IVA 5% / 15%) — NettoEU',
    description:
      '2026 Italy Partita IVA Regime Forfettario net income calculator: 85,000 € cap, 5% startup & 15% standard substitute tax, ATECO coefficients (67% / 78% / 40%), and INPS Gestione Separata or Artigiani -35%.',
    heading: 'Italy — Partita IVA Regime Forfettario Calculator 2026',
    summary:
      'Calculate 2026 Italian Regime Forfettario net take-home pay with exact ATECO profitability coefficients, INPS deductibility before Imposta sostitutiva (5% or 15%), and 85k €/100k € cap alerts.',
    bullets: [
      'Revenue Thresholds: 85,000 €/yr ceiling (0% domestic IVA, exempt from IRPEF & IRAP); exceeding 100,000 € triggers immediate mid-year exit and 22% IVA.',
      'ATECO Profitability Coefficients: 67% IT/software & artisans (33% flat expenses), 78% freelancers/consultants (22% expenses), 40% commerce/e-commerce (60% expenses).',
      'Tax & INPS: 5% startup substitute tax (first 5 years) or 15% standard rate applied AFTER deducting mandatory INPS (Gestione Separata 26.07%, or Artigiani 24% / Commercianti 24.48% with optional -35% Forfettario discount).'
    ],
    faqs: [
      {
        q: 'Who qualifies for the 5% startup tax rate in Italy’s Regime Forfettario in 2026?',
        a: 'New Partita IVA holders pay a 5% substitute tax (instead of 15%) for their first 5 tax years if they did not run a business/artistic/professional activity in the prior 3 years and the new activity is not a mere continuation of a former employment role.'
      },
      {
        q: 'What happens if an Italian Forfettario freelancer exceeds 85,000 € or 100,000 €?',
        a: 'Earning between 85,000.01 € and 100,000 € transitions the taxpayer to ordinary IRPEF and 22% IVA starting January 1 of the following year. Exceeding 100,000 € triggers immediate mid-year exit and retroactive IVA obligations from the breaching invoice.'
      },
      {
        q: 'Are INPS pension contributions deductible under Regime Forfettario?',
        a: 'Yes. Mandatory INPS social contributions are the single deduction permitted on top of the ATECO flat-expense coefficient, directly reducing the taxable base before the 5% or 15% substitute tax is calculated.'
      }
    ]
  },
  {
    slug: 'austria',
    defaultTab: 'at',
    activeNavCode: 'at',
    title: 'Austria Einzelunternehmen Tax Calculator 2026 (SVS & Pauschalierung) — NettoEU',
    description:
      '2026 Austria self-employed (Einzelunternehmen / Neue Selbständige) calculator: 55,000 € Kleinunternehmerpauschalierung, Basispauschalierung, 15% GFB, SVS 26.83%, progressive ESt 2026, and Familienbonus Plus.',
    heading: 'Austria — Einzelunternehmen (Pauschalierung & SVS) Calculator 2026',
    summary:
      'Model 2026 Austrian sole-proprietor net income under Kleinunternehmerpauschalierung (≤55,000 €) and Basispauschalierung (≤320,000 €), including SVS social insurance, 15% Grundfreibetrag, and inflation-indexed ESt brackets.',
    bullets: [
      'Flat-Expense Schemes: Kleinunternehmerpauschalierung up to 55,000 €/yr (0% USt + 20% flat expenses for services / 45% for goods); Basispauschalierung up to 320,000 €/yr (6% services / 15% goods).',
      'SVS Social Insurance (2026): 18.50% pension (PV) + 6.80% health (KV) + 1.53% self-employed provision (SV) = 26.83% up to 97,020 €/yr cap, plus 12.95 €/mo accident insurance (UV).',
      '2026 Income Tax & Family Credits: 15% Grundfreibetrag (up to 4,950 €), 0% ESt up to 13,539 €, progressive 20%–55% brackets, plus Familienbonus Plus (2,000 €/yr per child) and AVAB single-earner credit.'
    ],
    faqs: [
      {
        q: 'What is Austria’s Kleinunternehmer VAT and flat-expense limit in 2026?',
        a: 'Austria’s harmonized Kleinunternehmer limit is 55,000 € of annual gross turnover (0% VAT / USt), allowing service freelancers to claim 20% flat expenses (up to 11,000 €) and goods traders 45% (up to 24,750 €) without itemized receipts.'
      },
      {
        q: 'How is the 15% Grundfreibetrag (GFB) calculated for Austrian freelancers?',
        a: 'Every Austrian sole proprietor automatically receives a tax-free Grundfreibetrag equal to 15% of profit (after expenses and SVS contributions) on up to 33,000 € of profit—a maximum tax-free deduction of 4,950 €/yr without requiring investment.'
      },
      {
        q: 'How much does Familienbonus Plus reduce Austrian income tax in 2026?',
        a: 'Familienbonus Plus directly reduces calculated income tax (ESt) by up to 2,000 €/yr per dependent child under 18, combined with the Alleinverdienerabsetzbetrag (AVAB) when supporting a low-income spouse and at least one child.'
      }
    ]
  },
  {
    slug: 'hungary',
    defaultTab: 'hu',
    activeNavCode: 'hu',
    title: 'Hungary Átalányadó & KATA Tax Calculator 2026 (Egyéni Vállalkozó) — NettoEU',
    description:
      '2026 Hungary Egyéni vállalkozó calculator: upgraded 45%/80%/90% Átalányadó flat expenses, equalized 1.0× TBJ/SZOCHO base, 20M HUF VAT exemption, doubled family credits, and B2C-only KATA (50,000 HUF/mo).',
    heading: 'Hungary — Egyéni Vállalkozó (Átalányadó & KATA) Calculator 2026',
    summary:
      'Calculate 2026 Hungarian sole-proprietor taxes in EUR and HUF across Átalányadó (45% / 80% / 90% cost tiers) and KATA (50,000 HUF/mo B2C-only), including SZJA, TBJ, SZOCHO, simplified HIPA, and family tax/TBJ credits.',
    bullets: [
      '2026 Átalányadó Reforms: General service flat-expense ratio raised from 40% to 45% (80% crafts / 90% retail) up to 38,736,000 HUF/yr (~96,840 €), with 1,936,800 HUF tax-free SZJA exempt profit.',
      'Equalized Social Base: 13% SZOCHO minimum floor reduced from 112.5% to 100% of the statutory minimum/guaranteed wage (322,800 HUF / 373,200 HUF), matching the 18.5% TBJ base.',
      'VAT & KATA: Domestic ÁFA (27% VAT) exemption raised to 20,000,000 HUF/yr (~50,000 €). KATA (50,000 HUF/mo up to 18M HUF) remains strictly limited to private B2C consumers.'
    ],
    faqs: [
      {
        q: 'Can Hungarian freelancers invoice B2B companies under KATA in 2026?',
        a: 'No. Under Hungary’s post-2022 KATA Act, accepting revenue from any domestic or foreign corporate/B2B client (except licensed taxi services) immediately disqualifies KATA status. B2B contractors use Átalányadó instead.'
      },
      {
        q: 'What changed in Hungary’s Átalányadó flat-rate tax for 2026?',
        a: 'In 2026, Hungary increased the general Átalányadó flat-expense deduction from 40% to 45%, lowered the minimum SZOCHO contribution multiplier from 112.5% to 100% of the minimum/guaranteed wage, raised the domestic VAT-free threshold to 20,000,000 HUF, and doubled family tax/TBJ allowances.'
      },
      {
        q: 'How does simplified local business tax (HIPA) work in Hungary?',
        a: 'Hungarian sole proprietors under Átalányadó can opt into simplified banded HIPA (e.g. 50,000 HUF/yr below 12M HUF revenue, 120,000 HUF/yr for 12M–18M HUF, 170,000 HUF/yr for 18M–25M HUF) instead of filing complex municipal 2% calculations.'
      }
    ]
  },
  {
    slug: 'poland',
    defaultTab: 'pl',
    activeNavCode: 'pl',
    title: 'Poland B2B JDG Tax Calculator 2026 (Ryczałt 12% / 8.5%, Liniowy, ZUS) — NettoEU',
    description:
      '2026 Poland JDG B2B freelance calculator in EUR & PLN: compare Ryczałt (12% IT, 8.5% services, 14%, 15%), Podatek liniowy (19%), and Skala podatkowa (12%/32% + spouse split) with 3-stage ZUS and NFZ.',
    heading: 'Poland — JDG B2B Tax Calculator 2026 (Ryczałt, Liniowy & Skala)',
    summary:
      'Compute 2026 Polish sole-proprietor (Jednoosobowa Działalność Gospodarcza — JDG) net take-home pay in EUR and PLN across Ryczałt ewidencjonowany, Podatek liniowy, and Skala podatkowa, including Ulga na start, Preferencyjny ZUS, Duży ZUS, and NFZ health tiers.',
    bullets: [
      'Ryczałt Ewidencjonowany (up to 2,000,000 €/yr): 12% IT/software, 8.5% general services, 14% engineering/architecture, 15% consulting on revenue minus ZUS social and 50% of NFZ health insurance.',
      '3-Stage ZUS Ramp & 2026 NFZ Tiers: 6 months Ulga na start (0 PLN social) → 24 months Preferencyjny ZUS (on 1,441.80 PLN base) → Duży ZUS (1,926.76 PLN/mo on 5,652.00 PLN base); 3-tier Ryczałt NFZ (498.35 / 830.58 / 1,495.04 PLN/mo).',
      '2026 VAT & Family Rules: Domestic VAT exemption raised to 240,000 PLN/yr (~56,075 €); Skala podatkowa (0% up to 30k PLN, 12% up to 120k PLN, 32% above) unlocks joint spouse splitting and Ulga na dzieci.'
    ],
    faqs: [
      {
        q: 'What is the Ryczałt tax rate for IT contractors and software engineers in Poland in 2026?',
        a: 'Software developers, DevOps, and IT specialists under Polish JDG pay a 12% flat revenue tax (Ryczałt od przychodów ewidencjonowanych) up to 2,000,000 €/yr, after deducting ZUS social contributions and 50% of NFZ health contributions.'
      },
      {
        q: 'How much are Duży ZUS and NFZ health contributions on Polish Ryczałt in 2026?',
        a: 'In 2026, standard Duży ZUS social contributions (including optional chorobowe sickness insurance) total 1,926.76 PLN/mo on the 5,652.00 PLN base. Ryczałt NFZ health insurance is fixed in three annual revenue tiers: 498.35 PLN/mo (≤60k PLN), 830.58 PLN/mo (60k–300k PLN), and 1,495.04 PLN/mo (>300k PLN).'
      },
      {
        q: 'What is Poland’s domestic VAT exemption limit in 2026?',
        a: 'Effective 2026, Poland increased its domestic small-business VAT exemption ceiling from 200,000 PLN to 240,000 PLN per year (standard Polish VAT rate 23%).'
      }
    ]
  },
  {
    slug: 'czechia',
    defaultTab: 'cz',
    activeNavCode: 'cz',
    title: 'Czechia OSVČ Tax Calculator 2026 (Paušální Daň & 60% Výdajový Paušál) — NettoEU',
    description:
      '2026 Czechia OSVČ freelance tax calculator in EUR & CZK: 3-band Paušální daň (Band 1: 9,984 Kč/mo up to 2,000,000 Kč) vs. 60%/80%/40% Výdajový paušál, ČSSZ & VZP minimums, and refundable child credits.',
    heading: 'Czechia — OSVČ Tax Calculator 2026 (Paušální Daň & Výdajový Paušál)',
    summary:
      'Calculate 2026 Czech self-employed (OSVČ) net income in EUR and CZK across all 3 Paušální daň monthly bands and standard 60% / 80% / 40% Výdajový paušál lump-sum expenses.',
    bullets: [
      'Paušální Daň 2026 (≤2,000,000 Kč/yr, full-time non-VAT OSVČ): Band 1 at 9,984 Kč/mo (~4,754 €/yr all-in tax + ČSSZ + VZP), Band 2 at 16,745 Kč/mo, and Band 3 at 27,139 Kč/mo.',
      'Výdajový Paušál (40% / 60% / 80%): 60% lump-sum deduction for IT & free trades (capped at 1,200,000 Kč deduction), 15%/23% DPFO minus 30,840 Kč taxpayer credit, ČSSZ 29.2% on 55% profit (min 5,720 Kč/mo, or 3,575 Kč/mo for new OSVČ), and VZP 13.5% on 50% profit (min 3,306 Kč/mo).',
      'VAT & Family Credits: 2,000,000 Kč/yr (~79,365 €) domestic DPH (21% VAT) ceiling; Výdajový paušál preserves refundable Daňové zvýhodnění child tax bonuses (15,204 / 22,320 / 27,840 Kč).'
    ],
    faqs: [
      {
        q: 'How much is Czechia’s Band 1 Paušální daň monthly payment in 2026?',
        a: 'In 2026, Band 1 of Czechia’s Paušální daň is 9,984 Kč/mo (119,808 Kč/yr, or ~4,754 €/yr), combining 100 Kč income tax, 6,578 Kč pension insurance (1.15× ČSSZ minimum), and 3,306 Kč VZP health insurance in a single payment with zero annual tax filing.'
      },
      {
        q: 'Who is eligible for Paušální daň in Czechia?',
        a: 'Paušální daň is available to full-time OSVČ (without concurrent employment taxed via standard payroll) whose annual revenue does not exceed 2,000,000 Kč and who are not registered as full domestic VAT (DPH) payers.'
      },
      {
        q: 'When is 60% Výdajový paušál better than Paušální daň in Czechia?',
        a: 'Standard 60% Výdajový paušál is required above 2,000,000 Kč or for side-job OSVČ, and is frequently more tax-efficient for parents claiming Czechia’s refundable child tax credits (Daňové zvýhodnění) or first-year OSVČ paying the reduced 3,575 Kč/mo startup ČSSZ minimum.'
      }
    ]
  },
  {
    slug: 'slovakia',
    defaultTab: 'sk',
    activeNavCode: 'sk',
    title: 'Slovakia SZČO Tax Calculator 2026 (Paušálne Výdavky 60% & 15% Tax) — NettoEU',
    description:
      '2026 Slovakia SZČO (živnosť) calculator: 60% lump-sum expenses (max 20,000 €/yr), 15% reduced income tax up to 100,000 €, 303.11 €/mo Sociálna poisťovňa & 121.92 €/mo ZP health minimums, and child tax bonus.',
    heading: 'Slovakia — SZČO (Paušálne Výdavky 60%) Tax Calculator 2026',
    summary:
      'Compute 2026 Slovak sole-proprietor (SZČO / živnostník) net take-home pay with exact 60% lump-sum expenses (20,000 € cap), 15% micro-taxpayer rate up to 100,000 €, 2026 16% health & 33.15% social minimums, NČZD allowances, and Daňový bonus na dieťa.',
    bullets: [
      'Expenses & 15% Tax Rate: 60% lump-sum deduction capped at 20,000 €/yr; reduced 15% SZČO income tax up to 100,000 €/yr gross turnover (progressive 19%–35% brackets above 100,000 €) after 5,966.76 € NČZD allowance.',
      '2026 Social & Health Consolidation: Zdravotná poisťovňa raised to 16% (min 121.92 €/mo); Sociálna poisťovňa 33.15% on raised 60% minimum base (min 303.11 €/mo = 3,637.32 €/yr), with a shortened 6-month startup social holiday for new SZČO.',
      'VAT & Family Bonus: 50,000 €/yr domestic DPH (23% VAT) threshold (62,500 € immediate registration); Daňový bonus na dieťa up to 1,200 €/yr per child.'
    ],
    faqs: [
      {
        q: 'What is the maximum lump-sum expense deduction for Slovak SZČO in 2026?',
        a: 'Slovak SZČO (živnostníci) without VAT registration for the full year deduct 60% of gross revenue capped at 20,000 €/yr (reaching the 20,000 € ceiling at 33,333.33 € of annual revenue), plus mandatory paid social and health contributions.'
      },
      {
        q: 'How much are minimum monthly SZČO social and health contributions in Slovakia in 2026?',
        a: 'In 2026, minimum monthly Zdravotná poisťovňa (16%) is 121.92 €/mo and minimum Sociálna poisťovňa (33.15% across 4 cent-floored sub-pillars on the 914.40 € base) is 303.11 €/mo—totaling 425.03 €/mo for established full-time SZČO.'
      },
      {
        q: 'How long is the social insurance holiday for a newly opened Slovak živnosť in 2026?',
        a: 'Under Slovakia’s 2026 fiscal consolidation rules, the startup exemption from mandatory Sociálna poisťovňa contributions was shortened to the first 5–6 months of operation (modeled as a 6-month Year-1 holiday, followed by minimum social contributions).'
      }
    ]
  },
  {
    slug: 'spain',
    defaultTab: 'es',
    activeNavCode: 'es',
    title: 'Spain Autónomo Tax Calculator 2026 (Cuota RETA, Tarifa Plana & IRPF) — NettoEU',
    description:
      '2026 Spain Autónomo net salary calculator: 15-tramo Seguridad Social RETA table (~205–598 €/mo), 80 €/mo Tarifa Plana & Cuota Cero, Estimación Directa Simplificada, progressive IRPF (19–47%), and IVA note.',
    heading: 'Spain — Autónomo (RETA & IRPF) Net Income Calculator 2026',
    summary:
      'Calculate 2026 Spanish self-employed (Trabajador Autónomo) net take-home income under Estimación Directa Simplificada, including the 15-bracket income-based RETA contribution system, 80 €/mo Tarifa Plana, and progressive IRPF.',
    bullets: [
      '2026 RETA Social Security: 15 net-yield brackets (~205 €/mo to ~598 €/mo including 0.9% MEI), or Year-1 Tarifa Plana (80 €/mo), or regional Cuota Cero (0 €/yr in Madrid, Andalucía, Murcia, etc.).',
      'Estimación Directa Simplificada (≤600,000 €/yr): Deducts documented operating expenses, full RETA contributions, plus 5% gastos de difícil justificación (capped at 2,000 €/yr).',
      'IRPF & IVA: Progressive 19%–47% IRPF brackets with 5,550 € personal minimum, child minimums (2,400–4,500 €), and 3,400 € joint spouse Declaración conjunta reduction. Spain has 0 € domestic small-business IVA exemption (21% IVA from euro one on domestic taxable services).'
    ],
    faqs: [
      {
        q: 'How much is the monthly Cuota de Autónomos (RETA) in Spain in 2026?',
        a: 'Established Spanish Autónomos pay according to 15 monthly net-income brackets (cotización por ingresos reales), ranging from ~205 €/mo on low net yields to ~598 €/mo on net yields above 6,000 €/mo. First-year Autónomos qualify for the 80 €/mo Tarifa Plana (or 0 € regional Cuota Cero).'
      },
      {
        q: 'Does Spain have a VAT-free (IVA) revenue threshold for small freelancers in 2026?',
        a: 'No. Unlike most other EU countries, Spain has not adopted a domestic SME VAT franchise threshold—taxable domestic B2C services carry 21% IVA from the first euro, whereas intra-EU B2B services via ROI/VIES use 0% reverse charge.'
      },
      {
        q: 'How does joint family taxation (Declaración conjunta) help Spanish Autónomos?',
        a: 'Married Autónomos supporting a non-working spouse receive a 3,400 €/yr Declaración conjunta tax-base reduction on top of the 5,550 € personal minimum and progressive Mínimo por descendientes child allowances (2,400 € to 4,500 € per child).'
      }
    ]
  },
  {
    slug: 'compare',
    defaultTab: 'compare',
    activeNavCode: 'compare',
    title: 'Compare Freelance & Sole-Proprietor Taxes Across 9 EU Countries (2026) — NettoEU',
    description:
      'Side-by-side 2026 EU freelance & B2B contractor tax comparison at identical EUR revenue: rank net take-home pay, effective tax + social burden, VAT limits, and family credits across SI, HR, IT, AT, HU, PL, CZ, SK, and ES.',
    heading: '2026 European Freelance & Sole-Proprietor Tax Comparison Arena (9 Countries)',
    summary:
      'Rank all 9 EU sole-proprietor jurisdictions side by side at any monthly or annual EUR revenue across Full-Time vs. Side-Job, Startup vs. Established, B2B vs. B2C VAT impact, and Household Dependents.',
    bullets: [
      '11 Ranked Regimes Across 9 Countries: Slovenia (ZPZR Now & ZIURS Proposed), Croatia (Paušalni obrt), Italy (Regime Forfettario), Austria (Pauschalierung), Hungary (Átalányadó & KATA), Poland (JDG Ryczałt/Skala/Liniowy), Czechia (Paušální daň / Výdajový paušál), Slovakia (SZČO 60%), and Spain (Autónomo EDS).',
      'Normalized Persona & Household Matrix: Toggle B2B vs. B2C consumer VAT impact, Year-1 startup reliefs vs. steady-state Year 4+ rates, and 0–4 children + dependent spouse.',
      '7-Dimension Legal Meta-Comparison: Statutory caps, VAT ceilings, startup incentives, side-job discounts, disguised-employment B2B audit rules, pension/sick-leave accrual, and administrative burden.'
    ],
    faqs: [
      {
        q: 'Which EU country has the lowest effective freelance tax and social burden in 2026?',
        a: 'Below 60,000 €/yr, Croatia’s Paušalni obrt (~8.8% total burden at 60k €) and Czechia’s Band 1 Paušální daň (~4,754 €/yr flat up to ~79k € for qualifying 60%/80% trades) deliver the highest net take-home percentages, followed closely by Italy’s 5% startup Forfettario (up to 85k €), Poland’s 8.5%/12% JDG Ryczałt (up to 2M €), and Slovenia’s Normiranec (up to 120k €).'
      },
      {
        q: 'Which EU sole-proprietor regime has the highest revenue cap for IT & B2B contractors?',
        a: 'Poland’s Ryczałt ewidencjonowany allows flat-rate revenue taxation (12% for IT/software, 8.5% for general services) up to 2,000,000 €/yr, while Spain’s Estimación Directa Simplificada runs up to 600,000 €/yr and Austria’s Basispauschalierung up to 320,000 €/yr.'
      },
      {
        q: 'Which EU countries give the largest family tax benefits to self-employed parents?',
        a: 'Austria (2,000 €/yr Familienbonus Plus per child + AVAB), Czechia Výdajový paušál (refundable child tax bonuses), Poland Skala podatkowa (full joint spouse bracket splitting + child credits), Slovakia SZČO (child bonus + NČZD spouse allowance), Hungary Átalányadó (doubled 2026 family SZJA/TBJ credits), and Spain Autónomo (3,400 € joint spouse reduction + child minimums).'
      }
    ]
  }
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildJsonLd(page) {
  const pageUrl = page.slug ? `${BASE_URL}/${page.slug}/` : `${BASE_URL}/`;
  const graph = [
    {
      '@type': 'WebApplication',
      '@id': `${pageUrl}#app`,
      name: page.title,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      url: pageUrl,
      image: `${BASE_URL}/assets/og-card.png`,
      inLanguage: ['en', 'sl', 'uk'],
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR'
      },
      description: page.description,
      featureList: [
        'Slovenia Normiranec S.P. 2026 (ZPZR vs. ZIURS)',
        'Croatia Paušalni obrt 2026 (60,000 EUR cap)',
        'Italy Partita IVA Regime Forfettario 2026 (5% / 15%)',
        'Austria Einzelunternehmen Pauschalierung & SVS 2026',
        'Hungary Egyéni vállalkozó Átalányadó & KATA 2026',
        'Poland JDG B2B Ryczałt, Skala & Liniowy 2026',
        'Czechia OSVČ Paušální daň & Výdajový paušál 2026',
        'Slovakia SZČO Paušálne výdavky 60% 2026',
        'Spain Autónomo 15-Tramo RETA & IRPF 2026',
        'Household & dependent children/spouse tax impact modeling'
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    }
  ];

  if (page.slug) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'NettoEU 2026',
          item: `${BASE_URL}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.heading,
          item: pageUrl
        }
      ]
    });
  }

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph
    },
    null,
    2
  );
}

function buildHtml(page) {
  const isSubdir = Boolean(page.slug);
  const rel = isSubdir ? '..' : '.';
  const canonicalUrl = isSubdir ? `${BASE_URL}/${page.slug}/` : `${BASE_URL}/`;
  const defaultTabAttr = page.defaultTab ? ` data-default-tab="${page.defaultTab}"` : '';
  const activeNav = page.activeNavCode || 'si';

  const countryButtonsHtml = NAV_TABS.filter(t => t.isCountry)
    .map(t => {
      const isAct = t.code === activeNav;
      return `      <button type="button" id="tab-${t.code}" role="tab" aria-selected="${isAct}" aria-controls="view-mount" tabindex="${isAct ? '0' : '-1'}" class="nav-tab${isAct ? ' active' : ''}" data-nav-tab="${t.code}"><span class="nav-flag" data-flag="${t.code}"></span><span class="nav-lbl">${t.label}</span></button>`;
    })
    .join('\n');

  const isCompareAct = activeNav === 'compare';
  const compareButtonHtml = `    <button type="button" id="tab-compare" role="tab" aria-selected="${isCompareAct}" aria-controls="view-mount" tabindex="${isCompareAct ? '0' : '-1'}" class="nav-tab arena-tab${isCompareAct ? ' active' : ''}" data-nav-tab="compare"><span class="nav-lbl">Compare All</span></button>`;

  const internalLinksHtml = [
    `<a href="${rel}/">All 9 EU Countries</a>`,
    ...NAV_TABS.map(t => `<a href="${rel}/${t.slug}/">${t.label} 2026</a>`)
  ].join('\n        ');

  const bulletsHtml = page.bullets
    .map(b => `        <li>${escapeHtml(b)}</li>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en"${defaultTabAttr}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="NettoEU">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${BASE_URL}/assets/og-card.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="NettoEU 2026 — European Freelance &amp; Sole-Proprietor Tax Calculator across 9 EU Countries">

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${BASE_URL}/assets/og-card.png">

  <!-- PWA & App Icons -->
  <meta name="theme-color" id="meta-theme-color" content="#f5f6f8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="NettoEU">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <link rel="icon" type="image/svg+xml" href="${rel}/assets/favicon.svg?v=2026">
  <link rel="icon" type="image/png" sizes="32x32" href="${rel}/assets/favicon-32.png?v=2026">
  <link rel="icon" type="image/png" sizes="192x192" href="${rel}/assets/icon-192.png?v=2026">
  <link rel="shortcut icon" href="${rel}/favicon.ico?v=2026">
  <link rel="apple-touch-icon" sizes="180x180" href="${rel}/assets/apple-touch-icon.png?v=2026">
  <link rel="manifest" href="${rel}/manifest.webmanifest?v=2026">

  <!-- Structured Data (Schema.org WebApplication + FAQPage) -->
  <script type="application/ld+json">
${buildJsonLd(page)}
  </script>

  <script>
    (function () {
      var raw = (location.hash || '') + '&' + (location.search || '');
      var m = raw.match(/(?:^|[?&#])theme=(dark|light)/);
      var t = m ? m[1] : null;
      try { if (!t) t = localStorage.getItem('si_tax_calc_theme'); } catch (e) {}
      if (!t) t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      var tc = document.getElementById('meta-theme-color');
      if (tc) tc.setAttribute('content', t === 'dark' ? '#0a0c10' : '#f5f6f8');
    })();
  </script>
  <link rel="stylesheet" href="${rel}/css/styles.css">
</head>
<body>
<a class="skip-link" href="#global-revenue" id="skip-link">Skip to calculator</a>
<div id="sr-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>

<div class="app-shell${isCompareAct ? ' wide' : ''}" id="app-container">
  <!-- Minimal Top Header -->
  <header class="topbar">
    <div class="brand">
      <div class="brand-title-row">
        <h1 id="brand-title">NettoEU</h1>
        <span class="year-badge">2026</span>
      </div>
      <p class="brand-sub" id="brand-subtitle">European Sole-Proprietor &amp; Freelance Tax Suite 2026 — 9 Countries</p>
    </div>

    <div class="controls">
      <button type="button" class="btn-utility" id="btn-share" title="Share Scenario">Share</button>
      <button type="button" class="btn-utility btn-lang" id="btn-lang" title="Switch Language">EN</button>
      <button type="button" class="btn-utility btn-theme" id="btn-theme" title="Toggle Dark/Light Theme" aria-label="Toggle Theme"></button>
    </div>
  </header>

  <!-- Primary Country & Cross-Border Arena Navigation (WAI-ARIA Tablist) -->
  <nav aria-label="Countries and Cross-Border Comparison">
    <div class="country-nav" id="country-tablist" role="tablist" aria-label="Countries and Cross-Border Comparison">
      <div class="country-tabs-group" role="presentation">
${countryButtonsHtml}
      </div>
  ${compareButtonHtml}
    </div>
  </nav>

  <!-- Unified Revenue Command Strip -->
  <section class="revenue-strip" aria-label="Revenue Input">
    <div class="revenue-main">
      <div class="rev-input-col">
        <div class="label-row">
          <span class="rev-label-wrap">
            <label class="overline" for="global-revenue" id="lbl-global-rev">Annual Revenue (€)</label>
            <span class="equiv-pill num-tabular" id="rev-period-equiv"></span>
          </span>
          <button type="button" class="info-trigger" id="btn-rev-info" data-tip-key="desc_revenue" aria-label="Details: Annual Revenue (€)">?</button>
        </div>

        <div class="hero-input-wrapper">
          <span class="currency-prefix" aria-hidden="true">€</span>
          <input type="number" id="global-revenue" class="hero-revenue-input num-tabular" value="65000" min="0" step="any" data-step="5000">
          <div class="spinner-group">
            <button type="button" class="spin-btn" id="btn-rev-dec" data-step-target="global-revenue" data-step-dir="-1" aria-label="Decrease Annual Revenue (€)">−</button>
            <button type="button" class="spin-btn" id="btn-rev-inc" data-step-target="global-revenue" data-step-dir="1" aria-label="Increase Annual Revenue (€)">+</button>
          </div>
        </div>
      </div>

      <div class="rev-actions-col">
        <div class="view-toggle" id="period-toggle" role="group" aria-label="Billing Period">
          <button type="button" class="view-btn" data-view-mode="monthly" id="view-mo" aria-pressed="false">Monthly</button>
          <button type="button" class="view-btn active" data-view-mode="yearly" id="view-yr" aria-pressed="true">Yearly</button>
        </div>
        <div class="quick-rev-row" id="quick-rev-row" role="group" aria-label="Quick Revenue Presets"></div>
      </div>
    </div>
  </section>

  <!-- Dynamic Workspace Mount (Pre-Rendered Semantic Statutory Summary for Search & AI Crawlers) -->
  <main id="view-mount" role="tabpanel" aria-labelledby="tab-${activeNav}">
    <article class="panel-card seo-prerender">
      <h2>${escapeHtml(page.heading)}</h2>
      <p>${escapeHtml(page.summary)}</p>
      <ul>
${bulletsHtml}
      </ul>
      <nav class="seo-country-links" aria-label="2026 European Sole-Proprietor Tax Calculators">
        ${internalLinksHtml}
      </nav>
    </article>
  </main>

  <!-- Legal Disclaimer Footer -->
  <footer class="footer-disclaimer" id="footer-disclaimer">
    For informational purposes only, modeled on official 2026 rules (Slovenia ZPZR, ZPZR-A, ZPIZ-2 &amp; contested ZIURS proposal, plus HR, IT, AT, HU, PL, CZ, SK, ES 2026 statutory rates). Always consult a certified tax advisor before making financial or relocation decisions. All calculations run locally in your browser.
  </footer>
</div>

<script type="module" src="${rel}/js/app.js"></script>
</body>
</html>
`;
}

// 1. Write root index.html and all 10 /<slug>/index.html entry pages
for (const page of PAGES) {
  const outDir = page.slug ? path.join(ROOT_DIR, page.slug) : ROOT_DIR;
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, buildHtml(page), 'utf8');
}

// 2. Write sitemap.xml
const sitemapUrls = PAGES.map(page => {
  const loc = page.slug ? `${BASE_URL}/${page.slug}/` : `${BASE_URL}/`;
  const priority = page.slug === '' ? '1.0' : page.slug === 'compare' ? '0.95' : '0.90';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;
fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

// 3. Write robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Generated ${PAGES.length} HTML entry pages, sitemap.xml, and robots.txt.`);
