import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsultationIntroScreenProps {
  onSelectOption: (option: string) => void;
}

const starterOptions = [
  {
    id: "automate",
    icon: Cog,
    label: "I want to automate painting for a part or product",
  },
  {
    id: "improve",
    icon: Sparkles,
    label: "I need to improve quality, consistency, or reduce labor",
  },
  {
    id: "compare",
    icon: HelpCircle,
    label: "I'm comparing solutions and need feasibility guidance",
  },
];

export function ConsultationIntroScreen({ onSelectOption }: ConsultationIntroScreenProps) {
  return (
    <div className="flex-1 flex flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Start a project consultation
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Evaluate your painting application and prepare a structured project summary for an engineering discussion.
        </p>
      </div>

      {/* Body text */}
      <div className="mb-8 space-y-2">
        <p className="text-sm text-muted-foreground">
          Answer a few focused questions to confirm feasibility and clarify requirements.
        </p>
        <p className="text-sm text-muted-foreground">
          Typical time: 2–4 minutes.
        </p>
      </div>

      {/* Starter options */}
      <div className="space-y-3">
        {starterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.label)}
            className={cn(
              "w-full flex items-start gap-4 p-4 rounded-lg",
              "bg-muted/50 hover:bg-muted",
              "border border-border hover:border-primary/30",
              "transition-all duration-200",
              "text-left group"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              <option.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="flex-1 text-sm text-foreground leading-relaxed">
              {option.label}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
          </button>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-auto pt-6 text-xs text-muted-foreground text-center">
        No pricing provided. Human engineers confirm final scope.
      </p>
    </div>
  );
}
