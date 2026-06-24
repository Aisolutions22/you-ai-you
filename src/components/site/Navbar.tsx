import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/business-engines", label: "Business Engines" },
  { to: "/industries", label: "Industries" },
  { to: "/ai-products", label: "AI Products" },
  { to: "/ai-assessment", label: "AI Assessment" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-2xl leading-none">You<span className="text-gradient">AI</span></span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "rounded-full px-3 py-1.5 text-sm text-foreground bg-white/5" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/ai-assessment"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Get Your AI Growth Roadmap
            </Link>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="lg:hidden grid h-9 w-9 place-items-center rounded-full glass">
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
                <Link to="/ai-assessment" onClick={() => setOpen(false)} className="mt-1 block rounded-xl bg-brand px-3 py-2 text-sm font-medium text-center text-primary-foreground">
                  Get Your AI Growth Roadmap
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
