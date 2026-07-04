import { defineTool } from "@lovable.dev/mcp-js";

const PRODUCTS = [
  { id: "cv-builder", name: "AI CV Builder", summary: "Recruiter-ready CVs in Arabic + English." },
  { id: "recruitment", name: "Recruitment Suite", summary: "AI screening, ranking, and interview prep." },
  { id: "sales", name: "Sales Assistant", summary: "Pipeline, outreach, and deal intelligence." },
  { id: "support", name: "Customer Support AI", summary: "24/7 multilingual assistant with escalation." },
  { id: "call-center", name: "AI Call Center", summary: "Voice agents for inbound and outbound flows." },
  { id: "legal", name: "Legal AI", summary: "Contract review and clause library." },
  { id: "real-estate", name: "Real Estate AI", summary: "Listing intelligence and buyer matching." },
  { id: "knowledge", name: "Knowledge Base AI", summary: "Enterprise search across your documents." },
];

export default defineTool({
  name: "list_ai_products",
  title: "List AI products",
  description: "List You AI's enterprise AI product catalog.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PRODUCTS, null, 2) }],
    structuredContent: { products: PRODUCTS },
  }),
});
