import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "primary";
  id?: string;
}

export function Section({ children, className, variant = "default", id }: SectionProps) {
  const variants = {
    default: "bg-background",
    muted: "section-gradient",
    primary: "bg-muted border-t border-border",
  };

  return (
    <section id={id} className={cn("py-16 md:py-24", variants[variant], className)}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
