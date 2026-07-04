import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight, Sparkles, TrendingUp, Cog, Heart, FileText, Lightbulb,
  Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store,
  Brain, Target, Zap, DollarSign, ChevronRight, ChevronLeft, CheckCircle2, Calendar,
  FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge,
  ShieldCheck, Globe2, Database, Rocket, X, AlertTriangle,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading, SectionEyebrow } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { WhatsAppCTA } from "@/components/site/WhatsAppConfirmDialog";
import { type WAPayload } from "@/lib/whatsapp";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useT, useI18n } from "@/lib/i18n";
import heroPortrait from "@/assets/hero-ai-portrait.webp";
import heroPortraitSm from "@/assets/hero-ai-portrait-sm.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "You AI — نبني شركات تعمل بالذكاء الاصطناعي · Building AI-Powered Businesses" },
      { name: "description", content: "Enterprise AI transformation for Saudi Arabia, GCC and global businesses. Grow revenue, cut costs, and scale faster with AI-powered operations, sales and customer experience." },
      { property: "og:title", content: "You AI — Building AI-Powered Businesses" },
      { property: "og:description", content: "From automation and digital transformation to AI-powered growth, sales and customer service systems." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroPortraitSm, fetchpriority: "high", media: "(max-width: 1023px)" },
      { rel: "preload", as: "image", href: heroPortrait, fetchpriority: "high", media: "(min-width: 1024px)" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Journey />
      <Engines />
      <Industries />
      <Assessment />
      <ROICalculator />
      <Products />
      <Scenarios />
      <WhySaudi />
      <Insights />
      <FinalCTA />
    </SiteLayout>
  );
}

const JOURNEY_ICONS = [FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge];
const ENGINE_ICONS = [TrendingUp, Cog, Heart, FileText, Lightbulb];
const INDUSTRY_ICONS = [Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store];
const WHY_ICONS = [Globe2, Target, ShieldCheck, Database, Brain, Rocket, Gauge];

/* ---------------- HERO ---------------- */
function Hero() {
  const t = useT();
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const industries = t.industries.items;
  const active = openIdx != null ? industries[openIdx] : null;
  const ActiveIcon = openIdx != null ? INDUSTRY_ICONS[openIdx] : null;

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      {/* Atmosphere — heavy blur/animation hidden on mobile for perf */}
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-40 -start-40 hidden h-[620px] w-[620px] rounded-full bg-magenta/45 blur-[160px] animate-orb sm:block" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute top-20 end-[-180px] hidden h-[520px] w-[520px] rounded-full bg-electric/35 blur-[160px] animate-orb sm:block" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ember/20 blur-[180px] sm:block" />

      {/* Desktop depth: heavily blurred silhouette behind the content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <img
          src={heroPortrait}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute left-[42%] top-1/2 h-[120%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12] blur-[26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      </div>

      {/* Mobile-only atmospheric AI portrait background — lighter blur, smaller asset */}
      <div aria-hidden className="pointer-events-none absolute inset-0 lg:hidden">
        <img
          src={heroPortraitSm}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="absolute left-1/2 top-1/2 h-[110%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain object-center opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
      </div>


      <div className="relative mx-auto max-w-7xl px-6 pt-2 pb-6 sm:pt-4 sm:pb-10 lg:pt-6">
        {/* Content + portrait grid */}
        <div className="grid items-center gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* LEFT — copy */}
          <div className="relative z-10">
            {/* Eyebrow — centered above headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <SectionEyebrow>{t.hero.eyebrow}</SectionEyebrow>

            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display mt-3 text-center text-[28px] leading-[1.05] tracking-tight text-balance sm:text-[36px] lg:text-start lg:text-[48px]"
            >
              {t.hero.headlineEn1}{" "}
              <span className="text-gradient">{t.hero.headlineEnHi}</span>{" "}
              {t.hero.headlineEn2}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base lg:mx-0 lg:text-start"
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >

              <LeadDialog variant="roadmap">
                <button type="button" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
                  {t.hero.cta1}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </LeadDialog>
              <a href="#engines" className="group inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:bg-white/10">
                {t.hero.cta2}
                <ChevronRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Outcome badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42 }}
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {t.hero.outcomeBadges.map((b, i) => {
                const Icon = [TrendingUp, DollarSign, Zap][i] ?? Sparkles;
                return (
                  <span key={b} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/90">
                    <Icon className="h-3.5 w-3.5 text-electric" /> {b}
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — AI portrait (smaller, guides eye toward content) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ y: yPortrait }}
            className="relative mx-auto hidden h-[340px] w-full max-w-[420px] lg:block lg:h-[460px]"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_60%_40%,oklch(0.65_0.28_340/0.45),transparent_60%)] blur-2xl" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_70%,oklch(0.65_0.25_265/0.4),transparent_60%)] blur-2xl" />
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="absolute inset-6 rounded-full border border-white/5"
            />
            <img
              src={heroPortrait}
              alt="AI-powered transformation"
              width={1024}
              height={1536}
              fetchPriority="high"
              decoding="async"
              className="relative h-full w-full object-contain object-center drop-shadow-[0_30px_80px_rgba(220,40,180,0.25)] ltr:-scale-x-100"
            />
          </motion.div>
        </div>

        {/* Trust stats — full width below hero content */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {t.hero.trust.map((s) => (
            <div key={s.v} className="glass rounded-2xl p-3 text-center">
              <div className="font-display text-xl text-gradient sm:text-2xl">{s.k}</div>
              <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>


        {/* INDUSTRY CARDS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative mt-10 sm:mt-14"
        >

          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.hero.industryStripTitle}</div>
              <div className="mt-1 max-w-xl text-sm text-foreground/80">{t.hero.industryStripSub}</div>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label="scroll previous"
                onClick={() => scrollBy(-1)}
                className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                aria-label="scroll next"
                onClick={() => scrollBy(1)}
                className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {industries.map((s, idx) => {
              const SIcon = INDUSTRY_ICONS[idx];
              const isHover = hoverIdx === idx;
              return (
                <motion.button
                  key={s.k}
                  type="button"
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx((h) => (h === idx ? null : h))}
                  onFocus={() => setHoverIdx(idx)}
                  onBlur={() => setHoverIdx((h) => (h === idx ? null : h))}
                  onClick={() => setOpenIdx(idx)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl glass-strong p-5 text-start shadow-card focus:outline-none focus:ring-2 focus:ring-electric/60"
                  aria-label={`${s.k} — ${t.hero.tapHint}`}
                >
                  <div className="absolute -top-16 -end-12 h-32 w-32 rounded-full bg-magenta/25 blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/90 shadow-glow">
                      <SIcon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="mt-4 font-display text-lg leading-tight">{s.k}</div>

                    {/* Hover-reveal: business challenge */}
                    <div className="relative mt-2 h-[64px] overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        {isHover ? (
                          <motion.div
                            key="challenge"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                            className="absolute inset-0"
                          >
                            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ember">
                              <AlertTriangle className="h-3 w-3" /> {t.industries.pillars.challenges}
                            </div>
                            <ul className="mt-1 space-y-0.5 text-xs text-foreground/90">
                              {s.challenges.slice(0, 2).map((c) => (
                                <li key={c} className="truncate">· {c}</li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : (
                          <motion.p
                            key="short"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                            className="absolute inset-0 text-xs leading-snug text-muted-foreground line-clamp-3"
                          >
                            {s.short}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-electric/90">{t.hero.tapHint}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-electric rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* INDUSTRY SOLUTION PANEL */}
      <Dialog open={openIdx != null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-3xl border-white/10 bg-background/95 p-0 backdrop-blur-xl">
          {active && ActiveIcon && (
            <div className="relative overflow-hidden rounded-lg">
              <div className="pointer-events-none absolute -top-24 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -start-20 h-60 w-60 rounded-full bg-electric/25 blur-3xl" />
              <div className="relative p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                    <ActiveIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <DialogTitle className="font-display text-2xl sm:text-3xl">{active.k}</DialogTitle>
                    <DialogDescription className="mt-1 text-sm text-muted-foreground">{active.short}</DialogDescription>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-3">
                  <PanelBlock title={t.industries.pillars.challenges} items={active.challenges} tone="ember" />
                  <PanelBlock title={t.industries.pillars.solutions} items={active.solutions} tone="electric" />
                  <PanelBlock title={t.industries.pillars.impact} items={active.impact} tone="magenta" />
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-brand/10 p-5">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.industries.pillars.expectedRoi}</div>
                    <div className="font-display text-2xl text-gradient sm:text-3xl">{active.roi}</div>
                  </div>
                  <LeadDialog variant="roadmap">
                    <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
                      {t.hero.panelCtaPrimary} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </LeadDialog>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PanelBlock({ title, items, tone }: { title: string; items: string[]; tone: "ember" | "electric" | "magenta" }) {
  const dotClass = tone === "ember" ? "bg-ember" : tone === "electric" ? "bg-electric" : "bg-magenta";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-2 text-sm">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- TEASER HELPERS ---------------- */
import { Link } from "@tanstack/react-router";

function TeaserCTA({ to, label }: { to: any; label: string }) {
  return (
    <div className="mt-10 flex justify-center">
      <Link
        to={to}
        className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
      >
        {label}
        <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </Link>
    </div>
  );
}

/* ---------------- JOURNEY (teaser: 3/7) ---------------- */
function Journey() {
  const t = useT();
  const steps = t.journey.steps.slice(0, 3);
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow={t.journey.eyebrow}
        title={<>{t.journey.title1} <span className="text-gradient italic">{t.journey.titleHi}</span> {t.journey.title2}</>}
        description={t.journey.sub}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = JOURNEY_ICONS[i];
          return (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute -top-16 -end-12 h-32 w-32 rounded-full bg-magenta/25 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.journey.stepLabel} 0{i + 1}</div>
                <div className="mt-3 grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-4 text-2xl">{s.k}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <TeaserCTA to="/transformation-journey" label={t.common.exploreProgram} />
    </Section>
  );
}

/* ---------------- ENGINES (teaser: icons) ---------------- */
function Engines() {
  const t = useT();
  return (
    <Section id="engines">
      <SectionHeading
        eyebrow={t.engines.eyebrow}
        title={<>{t.engines.title1} <span className="text-gradient italic">{t.engines.titleHi}</span>{t.engines.title2}</>}
        description={t.engines.sub}
      />
      <div className="mt-14 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {t.engines.items.map((e, i) => {
          const Icon = ENGINE_ICONS[i];
          return (
            <motion.div
              key={e.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-strong rounded-2xl p-5 text-center shadow-card hover:-translate-y-1 transition-transform"
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="font-display mt-4 text-base leading-tight">{e.k}</div>
            </motion.div>
          );
        })}
      </div>
      <TeaserCTA to="/business-engines" label={t.common.modelImpact} />
    </Section>
  );
}

/* ---------------- INDUSTRIES (teaser: icons) ---------------- */
function Industries() {
  const t = useT();
  return (
    <Section id="industries">
      <SectionHeading
        eyebrow={t.industries.eyebrow}
        title={<>{t.industries.title1} <span className="text-gradient italic">{t.industries.titleHi}</span> {t.industries.title2}</>}
        description={t.industries.sub}
      />
      <div className="mt-14 grid gap-3 grid-cols-3 sm:grid-cols-3 lg:grid-cols-9">
        {t.industries.items.map((s, i) => {
          const Icon = INDUSTRY_ICONS[i];
          return (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
            >
              <Icon className="mx-auto h-6 w-6 text-electric" />
              <div className="mt-2 text-xs leading-tight text-foreground/90">{s.k}</div>
            </motion.div>
          );
        })}
      </div>
      <TeaserCTA to="/industries" label={t.common.exploreProgram} />
    </Section>
  );
}

/* ---------------- ASSESSMENT (teaser: CTA card) ---------------- */
function Assessment() {
  const t = useT();
  return (
    <Section id="assessment">
      <SectionHeading
        eyebrow={t.assessment.eyebrow}
        title={<>{t.assessment.title1} <span className="text-gradient italic">{t.assessment.titleHi}</span> {t.assessment.title2}</>}
        description={t.assessment.sub}
      />
      <div className="mt-14">
        <div className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center">
          <div className="absolute -top-24 -start-16 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
          <div className="absolute -bottom-24 -end-16 h-60 w-60 rounded-full bg-electric/25 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand shadow-glow">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display mt-6 text-3xl sm:text-4xl">{t.assessment.title1} <span className="text-gradient italic">{t.assessment.titleHi}</span></h3>
            <p className="mt-4 text-muted-foreground">{t.assessment.sub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[t.assessment.labels.readiness, t.assessment.labels.growth, t.assessment.labels.automation, t.assessment.labels.savings].map((l) => (
                <span key={l} className="rounded-full glass px-3 py-1.5 text-xs">{l}</span>
              ))}
            </div>
            <Link
              to="/ai-assessment"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Calendar className="h-4 w-4" /> {t.cta.bookExecutive}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- ROI (teaser: one number) ---------------- */
function ROICalculator() {
  const t = useT();
  return (
    <Section id="roi">
      <SectionHeading
        eyebrow={t.roi.eyebrow}
        title={<>{t.roi.title1} <span className="text-gradient italic">{t.roi.titleHi}</span> {t.roi.title2}</>}
        description={t.roi.sub}
      />
      <div className="mt-14">
        <div className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center">
          <div className="absolute -top-24 -start-16 h-60 w-60 rounded-full bg-ember/25 blur-3xl" />
          <div className="absolute -bottom-24 -end-16 h-60 w-60 rounded-full bg-magenta/25 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.roi.labels.revenueUplift}</div>
            <div className="font-display mt-4 text-6xl sm:text-7xl lg:text-8xl text-gradient">+18%</div>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">{t.roi.sub}</p>
            <Link
              to="/roi-calculator"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              <DollarSign className="h-4 w-4" /> {t.cta.customQuote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- PRODUCTS (teaser: 3/8) ---------------- */
function Products() {
  const t = useT();
  const items = t.products.items.slice(0, 3);
  return (
    <Section id="products">
      <SectionHeading
        eyebrow={t.products.eyebrow}
        title={<>{t.products.title1} <span className="text-gradient italic">{t.products.titleHi}</span>{t.products.title2}</>}
        description={t.products.sub}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <motion.div
            key={p.k}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl glass-strong p-6 shadow-card hover:-translate-y-1 transition-transform"
          >
            <div className="absolute -top-16 -end-16 h-40 w-40 rounded-full bg-electric/20 blur-3xl" />
            <div className="relative">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-4 text-xl">{p.k}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.problem}</p>
              <div className="font-display mt-4 text-lg text-gradient">{p.roi}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <TeaserCTA to="/ai-products" label={t.common.exploreProgram} />
    </Section>
  );
}

/* ---------------- SCENARIOS (teaser: 1/5) ---------------- */
function Scenarios() {
  const t = useT();
  const s = t.scenarios.items[0];
  return (
    <Section id="scenarios">
      <SectionHeading
        eyebrow={t.scenarios.eyebrow}
        title={<>{t.scenarios.title1} <span className="text-gradient italic">{t.scenarios.titleHi}</span> {t.scenarios.title2}</>}
        description={t.scenarios.sub}
      />
      <div className="mt-14">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="absolute -bottom-20 -end-16 h-60 w-60 rounded-full bg-ember/20 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-3xl">{s.k}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.scenarios.labels.before}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.before}</p>
              </div>
              <div className="rounded-2xl bg-brand/10 border border-white/10 p-5">
                <div className="text-xs uppercase tracking-widest text-electric">{t.scenarios.labels.after}</div>
                <p className="mt-2 text-sm">{s.after}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.deltas.map((d) => (
                <span key={d} className="rounded-full bg-brand px-3 py-1 text-xs text-primary-foreground shadow-glow">{d}</span>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
      <TeaserCTA to="/transformation-stories" label={t.common.exploreProgram} />
    </Section>
  );
}


/* ---------------- WHY SAUDI ---------------- */
function WhySaudi() {
  const t = useT();
  return (
    <Section id="why">
      <SectionHeading
        eyebrow={t.why.eyebrow}
        title={<>{t.why.title1} <span className="text-gradient italic">{t.why.titleHi}</span>{t.why.title2}</>}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.why.items.map((w, i) => {
          const Icon = WHY_ICONS[i];
          return (
            <motion.div
              key={w.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <Icon className="h-5 w-5 text-electric" />
              <h3 className="font-display mt-4 text-xl">{w.k}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- INSIGHTS ---------------- */
function Insights() {
  const t = useT();
  const items = t.insights.articles.slice(0, 3);
  return (
    <Section id="insights">
      <SectionHeading
        eyebrow={t.insights.eyebrow}
        title={<>{t.insights.title1} <span className="text-gradient italic">{t.insights.titleHi}</span>{t.insights.title2}</>}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <motion.article
            key={a.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group glass-strong shadow-card rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <div className="text-xs uppercase tracking-widest text-electric">{a.c}</div>
            <h3 className="font-display mt-3 text-2xl leading-tight">{a.t}</h3>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>{a.r} {t.insights.minRead}</span>
              <span className="inline-flex items-center gap-1 text-foreground/80 group-hover:text-foreground">
                {t.insights.read} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      <TeaserCTA to="/insights" label={t.common.exploreProgram} />
    </Section>
  );
}


/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  const t = useT();
  return (
    <Section id="cta" className="!py-32">
      <div className="relative overflow-hidden rounded-[2rem] glass-strong shadow-glow p-10 sm:p-16 text-center">
        <div className="absolute -top-32 -start-20 h-72 w-72 rounded-full bg-magenta/40 blur-3xl animate-orb" />
        <div className="absolute -bottom-32 -end-10 h-80 w-80 rounded-full bg-electric/30 blur-3xl animate-orb" />
        <div className="relative">
          <SectionEyebrow>{t.finalCta.eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            {t.finalCta.title1} <span className="text-gradient italic">{t.finalCta.titleHi}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t.finalCta.sub}</p>
          <LeadDialog variant="strategy">
            <button type="button" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              <Calendar className="h-4 w-4" /> {t.finalCta.button}
            </button>
          </LeadDialog>
        </div>
      </div>
    </Section>
  );
}
