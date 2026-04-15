import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, BookOpen, MessageSquare } from "lucide-react";
import { useI18n } from "@/i18n";
import { buildLocalizedUrl } from "@/lib/seo";

export default function ThankYou() {
  const { locale, t } = useI18n();
  const thankYouT = t.thankYou || {};

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{thankYouT.metaTitle || "Thank You | Assessment Submitted | TD Painting Systems"}</title>
        <meta
          name="description"
          content={
            thankYouT.metaDescription ||
            "Your robotic painting project assessment has been submitted. Our engineering team will contact you within 1-2 business days."
          }
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={buildLocalizedUrl(locale, "/thank-you")} />
      </Helmet>

      <div className="container-wide py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 animate-fade-in">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            {thankYouT.title || "Assessment Submitted Successfully"}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            {thankYouT.intro ||
              "Thank you for your interest in our robotic painting solutions. Our engineering team will review your requirements and contact you within 1-2 business days to discuss your project in detail."}
          </p>

          <div className="bg-card rounded-xl border border-border p-6 mb-8 text-left animate-fade-in">
            <h2 className="font-semibold mb-3">{thankYouT.nextStepsTitle || "What happens next?"}</h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {(thankYouT.steps || []).map((step: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                {thankYouT.returnHome || "Return to Home"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/case-studies">
                <BookOpen className="h-4 w-4" />
                {thankYouT.viewCaseStudies || "View Case Studies"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/resources/engineering-library">
                <MessageSquare className="h-4 w-4" />
                {thankYouT.engineeringLibrary || t.common.engineeringLibrary}
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            {thankYouT.emailNotice ||
              "A confirmation email has been sent to your inbox. If you do not receive it within a few minutes, please check your spam folder."}
          </p>
        </div>
      </div>
    </div>
  );
}
