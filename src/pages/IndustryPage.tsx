import { useParams, Navigate } from "react-router-dom";
import { useIndustryPage } from "@/hooks/useIndustryPage";
import { IndustryPageTemplate } from "@/components/industry/IndustryPageTemplate";
import NotFound from "@/pages/NotFound";
import { useI18n } from "@/i18n";

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useIndustryPage(slug);
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">{t.common.loading}</div>
      </div>
    );
  }

  if (!data) return <NotFound />;
  if (data.comingSoon) return <Navigate to="/industries" replace />;

  return <IndustryPageTemplate data={data} />;
}
