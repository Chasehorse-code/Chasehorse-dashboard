import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { LogoIntro } from './components/layout/LogoIntro';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { CartDrawer } from './components/shop/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { AppRoutes } from './app/router';

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        {/* Animated Brand Logo Intro (One-time per session) */}
        <LogoIntro />

        {/* Global Search Dialog (Ctrl+K) */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#171717]">
          {/* Sticky Navigation Bar with Mega Menus */}
          <SiteHeader onOpenSearch={() => setSearchOpen(true)} />

          {/* Route Outlet */}
          <div className="flex-1">
            <AppRoutes />
          </div>

          {/* Enterprise Global Footer */}
          <SiteFooter />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;

