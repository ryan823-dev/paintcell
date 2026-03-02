import { useEffect, useRef, useState } from "react";

// Technology partners - actual partners from company portfolio
const technologyPartners = [
  { name: "ABB", category: "Robot OEM", abbr: "ABB" },
  { name: "FANUC", category: "Robot OEM", abbr: "FA" },
  { name: "KUKA", category: "Robot OEM", abbr: "KU" },
  { name: "Yaskawa", category: "Robot OEM", abbr: "YA" },
  { name: "Kawasaki", category: "Robot OEM", abbr: "KW" },
  { name: "CMA", category: "Robot OEM", abbr: "CM" },
  { name: "Graco", category: "Spray Equipment", abbr: "GR" },
  { name: "SAMES Kremlin", category: "Spray Equipment", abbr: "SK" },
  { name: "Carlisle/Binks", category: "Paint Supply", abbr: "CB" },
  { name: "Ransburg", category: "Atomizers", abbr: "RB" },
];

// Key customers - automotive OEMs and Tier 1 suppliers
const keyCustomers = [
  { name: "Chery Auto", category: "Automotive OEM", abbr: "奇瑞" },
  { name: "Geely Auto", category: "Automotive OEM", abbr: "吉利" },
  { name: "NIO", category: "EV OEM", abbr: "蔚来" },
  { name: "Leapmotor", category: "EV OEM", abbr: "零跑" },
  { name: "FAW-Fuwei", category: "Tier 1", abbr: "富维" },
  { name: "VINFAST", category: "International", abbr: "VF" },
  { name: "Baosteel", category: "Industrial", abbr: "宝钢" },
  { name: "CASC", category: "Aerospace", abbr: "航天" },
];

const certifications = [
  "ISO 9001",
  "CE Marking",
  "ATEX Compliant",
  "NFPA 33",
];

export function TrustLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const customerScrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isCustomerPaused, setIsCustomerPaused] = useState(false);

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

  useEffect(() => {
    const el = customerScrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = 0;
    const speed = 0.4;

    const animate = () => {
      if (!isCustomerPaused) {
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
  }, [isCustomerPaused]);

  return (
    <div className="space-y-10">
      {/* Trusted By - Key Customers */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4 text-center">
          Trusted By Leading Manufacturers
        </p>
        <div
          ref={customerScrollRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsCustomerPaused(true)}
          onMouseLeave={() => setIsCustomerPaused(false)}
        >
          <div className="flex gap-5 w-max">
            {[...keyCustomers, ...keyCustomers].map((item, i) => (
              <div
                key={`customer-${item.name}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-accent/20 bg-accent/5 hover:border-accent/40 transition-colors shrink-0"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                  {item.abbr}
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
            {[...technologyPartners, ...technologyPartners].map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-colors shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {item.abbr}
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
