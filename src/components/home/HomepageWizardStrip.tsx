import type { HomeProjectInterfaceContent } from "@/content/home";
import { wizardSteps } from "@/data/wizardSteps";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { cn } from "@/lib/utils";

const stepTitles = wizardSteps.map((step) => step.title);

interface HomepageWizardStripProps {
  variant?: "light" | "dark";
  content?: HomeProjectInterfaceContent["wizard"];
}

const defaultWizardContent: HomeProjectInterfaceContent["wizard"] = {
  label: "Pre-Engineering Assessment - 6 Steps",
  ctaLabel: "Start assessment ->",
  mobileStepsLabel: "6 assessment steps",
  mobileDurationLabel: "~4 min",
};

export function HomepageWizardStrip({
  variant = "light",
  content = defaultWizardContent,
}: HomepageWizardStripProps) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate("/quote")}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate("/quote");
        }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.2em]",
            isDark ? "text-primary-foreground/40" : "text-muted-foreground",
          )}
        >
          {content.label}
        </p>
        <span
          className={cn(
            "text-xs font-medium",
            isDark ? "text-accent/80 hover:text-accent" : "text-primary hover:text-primary/80",
          )}
        >
          {content.ctaLabel}
        </span>
      </div>

      <div className="hidden md:grid grid-cols-6 gap-2">
        {stepTitles.map((title, index) => (
          <div
            key={title}
            className={cn(
              "rounded-md px-3 py-3 text-center transition-colors border",
              index === 0
                ? "bg-accent text-accent-foreground border-accent"
                : isDark
                  ? "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground/40"
                  : "bg-white border-border/80 text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "block text-lg font-bold mb-1",
                index === 0
                  ? "text-accent-foreground"
                  : isDark
                    ? "text-primary-foreground/30"
                    : "text-muted-foreground/70",
              )}
            >
              {index + 1}
            </span>
            <span className="block text-[10px] font-medium leading-tight">{title}</span>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span
            className={cn(
              "font-medium",
              isDark ? "text-primary-foreground/70" : "text-foreground",
            )}
          >
            {content.mobileStepsLabel}
          </span>
          <span
            className={cn(
              "text-xs",
              isDark ? "text-primary-foreground/40" : "text-muted-foreground",
            )}
          >
            {content.mobileDurationLabel}
          </span>
        </div>
        <div className="flex gap-1">
          {stepTitles.map((title, index) => (
            <div
              key={title}
              className={cn(
                "flex-1 h-1.5 rounded-full",
                index === 0 ? "bg-accent" : isDark ? "bg-primary-foreground/10" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
