import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedResource {
  title: string;
  href: string;
}

interface RelatedResourcesProps {
  resources: RelatedResource[];
}

export function RelatedResources({ resources }: RelatedResourcesProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Related resources</h2>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <Link
              to={resource.href}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              <ArrowRight className="h-4 w-4" />
              {resource.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
