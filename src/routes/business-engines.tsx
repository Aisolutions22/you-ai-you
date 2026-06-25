import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { TrendingUp, Cog, Heart, FileText, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";

const ICONS = [TrendingUp, Cog, Heart, FileText, Lightbulb];

export const Route = createFileRoute("/business-engines")({
  head: () => ({
    meta: [
      { title: "Business Engines · محركات الأعمال — You AI" },
      { name: "description", content: "Revenue, Operations, Customer Experience, Content and Innovation engines — the AI-powered systems that move your P&L." },
      { property: "og:title", content: "Business Engines — You AI" },
      { property: "og:description", content: "Five AI engines, wired into your P&L." },
      { property: "og:url", content: "/business-engines" },
    ],
    links: [{ rel: "canonical", href: "/business-engines" }],
  }),
  component: EnginesPage,
});

function EnginesPage() {
  const t = useT();
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.engines.eyebrow}
          title={<>{t.engines.page.title1} <span className="text-gradient italic">{t.engines.page.titleHi}</span>{t.engines.page.title2}</>}
          description={t.engines.page.sub}
        />
        <div className="mt-16 grid gap-8">
          {t.engines.items.map((e, i) => {
            const Icon = ICONS[i];
            return (
              <div key={e.k} className="grid gap-8 items-center lg:grid-cols-2">
                <div className="glass-strong rounded-3xl p-8 shadow-card relative overflow-hidden">
                  <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-magenta/25 blur-3xl" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="mt-5 text-xs uppercase tracking-widest text-electric">{e.tag}</div>
                    <h2 className="font-display mt-2 text-4xl">{e.k}</h2>
                    <p className="mt-3 text-muted-foreground">{e.pageDesc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.kpis.map((k) => <span key={k} className="rounded-full bg-brand px-3 py-1 text-xs text-primary-foreground shadow-glow">{k}</span>)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.engines.page.includes}</div>
                  <ul className="mt-4 grid gap-3">
                    {e.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-electric" /> {o}
                      </li>
                    ))}
                  </ul>
                  <LeadDialog variant="roadmap">
                    <button type="button" className="mt-8 inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2.5 text-sm font-medium hover:bg-white/10">
                      {t.common.modelImpact} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </LeadDialog>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </SiteLayout>
  );
}
