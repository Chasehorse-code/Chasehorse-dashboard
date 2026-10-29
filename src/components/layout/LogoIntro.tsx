import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChaseHorseLogo } from '../ui/ChaseHorseLogo';

export const LogoIntro: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Check if user already saw intro in this session or prefers reduced motion
    const hasSeen = sessionStorage.getItem('chasehorse_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasSeen && !prefersReducedMotion) {
      setShowIntro(true);

      // Sequence timeline
      // 0.0s: Stage 0 (Center Orange Dot appears and pulses)
      // 0.4s: Stage 1 (Dot travels, letters slide in)
      const t1 = setTimeout(() => setStage(1), 400);

      // 1.2s: Stage 2 (O-core & A-core fill orange, ripple waves out)
      const t2 = setTimeout(() => setStage(2), 1200);

      // 1.8s: Stage 3 (Tagline slides up letter-spaced)
      const t3 = setTimeout(() => setStage(3), 1800);

      // 2.4s: Stage 4 (Thin orange line sweeps under logo)
      const t4 = setTimeout(() => setStage(4), 2400);

      // 3.0s: Finish intro and dissolve into homepage
      const t5 = setTimeout(() => handleDismiss(), 3100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, []);

  const handleDismiss = () => {
    setShowIntro(false);
    sessionStorage.setItem('chasehorse_intro_seen', 'true');
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="logo-intro"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.98,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4F1EA] text-[#171717] px-4 overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,22,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Initial 0.0s - 0.4s Central Pulsing Orange Dot */}
          {stage === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 0.85, 1], opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-4 h-4 rounded-full bg-[#FF4D16] shadow-[0_0_20px_#FF4D16]"
            />
          )}

          {/* Logo Reveal Sequence (0.4s onwards) */}
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center max-w-xl w-full"
            >
              {/* O-core ripple wave when stage >= 2 */}
              {stage >= 2 && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute top-10 left-[65%] -translate-x-1/2 w-16 h-16 rounded-full border-2 border-[#FF4D16] pointer-events-none"
                />
              )}

              {/* Vector Logo Component */}
              <div className="p-4 sm:p-6 w-full">
                <ChaseHorseLogo
                  variant="dark"
                  showTagline={stage >= 3}
                  className="w-full max-w-md mx-auto"
                />
              </div>

              {/* 2.4s Sweeping Orange Line under Logo */}
              <div className="relative w-48 sm:w-64 h-[2px] bg-[#E2DED5] overflow-hidden rounded-full mt-2">
                {stage >= 4 && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="w-full h-full bg-[#FF4D16]"
                  />
                )}
              </div>

              {/* Sub-label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 3 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#625E58] mt-4"
              >
                India&apos;s Field Operations Platform
              </motion.span>
            </motion.div>
          )}

          {/* Skip Button */}
          <button
            onClick={handleDismiss}
            className="absolute bottom-8 right-8 text-xs font-mono text-[#625E58] hover:text-[#FF4D16] transition-colors uppercase tracking-widest px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#E2DED5] rounded-full shadow-sm hover:border-[#FF4D16]"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
