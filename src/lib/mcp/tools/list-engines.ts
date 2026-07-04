import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const ENGINES = [
  { id: "revenue", name: "Revenue Engine", outcome: "Compound pipeline, conversion, and ACV.", kpi: "+34% pipeline" },
  { id: "operations", name: "Operations Engine", outcome: "Automate back-office and manual workflows.", kpi: "−42% handle time" },
  { id: "cx", name: "Customer Experience Engine", outcome: "24/7 AI-powered support in Arabic + English.", kpi: "+61% CSAT" },
  { id: "content", name: "Content Engine", outcome: "Generate brand-aligned content at scale.", kpi: "10× throughput" },
  { id: "innovation", name: "Innovation Engine", outcome: "Ship AI products faster with production guardrails.", kpi: "3× velocity" },
];

export default defineTool({
  name: "list_business_engines",
  title: "List business engines",
  description: "List the five You AI business transformation engines (Revenue, Operations, CX, Content, Innovation) with headline outcome and KPI.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(ENGINES, null, 2) }],
    structuredContent: { engines: ENGINES },
  }),
});
