import { WizardStep as WizardStepType } from "@/types/quote";
import { QuoteFormData } from "@/types/quote";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface WizardStepProps {
  step: WizardStepType;
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: string | string[]) => void;
}

export function WizardStep({ step, formData, updateFormData }: WizardStepProps) {
  const handleCheckboxChange = (questionId: keyof QuoteFormData, value: string, checked: boolean) => {
    const currentValues = (formData[questionId] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    updateFormData(questionId, newValues);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary-foreground mb-2">{step.title}</h2>
        <p className="text-primary-foreground/50 text-sm">{step.description}</p>
        {step.helperText && (
          <p className="text-xs text-primary-foreground/30 mt-2 italic">{step.helperText}</p>
        )}
      </div>

      <div className="space-y-8">
        {step.questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <Label className="text-sm font-medium text-primary-foreground/80">
              {question.label}
              {question.required && <span className="text-accent ml-1">*</span>}
            </Label>

            {question.type === "radio" && (
              <RadioGroup
                value={formData[question.id] as string}
                onValueChange={(value) => updateFormData(question.id, value)}
                className="grid gap-2"
              >
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all",
                      formData[question.id] === option.value
                        ? "border-accent/50 bg-accent/10 text-primary-foreground"
                        : "border-primary-foreground/10 hover:border-primary-foreground/20 hover:bg-primary-foreground/5 text-primary-foreground/70"
                    )}
                  >
                    <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="border-primary-foreground/30 text-accent" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            )}

            {question.type === "checkbox" && (
              <div className="grid gap-2">
                {question.options.map((option) => {
                  const values = (formData[question.id] as string[]) || [];
                  const isChecked = values.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all",
                        isChecked
                          ? "border-accent/50 bg-accent/10 text-primary-foreground"
                          : "border-primary-foreground/10 hover:border-primary-foreground/20 hover:bg-primary-foreground/5 text-primary-foreground/70"
                      )}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(question.id, option.value, checked as boolean)
                        }
                        id={`${question.id}-${option.value}`}
                        className="border-primary-foreground/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
