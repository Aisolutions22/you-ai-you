import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights · رؤى — You AI" },
      { name: "description", content: "Executive-level perspectives on AI, automation, digital transformation, CRM, ERP, customer experience and Saudi business growth." },
      { property: "og:title", content: "Insights — You AI" },
      { property: "og:description", content: "Executive perspectives on AI-led business growth." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const t = useT();
  const [cat, setCat] = useState(t.insights.categories[0]);
  const items = cat === t.insights.categories[0] ? t.insights.articles : t.insights.articles.filter((a) => a.c === cat);
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.insights.eyebrow}
          title={<>{t.insights.title1} <span className="text-gradient italic">{t.insights.titleHi}</span>{t.insights.title2}</>}
          description={t.insights.sub}
        />
        <div className="mt-10 flex flex-wrap gap-2">
          {t.insights.categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1.5 text-xs transition-colors ${cat === c ? "bg-brand text-primary-foreground shadow-glow" : "glass hover:bg-white/10"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <article key={a.t} className="group glass-strong shadow-card rounded-2xl p-6 hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="text-xs uppercase tracking-widest text-electric">{a.c}</div>
              <h3 className="font-display mt-3 text-2xl leading-tight">{a.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.d}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.r} {t.insights.minRead}</span>
                <span className="inline-flex items-center gap-1 text-foreground/80 group-hover:text-foreground">
                  {t.insights.read} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
