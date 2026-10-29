import React, { useRef, useEffect } from 'react';
import { Check, Minus } from 'lucide-react';
import { Service } from './types';
import { ServiceRow } from './ServiceRow';

interface GroupCardProps {
  groupName: string;
  services: Service[];
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

export const GroupCard: React.FC<GroupCardProps> = ({
  groupName,
  services,
  selectedIds,
  onToggleService,
  onToggleGroup,
  onRowMouseEnter,
  onRowMouseLeave,
  onRowFocus,
  onRowBlur,
  onRowInfoClick,
  activeHoverServiceId,
}) => {
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const selectedCount = services.filter((s) => selectedIds.has(s.id)).length;
  const totalCount = services.length;
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleHeaderCheckboxChange = () => {
    onToggleGroup(services, !isAllSelected);
  };

  return (
    <div
      className="sb-card rounded-2xl border overflow-hidden transition-all duration-200 flex flex-col justify-between"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Group Header */}
      <div
        className="px-4 sm:px-5 py-3.5 border-b flex items-center justify-between select-none"
        style={{
          background: 'var(--header-bg)',
          color: 'var(--header-sub)',
          borderColor: 'var(--line)',
        }}
      >
        <label className="flex items-center space-x-2.5 cursor-pointer min-w-0 flex-1 pr-2">
          <div className="relative flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              ref={headerCheckboxRef}
              checked={isAllSelected}
              onChange={handleHeaderCheckboxChange}
              className="peer sr-only"
              aria-label={`Select all services in ${groupName}`}
            />
            <div
              className="w-4 h-4 rounded border transition-all flex items-center justify-center peer-focus-visible:ring-2"
              style={{
                borderColor: isAllSelected || isIndeterminate ? 'var(--acc)' : 'rgba(255,255,255,0.4)',
                backgroundColor: isAllSelected || isIndeterminate ? 'var(--acc)' : 'rgba(0,0,0,0.3)',
                boxShadow: isAllSelected ? 'var(--glow)' : 'none',
              }}
            >
              {isAllSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
              {isIndeterminate && <Minus className="w-3 h-3 text-white stroke-[3]" />}
            </div>
          </div>

          <h4 className="text-xs sm:text-sm font-bold tracking-wide truncate">
            {groupName}
          </h4>
        </label>

        {/* Counter Badge */}
        <span
          className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shrink-0 uppercase"
          style={{
            background: selectedCount > 0 ? 'var(--acc)' : 'rgba(255,255,255,0.15)',
            color: '#ffffff',
          }}
        >
          {selectedCount}/{totalCount}
        </span>
      </div>

      {/* Service Rows */}
      <div className="divide-y" style={{ borderColor: 'var(--line)' }}>
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            isSelected={selectedIds.has(service.id)}
            onToggle={onToggleService}
            onMouseEnter={onRowMouseEnter}
            onMouseLeave={onRowMouseLeave}
            onFocus={onRowFocus}
            onBlur={onRowBlur}
            onInfoClick={onRowInfoClick}
            isHoveredOrActive={activeHoverServiceId === service.id}
          />
        ))}
      </div>
    </div>
  );
};

