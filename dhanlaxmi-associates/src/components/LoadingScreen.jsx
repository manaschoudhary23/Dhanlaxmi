import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const logoRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    // Simulate loading progress
    const tl = gsap.timeline()

    // Animate progress bar
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].val))
      },
    })

    // Text reveal
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.3,
    )

    // Logo reveal
    tl.fromTo(
      logoRef.current,
      { opacity: 0, letterSpacing: '0.6em' },
      { opacity: 1, letterSpacing: '0.12em', duration: 1.0, ease: 'power3.out' },
      0.1,
    )

    // Complete
    tl.call(() => {
      setTimeout(() => setDone(true), 300)
    })

    return () => tl.kill()
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => onComplete?.(), 700)
      return () => clearTimeout(t)
    }
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--ivory)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background decorative circles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-[600px] w-[600px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(198,166,106,0.07) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Building wireframe SVG */}
          <div className="relative mb-10">
            <BuildingAnimation progress={progress} />
          </div>

          {/* Logo */}
          <div
            ref={logoRef}
            className="mb-1 font-cinzel text-xs font-medium tracking-[0.12em] text-charcoal opacity-0"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            DHANLAXMI
          </div>
          <div
            className="font-cinzel text-2xl font-semibold tracking-[0.12em] text-charcoal mb-8"
            style={{ fontFamily: 'var(--font-heading)', opacity: 0 }}
            ref={(el) => {
              if (el) gsap.to(el, { opacity: 1, delay: 0.5, duration: 0.8 })
            }}
          >
            ASSOCIATES
          </div>

          {/* Gold divider */}
          <div className="gold-shimmer-line mb-8 w-24" />

          {/* Tagline */}
          <p
            ref={textRef}
            className="mb-8 text-center text-xs font-medium uppercase tracking-[0.28em] opacity-0"
            style={{ color: 'var(--olive)' }}
          >
            Crafting Luxury Living
          </p>

          {/* Progress bar */}
          <div className="relative h-[1px] w-48 overflow-hidden rounded-full" style={{ background: 'rgba(198,166,106,0.18)' }}>
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Progress number */}
          <div
            className="mt-3 text-[10px] font-medium tabular-nums tracking-[0.2em]"
            style={{ color: 'var(--olive)', opacity: 0.6 }}
          >
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BuildingAnimation({ progress }) {
  // Number of floors = 8; light them up as progress increases
  const floors = 8
  const litFloors = Math.floor((progress / 100) * floors)

  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-40 w-32"
    >
      {/* Building outline */}
      <rect x="20" y="40" width="120" height="132" rx="2"
        stroke="rgba(198,166,106,0.25)" strokeWidth="1.5" fill="none" />

      {/* Floors — bottom to top */}
      {Array.from({ length: floors }).map((_, i) => {
        const isLit = i < litFloors
        const floorHeight = 14
        const y = 40 + (floors - 1 - i) * floorHeight + (floors - 1 - i) * 2

        return (
          <g key={i}>
            {/* Floor line */}
            <line
              x1="20" y1={y + floorHeight} x2="140" y2={y + floorHeight}
              stroke="rgba(198,166,106,0.15)" strokeWidth="0.8"
            />
            {/* Windows row */}
            {[35, 58, 81, 104, 122].map((wx, wi) => (
              <motion.rect
                key={wi}
                x={wx}
                y={y + 3}
                width={wi === 4 ? 8 : 14}
                height={9}
                rx="1"
                fill={isLit ? 'rgba(198,166,106,0.6)' : 'rgba(198,166,106,0.08)'}
                animate={{ fill: isLit ? 'rgba(198,166,106,0.6)' : 'rgba(198,166,106,0.08)' }}
                transition={{ duration: 0.4, delay: wi * 0.05 }}
              />
            ))}
          </g>
        )
      })}

      {/* Rooftop structure */}
      <rect x="55" y="24" width="50" height="16" rx="1"
        stroke="rgba(198,166,106,0.3)" strokeWidth="1" fill="rgba(198,166,106,0.05)" />
      <line x1="80" y1="10" x2="80" y2="24"
        stroke="rgba(198,166,106,0.4)" strokeWidth="1.5" />

      {/* Crane arm (horizontal) */}
      <motion.g
        animate={{ rotate: progress < 80 ? [-3, 3, -3] : [0, 0, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '80px 24px' }}
      >
        <line x1="80" y1="10" x2="145" y2="10"
          stroke="rgba(198,166,106,0.5)" strokeWidth="1.5" />
        {/* Crane hook wire */}
        <line x1="138" y1="10" x2="138" y2="28"
          stroke="rgba(198,166,106,0.35)" strokeWidth="1" />
        <motion.rect
          x="132" y="28" width="12" height="7" rx="1"
          fill="rgba(198,166,106,0.2)"
          stroke="rgba(198,166,106,0.4)" strokeWidth="0.8"
          animate={{ y: [28, 32, 28] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>

      {/* Entrance */}
      <rect x="66" y="154" width="28" height="18" rx="2"
        stroke="rgba(198,166,106,0.3)" strokeWidth="1" fill="rgba(198,166,106,0.06)" />
      {/* Steps */}
      <line x1="62" y1="172" x2="98" y2="172" stroke="rgba(198,166,106,0.25)" strokeWidth="1" />
      <line x1="58" y1="174" x2="102" y2="174" stroke="rgba(198,166,106,0.2)" strokeWidth="1" />
    </svg>
  )
}
