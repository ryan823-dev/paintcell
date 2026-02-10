import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

export function ProjectInterfacePanel() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmitToAssistant = () => {
    if (inputValue.trim()) {
      sessionStorage.setItem("project-init-message", inputValue.trim());
    }
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  return (
    <section className="bg-primary text-primary-foreground h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Main — vertically centered, ~3/4 of viewport */}
      <div className="flex-[3] flex flex-col items-center justify-center container-wide py-6 lg:py-10">
        {/* Status bar — prominent */}
        <div className="flex items-center gap-4 mb-6 text-xs font-medium tracking-[0.15em] uppercase">
          <span className="flex items-center gap-2 text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            System Active
          </span>
          <span className="text-primary-foreground/20">·</span>
          <span className="text-primary-foreground/70">AI Online</span>
          <span className="text-primary-foreground/20">·</span>
          <span className="text-primary-foreground/70">Project Interface Ready</span>
        </div>

        {/* Central AI greeting */}
        <div className="text-center mb-5 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            AI-Powered Engineering
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 leading-tight">
            Start your robotic painting project
          </h1>
          <p className="text-primary-foreground/50 text-base md:text-lg">
            Describe your application, parts, or production line — our AI agent will guide you through the assessment.
          </p>
        </div>

        {/* Chat input — glowing card */}
        <div className="w-full max-w-4xl">
          <div
            className={cn(
              "rounded-2xl border transition-all duration-300 p-1",
              isFocused
                ? "border-primary-foreground/40 shadow-[0_0_30px_-5px_hsl(32_95%_50%/0.25)]"
                : "border-primary-foreground/25 hover:border-primary-foreground/35"
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
                "text-primary-foreground placeholder:text-primary-foreground/25",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "text-[15px] leading-relaxed rounded-xl px-5 py-3"
              )}
            />
            {/* Action row inside card */}
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <p className="text-[11px] text-primary-foreground/25 hidden sm:block">
                No pricing provided · Human engineers confirm scope
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/quote")}
                  className="h-9 px-4 text-[11px] font-medium text-primary-foreground/35 hover:text-primary-foreground/60 hover:bg-primary-foreground/5 uppercase tracking-wider"
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
                onClick={() => {
                  setInputValue(text);
                }}
                className="text-xs px-3.5 py-1.5 rounded-full border border-primary-foreground/12 text-primary-foreground/45 hover:text-primary-foreground/70 hover:border-primary-foreground/25 hover:bg-primary-foreground/5 transition-all"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard Strip — bottom layer, ~1/4 of viewport */}
      <div className="flex-[1] border-t border-primary-foreground/8 flex items-center">
        <div className="container-wide w-full py-5">
          <HomepageWizardStrip variant="dark" />
        </div>
      </div>
    </section>
  );
}
