import React from 'react';

interface ChaseHorseLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'dark' | 'light' | 'ivory';
  animated?: boolean;
}

export const ChaseHorseLogo: React.FC<ChaseHorseLogoProps> = ({
  className = 'h-10 w-auto',
  showTagline = true,
  variant = 'dark',
  animated = false,
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? '#FFFFFF' : '#171717';
  const orangeAccent = '#FF4D16';

  return (
    <div className={`inline-flex flex-col group select-none ${className}`}>
      <svg
        viewBox="0 0 640 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {/* C */}
        <path
          d="M 50,15 L 10,15 L 10,85 L 50,85 L 50,70 L 26,70 L 26,30 L 50,30 Z"
          fill={textColor}
        />

        {/* H */}
        <path
          d="M 65,15 L 81,15 L 81,42 L 105,42 L 105,15 L 121,15 L 121,85 L 105,85 L 105,58 L 81,58 L 81,85 L 65,85 Z"
          fill={textColor}
        />

        {/* A with orange notch/core */}
        <g id="letter-a">
          <path
            d="M 136,85 L 158,15 L 174,15 L 196,85 L 179,85 L 174,68 L 158,68 L 153,85 Z M 161,54 L 171,54 L 166,35 Z"
            fill={textColor}
          />
          {/* Triangular inner core (#a-core) in signal orange */}
          <polygon
            id="a-core"
            points="166,38 161,51 171,51"
            fill={orangeAccent}
            className="transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_8px_#FF4D16]"
          />
        </g>

        {/* S */}
        <path
          d="M 210,85 L 250,85 L 250,50 L 226,50 L 226,30 L 250,30 L 250,15 L 210,15 L 210,50 L 234,50 L 234,70 L 210,70 Z"
          fill={textColor}
        />

        {/* E */}
        <path
          d="M 265,15 L 305,15 L 305,30 L 281,30 L 281,43 L 301,43 L 301,57 L 281,57 L 281,70 L 305,70 L 305,85 L 265,85 Z"
          fill={textColor}
        />

        {/* H */}
        <path
          d="M 320,15 L 336,15 L 336,42 L 360,42 L 360,15 L 376,15 L 376,85 L 360,85 L 360,58 L 336,58 L 336,85 L 320,85 Z"
          fill={textColor}
        />

        {/* O with orange concentric square core (#o-core) */}
        <g id="letter-o">
          {/* Outer rectangular block with hollow square center */}
          <path
            d="M 391,15 L 447,15 L 447,85 L 391,85 Z M 407,31 L 431,31 L 431,69 L 407,69 Z"
            fill={textColor}
          />
          {/* Solid square center (#o-core) in signal orange */}
          <rect
            id="o-core"
            x="414"
            y="43"
            width="10"
            height="14"
            fill={orangeAccent}
            className="transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_10px_#FF4D16]"
          />
        </g>

        {/* R */}
        <path
          d="M 462,15 L 496,15 C 504,15 508,19 508,27 L 508,43 C 508,49 504,53 496,53 L 478,53 L 478,85 L 462,85 Z M 478,40 L 492,40 L 492,28 L 478,28 Z"
          fill={textColor}
        />
        <path d="M 488,52 L 508,85 L 492,85 L 474,53 Z" fill={textColor} />

        {/* S */}
        <path
          d="M 523,85 L 563,85 L 563,50 L 539,50 L 539,30 L 563,30 L 563,15 L 523,15 L 523,50 L 547,50 L 547,70 L 523,70 Z"
          fill={textColor}
        />

        {/* E */}
        <path
          d="M 578,15 L 618,15 L 618,30 L 594,30 L 594,43 L 614,43 L 614,57 L 594,57 L 594,70 L 618,70 L 618,85 L 578,85 Z"
          fill={textColor}
        />

        {/* Tagline: Growth Enabling Logiworkx Partner */}
        {showTagline && (
          <text
            id="tagline"
            x="314"
            y="112"
            textAnchor="middle"
            fill={textColor}
            fontSize="18"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="500"
            letterSpacing="6"
            className="select-none tracking-[0.3em]"
          >
            Growth Enabling Logiworkx Partner
          </text>
        )}
      </svg>
    </div>
  );
};

