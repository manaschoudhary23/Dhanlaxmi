import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = () => setMatches(Boolean(m.matches))
    onChange()
    m.addEventListener?.('change', onChange)
    return () => m.removeEventListener?.('change', onChange)
  }, [query])
  return matches
}

export function Cursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const [active, setActive] = useState(true)
  const [mode, setMode] = useState('default') // default | button | image

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Minimal + snappy: very slight trailing, no “floaty” lag.
  const sx = useSpring(x, { stiffness: 900, damping: 65, mass: 0.22 })
  const sy = useSpring(y, { stiffness: 900, damping: 65, mass: 0.22 })

  const sizes = useMemo(() => {
    if (mode === 'button') return { dot: 8, ring: 34 }
    if (mode === 'image') return { dot: 8, ring: 42 }
    return { dot: 8, ring: 28 }
  }, [mode])

  useEffect(() => {
    if (!isFinePointer) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setActive(true)
    }
    const onLeave = () => setActive(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [isFinePointer, x, y])

  // Hover intents (buttons/images) using data attributes.
  useEffect(() => {
    if (!isFinePointer) return

    const onOver = (e) => {
      const el = e.target.closest?.('[data-cursor]')
      if (!el) return
      const next = el.getAttribute('data-cursor') || 'default'

      setMode(next === 'image' ? 'image' : next === 'button' ? 'button' : 'default')
    }

    const onOut = (e) => {
      const el = e.target.closest?.('[data-cursor]')
      if (!el) return
      setMode('default')
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [isFinePointer])

  // Magnetic buttons (minimal): any element with data-magnetic="true"
  useEffect(() => {
    if (!isFinePointer) return

    const q = () => Array.from(document.querySelectorAll('[data-magnetic="true"]'))
    const cleanup = []

    q().forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        xTo(dx * 0.07)
        yTo(dy * 0.07)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanup.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanup.forEach((fn) => fn())
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] hidden md:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full bg-text"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          width: sizes.dot,
          height: sizes.dot,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="absolute rounded-full border border-text/15 bg-transparent"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          width: sizes.ring,
          height: sizes.ring,
          opacity: active ? (mode === 'default' ? 0.55 : 0.9) : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

