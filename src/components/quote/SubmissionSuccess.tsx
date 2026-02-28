import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";

export function SubmissionSuccess() {
  return (
    <div className="max-w-xl mx-auto text-center py-12 animate-fade-in">
      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10">
        <CheckCircle className="h-10 w-10 text-accent" />
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-4">
        Assessment Submitted Successfully
      </h2>

      <p className="text-lg text-muted-foreground mb-8">
        Thank you for your interest in our robotic spray painting solutions.
        Our engineering team will review your requirements and contact you within 1-2 business days 
        to discuss your project in detail.
      </p>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to your inbox.
        </p>

        <Button asChild variant="outline" className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
