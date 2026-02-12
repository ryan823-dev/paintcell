import { useParams } from "react-router-dom";
import { solutions } from "@/data/solutionData";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";
import NotFound from "@/pages/NotFound";

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? solutions[slug] : undefined;

  if (!data) return <NotFound />;

  return <SolutionPageTemplate data={data} />;
}
