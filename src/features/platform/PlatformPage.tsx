import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Workflow, 
  Layers, 
  ShieldCheck, 
  Wallet, 
  Users2, 
  TrendingUp, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  BarChart3, 
  Terminal, 
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';
import { EnquiryModal } from '../../components/ui/EnquiryModal';

export const PlatformPage: React.FC = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('Schedule GELP Demo');

  const openModal = (title: string) => {
    setEnquiryTitle(title);
    setEnquiryOpen(true);
  };

  return (
    <div className="w-full bg-[#F4F1EA] pt-8 pb-20">
      
      {/* Hero: What is GELP? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/10">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#FF4D16] text-xs font-mono font-bold uppercase tracking-wider">
              <span>● THE CHASEHORSE ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Platform (GELP)
            </h1>

            <p className="text-base sm:text-xl text-[#E2DED5]/90 leading-relaxed font-light">
              One unified, transparent platform to orchestrate and scale on-ground logistics operations across India — bringing people, process, software, and capital into real-time alignment.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openModal('Request GELP Enterprise Trial')}
                className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-all text-sm flex items-center space-x-2 shadow-lg"
              >
                <span>Get Started — Ask for Trials</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openModal('Book a Live GELP Demo')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-[#171717] border border-white/20 font-bold rounded-xl transition-all text-sm"
              >
                Book a Demo
              </button>

              <a
                href="https://wa.me/919876543210?text=Hi%20ChaseHorse%2C%20I%20want%20to%20learn%20more%20about%20GELP%20Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1EBE5D] transition-all text-sm flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Let&apos;s Connect</span>
              </a>
            </div>
          </div>

          {/* Interactive Laptop Mockup Display (as shown in reference sheet) */}
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
            <div className="w-full max-w-4xl bg-[#222222] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-[#E2DED5]/60">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="font-mono text-[11px] ml-2 text-white">gelp.chasehorse.com — Enterprise Portal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[11px] text-green-400">All 6 Metro Hubs Connected</span>
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#171717] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#FF4D16] uppercase">Fleet & Docks</span>
                  <div className="text-2xl font-bold text-white">1,420 Active</div>
                  <p className="text-xs text-[#E2DED5]/70">Live consignments with verified GPS & E-way bills</p>
                </div>
                <div className="bg-[#171717] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#FF4D16] uppercase">Field Personnel</span>
                  <div className="text-2xl font-bold text-white">412 Stationed</div>
                  <p className="text-xs text-[#E2DED5]/70">CH Deploy leads actively supervising docks today</p>
                </div>
                <div className="bg-[#171717] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#FF4D16] uppercase">8D Quality OTIF</span>
                  <div className="text-2xl font-bold text-white">99.82%</div>
                  <p className="text-xs text-[#E2DED5]/70">Zero-defect compliance on automotive & retail lanes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 1: What is GELP? */}
      <section id="what-is-gelp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● THE PARADIGM SHIFT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              What is GELP?
            </h2>
            <p className="text-base text-[#625E58] leading-relaxed">
              <strong>Growth Enabling Logiworkx Platform (GELP)</strong> is ChaseHorse&apos;s proprietary hybrid infrastructure that combines enterprise-grade software orchestration with real on-the-ground operational accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-lg text-[#171717]">People on the Ground</h3>
              <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                Vetted dock leads, warehouse inspectors, and incident responders physically present where freight moves.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-lg text-[#171717]">Digital Rigor & TMS</h3>
              <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                Automated RFQs, inward visibility, E-Way Bill reconciliation, and 8D failure mode diagnostics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-lg text-[#171717]">Capital & Scalability</h3>
              <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                Integrated freight financing, invoice discounting, and instant terminal space access in 6 metro hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works? */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
            ● 3-STEP INTEGRATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
            How GELP Works in Practice
          </h2>
          <p className="text-sm sm:text-base text-[#625E58]">
            From initial dock assessment to automated daily dispatches and continuous cost optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-[#E2DED5] p-8 space-y-4 shadow-sm relative">
            <span className="text-4xl font-extrabold text-[#E2DED5] font-mono">01</span>
            <h3 className="text-xl font-bold text-[#171717]">Configure & Connect</h3>
            <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
              We connect your existing ERP/WMS with GELP data pipelines. Map your shipping lanes, configure transporter SLAs, and define mandatory loading dock inspection checklists.
            </p>
            <ul className="text-xs text-[#625E58] space-y-1.5 pt-2">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>Zero legacy software replacement</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>E-Way bill & GST system sync</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2DED5] p-8 space-y-4 shadow-sm relative">
            <span className="text-4xl font-extrabold text-[#FF4D16] font-mono">02</span>
            <h3 className="text-xl font-bold text-[#171717]">Deploy Workforce & Tools</h3>
            <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
              ChaseHorse deploys certified on-field leads (CH Deploy) to your distribution centers and warehouses. Drivers and loaders are equipped with standardized PPE and mobile audit apps.
            </p>
            <ul className="text-xs text-[#625E58] space-y-1.5 pt-2">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>Certified lashing and dock checklists</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>Instant photo documentation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2DED5] p-8 space-y-4 shadow-sm relative">
            <span className="text-4xl font-extrabold text-[#E2DED5] font-mono">03</span>
            <h3 className="text-xl font-bold text-[#171717]">Monitor & Scale Autonomously</h3>
            <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
              Live MIS feeds deliver transparent cost-per-ton analytics, lane benchmarks, and automated 8D root-cause alerts for any discrepancies, freeing your leadership to focus on core growth.
            </p>
            <ul className="text-xs text-[#625E58] space-y-1.5 pt-2">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>Real-time executive dashboards</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>Quarterly freight cost rationalization</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Platform Features & Capabilities */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● MODULAR ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
              Platform Features & Capabilities
            </h2>
            <p className="text-sm sm:text-base text-[#625E58]">
              Designed modularly so you can activate specific modules or run an integrated end-to-end operational suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-[#171717]">Cloud Transport Management (TMS)</h4>
              <p className="text-xs text-[#625E58]">
                End-to-end trip creation, automated vehicle allocation, digital LR generation, and carrier rating.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center font-bold">
                <Workflow className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-[#171717]">CH Deploy Field Command</h4>
              <p className="text-xs text-[#625E58]">
                Real-time task dispatch to on-ground dock leads, geo-tagged photo inspections, and vehicle fitness sign-offs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-[#171717]">8D Root Cause Engine</h4>
              <p className="text-xs text-[#625E58]">
                Structured complaint resolution resolving delivery discrepancies with permanent corrective actions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center font-bold">
                <Wallet className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-[#171717]">Trip Finance & Invoice Settlement</h4>
              <p className="text-xs text-[#625E58]">
                Fast-track working capital advance against verified E-PODs, keeping transporters motivated and loyal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-[#171717]">Freight Index & Lane Analytics</h4>
              <p className="text-xs text-[#625E58]">
                Live ₹/km benchmark rates across Indian arterial corridors to ensure competitive contract bidding.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center font-bold">
                <Globe2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base text-[#171717]">Pan-India Terminal Network</h4>
              <p className="text-xs text-[#625E58]">
                Instant booking of secured truck parking, driver rest zones, and cross-docking bays in 6 metro hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Technology Integration & Scalability */}
      <section id="technology" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● API & TELEMETRY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
              Seamless Integration with Enterprise Stacks
            </h2>
            <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
              GELP communicates natively via RESTful APIs, Webhooks, and EDI with SAP, Oracle NetSuite, Odoo, custom ERPs, Fastag toll feeds, and major telematics providers.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF4D16] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-sm text-[#171717]">ERP & WMS Bi-Directional Sync</h5>
                  <p className="text-xs text-[#625E58]">Orders generate dispatch requests; POD uploads instantly clear financial ledgers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF4D16] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-sm text-[#171717]">GST E-Way Bill Direct Verification</h5>
                  <p className="text-xs text-[#625E58]">Automatic validity check prior to truck gate-out prevents tax checkpoint penalties.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF4D16] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-sm text-[#171717]">IoT Temperature & Tilt Telemetry</h5>
                  <p className="text-xs text-[#625E58]">Continuous data streaming for pharma, cold-chain, and delicate industrial machinery.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 text-white border border-white/10 space-y-6">
            <h4 className="font-bold text-lg text-white flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-[#FF4D16]" />
              <span>GELP Integration Architecture</span>
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-400">
                POST /api/v1/dispatch/consignment/create
                <div className="text-[11px] text-[#E2DED5]/60 mt-1">
                  Payload: &lbrace; invoiceNo: &quot;INV-4029&quot;, lane: &quot;DEL-BOM&quot;, vehicle: &quot;32ft-MX&quot; &rbrace;
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-yellow-400">
                WEBHOOK: field.ch_deploy.dock_inspection_passed
                <div className="text-[11px] text-[#E2DED5]/60 mt-1">
                  Status: 100% Lashing Verified • GeoStamp: 28.4595° N, 77.0266° E
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400">
                EVENT: finance.trip_advance.disbursed
                <div className="text-[11px] text-[#E2DED5]/60 mt-1">
                  Transporter Bank Account Credited in 14 minutes
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-[#E2DED5]/70 border-t border-white/10">
              <span>99.98% System Uptime SLA</span>
              <span className="text-[#FF4D16] font-bold">Encrypted End-to-End</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA to Design Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#E2DED5] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF4D16] uppercase">
              TAILORED OPERATIONAL BLUEPRINT
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171717]">
              Design Your Platform Configuration
            </h3>
            <p className="text-xs sm:text-sm text-[#625E58] max-w-xl">
              Use our interactive DIY service builder to select your required modules across Tier 1, Tier 2, and Tier 3 and generate an instant proposal.
            </p>
          </div>

          <Link
            to="/design-your-solution"
            className="px-6 py-4 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors whitespace-nowrap flex items-center space-x-2 text-sm shadow-md"
          >
            <span>Launch DIY Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={enquiryTitle}
      />
    </div>
  );
};

