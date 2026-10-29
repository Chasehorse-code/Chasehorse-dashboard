import React from 'react';
import { motion } from 'framer-motion';
import { TierId, TierMeta } from './types';

interface TierTabsProps {
  tiers: TierMeta[];
  activeTier: TierId;
  onSelectTier: (tierId: TierId) => void;
  selectedCounts: Record<TierId, number>;
}

export const TierTabs: React.FC<TierTabsProps> = ({
  tiers,
  activeTier,
  onSelectTier,
  selectedCounts,
}) => {
  return (
    <div 
      role="tablist" 
      aria-label="Service Tiers"
      className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 rounded-2xl border"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
      }}
    >
      {tiers.map((tier) => {
        const isActive = activeTier === tier.id;
        const count = selectedCounts[tier.id] || 0;

        return (
          <button
            key={tier.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tier-panel-${tier.id}`}
            id={`tier-tab-${tier.id}`}
            onClick={() => onSelectTier(tier.id)}
            className="relative p-3.5 sm:p-4 rounded-xl text-left transition-all outline-none focus-visible:ring-2 flex flex-col justify-between overflow-hidden"
            style={{
              color: isActive ? 'var(--ink)' : 'var(--mut)',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTierTabBackground"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'var(--soft)',
                  border: '1.5px solid var(--acc)',
                  boxShadow: 'var(--glow)',
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}

            <div className="relative z-10 flex items-center justify-between w-full mb-1.5">
              <span
                className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded"
                style={{
                  background: isActive ? 'var(--acc)' : 'var(--line)',
                  color: isActive ? '#ffffff' : 'var(--mut)',
                }}
              >
                {tier.id}
              </span>

              {count > 0 && (
                <span
                  className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--acc)',
                    color: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                  title={`${count} service${count > 1 ? 's' : ''} selected in this tier`}
                >
                  {count} selected
                </span>
              )}
            </div>

            <div className="relative z-10">
              <h3 
                className="text-xs sm:text-sm font-bold tracking-tight line-clamp-1"
                style={{ color: 'var(--ink)' }}
              >
                {tier.title}
              </h3>
              <p 
                className="text-[11px] font-mono line-clamp-1 mt-0.5"
                style={{ color: 'var(--mut)' }}
              >
                {tier.tagline}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

