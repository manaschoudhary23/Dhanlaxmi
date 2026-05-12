/**
 * useGsap.js — Centralized GSAP ScrollTrigger utilities
 * Always uses gsap.context() for clean React teardown
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Master setup hook — run inside a component with a containerRef.
 * Accepts a setup function (ctx) and cleans up on unmount.
 */
export function useGsapContext(setupFn, deps = []) {
  const ctxRef = useRef(null)
  useEffect(() => {
    ctxRef.current = gsap.context(setupFn)
    return () => ctxRef.current?.revert()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Scrub fade-up — element fades + moves up tied to scroll position
 */
export function useScrollFadeUp(ref, { start = 'top 88%', end = 'top 55%', y = 40, delay = 0, scrub = false } = {}) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y, willChange: 'transform, opacity' },
        {
          opacity: 1, y: 0,
          ease: scrub ? 'none' : 'power3.out',
          duration: scrub ? 1 : 1.1,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: scrub ? 1.2 : false,
            toggleActions: scrub ? undefined : 'play none none none',
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])
}

/**
 * Stagger reveal — animates multiple children with stagger
 */
export function useStaggerReveal(containerRef, selector, {
  start = 'top 80%',
  y = 50,
  stagger = 0.12,
  duration = 0.9,
  delay = 0,
} = {}) {
  useEffect(() => {
    if (!containerRef?.current) return
    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll(selector)
      if (!els.length) return
      gsap.fromTo(els,
        { opacity: 0, y, willChange: 'transform, opacity' },
        {
          opacity: 1, y: 0,
          stagger,
          duration,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: 'play none none none',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])
}

/**
 * Parallax — element moves at a different speed than scroll
 */
export function useParallax(ref, { speed = 0.4, start = 'top bottom', end = 'bottom top' } = {}) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 0 },
        {
          y: () => -ref.current.offsetHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])
}

/**
 * Scale reveal — image scales from 1.12 → 1 as entering view
 */
export function useScaleReveal(ref, { from = 1.12, start = 'top 90%', end = 'top 40%' } = {}) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { scale: from, opacity: 0 },
        {
          scale: 1, opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 0.8,
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])
}

/**
 * Line-by-line text reveal — splits words into groups
 */
export function useSplitReveal(containerRef, selector = '.split-word', {
  start = 'top 82%',
  stagger = 0.06,
  y = 24,
} = {}) {
  useEffect(() => {
    if (!containerRef?.current) return
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll(selector)
      if (!words.length) return
      gsap.fromTo(words,
        { opacity: 0, y, rotateX: -18, willChange: 'transform, opacity' },
        {
          opacity: 1, y: 0, rotateX: 0,
          stagger,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: 'play none none none',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])
}

export { gsap, ScrollTrigger }
