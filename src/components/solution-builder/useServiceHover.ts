import { useState, useRef, useCallback } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
} from '@floating-ui/react';
import { Service } from './types';

export function useServiceHover() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, context, placement, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: (nextOpen) => {
      setIsOpen(nextOpen);
      if (!nextOpen) {
        setActiveService(null);
      }
    },
    placement: 'right' as Placement,
    middleware: [
      offset(12),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 8,
      }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    delay: { open: 100, close: 100 },
    handleClose: null,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context, {
    escapeKey: true,
    outsidePress: true,
  });
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const openForService = useCallback(
    (service: Service, element: HTMLElement) => {
      refs.setReference(element);
      setActiveService(service);
      setIsOpen(true);
    },
    [refs]
  );

  const closeHover = useCallback(() => {
    setIsOpen(false);
    setActiveService(null);
    refs.setReference(null);
  }, [refs]);

  return {
    activeService,
    isOpen,
    openForService,
    closeHover,
    refs,
    floatingStyles,
    context,
    placement,
    middlewareData,
    arrowRef,
    getReferenceProps,
    getFloatingProps,
  };
}

