export interface SubNavItem {
  title: string;
  description?: string;
  path: string;
  badge?: string;
  external?: boolean;
  image?: string;
}

export interface NavSection {
  title: string;
  items: SubNavItem[];
}

export interface MegaMenuData {
  featuredTitle?: string;
  featuredDescription?: string;
  featuredImage?: string;
  featuredCtaText?: string;
  featuredCtaPath?: string;
  sections: NavSection[];
  quickActions?: {
    label: string;
    path: string;
    variant: 'primary' | 'secondary' | 'whatsapp';
  }[];
}

export interface MainNavItem {
  id: string;
  label: string;
  path: string;
  hasMegaMenu: boolean;
  megaMenu?: MegaMenuData;
}

export const MAIN_NAVIGATION: MainNavItem[] = [
  {
    id: 'platform',
    label: 'Platform',
    path: '/platform',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Platform (GELP)',
      featuredDescription: 'Everything you need to run logistics operations on ground — people, process, and performance.',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Design Your Platform',
      featuredCtaPath: '/design-your-solution',
      sections: [
        {
          title: 'Core Platform',
          items: [
            { title: 'What is GELP?', description: 'Growth Enabling Logiworkx Platform overview', path: '/platform#what-is-gelp' },
            { title: 'How it works?', description: 'On-ground operational execution engine', path: '/platform#how-it-works' },
            { title: 'Platform Features', description: 'Real-time visibility, TMS & audit tools', path: '/platform#features' },
            { title: 'Capabilities', description: 'Multi-vendor freight and workforce control', path: '/platform#capabilities' },
          ],
        },
        {
          title: 'Ecosystem & Scale',
          items: [
            { title: 'Technology Integration', description: 'ERP, WMS, GPS, and IoT connectivity', path: '/platform#technology' },
            { title: 'Flexible Finance Models', description: 'Working capital and freight settlement', path: '/platform#finance' },
            { title: 'Skilled Ready Resources', description: 'Pre-vetted field supervisors and leads', path: '/platform#resources' },
            { title: 'Business Scalability', description: 'Expanding from regional to pan-India hubs', path: '/platform#scalability' },
          ],
        },
      ],
      quickActions: [
        { label: 'Get Started', path: '/platform#get-started', variant: 'primary' },
        { label: 'Ask for Trials', path: '/platform#trials', variant: 'secondary' },
        { label: 'Book a Demo', path: '/platform#demo', variant: 'secondary' },
        { label: "Let's Connect", path: 'https://wa.me/919876543210?text=Hi%20ChaseHorse%2C%20I%20want%20to%20learn%20more%20about%20GELP', variant: 'whatsapp' },
      ],
    },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    path: '/solutions',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Custom Logistics Architecture',
      featuredDescription: 'Get supply chain solutions tailored to your business needs, volumes, and network footprint.',
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Design Your Solution (DIY)',
      featuredCtaPath: '/design-your-solution',
      sections: [
        {
          title: 'By Market Scope',
          items: [
            { title: 'Sectors', description: 'Shippers, 3PLs, retailers, and freight operators', path: '/solutions#sectors' },
            { title: 'Industries', description: 'Automotive, FMCG, Pharma, Heavy Machinery', path: '/solutions#industries' },
            { title: 'Partner Ecosystem', description: 'Integrations and carrier partnerships', path: '/solutions#ecosystem' },
          ],
        },
        {
          title: 'Custom Solution Design',
          items: [
            { title: 'Design Your Solution (DIY)', description: 'Select Tier 1-3 services by requirement & get estimate', path: '/design-your-solution', badge: 'Interactive' },
            { title: 'Customised Solution', description: 'Tailored enterprise packages with our engineering team', path: '/solutions#customized' },
            { title: 'Tier 1 — Core Services', description: 'Digital Transformation, CH Deploy, 8D Quality', path: '/solutions/tier-1' },
            { title: 'Tier 2 — Strategic Growth', description: 'Optimization Tools, CDX Pro, Fleet Care', path: '/solutions/tier-2' },
            { title: 'Tier 3 — Advanced Tech', description: 'Autonomous AI, Drones, IoT, Robotics', path: '/solutions/tier-3' },
          ],
        },
      ],
    },
  },
  {
    id: 'live-market',
    label: 'Live Market',
    path: '/live-market',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Real-time Logistics Engine',
      featuredDescription: 'Real-time logistics actions, spot capacity, terminal leasing, and national freight rates.',
      featuredImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Check Today Freight Index',
      featuredCtaPath: '/live-market/freight-index',
      sections: [
        {
          title: 'Dispatch & Capacity',
          items: [
            { title: 'Book Truck Now', description: 'Instant FTL and part-load truck placement', path: '/live-market/book-truck', badge: 'Instant' },
            { title: 'Book Truck Terminal Space', description: 'Secure parking bays and cross-dock terminal space', path: '/live-market/terminal-space' },
            { title: 'Deploy On-field Lead', description: 'Dispatch vetted operational leads to your dock in 2 hrs', path: '/live-market/on-field-lead' },
          ],
        },
        {
          title: 'Capital & Intelligence',
          items: [
            { title: 'Secure Trip Finance', description: 'Instant working capital & freight invoice discounting', path: '/live-market/trip-finance' },
            { title: 'Today Freight Index', description: 'Live ₹/km lane rates across all Indian corridors', path: '/live-market/freight-index', badge: 'Live Demo' },
          ],
        },
      ],
    },
  },
  {
    id: 'discover',
    label: 'Discover',
    path: '/discover',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Knowledge & Operations Hub',
      featuredDescription: 'Learn, grow, and connect with India’s leading on-ground logistics community.',
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Explore Service Locations',
      featuredCtaPath: '/locations',
      sections: [
        {
          title: 'Learn & Upskill',
          items: [
            { title: 'Courses', description: 'Professional logistics, HSE & supply chain certifications', path: '/discover#courses' },
            { title: 'Internships', description: 'Ground operations and digital supply chain traineeships', path: '/discover#internships' },
            { title: 'Resources', description: 'Whitepapers, SOP templates & compliance checklists', path: '/discover#resources' },
            { title: 'Video Guidance', description: 'SOP walk-throughs & cargo lashing demonstrations', path: '/discover#videos' },
          ],
        },
        {
          title: 'Company & Network',
          items: [
            { title: 'Customer Stories', description: 'Enterprise case studies and verified impact metrics', path: '/discover#stories' },
            { title: 'Events & Webinars', description: 'Industry roundtables and supply chain summits', path: '/discover#events' },
            { title: 'Safety Guidelines', description: 'HSE standards and driver welfare pledge', path: '/discover#safety' },
            { title: 'About Us', description: 'The ChaseHorse story, mission, and leadership', path: '/discover#about' },
            { title: 'Find Our Service Locations', description: 'Hubs across Delhi, Mumbai, Bengaluru, Chennai, etc.', path: '/locations' },
          ],
        },
      ],
    },
  },
  {
    id: 'hse-shop',
    label: 'HSE Shop',
    path: '/hse-shop',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Official Safety Store',
      featuredDescription: 'Deploy certified safety gear across your workforce. We can also deploy on-site managed stores at your facility.',
      featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Visit HSE Shop',
      featuredCtaPath: '/hse-shop',
      sections: [
        {
          title: 'Store Services',
          items: [
            { title: 'Find Offline Store', description: 'Locate physical HSE depots near your hubs', path: '/hse-shop#offline-stores' },
            { title: 'Request On-site Store', description: 'We deploy and manage a compliant HSE store inside your facility', path: '/hse-shop#request-on-site', badge: 'Turnkey' },
          ],
        },
        {
          title: 'Certified Gear & PPE',
          items: [
            { title: 'Merchandise & PPE Kits', description: 'Head-to-toe certified safety kits for workers', path: '/hse-shop?category=ppe-kits' },
            { title: 'Safety Helmets & Visors', description: 'EN 397 & IS 2925 industrial head protection', path: '/hse-shop?category=helmets' },
            { title: 'High-Visibility Jackets', description: 'Class 2 and Class 3 reflective workwear', path: '/hse-shop?category=jackets' },
            { title: 'Safety Footwear', description: 'Steel-toe anti-skid puncture-resistant boots', path: '/hse-shop?category=footwear' },
          ],
        },
      ],
    },
  },
  {
    id: 'careers',
    label: 'Careers',
    path: '/careers',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Join the Logiworkx Revolution',
      featuredDescription: 'Build the digital and operational backbone of Indian commerce.',
      featuredImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'View All Open Roles',
      featuredCtaPath: '/careers#jobs',
      sections: [
        {
          title: 'Career Tracks',
          items: [
            { title: 'Jobs on Platform', description: 'Engineering, product, sales & business roles', path: '/careers#jobs' },
            { title: 'On-field Logistics Leads', description: 'Dock leads, warehouse supervisors, and auditors', path: '/careers#on-field' },
            { title: 'Transportation Specialists', description: 'Fleet coordinators, dispatchers & lane leads', path: '/careers#transportation' },
          ],
        },
        {
          title: 'Why ChaseHorse',
          items: [
            { title: 'Culture & Benefits', description: 'Health insurance, career fast-track, stock options', path: '/careers#culture' },
            { title: 'Graduate Trainee Program', description: '12-month rotation across India operations hubs', path: '/careers#graduates' },
          ],
        },
      ],
    },
  },
  {
    id: 'partners',
    label: 'Partners',
    path: '/partners',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Join Hands with ChaseHorse',
      featuredDescription: 'Grow your logistics business with steady freight, verified clients, and rapid payment cycles.',
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Complete Onboarding Form',
      featuredCtaPath: 'https://forms.gle/QmiddiuRkaRLbesEA',
      sections: [
        {
          title: 'Partner Categories',
          items: [
            { title: 'On-field Logistics Professionals', description: 'Join our vetted network of ground supervisors & auditors', path: '/partners#on-field', badge: 'Google Form' },
            { title: 'Transportation Professionals', description: 'Transporters, Fleet Owners, Drivers & Freight Traders', path: '/partners#transportation' },
            { title: 'Truck Terminal Space Owners', description: 'List your yard, warehouse bay, or secure truck parking', path: '/partners#terminal-space' },
          ],
        },
        {
          title: 'Fast Track Onboarding',
          items: [
            { title: 'Official Google Partner Form', description: 'Submit KYC & capability profile directly', path: 'https://forms.gle/QmiddiuRkaRLbesEA', external: true },
            { title: 'Partner WhatsApp Group', description: 'Direct updates on daily spot loads and lane tenders', path: 'https://wa.me/919876543210?text=Hi%20ChaseHorse%2C%20I%20want%20to%20join%20the%20Partner%20Network', external: true },
          ],
        },
      ],
    },
  },
];

