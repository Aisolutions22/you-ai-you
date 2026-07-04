import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CHALLENGES = ["manual_ops", "slow_sales", "poor_cx", "data_silos", "content_bottleneck", "hiring", "compliance"] as const;

export default defineTool({
  name: "score_ai_readiness",
  title: "Score AI readiness",
  description: "Score a company's AI readiness, growth potential, and automation potential (each 0-100), and recommend which You AI engines to prioritize.",
  inputSchema: {
    companySize: z.enum(["startup", "sme", "midmarket", "enterprise"]),
    industry: z.string().describe("Industry name."),
    employees: z.number().int().positive(),
    challenges: z.array(z.enum(CHALLENGES)).min(1).describe("Current top challenges."),
    hasCRM: z.boolean().default(false),
    hasERP: z.boolean().default(false),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ companySize, industry, employees, challenges, hasCRM, hasERP }) => {
    const sizeScore = { startup: 55, sme: 65, midmarket: 78, enterprise: 88 }[companySize];
    const systemsScore = (hasCRM ? 12 : 0) + (hasERP ? 12 : 0);
    const readiness = Math.min(100, sizeScore + systemsScore - Math.min(15, challenges.length * 3));
    const growth = Math.min(100, 60 + Math.min(30, challenges.length * 6) + (companySize === "enterprise" ? 5 : 10));
    const automation = Math.min(100, 55 + challenges.length * 6 + (hasERP ? 8 : 0));

    const rec: string[] = [];
    if (challenges.includes("slow_sales")) rec.push("Revenue Engine");
    if (challenges.includes("manual_ops") || challenges.includes("data_silos")) rec.push("Operations Engine");
    if (challenges.includes("poor_cx")) rec.push("Customer Experience Engine");
    if (challenges.includes("content_bottleneck")) rec.push("Content Engine");
    if (rec.length === 0) rec.push("Operations Engine", "Revenue Engine");

    const text = `AI Readiness: ${readiness}/100\nGrowth Potential: ${growth}/100\nAutomation Potential: ${automation}/100\nRecommended engines: ${rec.slice(0, 3).join(", ")}\nIndustry: ${industry} · Employees: ${employees}`;

    return {
      content: [{ type: "text", text }],
      structuredContent: { readiness, growth, automation, recommendedEngines: rec.slice(0, 3) },
    };
  },
});
