import { useEffect, useRef } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ongoingProjects } from '../data/projects.js'
import { Reveal } from '../components/Reveal.jsx'
import { AnimatedCounter } from '../components/AnimatedCounter.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'

gsap.registerPlugin(ScrollTrigger)

export function HomePage() {
  const modal = useOutletContext()
  return (
    <div style={{ background: 'var(--ivory)', overflowX: 'hidden' }}>
      <Hero onEnquire={() => modal.openForProject('')} />
      <Manifesto />
      <FeaturedProjects modal={modal} />
      <StatsBar />
      <AboutSplit modal={modal} />
      <WhyUs />
      <Testimonials />
      <CTA modal={modal} />
    </div>
  )
}

/* ──────────────────────────────────────────────
   HERO
────────────────────────────────────────────── */
function Hero({ onEnquire }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.hero-kicker',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0.4)
        .fromTo('.hero-line-1',  { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 }, 0.65)
        .fromTo('.hero-line-2',  { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 }, 0.82)
        .fromTo('.hero-sub',     { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 1.0)
        .fromTo('.hero-ctas',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.15)
        .fromTo('.hero-scroll',  { opacity: 0 },        { opacity: 1, duration: 0.6 }, 1.5)

      // Video parallax on scroll
      gsap.to('.hero-video', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
      })
      // Text fades as you scroll away
      gsap.to('.hero-content', {
        opacity: 0, y: -40,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: '30% top', end: '80% top', scrub: 1 }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative flex items-end overflow-hidden"
      style={{ height: '100svh', minHeight: 640 }}>
      {/* Video */}
      <div className="hero-video absolute inset-0 will-change-transform" style={{ scale: '1.12' }}>
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
          <source src="/video/223065_medium.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Overlays */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(10,8,4,0.35) 0%, rgba(10,8,4,0.5) 50%, rgba(10,8,4,0.82) 100%)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 15% 70%, rgba(198,166,106,0.18) 0%, transparent 55%)'
      }} />

      {/* Content */}
      <div className="hero-content container-x relative z-10 pb-18 sm:pb-24">
        <div className="hero-kicker kicker mb-5" style={{ color: 'rgba(198,166,106,0.85)', opacity: 0 }}>
          Dhanlaxmi Associates · Pune
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 1.02, letterSpacing: '-0.025em' }}>
          <span className="hero-line-1 block opacity-0"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'var(--ivory)', fontWeight: 300 }}>
            Building Trust.
          </span>
          <span className="hero-line-2 block opacity-0"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'var(--gold-light)', fontWeight: 300 }}>
            Creating Spaces.
          </span>
        </h1>
        <p className="hero-sub mt-6 max-w-lg text-sm leading-relaxed opacity-0"
          style={{ color: 'rgba(247,245,242,0.6)' }}>
          Premium residential developments in Pune's most coveted locations — crafted for elevated living.
        </p>
        <div className="hero-ctas mt-8 flex flex-wrap gap-3 opacity-0">
          <Link to="/ongoing-projects" className="btn-gold">Explore Projects</Link>
          <button type="button" onClick={onEnquire} className="btn-glass">Schedule Visit</button>
        </div>
        {/* Scroll cue */}
        <div className="hero-scroll absolute bottom-0 right-0 hidden flex-col items-center gap-2 md:flex opacity-0"
          style={{ paddingBottom: '1rem' }}>
          <span style={{
            writingMode: 'vertical-rl', fontSize: '0.6rem',
            letterSpacing: '0.3em', color: 'rgba(247,245,242,0.35)', textTransform: 'uppercase'
          }}>Scroll</span>
          <motion.div className="h-10 w-px rounded-full"
            style={{ background: 'rgba(198,166,106,0.5)' }}
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   MANIFESTO — Apple-style pinned word reveal
────────────────────────────────────────────── */
function Manifesto() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll('.m-word')
      // Stagger in tied to scroll (scrub)
      gsap.fromTo(words,
        { opacity: 0.08, y: 0 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            end: 'bottom 40%',
            scrub: 1.5,
          }
        }
      )
      // Gold line grows
      gsap.fromTo('.m-line', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'center 50%', scrub: 1 }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const text = 'We don\'t build buildings. We build legacies that stand for generations.'
  const words = text.split(' ')

  return (
    <section ref={ref} className="relative overflow-hidden section-py"
      style={{ background: 'var(--charcoal)' }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(198,166,106,0.07), transparent 65%)' }} />
      <div className="container-x">
        <div className="m-line mb-10 h-px origin-left"
          style={{ background: 'linear-gradient(90deg, var(--gold), transparent)', scaleX: 0 }} />
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
          fontWeight: 300,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          color: 'var(--ivory)',
        }}>
          {words.map((w, i) => (
            <span key={i} className="m-word inline-block"
              style={{ marginRight: '0.28em', opacity: 0.08 }}>
              {w}
            </span>
          ))}
        </p>
        <div className="mt-12 flex items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.28em]"
            style={{ color: 'rgba(198,166,106,0.6)' }}>Dhanlaxmi Associates</span>
          <span className="h-px flex-1" style={{ background: 'rgba(198,166,106,0.15)' }} />
          <span className="text-xs" style={{ color: 'rgba(247,245,242,0.25)' }}>Est. 2005 · Pune</span>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   FEATURED PROJECTS
────────────────────────────────────────────── */
function FeaturedProjects({ modal }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.fp-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
      gsap.fromTo('.fp-card', { opacity: 0, y: 70 }, {
        opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-grid', start: 'top 82%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="section-py" aria-label="Featured projects">
      <div className="container-x">
        <div className="fp-header mb-14 flex items-end justify-between gap-6 opacity-0">
          <div>
            <div className="section-label"><span className="kicker">Featured</span></div>
            <h2 className="heading-xl mt-1">Premium Ongoing Projects</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
              Curated developments in high-demand Pune locations with strong investment potential.
            </p>
          </div>
          <Link to="/ongoing-projects" className="btn-outline-gold hidden shrink-0 sm:inline-flex">
            View All →
          </Link>
        </div>
        <div className="fp-grid grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {ongoingProjects.slice(0, 3).map((p) => (
            <div key={p.slug} className="fp-card opacity-0"><ProjectCard project={p} /></div>
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link to="/ongoing-projects" className="btn-outline-gold w-full block text-center">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   STATS BAR — parallax dark strip
────────────────────────────────────────────── */
const STATS = [
  { v: 15, s: '+',    p: '',  l: 'Years of Excellence' },
  { v: 30, s: '+',    p: '',  l: 'Premium Projects' },
  { v: 98, s: '%',    p: '',  l: 'Client Satisfaction' },
  { v: 500, s: 'Cr+', p: '₹', l: 'Delivered Value' },
]

function StatsBar() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' }
      })
      // Subtle background parallax
      gsap.to('.stats-bg', {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden py-20" style={{ background: 'var(--charcoal)' }}>
      <div className="stats-bg pointer-events-none absolute inset-[-20%]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(198,166,106,0.09), transparent 60%)' }} />
      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="stat-item text-center opacity-0">
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--gold)',
              }}>
                {s.p}<AnimatedCounter value={s.v} suffix="" duration={2} />{s.s}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: 'rgba(247,245,242,0.4)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ABOUT SPLIT — parallax image + text
────────────────────────────────────────────── */
function AboutSplit({ modal }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      // Image scale-up reveal
      gsap.fromTo('.about-img-inner', { scale: 1.15, opacity: 0 }, {
        scale: 1, opacity: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-img-wrap', start: 'top 85%', end: 'top 35%', scrub: 0.8 }
      })
      // Image slow parallax
      gsap.to('.about-img-inner', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.about-img-wrap', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Text stagger
      gsap.fromTo('.about-text-item', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text-col', start: 'top 78%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="section-py overflow-hidden" style={{ background: 'var(--beige)' }}>
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="about-img-wrap order-2 overflow-hidden rounded-3xl lg:order-1"
          style={{ aspectRatio: '4/5', maxHeight: '70vh' }}>
          <div className="about-img-inner h-full w-full will-change-transform">
            <img src="/images/project_hero.png" alt="Dhanlaxmi Associates premium project"
              className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(46,46,46,0.4), transparent 50%)' }} />
          </div>
          {/* RERA badge */}
          <div className="absolute bottom-6 left-6 glass-card px-5 py-3">
            <div className="kicker mb-0.5">RERA Registered</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>P52100099881</div>
          </div>
        </div>

        {/* Text */}
        <div className="about-text-col order-1 lg:order-2">
          <div className="about-text-item opacity-0">
            <div className="section-label"><span className="kicker">About</span></div>
            <h2 className="heading-xl mt-1">Luxury, Guided by Trust.</h2>
          </div>
          <p className="about-text-item mt-5 text-sm leading-relaxed opacity-0" style={{ color: 'var(--olive)' }}>
            Dhanlaxmi Associates brings decades of construction expertise to Pune's premium residential market.
            We curate projects with thoughtful design, prime locations, and high-quality execution.
          </p>
          <p className="about-text-item mt-4 text-sm leading-relaxed opacity-0" style={{ color: 'var(--olive)' }}>
            From first call to keys-in-hand — our process is personal, discreet, and designed around you.
          </p>
          <div className="about-text-item mt-8 grid grid-cols-2 gap-4 opacity-0">
            {[['30+','Curated Projects'],['98%','Satisfaction'],['15+','Weekly Visits'],['Top-tier','Locations']].map(([v, k]) => (
              <div key={k} className="rounded-2xl p-5 text-center"
                style={{ background: 'var(--white)', border: '1px solid rgba(198,166,106,0.15)' }}>
                <div className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>{v}</div>
                <div className="mt-1 text-xs" style={{ color: 'var(--olive)' }}>{k}</div>
              </div>
            ))}
          </div>
          <div className="about-text-item mt-8 flex flex-wrap gap-3 opacity-0">
            <Link to="/about" className="btn-dark">Our Story</Link>
            <button type="button" onClick={() => modal.openForProject('')} className="btn-outline-gold">
              Quick Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   WHY CHOOSE US — staggered cards
────────────────────────────────────────────── */
const FEATURES = [
  { n: '01', t: 'Curated Shortlists', d: 'Only premium projects matching your budget, location, and lifestyle — hand-picked for you.' },
  { n: '02', t: 'Discreet Advisory',  d: 'Confidential conversations, transparent guidance, and decision-ready insights at every stage.' },
  { n: '03', t: 'Fast Site Visits',   d: 'Quick scheduling, guided walkthroughs, and clear follow-ups with zero pressure.' },
]

function WhyUs() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
      gsap.fromTo('.why-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 82%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="section-py">
      <div className="container-x">
        <div className="why-header mb-14 opacity-0">
          <div className="section-label"><span className="kicker">Why Choose Us</span></div>
          <h2 className="heading-xl">A Premium Experience, End-to-End</h2>
        </div>
        <div className="why-grid grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="why-card group luxury-card p-8 opacity-0 transition-all">
              <div className="kicker mb-4" style={{ color: 'var(--gold)' }}>{f.n}</div>
              <h3 className="heading-md mb-3">{f.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>{f.d}</p>
              <div className="mt-6 h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   TESTIMONIALS
────────────────────────────────────────────── */
const QUOTES = [
  { name: 'Aarav S.', loc: 'Kothrud', text: 'They shortlisted the right options and arranged a smooth site visit. Premium experience end-to-end.' },
  { name: 'Meera K.', loc: 'Baner',   text: 'Beautifully handled from first call to booking. The guidance was truly transparent and personal.' },
  { name: 'Rohan M.', loc: 'Aundh',   text: 'Exceptional service. They understood our requirements and delivered options that matched our lifestyle.' },
]

function Testimonials() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.testi-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
      gsap.fromTo('.testi-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.testi-grid', start: 'top 82%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="section-py" style={{ background: 'var(--charcoal)' }}>
      <div className="container-x">
        <div className="testi-header mb-14 opacity-0">
          <div className="section-label">
            <span className="kicker" style={{ color: 'var(--gold)' }}>Testimonials</span>
          </div>
          <h2 className="heading-xl" style={{ color: 'var(--ivory)' }}>Loved by Premium Buyers</h2>
        </div>
        <div className="testi-grid grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <div key={q.name} className="testi-card glass-card-dark p-7 opacity-0">
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>★</span>
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: 'rgba(247,245,242,0.6)' }}>
                "{q.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ background: 'rgba(198,166,106,0.12)', color: 'var(--gold)', border: '1px solid rgba(198,166,106,0.2)' }}>
                  {q.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--ivory)' }}>{q.name}</div>
                  <div className="text-xs" style={{ color: 'rgba(247,245,242,0.35)' }}>{q.loc}, Pune</div>
                </div>
                <div className="ml-auto text-xs font-medium" style={{ color: 'var(--gold)' }}>Verified ✓</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   CTA STRIP
────────────────────────────────────────────── */
function CTA({ modal }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-inner', { opacity: 0, scale: 0.97 }, {
        opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="section-py">
      <div className="container-x">
        <div className="cta-inner relative overflow-hidden rounded-3xl p-12 sm:p-16 opacity-0"
          style={{ background: 'linear-gradient(135deg, var(--charcoal) 0%, #1A1710 100%)' }}>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 75% 50%, rgba(198,166,106,0.15), transparent 60%)' }} />
          <div className="gold-shimmer-line absolute top-0 left-0 right-0" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="kicker mb-3" style={{ color: 'var(--gold)' }}>Ready to Begin?</div>
              <h2 className="heading-xl mb-3" style={{ color: 'var(--ivory)' }}>Book a Site Visit Today</h2>
              <p className="text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
                Share your preferences. We'll respond with curated options within 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <button type="button" className="btn-gold" onClick={() => modal.openForProject('')}>
                Schedule Site Visit
              </button>
              <Link to="/contact" className="btn-outline-light">Full Enquiry Form</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
