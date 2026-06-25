import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/ai-products")({
  head: () => ({
    meta: [
      { title: "AI Products · منتجات الذكاء الاصطناعي — You AI" },
      { name: "description", content: "Enterprise-ready AI products: CV Builder, Recruitment Suite, Sales Assistant, Customer Support, Call Center, Legal, Real Estate and Knowledge Base." },
      { property: "og:title", content: "AI Products — You AI" },
      { property: "og:description", content: "Enterprise-ready AI products deployable in weeks." },
      { property: "og:url", content: "/ai-products" },
    ],
    links: [{ rel: "canonical", href: "/ai-products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const t = useT();
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.products.eyebrow}
          title={<>{t.products.page.title1} <span className="text-gradient italic">{t.products.page.titleHi}</span>{t.products.page.title2}</>}
          description={t.products.sub}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {t.products.items.map((p) => (
            <article key={p.k} className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7">
              <div className="absolute -top-20 -end-20 h-56 w-56 rounded-full bg-magenta/25 blur-3xl" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-5 text-3xl">{p.k}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Block label={t.products.labels.problem}>{p.problemLong}</Block>
                  <Block label={t.products.labels.solution}>{p.solutionLong}</Block>
                </div>
                <div className="mt-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.products.labels.benefits}</div>
                  <ul className="mt-2 grid gap-1.5">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-electric" />{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-brand/10 border border-white/10 p-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.products.labels.typicalRoi}</div>
                    <div className="font-display text-2xl text-gradient">{p.roi}</div>
                  </div>
                  <LeadDialog variant="strategy">
                    <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow">
                      {t.common.talkToUs} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </LeadDialog>
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
