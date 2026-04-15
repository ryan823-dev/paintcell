import type { HomeProjectInterfaceContent } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { cn } from "@/lib/utils";
import { Bot, FileText, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

interface ProjectInterfacePanelProps {
  content: HomeProjectInterfaceContent;
  onStartChat?: (message?: string) => void;
}

const quickStarterIcons = [Bot, Sparkles, FileText] as const;

export function ProjectInterfacePanel({ content, onStartChat }: ProjectInterfacePanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmitToAssistant = () => {
    if (onStartChat) {
      onStartChat(inputValue.trim() || undefined);
      return;
    }

    if (inputValue.trim()) {
      sessionStorage.setItem("project-init-message", inputValue.trim());
    }

    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement | null;
    if (assistantButton) {
      assistantButton.click();
    }
  };

  return (
    <section className="relative hero-gradient min-h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/[0.08] blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[60px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative flex-[3] flex flex-col items-center justify-start px-6 sm:px-10 lg:px-16 pt-8 lg:pt-14 py-6">
        <div className="flex items-center gap-4 mb-8 lg:mb-10 text-xs font-medium tracking-[0.15em] uppercase">
          <span className="flex items-center gap-2 text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            {content.status.systemActive}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white/60">{content.status.assistantOnline}</span>
          <span className="text-white/20">|</span>
          <span className="text-white/60">{content.status.interfaceReady}</span>
        </div>

        <div className="text-center mb-8 lg:mb-10 w-full max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-accent/40 bg-accent/20 text-accent text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            {content.badge}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold mb-4 leading-tight text-white">
            {content.title}
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <div
            className={cn(
              "rounded-2xl border transition-all duration-300 p-1 bg-white/[0.07] backdrop-blur-sm",
              isFocused
                ? "border-accent/50 shadow-[0_0_40px_-5px_hsl(192_70%_38%/0.35)]"
                : "border-white/10 hover:border-accent/30",
            )}
          >
            <Textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={content.inputPlaceholder}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmitToAssistant();
                }
              }}
              className={cn(
                "min-h-[80px] md:min-h-[100px] resize-none border-0 bg-transparent",
                "text-white placeholder:text-white/40",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "text-[15px] leading-relaxed rounded-xl px-5 py-3",
              )}
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <p className="text-[11px] text-white/40 hidden sm:block">{content.footerNote}</p>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/quote")}
                  className="h-9 px-4 text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/10 uppercase tracking-wider"
                >
                  {content.useFormInsteadLabel}
                </Button>
                <Button
                  onClick={handleSubmitToAssistant}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-9 px-5 gap-2 rounded-xl shadow-lg shadow-accent/25"
                >
                  <Send className="h-3.5 w-3.5" />
                  {content.startLabel}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {content.quickStarters.map((text, index) => {
              const Icon = quickStarterIcons[index] || FileText;

              return (
                <button
                  key={text}
                  onClick={() => setInputValue(text)}
                  className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-200"
                >
                  <Icon className="h-3 w-3" />
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative flex-[1] border-t border-white/10 flex items-center bg-black/10">
        <div className="px-6 sm:px-10 lg:px-16 w-full py-5">
          <HomepageWizardStrip variant="dark" content={content.wizard} />
        </div>
      </div>
    </section>
  );
}
