# Design: Multi-page uitbreiding, SEO-optimalisatie & Favicon fix

**Datum:** 2026-04-16
**Project:** webvakwerk-website
**Status:** Goedgekeurd

---

## Doel

De huidige homepage bundelt alle content in secties. Het doel is om drie secties om te zetten naar volwaardige, informatierijke pagina's zodat:
1. Bezoekers die doorklikken meer context en detail krijgen
2. Google elke pagina als afzonderlijk, inhoudelijk sterk document indexeert
3. De site beter opvalt in zoekresultaten door betere SEO en een scherp favicon

---

## Scope

### 1. Nieuwe / uitgebreide pagina's

#### `/werkwijze` (nieuw)
Uitgebreide versie van de Werkwijze-sectie op de homepage.

**Inhoud:**
- Hero-sectie met H1 en introductie
- De 3 stappen elk uitgebreid: wat er concreet gebeurt, wat de klant moet doen, wat het oplevert
- Concrete tijdlijn: dag 1 (intake), dag 1–5 (demo), week 1–3 (uitwerking), week 3 (live)
- Mini-FAQ (3–4 vragen over het proces zelf, bijv. "Kan ik tussendoor feedback geven?")
- CTA onderaan
- SEO: title, description, canonical, breadcrumb schema, WebPage JSON-LD

#### `/prijzen` (nieuw)
Uitgebreide versie van de Prijzen-sectie op de homepage.

**Inhoud:**
- Hero-sectie met H1
- Alle drie pakketten (Snel vindbaar, Optimaal vindbaar, Op maat) met uitgebreidere feature-uitleg
- Vergelijkingstabel van de twee betaalde pakketten
- Onderhoudspakketten (Basis €29, Plus €69) met uitleg
- FAQ sectie specifiek over kosten (5–6 vragen)
- CTA onderaan
- SEO: title, description, canonical, breadcrumb schema, Service + Offer JSON-LD

#### `/diensten` (uitbreiden)
De bestaande DienstenPage toont alleen de overige diensten (hosting, AI, etc.). Uitbreiden met:
- Webdevelopment-diensten (nu alleen op homepage) bovenaan
- Overige diensten eronder
- Beide categorieën duidelijk gescheiden met subtitels
- CTA onderaan

### 2. Homepage aanpassingen

Elke homepage-sectie krijgt een "Meer info →" link naar de bijbehorende pagina:
- Werkwijze-sectie → `/werkwijze`
- Diensten-sectie → `/diensten`
- Prijzen-sectie → `/prijzen`

De secties zelf blijven als samenvatting staan (geen content verwijderen).

### 3. Routing

`App.tsx` uitbreiden met:
```
/werkwijze  → WerkwijzePage
/prijzen    → PrijzenPage
```

### 4. SEO-verbeteringen

- Elke nieuwe pagina gebruikt `usePageSeo()` met gerichte title/description/canonical
- Elke nieuwe pagina gebruikt `useBreadcrumbSchema()`
- JSON-LD per pagina: `WebPage` en/of `Service` schema
- **Bug fix:** `og:image` meta in `index.html` verwijst naar `og-image.png` maar het bestand is `og-image.svg` — aanmaken van een echte `public/og-image.png` (1200×630 px)

### 5. Favicon fix

**Probleem:** Google toont favicons wazig in zoekresultaten. Oorzaak: de `favicon-32x32.png` en `favicon-48x48.png` zijn waarschijnlijk slecht gegenereerd (lage kwaliteit of verkeerde schaling).

**Fix:**
- `favicon-32x32.png` en `favicon-48x48.png` opnieuw genereren vanuit `favicon.svg` met correcte anti-aliasing
- `favicon.ico` vervangen door een multi-size ICO (16px + 32px lagen)
- `og-image.png` aanmaken zodat de OG-tag klopt

---

## Architectuur

- **Framework:** React + Vite + TypeScript (bestaand)
- **Routing:** React Router (bestaand, uitbreiden met 2 routes)
- **SEO hooks:** `usePageSeo` + `useBreadcrumbSchema` (bestaand, hergebruiken)
- **Animaties:** Framer Motion (bestaand patroon volgen)
- **Stijl:** Tailwind CSS, bestaande design tokens en componenten hergebruiken

Nieuwe pagina's volgen exact het patroon van `DienstenPage.tsx`: Navbar + main + Footer + MobileNav.

---

## Niet in scope

- CMS of dynamische content
- Blog of cases-pagina
- Subpagina's per dienst (bijv. `/diensten/seo`)
- Inhoudelijke wijzigingen aan bestaande homepage-secties (anders dan de "meer info" links)

---

## Succescriteria

- `/werkwijze`, `/prijzen` zijn bereikbaar en tonen uitgebreide content
- `/diensten` toont zowel webdiensten als overige diensten
- Elke nieuwe pagina heeft correcte title/description/canonical in de browser
- `og-image.png` bestaat en is 1200×630px
- Favicon is scherp zichtbaar in Google Search Console preview
- Geen broken links of 404s
