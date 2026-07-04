import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ROICalculator } from "@/components/site/sections";

export const Route = createFileRoute("/roi-calculator")({
  head: () => ({
    meta: [
      { title: "ROI Calculator · حاسبة العائد — You AI" },
      { name: "description", content: "Model the ROI of AI transformation — hours saved, cost reduction, productivity gains and projected revenue uplift for your organization." },
      { property: "og:title", content: "ROI Calculator — You AI" },
      { property: "og:description", content: "Model the ROI of AI transformation for your enterprise." },
      { property: "og:url", content: "/roi-calculator" },
    ],
    links: [{ rel: "canonical", href: "/roi-calculator" }],
  }),
  component: () => (
    <SiteLayout>
      <ROICalculator />
    </SiteLayout>
  ),
});
