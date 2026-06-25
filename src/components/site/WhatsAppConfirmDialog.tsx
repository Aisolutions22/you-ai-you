import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { openWhatsApp, formatSummary, trackCta, type WAPayload } from "@/lib/whatsapp";

type DialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  payload: WAPayload;
  title?: string;
  description?: string;
};

export function WhatsAppConfirmDialog({ open, onOpenChange, payload, title, description }: DialogProps) {
  const t = useT();
  const summary = formatSummary(payload);
  const wa = t.whatsapp;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-lg glass-strong border-white/10 shadow-glow p-0 overflow-hidden bg-popover/90">
        <div className="relative p-8 sm:p-9">
          <div className="pointer-events-none absolute -top-16 -end-16 h-48 w-48 rounded-full bg-magenta/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -start-16 h-44 w-44 rounded-full bg-electric/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand shadow-glow">
              <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <DialogTitle className="font-display mt-5 text-2xl sm:text-3xl text-center">
              {title ?? wa.title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-sm text-muted-foreground">
              {description ?? wa.description}
            </DialogDescription>

            {summary && (
              <div className="mt-5 rounded-2xl glass border border-white/10 p-4 text-sm leading-relaxed whitespace-pre-line text-start">
                <div className="text-[11px] uppercase tracking-widest text-electric mb-2">{wa.summaryLabel}</div>
                {summary}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full glass px-5 py-2.5 text-sm hover:bg-white/10"
              >
                {wa.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  openWhatsApp(payload);
                  onOpenChange(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> {wa.openButton}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type CTAProps = {
  payload: WAPayload | (() => WAPayload);
  title?: string;
  description?: string;
  eventName?: string;
  children: (open: () => void) => ReactNode;
};

export function WhatsAppCTA({ payload, title, description, eventName, children }: CTAProps) {
  const [open, setOpen] = useState(false);
  const [resolved, setResolved] = useState<WAPayload | null>(null);

  const handleOpen = () => {
    const p = typeof payload === "function" ? payload() : payload;
    trackCta(eventName ?? `cta_${p.type}`, { type: p.type });
    setResolved(p);
    setOpen(true);
  };

  return (
    <>
      {children(handleOpen)}
      {resolved && (
        <WhatsAppConfirmDialog
          open={open}
          onOpenChange={setOpen}
          payload={resolved}
          title={title}
          description={description}
        />
      )}
    </>
  );
}
