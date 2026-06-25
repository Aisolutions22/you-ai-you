import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const isAr = lang === "ar";

  return (
    <div
      role="group"
      aria-label={t.language.switchTo}
      className={`relative flex items-center rounded-full glass p-0.5 text-xs ${compact ? "" : ""}`}
    >
      <Languages className="mx-2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      <div className="relative flex items-center">
        <motion.span
          aria-hidden
          layout
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute inset-y-0 z-0 rounded-full bg-brand shadow-glow"
          style={{
            width: "50%",
            insetInlineStart: isAr ? "50%" : "0%",
          }}
        />
        <button
          type="button"
          onClick={() => setLang("en")}
          aria-pressed={!isAr}
          className={`relative z-10 rounded-full px-3 py-1 transition-colors ${!isAr ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {t.language.en}
        </button>
        <button
          type="button"
          onClick={() => setLang("ar")}
          aria-pressed={isAr}
          className={`relative z-10 rounded-full px-3 py-1 transition-colors ${isAr ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {t.language.ar}
        </button>
      </div>
    </div>
  );
}
