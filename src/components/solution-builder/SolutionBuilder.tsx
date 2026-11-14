import React, { useState, useMemo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import './themes.css';
import { TierId, Service } from './types';
import { tiers, services } from './servicesData';
import { useTheme } from './useTheme';
import { useServiceHover } from './useServiceHover';
import { ThemeSwitcher } from './ThemeSwitcher';
import { TierColumn } from './TierColumn';
import { SummaryPanel } from './SummaryPanel';
import { BlueprintRequestModal } from './BlueprintRequestModal';
import { ServiceHoverCard } from './ServiceHoverCard';

export interface SolutionBuilderProps {
  initialSelectedIds?: string[];
}

/** Services grouped tier → category, preserving the order they appear in servicesData. */
const groupedByTier: Record<TierId, [string, Service[]][]> = (() => {
  const out = {} as Record<TierId, [string, Service[]][]>;
  tiers.forEach((t) => {
    const groups = new Map<string, Service[]>();
    services
      .filter((s) => s.tier === t.id)
      .forEach((s) => {
        if (!groups.has(s.group)) groups.set(s.group, []);
        groups.get(s.group)!.push(s);
      });
    out[t.id] = Array.from(groups.entries());
  });
  return out;
})();

const categoryCount = Object.values(groupedByTier).reduce((n, g) => n + g.length, 0);
const tierTotals: Record<string, number> = Object.fromEntries(
  tiers.map((t) => [t.id, services.filter((s) => s.tier === t.id).length])
);

export const SolutionBuilder: React.FC<SolutionBuilderProps> = ({ initialSelectedIds = [] }) => {
  const { theme, setTheme, themesList } = useTheme();

  // Selection stored strictly as Set<string>
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(initialSelectedIds));

  // Floating UI Hover Hook
  const {
    activeService,
    isOpen: isHoverOpen,
    openForService,
    closeHover,
    refs,
    floatingStyles,
    placement,
    middlewareData,
    arrowRef,
    getFloatingProps,
  } = useServiceHover();

  // Selected services in catalogue order (tier → category → service), so the blueprint reads like the page.
  const selectedServicesList = useMemo(
    () => services.filter((s) => selectedIds.has(s.id)),
    [selectedIds]
  );

  // Blueprint request form (contact details → WhatsApp)
  const [requestOpen, setRequestOpen] = useState(false);

  const handleToggleService = useCallback((serviceId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) next.delete(serviceId);
      else next.add(serviceId);
      return next;
    });
  }, []);

  const handleToggleGroup = useCallback((groupServices: Service[], shouldSelectAll: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      groupServices.forEach((s) => (shouldSelectAll ? next.add(s.id) : next.delete(s.id)));
      return next;
    });
  }, []);

  const handleRemoveService = useCallback((serviceId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(serviceId);
      return next;
    });
  }, []);

  const handleClearAll = useCallback(() => setSelectedIds(new Set()), []);

  const handleRowInfoClick = useCallback(
    (service: Service, el: HTMLElement, e: React.MouseEvent) => {
      e.stopPropagation();
      openForService(service, el);
    },
    [openForService]
  );

  const handleSubmitBlueprint = useCallback(() => {
    closeHover();
    setRequestOpen(true);
  }, [closeHover]);

  const scrollToBlueprint = () => {
    document.getElementById('solution-blueprint')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const count = selectedServicesList.length;

  return (
    <div
      className="sb-theme-container min-h-screen pt-10 pb-28 lg:py-14 transition-colors duration-250 font-sans"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-[0.14em] uppercase"
                style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--acc)' }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping sb-accent-bg" />
                  <span className="relative inline-flex w-2 h-2 rounded-full sb-accent-bg" />
                </span>
                Service Configurator
              </div>

              <h1
                className="mt-5 text-[40px] sm:text-6xl font-black tracking-[-0.035em] leading-[0.98]"
                style={{ color: 'var(--ink)' }}
              >
                Design your <span style={{ color: 'var(--acc)' }}>solution.</span>
              </h1>

              <p className="mt-5 text-[15px] sm:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--mut)' }}>
                Build your logistics stack from the full Chasehorse catalogue. Pick services across all four tiers —
                they collect in your blueprint, and our team turns it into a plan for your operations.
              </p>
            </div>

            <div className="shrink-0">
              <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} themes={themesList} />
            </div>
          </div>

          {/* Stats + steps strip */}
          <div
            className="mt-8 rounded-[20px] grid grid-cols-3 lg:grid-cols-[repeat(3,auto)_1fr] overflow-hidden"
            style={{ background: 'var(--card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-card)' }}
          >
            {[
              [tiers.length, 'Tiers'],
              [categoryCount, 'Categories'],
              [services.length, 'Services'],
            ].map(([n, label]) => (
              <div key={label} className="px-4 sm:px-7 py-4 border-r last-of-type:border-r-0 lg:last-of-type:border-r" style={{ borderColor: 'var(--line)' }}>
                <div className="text-2xl sm:text-3xl font-black tracking-tight tabular-nums" style={{ color: 'var(--ink)' }}>
                  {n}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--mut)' }}>
                  {label}
                </div>
              </div>
            ))}
            <ol className="col-span-3 lg:col-span-1 px-4 sm:px-7 py-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t lg:border-t-0" style={{ borderColor: 'var(--line)' }}>
              {['Tick services', 'Review blueprint', 'Send to our team'].map((step, i) => (
                <li key={step} className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--ink)' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white sb-accent-bg">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Workspace: catalogue + blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
          {/* Catalogue: all four tiers at once */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {tiers.map((tier, index) => (
              <TierColumn
                key={tier.id}
                tier={tier}
                index={index}
                groups={groupedByTier[tier.id]}
                selectedIds={selectedIds}
                onToggleService={handleToggleService}
                onToggleGroup={handleToggleGroup}
                onRowMouseEnter={openForService}
                onRowMouseLeave={closeHover}
                onRowFocus={openForService}
                onRowBlur={closeHover}
                onRowInfoClick={handleRowInfoClick}
                activeHoverServiceId={activeService?.id || null}
              />
            ))}
          </div>

          {/* Blueprint: sticky sidebar on desktop, below the catalogue on smaller screens */}
          <div id="solution-blueprint" className="lg:sticky lg:top-24 scroll-mt-24">
            <SummaryPanel
              tiers={tiers}
              tierTotals={tierTotals}
              selectedServices={selectedServicesList}
              onRemoveService={handleRemoveService}
              onClearAll={handleClearAll}
              onSubmit={handleSubmitBlueprint}
            />
          </div>
        </div>

        {/* Hover Card */}
        <ServiceHoverCard
          service={activeService}
          isOpen={isHoverOpen}
          isSelected={activeService ? selectedIds.has(activeService.id) : false}
          floatingRef={refs.setFloating}
          floatingStyles={floatingStyles}
          placement={placement}
          middlewareData={middlewareData}
          arrowRef={arrowRef}
          getFloatingProps={getFloatingProps}
          onClose={closeHover}
          onToggleSelect={handleToggleService}
        />

        <BlueprintRequestModal
          isOpen={requestOpen}
          onClose={() => setRequestOpen(false)}
          selectedServices={selectedServicesList}
          tiers={tiers}
        />

        {/* Mobile / tablet sticky bottom bar */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 border-t lg:hidden backdrop-blur-md"
          style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)', boxShadow: '0 -6px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <button type="button" onClick={scrollToBlueprint} className="text-left cursor-pointer outline-none focus-visible:ring-2 rounded-md">
              <span className="text-[10px] font-mono uppercase font-bold block" style={{ color: 'var(--mut)' }}>
                Your Blueprint ↓
              </span>
              <span className="text-lg font-extrabold block" style={{ color: 'var(--acc)' }}>
                {count} service{count === 1 ? '' : 's'}
              </span>
            </button>

            <button
              type="button"
              disabled={count === 0}
              onClick={handleSubmitBlueprint}
              className={`py-2.5 px-5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-1.5 ${
                count === 0 ? 'opacity-40 cursor-not-allowed bg-gray-400 text-white' : 'text-white cursor-pointer'
              }`}
              style={{ backgroundColor: count === 0 ? undefined : 'var(--acc)' }}
            >
              <span>Send Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
