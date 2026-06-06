import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '../components/motion/TextReveal';
import { CountUp } from '../components/motion/CountUp';
import { ImageReveal } from '../components/motion/ImageReveal';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
    title: 'Family First',
    body: 'Every home is built thinking of the families who will live, grow, and create memories within its walls.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Uncompromising Quality',
    body: 'We use materials that outlast market trends — built to standards that exceed what regulations require.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'On-Time Delivery',
    body: 'We honour our commitments. Every project delivered within agreed timelines, without compromise.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Transparency Always',
    body: 'From pricing to RERA compliance — every aspect of our business is conducted with complete transparency.',
  },
];

const timeline = [
  { year: '2008', event: 'Dhanlaxmi Associates founded in Kothrud, Pune with a vision to build quality homes.' },
  { year: '2012', event: 'Completed first major residential complex — setting a new standard for the area.' },
  { year: '2016', event: 'Expanded to deliver over 5 projects, earning trust from 200+ families.' },
  { year: '2019', event: 'First RERA-registered project in Kothrud, reinforcing commitment to transparency.' },
  { year: '2023', event: 'Launched OM Building — our most ambitious project to date.' },
  { year: 'Today', event: 'Over 500 families housed. More projects in the pipeline.' },
];

export function AboutPage() {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us — Dhanlaxmi Associates</title>
        <meta name="description" content="Learn about Dhanlaxmi Associates — our founding story, philosophy, and the values that have guided us for over 15 years in Pune's residential real estate." />
      </Helmet>

      {/* ── Hero ──────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-charcoal">
        {/* Architectural grid */}
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `linear-gradient(rgba(138,158,140,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(138,158,140,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(37,35,32,0.95) 0%, rgba(37,35,32,0.5) 60%, transparent 100%)' }} />
        <div className="relative z-10 container-luxury pb-20 pt-40">
          <div className="section-label !text-sage mb-8">About Us</div>
          <TextReveal
            as="h1"
            className="font-display text-fluid-6xl text-ivory font-light leading-none tracking-tight max-w-3xl"
          >
            Fifteen years of building what matters most
          </TextReveal>
        </div>
      </section>

      {/* ── Story ──────────────────────────── */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="section-label mb-8">Our Story</div>
            <TextReveal
              as="h2"
              className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-8"
              trigger="section"
            >
              Built on a foundation of trust
            </TextReveal>
            <div className="flex flex-col gap-5 font-body text-stone-dark text-fluid-base leading-relaxed">
              <p>
                Dhanlaxmi Associates was born in 2008 from a simple conviction: that every Pune family deserves a home that is built honestly, designed thoughtfully, and delivered with integrity. What began as a small construction firm in Kothrud has grown into one of the area's most trusted residential developers.
              </p>
              <p>
                Our founder started by building just one home — paying attention to every material, every corner, every decision. That attention to detail became our hallmark, and it remains the standard by which we measure every project today.
              </p>
              <p>
                Over fifteen years, we have housed over 500 families across 10+ projects. We take pride not in the scale of what we build, but in the quality of what we deliver.
              </p>
            </div>
          </div>
          {/* Visual */}
          <div className="relative">
            <ImageReveal className="rounded-sm aspect-[4/5]">
              <div className="w-full h-full bg-gradient-to-br from-sage-mist via-sage/20 to-ivory-dark flex items-center justify-center" style={{ minHeight: '480px' }}>
                <div className="text-center p-8">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-6">
                    <rect x="24" y="40" width="8" height="24" fill="#8A9E8C"/>
                    <rect x="36" y="28" width="8" height="36" fill="#4E6652"/>
                    <rect x="48" y="34" width="8" height="30" fill="#8A9E8C"/>
                    <polyline points="18,44 40,22 62,38" fill="none" stroke="#4E6652" strokeWidth="2"/>
                    <line x1="16" y1="64" x2="64" y2="64" stroke="#D4CEC6" strokeWidth="1.5"/>
                  </svg>
                  <p className="font-display text-2xl text-charcoal font-light">Est. 2008</p>
                  <p className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-stone mt-2">Kothrud, Pune</p>
                </div>
              </div>
            </ImageReveal>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -left-6 bg-charcoal text-ivory p-6 rounded-sm hidden lg:block">
              <CountUp end={500} suffix="+" className="font-display text-4xl font-light block" />
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-stone-light">Families Housed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────── */}
      <section className="section-padding bg-ivory-dark">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-6">Our Values</div>
            <TextReveal
              as="h2"
              className="font-display text-fluid-4xl text-charcoal font-light leading-tight"
              trigger="section"
            >
              The principles we build by
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="flex flex-col gap-5 p-7 bg-ivory rounded-sm border border-mist group hover:border-sage transition-colors duration-400"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-sage-mist flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-ivory transition-all duration-400">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal font-light mb-2">{v.title}</h3>
                  <p className="font-body text-xs text-stone leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────── */}
      <section ref={timelineRef} className="section-padding bg-ivory overflow-hidden">
        <div className="container-luxury">
          <div className="section-label mb-8">Journey</div>
          <TextReveal
            as="h2"
            className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-16 max-w-xl"
            trigger="section"
          >
            Milestones that shaped who we are
          </TextReveal>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical line */}
            <div className="timeline-line absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-mist" style={{ transformOrigin: 'top' }} />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 mb-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-2 w-2.5 h-2.5 rounded-full bg-sage border-2 border-ivory -translate-x-[4px] md:-translate-x-1/2" />

                {/* Year */}
                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-sage">{item.year}</span>
                </div>

                {/* Content */}
                <div className="md:w-5/12">
                  <p className="font-body text-stone-dark text-sm leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Quote ──────────────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mx-auto mb-8 text-sage opacity-60">
              <path d="M0 24V14C0 8 3 3 9 0l3 4C9 5.5 7 8 7 12h5v12H0zm18 0V14c0-6 3-11 9-14l3 4c-3 1.5-5 4.5-5 8.5h5V24H18z" fill="currentColor"/>
            </svg>
            <TextReveal
              as="blockquote"
              className="font-display text-fluid-3xl text-ivory font-light leading-relaxed italic mb-8"
              trigger="section"
            >
              We don't just build buildings. We build the places where children take their first steps, where families celebrate their milestones, where lives unfold. That is the responsibility we carry, and we take it seriously.
            </TextReveal>
            <div className="flex flex-col items-center gap-1">
              <span className="block w-8 h-px bg-sage mx-auto mb-4" />
              <p className="font-cinzel text-sm tracking-[0.18em] text-ivory uppercase">The Founder</p>
              <p className="font-mono text-[0.625rem] tracking-[0.2em] text-stone">Dhanlaxmi Associates</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────── */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-8">
          <TextReveal
            as="h2"
            className="font-display text-fluid-3xl text-charcoal font-light leading-tight max-w-xl"
            trigger="section"
          >
            Let's build something great together
          </TextReveal>
          <div className="flex gap-4 flex-shrink-0">
            <Link to="/projects" className="btn-primary"><span>Our Projects</span></Link>
            <Link to="/contact" className="btn-outline"><span>Contact Us</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
