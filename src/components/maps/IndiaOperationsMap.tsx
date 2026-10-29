import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  INDIA_SVG_VIEWBOX, 
  INDIA_MAP_OUTLINE_PATH, 
  INDIA_HUBS, 
  MapHubData 
} from '../../data/indiaPathData';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Building2, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IndiaOperationsMapProps {
  compact?: boolean;
}

interface CardPlacement {
  left: number;
  top: number;
  arrowX: number;
  arrowY: number;
  side: 'top' | 'bottom' | 'left' | 'right';
}

export const IndiaOperationsMap: React.FC<IndiaOperationsMapProps> = ({ compact = false }) => {
  const [activeHubId, setActiveHubId] = useState<string | null>(null);
  const [placement, setPlacement] = useState<CardPlacement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeHub = INDIA_HUBS.find((h) => h.id === activeHubId) || null;

  // Smart placement & collision detection
  const updatePosition = useCallback((hub: MapHubData) => {
    if (!containerRef.current || !svgRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();

    // Map SVG viewBox 0 0 600 660 coordinates to container pixel coordinates
    const pinPx = (svgRect.left - containerRect.left) + (hub.x / 600) * svgRect.width;
    const pinPy = (svgRect.top - containerRect.top) + (hub.y / 660) * svgRect.height - 10; // pin head elevation

    // Card dimensions (target estimate or measured)
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 285;
    const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 215;
    const offset = 14; // distance from pin tip
    const pad = 12; // boundary margin from container edges

    let side: 'top' | 'bottom' | 'left' | 'right' = 'top';
    let top = pinPy - cardHeight - offset;
    let left = pinPx - cardWidth / 2;

    // 1. Vertical flip check: if card overflows top of container, flip to bottom
    if (top < pad) {
      top = pinPy + offset;
      side = 'bottom';
      // If bottom also overflows (rare), check horizontal sides
      if (top + cardHeight > containerRect.height - pad) {
        if (pinPx + offset + cardWidth <= containerRect.width - pad) {
          side = 'right';
          left = pinPx + offset;
          top = pinPy - cardHeight / 2;
        } else {
          side = 'left';
          left = pinPx - offset - cardWidth;
          top = pinPy - cardHeight / 2;
        }
      }
    }

    // 2. Horizontal shift & clamp so card stays strictly within container edges
    if (side === 'top' || side === 'bottom') {
      if (left < pad) left = pad;
      if (left + cardWidth > containerRect.width - pad) {
        left = containerRect.width - cardWidth - pad;
      }
    } else {
      if (top < pad) top = pad;
      if (top + cardHeight > containerRect.height - pad) {
        top = containerRect.height - cardHeight - pad;
      }
    }

    // 3. Arrow pointer coordinate relative to card bounding box
    const arrowX = Math.max(16, Math.min(cardWidth - 16, pinPx - left));
    const arrowY = Math.max(16, Math.min(cardHeight - 16, pinPy - top));

    setPlacement({ left, top, arrowX, arrowY, side });
  }, []);

  // Update card position on active hub change or window resize
  useEffect(() => {
    if (activeHub) {
      updatePosition(activeHub);
    }
  }, [activeHub, updatePosition]);

  useEffect(() => {
    const handleResize = () => {
      if (activeHub) updatePosition(activeHub);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeHub, updatePosition]);

  // Outside click listener for touch devices
  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent | MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveHubId(null);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  // Delay hover handlers
  const handlePinEnter = (hub: MapHubData) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveHubId(hub.id);
  };

  const handlePinLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveHubId(null);
    }, 140);
  };

  const handleCardEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleCardLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveHubId(null);
    }, 140);
  };

  const handlePinClick = (hub: MapHubData) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveHubId((prev) => (prev === hub.id ? null : hub.id));
  };

  // Precomputed curved connection arcs between geographic hubs
  const corridors = [
    { from: 'new-delhi', to: 'mumbai', d: 'M 205.5,198.3 Q 140,290 119.0,387.1' },
    { from: 'new-delhi', to: 'kolkata', d: 'M 205.5,198.3 Q 310,230 406.3,318.8' },
    { from: 'mumbai', to: 'bengaluru', d: 'M 119.0,387.1 Q 145,465 204.0,513.5' },
    { from: 'bengaluru', to: 'chennai', d: 'M 204.0,513.5 L 256.2,512.3' },
    { from: 'hyderabad', to: 'bengaluru', d: 'M 223.1,425.1 L 204.0,513.5' },
    { from: 'hyderabad', to: 'mumbai', d: 'M 223.1,425.1 Q 165,410 119.0,387.1' },
    { from: 'hyderabad', to: 'kolkata', d: 'M 223.1,425.1 Q 320,360 406.3,318.8' },
    { from: 'chennai', to: 'kolkata', d: 'M 256.2,512.3 Q 350,420 406.3,318.8' }
  ];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-[#FAF8F5] rounded-3xl border border-[#E2DED5] p-4 sm:p-6 shadow-xl overflow-hidden select-none ${
        compact ? '' : 'lg:p-8'
      }`}
    >
      {/* Background Dotted Grid (Unchanged brand style) */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D5CEBE 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header Strip */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-[#E2DED5]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 border-2 border-[#FF4D16] rounded-sm bg-[#FF4D16]/20 inline-block" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
            Live Operations Across India
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#107C41] flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#107C41] animate-pulse" />
          <span>6 Active Metro Hubs</span>
        </span>
      </div>

      {/* SVG Container with Proper Proportions */}
      <div className="relative w-full aspect-[600/660] max-h-[520px] mx-auto flex items-center justify-center">
        
        <svg
          ref={svgRef}
          viewBox={INDIA_SVG_VIEWBOX}
          className="w-full h-full overflow-visible drop-shadow-sm"
        >
          <defs>
            {/* Arterial Freight Corridors Gradient */}
            <linearGradient id="corridorArcGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D16" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8C5338" stopOpacity="0.5" />
            </linearGradient>

            {/* Glowing neon aura filter for the moving shining beam */}
            <filter id="outlineShineGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense radiant outline shine beam gradient with bright white core */}
            <linearGradient id="outlineShineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D16" stopOpacity="0" />
              <stop offset="25%" stopColor="#FF4D16" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="75%" stopColor="#FFA64D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF4D16" stopOpacity="0" />
            </linearGradient>

            {/* Moving corridor beam gradient from point to point */}
            <linearGradient id="corridorFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D16" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="85%" stopColor="#FF4D16" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF4D16" stopOpacity="0.1" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="hubPinGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ================= 1. TRUE ACCURATE INDIA OUTLINE IN ORANGE WITH MOVING SHINE ================= */}
          {/* India land mass base fill */}
          <path
            d={INDIA_MAP_OUTLINE_PATH}
            fill="#FAF6EE"
            className="transition-colors"
          />

          {/* Base Orange Border - Soft warm glow */}
          <path
            d={INDIA_MAP_OUTLINE_PATH}
            fill="none"
            stroke="#FF4D16"
            strokeWidth="3.5"
            strokeOpacity="0.22"
            strokeLinejoin="round"
          />

          {/* Base Orange Border - Crisp solid outline */}
          <path
            d={INDIA_MAP_OUTLINE_PATH}
            fill="none"
            stroke="#FF4D16"
            strokeWidth="1.8"
            strokeOpacity="0.85"
            strokeLinejoin="round"
          />

          {/* Animated Glowing Light Beam 1 (Moving along the entire India outline) */}
          <path
            d={INDIA_MAP_OUTLINE_PATH}
            fill="none"
            pathLength="1000"
            stroke="#FF4D16"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="160 840"
            filter="url(#outlineShineGlow)"
            className="animate-map-outline-shine pointer-events-none"
          />
          {/* Core White-Orange Shining Laser Beam */}
          <path
            d={INDIA_MAP_OUTLINE_PATH}
            fill="none"
            pathLength="1000"
            stroke="url(#outlineShineGradient)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120 880"
            className="animate-map-outline-shine pointer-events-none"
          />

          {/* Secondary Shining Beam offset for continuous fluid motion */}
          <path
            d={INDIA_MAP_OUTLINE_PATH}
            fill="none"
            pathLength="1000"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60 940"
            className="animate-map-outline-shine pointer-events-none"
            style={{ animationDelay: '-4s' }}
          />

          {/* ================= CURVED CONNECTING ARCS BETWEEN HUBS (POINT TO POINT) ================= */}
          {corridors.map((c, idx) => (
            <g key={idx}>
              {/* Static corridor dashed line */}
              <path
                d={c.d}
                fill="none"
                stroke="#FF4D16"
                strokeWidth="1.4"
                strokeOpacity="0.25"
                strokeDasharray="4 3"
              />
              {/* Moving shining light pulse traveling from point to point */}
              <path
                d={c.d}
                fill="none"
                pathLength="100"
                stroke="url(#corridorFlowGradient)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="24 76"
                className="animate-map-corridor-flow pointer-events-none"
                style={{
                  animationDelay: `${idx * 0.35}s`
                }}
              />
            </g>
          ))}

          {/* ================= 2. 6 ACCURATELY PROJECTED CITY PINS ================= */}
          {INDIA_HUBS.map((hub) => {
            const isActive = activeHubId === hub.id;
            const isHQ = hub.isHQ;

            return (
              <g
                key={hub.id}
                tabIndex={0}
                role="button"
                aria-label={`${hub.name} Hub`}
                className="cursor-pointer outline-none group"
                onPointerEnter={() => handlePinEnter(hub)}
                onPointerLeave={handlePinLeave}
                onFocus={() => handlePinEnter(hub)}
                onBlur={handlePinLeave}
                onClick={() => handlePinClick(hub)}
              >
                {/* Outer Radar Pulse Ring on Hover / Active */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isActive ? 18 : isHQ ? 13 : 9}
                  fill={isActive ? '#FF4D16' : '#171717'}
                  fillOpacity={isActive ? 0.35 : 0.12}
                  className={isActive ? 'animate-ping' : ''}
                />

                {/* Vertical Pin Shaft */}
                <line
                  x1={hub.x}
                  y1={hub.y}
                  x2={hub.x}
                  y2={hub.y - 12}
                  stroke={isActive ? '#FF4D16' : '#171717'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />

                {/* Ground Contact Shadow */}
                <ellipse
                  cx={hub.x}
                  cy={hub.y}
                  rx="5"
                  ry="2.5"
                  fill="#171717"
                  fillOpacity="0.2"
                />

                {/* Elevated Pin Head */}
                <circle
                  cx={hub.x}
                  cy={hub.y - 12}
                  r={isActive ? 6.5 : isHQ ? 5.5 : 4.5}
                  fill={isActive ? '#FF4D16' : isHQ ? '#FF4D16' : '#FFFFFF'}
                  stroke={isActive ? '#FFFFFF' : '#171717'}
                  strokeWidth="1.8"
                  filter="url(#hubPinGlow)"
                  className="transition-all duration-200"
                />

                {/* Center Core Dot */}
                <circle
                  cx={hub.x}
                  cy={hub.y - 12}
                  r="1.8"
                  fill={isActive ? '#FFFFFF' : isHQ ? '#FFFFFF' : '#FF4D16'}
                />

                {/* Monospace City Label Pill */}
                <g transform={`translate(${hub.x + 7}, ${hub.y - 18})`}>
                  <rect
                    x="-2"
                    y="-3"
                    width={hub.name.length * 7.2 + (hub.isHQ ? 28 : 10)}
                    height="16"
                    rx="4"
                    fill={isActive ? '#171717' : '#FFFFFF'}
                    stroke={isActive ? '#FF4D16' : '#E2DED5'}
                    strokeWidth="1"
                    className="drop-shadow-sm transition-all"
                  />
                  <text
                    x="4"
                    y="8"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                    fill={isActive ? '#FFFFFF' : '#171717'}
                  >
                    {hub.name} {hub.isHQ ? '★HQ' : ''}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* ================= 3. ANCHORED POPUP HOVER CARD (SMART PLACEMENT) ================= */}
        <AnimatePresence>
          {activeHub && placement && (
            <motion.div
              ref={cardRef}
              key={activeHub.id}
              initial={{ 
                opacity: 0, 
                scale: 0.92,
                y: placement.side === 'top' ? -4 : placement.side === 'bottom' ? 4 : 0
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${placement.left}px`,
                top: `${placement.top}px`,
                width: '285px',
                zIndex: 60,
                transformOrigin: 
                  placement.side === 'top'
                    ? `${placement.arrowX}px 100%`
                    : placement.side === 'bottom'
                    ? `${placement.arrowX}px 0%`
                    : placement.side === 'left'
                    ? `100% ${placement.arrowY}px`
                    : `0% ${placement.arrowY}px`
              }}
              className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#171717] p-4 shadow-2xl space-y-2.5 pointer-events-auto"
              onPointerEnter={handleCardEnter}
              onPointerLeave={handleCardLeave}
            >
              {/* Triangular Pointer Arrow on Card Edge */}
              {placement.side === 'top' && (
                <div 
                  className="absolute -bottom-2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-[#171717] rotate-45 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${placement.arrowX}px` }}
                />
              )}
              {placement.side === 'bottom' && (
                <div 
                  className="absolute -top-2 w-3.5 h-3.5 bg-white border-l-2 border-t-2 border-[#171717] rotate-45 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${placement.arrowX}px` }}
                />
              )}
              {placement.side === 'left' && (
                <div 
                  className="absolute -right-2 w-3.5 h-3.5 bg-white border-r-2 border-t-2 border-[#171717] rotate-45 -translate-y-1/2 pointer-events-none"
                  style={{ top: `${placement.arrowY}px` }}
                />
              )}
              {placement.side === 'right' && (
                <div 
                  className="absolute -left-2 w-3.5 h-3.5 bg-white border-l-2 border-b-2 border-[#171717] rotate-45 -translate-y-1/2 pointer-events-none"
                  style={{ top: `${placement.arrowY}px` }}
                />
              )}

              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm font-extrabold text-[#171717]">
                      {activeHub.name}
                    </h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FAF8F5] text-[#625E58] border border-[#E2DED5]">
                      {activeHub.state}
                    </span>
                    {activeHub.isHQ && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#FF4D16] text-white">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-semibold text-[#FF4D16] mt-0.5 line-clamp-1">
                    {activeHub.role}
                  </p>
                </div>

                <div className="p-1 rounded-md bg-[#FFF0EB] text-[#FF4D16] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Verified Facility Address Block */}
              <div className="text-[10px] text-[#625E58] leading-tight font-mono bg-[#FAF8F5] p-2 rounded-lg border border-[#E2DED5]">
                <strong className="text-[#171717] block font-sans text-[9px] uppercase tracking-wider mb-0.5">
                  Verified Facility Address:
                </strong>
                {activeHub.address}
              </div>

              {/* Three Stats */}
              <div className="grid grid-cols-3 gap-1 py-1 text-center text-[10px] border-y border-[#E2DED5]">
                <div>
                  <span className="block font-bold text-[#171717]">
                    {activeHub.activeWorkers.toLocaleString('en-IN')}+
                  </span>
                  <span className="text-[9px] text-[#8C877D]">Field Leads</span>
                </div>
                <div className="border-x border-[#E2DED5]">
                  <span className="block font-bold text-[#171717]">
                    {activeHub.terminalBays} Bays
                  </span>
                  <span className="text-[9px] text-[#8C877D]">Terminal Docks</span>
                </div>
                <div>
                  <span className="block font-bold text-[#107C41]">
                    {activeHub.sla}
                  </span>
                  <span className="text-[9px] text-[#8C877D]">SLA Closure</span>
                </div>
              </div>

              {/* Orange Action Button: Linking to Google Maps with Encoded Address */}
              <div className="pt-0.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeHub.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#FF4D16] hover:bg-[#E53E0B] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-[#FF4D16]/20 group"
                  title={`Open ${activeHub.name} in Google Maps`}
                >
                  <Navigation className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                  <span>Open in Google Maps ↗</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] text-[#8C877D] font-mono border-t border-[#E2DED5]/80 mt-1">
        <span className="flex items-center space-x-1">
          <Compass className="w-3 h-3 text-[#FF4D16]" />
          <span>Hover pin to anchor card</span>
        </span>
        <span className="text-[#171717] font-bold">
          Click button to navigate in Google Maps
        </span>
      </div>

    </div>
  );
};
