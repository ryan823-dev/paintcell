import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";
import { QuoteFormData, initialFormData } from "@/types/quote";
import { wizardSteps } from "@/data/wizardSteps";
import { WizardProgress } from "./WizardProgress";
import { WizardStep } from "./WizardStep";
import { WizardSummary } from "./WizardSummary";
import { ContactForm } from "./ContactForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TOTAL_STEPS = 8;

export function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { locale } = useI18n();

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-quote-notification', {
        body: { ...formData, source: 'wizard' }
      });
      if (error) {
        if (import.meta.env.DEV) console.error("Error sending notification:", error);
        toast.error("Failed to send quote request. Please try again.");
        return;
      }
      toast.success("Quote request submitted successfully!");
      navigate(`/${locale}/thank-you`);
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error submitting quote:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQuestionStep = currentStep < wizardSteps.length;
  const isSummaryStep = currentStep === wizardSteps.length;
  const isContactStep = currentStep === wizardSteps.length + 1;

  const stepTitles = [
    ...wizardSteps.map((s) => s.title),
    "Engineering Review",
    "Contact",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <WizardProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} stepTitles={stepTitles} />

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 min-h-[400px]">
        {isQuestionStep && (
          <WizardStep step={wizardSteps[currentStep]} formData={formData} updateFormData={updateFormData} />
        )}
        {isSummaryStep && <WizardSummary formData={formData} />}
        {isContactStep && <ContactForm formData={formData} updateFormData={updateFormData} />}
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="gap-2 w-full sm:w-auto"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {isContactStep ? (
          <Button
            onClick={handleSubmit}
            disabled={!formData.contact_name || !formData.contact_email || !formData.contact_company || isSubmitting}
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
          >
            {isSummaryStep ? "Continue to Contact" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
