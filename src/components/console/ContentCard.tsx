import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  titleZh?: string;
  description?: string;
  descriptionZh?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentCard({
  title,
  titleZh,
  description,
  descriptionZh,
  children,
  className,
}: ContentCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg">
          {title}
          {titleZh && <span className="text-muted-foreground font-normal ml-2">/ {titleZh}</span>}
        </CardTitle>
        {(description || descriptionZh) && (
          <CardDescription>
            {description}
            {descriptionZh && <span className="ml-1">/ {descriptionZh}</span>}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
