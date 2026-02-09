import { useNavigate } from "react-router-dom";
import { wizardSteps } from "@/data/wizardSteps";
import { cn } from "@/lib/utils";

const stepTitles = [
  ...wizardSteps.map((s) => s.title),
  "Engineering Review",
  "Contact",
];

export function HomepageWizardStrip() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all duration-200"
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
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pre-Engineering Assessment — 8 Steps
        </p>
        <span className="text-xs text-primary font-medium hidden sm:inline">
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
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                  index === 0
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border"
                )}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-[11px] font-medium text-muted-foreground text-center max-w-[80px] leading-tight">
                {title}
              </span>
            </div>
            {index < stepTitles.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-border" />
            )}
          </div>
        ))}
      </div>

      {/* Step indicators — mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-foreground">8 assessment steps</span>
          <span className="text-muted-foreground text-xs">~4 min</span>
        </div>
        <div className="flex gap-1">
          {stepTitles.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-2 rounded-full",
                index === 0 ? "bg-primary" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
