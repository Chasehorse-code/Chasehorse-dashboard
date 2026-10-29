import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Features
import { HomePage } from '../features/home/HomePage';
import { PlatformPage } from '../features/platform/PlatformPage';
import { SolutionsPage } from '../features/solutions/SolutionsPage';
import { TierDetailPage } from '../features/solutions/TierDetailPage';
import { ServiceDetailPage } from '../features/services/ServiceDetailPage';
import { DesignSolutionPage } from '../features/design-solution/DesignSolutionPage';
import { LiveMarketOverviewPage } from '../features/live-market/LiveMarketOverviewPage';
import { BookTruckPage } from '../features/live-market/BookTruckPage';
import { TerminalSpacePage } from '../features/live-market/TerminalSpacePage';
import { DeployLeadPage } from '../features/live-market/DeployLeadPage';
import { TripFinancePage } from '../features/live-market/TripFinancePage';
import { FreightIndexPage } from '../features/live-market/FreightIndexPage';
import { DiscoverPage } from '../features/discover/DiscoverPage';
import { LocationsPage } from '../features/discover/LocationsPage';
import { HseShopPage } from '../features/hse-shop/HseShopPage';
import { ProductDetailPage } from '../features/hse-shop/ProductDetailPage';
import { PartnersPage } from '../features/partners/PartnersPage';
import { CareersPage } from '../features/careers/CareersPage';
import { LoginPage } from '../features/auth/LoginPage';
import { ClientDashboardPage } from '../features/dashboard/ClientDashboardPage';
import { ContactPage } from '../features/home/ContactPage';
import { NotFoundPage } from '../features/home/NotFoundPage';

// Scroll to top on route change
export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Platform (GELP) */}
        <Route path="/platform" element={<PlatformPage />} />

        {/* Solutions & Tiers */}
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:tierId" element={<TierDetailPage />} />

        {/* Dedicated Individual Service Detail Pages & Sub-services */}
        <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="/services/:serviceSlug/:subserviceSlug" element={<ServiceDetailPage />} />

        {/* Design Your Solution (DIY) */}
        <Route path="/design-your-solution" element={<DesignSolutionPage />} />

        {/* Live Market */}
        <Route path="/live-market" element={<LiveMarketOverviewPage />} />
        <Route path="/live-market/book-truck" element={<BookTruckPage />} />
        <Route path="/live-market/terminal-space" element={<TerminalSpacePage />} />
        <Route path="/live-market/on-field-lead" element={<DeployLeadPage />} />
        <Route path="/live-market/trip-finance" element={<TripFinancePage />} />
        <Route path="/live-market/freight-index" element={<FreightIndexPage />} />

        {/* Discover & Sub-pages */}
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/discover/:subTab" element={<DiscoverPage />} />
        <Route path="/locations" element={<LocationsPage />} />

        {/* HSE Shop & Sub-pages */}
        <Route path="/hse-shop" element={<HseShopPage />} />
        <Route path="/hse-shop/shop" element={<HseShopPage />} />
        <Route path="/hse-shop/products/:productSlug" element={<ProductDetailPage />} />
        <Route path="/hse-shop/cart" element={<HseShopPage />} />
        <Route path="/hse-shop/checkout" element={<HseShopPage />} />
        <Route path="/hse-shop/order-confirmation" element={<HseShopPage />} />
        <Route path="/hse-shop/track-order" element={<HseShopPage />} />
        <Route path="/hse-shop/request-onsite-store" element={<HseShopPage />} />
        <Route path="/hse-shop/offline-stores" element={<LocationsPage />} />

        {/* Partners & Careers */}
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:jobSlug" element={<CareersPage />} />

        {/* Auth & Client Dashboard */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<ClientDashboardPage />} />

        {/* Contact Us */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Catch-all Designed 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
