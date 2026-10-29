import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Service } from './types';

interface SummaryPanelProps {
  selectedServices: Service[];
  total: number;
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  onPay: (selected: Service[], totalAmount: number) => void;
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const AnimatedTotalCounter: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const startValue = displayValue;
    const endValue = value;
    if (startValue === endValue) return;

    const duration = 300;
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startValue + (endValue - startValue) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [value, shouldReduceMotion]);

  return <span>{currencyFormatter.format(displayValue)}</span>;
};

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  selectedServices,
  total,
  onRemoveService,
  onClearAll,
  onPay,
}) => {
  const isPayDisabled = selectedServices.length === 0;

  return (
    <aside
      aria-label="Solution Summary and Checkout"
      className="sb-card rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4" style={{ color: 'var(--acc)' }} />
            <h3 className="text-base font-extrabold tracking-tight" style={{ color: 'var(--ink)' }}>
              Selected Services
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
              style={{
                background: selectedServices.length > 0 ? 'var(--soft)' : 'var(--line)',
                color: selectedServices.length > 0 ? 'var(--acc)' : 'var(--mut)',
              }}
            >
              {selectedServices.length}
            </span>

            {selectedServices.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] font-mono hover:underline flex items-center space-x-1 transition-colors cursor-pointer"
                style={{ color: 'var(--mut)' }}
                title="Clear all selected services"
              >
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Selected Services Scroll Area */}
        <div className="py-3 max-h-[360px] overflow-y-auto space-y-2 pr-1">
          <AnimatePresence initial={false}>
            {selectedServices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center space-y-2"
              >
                <div
                  className="w-10 h-10 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: 'var(--soft)' }}
                >
                  <ShoppingCart className="w-5 h-5" style={{ color: 'var(--acc)' }} />
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--mut)' }}>
                  No services selected yet.
                </p>
                <p className="text-[11px] font-mono" style={{ color: 'var(--mut)' }}>
                  Browse tiers and select modules to build your custom deployment.
                </p>
              </motion.div>
            ) : (
              selectedServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="p-2.5 rounded-xl border flex items-center justify-between group transition-colors"
                  style={{
                    background: 'var(--soft)',
                    borderColor: 'var(--line)',
                  }}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span
                        className="text-[9px] font-mono font-bold px-1 rounded uppercase tracking-wider"
                        style={{
                          background: 'var(--card)',
                          color: 'var(--acc)',
                          border: '1px solid var(--line)',
                        }}
                      >
                        {service.tier}
                      </span>
                      <span className="text-[10px] font-mono truncate" style={{ color: 'var(--mut)' }}>
                        {service.group}
                      </span>
                    </div>

                    <h5
                      className="text-xs font-semibold tracking-tight truncate"
                      style={{ color: 'var(--ink)' }}
                      title={service.name}
                    >
                      {service.name}
                    </h5>

                    <span
                      className="text-xs font-mono font-extrabold tracking-tight"
                      style={{ color: 'var(--acc)' }}
                    >
                      {currencyFormatter.format(service.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveService(service.id)}
                    aria-label={`Remove ${service.name}`}
                    className="p-1.5 rounded-lg transition-colors hover:bg-black/10 active:bg-black/15 focus-visible:ring-2 outline-none shrink-0 cursor-pointer"
                    style={{ color: 'var(--mut)' }}
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Summary & Pay Now Action */}
      <div className="pt-4 border-t space-y-4" style={{ borderColor: 'var(--line)' }}>
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex justify-between" style={{ color: 'var(--mut)' }}>
            <span>Selected Modules</span>
            <span>{selectedServices.length} items</span>
          </div>
          <div className="flex justify-between" style={{ color: 'var(--mut)' }}>
            <span>Deployment Setup</span>
            <span>Included</span>
          </div>
        </div>

        {/* Total Price with Counter */}
        <div
          className="p-4 rounded-xl flex items-center justify-between border"
          style={{
            background: 'var(--soft)',
            borderColor: 'var(--line)',
          }}
        >
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider block" style={{ color: 'var(--mut)' }}>
              TOTAL ESTIMATE
            </span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold tracking-tight" style={{ color: 'var(--ink)' }}>
              <AnimatedTotalCounter value={total} />
            </span>
          </div>

          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded border"
            style={{
              borderColor: 'var(--line)',
              background: 'var(--card)',
              color: 'var(--mut)',
            }}
          >
            INR Net
          </span>
        </div>

        {/* Pay Now Button */}
        <button
          type="button"
          disabled={isPayDisabled}
          onClick={() => onPay(selectedServices, total)}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 outline-none focus-visible:ring-2 ${
            isPayDisabled
              ? 'opacity-40 cursor-not-allowed bg-gray-400 text-white'
              : 'hover:brightness-110 active:scale-[0.99] text-white shadow-lg cursor-pointer'
          }`}
          style={{
            backgroundColor: isPayDisabled ? undefined : 'var(--acc)',
            boxShadow: isPayDisabled ? 'none' : 'var(--glow)',
          }}
        >
          <span>Pay Now & Deploy</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center space-x-1.5 text-[11px] font-mono" style={{ color: 'var(--mut)' }}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>GST compliant enterprise quotation</span>
        </div>
      </div>
    </aside>
  );
};

