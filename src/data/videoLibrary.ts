/**
 * Video Library - Video metadata for OSS-hosted content
 * Professional English titles and descriptions for SEO and AI reference
 */

export interface VideoMetadata {
  id: string;
  filename: string;
  title: string;
  description: string;
  keywords: string[];
  category: 'cleaning' | 'process' | 'equipment' | 'case-study';
  duration?: string;
  ossPath: string;
  thumbnailPath?: string;
}

/**
 * Video library with professional English metadata
 * Titles and descriptions follow industry-standard terminology
 */
export const videoLibrary: VideoMetadata[] = [
  // === Already uploaded videos ===
  {
    id: 'bell-cleaning-demo-1',
    filename: 'bell-cleaning-demo-1.mp4',
    title: 'Rotary Bell Atomizer Cleaning Process Demo - Part 1',
    description: 'Step-by-step demonstration of rotary bell atomizer cleaning procedure in automated spray painting systems. This video covers the pre-cleaning inspection, solvent purge cycle, and air blow-dry sequence. Essential reference for paint shop operators and maintenance technicians learning automated bell cleaning protocols.',
    keywords: [
      'rotary bell atomizer',
      'bell cleaning',
      'spray gun maintenance',
      'paint shop automation',
      'electrostatic coating',
      'paint equipment maintenance'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/bell-cleaning-demo-1.mp4'
  },
  {
    id: 'bell-cleaning-demo-2',
    filename: 'bell-cleaning-demo-2.mp4',
    title: 'Rotary Bell Atomizer Cleaning Process Demo - Part 2',
    description: 'Continuation of the rotary bell atomizer cleaning demonstration, covering post-cleaning inspection, cup reassembly, and performance verification. Demonstrates proper technique for maintaining optimal atomization quality and extending equipment service life in high-volume production environments.',
    keywords: [
      'rotary bell atomizer',
      'bell maintenance',
      'atomizer cleaning',
      'spray equipment',
      'paint booth maintenance',
      'quality control'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/bell-cleaning-demo-2.mp4'
  },
  {
    id: 'endura-flo-dc-intro',
    filename: 'e-flo-dc-intro.mp4',
    title: 'Endura-Flo DC Paint Supply System Introduction',
    description: 'Introduction to the Endura-Flo DC paint supply system featuring direct current metering pump technology. Learn how this precision paint delivery system achieves accurate flow control for industrial coating applications, improving transfer efficiency and reducing material waste in robotic spray painting operations.',
    keywords: [
      'paint supply system',
      'paint pump',
      'precision metering',
      'flow control',
      'industrial coating',
      'paint delivery'
    ],
    category: 'equipment',
    ossPath: 'videos/knowledge/e-flo-dc-intro.mp4'
  },
  {
    id: 'endura-flo-cleaning-demo',
    filename: 'endura-flo-cleaning-demo.mp4',
    title: 'Endura-Flo DC System Cleaning and Purge Procedure',
    description: 'Comprehensive demonstration of the Endura-Flo DC paint supply system cleaning and purge procedure. This video shows the automated solvent flush cycle, air purge sequence, and system standby configuration. Critical maintenance procedure for ensuring color change efficiency and preventing cross-contamination.',
    keywords: [
      'paint system cleaning',
      'purge procedure',
      'color change',
      'paint booth maintenance',
      'solvent flush',
      'paint equipment'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/endura-flo-cleaning-demo.mp4'
  },

  // === New videos to upload ===
  {
    id: 'rotary-bell-maintenance-1',
    filename: '1656918117043961.mp4',
    title: 'Rotary Bell Atomizer Daily Maintenance Procedure - Segment 1',
    description: 'Daily maintenance routine for rotary bell atomizers in automotive paint shops. This segment covers pre-shift inspection checklist, including turbine speed verification, shaping air calibration, and electrostatic voltage check. Professional maintenance practice for sustaining high-quality coating finish and maximizing equipment uptime.',
    keywords: [
      'rotary bell maintenance',
      'daily inspection',
      'paint shop setup',
      'atomizer calibration',
      'turbine speed',
      'electrostatic voltage'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/rotary-bell-maintenance-1.mp4'
  },
  {
    id: 'rotary-bell-maintenance-2',
    filename: '1656918118015008.mp4',
    title: 'Rotary Bell Atomizer Deep Cleaning - Segment 2',
    description: 'Deep cleaning procedure for rotary bell atomizers following extended production runs. Demonstrates disassembly technique for cup and shaping air ring, ultrasonic cleaning bath procedure, and reassembly with new seals. Essential maintenance knowledge for paint shop supervisors and equipment technicians.',
    keywords: [
      'rotary bell cleaning',
      'deep cleaning',
      'ultrasonic cleaning',
      'atomizer disassembly',
      'maintenance procedure',
      'seal replacement'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/rotary-bell-maintenance-2.mp4'
  },
  {
    id: 'rotary-bell-troubleshooting',
    filename: '1656918118868157.mp4',
    title: 'Rotary Bell Atomizer Troubleshooting Guide',
    description: 'Diagnostic procedures for common rotary bell atomizer issues including pattern asymmetry, reduced transfer efficiency, and abnormal vibration. Learn systematic troubleshooting methodology for identifying root causes and implementing corrective actions. Valuable reference for paint process engineers and quality technicians.',
    keywords: [
      'rotary bell troubleshooting',
      'atomizer diagnosis',
      'pattern defect',
      'transfer efficiency',
      'vibration analysis',
      'paint quality'
    ],
    category: 'equipment',
    ossPath: 'videos/knowledge/rotary-bell-troubleshooting.mp4'
  },
  {
    id: 'snowflake-cleaning-demo-1',
    filename: '视频1.mp4',
    title: 'Snowflake Cleaning System Operation Demo - Cycle Overview',
    description: 'Introduction to snowflake cleaning technology for rotary bell atomizers. This video demonstrates the complete snowflake cleaning cycle including media delivery, impact cleaning, and debris extraction phases. Learn how this innovative cleaning method improves throughput and reduces solvent consumption compared to traditional flushing procedures.',
    keywords: [
      'snowflake cleaning',
      'bell cleaning system',
      'media cleaning',
      'atomizer maintenance',
      'paint booth efficiency',
      'cleaning technology'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/snowflake-cleaning-demo-1.mp4'
  },
  {
    id: 'snowflake-cleaning-demo-2',
    filename: '视频2.mp4',
    title: 'Snowflake Cleaning vs Traditional Solvent Flush Comparison',
    description: 'Side-by-side comparison of snowflake cleaning technology versus traditional solvent flush for rotary bell atomizers. Demonstrates time savings, solvent reduction, and cleaning effectiveness. Critical evaluation for paint shop managers considering equipment upgrades or process improvements.',
    keywords: [
      'snowflake cleaning comparison',
      'solvent reduction',
      'cleaning efficiency',
      'process improvement',
      'paint shop cost savings',
      'environmental compliance'
    ],
    category: 'cleaning',
    ossPath: 'videos/knowledge/snowflake-cleaning-demo-2.mp4'
  },

  // === Additional Case Study Videos ===
  {
    id: 'shenyang-minghua-irb5400',
    filename: 'Simulation-JJ-5400-101130.mp4',
    title: 'Automotive Bumper Primer Application - Shenyang Minghua IRB5400 Project',
    description: 'ABB IRB5400 robot simulation for automotive bumper primer application at Shenyang Minghua. This project demonstrates automated primer coating for automotive plastic bumpers using high-performance rotary bell atomizers. Shows robot path programming for complete bumper coverage including complex geometries and recessed areas.',
    keywords: [
      'automotive bumper',
      'primer coating',
      'IRB5400',
      'plastic parts',
      'primer application',
      'robotic painting'
    ],
    category: 'case-study',
    ossPath: 'videos/case-studies/shenyang-minghua-irb5400-primer.mp4'
  },
  {
    id: 'shenyang-minghua-irb5500',
    filename: 'Simulation-JJ-5500-101202.mp4',
    title: 'High-Volume Primer Coating System - Shenyang Minghua IRB5500',
    description: 'ABB IRB5500 robot application for high-volume automotive primer coating at Shenyang Minghua facility. Demonstrates robotic primer application system designed for high throughput production lines. Features precise spray parameter control for uniform film thickness across complex bumper geometries.',
    keywords: [
      'IRB5500',
      'high-volume coating',
      'primer system',
      'automotive manufacturing',
      'paint shop automation'
    ],
    category: 'case-study',
    ossPath: 'videos/case-studies/shenyang-minghua-irb5500-primer.mp4'
  },
  {
    id: 'baosteel-wheel-coating',
    filename: '20110425141.mp4',
    title: 'Aluminum Wheel Rim Robotic Coating - Baosteel Shanghai',
    description: 'Complete robotic coating system for automotive aluminum wheel rims at Baosteel Shanghai facility. This project showcases automated painting of aluminum wheels with high transfer efficiency and consistent finish quality. Features multi-station configuration with precision robot positioning for complete rim coverage.',
    keywords: [
      'aluminum wheels',
      'wheel rim coating',
      'automotive wheels',
      'robotic coating',
      'Baosteel',
      'wheel finishing'
    ],
    category: 'case-study',
    ossPath: 'videos/case-studies/baosteel-wheel-coating.mp4'
  },

  // === Pigging / Color Change System Videos ===
  {
    id: 'pigging-color-change-demo',
    filename: '1700056643809856.mp4',
    title: 'Pigging Color Change System Operation Demo',
    description: 'Demonstration of pigging technology for rapid color change in multi-color painting operations. Shows the complete pigging cycle including pig launch, paint recovery, line flush, and new color loading. Essential reference for understanding how pigging systems achieve 95%+ paint recovery and sub-90-second color changes.',
    keywords: [
      'pigging system',
      'color change',
      'paint recovery',
      'rapid changeover',
      'multi-color painting',
      'paint supply system'
    ],
    category: 'process',
    ossPath: 'videos/knowledge/pigging-color-change-demo.mp4'
  }
];

/**
 * Get video by ID
 */
export function getVideoById(id: string): VideoMetadata | undefined {
  return videoLibrary.find(video => video.id === id);
}

/**
 * Get videos by category
 */
export function getVideosByCategory(category: VideoMetadata['category']): VideoMetadata[] {
  return videoLibrary.filter(video => video.category === category);
}

/**
 * Generate VideoObject schema for SEO
 */
export function generateVideoSchema(video: VideoMetadata, baseUrl: string = 'https://tdpaint.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': video.title,
    'description': video.description,
    'keywords': video.keywords.join(', '),
    'thumbnailUrl': video.thumbnailPath ? `${baseUrl}${video.thumbnailPath}` : undefined,
    'uploadDate': new Date().toISOString().split('T')[0],
    'duration': video.duration,
    'contentUrl': `${baseUrl}/${video.ossPath}`,
    'embedUrl': `${baseUrl}/player/${video.id}`,
    'publisher': {
      '@type': 'Organization',
      'name': 'TDpaint',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/logo.png`
      }
    }
  };
}

export default videoLibrary;
