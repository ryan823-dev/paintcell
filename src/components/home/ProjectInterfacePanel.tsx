import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

interface ProjectInterfacePanelProps {
  onStartChat?: (message?: string) => void;
}

export function ProjectInterfacePanel({ onStartChat }: ProjectInterfacePanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmitToAssistant = () => {
    if (onStartChat) {
      onStartChat(inputValue.trim() || undefined);
    } else {
      if (inputValue.trim()) {
        sessionStorage.setItem("project-init-message", inputValue.trim());
      }
      const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
      if (assistantButton) assistantButton.click();
    }
  };

  return (
    <section className="bg-background h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Main — vertically centered */}
      <div className="flex-[3] flex flex-col items-center justify-start px-6 sm:px-10 lg:px-16 pt-8 lg:pt-14 py-6">
        {/* Status bar */}
        <div className="flex items-center gap-4 mb-8 lg:mb-10 text-xs font-medium tracking-[0.15em] uppercase">
          <span className="flex items-center gap-2 text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            System Active
          </span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">AI Online</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">Project Interface Ready</span>
        </div>

        {/* H1 — SEO primary heading */}
        <div className="text-center mb-8 lg:mb-10 w-full max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            AI-Powered Engineering
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold mb-4 leading-tight">
            Robotic Painting Systems &amp; Paint Booth Automation Integrator
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Describe your application, parts, or production line — our AI agent will guide you through the assessment.
          </p>
        </div>

        {/* Chat input */}
        <div className="w-full max-w-5xl">
          <div
            className={cn(
              "rounded-2xl border transition-all duration-300 p-1 bg-card",
              isFocused
                ? "border-accent/40 shadow-[0_0_24px_-5px_hsl(192_70%_38%/0.2)]"
                : "border-border hover:border-accent/20"
            )}
          >
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g. We need to automate spray painting of aluminium housings, ~200 parts/shift, Class A finish…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitToAssistant();
                }
              }}
              className={cn(
                "min-h-[80px] md:min-h-[100px] resize-none border-0 bg-transparent",
                "text-foreground placeholder:text-muted-foreground/50",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "text-[15px] leading-relaxed rounded-xl px-5 py-3"
              )}
            />
            {/* Action row */}
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <p className="text-[11px] text-muted-foreground/60 hidden sm:block">
                No pricing provided · Human engineers confirm scope
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/quote")}
                  className="h-9 px-4 text-[11px] font-medium text-muted-foreground hover:text-heading uppercase tracking-wider"
                >
                  Use form instead
                </Button>
                <Button
                  onClick={handleSubmitToAssistant}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-9 px-5 gap-2 rounded-xl"
                >
                  <Send className="h-3.5 w-3.5" />
                  Start
                </Button>
              </div>
            </div>
          </div>

          {/* Quick starters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            {[
              "Automate manual spraying",
              "Improve finish consistency",
              "Feasibility check for my parts",
            ].map((text) => (
              <button
                key={text}
                onClick={() => setInputValue(text)}
                className="text-xs px-3.5 py-1.5 rounded-full border border-border text-muted-foreground hover:text-heading hover:border-accent/30 hover:bg-accent/5 transition-all"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard Strip — bottom */}
      <div className="flex-[1] border-t border-border flex items-center bg-muted/30">
        <div className="px-6 sm:px-10 lg:px-16 w-full py-5">
          <HomepageWizardStrip variant="light" />
        </div>
      </div>
    </section>
  );
}
