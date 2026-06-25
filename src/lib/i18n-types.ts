export type Lang = "en" | "ar";

export interface Dictionary {
  dir: "ltr" | "rtl";
  nav: {
    home: string; engines: string; industries: string; products: string;
    assessment: string; insights: string; about: string; contact: string;
    cta: string; menu: string;
  };
  common: {
    explore: string; learnMore: string; bookSession: string; bookExecutive: string;
    talkToUs: string; modelForCompany: string; modelImpact: string; exploreProgram: string;
    readArticle: string; of100: string; close: string; backHome: string;
    notFound: string; notFoundDesc: string; errorTitle: string; errorSub: string; retry: string;
  };
  hero: {
    eyebrow: string;
    headlineAr: string;
    headlineEn1: string; headlineEnHi: string; headlineEn2: string;
    sub: string; cta1: string; cta2: string;
    trust: { k: string; v: string }[];
  };
  journey: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    stepLabel: string; chips: string[];
    steps: { k: string; desc: string }[];
  };
  engines: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    page: { title1: string; titleHi: string; title2: string; sub: string; includes: string };
    items: { k: string; tag: string; desc: string; pageDesc: string; kpis: string[]; outcomes: string[] }[];
  };
  industries: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    pillars: { challenges: string; solutions: string; impact: string; expectedRoi: string };
    page: { title1: string; titleHi: string; title2: string; sub: string };
    items: { k: string; short: string; challenges: string[]; solutions: string[]; impact: string[]; roi: string }[];
  };
  assessment: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string; pageSub: string;
    labels: {
      size: string; industry: string; employees: string; challenges: string; systems: string;
      calculate: string; snapshot: string; livePreview: string; readiness: string; growth: string;
      automation: string; savings: string; savingsHint: string; recommended: string;
      employeesText: (n: number) => string;
    };
    sizes: string[]; sectors: string[]; challenges: string[]; systems: string[];
    engineRec: { ops: string; cx: string; revenue: string; content: string };
  };
  roi: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    labels: {
      employees: string; salary: string; hours: string; revenue: string;
      hoursSaved: string; costSaved: string; productivity: string; revenueUplift: string;
    };
    units: { hrs: string };
  };
  products: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    page: { title1: string; titleHi: string; title2: string };
    labels: {
      problem: string; solution: string; benefits: string; benefitsRoi: string;
      product: string; typicalRoi: string; view: string; hide: string;
    };
    items: {
      k: string; problem: string; problemLong: string; solution: string; solutionLong: string;
      benefits: string[]; roi: string;
    }[];
  };
  scenarios: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    labels: { before: string; after: string };
    items: { k: string; before: string; after: string; deltas: string[] }[];
  };
  why: {
    eyebrow: string; title1: string; titleHi: string; title2: string;
    items: { k: string; d: string }[];
  };
  insights: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    minRead: string; read: string;
    categories: string[];
    articles: { c: string; t: string; r: number; d: string }[];
  };
  finalCta: {
    eyebrow: string; title1: string; titleHi: string; sub: string; button: string;
  };
  footer: {
    tagline: string; explore: string; contact: string; address: string;
    copyright: string; vision: string;
  };
  about: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    pillars: { k: string; d: string }[];
    stats: { k: string; v: string }[];
    partner: { title: string; sub: string; button: string };
  };
  contact: {
    eyebrow: string; title1: string; titleHi: string; title2: string; sub: string;
    fields: {
      name: string; email: string; company: string; role: string; industry: string; phone: string; help: string;
      placeholders: { name: string; email: string; company: string; role: string; industry: string; phone: string; help: string };
    };
    submit: string;
    success: { title: string; sub: string };
    cards: {
      hq: { title: string; lines: string[] };
      email: { title: string; lines: string[] };
      phone: { title: string; lines: string[] };
      executive: { eyebrow: string; title: string; sub: string };
    };
  };
  lead: {
    roadmap: { eyebrow: string; title: string; sub: string; cta: string; success: string; messageLabel: string };
    strategy: { eyebrow: string; title: string; sub: string; cta: string; success: string; messageLabel: string };
    fields: { name: string; email: string; company: string; role: string; industry: string; phone: string; size: string; message: string };
    placeholders: { name: string; email: string; company: string; role: string; industry: string; phone: string; message: string };
    sending: string; consent: string; successDescription: string; sentTitle: string;
    sentBody: (name: string, email: string, variant: "roadmap" | "strategy") => string;
    steps: { strategy: { k: string; v: string }[]; roadmap: { k: string; v: string }[] };
    errors: { name: string; email: string; company: string; size: string; industry: string };
    close: string;
  };
  language: { label: string; en: string; ar: string; switchTo: string };
}
