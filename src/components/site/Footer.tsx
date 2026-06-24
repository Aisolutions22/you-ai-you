import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Mail, MapPin, Phone, Sparkles } from "lucide-react";

export function Footer() {
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
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              We don't sell AI tools. We build AI-powered businesses — designed to grow revenue,
              cut operational costs, and scale across Saudi Arabia, the GCC and beyond.
            </p>
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
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li><Link to="/business-engines" className="hover:text-foreground">Business Engines</Link></li>
              <li><Link to="/industries" className="hover:text-foreground">Industries</Link></li>
              <li><Link to="/ai-products" className="hover:text-foreground">AI Products</Link></li>
              <li><Link to="/ai-assessment" className="hover:text-foreground">AI Assessment</Link></li>
              <li><Link to="/insights" className="hover:text-foreground">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Riyadh, Saudi Arabia</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@youai.sa</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +966 11 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} You AI. Building AI-Powered Businesses.</p>
          <p>Aligned with Saudi Vision 2030.</p>
        </div>
      </div>
    </footer>
  );
}
