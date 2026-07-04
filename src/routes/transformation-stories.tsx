import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Scenarios } from "@/components/site/sections";

export const Route = createFileRoute("/transformation-stories")({
  head: () => ({
    meta: [
      { title: "Transformation Stories · قصص التحول — You AI" },
      { name: "description", content: "Before-and-after transformation scenarios across industries with measurable deltas in revenue, cost, and customer experience." },
      { property: "og:title", content: "Transformation Stories — You AI" },
      { property: "og:description", content: "Before / after AI transformation scenarios with measurable impact." },
      { property: "og:url", content: "/transformation-stories" },
    ],
    links: [{ rel: "canonical", href: "/transformation-stories" }],
  }),
  component: () => (
    <SiteLayout>
      <Scenarios />
    </SiteLayout>
  ),
});
