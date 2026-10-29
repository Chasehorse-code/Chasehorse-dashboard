import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Wallet, 
  Users2, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  Database,
  Truck
} from 'lucide-react';

const GELP_PILLARS = [
  {
    icon: Cpu,
    title: 'Technology Integration',
    desc: 'Seamlessly connects with your existing ERP, SAP, Oracle, WMS, and IoT sensor streams. Zero software rip-and-replace required.',
    stat: '100% API Agnostic',
  },
  {
    icon: Wallet,
    title: 'Flexible Finance Models',
    desc: 'Trip finance, freight invoice discounting, and pay-per-dispatch terms that unlock working capital for shippers and transporters.',
    stat: 'Sub-24h Liquidity',
  },
  {
    icon: Users2,
    title: 'Skilled Ready Resources',
    desc: 'Pre-vetted, certified on-field leads, dock supervisors, and 3PL auditors deployed across India within guaranteed turnaround hours.',
    stat: '50K+ Field Workers',
  },
  {
    icon: TrendingUp,
    title: 'Business Scalability',
    desc: 'Expand from regional operations to a pan-India distribution network without capital expenditure on physical facilities or heavy overhead.',
    stat: '6 Metro Hub Gateways',
  },
];

export const PlatformBenefitsSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● THE GELP ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight">
              Why Enterprises Trust GELP
            </h2>
            <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
              Growth Enabling Logiworkx Platform (GELP) is not merely a tracking dashboard or freight broker. It is an operational operating system combining people, process, software, and capital on the ground.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/platform"
              className="px-5 py-3 bg-[#171717] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#FF4D16] transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Explore Platform Deep Dive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GELP_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2DED5] p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#171717] mb-2">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2DED5]/60 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF4D16]">{pillar.stat}</span>
                  <span className="text-xs font-semibold text-[#8C877D] group-hover:text-[#171717] transition-colors">
                    Verified SLA
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

