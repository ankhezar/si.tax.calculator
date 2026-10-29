# 🇸🇮 Slovenia & Central Europe Sole-Proprietor Tax Suite (2026)

A privacy-first, zero-dependency web application for **Slovenian Sole Proprietors (Normirani S.P.)** — updated for **official 2026 Slovenian tax & social security rules**, featuring a live **"Now (`ZPZR`) vs. Contested Proposal (`ZIURS`)"** comparison ahead of the December 6, 2026 legislative referendum, plus **cross-border sole-proprietor calculators & meta-comparison** across **Croatia 🇭🇷, Italy 🇮🇹, Austria 🇦🇹, and Hungary 🇭🇺**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/tech-Vanilla%20ES%20Modules-orange.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20Client--Side-green.svg)

---

## ✨ Key Features

1. **🇸🇮 Official 2026 Slovenian Normiranec Engine (`ZPZR`, `ZPZR-A`, `ZPIZ-2`, `ZZVZZ`, `ZDOsk-1`):**
   - **Full-time (*Polni*) & Afternoon (*Popoldanski*) S.P.** modes.
   - **Accurate `ZPIZ-2` Art. 145(2) Insurance Base:** Properly adds back prior-year assessed mandatory social contributions `((Profit + PriorSoc) × 0.75) / 12`, clamped to `60%–350%` of the SURS 2025 average gross salary (`2.536,03 €` → `1.521,62 €` min / `8.876,11 €` max).
   - **March / April 2026 FURS Statutory Amounts:** `39,36 €/mo` OZP (exact `651,04 €/mo` minimum *Polni* contribution matching `OPSV` per-line rounding) and `113,01 €/mo` *Popoldanski* flat contributions (`PIZ 52,05 € + ZZ 54,53 € + DO 6,43 €`).
   - **4 Business-Year Stages & 5-Year Stabilization Loop:** Compare `1st Year (-50% PIZ)`, `2nd Year (-30% PIZ)`, `3rd Year`, and `4th+ Year (Steady-State)` with recursive convergence visualization.

2. **🗳️ "Now (`ZPZR`) vs. Proposed (`ZIURS`)" Referendum Comparison:**
   - Models the contested *Zakon o interventnih ukrepih za razvoj Slovenije (`ZIURS`)* (passed May 11, 2026; subject to the **December 6, 2026** legislative referendum):
     - **Polni S.P.** (`≥5` mo insured): `150.000 €` cap (`80%` expenses `0–100k €`, `70%` `100k–120k €`, `40%` `120k–150k €`).
     - **Popoldanski S.P.:** `70.000 €` cap (`80%` `0–50k €`, `70%` `50k–70k €`).
   - 3-way Regime Mode (`Current ZPZR` | `Proposed ZIURS` | `Side-by-Side Comparison`) showing both *dohodnina* and downstream social-base savings, plus an interactive `0–160.000 €` SVG burden curve.

3. **🌍 Neighbouring Countries Calculators & Meta-Comparison (2026):**
   - **🇭🇷 Croatia (*Paušalni obrt*):** 7 Porezna uprava brackets up to `60.000 €`, `290,98 €/mo` full-time contributions vs. `17,5%` side-job (*obrt uz rad*), HOK `11,40 €/mo` + 2-year newcomer exemption, and hard `60k €` PDV/bookkeeping cliff warning.
   - **🇮🇹 Italy (*Regime Forfettario*):** `85.000 €` cap (`100k €` immediate IVA exit), `5%` startup vs. `15%` tax, ATECO coefficients (`78%` / `67%` / `40%`), and deductible INPS (*Gestione Separata* `26,07%` / `24%` vs. *Artigiani & Commercianti* with `-35%` Forfettario reduction).
   - **🇦🇹 Austria (*Einzelunternehmen*):** *Kleinunternehmerpauschalierung* (`≤55.000 €`, `20%/45%`) & *Basispauschalierung* (`≤420.000 €`, `6%/15%`), deductible 2026 SVS (`26,83% + 144,84 €`), `15%` *Grundfreibetrag* (`max 4.950 €`), and 2026 progressive *ESt* (`0%` up to `13.539 €`).
   - **🇭🇺 Hungary (*Átalányadó & KATA*):** 2026 `45%` service expense ratio, `1.936.800 Ft` tax-free profit band, `100%` minimum-wage floor for `TBJ (18,5%)` & `SZOCHO (13%)`, banded *HIPA*, B2C-only *KATA* (`50.000 Ft/mo`), and editable `EUR/HUF` rate.
   - **Apples-to-Apples Arena & 6-Dimension Legal Matrix:** Synchronized persona filters (`Full-time / Side-job`, `Established / New`, `B2B / B2C`) plus a 6-dimension comparison covering breach cliffs, VAT/EU B2B rules, disguised-employment audit risk, pension/healthcare quality, **183-day tax residency rules**, and admin costs.

4. **🌐 Trilingual & Shareable:**
   - Instant switch between **Slovenian (`SL`)**, **English (`EN`)**, and **Ukrainian (`UA`)**.
   - Client-side URL hash scenario sharing (`🔗 Share Scenario`) with zero backend or tracking.

---

## 🚀 Running Locally & Testing

Because the app uses native ES Modules (`<script type="module">`), serve the directory over HTTP when running locally (deploys as-is to GitHub Pages with **zero build step**):

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

Run the automated unit test suite (requires Node.js 18+):

```bash
node --test tests/*.test.mjs
```

---

## ⚠️ Disclaimer

**For informational purposes only.** Tax laws, referendum outcomes, international tax treaties, and residency determinations (`183-day rule` / `center of vital interests`) depend on individual circumstances. Always consult a certified accountant (*računovodja* / *davčni svetovalec*) or local tax authority before making financial decisions.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
