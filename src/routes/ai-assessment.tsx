import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowRight, Brain, Target, Zap, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/ai-assessment")({
  head: () => ({
    meta: [
      { title: "AI Assessment · تقييم الذكاء الاصطناعي — You AI" },
      { name: "description", content: "60-second AI opportunity assessment. Get your AI Readiness, Growth Potential and Automation scores plus an estimated cost-savings band." },
      { property: "og:title", content: "AI Opportunity Assessment — You AI" },
      { property: "og:description", content: "Score your AI readiness and growth potential in 60 seconds." },
      { property: "og:url", content: "/ai-assessment" },
    ],
    links: [{ rel: "canonical", href: "/ai-assessment" }],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const t = useT();
  const [size, setSize] = useState(t.assessment.sizes[2]);
  const [sector, setSector] = useState(t.assessment.sectors[0]);
  const [employees, setEmployees] = useState(120);
  const [challenges, setChallenges] = useState<string[]>([t.assessment.challenges[0], t.assessment.challenges[3]]);
  const [systems, setSystems] = useState<string[]>([t.assessment.systems[0]]);
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const scores = useMemo(() => {
    const automation = Math.min(95, 35 + challenges.length * 9 + Math.min(employees, 800) / 18);
    const growth = Math.min(96, 40 + 10 + systems.length * 5);
    const readiness = Math.min(94, 30 + systems.filter((s) => s !== t.assessment.systems[5]).length * 11 + (employees > 50 ? 18 : 8));
    const savings = Math.round(employees * 1800 * (automation / 100));
    return { automation: Math.round(automation), growth: Math.round(growth), readiness: Math.round(readiness), savings };
  }, [challenges, systems, employees, t]);

  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.assessment.eyebrow}
          title={<>{t.assessment.title1} <span className="text-gradient italic">{t.assessment.titleHi}</span> {t.assessment.title2}</>}
          description={t.assessment.pageSub}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
            <Field label={t.assessment.labels.size}><ChipRow value={size} onChange={setSize} options={t.assessment.sizes} /></Field>
            <Field label={t.assessment.labels.industry}><ChipRow value={sector} onChange={setSector} options={t.assessment.sectors} /></Field>
            <Field label={t.assessment.labels.employeesText(employees)}>
              <Slider min={5} max={2000} step={5} value={[employees]} onValueChange={(v) => setEmployees(v[0])} />
            </Field>
            <Field label={t.assessment.labels.challenges}>
              <div className="flex flex-wrap gap-2">
                {t.assessment.challenges.map((c) => (
                  <Chip key={c} active={challenges.includes(c)} onClick={() => toggle(challenges, c, setChallenges)}>{c}</Chip>
                ))}
              </div>
            </Field>
            <Field label={t.assessment.labels.systems}>
              <div className="flex flex-wrap gap-2">
                {t.assessment.systems.map((s) => (
                  <Chip key={s} active={systems.includes(s)} onClick={() => toggle(systems, s, setSystems)}>{s}</Chip>
                ))}
              </div>
            </Field>
          </div>
          <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card relative overflow-hidden">
            <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.assessment.labels.snapshot}</div>
              <h3 className="font-display mt-2 text-3xl">{sector} · {size}</h3>
              <div className="mt-6 grid gap-4">
                <ScoreBar label={t.assessment.labels.readiness} value={scores.readiness} icon={Brain} />
                <ScoreBar label={t.assessment.labels.growth} value={scores.growth} icon={Target} />
                <ScoreBar label={t.assessment.labels.automation} value={scores.automation} icon={Zap} />
              </div>
              <div className="mt-7 rounded-2xl border border-white/10 bg-brand/10 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <DollarSign className="h-3.5 w-3.5" /> {t.assessment.labels.savings}
                </div>
                <div className="font-display mt-1 text-4xl text-gradient">${scores.savings.toLocaleString()}</div>
              </div>
              <LeadDialog variant="strategy">
                <button type="button" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
                  <Calendar className="h-4 w-4" /> {t.common.bookSession} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </LeadDialog>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1.5 text-xs transition-colors ${active ? "bg-brand text-primary-foreground shadow-glow" : "glass hover:bg-white/10 text-foreground"}`}>{children}</button>
  );
}
function ChipRow({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => <Chip key={o} active={value === o} onClick={() => onChange(o)}>{o}</Chip>)}
    </div>
  );
}
function ScoreBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  const t = useT();
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4 text-electric" /> {label}</span>
        <span className="font-display text-xl">{value}<span className="text-muted-foreground text-sm">{t.common.of100}</span></span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }} className="h-full bg-brand" />
      </div>
    </div>
  );
}
