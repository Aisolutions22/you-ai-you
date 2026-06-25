import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { WhatsAppConfirmDialog } from "@/components/site/WhatsAppConfirmDialog";
import { openWhatsApp, trackCta, type WAPayload } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · تواصل — You AI" },
      { name: "description", content: "Book an executive strategy session with You AI. Riyadh, Saudi Arabia — serving the GCC and global enterprises." },
      { property: "og:title", content: "Contact — You AI" },
      { property: "og:description", content: "Book an executive strategy session." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type FormVals = {
  name: string; email: string; company: string; role?: string;
  industry: string; phone?: string; help?: string;
};

function ContactPage() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [payload, setPayload] = useState<WAPayload | null>(null);

  const schema = useMemo(() => z.object({
    name: z.string().trim().min(2, t.lead.errors.name).max(100),
    email: z.string().trim().email(t.lead.errors.email).max(255),
    company: z.string().trim().min(2, t.lead.errors.company).max(120),
    role: z.string().trim().max(80).optional().or(z.literal("")),
    industry: z.string().trim().min(2, t.lead.errors.industry).max(80),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    help: z.string().trim().max(1000).optional().or(z.literal("")),
  }), [t]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormVals>({
    resolver: zodResolver(schema) as any,
    defaultValues: { name: "", email: "", company: "", role: "", industry: "", phone: "", help: "" },
    mode: "onBlur",
  });

  const onSubmit = async (v: FormVals) => {
    await new Promise((r) => setTimeout(r, 400));
    const f = t.whatsapp.fields;
    const p: WAPayload = {
      type: "contact",
      fields: [
        { label: f.type, value: t.whatsapp.types.contact },
        { label: f.name, value: v.name },
        { label: f.email, value: v.email },
        { label: f.company, value: v.company },
        { label: f.role, value: v.role ?? "" },
        { label: f.industry, value: v.industry },
        { label: f.phone, value: v.phone ?? "" },
        { label: f.message, value: v.help ?? "" },
      ],
    };
    setPayload(p);
    trackCta("cta_contact_submit", { type: "contact" });
    setSent(true);
    setWaOpen(true);
  };

  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={<>{t.contact.title1} <span className="text-gradient italic">{t.contact.titleHi}</span>{t.contact.title2}</>}
          description={t.contact.sub}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand shadow-glow">
                  <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-5 text-3xl">{t.contact.success.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.contact.success.sub}</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.contact.fields.name} error={errors.name?.message}><Input maxLength={100} placeholder={t.contact.fields.placeholders.name} {...register("name")} /></Field>
                <Field label={t.contact.fields.email} error={errors.email?.message}><Input type="email" maxLength={255} placeholder={t.contact.fields.placeholders.email} {...register("email")} /></Field>
                <Field label={t.contact.fields.company} error={errors.company?.message}><Input maxLength={120} placeholder={t.contact.fields.placeholders.company} {...register("company")} /></Field>
                <Field label={t.contact.fields.role}><Input maxLength={80} placeholder={t.contact.fields.placeholders.role} {...register("role")} /></Field>
                <Field label={t.contact.fields.industry} error={errors.industry?.message}><Input maxLength={80} placeholder={t.contact.fields.placeholders.industry} {...register("industry")} /></Field>
                <Field label={t.contact.fields.phone}><Input maxLength={40} placeholder={t.contact.fields.placeholders.phone} {...register("phone")} /></Field>
                <div className="sm:col-span-2">
                  <Field label={t.contact.fields.help}><Textarea rows={5} maxLength={1000} placeholder={t.contact.fields.placeholders.help} {...register("help")} /></Field>
                </div>
                <button type="submit" disabled={isSubmitting} className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-70">
                  {t.contact.submit} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            )}
          </form>

          <div className="grid gap-4">
            <InfoCard icon={MapPin} title={t.contact.cards.hq.title} lines={t.contact.cards.hq.lines} />
            <InfoCard icon={Mail} title={t.contact.cards.email.title} lines={t.contact.cards.email.lines} />
            <InfoCard icon={Phone} title={t.contact.cards.phone.title} lines={t.contact.cards.phone.lines} />
            <div className="glass-strong rounded-3xl p-7 shadow-card relative overflow-hidden">
              <div className="absolute -top-16 -end-16 h-44 w-44 rounded-full bg-magenta/30 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-electric">{t.contact.cards.executive.eyebrow}</div>
                <h3 className="font-display mt-2 text-2xl">{t.contact.cards.executive.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.contact.cards.executive.sub}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
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
function InfoCard({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="glass rounded-2xl p-5 flex gap-4 items-start">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-glow shrink-0">
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        {lines.map((l) => <div key={l} className="text-sm mt-0.5">{l}</div>)}
      </div>
    </div>
  );
}
