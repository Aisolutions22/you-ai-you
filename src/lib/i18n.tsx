import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations } from "./translations";
import type { Dictionary, Lang } from "./i18n-types";

const STORAGE_KEY = "youai.lang";
const DEFAULT_LANG: Lang = "ar";

interface I18nValue {
  lang: Lang;
  t: Dictionary;
  setLang: (l: Lang) => void;
  toggle: () => void;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start with the SSR-rendered default so hydration matches.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // After mount, read persisted preference and switch if needed.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "ar") {
        if (stored !== lang) setLangState(stored);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect language onto the document for CSS (RTL, fonts) and screen readers.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  const value = useMemo<I18nValue>(() => ({
    lang,
    t: translations[lang],
    setLang,
    toggle,
    dir: lang === "ar" ? "rtl" : "ltr",
  }), [lang, setLang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT(): Dictionary {
  return useI18n().t;
}

/** Inline script that runs before hydration so RTL/lang are set with zero flash. */
export const PRE_HYDRATION_LANG_SCRIPT = `
try {
  var l = localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) || ${JSON.stringify(DEFAULT_LANG)};
  if (l !== 'en' && l !== 'ar') l = ${JSON.stringify(DEFAULT_LANG)};
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
} catch (e) {}
`;
