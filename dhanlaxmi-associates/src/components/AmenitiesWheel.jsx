import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const iconForAmenity = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('cctv') || lower.includes('security')) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
  );
  if (lower.includes('lift') || lower.includes('elevator')) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="5" y="2" width="14" height="20" rx="2"/><polyline points="8,10 12,6 16,10"/><polyline points="8,14 12,18 16,14"/></svg>
  );
  if (lower.includes('solar') || lower.includes('power')) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
  );
  if (lower.includes('rain') || lower.includes('water')) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L7 12h10L12 2z"/><circle cx="12" cy="17" r="5"/></svg>
  );
  if (lower.includes('fire')) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2s5 4 5 9a5 5 0 01-10 0c0-2 1-4 2-6 1 3 3 4 3 4V2z"/></svg>
  );
  if (lower.includes('lobby') || lower.includes('entrance')) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
  );
};

export function AmenitiesWheel({ amenities }) {
  const [active, setActive] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const radius = 175;
  const total  = amenities.length;

  return (
    <div ref={ref}>
      {/* Desktop wheel */}
      <div className="hidden md:flex items-center justify-center relative" style={{ height: '500px' }}>
        {/* Center */}
        <div className="absolute w-24 h-24 rounded-full border border-mist flex flex-col items-center justify-center text-center bg-ivory z-10">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <rect x="14" y="24" width="4" height="16" fill="#8A9E8C"/>
            <rect x="22" y="16" width="4" height="24" fill="#4E6652"/>
            <rect x="30" y="20" width="4" height="20" fill="#8A9E8C"/>
            <polyline points="10,26 24,12 38,22" fill="none" stroke="#8A9E8C" strokeWidth="1.5"/>
          </svg>
          <span className="font-mono text-[0.45rem] tracking-[0.15em] uppercase text-stone mt-1">Amenities</span>
        </div>

        {/* Outer ring */}
        <motion.div
          className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-mist"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Items */}
        {amenities.map((amenity, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = active === i;

          return (
            <motion.div
              key={amenity}
              className="absolute flex flex-col items-center gap-2 cursor-default"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
            >
              <motion.div
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-400 ${
                  isActive
                    ? 'bg-sage text-ivory border-sage'
                    : 'bg-ivory text-stone border-mist hover:border-sage hover:text-sage'
                }`}
                animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {iconForAmenity(amenity)}
              </motion.div>
              <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-center max-w-[80px] leading-tight" style={{ color: isActive ? '#4E6652' : '#8C8880' }}>
                {amenity}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile list */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {amenities.map((amenity, i) => (
          <motion.div
            key={amenity}
            className="flex items-center gap-3 p-4 border border-mist rounded-sm bg-ivory"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="w-9 h-9 rounded-full bg-sage-mist flex items-center justify-center text-sage flex-shrink-0">
              {iconForAmenity(amenity)}
            </div>
            <span className="font-body text-xs text-stone-dark leading-tight">{amenity}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
