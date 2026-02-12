import { useParams } from "react-router-dom";
import { industries } from "@/data/industryData";
import { IndustryPageTemplate } from "@/components/industry/IndustryPageTemplate";
import NotFound from "@/pages/NotFound";

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? industries[slug] : undefined;

  if (!data) return <NotFound />;

  return <IndustryPageTemplate data={data} />;
}
