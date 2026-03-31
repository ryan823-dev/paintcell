import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, BookOpen, MessageSquare } from "lucide-react";

const DOMAIN = "https://tdpaint.com";

export default function ThankYou() {
  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Thank You — Assessment Submitted | TD</title>
        <meta name="description" content="Your robotic painting project assessment has been submitted. Our engineering team will contact you within 1-2 business days." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${DOMAIN}/thank-you`} />
      </Helmet>

      <div className="container-wide py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 animate-fade-in">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Assessment Submitted Successfully
          </h1>

          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            Thank you for your interest in our robotic painting solutions.
            Our engineering team will review your requirements and contact you within
            <strong className="text-foreground"> 1-2 business days</strong> to discuss your project in detail.
          </p>

          <div className="bg-card rounded-xl border border-border p-6 mb-8 text-left animate-fade-in">
            <h2 className="font-semibold mb-3">What happens next?</h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">1</span>
                <span>Our engineering team reviews your project requirements and production specifications.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">2</span>
                <span>We prepare a preliminary system concept with robot selection and layout recommendation.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">3</span>
                <span>A dedicated project engineer contacts you to discuss the proposal and answer questions.</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/case-studies">
                <BookOpen className="h-4 w-4" />
                View Case Studies
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/resources/engineering-library">
                <MessageSquare className="h-4 w-4" />
                Engineering Library
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            A confirmation email has been sent to your inbox. If you don't receive it within a few minutes, please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
