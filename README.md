Oskar Vedomostný Dashboard
Interaktívna a vizuálna analýza mena Oskar, ktorá skúma jeho kultúrne, historické a mystické aspekty. Aplikácia je postavená na moderných technológiách ako React, Vite, a Tailwind CSS.

Funkcie
Interaktívne grafy: Vizualizácia dát o popularite, gematrii a osobnostných črtách.

Historická časová os: Kľúčové míľniky v histórii mena.

Globálna mapa: Zobrazenie variantov mena po celom svete.

Dynamické počítadlo veku: Výpočet presného veku od dátumu narodenia v reálnom čase.

Responzívny dizajn: Plne funkčné na mobilných zariadeniach aj desktopoch.

Technológie
Vite: Build systém pre rýchly vývoj.

React: Knižnica pre používateľské rozhranie.

Tailwind CSS: Utility-first CSS framework pre styling.

Recharts: Knižnica pre tvorbu grafov.

Framer Motion: Knižnica pre animácie.

Inštalácia a spustenie
Naklonujte repozitár:

git clone [https://github.com/](https://github.com/)<tvoje_meno>/oskar-dashboard.git
cd oskar-dashboard

Nainštalujte závislosti:

npm install

Spustite vývojový server:

npm run dev

Aplikácia bude dostupná na http://localhost:5173.

Build a nasadenie
Lokálny build
Pre vytvorenie produkčnej verzie aplikácie spustite:

npm run build

Súbory budú vygenerované v priečinku dist.

Nasadenie na GitHub Pages
V súbore package.json upravte pole "homepage" na vašu URL adresu GitHub Pages.

Spustite deployment skript:

npm run deploy

Tento príkaz automaticky vytvorí build a nahrá ho do gh-pages vetvy.

Nasadenie na Netlify
Pripojte váš GitHub repozitár k Netlify.

Nastavte nasledujúce konfiguračné hodnoty:

Build command: npm run build

Publish directory: dist

Netlify automaticky nasadí aplikáciu pri každom push-i do hlavnej vetvy.
