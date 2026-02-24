import { useParams } from "react-router-dom";
import { useSolutionPage } from "@/hooks/useSolutionPage";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";
import NotFound from "@/pages/NotFound";

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useSolutionPage(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!data) return <NotFound />;

  return <SolutionPageTemplate data={data} />;
}
