import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store, ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const ICONS = [Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store];

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries · القطاعات — You AI" },
      { name: "description", content: "AI transformation programs across Legal, Construction, Real Estate, E-commerce, Healthcare, Call Center, Recruitment, Content and SMEs." },
      { property: "og:title", content: "Industries — You AI" },
      { property: "og:description", content: "Sector-specific AI transformation programs." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const t = useT();
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.industries.eyebrow}
          title={<>{t.industries.page.title1} <span className="text-gradient italic">{t.industries.page.titleHi}</span>{t.industries.page.title2}</>}
          description={t.industries.page.sub}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.items.map((x, i) => {
            const Icon = ICONS[i];
            return (
              <div key={x.k} className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7 hover:-translate-y-1 transition-transform">
                <div className="absolute -top-16 -end-16 h-44 w-44 rounded-full bg-electric/20 blur-3xl" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl">{x.k}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{x.short}</p>
                  <LeadDialog variant="roadmap">
                    <button type="button" className="mt-5 inline-flex items-center gap-1 text-sm text-electric hover:text-foreground">
                      {t.common.exploreProgram} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
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
