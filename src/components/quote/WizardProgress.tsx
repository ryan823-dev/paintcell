import { Check, Terminal, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function WizardProgress({ currentStep, totalSteps, stepTitles }: WizardProgressProps) {
  return (
    <div className="mb-8">
      {/* Mobile */}
      <div className="md:hidden mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-mono">
          <Terminal className="h-3 w-3 text-accent" />
          <span className="text-accent">STEP {currentStep + 1}</span>
          <span>/</span>
          <span>{totalSteps}</span>
          <span className="text-border">—</span>
          <span className="text-heading">{stepTitles[currentStep]}</span>
        </div>
        <div className="relative h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mb-4 tracking-wider">
          <Cpu className="h-3 w-3 text-accent/70" />
          <span>ASSESSMENT PIPELINE</span>
          <div className="flex-1 h-px bg-border" />
          <span className="text-accent">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>

        <div className="flex items-start">
          {stepTitles.map((title, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-start flex-1 last:flex-none">
                <div className="flex flex-col items-center min-w-[44px]">
                  <div className="relative">
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
                    )}
                    <div
                      className={cn(
                        "relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 border",
                        isCompleted && "bg-accent/15 border-accent/50 text-accent",
                        isCurrent && "bg-accent border-accent text-white shadow-[0_0_20px_hsl(192_70%_38%/0.35)]",
                        isPending && "bg-white border-border text-muted-foreground/50"
                      )}
                    >
                      {isCompleted ? <Check className="h-3.5 w-3.5" /> : <span>{index + 1}</span>}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "mt-2.5 text-[9px] font-mono text-center max-w-[76px] leading-tight tracking-wide uppercase",
                      isCompleted && "text-accent/70",
                      isCurrent && "text-accent font-semibold",
                      isPending && "text-muted-foreground/40"
                    )}
                  >
                    {title}
                  </span>
                </div>
                {index < totalSteps - 1 && (
                  <div className="flex-1 flex items-center pt-[18px] px-1">
                    <div className="relative w-full h-px overflow-hidden">
                      <div className={cn(
                        "absolute inset-0",
                        isCompleted ? "bg-accent/30" : "bg-border"
                      )} />
                      {isCompleted && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-[3px] rounded-full bg-accent/50 blur-[2px]"
                          style={{ animation: 'flowRight 1.5s linear infinite', animationDelay: `${index * 0.3}s` }}
                        />
                      )}
                      {isCurrent && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-[3px] rounded-full bg-accent/60 blur-[2px]"
                          style={{ animation: 'flowRight 2s ease-in-out infinite' }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
