import { useEffect, useRef, useState } from "react";

const industries = [
  { name: "ABB Robotics", category: "Robot OEM" },
  { name: "FANUC", category: "Robot OEM" },
  { name: "KUKA", category: "Robot OEM" },
  { name: "Graco", category: "Spray Equipment" },
  { name: "SATA", category: "Spray Equipment" },
  { name: "Siemens", category: "Controls" },
  { name: "Dürr", category: "Paint Systems" },
  { name: "PPG", category: "Coatings" },
  { name: "AkzoNobel", category: "Coatings" },
  { name: "Axalta", category: "Coatings" },
];

const certifications = [
  "ISO 9001",
  "CE Marking",
  "ATEX Compliant",
  "NFPA 33",
  "UL Listed",
];

export function TrustLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        pos += speed;
        if (pos >= el.scrollWidth / 2) {
          pos = 0;
        }
        el.scrollLeft = pos;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <div className="space-y-8">
      {/* Technology Partners */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4 text-center">
          Technology Partners & Ecosystem
        </p>
        <div
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-6 w-max">
            {/* Double the items for seamless loop */}
            {[...industries, ...industries].map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-colors shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground leading-tight">{item.name}</div>
                  <div className="text-[10px] text-muted-foreground">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {certifications.map((cert) => (
          <span
            key={cert}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs font-medium text-accent"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}
