# 🇸🇮 Slovenia Normiranec Calculator 2026

A standalone, privacy-focused web calculator for Slovenian Sole Proprietors (**S.P.**) under the "Normalized Expenses" (*Normirani*) system.

Updated with the latest legislative amendments (Nov 2025), including the **€120,000 limit**, tiered expense rates, and new social contribution rules.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Language](https://img.shields.io/badge/language-HTML%2FJS-orange.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20Offline-green.svg)

## 🌟 Features

*   **Two Modes:** Supports **Full-time S.P.** (*Polni*) and **Afternoon S.P.** (*Popoldanski*).
*   **2025/2026 Legislation Ready:**
    *   Updated limits (€120k for Full S.P.).
    *   New tiered expense logic (80% up to €60k, 0% thereafter).
    *   Breach simulation (exceeding the limit results in status loss).
*   **Smart Contribution Engine:**
    *   Calculates exact *Zavarovalna osnova* (Insurance base) using the steady-state formula.
    *   Includes the new **Long-term Care (DO)** contribution (2%).
    *   Includes **Newbie Discounts** for 1st and 2nd year of business.
*   **User Interface:**
    *   Dark Mode / Light Mode toggle.
    *   Bilingual (English 🇬🇧 / Slovenian 🇸🇮).
    *   Responsive design (Mobile/Desktop).
*   **Zero Dependencies:** Single HTML file. No backend, no trackers, no internet required.

## 🚀 How to Use

### Option 1: Run Locally
1.  Download the file `normiranec-2026.html` from this repository.
2.  Double-click to open it in any web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Hosted
*(If you publish this via GitHub Pages, replace this text with your link, e.g., [Click here to use the calculator](https://yourusername.github.io/normiranec-calc))*

---

## 📚 Guide: Slovenian Sole Proprietorship (S.P.)

*Current as of legislation proposals November 2025 for the 2026 fiscal year.*

There are two basic types of tax regimes available for an S.P. (*Samostojni podjetnik*):
1.  **Normalized Expenses** (*Normiran S.P.*) – The most common for IT/Services.
2.  **Actual Expenses** (*Navaden S.P.*) – Based on real accounting costs.

### 1. Taxation for Normiran S.P.

Unlike the previous flat system, the new system uses **tiered** recognized expenses based on revenue.

#### Full-time S.P. (*Polni*)
| Revenue Tier | Recognized Expenses | Effective Tax Rate |
| :--- | :--- | :--- |
| **0 – €60,000** | **80%** | **4%** |
| **€60,000 – €120,000** | **0%** | **20%** |
| **Over €120,000** | **Status Lost** | **~35%+** |

*   **The €120k Limit:** To remain in the system, your revenue must not exceed €120,000.
*   **Penalty:** If you exceed this limit, you must exit the Normiran system. You cannot re-enter for **5 years**. The excess is taxed according to the progressive income tax scale (effectively ~35-50% depending on costs).

#### Afternoon S.P. (*Popoldanski*)
| Revenue Tier | Recognized Expenses | Effective Tax Rate |
| :--- | :--- | :--- |
| **0 – €12,500** | **80%** | **4%** |
| **€12,500 – €50,000** | **40%** | **12%** |
| **Over €50,000** | **Status Lost** | **Progressive** |

### 2. Social Contributions (*Prispevki*)

In addition to income tax, social contributions are mandatory. They cover pension, healthcare, parental leave, and the new long-term care insurance.

*   **Total Rate:** Approximately **39.67%** of your Insurance Base.
*   **Insurance Base:** Calculated based on your **Profit + Paid Contributions** from the previous year.
    *   *Minimum Base:* 60% of the Average National Salary (~€1,400+).
    *   *Maximum Base:* 3.5x Average National Salary.

#### Breakdown of Contributions:
*   **Pension (PIZ):** 24.35%
*   **Healthcare (ZZ):** 12.92%
*   **Long-term Care (DO):** 2.00% (New in 2025)
*   **Parental/Employment:** 0.40%
*   **OZP (Fixed):** €35.00 mandatory fixed healthcare contribution (collected by FURS).

#### "Newbie" Discounts
If you are opening a Full S.P. for the first time, you get a discount on the **Pension (PIZ)** portion:
*   **1st Year:** 50% discount on PIZ.
*   **2nd Year:** 30% discount on PIZ.

### 3. Opening an S.P.

**Requirements:**
1.  **Slovenian Tax Number** (*Davčna številka*).
2.  **EMŠO** (Personal ID number).
3.  **Digital Signature** (Sigenca, Halcom, etc.) if opening online.

**For Foreigners (Non-EU):**
Generally, you must reside in Slovenia for **1 year** before opening an S.P.
*   *Exception:* Holders of **Temporary Protection** (e.g., Ukraine) or specific EU-family reunification permits can open one immediately.

**Process:**
*   **In Person:** Visit a **SPOT Point** (AJPES office). It is free of charge.
*   **Online:** Use the [SPOT Portal](https://spot.gov.si/) (requires digital certificate).

### 4. Payment of Taxes

*   **Deadlines:** Both Income Tax (Dohodnina) and Social Contributions must be paid by the **20th of the month** for the previous month.
*   **Methods:**
    *   **Independent:** Use the [eDavki](https://edavki.durs.si/) mobile app or web portal. You will receive OPSVZ forms.
    *   **Accountant:** Recommended to ensure compliance (~€40–€60/month).

---

## 🛠 Technical Details

The calculator performs a "steady-state" calculation for social contributions. Since contributions are tax-deductible but calculated based on gross profit (which includes the money used to pay contributions), the tool uses a derived formula to reverse-calculate the correct insurance base.
