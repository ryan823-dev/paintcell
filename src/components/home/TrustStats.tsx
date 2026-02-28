import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "500+", numericValue: 500, suffix: "+", label: "Systems Deployed" },
  { value: "25+", numericValue: 25, suffix: "+", label: "Years Experience" },
  { value: "30+", numericValue: 30, suffix: "+", label: "Countries Served" },
  { value: "98%", numericValue: 98, suffix: "%", label: "Customer Satisfaction" },
];

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = duration / (target / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <span className="tabular-nums">
      {current}{suffix}
    </span>
  );
}

export function TrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="relative group"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_-10px_hsl(192_70%_38%/0.15)]">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-accent/40 rounded-full" />
            
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-tight">
              <AnimatedNumber target={stat.numericValue} suffix={stat.suffix} inView={inView} />
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
