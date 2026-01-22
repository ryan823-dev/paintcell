import { useState } from "react";
import { QuoteFormData, initialFormData } from "@/types/quote";
import { wizardSteps } from "@/data/wizardSteps";
import { WizardProgress } from "./WizardProgress";
import { WizardStep } from "./WizardStep";
import { WizardSummary } from "./WizardSummary";
import { ContactForm } from "./ContactForm";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_STEPS = 8; // 6 question steps + summary + contact

export function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const updateFormData = (field: keyof QuoteFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep >= wizardSteps.length) return true;
    
    const step = wizardSteps[currentStep];
    return step.questions.every((question) => {
      const value = formData[question.id];
      if (question.type === "checkbox") {
        const arr = value as string[];
        return arr.length >= (question.minSelections || 1);
      }
      return value !== "";
    });
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // In a real app, this would send to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <SubmissionSuccess />;
  }

  const isQuestionStep = currentStep < wizardSteps.length;
  const isSummaryStep = currentStep === wizardSteps.length;
  const isContactStep = currentStep === wizardSteps.length + 1;

  const stepTitles = [
    ...wizardSteps.map((s) => s.title),
    "Review Summary",
    "Contact Information",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <WizardProgress
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        stepTitles={stepTitles}
      />

      {/* Step Content */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm min-h-[400px]">
        {isQuestionStep && (
          <WizardStep
            step={wizardSteps[currentStep]}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {isSummaryStep && (
          <WizardSummary formData={formData} />
        )}

        {isContactStep && (
          <ContactForm formData={formData} updateFormData={updateFormData} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {isContactStep ? (
          <Button
            onClick={handleSubmit}
            disabled={!formData.contact_name || !formData.contact_email || !formData.contact_company}
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
          >
            Submit Request
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className="gap-2"
          >
            {isSummaryStep ? "Continue to Contact" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
