import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { TrendingUp, Cog, Heart, FileText, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/business-engines")({
  head: () => ({
    meta: [
      { title: "Business Engines — You AI" },
      { name: "description", content: "Revenue, Operations, Customer Experience, Content and Innovation engines — the AI-powered systems that move your P&L." },
      { property: "og:title", content: "Business Engines — You AI" },
      { property: "og:description", content: "Five AI engines, wired into your P&L." },
    ],
  }),
  component: EnginesPage,
});

const ENGINES = [
  { k: "Revenue Engine", icon: TrendingUp, tag: "Sales · Marketing · Growth", desc: "An AI-powered pipeline machine — from intent capture through deal close.", outcomes: ["AI lead scoring & routing", "Conversational sales agents", "Auto-generated proposals", "CRM hygiene on autopilot"], kpis: ["+34% pipeline", "+22% win rate", "−40% sales cycle"] },
  { k: "Operations Engine", icon: Cog, tag: "Finance · HR · Supply chain", desc: "Replace manual back-office work with orchestrated AI workflows.", outcomes: ["AP/AR automation", "Procurement copilots", "HR ops agents", "Supply chain intelligence"], kpis: ["−47% opex", "+3x throughput", "24/7 uptime"] },
  { k: "Customer Experience Engine", icon: Heart, tag: "Service · Success · Retention", desc: "AR/EN agents that resolve, retain and upsell across every channel.", outcomes: ["Voice + chat agents", "Live-agent copilots", "Auto-QA across 100% of conversations", "Proactive churn save"], kpis: ["−42% handle time", "+28 NPS", "92% containment"] },
  { k: "Content Engine", icon: FileText, tag: "Marketing · Sales enablement", desc: "Brand-locked content production at enterprise scale.", outcomes: ["Multi-channel publishing", "Personalized variants", "Sales collateral on demand", "Internal knowledge ops"], kpis: ["10x output", "−60% cost", "Brand-safe"] },
  { k: "Innovation Engine", icon: Lightbulb, tag: "R&D · Product · New revenue", desc: "Build AI-native products, copilots and data services that open new lines.", outcomes: ["Internal copilots", "AI product spin-outs", "Data productization", "Rapid prototyping"], kpis: ["New SKUs", "Faster R&D", "Defensible IP"] },
];

function EnginesPage() {
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow="Business Engines"
          title={<>Five engines. One <span className="text-gradient italic">AI-powered business</span>.</>}
          description="Each engine is a deployable operating system — not a feature, not a tool."
        />
        <div className="mt-16 grid gap-8">
          {ENGINES.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={e.k} className={`grid gap-8 items-center lg:grid-cols-2 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className="[direction:ltr] glass-strong rounded-3xl p-8 shadow-card relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-magenta/25 blur-3xl" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="mt-5 text-xs uppercase tracking-widest text-electric">{e.tag}</div>
                    <h2 className="font-display mt-2 text-4xl">{e.k}</h2>
                    <p className="mt-3 text-muted-foreground">{e.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.kpis.map((k) => <span key={k} className="rounded-full bg-brand px-3 py-1 text-xs text-primary-foreground shadow-glow">{k}</span>)}
                    </div>
                  </div>
                </div>
                <div className="[direction:ltr]">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">What it includes</div>
                  <ul className="mt-4 grid gap-3">
                    {e.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-electric" /> {o}
                      </li>
                    ))}
                  </ul>
                  <Link to="/ai-assessment" className="mt-8 inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2.5 text-sm font-medium hover:bg-white/10">
                    Model impact for my company <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </SiteLayout>
  );
}
