import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import {
  ChevronRight, FileText, ArrowLeft, CheckCircle2,
  Users, Wrench, Settings, GraduationCap, Headphones
} from "lucide-react";

const DOMAIN = "https://tdpaintcell.com";

// Service data - in production this would come from database
const serviceData: Record<string, {
  title: string;
  titleZh: string;
  description: string;
  icon: typeof Users;
  details: string;
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
}> = {
  "solution-design": {
    title: "Solution Design",
    titleZh: "方案设计",
    description: "Complete engineering design services from concept through detailed engineering.",
    icon: FileText,
    details: "Our solution design services cover the full spectrum of engineering activities required to develop a complete coating system specification. From initial concept development through detailed engineering, we provide comprehensive documentation and specifications for your project.",
    deliverables: [
      "Concept layouts and process flow diagrams",
      "Equipment specifications and data sheets",
      "Utility requirement calculations",
      "Control system architecture",
      "Safety and compliance documentation",
      "Project cost estimates",
    ],
    process: [
      { step: "1", title: "Requirements Gathering", description: "Define production targets, quality requirements, and constraints" },
      { step: "2", title: "Concept Development", description: "Create preliminary layouts and process concepts" },
      { step: "3", title: "Detail Engineering", description: "Develop complete specifications and documentation" },
      { step: "4", title: "Review & Approval", description: "Final review and client approval process" },
    ],
  },
  "project-management": {
    title: "Project Management",
    titleZh: "项目管理",
    description: "End-to-end project delivery management for coating system installations.",
    icon: Settings,
    details: "Our project management services ensure successful delivery of your coating system project. We coordinate all aspects of the project from procurement through commissioning, managing timelines, vendors, and quality to deliver on your objectives.",
    deliverables: [
      "Project schedule and milestone tracking",
      "Vendor management and coordination",
      "Quality control documentation",
      "Progress reporting and communication",
      "Risk management and mitigation",
      "Budget tracking and cost control",
    ],
    process: [
      { step: "1", title: "Planning", description: "Develop detailed project plan and schedule" },
      { step: "2", title: "Procurement", description: "Manage equipment and material procurement" },
      { step: "3", title: "Installation", description: "Oversee on-site installation activities" },
      { step: "4", title: "Closeout", description: "Final documentation and handover" },
    ],
  },
  "commissioning": {
    title: "Commissioning",
    titleZh: "工艺调试",
    description: "Process optimization and production validation for coating systems.",
    icon: Wrench,
    details: "Our commissioning services bring your coating system to optimal performance. We handle robot programming, spray parameter optimization, and production validation to ensure your system delivers the quality and throughput you require.",
    deliverables: [
      "Robot path programs and recipes",
      "Spray parameter documentation",
      "Quality validation reports",
      "Operator training materials",
      "Maintenance procedures",
      "Production startup support",
    ],
    process: [
      { step: "1", title: "System Checkout", description: "Verify equipment installation and function" },
      { step: "2", title: "Programming", description: "Develop and test robot programs" },
      { step: "3", title: "Optimization", description: "Fine-tune spray parameters for quality" },
      { step: "4", title: "Validation", description: "Production trials and sign-off" },
    ],
  },
  "maintenance": {
    title: "Maintenance & Support",
    titleZh: "维修维护",
    description: "Preventive maintenance and technical support for coating operations.",
    icon: Headphones,
    details: "Our maintenance services keep your coating system running at peak performance. We offer preventive maintenance programs, emergency repair services, and remote technical support to minimize downtime and maintain quality.",
    deliverables: [
      "Preventive maintenance schedules",
      "Spare parts inventory planning",
      "Emergency response support",
      "Remote diagnostics assistance",
      "Performance monitoring reports",
      "Equipment upgrade recommendations",
    ],
    process: [
      { step: "1", title: "Assessment", description: "Evaluate current system condition" },
      { step: "2", title: "Planning", description: "Develop maintenance schedule and parts list" },
      { step: "3", title: "Execution", description: "Perform maintenance activities" },
      { step: "4", title: "Reporting", description: "Document work and recommendations" },
    ],
  },
  "training": {
    title: "Training",
    titleZh: "培训服务",
    description: "Operator and technician training for coating system operations.",
    icon: GraduationCap,
    details: "Our training programs build the skills your team needs to operate and maintain your coating system effectively. We provide hands-on training, certification programs, and ongoing education to ensure your team can maximize system performance.",
    deliverables: [
      "Customized training curricula",
      "Hands-on practical sessions",
      "Training documentation and manuals",
      "Certification assessments",
      "Refresher training programs",
      "Train-the-trainer options",
    ],
    process: [
      { step: "1", title: "Needs Analysis", description: "Assess training requirements and skill gaps" },
      { step: "2", title: "Curriculum Design", description: "Develop customized training program" },
      { step: "3", title: "Delivery", description: "Conduct training sessions" },
      { step: "4", title: "Assessment", description: "Evaluate and certify participants" },
    ],
  },
  "consulting": {
    title: "Engineering Consulting",
    titleZh: "工程咨询",
    description: "Expert consulting for coating process improvement and optimization.",
    icon: Users,
    details: "Our consulting services provide expert guidance on improving your coating operations. Whether you need process audits, capacity planning, quality troubleshooting, or technology assessments, our experienced engineers deliver actionable insights.",
    deliverables: [
      "Process audit reports",
      "Improvement recommendations",
      "Capacity analysis studies",
      "Quality investigation reports",
      "Technology roadmaps",
      "ROI analysis for upgrades",
    ],
    process: [
      { step: "1", title: "Discovery", description: "Understand current state and objectives" },
      { step: "2", title: "Analysis", description: "Assess data and identify opportunities" },
      { step: "3", title: "Recommendations", description: "Develop actionable improvement plan" },
      { step: "4", title: "Support", description: "Assist with implementation as needed" },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? serviceData[slug] : null;

  if (!data) {
    return (
      <div className="bg-background py-20">
        <div className="container-wide text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested service does not exist.</p>
          <Button asChild>
            <Link to="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <>
      <Helmet>
        <title>{data.title} | TD Painting Systems</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={`${DOMAIN}/services/${slug}`} />
      </Helmet>

      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container-wide py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/services" className="hover:text-foreground">Services</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{data.title}</span>
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
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>
                <p className="text-muted-foreground leading-relaxed">{data.details}</p>
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
                  What You Get
                </p>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  Deliverables
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
              {data.deliverables.map((item, i) => (
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

        {/* Process */}
        <section className="py-12 md:py-16 border-b border-border bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  How It Works
                </p>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  Service Process
                </h2>
                <div className="h-px w-12 bg-accent/50" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.process.map((item, index) => (
                <FadeIn key={item.step} delay={index * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-5 h-full">
                    <span className="text-2xl font-bold text-accent/60 mb-2 block">{item.step}</span>
                    <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            <FadeIn>
              <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Ready to Get Started?</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                  Contact us to discuss your {data.title.toLowerCase()} requirements.
                </p>
                <Button asChild>
                  <Link to="/quote">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Service Quote
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
