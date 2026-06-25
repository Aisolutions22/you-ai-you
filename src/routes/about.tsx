import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { Rocket, Globe2, ShieldCheck, Brain, ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const ICONS = [Brain, Globe2, ShieldCheck, Rocket];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · من نحن — You AI" },
      { name: "description", content: "You AI is a Saudi-rooted, globally-minded AI transformation partner. We build AI-powered businesses aligned with Vision 2030." },
      { property: "og:title", content: "About — You AI" },
      { property: "og:description", content: "An enterprise AI transformation partner built for Vision 2030." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={<>{t.about.title1} <span className="text-gradient italic">{t.about.titleHi}</span>{t.about.title2}</>}
          description={t.about.sub}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {t.about.pillars.map((p, i) => {
            const Icon = ICONS[i];
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
          {t.about.stats.map((s) => (
            <div key={s.v} className="glass rounded-2xl p-7 text-center">
              <div className="font-display text-5xl text-gradient">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 text-center shadow-glow relative overflow-hidden">
          <div className="absolute -top-20 -start-10 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-4xl">{t.about.partner.title}</h3>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{t.about.partner.sub}</p>
            <LeadDialog variant="strategy">
              <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
                {t.about.partner.button} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </LeadDialog>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
