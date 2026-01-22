import { QuoteFormData, getOptionLabel } from "@/types/quote";
import { wizardSteps } from "@/data/wizardSteps";
import { FileText } from "lucide-react";

interface WizardSummaryProps {
  formData: QuoteFormData;
}

export function WizardSummary({ formData }: WizardSummaryProps) {
  const formatValue = (value: string | string[]): string => {
    if (Array.isArray(value)) {
      return value.map(getOptionLabel).join(", ");
    }
    return getOptionLabel(value);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Configuration</h2>
          <p className="text-muted-foreground">
            Please review your selections before proceeding. You can go back to make changes if needed.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {wizardSteps.map((step, stepIndex) => (
          <div key={stepIndex} className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">
                Step {stepIndex + 1}: {step.title}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {step.questions.map((question) => {
                const value = formData[question.id];
                const displayValue = formatValue(value);

                return (
                  <div key={question.id} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                    <span className="text-sm text-muted-foreground">{question.label}</span>
                    <span className="text-sm font-medium text-foreground sm:text-right">
                      {displayValue || "Not specified"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
