import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ChevronRight, ArrowRight, DollarSign,
  FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { WhatsAppCTA } from "@/components/site/WhatsAppConfirmDialog";
import { type WAPayload } from "@/lib/whatsapp";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/i18n";

export const JOURNEY_ICONS = [FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge];

/* ---------------- JOURNEY (full) ---------------- */
export function Journey() {
  const t = useT();
  const [active, setActive] = useState(0);
  const A = t.journey.steps[active];
  const Icon = JOURNEY_ICONS[active];
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow={t.journey.eyebrow}
        title={<>{t.journey.title1} <span className="text-gradient italic">{t.journey.titleHi}</span> {t.journey.title2}</>}
        description={t.journey.sub}
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ol className="relative">
          <div className="absolute start-5 top-3 bottom-3 w-px bg-white/10" />
          {t.journey.steps.map((s, i) => {
            const SIcon = JOURNEY_ICONS[i];
            const isActive = i === active;
            return (
              <li key={s.k}>
                <button
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-start transition-colors ${isActive ? "bg-white/5" : "hover:bg-white/[0.03]"}`}
                >
                  <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full transition-all ${isActive ? "bg-brand shadow-glow text-primary-foreground" : "glass text-muted-foreground"}`}>
                    <SIcon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">{t.journey.stepLabel} 0{i + 1}</span>
                    <span className={`block font-display text-2xl ${isActive ? "text-foreground" : "text-mist"}`}>{s.k}</span>
                  </span>
                  <ChevronRight className={`h-4 w-4 rtl:rotate-180 transition-transform ${isActive ? "translate-x-1 rtl:-translate-x-1 text-foreground" : "text-muted-foreground"}`} />
                </button>
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-6 text-4xl">{A.k}</h3>
              <p className="mt-3 text-muted-foreground">{A.desc}</p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {t.journey.chips.map((c) => (
                  <div key={c} className="rounded-xl glass px-3 py-2 text-center text-xs text-muted-foreground">{c}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------------- ROI CALCULATOR (full) ---------------- */
export function ROICalculator() {
  const t = useT();
  const [employees, setEmployees] = useState(80);
  const [salary, setSalary] = useState(45000);
  const [hours, setHours] = useState(12);
  const [revenue, setRevenue] = useState(8000000);

  const results = useMemo(() => {
    const hourly = salary / (52 * 40);
    const hoursSaved = employees * hours * 0.65 * 52;
    const costSaved = Math.round(hoursSaved * hourly);
    const productivity = Math.round((hours * 0.65 / 40) * 100);
    const revenueUplift = Math.round(revenue * 0.18);
    return { hoursSaved: Math.round(hoursSaved), costSaved, productivity, revenueUplift };
  }, [employees, salary, hours, revenue]);

  return (
    <Section id="roi">
      <SectionHeading
        eyebrow={t.roi.eyebrow}
        title={<>{t.roi.title1} <span className="text-gradient italic">{t.roi.titleHi}</span> {t.roi.title2}</>}
        description={t.roi.sub}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
          <RoiSlider label={t.roi.labels.employees} value={employees} min={5} max={2000} step={5} onChange={setEmployees} />
          <RoiSlider label={t.roi.labels.salary} value={salary} prefix="$" min={10000} max={250000} step={1000} onChange={setSalary} />
          <RoiSlider label={t.roi.labels.hours} value={hours} suffix={t.roi.units.hrs} min={1} max={40} step={1} onChange={setHours} />
          <RoiSlider label={t.roi.labels.revenue} value={revenue} prefix="$" min={500000} max={500000000} step={100000} onChange={setRevenue} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label={t.roi.labels.hoursSaved} value={results.hoursSaved.toLocaleString()} accent="electric" />
          <ResultCard label={t.roi.labels.costSaved} value={`$${results.costSaved.toLocaleString()}`} accent="magenta" />
          <ResultCard label={t.roi.labels.productivity} value={`+${results.productivity}%`} accent="ember" />
          <ResultCard label={t.roi.labels.revenueUplift} value={`$${results.revenueUplift.toLocaleString()}`} accent="magenta" big />
          <div className="sm:col-span-2">
            <WhatsAppCTA
              eventName="cta_roi_quote"
              title={t.whatsapp.roiTitle}
              description={t.whatsapp.roiDescription}
              payload={(): WAPayload => ({
                type: "roi",
                fields: [
                  { label: t.whatsapp.fields.type, value: t.whatsapp.types.roi },
                  { label: t.whatsapp.fields.employees, value: String(employees) },
                  { label: t.whatsapp.fields.avgSalary, value: `$${salary.toLocaleString()}` },
                  { label: t.whatsapp.fields.hoursWeekly, value: String(hours) },
                  { label: t.whatsapp.fields.annualRevenue, value: `$${revenue.toLocaleString()}` },
                  { label: t.whatsapp.fields.hoursSaved, value: results.hoursSaved.toLocaleString() },
                  { label: t.whatsapp.fields.costSaved, value: `$${results.costSaved.toLocaleString()}` },
                  { label: t.whatsapp.fields.productivity, value: `+${results.productivity}%` },
                  { label: t.whatsapp.fields.revenueUplift, value: `$${results.revenueUplift.toLocaleString()}` },
                ],
              })}
            >
              {(openCTA) => (
                <button
                  type="button"
                  onClick={openCTA}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <DollarSign className="h-4 w-4" /> {t.cta.customQuote}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              )}
            </WhatsAppCTA>
          </div>
        </div>
      </div>
    </Section>
  );
}
function RoiSlider({ label, value, min, max, step, onChange, prefix = "", suffix = "" }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; prefix?: string; suffix?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
        <span className="font-display text-2xl">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="mt-3"><Slider min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(v[0])} /></div>
    </div>
  );
}
function ResultCard({ label, value, accent, big }: { label: string; value: string; accent: "magenta" | "electric" | "ember"; big?: boolean }) {
  const glow = accent === "magenta" ? "bg-magenta/30" : accent === "electric" ? "bg-electric/30" : "bg-ember/30";
  return (
    <div className={`relative overflow-hidden rounded-3xl glass-strong p-7 shadow-card ${big ? "sm:col-span-2" : ""}`}>
      <div className={`absolute -top-20 -end-20 h-48 w-48 rounded-full ${glow} blur-3xl`} />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`font-display mt-3 ${big ? "text-6xl" : "text-4xl"} text-gradient`}>{value}</div>
      </div>
    </div>
  );
}

/* ---------------- SCENARIOS (full) ---------------- */
export function Scenarios() {
  const t = useT();
  return (
    <Section id="scenarios">
      <SectionHeading
        eyebrow={t.scenarios.eyebrow}
        title={<>{t.scenarios.title1} <span className="text-gradient italic">{t.scenarios.titleHi}</span> {t.scenarios.title2}</>}
        description={t.scenarios.sub}
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {t.scenarios.items.map((s, i) => (
          <motion.article
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7"
          >
            <div className="absolute -bottom-20 -end-16 h-52 w-52 rounded-full bg-ember/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-2xl">{s.k}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.scenarios.labels.before}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.before}</p>
                </div>
                <div className="rounded-2xl bg-brand/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-electric">{t.scenarios.labels.after}</div>
                  <p className="mt-2 text-sm">{s.after}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.deltas.map((d) => (
                  <span key={d} className="rounded-full bg-brand px-3 py-1 text-xs text-primary-foreground shadow-glow">{d}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
