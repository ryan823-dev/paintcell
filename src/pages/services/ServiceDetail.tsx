import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight, FileText, ArrowLeft, CheckCircle2,
  Users, Wrench, Settings, GraduationCap, Headphones,
  Bot, Cog, Code, Monitor, Building, Video
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const DOMAIN = "https://tdpaintcell.com";

// Training types data
const trainingTypes = [
  {
    icon: Bot,
    titleKey: "operatorTraining",
    defaultTitle: "Operator Training",
    descKey: "operatorTrainingDesc",
    defaultDesc: "Essential skills for daily system operation, safety protocols, and basic troubleshooting.",
    topics: ["System startup/shutdown", "Safety procedures", "Basic troubleshooting", "Quality monitoring"],
    duration: "2-3 days",
  },
  {
    icon: Cog,
    titleKey: "maintenanceTraining",
    defaultTitle: "Maintenance Training",
    descKey: "maintenanceTrainingDesc",
    defaultDesc: "Preventive maintenance, component replacement, and system calibration procedures.",
    topics: ["Preventive maintenance", "Component replacement", "Calibration procedures", "Spare parts management"],
    duration: "3-5 days",
  },
  {
    icon: Code,
    titleKey: "advancedProgramming",
    defaultTitle: "Advanced Programming",
    descKey: "advancedProgrammingDesc",
    defaultDesc: "Robot path programming, spray parameter optimization, and recipe development.",
    topics: ["Robot programming", "Path optimization", "Recipe development", "Process tuning"],
    duration: "5-10 days",
  },
];

const deliveryMethods = [
  {
    icon: Building,
    titleKey: "onSiteTraining",
    defaultTitle: "On-Site Training",
    descKey: "onSiteTrainingDesc",
    defaultDesc: "Training conducted at your facility using your equipment and production environment.",
  },
  {
    icon: Monitor,
    titleKey: "inHouseTraining",
    defaultTitle: "In-House Training",
    descKey: "inHouseTrainingDesc",
    defaultDesc: "Training at our facility with dedicated equipment and simulation systems.",
  },
  {
    icon: Video,
    titleKey: "virtualTraining",
    defaultTitle: "Virtual Training",
    descKey: "virtualTrainingDesc",
    defaultDesc: "Remote training sessions for refresher courses and supplementary education.",
  },
];

// Service slug to translation key mapping
const serviceKeyMap: Record<string, { translationKey: string; icon: typeof Users }> = {
  "solution-design": { translationKey: "solutionDesign", icon: FileText },
  "project-management": { translationKey: "projectManagement", icon: Settings },
  "commissioning": { translationKey: "commissioningService", icon: Wrench },
  "maintenance": { translationKey: "maintenanceService", icon: Headphones },
  "training": { translationKey: "trainingService", icon: GraduationCap },
  "consulting": { translationKey: "consultingService", icon: Users },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const page = t.serviceDetail || {};
  
  const serviceConfig = slug ? serviceKeyMap[slug] : null;
  const data = serviceConfig ? page[serviceConfig.translationKey] : null;

  if (!data || !serviceConfig) {
    return (
      <div className="bg-background py-20">
        <div className="container-wide text-center">
          <h1 className="text-2xl font-bold mb-4">{page.notFound || "Service Not Found"}</h1>
          <p className="text-muted-foreground mb-6">{page.notFoundMessage || "The requested service does not exist."}</p>
          <Button asChild>
            <Link to="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {page.backToServices || "Back to Services"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = serviceConfig.icon;
  const processData = data.process || {};
  const processSteps = [
    { step: "1", key: "step1" },
    { step: "2", key: "step2" },
    { step: "3", key: "step3" },
    { step: "4", key: "step4" },
  ];

  return (
    <>
      <Helmet>
        <title>{data.title || ""} | TD Painting Systems</title>
        <meta name="description" content={data.description || ""} />
        <link rel="canonical" href={`${DOMAIN}/services/${slug}`} />
      </Helmet>

      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container-wide py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/services" className="hover:text-foreground">{page.services || "Services"}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{data.title || ""}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title || ""}</h1>
                <p className="text-muted-foreground leading-relaxed">{data.details || ""}</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.whatYouGet || "What You Get"}
                </p>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  {page.deliverables || "Deliverables"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {(data.deliverables || []).map((item: string, i: number) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Training Types - Only for training service */}
        {slug === "training" && (
          <section className="py-12 md:py-16 border-b border-border">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {page.trainingPrograms || "Training Programs"}
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                    {page.trainingTypes || "Training Types"}
                  </h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <StaggerContainer className="grid md:grid-cols-3 gap-6">
                {trainingTypes.map((type) => {
                  const trainingData = data.trainingTypes?.[type.titleKey] || {};
                  return (
                    <StaggerItem key={type.titleKey}>
                      <Card className="border-border bg-card h-full hover:border-accent/30 transition-colors">
                        <CardContent className="p-6">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                            <type.icon className="h-6 w-6 text-accent" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {trainingData.title || type.defaultTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {trainingData.description || type.defaultDesc}
                          </p>
                          <div className="pt-4 border-t border-border">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              {page.topics || "Topics Covered"}
                            </p>
                            <ul className="space-y-1.5 mb-4">
                              {(trainingData.topics || type.topics).map((topic: string, i: number) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <ChevronRight className="h-3 w-3 text-accent" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-medium">{page.duration || "Duration"}:</span>
                              <span className="text-muted-foreground">{trainingData.duration || type.duration}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* Delivery Methods - Only for training service */}
        {slug === "training" && (
          <section className="py-12 md:py-16 border-b border-border bg-muted/30">
            <div className="container-wide">
              <FadeIn>
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {page.flexibility || "Flexibility"}
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                    {page.deliveryMethods || "Delivery Methods"}
                  </h2>
                  <div className="h-px w-12 bg-accent/50" />
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-6">
                {deliveryMethods.map((method, index) => {
                  const methodData = data.deliveryMethods?.[method.titleKey] || {};
                  return (
                    <FadeIn key={method.titleKey} delay={index * 0.1}>
                      <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <method.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{methodData.title || method.defaultTitle}</h3>
                          <p className="text-sm text-muted-foreground">{methodData.description || method.defaultDesc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Process */}
        <section className="py-12 md:py-16 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {page.howItWorks || "How It Works"}
                </p>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  {page.serviceProcess || "Service Process"}
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((item, index) => {
                const stepData = processData[item.key] || {};
                return (
                  <FadeIn key={item.step} delay={index * 0.1}>
                    <div className="rounded-xl border border-border bg-card p-5 h-full">
                      <span className="text-2xl font-bold text-accent/60 mb-2 block">{item.step}</span>
                      <h3 className="text-sm font-semibold mb-1">{stepData.title || ""}</h3>
                      <p className="text-xs text-muted-foreground">{stepData.description || ""}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">{page.readyToStart || "Ready to Get Started?"}</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                  {page.contactUs || "Contact us to discuss your"} {(data.title || "").toLowerCase()} {page.requirements || "requirements."}
                </p>
                <Button asChild>
                  <Link to="/quote">
                    <FileText className="h-4 w-4 mr-2" />
                    {page.requestQuote || "Request Service Quote"}
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
