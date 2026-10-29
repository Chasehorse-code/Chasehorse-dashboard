import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Phone,
  Layers,
  ChevronRight,
  ExternalLink,
  Zap,
  Building2
} from 'lucide-react';
import { IndiaOperationsMap } from '../../components/maps/IndiaOperationsMap';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F1EA] pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden border-b border-[#E2DED5]">
      
      {/* Background Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D5CEBE 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 2-COLUMN SPLIT HERO ================= */}
        {/* First Half (Left, 50%): Content from Odoo & Team Docs */}
        {/* Second Half (Right, 50%): India Map with Interactive Hover Details & Maps Redirect */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================= LEFT HALF: EDITORIAL CONTENT & PILLARS ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-[#FF4D16] uppercase">
              <span className="w-2.5 h-2.5 border-2 border-[#FF4D16] rounded-sm bg-[#FF4D16]/20 inline-block" />
              <span>FIELD OPERATIONS PLATFORM • INDIA</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] tracking-tight leading-[1.05]">
                Every field task, verified where it happens.
              </h1>
              <div className="text-sm sm:text-base font-mono font-bold text-[#FF4D16]">
                Growth Enabler Logiworkx Platform [ GELP ]
              </div>
            </div>

            {/* Subtitle Paragraph (From Who We Are in Image 2) */}
            <p className="text-sm sm:text-base text-[#625E58] leading-relaxed max-w-xl">
              CHASEHORSE is a technology-driven logistics and supply chain transformation company delivering innovative solutions across industries globally. Connecting businesses with on-ground logistics execution, field workers, and real-time operations across India.
            </p>

            {/* The 4 Core Capability Pillars (From Odoo Website in Image 1 & 2) */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C877D] font-bold block">
                Integrated Operational Layers:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                  <span>Human Interface +</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                  <span>Technology +</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" />
                  <span>ESG-Sustainability +</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                  <span>Market Integrated</span>
                </span>
              </div>
            </div>

            {/* Onboarding Thunderspeed Strip (From Image 3) */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E2DED5] flex items-center justify-between text-xs shadow-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[#FF4D16] fill-[#FF4D16]/20" />
                <span className="font-bold text-[#171717]">Thunderspeed In Onboarding:</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="text-[#FF4D16] font-bold">24h Tier 1</span>
                <span className="text-[#8C877D]">•</span>
                <span className="text-[#171717] font-bold">48h Tier 2 Scale</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/solutions"
                className="px-6 py-3.5 bg-[#FF4D16] hover:bg-[#E53E0B] text-white font-bold rounded-xl text-sm flex items-center space-x-2 shadow-lg shadow-[#FF4D16]/25 transition-all group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/design-your-solution"
                className="px-5 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#171717] border border-[#E2DED5] hover:border-[#171717] font-bold rounded-xl text-sm transition-all shadow-sm"
              >
                <span>Design Your Solution</span>
              </Link>

              <a
                href="tel:+917337369111"
                className="px-4 py-3.5 text-xs font-mono font-bold text-[#625E58] hover:text-[#FF4D16] transition-colors flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 7337369111</span>
              </a>
            </div>

          </div>

          {/* ================= RIGHT HALF: ACCURATE INDIA OPERATIONS MAP ================= */}
          <div className="lg:col-span-6">
            <IndiaOperationsMap compact={true} />
          </div>

        </div>

      </div>
    </section>
  );
};
