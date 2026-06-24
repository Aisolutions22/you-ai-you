import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { Rocket, Globe2, ShieldCheck, Brain, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — You AI" },
      { name: "description", content: "You AI is a Saudi-rooted, globally-minded AI transformation partner. We build AI-powered businesses aligned with Vision 2030." },
      { property: "og:title", content: "About — You AI" },
      { property: "og:description", content: "An enterprise AI transformation partner built for Vision 2030." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  { icon: Brain, k: "Business-first", d: "We start with the P&L, not the model. Every initiative ties to a measurable outcome." },
  { icon: Globe2, k: "Saudi-rooted, global-minded", d: "Local fluency in AR/EN, regulation, and culture — paired with global engineering depth." },
  { icon: ShieldCheck, k: "Enterprise-grade", d: "Data residency, governance, observability and security designed for regulated industries." },
  { icon: Rocket, k: "Vision 2030 aligned", d: "Our programs map to NTP, Saudi Vision 2030 and sector-level digital agendas." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow="About You AI"
          title={<>We don't sell AI tools. We build <span className="text-gradient italic">AI-powered businesses</span>.</>}
          description="You AI is an enterprise AI transformation partner working with leaders in Saudi Arabia, the GCC and globally. Our teams blend operators, strategists and engineers — designing AI-native operating models that move the P&L."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.k} className="glass-strong rounded-3xl p-7 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-5 text-2xl">{p.k}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            { k: "+38%", v: "Average revenue uplift" },
            { k: "−47%", v: "Average operating cost cut" },
            { k: "9", v: "Industries deployed in production" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-7 text-center">
              <div className="font-display text-5xl text-gradient">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 text-center shadow-glow relative overflow-hidden">
          <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-4xl">Partner with us</h3>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              90-minute working session with our senior partners. Walk out with a transformation roadmap tailored to your business.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
              Book Executive Strategy Session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
