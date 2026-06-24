
# You AI — Enterprise AI Transformation Website

A premium, multi-route TanStack Start site positioned as an AI-powered business transformation firm (not an AI agency or chatbot vendor). Outcome-led messaging, Saudi/GCC focus, enterprise SaaS visual quality.

## Visual Direction

- **Palette**: Deep magenta → violet gradients, electric blue highlights, orange-red glow accents on a near-black futuristic base. Glassmorphism cards, subtle grid/noise textures, soft animated gradient orbs.
- **Typography**: Display serif/grotesk pairing — `Instrument Serif` for headlines + `Inter` for body (or `Space Grotesk` + `Inter`). Large editorial type, generous spacing.
- **Motion**: Framer Motion — staggered reveals, magnetic CTAs, scroll-linked parallax on hero/orbs, animated number counters, smooth tab transitions.
- **Tokens**: All colors, gradients, and shadows defined as semantic tokens in `src/styles.css` (`--brand-magenta`, `--brand-electric`, `--brand-ember`, `--gradient-hero`, `--shadow-glow`, etc.). No hardcoded color classes in components.
- **Language**: English-first with Arabic headline pairing in the hero (RTL-aware for that block).

## Site Architecture (Routes)

```text
/                  Home (11 sections below)
/business-engines  Detailed engine breakdowns
/industries        Sector deep-dives with selector
/ai-products       Product catalog with detail drawers
/ai-assessment     Multi-step assessment + scored output
/insights          Executive thought-leadership index
/about             Company story, Vision 2030 alignment
/contact           Booking form + offices
```

Top nav: Home · Business Engines · Industries · AI Products · AI Assessment · Insights · About · Contact. Primary CTA button: **Get Your AI Growth Roadmap**. Sticky glass header with scroll-shrink.

## Homepage Sections

1. **Hero** — Bilingual headline (AR + EN), subheadline, dual CTA, animated gradient orbs, subtle 3D grid, trust strip ("Trusted across KSA, GCC & global enterprises").
2. **AI Transformation Journey** — Horizontal interactive roadmap with 7 stops (Discover → Optimize). Click a stop to reveal outcomes panel.
3. **Business Engines** — 5 glass cards (Revenue, Operations, CX, Content, Innovation) with outcomes + KPI chips (e.g. "+34% pipeline", "−42% handle time").
4. **Industries** — Left rail sector selector (Legal, Construction, Real Estate, E-commerce, Healthcare, Call Center, Recruitment, Content Creators, SMEs). Right pane animates: Challenges / Solutions / Business Impact / Expected ROI.
5. **AI Opportunity Assessment** — Inline 4-step wizard (size, industry, employees, challenges, current systems). Computes AI Readiness, Growth Potential, Automation scores, estimated cost savings, recommended solutions. Local calculation, no backend.
6. **ROI Calculator** — Sliders for headcount, avg salary, hours/week on manual work, current revenue. Outputs time saved, cost reduction, productivity uplift, projected revenue gain with animated bars and counters.
7. **AI Products** — Grid of 8 enterprise products (CV Builder, Recruitment Suite, Sales Assistant, Customer Support, Call Center, Legal, Real Estate, Knowledge Base). Each opens a detail sheet (Problem / Solution / Benefits / ROI).
8. **Transformation Scenarios** — Before/After slider cards across 5 industries with measurable deltas.
9. **Why Saudi Companies Choose You AI** — 7 pillar cards including Vision 2030 alignment, data privacy, scalable architecture.
10. **Insights** — Editorial card grid with category filters (AI, Automation, Digital Transformation, CRM, ERP, CX, Saudi Growth). Mock executive articles.
11. **Final CTA** — Full-bleed gradient section, "Ready To Build An AI-Powered Business?", primary button "Book Executive Strategy Session".

**Footer**: brand blurb, quick links, contact (Riyadh address, email, phone), LinkedIn + X, copyright.

## Interactive Logic (frontend only)

- **Assessment scoring**: weighted formula across answers → three 0-100 scores + a savings band + 3 recommended engines.
- **ROI calculator**: `hours_saved = employees × hours_week × automation_pct × 52`; `cost_saved = hours_saved × hourly_rate`; revenue uplift = `current_revenue × growth_pct`.
- All state local (`useState` / `useMemo`); no persistence, no backend.

## Technical Notes

- TanStack Start file-based routes under `src/routes/`. Each route has its own `head()` (title, description, OG tags).
- Shared components in `src/components/` (Navbar, Footer, GradientOrb, GlassCard, SectionHeading, StatCounter, EngineCard, IndustrySelector, AssessmentWizard, ROICalculator, ProductGrid, BeforeAfterSlider).
- Fonts loaded via `<link>` in `src/routes/__root.tsx` head; family names registered in `@theme` in `src/styles.css`.
- All gradients/shadows/colors as CSS tokens; shadcn components extended via variants (e.g. `Button` variant `premium`, `ghostGlass`).
- Framer Motion already installed from earlier turn — reused throughout.
- No Lovable Cloud needed (no auth, no DB, no email sending in scope).

## Out of Scope (this build)

- Real CMS for Insights (cards are static mock content).
- Form submissions to a backend / CRM — Contact + assessment send to a success state only.
- Actual Arabic translation of body copy beyond the hero pairing.

Confirm and I'll build it.
