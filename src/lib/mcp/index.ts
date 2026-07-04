import { defineMcp } from "@lovable.dev/mcp-js";
import listEngines from "./tools/list-engines";
import listIndustries from "./tools/list-industries";
import listProducts from "./tools/list-products";
import roiCalculator from "./tools/roi-calculator";
import aiReadiness from "./tools/ai-readiness";

export default defineMcp({
  name: "you-ai-mcp",
  title: "You AI — Enterprise AI Transformation",
  version: "0.1.0",
  instructions:
    "Tools for the You AI platform (KSA & GCC enterprise AI transformation). Use these to list business engines, industries, and AI products, score a company's AI readiness, and estimate ROI for AI deployments.",
  tools: [listEngines, listIndustries, listProducts, roiCalculator, aiReadiness],
});
