import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-2xl">You<span className="text-gradient">AI</span></span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="X" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.explore}</h4>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li><Link to="/business-engines" className="hover:text-foreground">{t.nav.engines}</Link></li>
              <li><Link to="/industries" className="hover:text-foreground">{t.nav.industries}</Link></li>
              <li><Link to="/ai-products" className="hover:text-foreground">{t.nav.products}</Link></li>
              <li><Link to="/ai-assessment" className="hover:text-foreground">{t.nav.assessment}</Link></li>
              <li><Link to="/insights" className="hover:text-foreground">{t.nav.insights}</Link></li>
              <li><Link to="/connect" className="hover:text-foreground">Connect an AI assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.contact}</h4>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {t.footer.address}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@youai.sa</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +966 11 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p>{t.footer.vision}</p>
        </div>
      </div>
    </footer>
  );
}
