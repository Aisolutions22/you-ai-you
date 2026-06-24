import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/ai-products")({
  head: () => ({
    meta: [
      { title: "AI Products — You AI" },
      { name: "description", content: "Enterprise-ready AI products: CV Builder, Recruitment Suite, Sales Assistant, Customer Support, Call Center, Legal, Real Estate and Knowledge Base." },
      { property: "og:title", content: "AI Products — You AI" },
      { property: "og:description", content: "Enterprise-ready AI products deployable in weeks." },
    ],
  }),
  component: ProductsPage,
});

const PRODUCTS = [
  { k: "AI CV Builder", problem: "Candidates submit weak, inconsistent CVs that under-represent talent.", solution: "Generates role-specific, ATS-ready CVs grounded in real candidate signal.", benefits: ["Higher interview rate", "Brand-consistent format", "Bilingual AR/EN"], roi: "+3x interview hit-rate" },
  { k: "AI Recruitment Suite", problem: "Recruiters drown in unscreened CVs and lose top candidates to slow loops.", solution: "Auto-screens, ranks, engages and schedules candidates end-to-end.", benefits: ["−63% time-to-hire", "+3x recruiter capacity", "Better candidate XP"], roi: "4.7x in 6 months" },
  { k: "AI Sales Assistant", problem: "Reps spend more time inside CRM than in front of customers.", solution: "Drafts emails, briefs meetings, summarizes calls and updates CRM automatically.", benefits: ["+22% win rate", "+18 selling hrs/week", "Cleaner forecast"], roi: "5.6x in 6 months" },
  { k: "AI Customer Support Agent", problem: "Support is the #1 line-item that doesn't scale with revenue.", solution: "Resolves 80%+ of tickets across web, WhatsApp and email — in AR and EN.", benefits: ["−45% support cost", "+28 CSAT", "24/7 coverage"], roi: "6.1x in 4 months" },
  { k: "AI Call Center Agent", problem: "Voice operations are stuck on headcount and AHT pressure.", solution: "AR/EN voice agent for inbound and outbound, with live-agent fallback.", benefits: ["−42% AHT", "92% containment", "Always-on capacity"], roi: "5.8x in 6 months" },
  { k: "AI Legal Assistant", problem: "Drafting and review consume the most valuable billable hours.", solution: "Drafts, reviews, redlines and researches across matters.", benefits: ["−70% drafting time", "+35% productivity", "Audit-ready trails"], roi: "3.8x in 9 months" },
  { k: "AI Real Estate Assistant", problem: "Leads decay before agents ever respond.", solution: "Qualifies, schedules and nurtures 24/7 across WhatsApp, web and voice.", benefits: ["+41% qualified leads", "−55% response time", "Higher close rate"], roi: "5.1x in 6 months" },
  { k: "AI Knowledge Base", problem: "Institutional knowledge is locked in people, PDFs and SharePoint.", solution: "One AI-native answer layer for the whole company.", benefits: ["+50% staff productivity", "Faster onboarding", "Decisions on real data"], roi: "4x in 6 months" },
];

function ProductsPage() {
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow="AI Products"
          title={<>Enterprise <span className="text-gradient italic">AI products</span>, deployable in weeks.</>}
          description="Pre-built, customizable and integrated into your stack — not science projects."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PRODUCTS.map((p) => (
            <article key={p.k} className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7">
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-magenta/25 blur-3xl" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-5 text-3xl">{p.k}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Block label="Business Problem">{p.problem}</Block>
                  <Block label="Solution">{p.solution}</Block>
                </div>
                <div className="mt-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Benefits</div>
                  <ul className="mt-2 grid gap-1.5">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-electric" />{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-brand/10 border border-white/10 p-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Typical ROI</div>
                    <div className="font-display text-2xl text-gradient">{p.roi}</div>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow">
                    Talk to us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <p className="mt-2 text-sm">{children}</p>
    </div>
  );
}
