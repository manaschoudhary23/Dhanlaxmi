import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export function FloorPlanViewer({ plans, initialIndex = 0, onClose }) {
  const [active, setActive] = useState(initialIndex);
  const plan = plans[active];

  return (
    <AnimatePresence>
      <motion.div
        className="floor-plan-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-mid flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-stone">Floor Plan</span>
            <span className="w-px h-4 bg-charcoal-mid" />
            <span className="font-display text-base text-ivory font-light">{plan.label}</span>
            <span className="font-mono text-[0.625rem] text-stone">{plan.area}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              {plans.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setActive(i)}
                  className={`px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.15em] uppercase transition-all duration-300 border rounded-sm ${
                    active === i ? 'border-sage bg-sage/20 text-sage' : 'border-charcoal-mid text-stone hover:border-stone'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <a
              href={plan.image}
              download
              className="hidden sm:flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase text-stone hover:text-ivory transition-colors duration-300 border border-charcoal-mid px-3 py-1.5 rounded-sm"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-charcoal-mid flex items-center justify-center text-stone hover:text-ivory hover:border-ivory transition-all duration-300"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Zoom area */}
        <div className="flex-1 overflow-hidden bg-charcoal-mid/30 flex items-center justify-center relative">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={5}
            centerOnInit
            doubleClick={{ mode: 'zoomIn', step: 0.7 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
                  <button onClick={() => zoomIn()} className="w-9 h-9 rounded-full bg-charcoal border border-charcoal-mid text-ivory flex items-center justify-center hover:bg-charcoal-mid transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                  </button>
                  <button onClick={() => zoomOut()} className="w-9 h-9 rounded-full bg-charcoal border border-charcoal-mid text-ivory flex items-center justify-center hover:bg-charcoal-mid transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M8 11h6"/></svg>
                  </button>
                  <button onClick={() => resetTransform()} className="w-9 h-9 rounded-full bg-charcoal border border-charcoal-mid text-stone flex items-center justify-center hover:text-ivory hover:bg-charcoal-mid transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 101.49-3.3L1 10"/></svg>
                  </button>
                </div>
                <TransformComponent
                  wrapperStyle={{ width: '100%', height: '100%' }}
                  contentStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
                >
                  <motion.img
                    key={plan.image}
                    src={plan.image}
                    alt={`${plan.label} Floor Plan`}
                    className="max-w-full max-h-full object-contain select-none"
                    style={{ maxHeight: 'calc(100vh - 120px)' }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    draggable={false}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>

        {/* Mobile tabs */}
        <div className="sm:hidden flex items-center gap-2 px-6 py-3 border-t border-charcoal-mid overflow-x-auto">
          {plans.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setActive(i)}
              className={`px-4 py-2 font-mono text-[0.6rem] tracking-widest uppercase flex-shrink-0 rounded-sm border transition-all duration-300 ${
                active === i ? 'border-sage bg-sage/20 text-sage' : 'border-charcoal-mid text-stone'
              }`}
            >
              {p.label} · {p.area}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
