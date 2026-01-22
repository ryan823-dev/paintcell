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
        <h2 className="text-2xl font-bold text-foreground mb-2">{step.title}</h2>
        <p className="text-muted-foreground">{step.description}</p>
      </div>

      <div className="space-y-8">
        {step.questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <Label className="text-base font-medium text-foreground">
              {question.label}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </Label>

            {question.type === "radio" && (
              <RadioGroup
                value={formData[question.id] as string}
                onValueChange={(value) => updateFormData(question.id, value)}
                className="grid gap-3"
              >
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                      formData[question.id] === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            )}

            {question.type === "checkbox" && (
              <div className="grid gap-3">
                {question.options.map((option) => {
                  const values = (formData[question.id] as string[]) || [];
                  const isChecked = values.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                        isChecked
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(question.id, option.value, checked as boolean)
                        }
                        id={`${question.id}-${option.value}`}
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
