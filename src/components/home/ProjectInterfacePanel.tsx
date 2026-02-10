import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

export function ProjectInterfacePanel() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmitToAssistant = () => {
    if (inputValue.trim()) {
      sessionStorage.setItem("project-init-message", inputValue.trim());
    }
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  return (
    <section className="bg-primary text-primary-foreground">
      {/* Main consultation panel */}
      <div className="container-wide py-10 lg:py-14">
        {/* System bar */}
        <div className="flex items-center gap-3 mb-8 text-[10px] uppercase tracking-widest text-primary-foreground/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            System Active
          </span>
          <span className="text-primary-foreground/20">·</span>
          <span>AI Online</span>
          <span className="text-primary-foreground/20">·</span>
          <span>Project Interface Ready</span>
        </div>

        {/* Consultation panel */}
        <div className="max-w-4xl">
          {/* AI greeting */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/40 mb-2">
              System Message
            </p>
            <div className="border-l-2 border-accent/50 pl-4">
              <p className="text-primary-foreground/90 leading-relaxed text-lg md:text-xl font-medium">
                Start your robotic painting project.
              </p>
              <p className="text-primary-foreground/60 leading-relaxed text-[15px] mt-1">
                Tell me about your application, parts, or production line.
              </p>
            </div>
          </div>

          {/* Input area */}
          <div className="mb-4">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your project — material, part geometry, throughput, quality targets…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitToAssistant();
                }
              }}
              className={cn(
                "min-h-[130px] md:min-h-[160px] resize-none",
                "bg-primary-foreground/5 border-primary-foreground/15",
                "text-primary-foreground placeholder:text-primary-foreground/25",
                "focus-visible:ring-accent/40 focus-visible:border-accent/40",
                "text-[15px] leading-relaxed rounded-lg"
              )}
            />
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handleSubmitToAssistant}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-11 px-7 gap-2"
            >
              <Send className="h-4 w-4" />
              Start consultation
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/quote")}
              className="h-11 px-5 text-xs font-medium text-primary-foreground/40 hover:text-primary-foreground/70 hover:bg-primary-foreground/5 uppercase tracking-wider"
            >
              Traditional form →
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-[11px] text-primary-foreground/25">
            No pricing provided. Human engineers confirm final scope.
          </p>
        </div>
      </div>

      {/* Wizard Strip */}
      <div className="border-t border-primary-foreground/8">
        <div className="container-wide py-5">
          <HomepageWizardStrip variant="dark" />
        </div>
      </div>
    </section>
  );
}
