import type { QuoteWizardContent } from "@/content/quote";
import { QuoteFormData } from "@/types/quote";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Building2, Briefcase, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  content: QuoteWizardContent["contactForm"];
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: string) => void;
}

export function ContactForm({ content, formData, updateFormData }: ContactFormProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="grid gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              {content.fields.nameLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_name"
              value={formData.contact_name}
              onChange={(e) => updateFormData("contact_name", e.target.value)}
              placeholder={content.fields.namePlaceholder}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {content.fields.emailLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={(e) => updateFormData("contact_email", e.target.value)}
              placeholder={content.fields.emailPlaceholder}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {content.fields.phoneLabel}
            </Label>
            <Input
              id="contact_phone"
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => updateFormData("contact_phone", e.target.value)}
              placeholder={content.fields.phonePlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              {content.fields.companyLabel} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_company"
              value={formData.contact_company}
              onChange={(e) => updateFormData("contact_company", e.target.value)}
              placeholder={content.fields.companyPlaceholder}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_role" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            {content.fields.roleLabel}
          </Label>
          <Input
            id="contact_role"
            value={formData.contact_role}
            onChange={(e) => updateFormData("contact_role", e.target.value)}
            placeholder={content.fields.rolePlaceholder}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_message">{content.fields.messageLabel}</Label>
          <Textarea
            id="contact_message"
            value={formData.contact_message}
            onChange={(e) => updateFormData("contact_message", e.target.value)}
            placeholder={content.fields.messagePlaceholder}
            rows={4}
          />
        </div>

        {/* What happens next */}
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-primary" />
            {content.nextStepsTitle}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {content.nextSteps.map((item, index) => (
              <li key={item} className="flex items-start gap-2">
                {index === 0 ? (
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                ) : (
                  <MessageSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
