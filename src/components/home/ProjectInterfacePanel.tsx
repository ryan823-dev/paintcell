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
    <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/75 to-transparent" />
        <div className="absolute right-[8%] top-20 h-72 w-72 rounded-full bg-primary/[0.05] blur-[96px]" />
        <div className="absolute left-[4%] top-1/3 h-64 w-64 rounded-full bg-heading/[0.03] blur-[112px]" />
      </div>

      <div className="relative flex-[3] flex flex-col items-center justify-start px-6 sm:px-10 lg:px-16 pt-8 lg:pt-14 py-6">
        <div className="flex items-center gap-4 mb-8 lg:mb-10 text-xs font-medium tracking-[0.15em] uppercase">
          <span className="flex items-center gap-2 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {content.status.systemActive}
          </span>
          <span className="text-border">|</span>
          <span className="text-muted-foreground">{content.status.assistantOnline}</span>
          <span className="text-border">|</span>
          <span className="text-muted-foreground">{content.status.interfaceReady}</span>
        </div>

        <div className="text-center mb-8 lg:mb-10 w-full max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-primary/12 bg-primary/[0.05] text-primary text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            {content.badge}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold mb-4 leading-tight text-heading">
            {content.title}
          </h2>
          <p className="text-body text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <div
            className={cn(
              "rounded-2xl border transition-all duration-300 p-1 bg-card shadow-[0_16px_36px_hsl(var(--foreground)/0.07)]",
              isFocused
                ? "border-primary/30 shadow-[0_0_0_3px_hsl(var(--primary)/0.08),0_16px_36px_hsl(var(--foreground)/0.07)]"
                : "border-border hover:border-primary/20",
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
                "text-foreground placeholder:text-muted-foreground/80",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "text-[15px] leading-relaxed rounded-xl px-5 py-3",
              )}
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <p className="text-[11px] text-muted-foreground hidden sm:block">{content.footerNote}</p>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/quote")}
                  className="h-9 px-4 text-[11px] font-medium text-muted-foreground hover:text-heading hover:bg-muted uppercase tracking-wider"
                >
                  {content.useFormInsteadLabel}
                </Button>
                <Button
                  onClick={handleSubmitToAssistant}
                  className="bg-primary hover:bg-accent text-primary-foreground font-semibold h-9 px-5 gap-2 rounded-xl shadow-[0_10px_24px_hsl(var(--primary)/0.16)]"
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
                  className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border border-border bg-card/92 text-muted-foreground hover:text-primary hover:border-primary/25 hover:bg-primary/[0.035] transition-all duration-200"
                >
                  <Icon className="h-3 w-3" />
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative flex-[1] border-t border-border flex items-center bg-background">
        <div className="px-6 sm:px-10 lg:px-16 w-full py-5">
          <HomepageWizardStrip variant="light" content={content.wizard} />
        </div>
      </div>
    </section>
  );
}
