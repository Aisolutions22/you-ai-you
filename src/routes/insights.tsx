import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — You AI" },
      { name: "description", content: "Executive-level perspectives on AI, automation, digital transformation, CRM, ERP, customer experience and Saudi business growth." },
      { property: "og:title", content: "Insights — You AI" },
      { property: "og:description", content: "Executive perspectives on AI-led business growth." },
    ],
  }),
  component: InsightsPage,
});

const CATEGORIES = ["All", "AI", "Automation", "Digital Transformation", "CRM", "ERP", "Customer Experience", "Saudi Business Growth"];
const ARTICLES = [
  { c: "AI", t: "The AI-Powered CFO: rebuilding the finance operating model", r: "8 min read", d: "How AI rewrites the finance function — from close to forecast to capital allocation." },
  { c: "Automation", t: "When to automate, when to redesign — a framework for the C-suite", r: "6 min read", d: "Most automation efforts get the diagnosis wrong. A simple test to fix it." },
  { c: "Digital Transformation", t: "Why most digital transformation programs fail in year two", r: "10 min read", d: "The structural reasons transformation stalls — and how AI-native operating models avoid them." },
  { c: "CRM", t: "From CRM as a database to CRM as a revenue engine", r: "7 min read", d: "Turning your CRM into an active system of growth, not a system of record." },
  { c: "ERP", t: "Composable ERP: making your back office AI-ready", r: "9 min read", d: "Composable architecture is the gateway to AI orchestration." },
  { c: "Customer Experience", t: "Designing CX agents your CMO will actually trust", r: "5 min read", d: "Trust, brand voice and governance for AI-led customer experience." },
  { c: "Saudi Business Growth", t: "Vision 2030 playbook: AI-led growth for Saudi enterprises", r: "12 min read", d: "How AI ties directly into NTP priorities and sector-level digital agendas." },
  { c: "AI", t: "Buy, build or orchestrate: the AI capability decision", r: "6 min read", d: "A practical decision tree for enterprise AI capability sourcing." },
  { c: "Saudi Business Growth", t: "The Riyadh advantage: scaling AI ops in the GCC", r: "7 min read", d: "Why Riyadh is becoming the regional center for AI-powered operations." },
];

function InsightsPage() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.c === cat);
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow="Insights"
          title={<>Perspectives on <span className="text-gradient italic">AI-led growth</span>.</>}
          description="Executive briefings, frameworks and field notes from our transformation programs."
        />
        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
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
                <span>{a.r}</span>
                <span className="inline-flex items-center gap-1 text-foreground/80 group-hover:text-foreground">Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
