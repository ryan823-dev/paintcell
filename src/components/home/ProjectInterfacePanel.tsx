import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Activity, Cpu, Radio, Layers, Box, Gauge, Wrench } from "lucide-react";

const parameters = [
  "material",
  "part size",
  "throughput",
  "environment",
  "automation goal",
];

const contextItems = [
  { label: "Automotive panels & trim", icon: Layers },
  { label: "Metal fabrication finishing", icon: Box },
  { label: "Furniture & wood coating", icon: Gauge },
  { label: "Plastic housings & covers", icon: Wrench },
];

export function ProjectInterfacePanel() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitToAssistant = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
      if (assistantButton) assistantButton.click();
      return;
    }
    sessionStorage.setItem("project-init-message", trimmed);
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitToAssistant();
    }
  };

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-wide py-0">
        {/* Three-zone console grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] min-h-[calc(100vh-64px)]">

          {/* ====== LEFT ZONE — System Status ====== */}
          <div className="hidden lg:flex flex-col justify-between py-10 pr-6 border-r border-primary-foreground/10">
            <div>
              <div className="mb-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary-foreground/50 mb-1">
                  Project Interface
                </p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-accent">
                    Active
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold text-primary-foreground/90 leading-snug">
                  Robotic Painting
                </p>
                <p className="text-sm font-semibold text-primary-foreground/90 leading-snug">
                  Systems
                </p>
              </div>

              <div className="space-y-4">
                <StatusLine icon={Activity} label="System ready" active />
                <StatusLine icon={Cpu} label="AI active" active />
                <StatusLine icon={Radio} label="Interface online" active />
              </div>
            </div>

            <div className="text-[10px] text-primary-foreground/30 font-mono">
              TD-PCS v3.1
            </div>
          </div>

          {/* ====== CENTER ZONE — Main Engineering Panel ====== */}
          <div className="flex flex-col justify-center py-10 lg:px-10 px-0">

            {/* Mobile system status (visible only on small screens) */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase text-accent">
                System active
              </span>
              <span className="text-primary-foreground/30 text-xs">—</span>
              <span className="text-xs text-primary-foreground/50">Project Interface Online</span>
            </div>

            {/* Panel container */}
            <div className="border border-primary-foreground/15 rounded-lg bg-primary-foreground/[0.04] overflow-hidden">

              {/* Panel header bar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-primary-foreground/[0.06] border-b border-primary-foreground/10">
                <Terminal className="h-4 w-4 text-primary-foreground/50" />
                <span className="text-sm font-semibold text-primary-foreground/80 tracking-wide">
                  Project Initialization
                </span>
              </div>

              {/* AI system message */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-accent">AI</span>
                  </div>
                  <div>
                    <p className="text-base font-medium text-primary-foreground leading-relaxed">
                      Start your robotic painting project.
                    </p>
                    <p className="text-sm text-primary-foreground/60 mt-1">
                      Tell me about your application, parts, or production line.
                    </p>
                  </div>
                </div>
              </div>

              {/* Large input area */}
              <div className="px-6 pb-4">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your project information…"
                  rows={5}
                  className="w-full resize-none rounded-md border border-primary-foreground/15 bg-primary-foreground/[0.05] px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-colors"
                />
              </div>

              {/* Action buttons */}
              <div className="px-6 pb-5 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSubmitToAssistant}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-11 px-6 gap-2"
                >
                  Enter project wizard
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/quote")}
                  className="h-11 px-6 font-medium border-primary-foreground/20 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
                >
                  Traditional inquiry entrance
                </Button>
              </div>

              {/* Parameter chips — inside the panel */}
              <div className="px-6 pb-5 border-t border-primary-foreground/10 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/40 mb-3">
                  Project initialization parameters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {parameters.map((param) => (
                    <span
                      key={param}
                      className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary-foreground/[0.06] text-xs font-medium text-primary-foreground/60 border border-primary-foreground/10"
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ====== RIGHT ZONE — Project Context ====== */}
          <div className="hidden lg:flex flex-col justify-between py-10 pl-6 border-l border-primary-foreground/10">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary-foreground/40 mb-5">
                Typical Applications
              </p>
              <div className="space-y-3">
                {contextItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded bg-primary-foreground/[0.06] flex items-center justify-center shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-primary-foreground/40" />
                    </div>
                    <span className="text-xs text-primary-foreground/55 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary-foreground/40 mb-4">
                  Project Scope
                </p>
                <div className="space-y-2.5 text-xs text-primary-foreground/45">
                  <p>→ Feasibility assessment</p>
                  <p>→ Cell configuration</p>
                  <p>→ Process validation</p>
                  <p>→ Deployment planning</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary-foreground/40 mb-4">
                  Workflow
                </p>
                <div className="space-y-2 text-[11px] text-primary-foreground/40 font-mono">
                  <p>01 — Define requirements</p>
                  <p>02 — Engineering review</p>
                  <p>03 — Scope confirmation</p>
                  <p>04 — Project proposal</p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-primary-foreground/25 font-mono">
              engineering context
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function StatusLine({ icon: Icon, label, active }: { icon: typeof Activity; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className={`h-3.5 w-3.5 ${active ? "text-accent/70" : "text-primary-foreground/30"}`} />
      <span className={`text-xs ${active ? "text-primary-foreground/60" : "text-primary-foreground/30"}`}>
        {label}
      </span>
    </div>
  );
}
