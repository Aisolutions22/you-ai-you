import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — You AI" },
      { name: "description", content: "AI transformation programs across Legal, Construction, Real Estate, E-commerce, Healthcare, Call Center, Recruitment, Content and SMEs." },
      { property: "og:title", content: "Industries — You AI" },
      { property: "og:description", content: "Sector-specific AI transformation programs." },
    ],
  }),
  component: IndustriesPage,
});

const I = [
  { k: "Legal", icon: Scale, d: "Contract intelligence, AI legal assistants and matter automation for firms and in-house teams." },
  { k: "Construction", icon: Building2, d: "Project intelligence, AI procurement and real-time variance control across sites." },
  { k: "Real Estate", icon: Home, d: "AI lead qualification, virtual sales advisors and tenant servicing agents." },
  { k: "E-commerce", icon: ShoppingBag, d: "Conversion copilots, AI support and intelligent merchandising at scale." },
  { k: "Healthcare", icon: Stethoscope, d: "Patient journey automation, documentation copilots and AI front-desk agents." },
  { k: "Call Center", icon: PhoneCall, d: "AR/EN voice agents, live-agent copilots and auto-QA across 100% of calls." },
  { k: "Recruitment", icon: Users, d: "AI screening, conversational sourcing and end-to-end recruiter copilots." },
  { k: "Content Creators", icon: PenTool, d: "Brand-locked AI content production across video, social, web and email." },
  { k: "SMEs", icon: Store, d: "Lightweight AI ops bundles — sales, support, content and finance, in one." },
];

function IndustriesPage() {
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow="Industries"
          title={<>AI built for your <span className="text-gradient italic">sector</span>.</>}
          description="Sector-specific transformation programs — designed with operators, not just consultants."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {I.map((x) => {
            const Icon = x.icon;
            return (
              <div key={x.k} className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7 hover:-translate-y-1 transition-transform">
                <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-electric/20 blur-3xl" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl">{x.k}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                  <Link to="/ai-assessment" className="mt-5 inline-flex items-center gap-1 text-sm text-electric hover:text-foreground">
                    Explore program <ArrowRight className="h-4 w-4" />
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
