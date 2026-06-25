import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight, Sparkles, TrendingUp, Cog, Heart, FileText, Lightbulb,
  Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store,
  Brain, Target, Zap, DollarSign, ChevronRight, CheckCircle2, Calendar,
  FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge,
  ShieldCheck, Globe2, Database, Rocket,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading, SectionEyebrow } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "You AI — We Build AI-Powered Businesses" },
      { name: "description", content: "Enterprise AI transformation for Saudi Arabia, GCC and global businesses. Grow revenue, cut costs, and scale faster with AI-powered operations, sales and customer experience." },
      { property: "og:title", content: "You AI — Building AI-Powered Businesses" },
      { property: "og:description", content: "From automation and digital transformation to AI-powered growth, sales and customer service systems." },
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

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full bg-magenta/40 blur-[140px] animate-orb" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute -top-10 right-[-160px] h-[480px] w-[480px] rounded-full bg-electric/30 blur-[140px] animate-orb" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-ember/20 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-32 sm:pt-20 sm:pb-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center">
          <SectionEyebrow>Enterprise AI Transformation · KSA · GCC · Global</SectionEyebrow>
        </motion.div>

        <div className="mx-auto mt-8 max-w-5xl text-center">
          <motion.p
            dir="rtl"
            lang="ar"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl text-mist sm:text-4xl lg:text-5xl"
          >
            نبني شركات تعمل بالذكاء الاصطناعي
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display mt-5 text-5xl leading-[0.95] sm:text-7xl lg:text-[88px]"
          >
            Building <span className="text-gradient italic">AI-Powered</span><br /> Businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-7 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            From automation and digital transformation to AI-powered growth,
            sales and customer experience systems — engineered for the Vision 2030 era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <LeadDialog variant="roadmap">
              <button type="button" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Get Your AI Growth Roadmap
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </LeadDialog>
            <Link to="/business-engines" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:bg-white/10">
              Explore Solutions
            </Link>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { k: "+38%", v: "Avg. revenue uplift" },
            { k: "−47%", v: "Operating cost cut" },
            { k: "12wk", v: "First systems live" },
            { k: "9 sectors", v: "Production deployments" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-4 text-center">
              <div className="font-display text-3xl text-gradient">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- JOURNEY ---------------- */
const JOURNEY = [
  { k: "Discover", desc: "Map your business model, surface profit leaks, and identify AI-ready opportunities.", icon: FileSearch },
  { k: "Analyze", desc: "Quantify cost-to-serve, growth bottlenecks and automation potential by function.", icon: BarChart3 },
  { k: "Design", desc: "Architect the target operating model — AI-native processes, data and decision flows.", icon: Layers },
  { k: "Automate", desc: "Replace manual work with AI agents and orchestrated workflows across teams.", icon: Workflow },
  { k: "Integrate", desc: "Wire AI into your CRM, ERP, finance, support and supply chain — one system of record.", icon: Plug },
  { k: "Scale", desc: "Roll out across regions, BUs and channels with governance and measurable KPIs.", icon: Maximize },
  { k: "Optimize", desc: "Continuously tune models, agents and unit economics — compounding gains every quarter.", icon: Gauge },
];

function Journey() {
  const [active, setActive] = useState(0);
  const A = JOURNEY[active];
  const Icon = A.icon;
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="The Transformation Journey"
        title={<>A seven-step path to an <span className="text-gradient italic">AI-native</span> business.</>}
        description="Each step is a measurable milestone — not a slideware checkpoint."
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ol className="relative">
          <div className="absolute left-5 top-3 bottom-3 w-px bg-white/10" />
          {JOURNEY.map((s, i) => {
            const SIcon = s.icon;
            const isActive = i === active;
            return (
              <li key={s.k}>
                <button
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors ${isActive ? "bg-white/5" : "hover:bg-white/[0.03]"}`}
                >
                  <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full transition-all ${isActive ? "bg-brand shadow-glow text-primary-foreground" : "glass text-muted-foreground"}`}>
                    <SIcon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</span>
                    <span className={`block font-display text-2xl ${isActive ? "text-foreground" : "text-mist"}`}>{s.k}</span>
                  </span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? "translate-x-1 text-foreground" : "text-muted-foreground"}`} />
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
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-6 text-4xl">{A.k}</h3>
              <p className="mt-3 text-muted-foreground">{A.desc}</p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {["Outcome-led", "Measurable", "Saudi-ready"].map((t) => (
                  <div key={t} className="rounded-xl glass px-3 py-2 text-center text-xs text-muted-foreground">{t}</div>
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
const ENGINES = [
  { k: "Revenue Engine", icon: TrendingUp, desc: "AI-driven pipeline generation, lead scoring and sales execution that compounds quota attainment.", kpis: ["+34% pipeline", "+22% win rate", "−40% sales cycle"] },
  { k: "Operations Engine", icon: Cog, desc: "Automate the back office end-to-end — finance, procurement, HR and supply chain in one orchestrated layer.", kpis: ["−47% opex", "+3x throughput", "24/7 uptime"] },
  { k: "Customer Experience Engine", icon: Heart, desc: "AI agents that resolve, retain and upsell across web, WhatsApp, voice and in-store — fluent in Arabic and English.", kpis: ["−42% handle time", "+28 NPS", "92% containment"] },
  { k: "Content Engine", icon: FileText, desc: "Brand-safe content production at enterprise scale — proposals, marketing, knowledge and training.", kpis: ["10x output", "−60% cost", "Brand-locked"] },
  { k: "Innovation Engine", icon: Lightbulb, desc: "Productize new AI offerings, internal copilots and data products that open new revenue lines.", kpis: ["New SKUs", "Faster R&D", "Defensible IP"] },
];

function Engines() {
  return (
    <Section id="engines">
      <SectionHeading
        eyebrow="Business Engines"
        title={<>Five engines that turn AI into <span className="text-gradient italic">business outcomes</span>.</>}
        description="Not tools. Not chatbots. Operating engines wired into your P&L."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ENGINES.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.article
              key={e.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-7 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="absolute -top-24 -right-20 h-52 w-52 rounded-full bg-magenta/20 blur-3xl transition-opacity group-hover:opacity-80" />
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
const INDUSTRIES = [
  { k: "Legal", icon: Scale, challenges: ["Manual contract review", "Time-bound research", "Billable hour pressure"], solutions: ["AI Legal Assistant", "Contract intelligence", "Case research copilot"], impact: ["−70% drafting time", "+35% billable productivity"], roi: "3.8x in 9 months" },
  { k: "Construction", icon: Building2, challenges: ["Cost overruns", "Project visibility", "RFI bottlenecks"], solutions: ["AI project intelligence", "Automated reporting", "Procurement copilot"], impact: ["−18% project costs", "+25% on-time delivery"], roi: "4.2x in 12 months" },
  { k: "Real Estate", icon: Home, challenges: ["Slow lead follow-up", "Listing operations", "Tenant servicing"], solutions: ["AI Real Estate Assistant", "Lead nurturing agent", "Virtual sales advisor"], impact: ["+41% qualified leads", "−55% response time"], roi: "5.1x in 6 months" },
  { k: "E-commerce", icon: ShoppingBag, challenges: ["Cart abandonment", "Support volume", "Personalization at scale"], solutions: ["AI Customer Support", "Conversion copilot", "Smart merchandising"], impact: ["+28% conversion", "−45% support cost"], roi: "6.4x in 6 months" },
  { k: "Healthcare", icon: Stethoscope, challenges: ["Scheduling load", "Patient comms", "Clinical documentation"], solutions: ["AI front-desk agent", "Documentation copilot", "Patient journey automation"], impact: ["−60% admin time", "+22 patient NPS"], roi: "3.5x in 9 months" },
  { k: "Call Center", icon: PhoneCall, challenges: ["High AHT", "Agent turnover", "Quality assurance"], solutions: ["AI Call Center Agent", "Live agent assist", "Auto-QA"], impact: ["−42% AHT", "92% containment"], roi: "5.8x in 6 months" },
  { k: "Recruitment", icon: Users, challenges: ["CV overload", "Slow time-to-hire", "Candidate experience"], solutions: ["AI Recruitment Suite", "Smart screening", "Conversational sourcing"], impact: ["−63% time-to-hire", "+3x recruiter capacity"], roi: "4.7x in 6 months" },
  { k: "Content Creators", icon: PenTool, challenges: ["Production bottlenecks", "Brand consistency", "Channel velocity"], solutions: ["Content Engine", "Multi-channel publishing", "Brand-locked AI"], impact: ["10x output", "−60% cost-per-asset"], roi: "8x in 4 months" },
  { k: "SMEs", icon: Store, challenges: ["Limited staff", "Fragmented tools", "Manual ops"], solutions: ["AI Ops Bundle", "Sales + support agents", "Lightweight ERP/CRM"], impact: ["+2x capacity", "−50% admin time"], roi: "4x in 6 months" },
];

function Industries() {
  const [i, setI] = useState(0);
  const A = INDUSTRIES[i];
  const Icon = A.icon;
  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industries"
        title={<>Built for the <span className="text-gradient italic">sectors</span> driving Vision 2030.</>}
        description="Select a sector to see how we transform it."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-1.5">
          {INDUSTRIES.map((s, idx) => {
            const SIcon = s.icon;
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
            <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-3xl">{A.k}</h3>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <Pillar title="Challenges" items={A.challenges} />
                <Pillar title="Solutions" items={A.solutions} />
                <Pillar title="Business Impact" items={A.impact} />
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand/10 border border-white/10 p-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Expected ROI</div>
                  <div className="font-display text-3xl text-gradient">{A.roi}</div>
                </div>
                <Link to="/ai-assessment" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
                  Model this for my company <ArrowRight className="h-4 w-4" />
                </Link>
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
const SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];
const SECTORS = ["Legal", "Construction", "Real Estate", "E-commerce", "Healthcare", "Call Center", "Recruitment", "SMEs", "Other"];
const CHALLENGES = ["High operational cost", "Slow growth", "Customer experience", "Manual workflows", "Talent shortage", "Fragmented data"];
const SYSTEMS = ["CRM", "ERP", "Helpdesk", "Marketing automation", "Data warehouse", "None"];

function Assessment() {
  const [size, setSize] = useState(SIZES[2]);
  const [sector, setSector] = useState(SECTORS[0]);
  const [employees, setEmployees] = useState(120);
  const [challenges, setChallenges] = useState<string[]>(["High operational cost", "Manual workflows"]);
  const [systems, setSystems] = useState<string[]>(["CRM"]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const scores = useMemo(() => {
    const automation = Math.min(95, 35 + challenges.length * 9 + Math.min(employees, 800) / 18);
    const growth = Math.min(96, 40 + (sector === "E-commerce" ? 18 : 10) + systems.length * 5);
    const readiness = Math.min(94, 30 + systems.filter((s) => s !== "None").length * 11 + (employees > 50 ? 18 : 8));
    const savings = Math.round(employees * 1800 * (automation / 100));
    return {
      automation: Math.round(automation),
      growth: Math.round(growth),
      readiness: Math.round(readiness),
      savings,
    };
  }, [challenges, sector, systems, employees]);

  return (
    <Section id="assessment">
      <SectionHeading
        eyebrow="AI Opportunity Assessment"
        title={<>See your <span className="text-gradient italic">AI readiness</span> in 60 seconds.</>}
        description="Answer five questions. Get a real readiness score, growth potential and an estimated cost-savings band."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
          <Field label="Company size">
            <ChipRow value={size} onChange={setSize} options={SIZES} />
          </Field>
          <Field label="Industry">
            <ChipRow value={sector} onChange={setSector} options={SECTORS} />
          </Field>
          <Field label={`Employees: ${employees}`}>
            <Slider min={5} max={2000} step={5} value={[employees]} onValueChange={(v) => setEmployees(v[0])} />
          </Field>
          <Field label="Top business challenges">
            <div className="flex flex-wrap gap-2">
              {CHALLENGES.map((c) => (
                <Chip key={c} active={challenges.includes(c)} onClick={() => toggle(challenges, c, setChallenges)}>{c}</Chip>
              ))}
            </div>
          </Field>
          <Field label="Current systems in place">
            <div className="flex flex-wrap gap-2">
              {SYSTEMS.map((s) => (
                <Chip key={s} active={systems.includes(s)} onClick={() => toggle(systems, s, setSystems)}>{s}</Chip>
              ))}
            </div>
          </Field>
          <button
            onClick={() => setSubmitted(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow"
          >
            Calculate my AI score <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{submitted ? "Your AI snapshot" : "Live preview"}</div>
            <h3 className="font-display mt-2 text-3xl">{sector} · {size} employees</h3>
            <div className="mt-6 grid gap-4">
              <ScoreBar label="AI Readiness" value={scores.readiness} icon={Brain} />
              <ScoreBar label="Growth Potential" value={scores.growth} icon={Target} />
              <ScoreBar label="Automation Score" value={scores.automation} icon={Zap} />
            </div>
            <div className="mt-7 rounded-2xl border border-white/10 bg-brand/10 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" /> Estimated annual cost savings
              </div>
              <div className="font-display mt-1 text-4xl text-gradient">
                ${scores.savings.toLocaleString()}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Based on automation potential across your team size and challenges.</p>
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommended engines</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Operations Engine", challenges.includes("Customer experience") ? "CX Engine" : "Revenue Engine", "Content Engine"].map((r) => (
                  <span key={r} className="rounded-full glass px-3 py-1 text-xs">{r}</span>
                ))}
              </div>
            </div>
            <LeadDialog variant="strategy">
              <button type="button" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:bg-white/10">
                <Calendar className="h-4 w-4" /> Book Strategy Session
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
function ChipRow({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o} active={value === o} onClick={() => onChange(o)}>{o}</Chip>
      ))}
    </div>
  );
}
function ScoreBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4 text-electric" /> {label}</span>
        <span className="font-display text-xl">{value}<span className="text-muted-foreground text-sm">/100</span></span>
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
        eyebrow="ROI Calculator"
        title={<>Model the <span className="text-gradient italic">financial impact</span> in real time.</>}
        description="Adjust the inputs to see how AI translates to hours, cost and revenue — for your business."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
          <RoiSlider label="Employees impacted" value={employees} suffix="" min={5} max={2000} step={5} onChange={setEmployees} />
          <RoiSlider label="Avg. annual salary" value={salary} prefix="$" min={10000} max={250000} step={1000} onChange={setSalary} />
          <RoiSlider label="Hours/week on manual work" value={hours} suffix=" hrs" min={1} max={40} step={1} onChange={setHours} />
          <RoiSlider label="Current annual revenue" value={revenue} prefix="$" min={500000} max={500000000} step={100000} onChange={setRevenue} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label="Hours saved / year" value={results.hoursSaved.toLocaleString()} accent="electric" />
          <ResultCard label="Cost reduction / year" value={`$${results.costSaved.toLocaleString()}`} accent="magenta" />
          <ResultCard label="Productivity uplift" value={`+${results.productivity}%`} accent="ember" />
          <ResultCard label="Projected revenue growth" value={`$${results.revenueUplift.toLocaleString()}`} accent="magenta" big />
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
      <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full ${glow} blur-3xl`} />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`font-display mt-3 ${big ? "text-6xl" : "text-4xl"} text-gradient`}>{value}</div>
      </div>
    </div>
  );
}

/* ---------------- PRODUCTS ---------------- */
const PRODUCTS = [
  { k: "AI CV Builder", problem: "Candidates send weak, inconsistent CVs.", solution: "Generates role-specific, ATS-ready CVs.", benefits: ["Higher interview rate", "Brand-consistent format"], roi: "+3x interview hit-rate" },
  { k: "AI Recruitment Suite", problem: "Recruiters drown in unscreened CVs.", solution: "Auto-screens, ranks and engages candidates.", benefits: ["−63% time-to-hire", "+3x recruiter capacity"], roi: "4.7x in 6 months" },
  { k: "AI Sales Assistant", problem: "Reps spend more time in CRM than selling.", solution: "Drafts emails, briefs meetings, updates CRM.", benefits: ["+22% win rate", "+18 selling hrs/wk"], roi: "5.6x in 6 months" },
  { k: "AI Customer Support Agent", problem: "Support is expensive and slow.", solution: "Resolves 80%+ of tickets across channels.", benefits: ["−45% cost", "+28 CSAT"], roi: "6.1x in 4 months" },
  { k: "AI Call Center Agent", problem: "Voice ops are stuck on headcount.", solution: "AR/EN voice agent — 24/7 inbound + outbound.", benefits: ["−42% AHT", "92% containment"], roi: "5.8x in 6 months" },
  { k: "AI Legal Assistant", problem: "Drafting and review consume billable hours.", solution: "Drafts, reviews, redlines and researches.", benefits: ["−70% drafting time", "+35% productivity"], roi: "3.8x in 9 months" },
  { k: "AI Real Estate Assistant", problem: "Leads decay before agents respond.", solution: "Qualifies, schedules and nurtures 24/7.", benefits: ["+41% qualified leads", "−55% response time"], roi: "5.1x in 6 months" },
  { k: "AI Knowledge Base", problem: "Internal knowledge is locked in heads & PDFs.", solution: "One AI-native answer layer across the company.", benefits: ["+50% staff productivity", "Faster onboarding"], roi: "4x in 6 months" },
];

function Products() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="AI Products"
        title={<>Enterprise-ready <span className="text-gradient italic">AI products</span>, deployable in weeks.</>}
        description="Pre-built, customizable and integrated into your stack — not science projects."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p, i) => (
          <motion.button
            key={p.k}
            onClick={() => setOpen(open === i ? null : i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={`group relative overflow-hidden rounded-2xl glass-strong p-5 text-left shadow-card transition-all hover:-translate-y-1 ${open === i ? "ring-1 ring-magenta/60" : ""}`}
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-electric/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-4 text-xl">{p.k}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.problem}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-electric">
                {open === i ? "Hide details" : "View details"} <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open === i ? "rotate-90" : ""}`} />
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
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Product</div>
                <h3 className="font-display mt-2 text-3xl">{PRODUCTS[open].k}</h3>
              </div>
              <Pillar title="Business Problem" items={[PRODUCTS[open].problem]} />
              <Pillar title="Solution" items={[PRODUCTS[open].solution]} />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Benefits & ROI</div>
                <ul className="mt-3 grid gap-2 text-sm">
                  {PRODUCTS[open].benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-electric" />{b}</li>
                  ))}
                </ul>
                <div className="font-display mt-3 text-2xl text-gradient">{PRODUCTS[open].roi}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------------- SCENARIOS ---------------- */
const SCENARIOS = [
  { k: "Construction", before: "Project reports compiled manually across 14 sites, 3-day lag, recurring overruns.", after: "Real-time AI project intelligence dashboard, daily variance alerts, fewer overruns.", deltas: ["−18% project cost", "+25% on-time delivery"] },
  { k: "Legal", before: "Associates spend 60% of week drafting and reviewing contracts.", after: "AI Legal Assistant drafts, redlines and researches — partners focus on counsel.", deltas: ["−70% drafting time", "+35% billables"] },
  { k: "E-commerce", before: "Support team buried, cart abandonment at 71%, lost weekend revenue.", after: "AI agents handle 80% of tickets and proactively recover carts 24/7.", deltas: ["+28% conversion", "−45% support cost"] },
  { k: "Call Center", before: "200 agents, 6:30 AHT, 18% turnover, QA covers 2% of calls.", after: "AI agent handles routine calls, copilots assist live, auto-QA covers 100%.", deltas: ["−42% AHT", "92% containment"] },
  { k: "Healthcare", before: "Front desk overloaded, no-shows at 22%, documentation eats clinical time.", after: "AI front-desk + documentation copilot — clinicians see more patients, better notes.", deltas: ["−60% admin time", "+22 patient NPS"] },
];
function Scenarios() {
  return (
    <Section id="scenarios">
      <SectionHeading
        eyebrow="Transformation Scenarios"
        title={<>Before. After. <span className="text-gradient italic">Measured.</span></>}
        description="Real-world transformation patterns we deploy across sectors."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {SCENARIOS.map((s, i) => (
          <motion.article
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7"
          >
            <div className="absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-ember/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-2xl">{s.k}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Before</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.before}</p>
                </div>
                <div className="rounded-2xl bg-brand/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-electric">After You AI</div>
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
const WHY = [
  { k: "Saudi market understanding", icon: Globe2, d: "Bilingual AR/EN delivery, local regulation literacy, on-the-ground transformation teams." },
  { k: "Business-focused implementation", icon: Target, d: "Every initiative tied to a P&L outcome and a KPI your CFO recognizes." },
  { k: "Data privacy & sovereignty", icon: ShieldCheck, d: "In-Kingdom data residency options, PDPL-aligned architecture, enterprise-grade controls." },
  { k: "Scalable architecture", icon: Database, d: "Modular AI services that scale from pilot to nationwide rollout without re-platforming." },
  { k: "AI adoption strategy", icon: Brain, d: "Change management, training and adoption playbooks for executives and frontline alike." },
  { k: "Vision 2030 alignment", icon: Rocket, d: "Programs mapped to NTP, Saudi Vision 2030 and sector-level digital agendas." },
  { k: "Operational excellence", icon: Gauge, d: "Lean operating models, automation-first design and continuous performance tuning." },
];
function WhySaudi() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why Saudi Companies Choose You AI"
        title={<>A transformation partner built for <span className="text-gradient italic">Vision 2030</span>.</>}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map((w, i) => {
          const Icon = w.icon;
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
const CATEGORIES = ["All", "AI", "Automation", "Digital Transformation", "CRM", "ERP", "Customer Experience", "Saudi Business Growth"];
const ARTICLES = [
  { c: "AI", t: "The AI-Powered CFO: rebuilding the finance operating model", r: "8 min read" },
  { c: "Automation", t: "When to automate, when to redesign — a framework for the C-suite", r: "6 min read" },
  { c: "Digital Transformation", t: "Why most digital transformation programs fail in year two", r: "10 min read" },
  { c: "CRM", t: "From CRM as a database to CRM as a revenue engine", r: "7 min read" },
  { c: "ERP", t: "Composable ERP: making your back office AI-ready", r: "9 min read" },
  { c: "Customer Experience", t: "Designing CX agents your CMO will actually trust", r: "5 min read" },
  { c: "Saudi Business Growth", t: "Vision 2030 playbook: AI-led growth for Saudi enterprises", r: "12 min read" },
  { c: "AI", t: "Buy, build or orchestrate: the AI capability decision", r: "6 min read" },
  { c: "Saudi Business Growth", t: "The Riyadh advantage: scaling AI ops in the GCC", r: "7 min read" },
];
function Insights() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.c === cat);
  return (
    <Section id="insights">
      <SectionHeading
        eyebrow="Insights"
        title={<>Executive perspectives on <span className="text-gradient italic">AI-led growth</span>.</>}
      />
      <div className="mt-10 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
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
              <span>{a.r}</span>
              <span className="inline-flex items-center gap-1 text-foreground/80 group-hover:text-foreground">Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <Section id="cta" className="!py-32">
      <div className="relative overflow-hidden rounded-[2rem] glass-strong shadow-glow p-10 sm:p-16 text-center">
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-magenta/40 blur-3xl animate-orb" />
        <div className="absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-electric/30 blur-3xl animate-orb" />
        <div className="relative">
          <SectionEyebrow>Executive Strategy Session</SectionEyebrow>
          <h2 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            Ready to build an <span className="text-gradient italic">AI-powered business?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            90-minute working session with our senior partners. Walk out with a transformation
            roadmap, an opportunity map and a phased ROI plan — tailored to your business.
          </p>
          <LeadDialog variant="strategy">
            <button type="button" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              <Calendar className="h-4 w-4" /> Book Executive Strategy Session
            </button>
          </LeadDialog>
        </div>
      </div>
    </Section>
  );
}
