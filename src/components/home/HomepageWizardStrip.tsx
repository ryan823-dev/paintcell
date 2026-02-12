import { useNavigate } from "react-router-dom";
import { wizardSteps } from "@/data/wizardSteps";
import { cn } from "@/lib/utils";

const stepTitles = wizardSteps.map((s) => s.title);

interface HomepageWizardStripProps {
  variant?: "light" | "dark";
}

export function HomepageWizardStrip({ variant = "light" }: HomepageWizardStripProps) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate("/quote")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate("/quote");
        }
      }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-4">
        <p className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.2em]",
          isDark ? "text-primary-foreground/40" : "text-muted-foreground"
        )}>
          Pre-Engineering Assessment — 6 Steps
        </p>
        <span className={cn(
          "text-xs font-medium",
          isDark ? "text-accent/80 hover:text-accent" : "text-primary hover:text-primary/80"
        )}>
          Start assessment →
        </span>
      </div>

      {/* 6 block tiles — desktop */}
      <div className="hidden md:grid grid-cols-6 gap-2">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={cn(
              "rounded-md px-3 py-3 text-center transition-colors border",
              index === 0
                ? isDark
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-accent text-accent-foreground border-accent"
                : isDark
                  ? "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground/40"
                  : "bg-white border-border/80 text-muted-foreground"
            )}
          >
            <span className={cn(
              "block text-lg font-bold mb-1",
              index === 0
                ? isDark ? "text-accent-foreground" : "text-accent-foreground"
                : isDark ? "text-primary-foreground/30" : "text-muted-foreground/70"
            )}>
              {index + 1}
            </span>
            <span className="block text-[10px] font-medium leading-tight">
              {title}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: compact bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className={cn(
            "font-medium",
            isDark ? "text-primary-foreground/70" : "text-foreground"
          )}>6 assessment steps</span>
          <span className={cn(
            "text-xs",
            isDark ? "text-primary-foreground/40" : "text-muted-foreground"
          )}>~4 min</span>
        </div>
        <div className="flex gap-1">
          {stepTitles.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-1.5 rounded-full",
                index === 0
                  ? "bg-accent"
                  : isDark ? "bg-primary-foreground/10" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
