import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        setProgress(Math.round(obj.val));
      },
      onComplete() {
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 800);
        }, 300);
      },
    });
    return () => { tween.kill(); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="loading-screen"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2">
              <rect x="14" y="24" width="4" height="16" fill="#8A9E8C"/>
              <rect x="22" y="16" width="4" height="24" fill="#4E6652"/>
              <rect x="30" y="20" width="4" height="20" fill="#8A9E8C"/>
              <line x1="10" y1="40" x2="38" y2="40" stroke="#D4CEC6" strokeWidth="1"/>
              <polyline points="10,26 24,12 38,22" fill="none" stroke="#8A9E8C" strokeWidth="1.5"/>
            </svg>
            <span className="font-cinzel text-xs tracking-[0.35em] text-charcoal uppercase">
              Dhanlaxmi Associates
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.25em] text-stone uppercase">
              Est. 2008 · Pune
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="loading-progress-track">
              <div
                className="loading-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[0.625rem] tracking-[0.25em] text-stone-light">
              {String(progress).padStart(3, '0')}
            </span>
          </motion.div>

          <motion.p
            className="font-display text-base italic text-stone font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Crafting Homes, Building Trust
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
