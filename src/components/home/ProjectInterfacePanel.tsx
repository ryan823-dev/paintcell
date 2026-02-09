import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

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

export function ProjectInterfacePanel() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    sessionStorage.setItem("project-init-message", option);
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  const handleOpenAssistant = () => {
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  return (
    <section className="bg-background">
      <div className="container-wide py-10 md:py-16 space-y-10">

        {/* ===== TOP: AI Consultation Panel ===== */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Start a project consultation
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Evaluate your painting application and prepare a structured project summary for an engineering discussion.
            </p>
          </div>

          {/* Context line */}
          <div className="mb-6 space-y-1">
            <p className="text-sm text-muted-foreground">
              Answer a few focused questions to confirm feasibility and clarify requirements.
            </p>
            <p className="text-sm text-muted-foreground">
              Typical time: 2–4 minutes.
            </p>
          </div>

          {/* Starter action cards */}
          <div className="space-y-3 mb-8">
            {starterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.label)}
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

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleOpenAssistant}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-11 px-6 gap-2"
            >
              Enter project wizard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/quote")}
              className="h-11 px-6 font-medium"
            >
              Traditional inquiry entrance
            </Button>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-xs text-muted-foreground">
            No pricing provided. Human engineers confirm final scope.
          </p>
        </div>

        {/* ===== BOTTOM: Wizard Progress Strip ===== */}
        <HomepageWizardStrip />

      </div>
    </section>
  );
}
