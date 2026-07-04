import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Journey } from "@/components/site/sections";

export const Route = createFileRoute("/transformation-journey")({
  head: () => ({
    meta: [
      { title: "Transformation Journey · رحلة التحول — You AI" },
      { name: "description", content: "The 7-stop AI transformation journey — from Discover to Optimize — that moves enterprises from strategy to measurable outcomes." },
      { property: "og:title", content: "Transformation Journey — You AI" },
      { property: "og:description", content: "The 7-stop AI transformation roadmap for enterprises." },
      { property: "og:url", content: "/transformation-journey" },
    ],
    links: [{ rel: "canonical", href: "/transformation-journey" }],
  }),
  component: () => (
    <SiteLayout>
      <Journey />
    </SiteLayout>
  ),
});
