import type { QuoteWizardContent } from "@/content/quote";
import { Check, Cpu, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  progress: QuoteWizardContent["progress"];
}

export function WizardProgress({ currentStep, totalSteps, stepTitles, progress }: WizardProgressProps) {
  return (
    <div className="mb-8">
      <div className="mb-4 md:hidden">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Terminal className="h-3 w-3 text-accent" />
          <span className="text-accent">
            {progress.stepLabel} {currentStep + 1}
          </span>
          <span>/</span>
          <span>{totalSteps}</span>
          <span className="text-border">/</span>
          <span className="text-heading">{stepTitles[currentStep]}</span>
        </div>
        <div className="relative h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mb-4 flex items-center gap-2 text-[10px] tracking-wider text-muted-foreground">
          <Cpu className="h-3 w-3 text-accent/70" />
          <span>{progress.pipelineLabel}</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-accent">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>

        <div className="flex items-start">
          {stepTitles.map((title, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex flex-1 items-start last:flex-none">
                <div className="flex min-w-[44px] flex-col items-center">
                  <div className="relative">
                    {isCurrent ? (
                      <div
                        className="absolute inset-0 animate-ping rounded-full bg-accent/20"
                        style={{ animationDuration: "2s" }}
                      />
                    ) : null}
                    <div
                      className={cn(
                        "relative flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300",
                        isCompleted && "border-accent/50 bg-accent/15 text-accent",
                        isCurrent && "border-accent bg-accent text-white shadow-[0_0_20px_hsl(192_70%_38%/0.35)]",
                        isPending && "border-border bg-white text-muted-foreground/50",
                      )}
                    >
                      {isCompleted ? <Check className="h-3.5 w-3.5" /> : <span>{index + 1}</span>}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "mt-2.5 max-w-[76px] text-center text-[9px] uppercase leading-tight tracking-wide",
                      isCompleted && "text-accent/70",
                      isCurrent && "font-semibold text-accent",
                      isPending && "text-muted-foreground/40",
                    )}
                  >
                    {title}
                  </span>
                </div>
                {index < totalSteps - 1 ? (
                  <div className="flex flex-1 items-center px-1 pt-[18px]">
                    <div className="relative h-px w-full overflow-hidden">
                      <div className={cn("absolute inset-0", isCompleted ? "bg-accent/30" : "bg-border")} />
                      {isCompleted ? (
                        <div
                          className="absolute top-1/2 h-[3px] w-3 -translate-y-1/2 rounded-full bg-accent/50 blur-[2px]"
                          style={{ animation: "flowRight 1.5s linear infinite", animationDelay: `${index * 0.3}s` }}
                        />
                      ) : null}
                      {isCurrent ? (
                        <div
                          className="absolute top-1/2 h-[3px] w-4 -translate-y-1/2 rounded-full bg-accent/60 blur-[2px]"
                          style={{ animation: "flowRight 2s ease-in-out infinite" }}
                        />
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
