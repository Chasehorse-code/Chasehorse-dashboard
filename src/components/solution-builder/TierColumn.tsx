import React from 'react';
import { Service, TierMeta } from './types';
import { GroupCard } from './GroupCard';

interface TierColumnProps {
  tier: TierMeta;
  index: number;
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

/** One tier of the catalogue: numbered tier heading followed by its category cards. */
export const TierColumn: React.FC<TierColumnProps> = ({ tier, index, groups, selectedIds, ...cardProps }) => {
  const total = groups.reduce((n, [, list]) => n + list.length, 0);
  const selected = groups.reduce((n, [, list]) => n + list.filter((s) => selectedIds.has(s.id)).length, 0);
  const headingId = `tier-heading-${tier.id}`;
  // "Tier 1 Core Business" → "Core Business"; CX Centre keeps its name.
  const shortTitle = tier.title.replace(/^Tier \d+\s*/, '');
  const kicker = tier.id === 'CX' ? 'Centre of Excellence' : `Tier ${index + 1}`;

  const pct = total ? (selected / total) * 100 : 0;

  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 h-full rounded-[22px] flex flex-col overflow-hidden transition-shadow duration-300"
      style={{
        background: 'var(--card)',
        border: `1px solid ${selected > 0 ? 'color-mix(in srgb, var(--acc) 30%, var(--line))' : 'var(--line)'}`,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Tier header */}
      <header className="px-4 pt-4 pb-3.5 border-b" style={{ borderColor: 'var(--line)' }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: 'var(--mut)' }}>
              {kicker}
            </p>
            <h2 id={headingId} className="mt-0.5 text-[18px] font-extrabold tracking-tight leading-tight" style={{ color: 'var(--ink)' }}>
              {shortTitle}
            </h2>
            <p className="mt-0.5 text-[11.5px] truncate" style={{ color: 'var(--mut)' }} title={tier.tagline}>
              {tier.tagline}
            </p>
          </div>
          <span
            className="text-[36px] leading-[0.8] font-black tracking-tighter tabular-nums transition-colors shrink-0"
            style={{ color: selected > 0 ? 'var(--acc)' : 'color-mix(in srgb, var(--ink) 12%, transparent)' }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
            <div className="h-full rounded-full transition-[width] duration-300 ease-out" style={{ width: `${pct}%`, background: 'var(--acc)' }} />
          </div>
          <span
            className="text-[11px] font-mono font-semibold tabular-nums"
            style={{ color: selected > 0 ? 'var(--acc)' : 'var(--mut)' }}
            aria-label={`${selected} of ${total} services selected in ${tier.title}`}
          >
            {selected}/{total}
          </span>
        </div>
      </header>

      {/* Categories */}
      <div className="flex-1 px-2 py-2 divide-y">
        {groups.map(([groupName, groupServices]) => (
          <GroupCard key={`${tier.id}-${groupName}`} groupName={groupName} services={groupServices} selectedIds={selectedIds} {...cardProps} />
        ))}
      </div>
    </section>
  );
};
