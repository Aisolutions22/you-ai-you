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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useT, useI18n } from "@/lib/i18n";
import heroPortrait from "@/assets/hero-ai-portrait.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "You AI — نبني شركات تعمل بالذكاء الاصطناعي · Building AI-Powered Businesses" },
      { name: "description", content: "Enterprise AI transformation for Saudi Arabia, GCC and global businesses. Grow revenue, cut costs, and scale faster with AI-powered operations, sales and customer experience." },
      { property: "og:title", content: "You AI — Building AI-Powered Businesses" },
      { property: "og:description", content: "From automation and digital transformation to AI-powered growth, sales and customer service systems." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
      {/* Atmosphere */}
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-40 -start-40 h-[620px] w-[620px] rounded-full bg-magenta/45 blur-[160px] animate-orb" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute top-20 end-[-180px] h-[520px] w-[520px] rounded-full bg-electric/35 blur-[160px] animate-orb" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ember/20 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-4 pb-10 sm:pt-6 sm:pb-14 lg:pt-8">
        {/* Content + portrait grid */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          {/* LEFT — copy */}
          <div className="relative z-10 text-start">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <SectionEyebrow>{t.hero.eyebrow}</SectionEyebrow>
            </motion.div>

            <motion.p
              dir={lang === "ar" ? "ltr" : "rtl"}
              lang={lang === "ar" ? "en" : "ar"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-display mt-3 text-lg text-mist/80 sm:text-xl"
            >
              {t.hero.headlineAr}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="font-display mt-2 text-[36px] leading-[1.02] sm:text-5xl lg:text-[60px]"
            >
              {t.hero.headlineEn1}<br />
              <span className="text-gradient italic">{t.hero.headlineEnHi}</span><br />
              {t.hero.headlineEn2}
            </motion.h1>


            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="mt-5 flex flex-wrap items-center gap-3"
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
              transition={{ duration: 0.55, delay: 0.48 }}
              className="mt-5 flex flex-wrap gap-2"
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

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {t.hero.trust.map((s) => (
                <div key={s.v} className="glass rounded-2xl p-3 text-center">
                  <div className="font-display text-xl text-gradient sm:text-2xl">{s.k}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — AI portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ y: yPortrait }}
            className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[460px] lg:h-[540px]"
          >
            {/* Glow halo */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_60%_40%,oklch(0.65_0.28_340/0.55),transparent_60%)] blur-2xl" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_70%,oklch(0.65_0.25_265/0.45),transparent_60%)] blur-2xl" />
            {/* Subtle floating ring */}
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
              className="relative h-full w-full object-contain object-center drop-shadow-[0_30px_80px_rgba(220,40,180,0.25)] rtl:-scale-x-100"
            />
          </motion.div>
        </div>

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

/* ---------------- JOURNEY ---------------- */
function Journey() {
  const t = useT();
  const [active, setActive] = useState(0);
  const A = t.journey.steps[active];
  const Icon = JOURNEY_ICONS[active];
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow={t.journey.eyebrow}
        title={<>{t.journey.title1} <span className="text-gradient italic">{t.journey.titleHi}</span> {t.journey.title2}</>}
        description={t.journey.sub}
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ol className="relative">
          <div className="absolute start-5 top-3 bottom-3 w-px bg-white/10" />
          {t.journey.steps.map((s, i) => {
            const SIcon = JOURNEY_ICONS[i];
            const isActive = i === active;
            return (
              <li key={s.k}>
                <button
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-start transition-colors ${isActive ? "bg-white/5" : "hover:bg-white/[0.03]"}`}
                >
                  <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full transition-all ${isActive ? "bg-brand shadow-glow text-primary-foreground" : "glass text-muted-foreground"}`}>
                    <SIcon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">{t.journey.stepLabel} 0{i + 1}</span>
                    <span className={`block font-display text-2xl ${isActive ? "text-foreground" : "text-mist"}`}>{s.k}</span>
                  </span>
                  <ChevronRight className={`h-4 w-4 rtl:rotate-180 transition-transform ${isActive ? "translate-x-1 rtl:-translate-x-1 text-foreground" : "text-muted-foreground"}`} />
                </button>
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-6 text-4xl">{A.k}</h3>
              <p className="mt-3 text-muted-foreground">{A.desc}</p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {t.journey.chips.map((c) => (
                  <div key={c} className="rounded-xl glass px-3 py-2 text-center text-xs text-muted-foreground">{c}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------------- ENGINES ---------------- */
function Engines() {
  const t = useT();
  return (
    <Section id="engines">
      <SectionHeading
        eyebrow={t.engines.eyebrow}
        title={<>{t.engines.title1} <span className="text-gradient italic">{t.engines.titleHi}</span>{t.engines.title2}</>}
        description={t.engines.sub}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.engines.items.map((e, i) => {
          const Icon = ENGINE_ICONS[i];
          return (
            <motion.article
              key={e.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-7 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="absolute -top-24 -end-20 h-52 w-52 rounded-full bg-magenta/20 blur-3xl transition-opacity group-hover:opacity-80" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-5 text-2xl">{e.k}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.kpis.map((k) => (
                    <span key={k} className="rounded-full glass px-3 py-1 text-xs text-foreground">{k}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- INDUSTRIES ---------------- */
function Industries() {
  const t = useT();
  const [i, setI] = useState(0);
  const A = t.industries.items[i];
  const Icon = INDUSTRY_ICONS[i];
  return (
    <Section id="industries">
      <SectionHeading
        eyebrow={t.industries.eyebrow}
        title={<>{t.industries.title1} <span className="text-gradient italic">{t.industries.titleHi}</span> {t.industries.title2}</>}
        description={t.industries.sub}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-1.5">
          {t.industries.items.map((s, idx) => {
            const SIcon = INDUSTRY_ICONS[idx];
            const isActive = idx === i;
            return (
              <button
                key={s.k}
                onClick={() => setI(idx)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? "glass-strong text-foreground" : "text-muted-foreground hover:bg-white/5"}`}
              >
                <SIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{s.k}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={A.k}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            <div className="absolute -top-20 -start-20 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-3xl">{A.k}</h3>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <Pillar title={t.industries.pillars.challenges} items={A.challenges} />
                <Pillar title={t.industries.pillars.solutions} items={A.solutions} />
                <Pillar title={t.industries.pillars.impact} items={A.impact} />
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand/10 border border-white/10 p-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.industries.pillars.expectedRoi}</div>
                  <div className="font-display text-3xl text-gradient">{A.roi}</div>
                </div>
                <LeadDialog variant="roadmap">
                  <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
                    {t.common.modelForCompany} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </LeadDialog>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

function Pillar({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-3 grid gap-2">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- ASSESSMENT ---------------- */
function Assessment() {
  const t = useT();
  const [size, setSize] = useState(t.assessment.sizes[2]);
  const [sector, setSector] = useState(t.assessment.sectors[0]);
  const [employees, setEmployees] = useState(120);
  const [challenges, setChallenges] = useState<string[]>([t.assessment.challenges[0], t.assessment.challenges[3]]);
  const [systems, setSystems] = useState<string[]>([t.assessment.systems[0]]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const scores = useMemo(() => {
    const automation = Math.min(95, 35 + challenges.length * 9 + Math.min(employees, 800) / 18);
    const growth = Math.min(96, 40 + 10 + systems.length * 5);
    const readiness = Math.min(94, 30 + systems.filter((s) => s !== t.assessment.systems[5]).length * 11 + (employees > 50 ? 18 : 8));
    const savings = Math.round(employees * 1800 * (automation / 100));
    return {
      automation: Math.round(automation),
      growth: Math.round(growth),
      readiness: Math.round(readiness),
      savings,
    };
  }, [challenges, systems, employees, t]);

  const cxRec = challenges.includes(t.assessment.challenges[2]) ? t.assessment.engineRec.cx : t.assessment.engineRec.revenue;

  return (
    <Section id="assessment">
      <SectionHeading
        eyebrow={t.assessment.eyebrow}
        title={<>{t.assessment.title1} <span className="text-gradient italic">{t.assessment.titleHi}</span> {t.assessment.title2}</>}
        description={t.assessment.sub}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
          <Field label={t.assessment.labels.size}><ChipRow value={size} onChange={setSize} options={t.assessment.sizes} /></Field>
          <Field label={t.assessment.labels.industry}><ChipRow value={sector} onChange={setSector} options={t.assessment.sectors} /></Field>
          <Field label={t.assessment.labels.employeesText(employees)}>
            <Slider min={5} max={2000} step={5} value={[employees]} onValueChange={(v) => setEmployees(v[0])} />
          </Field>
          <Field label={t.assessment.labels.challenges}>
            <div className="flex flex-wrap gap-2">
              {t.assessment.challenges.map((c) => (
                <Chip key={c} active={challenges.includes(c)} onClick={() => toggle(challenges, c, setChallenges)}>{c}</Chip>
              ))}
            </div>
          </Field>
          <Field label={t.assessment.labels.systems}>
            <div className="flex flex-wrap gap-2">
              {t.assessment.systems.map((s) => (
                <Chip key={s} active={systems.includes(s)} onClick={() => toggle(systems, s, setSystems)}>{s}</Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card relative overflow-hidden">
          <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.assessment.labels.snapshot}</div>
            <h3 className="font-display mt-2 text-3xl">{sector} · {size}</h3>
            <div className="mt-6 grid gap-4">
              <ScoreBar label={t.assessment.labels.readiness} value={scores.readiness} icon={Brain} />
              <ScoreBar label={t.assessment.labels.growth} value={scores.growth} icon={Target} />
              <ScoreBar label={t.assessment.labels.automation} value={scores.automation} icon={Zap} />
            </div>
            <div className="mt-7 rounded-2xl border border-white/10 bg-brand/10 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" /> {t.assessment.labels.savings}
              </div>
              <div className="font-display mt-1 text-4xl text-gradient">${scores.savings.toLocaleString()}</div>
              <p className="mt-2 text-xs text-muted-foreground">{t.assessment.labels.savingsHint}</p>
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.assessment.labels.recommended}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[t.assessment.engineRec.ops, cxRec, t.assessment.engineRec.content].map((r) => (
                  <span key={r} className="rounded-full glass px-3 py-1 text-xs">{r}</span>
                ))}
              </div>
            </div>
            <LeadDialog variant="strategy">
              <button type="button" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:bg-white/10">
                <Calendar className="h-4 w-4" /> {t.common.bookSession}
              </button>
            </LeadDialog>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1.5 text-xs transition-colors ${active ? "bg-brand text-primary-foreground shadow-glow" : "glass hover:bg-white/10 text-foreground"}`}>{children}</button>
  );
}
function ChipRow({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o} active={value === o} onClick={() => onChange(o)}>{o}</Chip>
      ))}
    </div>
  );
}
function ScoreBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  const t = useT();
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4 text-electric" /> {label}</span>
        <span className="font-display text-xl">{value}<span className="text-muted-foreground text-sm">{t.common.of100}</span></span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full bg-brand"
        />
      </div>
    </div>
  );
}

/* ---------------- ROI CALCULATOR ---------------- */
function ROICalculator() {
  const t = useT();
  const [employees, setEmployees] = useState(80);
  const [salary, setSalary] = useState(45000);
  const [hours, setHours] = useState(12);
  const [revenue, setRevenue] = useState(8000000);

  const results = useMemo(() => {
    const hourly = salary / (52 * 40);
    const hoursSaved = employees * hours * 0.65 * 52;
    const costSaved = Math.round(hoursSaved * hourly);
    const productivity = Math.round((hours * 0.65 / 40) * 100);
    const revenueUplift = Math.round(revenue * 0.18);
    return { hoursSaved: Math.round(hoursSaved), costSaved, productivity, revenueUplift };
  }, [employees, salary, hours, revenue]);

  return (
    <Section id="roi">
      <SectionHeading
        eyebrow={t.roi.eyebrow}
        title={<>{t.roi.title1} <span className="text-gradient italic">{t.roi.titleHi}</span> {t.roi.title2}</>}
        description={t.roi.sub}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
          <RoiSlider label={t.roi.labels.employees} value={employees} min={5} max={2000} step={5} onChange={setEmployees} />
          <RoiSlider label={t.roi.labels.salary} value={salary} prefix="$" min={10000} max={250000} step={1000} onChange={setSalary} />
          <RoiSlider label={t.roi.labels.hours} value={hours} suffix={t.roi.units.hrs} min={1} max={40} step={1} onChange={setHours} />
          <RoiSlider label={t.roi.labels.revenue} value={revenue} prefix="$" min={500000} max={500000000} step={100000} onChange={setRevenue} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label={t.roi.labels.hoursSaved} value={results.hoursSaved.toLocaleString()} accent="electric" />
          <ResultCard label={t.roi.labels.costSaved} value={`$${results.costSaved.toLocaleString()}`} accent="magenta" />
          <ResultCard label={t.roi.labels.productivity} value={`+${results.productivity}%`} accent="ember" />
          <ResultCard label={t.roi.labels.revenueUplift} value={`$${results.revenueUplift.toLocaleString()}`} accent="magenta" big />
        </div>
      </div>
    </Section>
  );
}
function RoiSlider({ label, value, min, max, step, onChange, prefix = "", suffix = "" }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; prefix?: string; suffix?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
        <span className="font-display text-2xl">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="mt-3"><Slider min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(v[0])} /></div>
    </div>
  );
}
function ResultCard({ label, value, accent, big }: { label: string; value: string; accent: "magenta" | "electric" | "ember"; big?: boolean }) {
  const glow = accent === "magenta" ? "bg-magenta/30" : accent === "electric" ? "bg-electric/30" : "bg-ember/30";
  return (
    <div className={`relative overflow-hidden rounded-3xl glass-strong p-7 shadow-card ${big ? "sm:col-span-2" : ""}`}>
      <div className={`absolute -top-20 -end-20 h-48 w-48 rounded-full ${glow} blur-3xl`} />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`font-display mt-3 ${big ? "text-6xl" : "text-4xl"} text-gradient`}>{value}</div>
      </div>
    </div>
  );
}

/* ---------------- PRODUCTS ---------------- */
function Products() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="products">
      <SectionHeading
        eyebrow={t.products.eyebrow}
        title={<>{t.products.title1} <span className="text-gradient italic">{t.products.titleHi}</span>{t.products.title2}</>}
        description={t.products.sub}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.products.items.map((p, i) => (
          <motion.button
            key={p.k}
            onClick={() => setOpen(open === i ? null : i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={`group relative overflow-hidden rounded-2xl glass-strong p-5 text-start shadow-card transition-all hover:-translate-y-1 ${open === i ? "ring-1 ring-magenta/60" : ""}`}
          >
            <div className="absolute -top-16 -end-16 h-40 w-40 rounded-full bg-electric/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-4 text-xl">{p.k}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.problem}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-electric">
                {open === i ? t.products.labels.hide : t.products.labels.view}
                <ChevronRight className={`h-3.5 w-3.5 rtl:rotate-180 transition-transform ${open === i ? "rotate-90 rtl:rotate-90" : ""}`} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            key={open}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 overflow-hidden"
          >
            <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card grid gap-6 md:grid-cols-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.products.labels.product}</div>
                <h3 className="font-display mt-2 text-3xl">{t.products.items[open].k}</h3>
              </div>
              <Pillar title={t.products.labels.problem} items={[t.products.items[open].problem]} />
              <Pillar title={t.products.labels.solution} items={[t.products.items[open].solution]} />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.products.labels.benefitsRoi}</div>
                <ul className="mt-3 grid gap-2 text-sm">
                  {t.products.items[open].benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-electric" />{b}</li>
                  ))}
                </ul>
                <div className="font-display mt-3 text-2xl text-gradient">{t.products.items[open].roi}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------------- SCENARIOS ---------------- */
function Scenarios() {
  const t = useT();
  return (
    <Section id="scenarios">
      <SectionHeading
        eyebrow={t.scenarios.eyebrow}
        title={<>{t.scenarios.title1} <span className="text-gradient italic">{t.scenarios.titleHi}</span> {t.scenarios.title2}</>}
        description={t.scenarios.sub}
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {t.scenarios.items.map((s, i) => (
          <motion.article
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7"
          >
            <div className="absolute -bottom-20 -end-16 h-52 w-52 rounded-full bg-ember/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-2xl">{s.k}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.scenarios.labels.before}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.before}</p>
                </div>
                <div className="rounded-2xl bg-brand/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-electric">{t.scenarios.labels.after}</div>
                  <p className="mt-2 text-sm">{s.after}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.deltas.map((d) => (
                  <span key={d} className="rounded-full bg-brand px-3 py-1 text-xs text-primary-foreground shadow-glow">{d}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
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
  const [cat, setCat] = useState(t.insights.categories[0]);
  const items = cat === t.insights.categories[0] ? t.insights.articles : t.insights.articles.filter((a) => a.c === cat);
  return (
    <Section id="insights">
      <SectionHeading
        eyebrow={t.insights.eyebrow}
        title={<>{t.insights.title1} <span className="text-gradient italic">{t.insights.titleHi}</span>{t.insights.title2}</>}
      />
      <div className="mt-10 flex flex-wrap gap-2">
        {t.insights.categories.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
