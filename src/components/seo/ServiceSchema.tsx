import { Helmet } from "react-helmet-async";

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string | string[];
  provider?: string;
  priceRange?: string;
}

/**
 * Service Schema for solution pages.
 * Helps AI search engines understand the services offered.
 */
export function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed = "Worldwide",
  provider = "TD Robotic Painting Systems",
  priceRange
}: ServiceSchemaProps) {
  const areas = Array.isArray(areaServed) ? areaServed : [areaServed];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "serviceType": serviceType,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://tdpaint.com"
    },
    "areaServed": areas.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "offers": priceRange ? {
      "@type": "Offer",
      "priceRange": priceRange
    } : undefined
  };

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(cleanSchema)}</script>
    </Helmet>
  );
}

/**
 * Pre-configured services for common solution pages.
 */
export const services = {
  roboticPaintingSystem: {
    name: "Robotic Painting System Integration",
    description: "Complete turnkey robotic spray painting systems for automotive, industrial, and appliance manufacturing. Includes robot selection, spray technology, paint supply, controls integration, and commissioning.",
    serviceType: "Industrial Automation Integration",
    url: "https://tdpaint.com/solutions/robotic-painting-system"
  },
  paintBoothAutomation: {
    name: "Paint Booth Automation",
    description: "Automated paint booth systems with integrated airflow control, safety interlocks, and process monitoring for consistent finishing quality.",
    serviceType: "Paint Booth Engineering",
    url: "https://tdpaint.com/solutions/paint-booth-automation"
  },
  sprayRobotIntegration: {
    name: "Spray Robot Integration",
    description: "Industrial robot integration for spray painting applications, including ABB, FANUC, and Yaskawa robot programming and path optimization.",
    serviceType: "Robot Integration Services",
    url: "https://tdpaint.com/solutions/spray-robot-integration"
  },
  turnkeyPaintingShop: {
    name: "Turnkey Painting Shop",
    description: "Complete paint shop design and build services from concept to production startup. Includes equipment, controls, and operator training.",
    serviceType: "Turnkey Manufacturing Solutions",
    url: "https://tdpaint.com/solutions/turnkey-painting-shop"
  },
  paintSupplySystems: {
    name: "Paint Supply Systems",
    description: "Integrated paint delivery and color change systems for high-volume production. Includes pumps, regulators, and quick color change technology.",
    serviceType: "Fluid Handling Systems",
    url: "https://tdpaint.com/solutions/paint-supply-systems"
  }
};