import React from 'react';
import { Check, Minus } from 'lucide-react';

interface CheckboxVisualProps {
  checked: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md';
}

/** Visual checkbox box. Pair it with a real (sr-only) <input type="checkbox" className="peer"> placed before it. */
export const CheckboxVisual: React.FC<CheckboxVisualProps> = ({ checked, indeterminate = false, size = 'sm' }) => {
  const on = checked || indeterminate;
  const box = size === 'md' ? 'w-[18px] h-[18px] rounded-[6px]' : 'w-4 h-4 rounded-[5px]';
  return (
    <span
      aria-hidden="true"
      className={`${box} shrink-0 flex items-center justify-center transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1`}
      style={{
        background: on ? 'var(--acc)' : 'var(--card)',
        border: `1.5px solid ${on ? 'var(--acc)' : 'color-mix(in srgb, var(--ink) 22%, transparent)'}`,
        transform: on ? 'scale(1)' : 'scale(0.96)',
      }}
    >
      {checked && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
      {!checked && indeterminate && <Minus className="w-3 h-3 text-white" strokeWidth={3.5} />}
    </span>
  );
};
