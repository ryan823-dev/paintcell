import { QuoteFormData } from "@/types/quote";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Building2, Briefcase, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: string) => void;
}

export function ContactForm({ formData, updateFormData }: ContactFormProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Contact Information</h2>
        <p className="text-muted-foreground">
          Complete your assessment by providing your contact details. We'll reach out to discuss your Paint Cell project.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_name"
              value={formData.contact_name}
              onChange={(e) => updateFormData("contact_name", e.target.value)}
              placeholder="John Smith"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={(e) => updateFormData("contact_email", e.target.value)}
              placeholder="john@company.com"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number
            </Label>
            <Input
              id="contact_phone"
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => updateFormData("contact_phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_company"
              value={formData.contact_company}
              onChange={(e) => updateFormData("contact_company", e.target.value)}
              placeholder="Company Name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_role" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Job Title / Role
          </Label>
          <Input
            id="contact_role"
            value={formData.contact_role}
            onChange={(e) => updateFormData("contact_role", e.target.value)}
            placeholder="Engineering Manager"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_message">
            Additional Comments (Optional)
          </Label>
          <Textarea
            id="contact_message"
            value={formData.contact_message}
            onChange={(e) => updateFormData("contact_message", e.target.value)}
            placeholder="Any additional information about your project..."
            rows={4}
          />
        </div>

        {/* What happens next */}
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-primary" />
            What happens next
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>Reviewed by human automation engineers</span>
            </li>
            <li className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>We follow up with clarification questions if needed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
