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
      {/* Mobile: AI pipeline bar */}
      <div className="md:hidden mb-4">
        <div className="flex items-center gap-2 text-xs text-primary-foreground/50 mb-2 font-mono">
          <Terminal className="h-3 w-3 text-accent" />
          <span className="text-accent">STEP {currentStep + 1}</span>
          <span>/</span>
          <span>{totalSteps}</span>
          <span className="text-primary-foreground/30">—</span>
          <span className="text-primary-foreground/70">{stepTitles[currentStep]}</span>
        </div>
        <div className="relative h-1 bg-primary-foreground/5 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/60 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
          <div
            className="absolute inset-y-0 left-0 bg-accent/30 blur-sm transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: AI pipeline nodes */}
      <div className="hidden md:block">
        {/* Header line */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-primary-foreground/30 mb-4 tracking-wider">
          <Cpu className="h-3 w-3 text-accent/50" />
          <span>ASSESSMENT PIPELINE</span>
          <div className="flex-1 h-px bg-primary-foreground/5" />
          <span className="text-accent/70">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>

        <div className="flex items-start">
          {stepTitles.map((title, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-start flex-1 last:flex-none">
                <div className="flex flex-col items-center min-w-[44px]">
                  {/* Node */}
                  <div className="relative">
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
                    )}
                    {isCurrent && (
                      <div className="absolute -inset-1 rounded-full bg-accent/10 blur-md" />
                    )}
                    <div
                      className={cn(
                        "relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 border",
                        isCompleted && "bg-accent/15 border-accent/40 text-accent",
                        isCurrent && "bg-accent border-accent text-primary shadow-[0_0_20px_hsl(32_95%_50%/0.35)]",
                        isPending && "bg-transparent border-primary-foreground/10 text-primary-foreground/20"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                  </div>
                  {/* Label */}
                  <span
                    className={cn(
                      "mt-2.5 text-[9px] font-mono text-center max-w-[76px] leading-tight tracking-wide uppercase",
                      isCompleted && "text-accent/60",
                      isCurrent && "text-accent font-semibold",
                      isPending && "text-primary-foreground/20"
                    )}
                  >
                    {title}
                  </span>
                </div>
                {/* Connector */}
                {index < totalSteps - 1 && (
                  <div className="flex-1 flex items-center pt-[18px] px-1">
                    <div className="relative w-full h-px overflow-hidden">
                      <div className={cn(
                        "absolute inset-0",
                        isCompleted ? "bg-accent/30" : "bg-primary-foreground/8"
                      )} />
                      {isCompleted && (
                        <>
                          <div className="absolute inset-0 bg-accent/15 blur-sm" />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-[3px] rounded-full bg-accent/60 blur-[2px]"
                            style={{ animation: 'flowRight 1.5s linear infinite', animationDelay: `${index * 0.3}s` }}
                          />
                        </>
                      )}
                      {isCurrent && (
                        <>
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-[3px] rounded-full bg-accent/70 blur-[2px]"
                            style={{ animation: 'flowRight 2s ease-in-out infinite' }}
                          />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-[2px] rounded-full bg-accent/40 blur-[1px]"
                            style={{ animation: 'flowRight 2s ease-in-out infinite', animationDelay: '0.8s' }}
                          />
                        </>
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
