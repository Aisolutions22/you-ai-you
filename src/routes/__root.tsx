import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/sonner";
import { I18nProvider, PRE_HYDRATION_LANG_SCRIPT, useT } from "@/lib/i18n";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">{t.common.notFound}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.common.notFoundDesc}</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
            {t.common.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">{t.common.errorTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.common.errorSub}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
        >
          {t.common.retry}
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "You AI  · Building AI-Powered Businesses" },
      { name: "description", content: "You AI — شريك تحوّل ذكاء اصطناعي مؤسسي للسعودية والخليج وعالمياً. Enterprise AI transformation for KSA, GCC and global businesses." },
      { property: "og:site_name", content: "You AI" },
      { property: "og:title", content: "You AI  · Building AI-Powered Businesses" },
      { property: "og:description", content: "You AI — شريك تحوّل ذكاء اصطناعي مؤسسي للسعودية والخليج وعالمياً. Enterprise AI transformation for KSA, GCC and global businesses." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "You AI  · Building AI-Powered Businesses" },
      { name: "twitter:description", content: "You AI — شريك تحوّل ذكاء اصطناعي مؤسسي للسعودية والخليج وعالمياً. Enterprise AI transformation for KSA, GCC and global businesses." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/KtqGVkh2ZOQmeKb7IKlh7rKzoS92/social-images/social-1782356336282-Gemini_Generated_Image_35nkjm35nkjm35nk.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/KtqGVkh2ZOQmeKb7IKlh7rKzoS92/social-images/social-1782356336282-Gemini_Generated_Image_35nkjm35nkjm35nk.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&family=Cairo:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // SSR default = Arabic. The pre-hydration ScriptOnce flips html attrs from
  // localStorage before paint, so EN users don't see a flash of RTL/AR.
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <ScriptOnce>{PRE_HYDRATION_LANG_SCRIPT}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Outlet />
        <Toaster position="bottom-right" theme="dark" />
      </I18nProvider>
    </QueryClientProvider>
  );
}
