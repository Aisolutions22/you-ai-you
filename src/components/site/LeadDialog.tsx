import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Calendar, Sparkles, MessageCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { openWhatsApp, trackCta, formatSummary, type WAPayload } from "@/lib/whatsapp";

type Variant = "roadmap" | "strategy";
type SizeOpt = "1–10" | "11–50" | "51–200" | "201–1000" | "1000+";
type LeadForm = {
  name: string; email: string; company: string; role?: string;
  phone?: string; size: SizeOpt; industry: string; message?: string;
};

const SIZES: readonly SizeOpt[] = ["1–10", "11–50", "51–200", "201–1000", "1000+"] as const;

export function LeadDialog({ variant = "roadmap", children }: { variant?: Variant; children: React.ReactNode }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [payload, setPayload] = useState<WAPayload | null>(null);

  const meta = t.lead[variant];
  const Icon = variant === "strategy" ? Calendar : Sparkles;

  // Build localized schema each render so error messages follow language.
  const schema = useMemo(() => z.object({
    name: z.string().trim().min(2, t.lead.errors.name).max(100),
    email: z.string().trim().email(t.lead.errors.email).max(255),
    company: z.string().trim().min(2, t.lead.errors.company).max(120),
    role: z.string().trim().max(80).optional().or(z.literal("")),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    size: z.enum([...SIZES] as [SizeOpt, ...SizeOpt[]], { message: t.lead.errors.size }),
    industry: z.string().trim().min(2, t.lead.errors.industry).max(80),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
  }), [t]);

  const form = useForm<LeadForm>({
    resolver: zodResolver(schema) as any,
    defaultValues: { name: "", email: "", company: "", role: "", phone: "", size: "51–200", industry: "", message: "" },
    mode: "onBlur",
  });
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = form;
  const size = watch("size");

  const onSubmit = async (values: LeadForm) => {
    await new Promise((r) => setTimeout(r, 500));
    const f = t.whatsapp.fields;
    const p: WAPayload = {
      type: variant,
      fields: [
        { label: f.type, value: t.whatsapp.types[variant] },
        { label: f.name, value: values.name },
        { label: f.email, value: values.email },
        { label: f.company, value: values.company },
        { label: f.role, value: values.role ?? "" },
        { label: f.phone, value: values.phone ?? "" },
        { label: f.industry, value: values.industry },
        { label: f.size, value: values.size },
        { label: f.message, value: values.message ?? "" },
      ],
    };
    setPayload(p);
    trackCta(`lead_submit_${variant}`, { type: variant });
    setDone(true);
    toast.success(meta.success, { description: t.lead.successDescription });
  };

  const handleOpenWA = () => {
    if (payload) openWhatsApp(payload);
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setTimeout(() => { setDone(false); setPayload(null); reset(); }, 250);
  };

  const stepsList = variant === "strategy" ? t.lead.steps.strategy : t.lead.steps.roadmap;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-2xl glass-strong border-white/10 shadow-glow p-0 overflow-hidden bg-popover/80">
        <div className="relative">
          <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-magenta/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative p-7 sm:p-9"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand shadow-glow">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-electric">{meta.eyebrow}</div>
                    <DialogTitle className="font-display text-2xl sm:text-3xl">{meta.title}</DialogTitle>
                  </div>
                </div>
                <DialogDescription className="mt-3 text-sm text-muted-foreground">{meta.sub}</DialogDescription>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
                  <Field label={t.lead.fields.name} error={errors.name?.message}>
                    <Input maxLength={100} placeholder={t.lead.placeholders.name} {...register("name")} />
                  </Field>
                  <Field label={t.lead.fields.email} error={errors.email?.message}>
                    <Input type="email" maxLength={255} placeholder={t.lead.placeholders.email} {...register("email")} />
                  </Field>
                  <Field label={t.lead.fields.company} error={errors.company?.message}>
                    <Input maxLength={120} placeholder={t.lead.placeholders.company} {...register("company")} />
                  </Field>
                  <Field label={t.lead.fields.role} error={errors.role?.message}>
                    <Input maxLength={80} placeholder={t.lead.placeholders.role} {...register("role")} />
                  </Field>
                  <Field label={t.lead.fields.industry} error={errors.industry?.message}>
                    <Input maxLength={80} placeholder={t.lead.placeholders.industry} {...register("industry")} />
                  </Field>
                  <Field label={t.lead.fields.phone} error={errors.phone?.message}>
                    <Input maxLength={40} placeholder={t.lead.placeholders.phone} {...register("phone")} />
                  </Field>

                  <div className="sm:col-span-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">{t.lead.fields.size}</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setValue("size", s, { shouldValidate: true })}
                          className={`rounded-full px-3 py-1.5 text-xs transition-colors ${size === s ? "bg-brand text-primary-foreground shadow-glow" : "glass hover:bg-white/10"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errors.size && <p className="mt-1.5 text-xs text-destructive">{errors.size.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <Field label={meta.messageLabel} error={errors.message?.message}>
                      <Textarea rows={4} maxLength={1000} placeholder={t.lead.placeholders.message} {...register("message")} />
                    </Field>
                  </div>

                  <div className="sm:col-span-2 mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-muted-foreground">{t.lead.consent}</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 rtl:rotate-180" />}
                      {isSubmitting ? t.lead.sending : meta.cta}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative p-10 sm:p-14 text-center"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand shadow-glow">
                  <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
                </div>
                <DialogTitle className="font-display mt-6 text-3xl sm:text-4xl">{t.lead.sentTitle}</DialogTitle>
                <DialogDescription className="mt-3 text-muted-foreground max-w-md mx-auto">
                  {t.lead.sentBody(watch("name")?.split(" ")[0] || "—", watch("email") || "—", variant)}
                </DialogDescription>
                <div className="mt-7 grid gap-3 sm:grid-cols-3 text-start">
                  {stepsList.map((s) => (
                    <div key={s.k} className="glass rounded-2xl p-4">
                      <div className="text-[11px] uppercase tracking-widest text-electric">{s.k}</div>
                      <div className="mt-1 text-sm">{s.v}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleOpenChange(false)}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full glass-strong px-6 py-2.5 text-sm hover:bg-white/10"
                >
                  {t.lead.close}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
