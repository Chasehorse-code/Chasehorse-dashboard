import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Layers } from 'lucide-react';
import { Service, TierMeta } from './types';

interface SummaryPanelProps {
  tiers: TierMeta[];
  /** Total services available per tier — drives the coverage bars. */
  tierTotals: Record<string, number>;
  selectedServices: Service[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  /** Opens the blueprint request form. */
  onSubmit: (selected: Service[]) => void;
}

const shortTierName = (t: TierMeta) => t.title.replace(/^Tier \d+\s*/, '');

/** "Your Solution Blueprint" — dark summary card; picked services grouped by tier and category (no prices). */
export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  tiers,
  tierTotals,
  selectedServices,
  onRemoveService,
  onClearAll,
  onSubmit,
}) => {
  const count = selectedServices.length;
  const isEmpty = count === 0;

  const grouped = useMemo(
    () =>
      tiers.map((tier) => {
        const inTier = selectedServices.filter((s) => s.tier === tier.id);
        const groups = new Map<string, Service[]>();
        inTier.forEach((s) => {
          if (!groups.has(s.group)) groups.set(s.group, []);
          groups.get(s.group)!.push(s);
        });
        return { tier, groups: Array.from(groups.entries()), n: inTier.length };
      }),
    [tiers, selectedServices]
  );

  return (
    <aside
      aria-label="Your Solution Blueprint"
      className="relative rounded-[24px] overflow-hidden flex flex-col lg:max-h-[calc(100vh-7rem)]"
      style={{
        background: 'var(--header-bg)',
        color: 'var(--header-sub)',
        boxShadow: '0 24px 60px -24px rgba(0,0,0,0.45)',
      }}
    >
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--acc) 45%, transparent), transparent)' }}
      />

      {/* Header */}
      <div className="relative px-5 pt-5 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.16em] opacity-60">
            <Layers className="w-3.5 h-3.5" />
            Your Solution Blueprint
          </h3>
          <div className="flex items-center gap-1">
          {!isEmpty && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] font-medium opacity-60 hover:opacity-100 transition-opacity cursor-pointer outline-none focus-visible:underline"
              title="Remove all services from your blueprint"
            >
              Clear all
            </button>
          )}
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2" aria-live="polite">
          <motion.span
            key={count}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-[44px] leading-none font-black tracking-tighter tabular-nums"
            style={{ color: isEmpty ? 'inherit' : 'var(--acc)' }}
            data-blueprint-count
          >
            {count}
          </motion.span>
          <span className="text-sm font-semibold opacity-80">service{count === 1 ? '' : 's'} selected</span>
        </div>

        {/* Coverage per tier */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {grouped.map(({ tier, n }) => (
            <div key={tier.id} title={`${tier.title}: ${n}/${tierTotals[tier.id] ?? 0}`}>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${tierTotals[tier.id] ? (n / tierTotals[tier.id]) * 100 : 0}%`, background: 'var(--acc)' }}
                />
              </div>
              <p className="mt-1.5 text-[9px] font-mono uppercase tracking-wider opacity-50 truncate">
                {tier.id} <span className="opacity-70">{n}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-5 mt-4 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Selected services */}
      <div className="relative flex-1 min-h-0 max-h-[420px] lg:max-h-none overflow-y-auto px-5 py-4 sb-dark-scroll">
        {isEmpty ? (
          <div className="py-8 text-center">
            <div
              className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              <Layers className="w-5 h-5 opacity-60" />
            </div>
            <p className="mt-3 text-[13px] font-semibold opacity-90">Your blueprint is empty</p>
            <p className="mt-1 text-[12px] opacity-50 max-w-[220px] mx-auto leading-relaxed">
              Tick services from any tier — they&apos;ll collect here as you build.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {grouped
              .filter((g) => g.groups.length > 0)
              .map(({ tier, groups, n }) => (
                <section key={tier.id} aria-label={tier.title}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[12px] font-bold tracking-tight">{shortTierName(tier)}</h4>
                    <span className="text-[10px] font-mono opacity-50 tabular-nums">{n}</span>
                  </div>
                  <div className="space-y-3">
                    {groups.map(([groupName, list]) => (
                      <div key={groupName}>
                        <p className="text-[10px] font-mono uppercase tracking-wider opacity-45 mb-1.5 truncate" title={groupName}>
                          {groupName}
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          <AnimatePresence initial={false}>
                            {list.map((service) => (
                              <motion.li
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                className="inline-flex items-center gap-1 max-w-full pl-2.5 pr-1 py-1 rounded-lg text-[12px] font-medium"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}
                              >
                                <span className="truncate" title={service.name}>
                                  {service.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onRemoveService(service.id)}
                                  aria-label={`Remove ${service.name}`}
                                  className="p-0.5 rounded-md opacity-50 hover:opacity-100 hover:bg-white/15 transition-all outline-none focus-visible:opacity-100 focus-visible:ring-1 shrink-0 cursor-pointer"
                                  title="Remove from blueprint"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}
      </div>

      {/* Send action */}
      <div className="relative px-5 pb-5 pt-4 shrink-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)' }}>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onSubmit(selectedServices)}
          className={`group/send w-full py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
            isEmpty ? 'cursor-not-allowed' : 'hover:brightness-110 active:scale-[0.99] cursor-pointer'
          }`}
          style={{
            background: isEmpty ? 'rgba(255,255,255,0.08)' : 'var(--acc)',
            color: isEmpty ? 'rgba(255,255,255,0.35)' : '#ffffff',
            boxShadow: isEmpty ? 'none' : '0 12px 28px -10px color-mix(in srgb, var(--acc) 80%, transparent)',
          }}
        >
          <span>Send My Blueprint</span>
          <ArrowRight className={`w-4 h-4 transition-transform ${isEmpty ? '' : 'group-hover/send:translate-x-0.5'}`} />
        </button>
        <p className="mt-2.5 text-center text-[11px] opacity-50">Our team will call you with a tailored plan.</p>
      </div>
    </aside>
  );
};
