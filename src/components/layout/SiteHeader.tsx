import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_NAVIGATION, MainNavItem } from '../../data/navigation';
import { MegaMenu } from '../navigation/MegaMenu';
import { ChaseHorseLogo } from '../ui/ChaseHorseLogo';
import { useCart } from '../../hooks/useCart';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const SiteHeader: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMenuId(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (itemId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenuId(itemId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 220);
  };

  const activeItem = MAIN_NAVIGATION.find((item) => item.id === activeMenuId);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#E2DED5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 py-2 group">
            <div className="h-10 md:h-12 flex items-center">
              <ChaseHorseLogo
                variant="dark"
                showTagline={false}
                className="w-48 sm:w-56 h-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation with Generous Spacing (~32-40px) */}
          <nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            onMouseLeave={handleMouseLeave}
          >
            {MAIN_NAVIGATION.filter((item) =>
              ['platform', 'solutions', 'live-market', 'discover', 'hse-shop', 'careers'].includes(item.id)
            ).map((item) => {
              const isActive = location.pathname.startsWith(item.path) && item.path !== '/' || (location.pathname === '/' && item.path === '/');
              const isHovered = activeMenuId === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <button
                    onClick={() => {
                      if (activeMenuId === item.id) {
                        setActiveMenuId(null);
                      } else {
                        setActiveMenuId(item.id);
                      }
                    }}
                    className={`inline-flex items-center space-x-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                      isHovered || isActive
                        ? 'text-[#FF4D16] bg-white/70 shadow-sm'
                        : 'text-[#171717] hover:text-[#FF4D16] hover:bg-white/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasMegaMenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isHovered ? 'rotate-180 text-[#FF4D16]' : 'text-[#625E58]'
                        }`}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & Login */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg text-[#171717] hover:bg-white hover:text-[#FF4D16] transition-colors border border-transparent hover:border-[#E2DED5]"
              title="Search Services & Products (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* HSE Shop Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg text-[#171717] hover:bg-white hover:text-[#FF4D16] transition-colors border border-transparent hover:border-[#E2DED5]"
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-[#FF4D16] rounded-full shadow-sm animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Login Button (Rightmost, after Partners - Opens in new tab per specification) */}
            <Link
              to="/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#171717] text-white hover:bg-[#FF4D16] transition-all shadow-sm"
              title="Open Client & Partner Portal in new tab"
            >
              <UserCheck className="w-4 h-4" />
              <span>Login</span>
            </Link>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-[#171717] hover:bg-white transition-colors border border-[#E2DED5]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <div onMouseEnter={() => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }} onMouseLeave={handleMouseLeave}>
        <AnimatePresence>
          {activeItem && activeItem.megaMenu && (
            <MegaMenu
              data={activeItem.megaMenu}
              onClose={() => setActiveMenuId(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#E2DED5] bg-white max-h-[calc(100vh-5rem)] overflow-y-auto px-4 py-6 shadow-xl"
          >
            <div className="space-y-3">
              {MAIN_NAVIGATION.map((item) => {
                const isExpanded = mobileExpanded === item.id;

                return (
                  <div key={item.id} className="border-b border-[#E2DED5]/60 pb-2">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-bold text-[#171717] hover:text-[#FF4D16]"
                      >
                        {item.label}
                      </Link>
                      {item.hasMegaMenu && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item.id)}
                          className="p-2 text-[#625E58] hover:text-[#FF4D16]"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180 text-[#FF4D16]' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu Accordion */}
                    {item.hasMegaMenu && isExpanded && item.megaMenu && (
                      <div className="pl-3 pr-1 py-2 space-y-4 bg-[#F4F1EA]/60 rounded-xl my-2">
                        {item.megaMenu.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D16]">
                              {sec.title}
                            </span>
                            <div className="space-y-1.5">
                              {sec.items.map((sub, subIdx) => {
                                const isExternal = sub.external || sub.path.startsWith('http');
                                return isExternal ? (
                                  <a
                                    key={subIdx}
                                    href={sub.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-1.5 text-sm text-[#171717] hover:text-[#FF4D16]"
                                  >
                                    <span>{sub.title}</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-[#8C877D]" />
                                  </a>
                                ) : (
                                  <Link
                                    key={subIdx}
                                    to={sub.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-1.5 text-sm text-[#171717] hover:text-[#FF4D16]"
                                  >
                                    <span>{sub.title}</span>
                                    {sub.badge && (
                                      <span className="text-[10px] px-1.5 py-0.5 bg-[#FFF0EB] text-[#FF4D16] rounded font-semibold">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {item.megaMenu.featuredCtaPath && (
                          <Link
                            to={item.megaMenu.featuredCtaPath}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-3 bg-[#FF4D16] text-white rounded-lg text-sm font-semibold"
                          >
                            <span>{item.megaMenu.featuredCtaText}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Login action button */}
              <div className="pt-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-[#171717] text-white rounded-xl font-bold text-center hover:bg-[#FF4D16] transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Client & Partner Login</span>
                </Link>
              </div>

              {/* Partner Google Form Shortcut */}
              <div className="pt-2">
                <a
                  href="https://forms.gle/QmiddiuRkaRLbesEA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-2.5 border border-[#E2DED5] text-[#171717] rounded-xl text-xs font-semibold text-center hover:border-[#171717]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FF4D16]" />
                  <span>Submit Partner Application Form →</span>
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
