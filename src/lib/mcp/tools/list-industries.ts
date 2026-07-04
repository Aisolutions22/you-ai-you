import { defineTool } from "@lovable.dev/mcp-js";

const INDUSTRIES = [
  "Legal", "Construction", "Real Estate", "E-commerce", "Healthcare",
  "Call Center", "Recruitment", "Content Creators", "SMEs",
];

export default defineTool({
  name: "list_industries",
  title: "List industries",
  description: "List the industries You AI serves across KSA and the GCC.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: INDUSTRIES.join(", ") }],
    structuredContent: { industries: INDUSTRIES },
  }),
});
