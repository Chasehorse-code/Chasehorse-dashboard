import React from 'react';
import { Service, TierMeta } from './types';
import { GroupCard } from './GroupCard';

interface TierColumnProps {
  tier: TierMeta;
  groups: [string, Service[]][];
  selectedIds: Set<string>;
  onToggleService: (serviceId: string) => void;
  onToggleGroup: (groupServices: Service[], shouldSelectAll: boolean) => void;
  onRowMouseEnter: (service: Service, el: HTMLElement) => void;
  onRowMouseLeave: () => void;
  onRowFocus: (service: Service, el: HTMLElement) => void;
  onRowBlur: () => void;
  onRowInfoClick: (service: Service, el: HTMLElement, e: React.MouseEvent) => void;
  activeHoverServiceId: string | null;
}

/** One tier of the catalogue: tier heading followed by its category cards. */
export const TierColumn: React.FC<TierColumnProps> = ({ tier, groups, selectedIds, ...cardProps }) => {
  const total = groups.reduce((n, [, list]) => n + list.length, 0);
  const selected = groups.reduce((n, [, list]) => n + list.filter((s) => selectedIds.has(s.id)).length, 0);
  const headingId = `tier-heading-${tier.id}`;

  return (
    <section aria-labelledby={headingId} className="min-w-0 flex flex-col gap-4">
      <header className="pb-3 border-b-2" style={{ borderColor: 'var(--ink)' }}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase truncate min-w-0" style={{ color: 'var(--acc)' }} title={tier.tagline}>
            {tier.tagline}
          </span>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{
              background: selected > 0 ? 'var(--acc)' : 'var(--line)',
              color: selected > 0 ? '#ffffff' : 'var(--mut)',
            }}
            aria-label={`${selected} of ${total} services selected in ${tier.title}`}
          >
            {selected}/{total}
          </span>
        </div>
        <h2 id={headingId} className="mt-1.5 text-lg font-extrabold tracking-tight leading-snug truncate" style={{ color: 'var(--ink)' }}>
          {tier.title}
        </h2>
      </header>

      {groups.map(([groupName, groupServices]) => (
        <GroupCard
          key={`${tier.id}-${groupName}`}
          groupName={groupName}
          services={groupServices}
          selectedIds={selectedIds}
          {...cardProps}
        />
      ))}
    </section>
  );
};
