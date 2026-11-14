import React, { forwardRef } from 'react';
import { Info } from 'lucide-react';
import { Service } from './types';
import { CheckboxVisual } from './Checkbox';

interface ServiceRowProps {
  service: Service;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  onMouseEnter: (service: Service, el: HTMLElement) => void;
  onMouseLeave: () => void;
  onFocus: (service: Service, el: HTMLElement) => void;
  onBlur: () => void;
  onInfoClick: (service: Service, el: HTMLElement, e: React.MouseEvent) => void;
  isHoveredOrActive: boolean;
}

export const ServiceRow = React.memo(
  forwardRef<HTMLLabelElement, ServiceRowProps>(function ServiceRow(
    { service, isSelected, onToggle, onMouseEnter, onMouseLeave, onFocus, onBlur, onInfoClick, isHoveredOrActive },
    ref
  ) {
    return (
      <label
        ref={ref}
        htmlFor={`service-checkbox-${service.id}`}
        aria-describedby={`service-hover-card-${service.id}`}
        onMouseEnter={(e) => onMouseEnter(service, e.currentTarget)}
        onMouseLeave={onMouseLeave}
        onFocus={(e) => onFocus(service, e.currentTarget)}
        onBlur={onBlur}
        className="group relative flex items-center gap-2.5 px-2 py-[5px] rounded-lg cursor-pointer select-none transition-colors duration-150"
        style={{
          background: isSelected
            ? 'var(--soft)'
            : isHoveredOrActive
            ? 'color-mix(in srgb, var(--ink) 4%, transparent)'
            : 'transparent',
        }}
      >
        <input
          type="checkbox"
          id={`service-checkbox-${service.id}`}
          checked={isSelected}
          onChange={() => onToggle(service.id)}
          className="peer sr-only"
        />
        <CheckboxVisual checked={isSelected} />

        <span
          className="flex-1 min-w-0 text-[12.5px] leading-snug tracking-tight transition-colors"
          style={{ color: 'var(--ink)', fontWeight: isSelected ? 600 : 450 }}
        >
          {service.name}
        </span>

        {/* Details — revealed on hover/focus with a mouse, always visible on touch */}
        <button
          type="button"
          aria-label={`View details for ${service.name}`}
          onClick={(e) => {
            const labelEl = e.currentTarget.closest('label');
            if (labelEl) onInfoClick(service, labelEl, e);
          }}
          className="shrink-0 p-1 -mr-0.5 rounded-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-60 transition-opacity outline-none focus-visible:ring-2"
          style={{ color: 'var(--mut)' }}
          title="Service details"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </label>
    );
  })
);
