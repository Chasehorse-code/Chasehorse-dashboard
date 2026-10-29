import { Users, Cpu, Leaf, Globe2, LucideIcon } from 'lucide-react';

export interface PillarItem {
  id: string;
  title: string;
  descriptor: string;
  icon: LucideIcon;
  accentColor: string; // 'orange' | 'ink' | 'green'
  topBorderClass: string;
  iconBgClass: string;
  iconColorClass: string;
}

export interface WhoWeAreContent {
  eyebrow: string;
  heading: string;
  lead: string;
  story: {
    prefix: string;
    badgeText: string;
    suffix: string;
  };
  pillars: PillarItem[];
}

export const WHO_WE_ARE_DATA: WhoWeAreContent = {
  eyebrow: 'Who we are',
  heading: 'Who we are',
  lead: 'CHASEHORSE is a technology-driven logistics and supply chain transformation company delivering innovative solutions across industries globally.',
  story: {
    prefix:
      'As a growth enabling partner, we orchestrated need-of-the-hour solutions engineered with futuristic capabilities. We pioneer a first-of-its-kind ',
    badgeText: 'Logistics-as-a-Service (LaaS) Platform',
    suffix:
      ' and beyond—offering a simplified, plug-and-play model equipped with pre-integrated, deployment-ready resources. By bridging complex, incompatible CX links, we strategically position our clients to step forward as absolute leaders in their respective markets.',
  },
  pillars: [
    {
      id: 'human-interface',
      title: 'Human Interface',
      descriptor: 'Empowering on-ground operations through vetted, tech-enabled frontline workforce.',
      icon: Users,
      accentColor: '#ff4d12',
      topBorderClass: 'border-t-[#ff4d12]',
      iconBgClass: 'bg-[#ff4d12]/10 group-hover:bg-[#ff4d12]',
      iconColorClass: 'text-[#ff4d12] group-hover:text-white',
    },
    {
      id: 'technology',
      title: 'Technology',
      descriptor: 'Proprietary TMS, dynamic dispatch algorithms, telemetry, and automated audit layers.',
      icon: Cpu,
      accentColor: '#171717',
      topBorderClass: 'border-t-[#171717]',
      iconBgClass: 'bg-[#171717]/10 group-hover:bg-[#171717]',
      iconColorClass: 'text-[#171717] group-hover:text-white',
    },
    {
      id: 'esg-sustainability',
      title: 'ESG-Sustainability',
      descriptor: 'Real-time carbon telemetry, route emissions tracking, and green fleet transition roadmaps.',
      icon: Leaf,
      accentColor: '#22c55e',
      topBorderClass: 'border-t-[#22c55e]',
      iconBgClass: 'bg-[#22c55e]/10 group-hover:bg-[#22c55e]',
      iconColorClass: 'text-[#22c55e] group-hover:text-white',
    },
    {
      id: 'market-integrated',
      title: 'Market Integrated',
      descriptor: 'Live freight index, spot vehicle procurement, and integrated national transport hubs.',
      icon: Globe2,
      accentColor: '#ff4d12',
      topBorderClass: 'border-t-[#ff4d12]',
      iconBgClass: 'bg-[#ff4d12]/10 group-hover:bg-[#ff4d12]',
      iconColorClass: 'text-[#ff4d12] group-hover:text-white',
    },
  ],
};

