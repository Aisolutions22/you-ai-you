import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Check, Bot, Sparkles } from "lucide-react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect an AI assistant · You AI" },
      { name: "description", content: "Connect ChatGPT or Claude to You AI so your assistant can use our enterprise AI transformation tools." },
      { property: "og:title", content: "Connect an AI assistant · You AI" },
      { property: "og:description", content: "Connect ChatGPT or Claude to You AI so your assistant can use our enterprise AI transformation tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectPage,
});

function ConnectPage() {
  const [mcpUrl, setMcpUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMcpUrl(new URL("/mcp", window.location.origin).toString());
  }, []);

  const copy = async () => {
    if (!mcpUrl) return;
    await navigator.clipboard.writeText(mcpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div dir="ltr" className="mx-auto max-w-3xl px-6 py-24">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" /> Agent connection
        </div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">
          Connect an AI assistant to <span className="text-gradient">You AI</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Paste the URL below into ChatGPT or Claude to give your assistant access to
          our business engines, industries, product catalog, ROI calculator, and AI
          readiness scoring.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 glass p-5">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">MCP server URL</div>
          <div className="mt-2 flex items-center gap-3">
            <code className="flex-1 truncate rounded-lg bg-black/30 px-3 py-2 text-sm">{mcpUrl || "…"}</code>
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </button>
          </div>
        </div>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h2 className="font-display text-2xl">ChatGPT</h2>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal pl-5">
            <li>
              Open{" "}
              <a className="underline hover:text-foreground" href="https://chatgpt.com/#settings/Connectors/Advanced" target="_blank" rel="noreferrer">
                ChatGPT → Settings → Connectors → Advanced
              </a>{" "}
              and enable Developer mode (review the risk notice shown there).
            </li>
            <li>In the chat composer, open the "+" menu and turn on Developer mode.</li>
            <li>Click <span className="text-foreground">Add sources</span>, then <span className="text-foreground">Connect more</span>.</li>
            <li>Name the connector (e.g. "You AI") and paste the MCP URL above.</li>
            <li>Ask ChatGPT to use You AI — for example, "Score my company's AI readiness."</li>
          </ol>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h2 className="font-display text-2xl">Claude</h2>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal pl-5">
            <li>
              Open{" "}
              <a className="underline hover:text-foreground" href="https://claude.ai/customize/connectors?modal=add-custom-connector" target="_blank" rel="noreferrer">
                Claude → Custom connectors
              </a>
              .
            </li>
            <li>Name the connector (e.g. "You AI") and paste the MCP URL above.</li>
            <li>Enable the connector from the chat composer, then ask Claude to use You AI.</li>
          </ol>
        </section>

        <p className="mt-12 text-xs text-muted-foreground">
          Once connected, your assistant discovers the available tools automatically.
        </p>
      </div>
    </Layout>
  );
}
