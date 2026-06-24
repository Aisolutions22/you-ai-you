import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — You AI" },
      { name: "description", content: "Book an executive strategy session with You AI. Riyadh, Saudi Arabia — serving the GCC and global enterprises." },
      { property: "og:title", content: "Contact — You AI" },
      { property: "og:description", content: "Book an executive strategy session." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's build your <span className="text-gradient italic">AI-powered business</span>.</>}
          description="Tell us about your business. A senior partner will reach out within one business day."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand shadow-glow">
                  <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display mt-5 text-3xl">Request received.</h3>
                <p className="mt-2 text-muted-foreground">A senior partner will be in touch within one business day.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><Input required placeholder="Your name" /></Field>
                <Field label="Work email"><Input required type="email" placeholder="you@company.com" /></Field>
                <Field label="Company"><Input required placeholder="Company" /></Field>
                <Field label="Role"><Input placeholder="CEO, COO, Head of…" /></Field>
                <Field label="Industry"><Input placeholder="e.g. Legal, Construction" /></Field>
                <Field label="Phone"><Input placeholder="+966…" /></Field>
                <div className="sm:col-span-2">
                  <Field label="How can we help?"><Textarea rows={5} placeholder="Briefly describe your business and what you want to transform." /></Field>
                </div>
                <button type="submit" className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
                  Book Executive Strategy Session <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </form>

          <div className="grid gap-4">
            <InfoCard icon={MapPin} title="Riyadh HQ" lines={["King Abdullah Financial District", "Riyadh, Saudi Arabia"]} />
            <InfoCard icon={Mail} title="Email" lines={["hello@youai.sa"]} />
            <InfoCard icon={Phone} title="Phone" lines={["+966 11 000 0000"]} />
            <div className="glass-strong rounded-3xl p-7 shadow-card relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-magenta/30 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-electric">For enterprise leaders</div>
                <h3 className="font-display mt-2 text-2xl">Executive Strategy Session</h3>
                <p className="mt-2 text-sm text-muted-foreground">A 90-minute working session with our senior partners. Walk out with a tailored AI transformation roadmap.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
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
