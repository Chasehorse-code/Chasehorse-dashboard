import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight 
} from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pre-footer Banner: CTA */}
        <div className="bg-gradient-to-r from-[#222222] to-[#1c1c1c] rounded-3xl p-8 sm:p-10 mb-16 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16]">
              ● PAN-INDIA FIELD EXECUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to eliminate transit damages, dock delays, and logistics blind spots?
            </h3>
            <p className="text-sm text-[#E2DED5]/80 leading-relaxed">
              Deploy vetted field supervisors, digitize E-way bill tracking, or customize a Tier 1-3 operational framework for your supply chain today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/design-your-solution"
              className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-all shadow-lg hover:shadow-[#FF4D16]/20 flex items-center space-x-2 text-sm"
            >
              <span>Design Your Solution</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20ChaseHorse%2C%20I%20want%20to%20connect%20regarding%20logistics%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1EBE5D] transition-all flex items-center space-x-2 text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Platform (GELP) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">Platform (GELP)</h4>
            <ul className="space-y-2 text-xs text-[#E2DED5]/80">
              <li><Link to="/platform#what-is-gelp" className="hover:text-white transition-colors">What is GELP?</Link></li>
              <li><Link to="/platform#how-it-works" className="hover:text-white transition-colors">How it Works?</Link></li>
              <li><Link to="/platform#features" className="hover:text-white transition-colors">Platform Features</Link></li>
              <li><Link to="/platform#capabilities" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link to="/platform#technology" className="hover:text-white transition-colors">Technology Integration</Link></li>
              <li><Link to="/platform#finance" className="hover:text-white transition-colors">Flexible Finance</Link></li>
              <li><Link to="/platform#resources" className="hover:text-white transition-colors">Skilled Resources</Link></li>
              <li><Link to="/design-your-solution" className="hover:text-[#FF4D16] transition-colors font-semibold">Design Your Platform →</Link></li>
            </ul>
          </div>

          {/* Col 2: Solutions & Tiers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">Solutions</h4>
            <ul className="space-y-2 text-xs text-[#E2DED5]/80">
              <li><Link to="/solutions/tier-1" className="hover:text-white transition-colors">Tier 1 — Core Services</Link></li>
              <li><Link to="/solutions/tier-2" className="hover:text-white transition-colors">Tier 2 — Strategic & Growth</Link></li>
              <li><Link to="/solutions/tier-3" className="hover:text-white transition-colors">Tier 3 — Advanced Tech</Link></li>
              <li><Link to="/solutions#sectors" className="hover:text-white transition-colors">Sectors & Industries</Link></li>
              <li><Link to="/solutions#ecosystem" className="hover:text-white transition-colors">Partner Ecosystem</Link></li>
              <li><Link to="/design-your-solution" className="hover:text-[#FF4D16] transition-colors font-semibold">DIY Customizer</Link></li>
            </ul>
          </div>

          {/* Col 3: Live Market */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">Live Market</h4>
            <ul className="space-y-2 text-xs text-[#E2DED5]/80">
              <li><Link to="/live-market/book-truck" className="hover:text-white transition-colors">Book Truck Now</Link></li>
              <li><Link to="/live-market/terminal-space" className="hover:text-white transition-colors">Terminal Space Lease</Link></li>
              <li><Link to="/live-market/on-field-lead" className="hover:text-white transition-colors">Deploy On-Field Lead</Link></li>
              <li><Link to="/live-market/trip-finance" className="hover:text-white transition-colors">Secure Trip Finance</Link></li>
              <li><Link to="/live-market/freight-index" className="hover:text-[#FF4D16] transition-colors font-semibold">Today Freight Index</Link></li>
            </ul>
          </div>

          {/* Col 4: HSE Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">HSE Shop</h4>
            <ul className="space-y-2 text-xs text-[#E2DED5]/80">
              <li><Link to="/hse-shop" className="hover:text-white transition-colors">Visit Official HSE Shop</Link></li>
              <li><Link to="/hse-shop#offline-stores" className="hover:text-white transition-colors">Find Offline Store</Link></li>
              <li><Link to="/hse-shop#request-on-site" className="hover:text-white transition-colors">Request On-Site Store</Link></li>
              <li><Link to="/hse-shop?category=ppe-kits" className="hover:text-white transition-colors">Master PPE Kits</Link></li>
              <li><Link to="/hse-shop?category=helmets" className="hover:text-white transition-colors">Safety Helmets (EN 397)</Link></li>
              <li><Link to="/hse-shop?category=footwear" className="hover:text-white transition-colors">S3 Steel-Toe Boots</Link></li>
            </ul>
          </div>

          {/* Col 5: Discover */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">Discover</h4>
            <ul className="space-y-2 text-xs text-[#E2DED5]/80">
              <li><Link to="/discover#courses" className="hover:text-white transition-colors">Logistics Courses</Link></li>
              <li><Link to="/discover#internships" className="hover:text-white transition-colors">Internships</Link></li>
              <li><Link to="/discover#resources" className="hover:text-white transition-colors">SOP & Whitepapers</Link></li>
              <li><Link to="/discover#stories" className="hover:text-white transition-colors">Customer Stories</Link></li>
              <li><Link to="/discover#safety" className="hover:text-white transition-colors">HSE Safety Standards</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors font-semibold">Find Our 6 Metro Hubs</Link></li>
            </ul>
          </div>

          {/* Col 6: Partners & Careers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">Partners & Careers</h4>
            <ul className="space-y-2 text-xs text-[#E2DED5]/80">
              <li><Link to="/partners#on-field" className="hover:text-white transition-colors">On-Field Professionals</Link></li>
              <li>
                <a 
                  href="https://forms.gle/QmiddiuRkaRLbesEA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF4D16] hover:underline flex items-center space-x-1"
                >
                  <span>Google Partner Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><Link to="/partners#transportation" className="hover:text-white transition-colors">Transporters & Fleet</Link></li>
              <li><Link to="/partners#terminal-space" className="hover:text-white transition-colors">Terminal Space Owners</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers & Open Roles</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors font-semibold text-[#FF4D16]">Client Portal Login</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Logo, Hub Cities, Copyright, Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src="/chasehorse-logo.png"
              alt="ChaseHorse"
              className="h-8 w-auto filter invert"
            />
            <span className="text-xs text-[#E2DED5]/60 text-center sm:text-left">
              Growth Enabling Logiworkx Partner (GELP) • © {new Date().getFullYear()} ChaseHorse. All rights reserved.
            </span>
          </div>

          {/* Hub cities pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-[#E2DED5]/60">
            <span className="text-[#FF4D16] font-semibold">Operating Hubs:</span>
            <span>New Delhi</span> • 
            <span>Mumbai</span> • 
            <span>Bengaluru (HQ)</span> • 
            <span>Chennai</span> • 
            <span>Kolkata</span> • 
            <span>Hyderabad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

