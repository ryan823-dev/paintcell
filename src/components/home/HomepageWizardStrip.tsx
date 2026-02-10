import { useNavigate } from "react-router-dom";
import { wizardSteps } from "@/data/wizardSteps";
import { cn } from "@/lib/utils";

const stepTitles = [
  ...wizardSteps.map((s) => s.title),
  "Engineering Review",
  "Contact",
];

interface HomepageWizardStripProps {
  variant?: "light" | "dark";
}

export function HomepageWizardStrip({ variant = "light" }: HomepageWizardStripProps) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "rounded-lg p-4 cursor-pointer transition-all duration-200",
        isDark
          ? "hover:bg-primary-foreground/5"
          : "bg-card border border-border hover:border-primary/20 hover:shadow-sm p-6"
      )}
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
      {/* Label */}
      <div className="flex items-center justify-between mb-4">
        <p className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.2em]",
          isDark ? "text-primary-foreground/40" : "text-muted-foreground"
        )}>
          Pre-Engineering Assessment — 8 Steps
        </p>
        <span className={cn(
          "text-xs font-medium hidden sm:inline",
          isDark ? "text-accent/80" : "text-primary"
        )}>
          Start assessment →
        </span>
      </div>

      {/* Step indicators — desktop */}
      <div className="hidden md:flex items-center justify-between">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center min-w-[40px]">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors",
                  index === 0
                    ? isDark
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-primary text-primary-foreground border-primary"
                    : isDark
                      ? "bg-primary-foreground/8 text-primary-foreground/50 border-primary-foreground/15"
                      : "bg-muted text-muted-foreground border-border"
                )}
              >
                {index + 1}
              </div>
              <span className={cn(
                "mt-1.5 text-[10px] font-medium text-center max-w-[72px] leading-tight",
                isDark ? "text-primary-foreground/40" : "text-muted-foreground"
              )}>
                {title}
              </span>
            </div>
            {index < stepTitles.length - 1 && (
              <div className={cn(
                "flex-1 h-px mx-1.5",
                isDark ? "bg-primary-foreground/10" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step indicators — mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className={cn(
            "font-medium",
            isDark ? "text-primary-foreground/70" : "text-foreground"
          )}>8 assessment steps</span>
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
