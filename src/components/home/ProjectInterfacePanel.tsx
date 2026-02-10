import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

const parameters = [
  { label: "Material", hint: "Steel, aluminum, plastic, composite…" },
  { label: "Part Size", hint: "Dimensions & weight range" },
  { label: "Throughput", hint: "Parts/hour, takt time" },
  { label: "Environment", hint: "Booth type, ventilation, safety" },
  { label: "Automation Goal", hint: "Quality, labor, throughput…" },
];

export function ProjectInterfacePanel() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleEnterWizard = () => {
    if (inputValue.trim()) {
      sessionStorage.setItem("project-init-message", inputValue.trim());
    }
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  return (
    <section className="bg-primary text-primary-foreground min-h-[85vh] flex flex-col">
      {/* Three-column console — desktop */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_3fr_1fr] lg:gap-0">

        {/* ===== LEFT — System Presence ===== */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-primary-foreground/10 px-6 py-8">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/40 mb-1">System</p>
              <p className="text-sm font-semibold tracking-wide text-primary-foreground/90">Robotic Painting Interface</p>
            </div>
            <div className="space-y-4">
              <StatusLine label="Status" value="Active" />
              <StatusLine label="AI" value="Online" />
              <StatusLine label="Project Mode" value="Ready" />
            </div>
          </div>
          <div className="text-[10px] text-primary-foreground/30 uppercase tracking-widest">
            TD Robotic Painting Systems
          </div>
        </aside>

        {/* ===== CENTER — Main Control Panel ===== */}
        <main className="flex-1 flex flex-col px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
          {/* Mobile system bar */}
          <div className="lg:hidden flex items-center gap-3 mb-6 text-[10px] uppercase tracking-widest text-primary-foreground/50">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Active
            </span>
            <span>·</span>
            <span>AI Online</span>
            <span>·</span>
            <span>Ready</span>
          </div>

          {/* Panel header */}
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-primary-foreground tracking-tight mb-1">
              Project Initialization
            </h1>
            <div className="h-px w-16 bg-accent/60 mt-2" />
          </div>

          {/* AI opening message */}
          <div className="mb-6 border-l-2 border-accent/50 pl-4">
            <p className="text-sm text-primary-foreground/70 mb-1 font-mono uppercase tracking-wider text-[10px]">
              System Message
            </p>
            <p className="text-primary-foreground/90 leading-relaxed text-[15px]">
              Start your robotic painting project.<br />
              Tell me about your application, parts, or production line.
            </p>
          </div>

          {/* Input area — large, panel-integrated */}
          <div className="mb-6">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your project information…"
              className={cn(
                "min-h-[120px] md:min-h-[140px] resize-none",
                "bg-primary-foreground/5 border-primary-foreground/15",
                "text-primary-foreground placeholder:text-primary-foreground/30",
                "focus-visible:ring-accent/40 focus-visible:border-accent/40",
                "text-[15px] leading-relaxed rounded-lg"
              )}
            />
          </div>

          {/* Parameter panel */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/40 mb-3">
              Project Initialization Parameters
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {parameters.map((p) => (
                <div key={p.label} className="flex items-baseline gap-2 py-1.5 border-b border-primary-foreground/8">
                  <span className="text-xs font-semibold text-primary-foreground/70 min-w-[100px]">{p.label}</span>
                  <span className="text-[11px] text-primary-foreground/35">{p.hint}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Execution actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleEnterWizard}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-7 gap-2"
            >
              Enter project wizard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/quote")}
              className="h-11 px-6 font-medium border-primary-foreground/20 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Traditional inquiry entrance
            </Button>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-[11px] text-primary-foreground/30">
            No pricing provided. Human engineers confirm final scope.
          </p>
        </main>

        {/* ===== RIGHT — Project Context Environment ===== */}
        <aside className="hidden lg:flex flex-col border-l border-primary-foreground/10 px-6 py-8">
          <div className="space-y-8">
            <ContextBlock
              title="Typical Applications"
              items={["Automotive components", "Metal fabrication", "Furniture production", "Plastic parts"]}
            />
            <ContextBlock
              title="Project Scope"
              items={["Single-robot cells", "Multi-robot lines", "Retrofit integration", "Greenfield deployment"]}
            />
            <ContextBlock
              title="Workflow"
              items={["Feasibility → Concept → Engineering → Commissioning"]}
            />
            <ContextBlock
              title="Integration Notes"
              items={["Conveyor interface", "PLC integration", "MES connectivity", "Recipe management"]}
            />
          </div>
        </aside>
      </div>

      {/* ===== Wizard Strip (below console) ===== */}
      <div className="border-t border-primary-foreground/10 px-4 sm:px-8 lg:px-12 py-5 bg-primary-foreground/3">
        <HomepageWizardStrip variant="dark" />
      </div>
    </section>
  );
}

/* ---- Sub-components ---- */

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-widest text-primary-foreground/40">{label}</span>
      <span className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        {value}
      </span>
    </div>
  );
}

function ContextBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/40 mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-xs text-primary-foreground/60 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
