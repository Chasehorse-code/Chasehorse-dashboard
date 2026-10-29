# ChaseHorse Platform — UI/UX Audit & Revamp Plan (`UI_AUDIT.md`)

**Date:** 2026-10-29  
**Auditor:** Senior Product Designer & Frontend Architect  
**Project:** ChaseHorse — Growth Enabling Logiworkx Partner (GELP)  
**Scope:** Phase A Comprehensive Repository Audit (Read-only, no code modified)

---

## 1. Stack Detected

| Component | Detected Technology | Version / Configuration | Notes |
|---|---|---|---|
| **Framework** | React | `^18.3.1` | Client-side SPA |
| **Language** | TypeScript | `^5.4.5` | Strict mode enabled (`tsconfig.json`) |
| **Styling** | Tailwind CSS + PostCSS | `^3.4.3` | CSS variables defined for brand tokens |
| **Icons** | Lucide React | `^0.378.0` | Clean vector iconography throughout |
| **Animations** | Framer Motion | `^11.2.6` | Coordinated page transitions, layout morphs |
| **Routing** | React Router DOM | `^6.23.1` | Declarative routing with `ScrollToTop` |
| **Charts** | Recharts | `^2.12.7` | Responsive container area charts for freight index |
| **3D / Maps** | Three.js + Custom SVG | `^0.164.1` | Accurate SVG geo-projection for 6 Indian metro hubs |
| **Confetti / Feedback** | Canvas-Confetti | `^1.9.3` | Used on interactive proposal / application actions |
| **Build & Tooling** | Vite | `^5.4.21` | Configured with vendor chunk partitioning |
| **Package Manager** | npm | Windows shell | Zero installation errors |

---

## 2. Folder Map & Component Inventory

### Folder Structure
```
chasehorse--dashbord/
├── public/
│   ├── chasehorse-logo.png
│   ├── logo-icon.svg
│   ├── images/
│   │   └── README.md              (Comprehensive photo slot specs)
│   └── videos/
│       └── README.md              (3 ambient hero loop video specs)
├── src/
│   ├── app/
│   │   └── router.tsx             (Central routing with 30+ endpoints)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── LogoIntro.tsx      (5-phase cinematic logo reveal)
│   │   │   ├── SearchModal.tsx    (Global fuzzy search Ctrl+K)
│   │   │   ├── SiteFooter.tsx     (Pre-footer CTA, 6-col links, ticker)
│   │   │   └── SiteHeader.tsx     (Sticky navbar, drawer, mega-menu trigger)
│   │   ├── navigation/
│   │   │   └── MegaMenu.tsx       (project44-style 3-column mega menus)
│   │   ├── maps/
│   │   │   └── IndiaOperationsMap.tsx (SVG coordinates for 6 hub cities)
│   │   ├── shop/
│   │   │   └── CartDrawer.tsx     (Slide-out e-commerce drawer with GST)
│   │   └── ui/
│   │       ├── ChaseHorseLogo.tsx (Vector SVG with orange O & A cores)
│   │       └── EnquiryModal.tsx   (Lead booking and pilot consultation form)
│   ├── data/
│   │   ├── careers.ts             (Open logistics and tech positions)
│   │   ├── dashboard.ts           (10 enterprise client dashboard modules)
│   │   ├── discover.ts            (Courses, internships, resources, events)
│   │   ├── liveMarket.ts          (Truck specs, terminal rates, lane benchmarks)
│   │   ├── locations.ts           (6 metro hub locations and operations)
│   │   ├── navigation.ts          (Centralized navigation and mega-menu data)
│   │   ├── pricing.ts             (Demo pricing and disclaimer flags)
│   │   ├── products.ts            (Certified HSE gear, sizes, standards)
│   │   └── services.ts            (All 16 services across Tiers 1, 2, 3)
│   ├── features/
│   │   ├── auth/LoginPage.tsx
│   │   ├── careers/CareersPage.tsx
│   │   ├── dashboard/ClientDashboardPage.tsx
│   │   ├── design-solution/DesignSolutionPage.tsx
│   │   ├── discover/DiscoverPage.tsx, LocationsPage.tsx
│   │   ├── home/HomePage.tsx, HeroSection.tsx, ThreeTierSection.tsx, ...
│   │   ├── hse-shop/HseShopPage.tsx, ProductDetailPage.tsx
│   │   ├── live-market/LiveMarketOverviewPage.tsx, BookTruckPage.tsx, ...
│   │   ├── partners/PartnersPage.tsx
│   │   ├── platform/PlatformPage.tsx
│   │   ├── services/ServiceDetailPage.tsx
│   │   └── solutions/SolutionsPage.tsx, TierDetailPage.tsx
│   ├── hooks/useCart.tsx
│   ├── lib/config.ts              (Brand tokens, WhatsApp helper, stats flags)
│   ├── services/index.ts          (Typed mock API service layer)
│   ├── types/index.ts
│   ├── App.tsx
│   └── main.tsx
├── CONTENT_GAPS.md
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

### Reusable UI Primitives Needed for Standardisation
To eliminate ad-hoc Tailwind classes across components and maintain strict consistency:
- `Button` (Primary `#FF4D16`, Secondary outline, Ghost, Dark pill, WhatsApp green)
- `Card` (Rounded 16–24px, 1px border `#E2DED5`, soft shadow)
- `SectionHeader` (Eyebrow with glowing orange dot + editorial H2 + subtext)
- `Badge` (Visible "Demo", "Sample data", Tier badges)
- `Modal` (Accessible modal wrapper with backdrop blur and escape key handling)
- `Tabs` (Pill tabs with layoutId animated background)
- `FormField` (Floating or high-contrast labeled input/select/textarea)
- `Breadcrumb` (Semantic navigation breadcrumb)
- `ImageWithFallback` (Robust image loader with fallback to branded SVG placeholder)

---

## 3. Route Inventory: Current vs. Target

| Target Route (Section 11) | Current Status | Action Required |
|---|---|---|
| `/` | `Exists – restyle` | Re-align Hero and India Map side-by-side to match desktop reference mockup directly |
| `/platform` | `Exists – restyle` | Polish GELP 4-step workflow, ensure label is strictly "Platform (GELP)", heading is "Growth Enabler Logiworkx Platform (GELP)", remove "All Services" heading |
| `/solutions` | `Exists – restyle` | Add animated tier connector ("Foundation → Growth → Advanced") and "Find your starting point" selector |
| `/solutions/tier-1` | `Exists – restyle` | Verify cards and subservice badges |
| `/solutions/tier-2` | `Exists – restyle` | Verify cards and subservice badges |
| `/solutions/tier-3` | `Exists – restyle` | Verify cards and subservice badges |
| `/services/:serviceSlug` | `Exists – restyle` | Enhance 5-phase customized workflow tabs, persona cards, and deliverables |
| `/services/:serviceSlug/:subserviceSlug` | `Exists – rebuild UI` | Router exists, but `ServiceDetailPage` needs to unpack `subserviceSlug` and deep-link/focus the specific module |
| `/design-your-solution` | `Exists – restyle` | Polish 3-column sticky panel, URL query sync, disabled "Pay Now" banner |
| `/live-market` | `Exists – restyle` | Polish spot capacity cards and live intelligence banner |
| `/live-market/book-truck` | `Exists – restyle` | Distance and freight rate calculator with instant demo confirmation |
| `/live-market/terminal-space` | `Exists – restyle` | Terminal yard selector across 6 hubs |
| `/live-market/on-field-lead` | `Exists – restyle` | Vetted field supervisor dispatch demo |
| `/live-market/trip-finance` | `Exists – restyle` | Invoice discounting and working capital advance calculator |
| `/live-market/freight-index` | `Exists – restyle` | Recharts ₹/km area chart with visible "Sample data" watermark |
| `/discover` | `Exists – restyle` | Filter categories strictly to approved list: Courses, Internships, Resources, Video Guidance, About, Customers, Demo, Events, Safety, Insurance, Offers, Benefits of GELP, Service Locations, Offline HSE Stores |
| `/locations` | `Exists – restyle` | Interactive directory for 6 hub cities + SVG map view |
| `/hse-shop` | `Exists – restyle` | Prominent "Find Offline Store" + "Request On-site Store" banners, "We deploy our store and manage compliance" |
| `/hse-shop/shop` | `Exists – restyle` | Filterable catalog |
| `/hse-shop/products/:slug` | `Exists – restyle` | Gallery, size/color variant selector, specs sheet |
| `/hse-shop/cart` | `Missing – create` | Dedicated cart review view (currently points to index) |
| `/hse-shop/checkout` | `Missing – create` | Dedicated demo checkout form (strictly UI-only, no fake payment) |
| `/hse-shop/order-confirmation` | `Missing – create` | Dedicated order confirmation screen with order ID and summary |
| `/hse-shop/track-order` | `Missing – create` | Dedicated order tracking timeline view |
| `/hse-shop/request-onsite-store` | `Missing – create` | Dedicated turnkey on-site facility store request modal/view |
| `/hse-shop/offline-stores` | `Exists – restyle` | Deep-link to physical store locations |
| `/partners` | `Exists – restyle` | 3 mandated paths: On-field leads (`https://forms.gle/QmiddiuRkaRLbesEA`), Transportation professionals, Terminal space + WhatsApp group |
| `/careers` | `Exists – restyle` | Role listings, department filters, benefits |
| `/careers/:jobSlug` | `Missing – create` | Router and drawer to deep-link and view specific job posting directly |
| `/login` | `Exists – restyle` | Split-screen dark hero layout matching mockup, opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`) |
| `/account` | `Exists – restyle` | 10 client modules + Courses with progress bars |
| `/contact` | `Exists – restyle` | Operational contact desk and hub directory |
| `*` (404) | `Exists – restyle` | Designed 404 with search shortcut and quick links |

---

## 4. Gap Table vs. Requirements (Sections 2–10)

| Prompt Section | Requirement | Current Status | Files Involved | Actions Planned |
|---|---|---|---|---|
| **Phase B: Design System** | Centralised tokens (`#F4F1EA`, `#171717`, `#FF4D16`, `#FFFFFF`, `#E2DED5`, `#625E58`), display typography for headlines/wordmark, reusable primitives | **Partial** | `tailwind.config.js`, `index.html`, `src/components/ui/*` | Build standardized primitives (`Button`, `Card`, `SectionHeader`, `Badge`, `Modal`, `Tabs`, `FormField`, `Breadcrumb`, `ImageWithFallback`); enforce unified tokens. |
| **Phase C: Logo Intro** | ~3s cinematic reveal: 0.0s dot pulse → 0.4s letters draw → 1.2s O-core & A-core fill orange + ripple → 1.8s tagline → 2.4s thin line sweep → 2.8s fly-in to navbar | **Partial** | `src/components/layout/LogoIntro.tsx`, `ChaseHorseLogo.tsx` | Refine timeline keyframes to exact seconds specified; verify `sessionStorage` and reduced-motion mode. |
| **Phase D: Navigation** | project44 style: 32-40px gaps, panel morphing between items, exact Platform (GELP) structure, pinned DIY in Solutions, Discover taxonomy, Partners adjacent to Login, Login in new tab | **Partial** | `src/components/layout/SiteHeader.tsx`, `MegaMenu.tsx`, `navigation.ts` | Refine mega-menu transitions to morph without flicker, verify spacing, enforce exact naming and hierarchy. |
| **Phase E: Homepage** | Side-by-side Hero (left) + India Map (right) matching reference mockup, 3-slide auto-advance, contact avatar in WhatsApp pill, 4 stat counters with sample flag | **Partial** | `src/features/home/HomePage.tsx`, `HeroSection.tsx`, `IndiaOperationsMap.tsx` | Integrate desktop 2-column layout in HeroSection; place India map and "Live Operations Across India" floating card alongside hero text. |
| **Phase F: Three-Tier Explainer** | Animated connector ("foundation → growth → advanced"), "Find your starting point" selector directing to DIY | **Partial** | `src/features/home/ThreeTierSection.tsx`, `SolutionsPage.tsx` | Add interactive "Find your starting point" selector widget and animated SVG connector. |
| **Phase G: Service Catalogue** | 16 services, unique 5-8 step workflow timeline per service, deep-link `/services/:serviceSlug/:subserviceSlug`, term "E-way Bill Management" | **Partial** | `src/features/services/ServiceDetailPage.tsx`, `src/data/services.ts` | Enable subservice selection tabs and deep-linking; verify unique workflows for all 16 services. |
| **Phase H: India Operations Map** | Accurate coordinates (New Delhi, Mumbai, Kolkata, Hyderabad, Bengaluru, Chennai), pulsing markers, "Live Operations Across India" card with CTA to `/locations` | **Done / Partial** | `src/components/maps/IndiaOperationsMap.tsx`, `locations.ts` | Fine-tune card positioning and ensure quick switch between interactive view and locations directory. |
| **Phase I: Design Your Solution** | 3-column selector, parent indeterminate checkbox logic, sticky selected panel, sample pricing banner, disabled "Pay Now" | **Done / Partial** | `src/features/design-solution/DesignSolutionPage.tsx` | Ensure URL query parameter synchronization (`?services=...`) and localStorage sync. |
| **Phase J: Other Pages** | Dedicated HSE sub-routes (`cart`, `checkout`, `confirmation`, `track`, `request-onsite`), Careers `:jobSlug` modal, Split-screen Login, 10-module dashboard with Courses | **Partial** | `src/features/hse-shop/*`, `careers/*`, `auth/LoginPage.tsx`, `dashboard/*` | Implement dedicated views for HSE checkout, cart review, order confirmation, and deep-linked job drawer. |

---

## 5. Design Debt & Polish Items

1. **Ad-hoc Tailwind Primitives:**
   Buttons, badges, and cards currently define classes inline. Creating `src/components/ui/Button.tsx`, `Card.tsx`, `SectionHeader.tsx`, `Badge.tsx`, `Modal.tsx`, `Tabs.tsx`, `FormField.tsx`, `Breadcrumb.tsx`, and `ImageWithFallback.tsx` will unify spacing, hover states, and focus rings.
2. **Hero Section vs. Reference Mockup:**
   The reference mockup clearly pairs the Hero headline, CTAs, and stat strip on the left with the India Operations Map and prime-mover truck on the right. Placing them side-by-side on desktop (`lg:grid lg:grid-cols-12`) directly recreates the approved mockup.
3. **Subservice Deep-Linking:**
   Visiting `/services/digital-transformation/tms` should immediately focus and highlight the TMS module and its deliverables within the service view.
4. **HSE Shop Sub-routes:**
   Currently, `/hse-shop/cart`, `/checkout`, `/order-confirmation`, `/track-order`, and `/request-onsite-store` point directly to the main `HseShopPage`. Creating dedicated dedicated views/modals for each gives users a complete e-commerce experience.
5. **Image Fallbacks:**
   All image elements should utilize `ImageWithFallback` to prevent layout breaks if external media fails to load.

---

## 6. Proposed Implementation Plan (Phase by Phase)

Each phase will be executed as a distinct, reviewable step with immediate build verification (`tsc && vite build`).

### Phase B — Design System & Shared Primitives
- Create `src/components/ui/Button.tsx`, `Card.tsx`, `SectionHeader.tsx`, `Badge.tsx`, `Modal.tsx`, `Tabs.tsx`, `FormField.tsx`, `Breadcrumb.tsx`, `ImageWithFallback.tsx`.
- Standardize CSS tokens (`--ivory`, `--charcoal`, `--orange`, `--white`, `--border`, `--muted`).
- Ensure `Space Grotesk` (display) and `Plus Jakarta Sans` (body) typography rules are cleanly mapped.
- *Files touched:* `src/components/ui/*`, `index.html`.
- *Risk:* Low. Purely additive and standardizing.

### Phase C — Logo Intro Signature Polish
- Refine `src/components/layout/LogoIntro.tsx` to match the exact 0.0s → 0.4s → 1.2s → 1.8s → 2.4s → 2.8s sequence with ripple and sweep line.
- Verify `sessionStorage` flag and reduced-motion fallback.
- *Files touched:* `src/components/layout/LogoIntro.tsx`.
- *Risk:* Low.

### Phase D — Navigation & Mega-Menu (project44-style)
- Enhance `src/components/layout/SiteHeader.tsx` and `MegaMenu.tsx` with smooth morphing between tabs without closing.
- Ensure strict 32–40px item spacing, Partners immediately adjacent to Login, and Login opening in new tab.
- Enforce exact naming: "Platform (GELP)" and "Growth Enabler Logiworkx Platform (GELP)".
- *Files touched:* `SiteHeader.tsx`, `MegaMenu.tsx`, `navigation.ts`.
- *Risk:* Low.

### Phase E — Homepage Revamp (Mockup Alignment)
- Restructure `HeroSection.tsx` and `HomePage.tsx` to display the Hero content on the left (eyebrow, H1, sub, 3 buttons, 4 stats) and the India Map with the "Live Operations Across India" card on the right on desktop (`lg:grid lg:grid-cols-12`).
- Align "Our Service Tiers" horizontal tab strip and cards immediately below the hero.
- Add "Find your starting point" selector.
- *Files touched:* `HeroSection.tsx`, `HomePage.tsx`, `IndiaOperationsMap.tsx`, `ThreeTierSection.tsx`.
- *Risk:* Medium (layout restructuring). Tested across 360px, 768px, 1280px, and 1920px.

### Phase F & G — Service Catalogue & Subservice Deep-Linking
- Enhance `ServiceDetailPage.tsx` to unpack `subserviceSlug` and highlight the active subservice.
- Verify unique 5–8 step workflow timeline for each of the 16 services.
- Standardize on "E-way Bill Management".
- *Files touched:* `ServiceDetailPage.tsx`, `router.tsx`, `services.ts`.
- *Risk:* Low.

### Phase H & I — India Map & DIY Solution Selector
- Polish `DesignSolutionPage.tsx` with URL query sync (`?services=...`) and localStorage persistence.
- Ensure "Sample pricing — not final" banner is prominent and "Pay Now" is disabled with explanatory tooltip.
- *Files touched:* `DesignSolutionPage.tsx`, `pricing.ts`.
- *Risk:* Low.

### Phase J — Specialized Sub-pages (HSE Shop, Careers, Login, Dashboard)
- Create dedicated views for HSE Shop: `/hse-shop/cart`, `/checkout`, `/order-confirmation`, `/track-order`, `/request-onsite-store`.
- Enhance Careers page to handle `/careers/:jobSlug` with an automated role drawer.
- Verify Split-Screen Login and 10-module Client Dashboard with Courses progress bars.
- *Files touched:* `HseShopPage.tsx`, `src/features/hse-shop/*`, `CareersPage.tsx`, `router.tsx`.
- *Risk:* Low.

### Phase K — Quality Gates & Verification
- Execute full TypeScript verification: `tsc`.
- Execute full production build: `vite build`.
- Verify zero dead links, zero `#` hrefs, and full responsiveness.
- Update `CONTENT_GAPS.md` with client approval items.

