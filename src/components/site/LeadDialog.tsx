import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Calendar, Sparkles } from "lucide-react";

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
import { openWhatsApp, trackCta, type WAPayload } from "@/lib/whatsapp";

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

  const meta = t.lead[variant];
  const Icon = variant === "strategy" ? Calendar : Sparkles;
  const formId = `lead-form-${variant}`;

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
    trackCta(`lead_submit_${variant}`, { type: variant });
    toast.success(meta.success, { description: t.lead.redirecting });
    // Close the dialog and open WhatsApp in a new tab with the prefilled summary.
    setOpen(false);
    setTimeout(() => { reset(); }, 250);
    openWhatsApp(p);
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setTimeout(() => { reset(); }, 250);
  };


  const stepsList = variant === "strategy" ? t.lead.steps.strategy : t.lead.steps.roadmap;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="
          glass-strong border-white/10 shadow-glow bg-popover/90 p-0 gap-0 overflow-hidden
          flex flex-col
          inset-0 left-0 top-0 translate-x-0 translate-y-0
          w-screen h-[100dvh] max-w-none rounded-none
          sm:inset-auto sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]
          sm:h-auto sm:max-h-[90vh] sm:w-[calc(100vw-2rem)] sm:!max-w-2xl sm:rounded-2xl
        "
      >
        {/* decorative glows */}
        <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-magenta/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />

        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative flex min-h-0 flex-1 flex-col"
            >
              {/* Header */}
              <div className="shrink-0 border-b border-white/5 px-5 pt-5 pb-4 sm:px-8 sm:pt-7 sm:pb-5">
                <div className="flex items-center gap-3 pe-10">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand shadow-glow">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-electric">{meta.eyebrow}</div>
                    <DialogTitle className="font-display text-xl sm:text-2xl truncate">{meta.title}</DialogTitle>
                  </div>
                </div>
                <DialogDescription className="mt-2 text-sm text-muted-foreground">{meta.sub}</DialogDescription>
              </div>

              {/* Scrollable body */}
              <div
                className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6"
                style={{ WebkitOverflowScrolling: "touch" as any }}
              >
                <form
                  id={formId}
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 sm:grid-cols-2"
                  noValidate
                >
                  <Field label={t.lead.fields.name} error={errors.name?.message}>
                    <Input maxLength={100} autoComplete="name" placeholder={t.lead.placeholders.name} {...register("name")} />
                  </Field>
                  <Field label={t.lead.fields.email} error={errors.email?.message}>
                    <Input type="email" inputMode="email" autoComplete="email" maxLength={255} placeholder={t.lead.placeholders.email} {...register("email")} />
                  </Field>
                  <Field label={t.lead.fields.company} error={errors.company?.message}>
                    <Input maxLength={120} autoComplete="organization" placeholder={t.lead.placeholders.company} {...register("company")} />
                  </Field>
                  <Field label={t.lead.fields.role} error={errors.role?.message}>
                    <Input maxLength={80} autoComplete="organization-title" placeholder={t.lead.placeholders.role} {...register("role")} />
                  </Field>
                  <Field label={t.lead.fields.industry} error={errors.industry?.message}>
                    <Input maxLength={80} placeholder={t.lead.placeholders.industry} {...register("industry")} />
                  </Field>
                  <Field label={t.lead.fields.phone} error={errors.phone?.message}>
                    <Input type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder={t.lead.placeholders.phone} {...register("phone")} />
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

                  <p className="sm:col-span-2 text-[11px] text-muted-foreground">{t.lead.consent}</p>
                </form>
              </div>

              {/* Sticky footer */}
              <div
                className="shrink-0 border-t border-white/10 bg-popover/95 backdrop-blur px-5 py-4 sm:px-8"
                style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
              >
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenChange(false)}
                    className="inline-flex items-center justify-center rounded-full glass-strong px-5 py-2.5 text-sm hover:bg-white/10"
                  >
                    {t.lead.close}
                  </button>
                  <button
                    type="submit"
                    form={formId}
                    disabled={isSubmitting}
                    className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 rtl:rotate-180" />}
                    {isSubmitting ? t.lead.sending : meta.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative flex min-h-0 flex-1 flex-col"
            >
              <div
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-8 sm:px-10 sm:py-10 text-center"
                style={{ WebkitOverflowScrolling: "touch" as any }}
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand shadow-glow">
                  <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
                </div>
                <DialogTitle className="font-display mt-5 text-2xl sm:text-3xl">{t.lead.sentTitle}</DialogTitle>
                <DialogDescription className="mt-3 text-muted-foreground max-w-md mx-auto">
                  {t.lead.sentBody(watch("name")?.split(" ")[0] || "—", watch("email") || "—", variant)}
                </DialogDescription>
                {payload && (
                  <div className="mt-6 rounded-2xl glass border border-white/10 p-4 text-sm leading-relaxed whitespace-pre-line text-start">
                    <div className="text-[11px] uppercase tracking-widest text-electric mb-2">{t.whatsapp.summaryLabel}</div>
                    {formatSummary(payload)}
                  </div>
                )}
                <div className="mt-6 grid gap-3 sm:grid-cols-3 text-start">
                  {stepsList.map((s) => (
                    <div key={s.k} className="glass rounded-2xl p-4">
                      <div className="text-[11px] uppercase tracking-widest text-electric">{s.k}</div>
                      <div className="mt-1 text-sm">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="shrink-0 border-t border-white/10 bg-popover/95 backdrop-blur px-5 py-4 sm:px-8"
                style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
              >
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => handleOpenChange(false)}
                    className="inline-flex items-center justify-center rounded-full glass-strong px-5 py-2.5 text-sm hover:bg-white/10"
                  >
                    {t.lead.close}
                  </button>
                  <button
                    onClick={handleOpenWA}
                    className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" /> {t.whatsapp.openButton}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
