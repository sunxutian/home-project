# 🚗 Family 6-Seater EV & Hybrid Comparison Hub & Cost Calculator

An interactive, multi-page web application designed to evaluate 3-row family vehicles for a household of 6 (2 adults + 2 kids in car seats + 2 visiting adults/grandparents) living in **Closter, NJ (07624)**.

Designed to calculate all-in monthly costs when trading in a **2018 Mercedes-Benz GLE 350 (~70,000 miles, ~$14,000 trade-in)** plus **$15,000 cash down** ($29,000 total upfront equity).

---

## 🚘 Vehicles Analyzed

1. **Kia EV9 Land AWD (3-Row EV)** — C&D 10Best, Edmunds Top Rated EV, 0% APR promo + $5k cash, 10-year warranty, flat floor.
2. **Toyota Grand Highlander Hybrid Limited (AWD)** — CR #1 reliability (84/100), 34 MPG, class-leading 33.5" 3rd-row legroom, lowest maintenance & insurance.
3. **Tesla Model Y L (LWB 6-Seater)** — Stretched wheelbase (+6 in), 2+2+2 captain chairs, factory 8" rear touchscreen with Netflix/Disney+ and dual Bluetooth headphones.
4. **Mazda CX-90 PHEV Premium Plus** — C&D 3-row shootout winner, 0% APR promo, near-Volvo interior luxury at Japanese maintenance costs.
5. **Volvo XC90 T8 Recharge Plug-In Hybrid** — 455 HP, Scandinavian styling, built-in 2nd-row child booster seat, 10-year NJ CARB warranty.
6. *Tesla Model Y Standard 7-Seater (SWB)* — Included as a cautionary comparison (tight 26.5" 3rd row, minimal cargo).

---

## ✨ Features & Interactive Pages

1. **💰 Cost Calculator (`#calculator`)**:
   - Interactive sliders for trade-in value, cash down payment, and loan duration (48, 60, 72 months).
   - Toggles for confirmed local promotional APRs (Kia 0%, Mazda 0%, Tesla 1.99%).
   - Level 2 Home Wall Charger installation module with net utility rebate calculations (Rockland Electric & Charge Up NJ).
   - NJ sales tax trade-in credit calculation (saving 6.625% on the trade-in allowance).
   - Dynamic monthly cost breakdown cards (loan, insurance, energy/gas, routine maintenance, charger amortized) and stacked visual cost bars.

2. **⭐ Online Ratings & Reviews (`#ratings`)**:
   - Aggregated critical scores from **Car and Driver, Edmunds, Kelley Blue Book (KBB), Consumer Reports**, and **IIHS Safety Awards**.

3. **🚘 Car Compare & Kid Tech (`#compare`)**:
   - Seating configurations, 2nd-row kid entertainment (Tesla 8" screen vs. EV9 115V AC household wall plug vs. Grand Highlander tablet holders).
   - **3rd-Row Usability, Legroom & Ergonomics Deep Dive**:
     - Exact measurements (legroom, headroom, seat cushion height).
     - The "2 Car Seats in Row 2" pass-through test.
     - The "Stroller Test" (trunk capacity behind row 3 with 6 passengers aboard).

4. **🔧 Service & Maintenance (`#service`)**:
   - 5-year and 10-year maintenance projections (CarEdge empirical data).
   - Mechanical complexity comparisons (pure EV vs. hybrid vs. complex European twin-charged PHEV).
   - Northern NJ dealer labor rate analysis ($220–$280/hr luxury vs. $130–$160/hr standard).

5. **🛡️ Insurance Analysis (`#insurance`)**:
   - Bergen County premium ratings and risk profiles.
   - Impact of aluminum gigacastings vs. modular steel unibody on NJ collision repair costs.

6. **📍 Local NJ Dealers & Stock (`#dealers`)**:
   - Direct stock search links and drive times from Closter 07624 (Paramus, Englewood Cliffs, Ramsey).
   - Links to Rockland Electric (RECO) charger rebate portal and CarMax Wayne buyout.

7. **🔋 EV Battery Degradation & Longevity (`#degradation`)**:
   - Empirical telemetry from Geotab (10,000+ EVs) and Tesla Fleet Impact Reports.
   - Interactive Battery Degradation Simulator across 1 to 15 years with charging care profiles.
   - New Jersey temperate climate advantage and warranty capacity guarantees (70% minimum).

8. **⚔️ Kia EV9 vs. Tesla Model Y L Head-to-Head (`#ev9-vs-model-y`)**:
   - Detailed financial showdown (loan, insurance difference, energy, TCO).
   - Cabin space, 3rd-row headroom, kid entertainment, charging architecture (800V vs 400V), and ride quality comparison.

---

## 🚀 How to Run Locally

Open a terminal and start a static web server:

```bash
cd car-calculator
python3 -m http.server 3333
```

Open your browser to:
👉 `http://localhost:3333`
