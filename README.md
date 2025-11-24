# 🇸🇮 Slovenia Normiranec Tax Calculator 2026

A privacy-focused, standalone web calculator for Slovenian Sole Proprietors (**S.P.**) operating under the **Normalized Expenses** (*Normirani*) system.

This tool is specifically designed to handle the **new legislative changes** (Nov 2025 amendments) effective for the **2026** fiscal year, including new revenue limits, tiered expense rates, and social contribution calculations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Language](https://img.shields.io/badge/tech-HTML%20%2F%20JS-orange.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20Offline-green.svg)

## 🎯 Purpose

Slovenian tax laws for "Normirani S.P." have become increasingly complex. Spreadsheets are often error-prone or outdated.

This app calculates:
1.  **Income Tax (Dohodnina):** Based on the new tiered revenue system (4%, 12%, 20%, or 35% on excess).
2.  **Social Contributions (Prispevki):** Uses the correct "steady-state" formula to calculate the insurance base from gross profit, including the new Long-term Care (*Dolgotrajna oskrba*) contribution.
3.  **Effective Tax Rate:** Tells you exactly what percentage of your revenue goes to the state.

## ✨ Features

*   **Dual Modes:** Supports **Full-time S.P.** (*Polni*) and **Afternoon S.P.** (*Popoldanski*).
*   **2026 Logic:**
    *   **New Limits:** €120,000 (Full) and €50,000 (Afternoon).
    *   **Tiered Expenses:** Handles the 80% / 40% / 0% expense brackets automatically.
    *   **Breach Logic:** Calculates the 35% tax on revenue exceeding the limit.
*   **Smart Input:**
    *   Spinner controls (`+` / `-`) for easy adjustments on mobile.
    *   Toggle between **Monthly** and **Annual** views.
*   **Contextual Help:** Click the `?` icons to see detailed static explanations of tax rules without leaving the app.
*   **Privacy First:** Zero dependencies. No backend. No tracking. All calculations happen in your browser.
*   **Bilingual:** Switch instantly between **Slovenian** 🇸🇮 and **English** 🇬🇧.
*   **Dark Mode:** Automatic system detection with a manual toggle.

## 🚀 How to Use

*   run at https://ankhezar.github.io/si.tax.calculator/

## 🧮 Tax Rules Overview (2026)

*Based on the ZDoh-2 amendments (Nov 2025).*

### Full-time S.P. (*Polni*)
| Revenue Tier | Recognized Expenses | Effective Tax |
| :--- | :--- | :--- |
| **0 – €60,000** | 80% | **4%** |
| **€60,000 – €120,000** | 0% | **20%** |
| **> €120,000** | Limit Exceeded | **35%** (on excess) |

### Afternoon S.P. (*Popoldanski*)
| Revenue Tier | Recognized Expenses | Effective Tax |
| :--- | :--- | :--- |
| **0 – €12,500** | 80% | **4%** |
| **€12,500 – €30,000** | 40% | **12%** |
| **€30,000 – €50,000** | 0% | **20%** |
| **> €50,000** | Limit Exceeded | **35%** (on excess) |

## 🛠️ Technical Details

*   **Stack:** Pure HTML5, CSS3 (CSS Variables), and Vanilla JavaScript.
*   **Assets:** Includes an embedded SVG for the branding (Slovenian Coat of Arms) or references `/flag.svg`.
*   **Architecture:** Single-file application (SPA) for portability.

## ⚠️ Disclaimer

**This tool is for informational purposes only.**
While every effort has been made to ensure the logic matches the 2025/2026 legislative proposals, the author is a developer, not a tax advisor. Always consult with a certified accountant (*računovodja*) or FURS before making financial decisions.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
