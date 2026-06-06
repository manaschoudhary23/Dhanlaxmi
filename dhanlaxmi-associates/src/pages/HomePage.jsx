import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '../components/motion/TextReveal';
import { ImageReveal } from '../components/motion/ImageReveal';
import { CountUp } from '../components/motion/CountUp';
import { StaggerReveal, StaggerItem } from '../components/motion/StaggerReveal';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────
   HERO SECTION
────────────────────────────────────── */
function HeroSection() {
  const heroRef   = useRef(null);
  const lineRef   = useRef(null);
  const bgRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text timeline
      const tl = gsap.timeline({ delay: 2.5 }); // after loading screen
      tl.fromTo('.hero-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.hero-title .word-mask .word-inner',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.08 },
        '-=0.4'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-ctas',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      {/* Background Video */}
      <div className="hero-bg" ref={bgRef}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/building_1.jpg"
        >
          <source src="/video/Backgorund.mp4" type="video/mp4" />
          {/* Fallback styling if video fails to load */}
        </video>
        {/* Architectural grid overlay to add texture over the video */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(248,245,240,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248,245,240,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Dark overlay to ensure text readability over bright videos */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Gradient overlays */}
      <div className="hero-gradient" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(138,158,140,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="container-luxury relative z-10 pb-6">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-4 mb-8 opacity-0">
          <span className="block w-10 h-px bg-sage" />
          <span className="font-mono text-[0.625rem] tracking-[0.28em] uppercase text-sage">
            Pune · Est. 2008
          </span>
        </div>

        {/* Title */}
        <div className="hero-title mb-6 max-w-4xl">
          <TextReveal
            className="font-display text-fluid-6xl text-ivory-light font-light leading-none tracking-tight block"
          >
            Luxury Living
          </TextReveal>
          <div className="flex items-baseline gap-4 flex-wrap">
            <TextReveal
              className="font-display text-fluid-6xl text-ivory-light font-light leading-none tracking-tight"
            >
              Crafted
            </TextReveal>
            <span className="font-display text-fluid-5xl italic text-sage-light font-light leading-none tracking-tight opacity-0 hero-subtitle" style={{ animationDelay: '0ms' }}>
              with Purpose
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle opacity-0 font-body text-ivory/60 font-light text-fluid-lg max-w-md leading-relaxed mb-10">
          Dhanlaxmi Associates builds homes that become legacies — where exceptional design meets uncompromising quality.
        </p>

        {/* CTAs */}
        <div className="hero-ctas opacity-0 flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto mt-8">
          <Link to="/projects" className="btn-primary w-full sm:w-auto justify-center" data-cursor="Explore">
            <span>Explore Projects</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link to="/contact" className="btn-outline w-full sm:w-auto justify-center !text-ivory !border-ivory/40 hover:!bg-ivory/10 hover:!text-ivory">
            <span>Schedule a Visit</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-ivory/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ivory/40 to-transparent animate-pulse" />
      </div>

      {/* Project count badge */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-1">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ivory/30">Current Project</span>
        <span className="font-display text-2xl text-ivory/80 font-light">01 / 01</span>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────
   LEGACY / STATS SECTION
────────────────────────────────────── */
const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
  { value: 500, suffix: '+', label: 'Families Housed' },
  { value: 2, suffix: 'L+', label: 'Sq.ft Constructed', prefix: '' },
];

function LegacySection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="section-padding bg-ivory">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <div>
            <div className="section-label mb-8">Our Legacy</div>
            <TextReveal
              as="h2"
              className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-6"
              trigger="section"
            >
              Fifteen years of building trust, one home at a time
            </TextReveal>
            <p className="font-body text-stone-dark text-fluid-base leading-relaxed mb-8 max-w-md">
              Dhanlaxmi Associates was founded on a simple belief: every family deserves a home that is built with integrity, designed with purpose, and crafted to last. From our first project in Kothrud to today, that belief has never wavered.
            </p>
            <Link to="/about" className="btn-ghost">
              <span>Our Story</span>
              <svg className="arrow" width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          {/* Right — Stats grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <StaggerReveal key={stat.label}>
                <StaggerItem>
                  <div className="stat-block border-t border-mist pt-6">
                    <div className="stat-number">
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </div>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </StaggerItem>
              </StaggerReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────
   FEATURED PROJECTS
────────────────────────────────────── */
function FeaturedProjects() {
  return (
    <section className="section-padding bg-ivory-dark">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-label mb-5">Portfolio</div>
            <TextReveal
              as="h2"
              className="font-display text-fluid-4xl text-charcoal font-light leading-tight"
              trigger="section"
            >
              Featured Residences
            </TextReveal>
          </div>
          <Link to="/projects" className="btn-ghost flex-shrink-0">
            <span>View All Projects</span>
            <svg className="arrow" width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FeaturedProjectCard key={project.slug} project={project} index={i} />
          ))}

          {/* Coming Soon card */}
          <div className="relative overflow-hidden rounded-sm aspect-[4/3] lg:aspect-auto lg:row-span-1 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #E8EEE8 0%, #D0DDD2 100%)', minHeight: '320px' }}
          >
            <div className="text-center px-8">
              <div className="section-label justify-center mb-4">Coming Soon</div>
              <p className="font-display text-fluid-2xl text-sage-deep font-light">More Projects</p>
              <p className="font-body text-sm text-sage mt-2">in the pipeline</p>
            </div>
            {/* Decorative */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #4E6652 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project, index }) {
  return (
    <Link to={`/projects/${project.slug}`} data-cursor="View">
      <motion.div
        className="project-card aspect-[4/3] lg:aspect-auto"
        style={{ minHeight: '380px' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
        whileHover="hover"
      >
        {/* Image / Gradient stand-in */}
        {project.gallery?.[0] ? (
          <img
            src={project.gallery[0]}
            alt={project.name}
            className="project-card-img absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #3D4A3E 0%, #4E6652 50%, #3D3A36 100%)' }}
          />
        )}

        <div className="project-card-overlay" />

        {/* Content */}
        <div className="project-card-content">
          {/* Status pill */}
          <span className={`inline-block font-mono text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 rounded-sm mb-3 ${
            project.status === 'Ongoing'
              ? 'bg-terracotta/80 text-ivory-light'
              : 'bg-sage/80 text-ivory-light'
          }`}>
            {project.status}
          </span>

          <h3 className="font-display text-fluid-2xl text-ivory font-light leading-tight mb-1">
            {project.name}
          </h3>
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-ivory/50 uppercase">
            {project.area} · {project.unitSize}
          </p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-ivory/10">
            <span className="font-body text-sm text-ivory/70">{project.unitSize}</span>
            <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-widest uppercase text-sage-light">
              Explore
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ──────────────────────────────────────
   PHILOSOPHY SECTION
────────────────────────────────────── */
const pillars = [
  {
    no: '01',
    title: 'Architectural Integrity',
    body: 'Every structure is designed with purpose — where form and function achieve perfect equilibrium.',
  },
  {
    no: '02',
    title: 'Material Honesty',
    body: 'We source materials that age gracefully, telling the story of genuine craftsmanship with every passing year.',
  },
  {
    no: '03',
    title: 'Human-First Design',
    body: 'Our spaces are conceived around the rhythms of real life — how light moves, how families gather, how mornings begin.',
  },
];

function PhilosophySection() {
  return (
    <section className="section-padding bg-charcoal overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="section-label !text-sage mb-8">Philosophy</div>
          <TextReveal
            as="h2"
            className="font-display text-fluid-5xl text-ivory-light font-light leading-tight"
            trigger="section"
          >
            Building is not just construction. It is stewardship.
          </TextReveal>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal-mid">
          {pillars.map((p, i) => (
            <motion.div
              key={p.no}
              className="bg-charcoal p-10 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
            >
              <span className="font-mono text-[0.625rem] tracking-[0.25em] text-sage uppercase block mb-8">{p.no}</span>
              <h3 className="font-display text-fluid-xl text-ivory font-light leading-tight mb-5 group-hover:text-sage transition-colors duration-500">
                {p.title}
              </h3>
              <p className="font-body text-sm text-stone leading-relaxed">{p.body}</p>
              <div className="mt-8 w-8 h-px bg-sage transition-all duration-500 group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────
   CTA SECTION
────────────────────────────────────── */
function CTASection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <TextReveal
              as="h2"
              className="font-display text-fluid-5xl text-charcoal font-light leading-tight mb-4"
              trigger="section"
            >
              Ready to find your perfect home?
            </TextReveal>
            <p className="font-body text-stone-dark text-fluid-base leading-relaxed">
              Schedule a personal site visit or speak with our team to discover how Dhanlaxmi Associates can deliver the home you've always envisioned.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-shrink-0 mt-8 lg:mt-0">
            <Link to="/contact" className="btn-primary w-full sm:w-auto justify-center" data-cursor="Connect">
              <span>Schedule a Visit</span>
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────
   MARQUEE STRIP
────────────────────────────────────── */
function MarqueeStrip() {
  const items = ['Architectural Excellence', 'Premium Residences', 'Trusted Since 2008', 'RERA Registered', 'Kothrud Pune', 'Quality Construction'];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-4 border-y border-mist bg-ivory-dark">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-stone">{item}</span>
            <span className="w-1 h-1 rounded-full bg-sage flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   HOME PAGE EXPORT
────────────────────────────────────── */
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Dhanlaxmi Associates — Luxury Residential Real Estate in Pune</title>
        <meta name="description" content="Premium residential projects by Dhanlaxmi Associates in Pune. Discover elegant 2BHK, 3BHK, and 4BHK homes in Kothrud and nearby areas. RERA registered." />
        <meta property="og:title" content="Dhanlaxmi Associates — Luxury Residential Real Estate in Pune" />
        <meta property="og:description" content="Premium residential projects by Dhanlaxmi Associates in Pune." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Dhanlaxmi Associates",
          "address": { "@type": "PostalAddress", "addressLocality": "Kothrud", "addressRegion": "Pune", "addressCountry": "IN" },
          "telephone": "+919999999999",
          "url": "https://dhanlaxmiassociates.in",
        })}</script>
      </Helmet>

      <HeroSection />
      <MarqueeStrip />
      <LegacySection />
      <FeaturedProjects />
      <PhilosophySection />
      <CTASection />
    </>
  );
}
