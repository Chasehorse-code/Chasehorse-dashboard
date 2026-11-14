import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ClipboardList } from 'lucide-react';
import { Service, TierMeta } from './types';

interface SummaryPanelProps {
  tiers: TierMeta[];
  selectedServices: Service[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  /** Opens the blueprint request form. */
  onSubmit: (selected: Service[]) => void;
}

/** "Your Solution Blueprint" — picked services grouped by tier and category (no prices). */
export const SummaryPanel: React.FC<SummaryPanelProps> = ({ tiers, selectedServices, onRemoveService, onClearAll, onSubmit }) => {
  const isEmpty = selectedServices.length === 0;

  const grouped = useMemo(
    () =>
      tiers
        .map((tier) => {
          const groups = new Map<string, Service[]>();
          selectedServices
            .filter((s) => s.tier === tier.id)
            .forEach((s) => {
              if (!groups.has(s.group)) groups.set(s.group, []);
              groups.get(s.group)!.push(s);
            });
          return { tier, groups: Array.from(groups.entries()) };
        })
        .filter((t) => t.groups.length > 0),
    [tiers, selectedServices]
  );

  return (
    <aside
      aria-label="Your Solution Blueprint"
      className="sb-card rounded-2xl p-5 flex flex-col lg:max-h-[calc(100vh-7rem)]"
      style={{ background: 'var(--card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-card)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b shrink-0" style={{ borderColor: 'var(--line)' }}>
        <div className="flex items-center gap-2 min-w-0">
          <ClipboardList className="w-4 h-4 shrink-0" style={{ color: 'var(--acc)' }} />
          <h3 className="text-[15px] font-extrabold tracking-tight leading-tight" style={{ color: 'var(--ink)' }}>
            Your Solution Blueprint
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
            style={{
              background: !isEmpty ? 'var(--acc)' : 'var(--line)',
              color: !isEmpty ? '#ffffff' : 'var(--mut)',
            }}
            aria-live="polite"
            aria-label={`${selectedServices.length} services selected`}
          >
            {selectedServices.length}
          </span>

          {!isEmpty && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] font-mono hover:underline cursor-pointer"
              style={{ color: 'var(--mut)' }}
              title="Remove all services from your blueprint"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Selected services, grouped tier → category */}
      <div className="py-3 flex-1 min-h-0 max-h-[420px] lg:max-h-none overflow-y-auto pr-1 -mr-1">
        {isEmpty ? (
          <div className="py-10 text-center space-y-2">
            <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center" style={{ background: 'var(--soft)' }}>
              <ClipboardList className="w-5 h-5" style={{ color: 'var(--acc)' }} />
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--mut)' }}>
              Your blueprint is empty.
            </p>
            <p className="text-[11px] font-mono" style={{ color: 'var(--mut)' }}>
              Tick the services you need — they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {grouped.map(({ tier, groups }) => (
              <section key={tier.id} aria-label={tier.title}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
                    {tier.title}
                  </h4>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--mut)' }}>
                    {groups.reduce((n, [, l]) => n + l.length, 0)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {groups.map(([groupName, list]) => (
                    <div key={groupName} className="rounded-xl p-2.5" style={{ background: 'var(--soft)' }}>
                      <p className="text-[10px] font-mono font-semibold mb-1 truncate" style={{ color: 'var(--mut)' }} title={groupName}>
                        {groupName}
                      </p>
                      <ul>
                        <AnimatePresence initial={false}>
                          {list.map((service) => (
                            <motion.li
                              key={service.id}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center justify-between gap-2 py-0.5"
                            >
                              <span className="text-xs font-semibold tracking-tight truncate" style={{ color: 'var(--ink)' }} title={service.name}>
                                {service.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => onRemoveService(service.id)}
                                aria-label={`Remove ${service.name}`}
                                className="p-1 rounded-md transition-colors hover:bg-black/10 focus-visible:ring-2 outline-none shrink-0 cursor-pointer"
                                style={{ color: 'var(--mut)' }}
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
      <div className="pt-4 border-t space-y-3 shrink-0" style={{ borderColor: 'var(--line)' }}>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onSubmit(selectedServices)}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 ${
            isEmpty ? 'opacity-40 cursor-not-allowed bg-gray-400 text-white' : 'hover:brightness-110 active:scale-[0.99] text-white shadow-lg cursor-pointer'
          }`}
          style={{ backgroundColor: isEmpty ? undefined : 'var(--acc)', boxShadow: isEmpty ? 'none' : 'var(--glow)' }}
        >
          <span>Send My Blueprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-[11px] font-mono" style={{ color: 'var(--mut)' }}>
          Our team will call you with a tailored plan.
        </p>
      </div>
    </aside>
  );
};
