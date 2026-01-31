import { cn } from "@/lib/utils";

interface AnswerBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function AnswerBox({ children, className }: AnswerBoxProps) {
  return (
    <div
      className={cn(
        "bg-primary/5 border-l-4 border-primary px-5 py-4 rounded-r-md mb-8",
        className
      )}
    >
      <p className="text-foreground leading-relaxed text-sm md:text-base">
        {children}
      </p>
    </div>
  );
}
