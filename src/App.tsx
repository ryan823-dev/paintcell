import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { I18nProvider } from "@/i18n";
import { Layout } from "@/components/layout/Layout";
import { LocaleLayout, RootRedirect } from "@/i18n/LocaleLayout";
import { Hreflang } from "@/components/seo/Hreflang";
import { Loader2 } from "lucide-react";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load other public pages
const Quote = lazy(() => import("./pages/Quote"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Applications = lazy(() => import("./pages/Applications"));
const PaintCells = lazy(() => import("./pages/PaintCells"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));

// Case Study detail pages
const QingdaoHuataoCaseStudy = lazy(() => import("./pages/case-studies/QingdaoHuataoCaseStudy"));

const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));

// Lazy load Engineering Library pages
const EngineeringLibrary = lazy(() => import("./pages/resources/EngineeringLibrary"));
const GuidesChecklists = lazy(() => import("./pages/resources/GuidesChecklists"));
const Insights = lazy(() => import("./pages/resources/Insights"));
const FAQs = lazy(() => import("./pages/resources/FAQs"));
const PaintCellFeasibilityChecks = lazy(() => import("./pages/resources/PaintCellFeasibilityChecks"));
const AutomationBoundary = lazy(() => import("./pages/resources/AutomationBoundary"));
const DynamicArticle = lazy(() => import("./pages/resources/DynamicArticle"));

// Lazy load Standards & Compliance pages
const StandardsCompliance = lazy(() => import("./pages/resources/StandardsCompliance"));
const VentilationAirflow = lazy(() => import("./pages/resources/VentilationAirflow"));
const VOCSolventHandling = lazy(() => import("./pages/resources/VOCSolventHandling"));
const GroundingStaticControl = lazy(() => import("./pages/resources/GroundingStaticControl"));

// Lazy load Glossary pages
const Glossary = lazy(() => import("./pages/resources/Glossary"));
const TaktTime = lazy(() => import("./pages/resources/glossary/TaktTime"));
const Overspray = lazy(() => import("./pages/resources/glossary/Overspray"));
const TransferEfficiency = lazy(() => import("./pages/resources/glossary/TransferEfficiency"));
const FilmBuild = lazy(() => import("./pages/resources/glossary/FilmBuild"));
const ColorChangeover = lazy(() => import("./pages/resources/glossary/ColorChangeover"));
const Atomization = lazy(() => import("./pages/resources/glossary/Atomization"));
const BoothAirflow = lazy(() => import("./pages/resources/glossary/BoothAirflow"));
const TwoKPaint = lazy(() => import("./pages/resources/glossary/TwoKPaint"));
// New glossary terms
const ElectrostaticSpraying = lazy(() => import("./pages/resources/glossary/ElectrostaticSpraying"));
const HVLP = lazy(() => import("./pages/resources/glossary/HVLP"));
const FlashOffTime = lazy(() => import("./pages/resources/glossary/FlashOffTime"));
const OrangePeel = lazy(() => import("./pages/resources/glossary/OrangePeel"));
const DryFilmThickness = lazy(() => import("./pages/resources/glossary/DryFilmThickness"));
const ATEXCertification = lazy(() => import("./pages/resources/glossary/ATEXCertification"));
const PaintRecipe = lazy(() => import("./pages/resources/glossary/PaintRecipe"));
const SprayPattern = lazy(() => import("./pages/resources/glossary/SprayPattern"));
const TeachPendant = lazy(() => import("./pages/resources/glossary/TeachPendant"));
const GunDistance = lazy(() => import("./pages/resources/glossary/GunDistance"));
const CureTime = lazy(() => import("./pages/resources/glossary/CureTime"));
const HollowWrist = lazy(() => import("./pages/resources/glossary/HollowWrist"));
const DynamicGlossaryTerm = lazy(() => import("./pages/resources/DynamicGlossaryTerm"));

// Lazy load Tools & Templates pages
const ToolsTemplates = lazy(() => import("./pages/resources/ToolsTemplates"));
const PaintCellRFQTemplate = lazy(() => import("./pages/resources/tools/PaintCellRFQTemplate"));
const SiteReadinessChecklist = lazy(() => import("./pages/resources/tools/SiteReadinessChecklist"));
const FeasibilityChecklist = lazy(() => import("./pages/resources/tools/FeasibilityChecklist"));

// Lazy load Knowledge articles
const HowToChoosePaintRobot = lazy(() => import("./pages/resources/knowledge/HowToChoosePaintRobot"));
const RoboticPaintingCostGuide = lazy(() => import("./pages/resources/knowledge/RoboticPaintingCostGuide"));
const PaintBoothDesignBasics = lazy(() => import("./pages/resources/knowledge/PaintBoothDesignBasics"));
const PaintTechnologyGuide = lazy(() => import("./pages/resources/knowledge/PaintTechnologyGuide"));
const FlameTreatment = lazy(() => import("./pages/resources/knowledge/FlameTreatment"));
const SnowflakeCleaning = lazy(() => import("./pages/resources/knowledge/SnowflakeCleaning"));
const RobotPathOptimization = lazy(() => import("./pages/resources/knowledge/RobotPathOptimization"));
const PaintDefectsGuide = lazy(() => import("./pages/resources/knowledge/PaintDefectsGuide"));
const ColorChangeSystems = lazy(() => import("./pages/resources/knowledge/ColorChangeSystems"));
const PaintSupplyKnowledge = lazy(() => import("./pages/resources/knowledge/PaintSupplySystems"));
const HVLPSprayGunGuide = lazy(() => import("./pages/resources/knowledge/HVLPSprayGunGuide"));
const PaintingRobotSelectionGuide = lazy(() => import("./pages/resources/knowledge/PaintingRobotSelectionGuide"));
const ROICalculator = lazy(() => import("./pages/resources/tools/ROICalculator"));

// Lazy load new resource pages (Batch 1)
const VisionInspection = lazy(() => import("./pages/resources/VisionInspection"));
const BallTrackSystems = lazy(() => import("./pages/resources/BallTrackSystems"));
const InlineThicknessMeasurement = lazy(() => import("./pages/resources/InlineThicknessMeasurement"));

// Lazy load new resource pages (Batch 2 - Equipment)
const ReciprocatorSpraySystems = lazy(() => import("./pages/resources/ReciprocatorSpraySystems"));
const ElectrostaticBellAtomizers = lazy(() => import("./pages/resources/ElectrostaticBellAtomizers"));
const PowderCoatingSystems = lazy(() => import("./pages/resources/PowderCoatingSystems"));

// Lazy load new resource pages (Batch 3 - Technology & Systems)
const SprayGunTechnology = lazy(() => import("./pages/resources/SprayGunTechnology"));
const PaintBoothFiltration = lazy(() => import("./pages/resources/PaintBoothFiltration"));
const RobotBrandComparison = lazy(() => import("./pages/resources/RobotBrandComparison"));
const BoothControlSystems = lazy(() => import("./pages/resources/BoothControlSystems"));
const EnvironmentalCompliance = lazy(() => import("./pages/resources/EnvironmentalCompliance"));
const HVLPvsRotaryBell = lazy(() => import("./pages/resources/technology/HVLPvsRotaryBell"));
const RobotvsManualSpray = lazy(() => import("./pages/resources/technology/RobotvsManualSpray"));

// Lazy load new resource pages (Batch 4 - Applications)
const WheelCoatingApplications = lazy(() => import("./pages/resources/WheelCoatingApplications"));

// Lazy load Regional Market pages
const VietnamMarket = lazy(() => import("./pages/markets/VietnamMarket"));
const ThailandMarket = lazy(() => import("./pages/markets/ThailandMarket"));
const UAEMarket = lazy(() => import("./pages/markets/UAEMarket"));

// Lazy load Industry pages
const IndustryPage = lazy(() => import("./pages/IndustryPage"));
const Industries = lazy(() => import("./pages/Industries"));
const AutomotivePainting = lazy(() => import("./pages/industries/AutomotivePainting"));
const ApplianceCoating = lazy(() => import("./pages/industries/ApplianceCoating"));
const MetalPartsFinishing = lazy(() => import("./pages/industries/MetalPartsFinishing"));
const FurnitureWoodwork = lazy(() => import("./pages/industries/FurnitureWoodwork"));
const AutomotiveExteriorParts = lazy(() => import("./pages/industries/AutomotiveExteriorParts"));
const ConstructionMachinery = lazy(() => import("./pages/industries/ConstructionMachinery"));
const BatteryCoating = lazy(() => import("./pages/industries/BatteryCoating"));
const MedicalDeviceCoating = lazy(() => import("./pages/industries/MedicalDeviceCoating"));

// Lazy load Solution pages
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const RoboticPaintingSystem = lazy(() => import("./pages/solutions/RoboticPaintingSystem"));
const TurnkeyPaintingShop = lazy(() => import("./pages/solutions/TurnkeyPaintingShop"));
const PaintSupplySystems = lazy(() => import("./pages/solutions/PaintSupplySystems"));
const PaintProcessFlow = lazy(() => import("./pages/solutions/PaintProcessFlow"));

// Lazy load Products pages
const ProductsIndex = lazy(() => import("./pages/products/ProductsIndex"));
const ProductCategory = lazy(() => import("./pages/products/ProductCategory"));
const ControlSystems = lazy(() => import("./pages/products/ControlSystems"));
const BellCleaningSystem = lazy(() => import("./pages/products/BellCleaningSystem"));
const PiggingColorChangeSystem = lazy(() => import("./pages/products/PiggingColorChangeSystem"));

// Lazy load Services pages
const ServicesIndex = lazy(() => import("./pages/services/ServicesIndex"));
const ServiceDetail = lazy(() => import("./pages/services/ServiceDetail"));

// Lazy load Console pages (admin only)
const ConsoleLogin = lazy(() => import("./pages/console/ConsoleLogin"));
const ConsoleLayout = lazy(() => import("./pages/console/ConsoleLayout"));
const HomeContent = lazy(() => import("./pages/console/HomeContent"));
const AboutContent = lazy(() => import("./pages/console/AboutContent"));
const PaintCellsContent = lazy(() => import("./pages/console/PaintCellsContent"));
const ApplicationsContent = lazy(() => import("./pages/console/ApplicationsContent"));
const QuoteContent = lazy(() => import("./pages/console/QuoteContent"));
const SiteSettings = lazy(() => import("./pages/console/SiteSettings"));
const ResourcesList = lazy(() => import("./pages/console/ResourcesList"));
const ResourceEditor = lazy(() => import("./pages/console/ResourceEditor"));
const CaseStudiesList = lazy(() => import("./pages/console/CaseStudiesList"));
const CaseStudyEditor = lazy(() => import("./pages/console/CaseStudyEditor"));
const LegalPages = lazy(() => import("./pages/console/LegalPages"));
const Dashboard = lazy(() => import("./pages/console/Dashboard"));
const LeadsManagement = lazy(() => import("./pages/console/LeadsManagement"));
const MediaLibrary = lazy(() => import("./pages/console/MediaLibrary"));
const UserManagement = lazy(() => import("./pages/console/UserManagement"));
const IndustryPagesList = lazy(() => import("./pages/console/IndustryPagesList"));
const IndustryPageEditor = lazy(() => import("./pages/console/IndustryPageEditor"));
const SolutionPagesList = lazy(() => import("./pages/console/SolutionPagesList"));
const SolutionPageEditor = lazy(() => import("./pages/console/SolutionPageEditor"));
const WhyCardsEditor = lazy(() => import("./pages/console/WhyCardsEditor"));
const HomeBannersEditor = lazy(() => import("./pages/console/HomeBannersEditor"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

/**
 * All public page routes rendered inside the locale-prefixed Layout.
 * Paths are relative to the parent `/:lang` route.
 */
function PublicRoutes() {
  return (
    <Route element={<Layout />}>
      <Route index element={<Index />} />
      <Route path="quote" element={<Quote />} />
      <Route path="thank-you" element={<ThankYou />} />
      <Route path="applications" element={<Applications />} />
      <Route path="paint-cells" element={<PaintCells />} />
      <Route path="case-studies" element={<CaseStudies />} />
      <Route path="case-studies/qingdao-huatao" element={<QingdaoHuataoCaseStudy />} />
      <Route path="about" element={<About />} />

      {/* Legal pages */}
      <Route path="privacy" element={<Privacy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="cookies" element={<Cookies />} />

      {/* Engineering Library routes */}
      <Route path="resources/engineering-library" element={<EngineeringLibrary />} />
      <Route path="resources/engineering-library/guides-checklists" element={<GuidesChecklists />} />
      <Route path="resources/engineering-library/insights" element={<Insights />} />
      <Route path="resources/engineering-library/faqs" element={<FAQs />} />
      <Route path="resources/guides/paint-cell-feasibility-checks" element={<PaintCellFeasibilityChecks />} />
      <Route path="resources/insights/automation-boundary-spray-painting" element={<AutomationBoundary />} />

      {/* Standards & Compliance routes */}
      <Route path="resources/standards-compliance" element={<StandardsCompliance />} />
      <Route path="resources/standards-compliance/ventilation-airflow" element={<VentilationAirflow />} />
      <Route path="resources/standards-compliance/voc-solvent-handling" element={<VOCSolventHandling />} />
      <Route path="resources/standards-compliance/grounding-static-control" element={<GroundingStaticControl />} />

      {/* Glossary routes */}
      <Route path="resources/glossary" element={<Glossary />} />
      <Route path="resources/glossary/takt-time" element={<TaktTime />} />
      <Route path="resources/glossary/overspray" element={<Overspray />} />
      <Route path="resources/glossary/transfer-efficiency" element={<TransferEfficiency />} />
      <Route path="resources/glossary/film-build" element={<FilmBuild />} />
      <Route path="resources/glossary/color-changeover" element={<ColorChangeover />} />
      <Route path="resources/glossary/atomization" element={<Atomization />} />
      <Route path="resources/glossary/booth-airflow" element={<BoothAirflow />} />
      <Route path="resources/glossary/2k-paint" element={<TwoKPaint />} />
      <Route path="resources/glossary/electrostatic-spraying" element={<ElectrostaticSpraying />} />
      <Route path="resources/glossary/hvlp" element={<HVLP />} />
      <Route path="resources/glossary/flash-off-time" element={<FlashOffTime />} />
      <Route path="resources/glossary/orange-peel" element={<OrangePeel />} />
      <Route path="resources/glossary/dry-film-thickness" element={<DryFilmThickness />} />
      <Route path="resources/glossary/atex-certification" element={<ATEXCertification />} />
      <Route path="resources/glossary/paint-recipe" element={<PaintRecipe />} />
      <Route path="resources/glossary/spray-pattern" element={<SprayPattern />} />
      <Route path="resources/glossary/teach-pendant" element={<TeachPendant />} />
      <Route path="resources/glossary/gun-distance" element={<GunDistance />} />
      <Route path="resources/glossary/cure-time" element={<CureTime />} />
      <Route path="resources/glossary/hollow-wrist" element={<HollowWrist />} />
      {/* Dynamic glossary term from database */}
      <Route path="resources/glossary/:slug" element={<DynamicGlossaryTerm />} />

      {/* Tools & Templates routes */}
      <Route path="resources/tools-templates" element={<ToolsTemplates />} />
      <Route path="resources/tools-templates/paint-cell-rfq-template" element={<PaintCellRFQTemplate />} />
      <Route path="resources/tools-templates/site-readiness-checklist" element={<SiteReadinessChecklist />} />
      <Route path="resources/tools-templates/feasibility-checklist" element={<FeasibilityChecklist />} />
      <Route path="resources/tools/roi-calculator" element={<ROICalculator />} />

      {/* Knowledge articles */}
      <Route path="resources/knowledge/how-to-choose-paint-robot" element={<HowToChoosePaintRobot />} />

      {/* Dynamic database-driven article (Vertax CMS push pipeline) */}
      <Route path="resources/articles/:slug" element={<DynamicArticle />} />
      <Route path="resources/knowledge/robotic-painting-cost-guide" element={<RoboticPaintingCostGuide />} />
      <Route path="resources/knowledge/paint-booth-design-basics" element={<PaintBoothDesignBasics />} />
      <Route path="resources/knowledge/paint-technology-guide" element={<PaintTechnologyGuide />} />
      <Route path="resources/knowledge/flame-treatment" element={<FlameTreatment />} />
      <Route path="resources/knowledge/snowflake-cleaning" element={<SnowflakeCleaning />} />
      <Route path="resources/knowledge/robot-path-optimization" element={<RobotPathOptimization />} />
      <Route path="resources/knowledge/paint-defects-guide" element={<PaintDefectsGuide />} />
      <Route path="resources/knowledge/color-change-systems" element={<ColorChangeSystems />} />
      <Route path="resources/knowledge/paint-supply-systems" element={<PaintSupplyKnowledge />} />
      <Route path="resources/knowledge/hvlp-spray-gun-guide" element={<HVLPSprayGunGuide />} />
      <Route path="resources/knowledge/painting-robot-selection-guide" element={<PaintingRobotSelectionGuide />} />

      {/* Quality & Equipment articles (Batch 1) */}
      <Route path="resources/quality-control/vision-inspection" element={<VisionInspection />} />
      <Route path="resources/quality-control/inline-thickness-measurement" element={<InlineThicknessMeasurement />} />
      <Route path="resources/equipment/ball-track-systems" element={<BallTrackSystems />} />

      {/* Equipment articles (Batch 2 - US/EU terminology) */}
      <Route path="resources/equipment/reciprocator-spray-systems" element={<ReciprocatorSpraySystems />} />
      <Route path="resources/equipment/electrostatic-bell-atomizers" element={<ElectrostaticBellAtomizers />} />
      <Route path="resources/knowledge/powder-coating-systems" element={<PowderCoatingSystems />} />

      {/* Technology & Systems articles (Batch 3) */}
      <Route path="resources/technology/spray-gun-technology" element={<SprayGunTechnology />} />
      <Route path="resources/technology/hvlp-vs-rotary-bell" element={<HVLPvsRotaryBell />} />
      <Route path="resources/technology/robot-vs-manual-spray" element={<RobotvsManualSpray />} />
      <Route path="resources/equipment/paint-booth-filtration" element={<PaintBoothFiltration />} />
      <Route path="resources/knowledge/industrial-robot-brands" element={<RobotBrandComparison />} />
      <Route path="resources/technology/booth-control-systems" element={<BoothControlSystems />} />
      <Route path="resources/standards-compliance/environmental-regulations" element={<EnvironmentalCompliance />} />

      {/* Application articles (Batch 4) */}
      <Route path="resources/applications/wheel-coating" element={<WheelCoatingApplications />} />

      {/* Regional Market Landing Pages */}
      <Route path="solutions/robotic-painting-vietnam" element={<VietnamMarket />} />
      <Route path="solutions/robotic-painting-thailand" element={<ThailandMarket />} />
      <Route path="solutions/robotic-painting-uae" element={<UAEMarket />} />

      {/* Solution pages */}
      <Route path="solutions" element={<Solutions />} />
      <Route path="solutions/robotic-painting-system" element={<RoboticPaintingSystem />} />
      <Route path="solutions/turnkey-painting-shop" element={<TurnkeyPaintingShop />} />
      <Route path="solutions/paint-supply-systems" element={<PaintSupplySystems />} />
      <Route path="solutions/paint-process-flow" element={<PaintProcessFlow />} />
      <Route path="solutions/:slug" element={<SolutionPage />} />

      {/* Products pages */}
      <Route path="products" element={<ProductsIndex />} />
      <Route path="products/control-systems" element={<ControlSystems />} />
      <Route path="products/bell-cleaning-system" element={<BellCleaningSystem />} />
      <Route path="products/pigging-color-change-system" element={<PiggingColorChangeSystem />} />
      <Route path="products/:category" element={<ProductCategory />} />

      {/* Services pages */}
      <Route path="services" element={<ServicesIndex />} />
      <Route path="services/:slug" element={<ServiceDetail />} />

      {/* Industry pages */}
      <Route path="industries" element={<Industries />} />
      <Route path="industries/automotive-painting" element={<AutomotivePainting />} />
      <Route path="industries/appliance-coating" element={<ApplianceCoating />} />
      <Route path="industries/metal-parts-finishing" element={<MetalPartsFinishing />} />
      <Route path="industries/furniture-woodwork" element={<FurnitureWoodwork />} />
      <Route path="industries/automotive-exterior-parts" element={<AutomotiveExteriorParts />} />
      <Route path="industries/construction-machinery" element={<ConstructionMachinery />} />
      <Route path="industries/battery-coating" element={<BatteryCoating />} />
      <Route path="industries/medical-device-coating" element={<MedicalDeviceCoating />} />
      <Route path="industries/:slug" element={<IndustryPage />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Console routes (no locale prefix, no public layout) */}
              <Route path="/console" element={<ConsoleLogin />} />
              <Route element={<ConsoleLayout />}>
                <Route path="/console/dashboard" element={<Dashboard />} />
                <Route path="/console/leads" element={<LeadsManagement />} />
                <Route path="/console/media" element={<MediaLibrary />} />
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
                <Route path="/console/industry-pages" element={<IndustryPagesList />} />
                <Route path="/console/industry-pages/:id" element={<IndustryPageEditor />} />
                <Route path="/console/solution-pages" element={<SolutionPagesList />} />
                <Route path="/console/solution-pages/:id" element={<SolutionPageEditor />} />
                <Route path="/console/why-cards" element={<WhyCardsEditor />} />
                <Route path="/console/home-banners" element={<HomeBannersEditor />} />
                <Route path="/console/users" element={<UserManagement />} />
                <Route path="/console/policies" element={<LegalPages />} />
              </Route>

              {/* Root "/" → redirect to /:locale based on user preference */}
              <Route path="/" element={<RootRedirect />} />

              {/* All public routes under /:lang prefix for SEO */}
              <Route path="/:lang" element={<><Hreflang /><LocaleLayout /></>}>
                {PublicRoutes()}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
