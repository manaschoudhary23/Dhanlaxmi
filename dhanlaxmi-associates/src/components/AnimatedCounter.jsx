import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * AnimatedCounter — animates a numeric value up when scrolled into view.
 * Usage: <AnimatedCounter value={98} suffix="%" prefix="" decimals={0} />
 */
export function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, duration = 2, className = '' }) {
  const ref = useRef(null)
  const [displayed, setDisplayed] = useState(0)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const obj = { val: 0 }
          gsap.to(obj, {
            val: value,
            duration,
            ease: 'power2.out',
            onUpdate: () => setDisplayed(parseFloat(obj.val.toFixed(decimals))),
            onComplete: () => setDisplayed(value),
          })
        }
      },
      { threshold: 0.3 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration, decimals])

  const formatted = decimals > 0 ? displayed.toFixed(decimals) : Math.round(displayed)

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
