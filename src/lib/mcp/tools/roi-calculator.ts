import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "calculate_roi",
  title: "Calculate AI transformation ROI",
  description: "Estimate annual time saved, cost reduction, and projected revenue uplift from deploying You AI across a company. All monetary values are in the currency the caller uses (SAR by default).",
  inputSchema: {
    employees: z.number().int().positive().describe("Number of employees affected."),
    avgAnnualSalary: z.number().positive().describe("Average annual fully-loaded salary per employee."),
    hoursPerWeekOnManualWork: z.number().min(1).max(60).describe("Hours per week each employee spends on manual, automatable work."),
    currentAnnualRevenue: z.number().nonnegative().describe("Current annual revenue."),
    automationPct: z.number().min(0).max(1).default(0.5).describe("Fraction of manual work automated (0-1). Default 0.5."),
    revenueGrowthPct: z.number().min(0).max(1).default(0.18).describe("Expected revenue uplift fraction (0-1). Default 0.18."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ employees, avgAnnualSalary, hoursPerWeekOnManualWork, currentAnnualRevenue, automationPct, revenueGrowthPct }) => {
    const hourlyRate = avgAnnualSalary / (52 * 40);
    const hoursSaved = employees * hoursPerWeekOnManualWork * automationPct * 52;
    const costSaved = Math.round(hoursSaved * hourlyRate);
    const revenueUplift = Math.round(currentAnnualRevenue * revenueGrowthPct);
    const totalImpact = costSaved + revenueUplift;

    const summary = [
      `Employees: ${employees}`,
      `Hours saved / year: ${Math.round(hoursSaved).toLocaleString()}`,
      `Cost reduction / year: ${costSaved.toLocaleString()}`,
      `Revenue uplift / year: ${revenueUplift.toLocaleString()}`,
      `Total annual impact: ${totalImpact.toLocaleString()}`,
    ].join("\n");

    return {
      content: [{ type: "text", text: summary }],
      structuredContent: { hoursSaved: Math.round(hoursSaved), costSaved, revenueUplift, totalImpact },
    };
  },
});
