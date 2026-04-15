import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QuoteWizardContent } from "@/content/quote";
import { QuoteFormData, initialFormData } from "@/types/quote";
import { WizardProgress } from "./WizardProgress";
import { WizardStep } from "./WizardStep";
import { WizardSummary } from "./WizardSummary";
import { ContactForm } from "./ContactForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRouteLocale } from "@/hooks/useRouteLocale";

interface QuoteWizardProps {
  content: QuoteWizardContent;
}

export function QuoteWizard({ content }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const locale = useRouteLocale();
  const totalSteps = content.steps.length + 2;

  const updateFormData = (field: keyof QuoteFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep >= content.steps.length) return true;
    const step = content.steps[currentStep];
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
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
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
        toast.error(content.messages.submitError);
        return;
      }
      toast.success(content.messages.submitSuccess);
      navigate(`/${locale}/thank-you`);
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error submitting quote:", error);
      toast.error(content.messages.submitUnknownError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQuestionStep = currentStep < content.steps.length;
  const isSummaryStep = currentStep === content.steps.length;
  const isContactStep = currentStep === content.steps.length + 1;

  const stepTitles = [
    ...content.steps.map((step) => step.title),
    content.stages.review,
    content.stages.contact,
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <WizardProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
        progress={content.progress}
      />

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 min-h-[400px]">
        {isQuestionStep && (
          <WizardStep step={content.steps[currentStep]} formData={formData} updateFormData={updateFormData} />
        )}
        {isSummaryStep && (
          <WizardSummary
            formData={formData}
            steps={content.steps}
            summary={content.summary}
          />
        )}
        {isContactStep && (
          <ContactForm
            content={content.contactForm}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="gap-2 w-full sm:w-auto"
        >
          <ChevronLeft className="h-4 w-4" />
          {content.actions.previous}
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
                {content.actions.submitting}
              </>
            ) : (
              content.actions.submitRequest
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
          >
            {isSummaryStep ? content.actions.continueToContact : content.actions.next}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
