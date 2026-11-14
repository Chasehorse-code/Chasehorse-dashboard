import React, { useRef, useEffect } from 'react';
import { Service } from './types';
import { ServiceRow } from './ServiceRow';
import { CheckboxVisual } from './Checkbox';

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
    if (headerCheckboxRef.current) headerCheckboxRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  return (
    <div role="group" aria-label={groupName} className="py-3 first:pt-1" style={{ borderColor: 'var(--line)' }}>
      {/* Category header */}
      <div className="flex items-center justify-between gap-2 px-2 mb-1">
        <label className="flex items-center gap-2 cursor-pointer min-w-0 flex-1 select-none">
          <input
            type="checkbox"
            ref={headerCheckboxRef}
            checked={isAllSelected}
            onChange={() => onToggleGroup(services, !isAllSelected)}
            className="peer sr-only"
            aria-label={`Select all services in ${groupName}`}
          />
          <CheckboxVisual checked={isAllSelected} indeterminate={isIndeterminate} />
          <h3 className="text-[13px] font-bold tracking-tight leading-snug" style={{ color: 'var(--ink)' }}>
            {groupName}
          </h3>
        </label>
        <span
          className="text-[10.5px] font-mono font-semibold tabular-nums shrink-0"
          style={{ color: selectedCount > 0 ? 'var(--acc)' : 'var(--mut)' }}
        >
          {selectedCount}/{totalCount}
        </span>
      </div>

      {/* Service rows (indented under the category) */}
      <div className="pl-4">
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
