import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { LeadDialog } from "./LeadDialog";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/lib/i18n";

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV: { to: any; label: string; exact?: boolean }[] = [
    { to: "/", label: t.nav.home, exact: true },
    { to: "/business-engines", label: t.nav.engines },
    { to: "/industries", label: t.nav.industries },
    { to: "/ai-products", label: t.nav.products },
    { to: "/ai-assessment", label: t.nav.assessment },
    { to: "/insights", label: t.nav.insights },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <nav className={`flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all ${scrolled ? "glass-strong shadow-card" : "glass"}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-2xl leading-none">You<span className="text-gradient">AI</span></span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex lg:gap-2 xl:gap-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-foreground bg-white/5" }}
                  activeOptions={{ exact: !!item.exact }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>


          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <LeadDialog variant="roadmap">
              <button
                type="button"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] whitespace-nowrap"
              >
                {t.nav.cta}
              </button>
            </LeadDialog>
            <button onClick={() => setOpen((v) => !v)} aria-label={t.nav.menu} className="lg:hidden grid h-9 w-9 place-items-center rounded-full glass">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

          </div>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-3">

            <ul className="grid gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm hover:bg-white/5">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <LeadDialog variant="roadmap">
                  <button type="button" onClick={() => setOpen(false)} className="mt-1 block w-full rounded-xl bg-brand px-3 py-2 text-sm font-medium text-center text-primary-foreground">
                    {t.nav.cta}
                  </button>
                </LeadDialog>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
