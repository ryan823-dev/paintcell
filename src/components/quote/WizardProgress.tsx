import { Check, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function WizardProgress({ currentStep, totalSteps, stepTitles }: WizardProgressProps) {
  return (
    <div className="mb-8">
      {/* Step indicator for mobile */}
      <div className="md:hidden mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary-foreground flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-accent" />
            Phase {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-primary-foreground/40 text-xs">{stepTitles[currentStep]}</span>
        </div>
        <div className="mt-3 h-1.5 bg-primary-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicator for desktop */}
      <div className="hidden md:flex items-center justify-between">
        {stepTitles.map((title, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center min-w-[40px]">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all shrink-0",
                    isCompleted && "bg-accent text-accent-foreground",
                    isCurrent && "bg-accent text-accent-foreground shadow-[0_0_12px_hsl(32_95%_50%/0.4)]",
                    isPending && "bg-primary-foreground/8 text-primary-foreground/30 border border-primary-foreground/10"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="leading-none font-semibold">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-[10px] font-medium text-center max-w-[80px]",
                    isCurrent ? "text-primary-foreground font-semibold" : "text-primary-foreground/35"
                  )}
                >
                  {title}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2",
                    isCompleted ? "bg-accent/50" : "bg-primary-foreground/10"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
