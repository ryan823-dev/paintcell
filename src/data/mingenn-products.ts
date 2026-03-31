/**
 * Mingenn Product Data - 铭捷产品资料
 * 
 * High-performance spray painting equipment and components
 * Source: https://www.mingenn.com/
 */

export interface Product {
  slug: string;
  name: string;
  model: string;
  category: string;
  subcategory: string;
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  applications: string[];
  imageUrls: string[];
  features?: {
    speed?: string;
    efficiency?: string;
    reliability?: string;
    versatility?: string;
  };
}

/**
 * Spray Gun Series - 喷枪系列
 */
export const sprayGuns: Product[] = [
  {
    slug: "mea628-electrostatic-spray-gun",
    name: "MEA628 High-Performance Electrostatic Air Spray Gun",
    model: "MEA628",
    category: "spray-guns",
    subcategory: "automatic-spray-guns",
    description: "High-performance automatic electrostatic spray gun with modular design, excellent atomization, and 50-70% transfer efficiency. Ideal for automotive components, metal parts, and general industrial coating applications.",
    highlights: [
      "Transfer efficiency: 50-70%",
      "Modular design for easy maintenance",
      "Excellent atomization quality",
      "Compatible with solvent and water-based paints"
    ],
    specifications: {
      "Maximum Discharge Voltage": "90 KV",
      "Maximum Output Current": "120 μA",
      "Paint Viscosity Range": "10-50s (GB Cup 4)",
      "Paint Resistance": "0.1-1.0 MΩ (solvent-based)",
      "Flow Rate": "50-500 cc/min",
      "Air Pressure": "0-0.7 MPa",
      "Paint Pressure": "0.6-0.8 MPa",
      "Coating System": "Three-color supply + cleaning"
    },
    applications: [
      "Automotive components painting",
      "Metal parts finishing",
      "Appliance coating",
      "General industrial applications"
    ],
    imageUrls: [
      "/products/mingenn/mea628-main.jpg",
      "/products/mingenn/mea628-detail.jpg",
      "/products/mingenn/mea628-application.jpg"
    ],
    features: {
      speed: "Fast color change capability",
      efficiency: "50-70% transfer efficiency",
      reliability: "Modular design, easy maintenance",
      versatility: "Compatible with various paint types"
    }
  },
  {
    slug: "mea62c-electrostatic-spray-gun",
    name: "MEA62C Next-Generation Electrostatic Spray Gun",
    model: "MEA62C",
    category: "spray-guns",
    subcategory: "automatic-spray-guns",
    description: "Latest generation electrostatic spray gun with highly integrated HV and control technology. Sets new standards in coating quality, transfer efficiency, and safety reliability.",
    highlights: [
      "Excellent surface finish quality",
      "Significantly improved transfer efficiency",
      "Highly integrated, safe and reliable",
      "Advanced HV control technology"
    ],
    specifications: {
      "Maximum Discharge Voltage": "100 KV",
      "Maximum Output Current": "120 μA",
      "Paint Viscosity Range": "10-50s (GB Cup 4)",
      "Paint Resistance": "0.1-1.0 MΩ (solvent-based)",
      "Flow Rate": "50-500 cc/min",
      "Air Pressure": "0-0.7 MPa",
      "Paint Pressure": "0-0.8 MPa",
      "Controller": "MECU302 HV Controller (optional)"
    },
    applications: [
      "High-quality automotive painting",
      "Premium appliance coating",
      "Precision industrial finishing",
      "Multi-color coating applications"
    ],
    imageUrls: [
      "/products/mingenn/mea62c-main.jpg",
      "/products/mingenn/mea62c-detail.jpg"
    ],
    features: {
      efficiency: "Enhanced transfer efficiency",
      reliability: "Highly integrated design",
      versatility: "Advanced control compatibility"
    }
  },
  {
    slug: "mea658-multi-color-spray-gun",
    name: "MEA658 Multi-Color Electrostatic Spray Gun",
    model: "MEA658E",
    category: "spray-guns",
    subcategory: "automatic-spray-guns",
    description: "High-performance automatic electrostatic spray gun with multi-color simultaneous supply capability. Enables ultra-fast color changes and dramatically improves coating efficiency.",
    highlights: [
      "Perfect integration of electrostatic, valve, and gun",
      "Transfer efficiency: 50-75%",
      "Ultra-fast color change with minimal loss",
      "Excellent atomization quality"
    ],
    specifications: {
      "Maximum Discharge Voltage": "90 KV",
      "Maximum Output Current": "120 μA",
      "Paint Viscosity Range": "10-50s (GB Cup 4)",
      "Paint Resistance": "0.1-1.0 MΩ (solvent-based)",
      "Flow Rate": "Max 500 cc/min",
      "Air Pressure": "0-0.7 MPa",
      "Paint Pressure": "0.6-0.8 MPa",
      "Coating System": "Three-color supply + cleaning"
    },
    applications: [
      "High-mix production environments",
      "Multi-color automotive parts",
      "Appliance with color variations",
      "Job coating facilities"
    ],
    imageUrls: [
      "/products/mingenn/mea658-main.jpg",
      "/products/mingenn/mea658-system.jpg"
    ],
    features: {
      speed: "Ultra-fast color change",
      efficiency: "50-75% transfer efficiency",
      versatility: "Multi-color capability"
    }
  },
  {
    slug: "mea518-manual-electrostatic-gun",
    name: "MEA518 Manual Electrostatic Air Spray Gun",
    model: "MEA518",
    category: "spray-guns",
    subcategory: "manual-spray-guns",
    description: "High-performance manual electrostatic spray gun with ergonomic design, compact structure, and easy operation. Ideal for high-quality and high-efficiency manual coating applications.",
    highlights: [
      "Ergonomic optimization for reduced fatigue",
      "Transfer efficiency: 70%+",
      "Beautiful appearance, compact design",
      "Easy to maintain"
    ],
    specifications: {
      "Device Power": "100 W",
      "Maximum Discharge Voltage": "80 KV",
      "Maximum Output Current": "120 μA",
      "Flow Rate": "Max 1000 cc/min",
      "Air Pressure": "0-0.7 MPa",
      "Paint Pressure": "0.3 MPa",
      "Models": "MEA518 / MEA518W"
    },
    applications: [
      "Manual touch-up operations",
      "Small batch production",
      "Repair and maintenance",
      "Prototype coating"
    ],
    imageUrls: [
      "/products/mingenn/mea518-main.jpg",
      "/products/mingenn/mea518-usage.jpg"
    ],
    features: {
      efficiency: "70%+ transfer efficiency",
      reliability: "Ergonomic, long-term comfort"
    }
  },
  {
    slug: "maa328-compact-spray-gun",
    name: "MAA328 Compact Automatic Air Spray Gun",
    model: "MAA328",
    category: "spray-guns",
    subcategory: "automatic-spray-guns",
    description: "Compact automatic air spray gun with refined design, simple structure, and easy maintenance. Delivers excellent atomization and long service life for various coating applications.",
    highlights: [
      "Compact and refined design",
      "Easy maintenance, excellent atomization",
      "Transfer efficiency: 30-50%",
      "Long service life"
    ],
    specifications: {
      "Minimum Valve Opening Pressure": "0.5 MPa",
      "Atomizing Air Pressure": "Max 0.6 MPa",
      "Fan Air Pressure": "Max 0.6 MPa",
      "Atomizing Air Consumption": "50-180 cc/min",
      "Fan Air Consumption": "90-270 L/min",
      "Paint Flow Rate": "50-500 cc/min",
      "Paint Viscosity": "40s (Cup 4)",
      "Pattern Width": "200-500 mm",
      "Coating Speed": "Max 1500 mm/s"
    },
    applications: [
      "General industrial coating",
      "Wood finishing",
      "Plastic coating",
      "Light-duty applications"
    ],
    imageUrls: [
      "/products/mingenn/maa328-main.jpg"
    ],
    features: {
      efficiency: "30-50% transfer efficiency",
      reliability: "Simple structure, easy maintenance"
    }
  },
  {
    slug: "mpg520-powder-spray-gun",
    name: "MPG520 Automatic Electrostatic Powder Spray Gun",
    model: "MPG520",
    category: "spray-guns",
    subcategory: "powder-spray-guns",
    description: "Intelligent powder spray gun with digital control, efficient transmission, and uniform coverage. Ideal for complex-shaped workpieces and flat profile powder coating applications.",
    highlights: [
      "Digital control system for precision",
      "Multiple nozzle options for various effects",
      "Durable, uniform film thickness, high efficiency",
      "Simple structure, easy maintenance"
    ],
    specifications: {
      "Weight": "900g (without cable and powder tube)",
      "Standard Air Supply Pressure": "7±1 MPa",
      "Powder Flow Rate": "24 kg/h",
      "Polarity": "Negative",
      "Output Voltage": "Max 90 kV",
      "Output Current": "Max 110 μA"
    },
    applications: [
      "Powder coating applications",
      "Metal furniture coating",
      "Automotive parts powder coating",
      "Appliance powder finishing"
    ],
    imageUrls: [
      "/products/mingenn/mpg520-main.jpg",
      "/products/mingenn/mpg520-application.jpg"
    ],
    features: {
      efficiency: "High powder transfer efficiency",
      reliability: "Durable, uniform coating",
      versatility: "Multiple nozzle configurations"
    }
  }
];

/**
 * Rotary Bell Series - 旋杯系列
 */
export const rotaryBells: Product[] = [
  {
    slug: "meb938-high-speed-rotary-bell",
    name: "MEB938 High-Speed Electrostatic Rotary Bell",
    model: "MEB938",
    category: "rotary-bells",
    subcategory: "high-speed-bells",
    description: "Multi-function rotary bell atomizer integrating dual-shape, fast color change, automatic cup cleaning, and high-voltage discharge. Designed for automotive and high-end coating applications.",
    highlights: [
      "Turbine speed: 70,000 RPM",
      "Flow rate: 1000 cc/min",
      "Transfer efficiency: 80%+",
      "Dual-shape and dual-channel design",
      "Lightweight: only 3.5kg"
    ],
    specifications: {
      "Weight": "3.5 kg (without piping)",
      "Standard Air Supply Pressure": "0.7±0.1 MPa",
      "Bearing Air Pressure": "0.6-0.8 MPa",
      "Bearing Air Consumption": "55-100 NL/min",
      "Drive Air Consumption": "90-300 NL/min",
      "Shaping Air 1": "50-500 NL/min",
      "Shaping Air 2": "50-500 NL/min",
      "Minimum Valve Opening": "0.5 MPa",
      "Paint Types": "Water-based and solvent-based",
      "Paint Viscosity": "10-50s (GB Cup 4)",
      "Paint Resistance": "0.1-1.0 MΩ",
      "Flow Rate": "20-1000 cc/min",
      "Paint Pressure": "Max 1.0 MPa",
      "Electrostatic Voltage": "Max 100 kV",
      "Speed": "8,000-70,000 RPM",
      "Coating Speed": "Max 1200 mm/s",
      "Spray Range": "80-600 mm"
    },
    applications: [
      "Automotive exterior painting",
      "High-end industrial coating",
      "Multi-color applications",
      "High-volume production lines"
    ],
    imageUrls: [
      "/products/mingenn/meb938-main.jpg",
      "/products/mingenn/meb938-detail.jpg",
      "/products/mingenn/meb938-application.jpg"
    ],
    features: {
      speed: "70,000 RPM turbine speed",
      efficiency: "80%+ transfer efficiency",
      reliability: "Dual-shape design, cup cleaning",
      versatility: "Water and solvent compatible"
    }
  },
  {
    slug: "meb928-compact-rotary-bell",
    name: "MEB928 Compact Electrostatic Rotary Bell",
    model: "MEB928D",
    category: "rotary-bells",
    subcategory: "general-industrial-bells",
    description: "Compact and efficient rotary atomizer for general industrial applications. Combines high performance with simple structure and easy maintenance.",
    highlights: [
      "Turbine speed: 70,000 RPM",
      "Transfer efficiency: 80%+",
      "Simple structure, easy maintenance",
      "Multiple cup size options"
    ],
    specifications: {
      "Weight": "4.0 kg (without piping)",
      "Standard Air Supply Pressure": "0.7±0.1 MPa",
      "Bearing Air Pressure": "0.6-0.8 MPa",
      "Bearing Air Consumption": "50-100 NL/min",
      "Drive Air Consumption": "90-300 NL/min",
      "Shaping Air": "50-500 NL/min",
      "Minimum Valve Opening": "0.5 MPa",
      "Paint Types": "Water-based and solvent-based",
      "Paint Viscosity": "10-40s (GB Cup 4)",
      "Paint Resistance": "0.1-1.0 MΩ",
      "Flow Rate": "20-700 cc/min",
      "Paint Pressure": "Max 1.0 MPa",
      "Electrostatic Voltage": "Max 100 kV",
      "Pattern Width": "120-350 mm",
      "Speed": "8,000-70,000 RPM",
      "Spray Range": "150-500 mm"
    },
    applications: [
      "General industrial coating",
      "Metal parts finishing",
      "Appliance coating",
      "Medium-volume production"
    ],
    imageUrls: [
      "/products/mingenn/meb928-main.jpg",
      "/products/mingenn/meb928-detail.jpg"
    ],
    features: {
      speed: "70,000 RPM turbine speed",
      efficiency: "80%+ transfer efficiency",
      reliability: "Simple, reliable design",
      versatility: "Multiple cup options"
    }
  },
  {
    slug: "x771sc-robotic-rotary-bell",
    name: "X771SC Premium Robotic Rotary Bell",
    model: "X771SC",
    category: "rotary-bells",
    subcategory: "robotic-bells",
    description: "High-end rotary bell designed for hollow-wrist robotic installation. Modular design with high efficiency, quality, intelligence, and automatic cleaning capabilities.",
    highlights: [
      "5-second rapid color change",
      "Dual-shape structure design",
      "Cup cleaning support",
      "Modular design, easy maintenance",
      "Maximum voltage: 100kV/70kV"
    ],
    specifications: {
      "Models": "X771SC / X771WE (both dual-shape)",
      "Weight": "7.1 kg / 8.5 kg (without piping)",
      "Bearing Air Pressure": "0.6-0.7 MPa",
      "Bearing Air Consumption": "50-100 NL/min",
      "Drive Air Consumption": "90-300 NL/min",
      "Minimum Valve Opening": "≥0.5 MPa",
      "Paint Types": "Solvent-based / Water-based",
      "Flow Rate": "50-700 cc/min",
      "Paint Pressure": "Max 1.0 MPa",
      "Maximum Voltage": "100 kV / 70 kV",
      "Speed": "8,000-70,000 RPM",
      "Coating Speed": "Max 1200 mm/s",
      "Spray Range": "150-500 mm / 200-500 mm"
    },
    applications: [
      "Automotive painting robots",
      "High-end robotic coating",
      "Multi-color robotic lines",
      "Precision coating applications"
    ],
    imageUrls: [
      "/products/mingenn/x771sc-main.jpg",
      "/products/mingenn/x771sc-robot.jpg"
    ],
    features: {
      speed: "5-second color change",
      efficiency: "Minimal paint loss",
      reliability: "Dual-shape, auto cleaning",
      versatility: "Robotic installation optimized"
    }
  }
];

/**
 * Core Components Series - 核心组件系列
 */
export const coreComponents: Product[] = [
  {
    slug: "mec302-dual-channel-hv-controller",
    name: "MECU302 Dual-Channel High Voltage Controller",
    model: "MECU302",
    category: "core-components",
    subcategory: "controllers",
    description: "Independent dual-output controller with customizable HV and current settings. Features touchscreen display for convenient operation and monitoring.",
    highlights: [
      "Dual high-voltage outputs",
      "Touchscreen display and operation",
      "Customizable settings",
      "CAN/RS485 communication"
    ],
    specifications: {
      "Dimensions": "160 x 110 x 120 mm",
      "Input Voltage": "220VAC 50/60 Hz",
      "Output Voltage (to gun)": "24V",
      "Output Current (to gun)": "1.0A",
      "High-Voltage Outputs": "2 channels",
      "Communication": "CAN / RS485"
    },
    applications: [
      "Electrostatic spray gun control",
      "Rotary bell HV control",
      "Multi-gun systems",
      "Custom coating equipment"
    ],
    imageUrls: [
      "/products/mingenn/mecu302-main.jpg",
      "/products/mingenn/mecu302-display.jpg"
    ],
    features: {
      versatility: "Dual independent outputs",
      reliability: "Touchscreen interface"
    }
  },
  {
    slug: "f01-modular-valve-island",
    name: "F01 Modular Valve Island",
    model: "F01",
    category: "core-components",
    subcategory: "valve-islands",
    description: "Modular valve island with fast color change and cleaning functions. Compatible with spray guns or valve islands for rapid color changes and cleaning in automotive coating applications.",
    highlights: [
      "Valve life: 3.5 million cycles",
      "All-metal body option for special paints",
      "Independent safety valve prevents color mixing",
      "Modular configuration available"
    ],
    specifications: {
      "Modules": "Cleaning, Color Change, Outlet",
      "Body Material": "POM",
      "Applicable Paints": "Water-based, Solvent-based",
      "Opening Pressure": ">0.5 MPa",
      "Closing Pressure": "<0.2 MPa",
      "Paint Supply Pressure": "0.2-1.0 MPa"
    },
    applications: [
      "Automotive painting systems",
      "Multi-color coating lines",
      "High-frequency color changes",
      "Special paint applications"
    ],
    imageUrls: [
      "/products/mingenn/f01-main.jpg",
      "/products/mingenn/f01-modules.jpg"
    ],
    features: {
      speed: "Fast color change",
      reliability: "3.5M cycle life",
      versatility: "Modular configuration"
    }
  },
  {
    slug: "yb002-6-precision-gear-pump",
    name: "YB002-6 Precision Gear Pump",
    model: "YB002-6.0",
    category: "core-components",
    subcategory: "gear-pumps",
    description: "High-precision metering device for coating applications. Features ultra-hard surface coating, excellent wear resistance, and extended service life.",
    highlights: [
      "Volumetric efficiency: 95%+",
      "DLC coating for enhanced hardness",
      "Multiple cleaning functions",
      "High metering accuracy"
    ],
    specifications: {
      "Models": "YB002-6.0 / YB002-3.0 / YB002-1.2",
      "Displacement": "6.0 / 3.0 / 1.2 cc/rev",
      "Weight": "Approx 1.6 kg",
      "Paint Supply Pressure": "0.2-1.0 MPa",
      "Repeatability": "±0.5%",
      "Rotation Direction": "Clockwise",
      "Speed": "20-150 RPM",
      "Max Torque": "12 Nm",
      "Volumetric Efficiency": ">95%"
    },
    applications: [
      "High-precision coating",
      "2K material metering",
      "Sealant application",
      "Adhesive dispensing"
    ],
    imageUrls: [
      "/products/mingenn/yb002-main.jpg",
      "/products/mingenn/yb002-detail.jpg"
    ],
    features: {
      efficiency: "95%+ volumetric efficiency",
      reliability: "DLC coating, wear resistant"
    }
  },
  {
    slug: "mpp003-powder-pump",
    name: "MPP003 Powder Pump",
    model: "MPP003",
    category: "core-components",
    subcategory: "powder-pumps",
    description: "Powder coating conveyance pump for transporting powder from supply unit to powder spray guns and bells. Uniform powder delivery with stable performance.",
    highlights: [
      "Powder delivery: 500 g/min",
      "Quick-disconnect and anti-error design",
      "Simple structure, easy maintenance",
      "Compatible with all powder coatings"
    ],
    specifications: {
      "Air Supply Pressure": "5 bar",
      "Powder Air Tube": "PA11-PHL φ8×1",
      "Atomizing Air Tube": "PA11-PHL φ8×1",
      "Powder Box Mounting": "20mm",
      "Powder Tube ID": "12mm",
      "Delivery Rate": "500 g/min"
    },
    applications: [
      "Powder coating systems",
      "Automatic powder application",
      "Fluidized bed coating",
      "Powder recycling systems"
    ],
    imageUrls: [
      "/products/mingenn/mpp003-main.jpg",
      "/products/mingenn/mpp003-system.jpg"
    ],
    features: {
      speed: "500 g/min delivery",
      reliability: "Stable, uniform delivery"
    }
  },
  {
    slug: "mp23-5-gear-pump",
    name: "MP23-5 Automatic Gear Pump",
    model: "MP23-5.0",
    category: "core-components",
    subcategory: "gear-pumps",
    description: "Gear pump for automatic coating systems providing stable and consistent paint flow. Smooth operation, high accuracy, long service life.",
    highlights: [
      "Volumetric efficiency: 85%+",
      "Smooth operation, high efficiency",
      "DLC coating option for water-based paints",
      "Cost-effective solution"
    ],
    specifications: {
      "Models": "MP23-5.0 / MP23-3.0",
      "Displacement": "5.0 / 3.0 cc/rev",
      "Weight": "1.7 / 1.5 kg",
      "Max Pressure": "10 MPa",
      "Repeatability": "±2%",
      "Rotation": "Clockwise",
      "Speed": "20-150 RPM",
      "Max Torque": "12 Nm",
      "Volumetric Efficiency": ">85%"
    },
    applications: [
      "Automatic coating systems",
      "Paint circulation",
      "Material metering",
      "General industrial coating"
    ],
    imageUrls: [
      "/products/mingenn/mp23-main.jpg"
    ],
    features: {
      efficiency: "85%+ volumetric efficiency",
      reliability: "Smooth, long-lasting"
    }
  },
  {
    slug: "mec101-powder-controller",
    name: "MECU101 Powder Coating Controller",
    model: "MECU101",
    category: "core-components",
    subcategory: "controllers",
    description: "Controller for electrostatic powder spray guns and bells. Controls HV device and airflow regulation for optimal performance and safety.",
    highlights: [
      "Optional fieldbus communication module",
      "Modular design with display, motherboard, pneumatic, and power modules",
      "Simple design, built-in instructions",
      "Easy to use and maintain"
    ],
    specifications: {
      "Input Voltage": "220VAC 50/60 Hz",
      "Tolerance": "+10% / -15%",
      "Load": "45 VA",
      "Output Voltage (to gun/bell)": "12V",
      "Output Current (to gun/bell)": "1.2A",
      "Protection": "IP 54",
      "Temperature Range": "0°C to +40°C",
      "Communication": "485 / CAN"
    },
    applications: [
      "Powder spray gun control",
      "Powder bell control",
      "Powder coating systems",
      "Automated powder lines"
    ],
    imageUrls: [
      "/products/mingenn/mecu101-main.jpg",
      "/products/mingenn/mecu101-panel.jpg"
    ],
    features: {
      versatility: "Fieldbus communication option",
      reliability: "Modular design"
    }
  }
];

/**
 * Powder Coating Series - 粉末喷涂系列
 */
export const powderCoating: Product[] = [
  {
    slug: "mpb001l-powder-rotary-bell",
    name: "MPB001L Powder Electrostatic Rotary Bell",
    model: "MPB001L",
    category: "powder-coating",
    subcategory: "powder-bells",
    description: "Powder electrostatic rotary bell with high efficiency, consistency, and powder utilization. Modular design meets various coating requirements with quick changeover capability.",
    highlights: [
      "Powder flow: 800-900 g/min",
      "Multiple cup diameter options",
      "Uniform coating, controllable film thickness",
      "Higher first-pass transfer efficiency"
    ],
    specifications: {
      "Models": "MPB001L (reciprocator) / MPB001R (robot)",
      "Weight": "3.0 kg / 3.5 kg",
      "Standard Air Pressure": "0.6 MPa",
      "Bearing Air Pressure": "0.2 MPa",
      "Shaping Air": "50-300 NL/min",
      "Drive Air": "150-300 NL/min",
      "Bearing Air": "70-100 NL/min",
      "Powder Output": "800-900 g/min",
      "Output Voltage": "Max 90 kV",
      "Output Current": "Max 110 μA",
      "Speed": "Max 25,000 RPM",
      "Spray Range": "Max 550 mm"
    },
    applications: [
      "Powder coating applications",
      "Automotive parts powder coating",
      "Appliance powder finishing",
      "Metal furniture coating"
    ],
    imageUrls: [
      "/products/mingenn/mpb001l-main.jpg",
      "/products/mingenn/mpb001l-application.jpg"
    ],
    features: {
      speed: "800-900 g/min powder flow",
      efficiency: "High first-pass efficiency",
      reliability: "Uniform coating quality",
      versatility: "Multiple cup configurations"
    }
  }
];

/**
 * All Products Export
 */
export const allProducts: Product[] = [
  ...sprayGuns,
  ...rotaryBells,
  ...coreComponents,
  ...powderCoating
];

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(product => product.slug === slug);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(product => product.category === category);
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(subcategory: string): Product[] {
  return allProducts.filter(product => product.subcategory === subcategory);
}

/**
 * Search products
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.model.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.highlights.some(h => h.toLowerCase().includes(lowerQuery))
  );
}
