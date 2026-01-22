import { Check } from "lucide-react";
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
          <span className="font-medium text-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-muted-foreground">{stepTitles[currentStep]}</span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
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
                    "step-indicator",
                    isCompleted && "completed",
                    isCurrent && "active",
                    isPending && "pending"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="leading-none">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-[80px]",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {title}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2",
                    isCompleted ? "bg-accent" : "bg-muted"
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
