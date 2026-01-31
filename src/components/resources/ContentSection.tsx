import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  level?: "h2" | "h3";
  children: ReactNode;
}

export function ContentSection({ title, level = "h2", children }: ContentSectionProps) {
  const HeadingTag = level;
  
  return (
    <section className="mb-8">
      <HeadingTag 
        className={`font-semibold text-foreground mb-4 ${
          level === "h2" ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {title}
      </HeadingTag>
      {children}
    </section>
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-2 text-muted-foreground">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-primary mt-1.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
