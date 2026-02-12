import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { I18nProvider } from "@/i18n";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Quote from "./pages/Quote";
import Applications from "./pages/Applications";
import PaintCells from "./pages/PaintCells";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
// Engineering Library pages
import EngineeringLibrary from "./pages/resources/EngineeringLibrary";
import GuidesChecklists from "./pages/resources/GuidesChecklists";
import Insights from "./pages/resources/Insights";
import FAQs from "./pages/resources/FAQs";
import PaintCellFeasibilityChecks from "./pages/resources/PaintCellFeasibilityChecks";
import AutomationBoundary from "./pages/resources/AutomationBoundary";

// Standards & Compliance pages
import StandardsCompliance from "./pages/resources/StandardsCompliance";
import VentilationAirflow from "./pages/resources/VentilationAirflow";
import VOCSolventHandling from "./pages/resources/VOCSolventHandling";
import GroundingStaticControl from "./pages/resources/GroundingStaticControl";

// Glossary pages
import Glossary from "./pages/resources/Glossary";
import TaktTime from "./pages/resources/glossary/TaktTime";
import Overspray from "./pages/resources/glossary/Overspray";
import TransferEfficiency from "./pages/resources/glossary/TransferEfficiency";
import FilmBuild from "./pages/resources/glossary/FilmBuild";
import ColorChangeover from "./pages/resources/glossary/ColorChangeover";
import Atomization from "./pages/resources/glossary/Atomization";
import BoothAirflow from "./pages/resources/glossary/BoothAirflow";
import TwoKPaint from "./pages/resources/glossary/TwoKPaint";

// Tools & Templates pages
import ToolsTemplates from "./pages/resources/ToolsTemplates";
import PaintCellRFQTemplate from "./pages/resources/tools/PaintCellRFQTemplate";
import SiteReadinessChecklist from "./pages/resources/tools/SiteReadinessChecklist";
import FeasibilityChecklist from "./pages/resources/tools/FeasibilityChecklist";

// Knowledge articles
import HowToChoosePaintRobot from "./pages/resources/knowledge/HowToChoosePaintRobot";
import RoboticPaintingCostGuide from "./pages/resources/knowledge/RoboticPaintingCostGuide";
import PaintBoothDesignBasics from "./pages/resources/knowledge/PaintBoothDesignBasics";

// Industry pages
import IndustryPage from "./pages/IndustryPage";
import Industries from "./pages/Industries";

// Solution pages
import Solutions from "./pages/Solutions";
import SolutionPage from "./pages/SolutionPage";

// Console pages
import ConsoleLogin from "./pages/console/ConsoleLogin";
import ConsoleLayout from "./pages/console/ConsoleLayout";
import HomeContent from "./pages/console/HomeContent";
import AboutContent from "./pages/console/AboutContent";
import PaintCellsContent from "./pages/console/PaintCellsContent";
import ApplicationsContent from "./pages/console/ApplicationsContent";
import QuoteContent from "./pages/console/QuoteContent";
import SiteSettings from "./pages/console/SiteSettings";
import ResourcesList from "./pages/console/ResourcesList";
import ResourceEditor from "./pages/console/ResourceEditor";
import CaseStudiesList from "./pages/console/CaseStudiesList";
import CaseStudyEditor from "./pages/console/CaseStudyEditor";
import LegalPages from "./pages/console/LegalPages";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Console routes (no public layout) */}
            <Route path="/console" element={<ConsoleLogin />} />
            <Route element={<ConsoleLayout />}>
              <Route path="/console/home" element={<HomeContent />} />
              <Route path="/console/about" element={<AboutContent />} />
              <Route path="/console/paint-cells" element={<PaintCellsContent />} />
              <Route path="/console/applications" element={<ApplicationsContent />} />
              <Route path="/console/quote" element={<QuoteContent />} />
              <Route path="/console/settings" element={<SiteSettings />} />
              <Route path="/console/resources" element={<ResourcesList />} />
              <Route path="/console/resources/:id" element={<ResourceEditor />} />
              <Route path="/console/case-studies" element={<CaseStudiesList />} />
              <Route path="/console/case-studies/:id" element={<CaseStudyEditor />} />
              <Route path="/console/policies" element={<LegalPages />} />
            </Route>

            {/* Public routes */}
            <Route element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/paint-cells" element={<PaintCells />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              
              {/* Legal pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* Engineering Library routes */}
              <Route path="/resources/engineering-library" element={<EngineeringLibrary />} />
              <Route path="/resources/engineering-library/guides-checklists" element={<GuidesChecklists />} />
              <Route path="/resources/engineering-library/insights" element={<Insights />} />
              <Route path="/resources/engineering-library/faqs" element={<FAQs />} />
              <Route path="/resources/guides/paint-cell-feasibility-checks" element={<PaintCellFeasibilityChecks />} />
              <Route path="/resources/insights/automation-boundary-spray-painting" element={<AutomationBoundary />} />
              
              {/* Standards & Compliance routes */}
              <Route path="/resources/standards-compliance" element={<StandardsCompliance />} />
              <Route path="/resources/standards-compliance/ventilation-airflow" element={<VentilationAirflow />} />
              <Route path="/resources/standards-compliance/voc-solvent-handling" element={<VOCSolventHandling />} />
              <Route path="/resources/standards-compliance/grounding-static-control" element={<GroundingStaticControl />} />
              
              {/* Glossary routes */}
              <Route path="/resources/glossary" element={<Glossary />} />
              <Route path="/resources/glossary/takt-time" element={<TaktTime />} />
              <Route path="/resources/glossary/overspray" element={<Overspray />} />
              <Route path="/resources/glossary/transfer-efficiency" element={<TransferEfficiency />} />
              <Route path="/resources/glossary/film-build" element={<FilmBuild />} />
              <Route path="/resources/glossary/color-changeover" element={<ColorChangeover />} />
              <Route path="/resources/glossary/atomization" element={<Atomization />} />
              <Route path="/resources/glossary/booth-airflow" element={<BoothAirflow />} />
              <Route path="/resources/glossary/2k-paint" element={<TwoKPaint />} />
              
              {/* Tools & Templates routes */}
              <Route path="/resources/tools-templates" element={<ToolsTemplates />} />
              <Route path="/resources/tools-templates/paint-cell-rfq-template" element={<PaintCellRFQTemplate />} />
              <Route path="/resources/tools-templates/site-readiness-checklist" element={<SiteReadinessChecklist />} />
              <Route path="/resources/tools-templates/feasibility-checklist" element={<FeasibilityChecklist />} />
              
              {/* Knowledge articles */}
              <Route path="/resources/knowledge/how-to-choose-paint-robot" element={<HowToChoosePaintRobot />} />
              <Route path="/resources/knowledge/robotic-painting-cost-guide" element={<RoboticPaintingCostGuide />} />
              <Route path="/resources/knowledge/paint-booth-design-basics" element={<PaintBoothDesignBasics />} />
              
              {/* Solution pages */}
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/:slug" element={<SolutionPage />} />
              
              {/* Industry pages */}
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/:slug" element={<IndustryPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
