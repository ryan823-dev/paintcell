import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { QuoteFormData } from "@/types/quote";
import { ChatMessageType } from "./ChatMessage";

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: QuoteFormData;
  chatTranscript: ChatMessageType[];
  summary: string;
  onSuccess: () => void;
}

export function ContactFormModal({
  open,
  onOpenChange,
  formData,
  chatTranscript,
  summary,
  onSuccess,
}: ContactFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact.company || !contact.name || !contact.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Format chat transcript
      const transcriptText = chatTranscript
        .map(m => `[${m.timestamp.toISOString()}] ${m.role.toUpperCase()}: ${m.content}`)
        .join("\n\n");

      // Combine form data with contact info
      const submissionData = {
        ...formData,
        contact_name: contact.name,
        contact_email: contact.email,
        contact_company: contact.company,
        contact_role: contact.role,
        contact_phone: "", // Not collected in AI flow
        contact_message: `[AI Assistant Inquiry]\n\n--- Summary ---\n${summary}\n\n--- Chat Transcript ---\n${transcriptText}`,
        source: 'chat', // Mark as chat source for lead tracking
      };

      // Submit lead via edge function (handles DB insert + email notification)
      const { error } = await supabase.functions.invoke('send-quote-notification', {
        body: submissionData
      });

      if (error) {
        // Log only in development
        if (import.meta.env.DEV) {
          console.error("Submission error:", error);
        }
        toast.error("Failed to submit inquiry. Please try again.");
        return;
      }

      toast.success("Inquiry submitted successfully! Our team will be in touch.");
      onSuccess();
    } catch (error) {
      // Log only in development
      if (import.meta.env.DEV) {
        console.error("Submit error:", error);
      }
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Your Inquiry</DialogTitle>
          <DialogDescription>
            Provide your contact details so our engineering team can follow up.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={contact.company}
              onChange={(e) => setContact(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={contact.name}
                onChange={(e) => setContact(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={contact.role}
                onChange={(e) => setContact(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Your role"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={contact.email}
              onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={contact.country}
              onChange={(e) => setContact(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Your country"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
