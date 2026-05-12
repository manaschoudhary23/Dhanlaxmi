import { Link, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ongoingProjects } from '../data/projects.js'
import { Reveal } from '../components/Reveal.jsx'

const filters = ['All', 'Residential', 'Commercial']

export function OngoingProjectsPage() {
  const modal = useOutletContext()
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? ongoingProjects
    : ongoingProjects.filter((p) => p.type === active)

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--charcoal)', minHeight: '46vh' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(198,166,106,0.1), transparent 55%)' }} />
        <div className="gold-shimmer-line absolute bottom-0 left-0 right-0" />
        <div className="container-x relative flex min-h-[46vh] flex-col justify-end pb-14 pt-24">
          <Reveal>
            <div className="section-label">
              <span className="kicker" style={{ color: 'var(--gold)' }}>Projects</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)',
              lineHeight: 1.05,
            }}>
              Ongoing Projects
            </h1>
            <p className="mt-3 max-w-xl text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
              Premium developments currently under construction — designed for elevated urban living.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="section-py" aria-label="Project listing">
        <div className="container-x">

          {/* Filter pills */}
          <Reveal>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className="rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300"
                  style={{
                    background: active === f ? 'var(--gold)' : 'var(--white)',
                    color: active === f ? 'var(--white)' : 'var(--charcoal)',
                    border: '1px solid',
                    borderColor: active === f ? 'var(--gold)' : 'rgba(198,166,106,0.25)',
                  }}
                >
                  {f}
                </button>
              ))}
              <span className="ml-auto text-xs" style={{ color: 'var(--olive)' }}>
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </Reveal>

          {/* Project cards */}
          {filtered.length === 0 ? (
            <Reveal>
              <div className="luxury-card py-20 text-center">
                <div className="kicker mb-3">Coming Soon</div>
                <h3 className="heading-md mb-4">Projects in This Category</h3>
                <p className="text-sm" style={{ color: 'var(--olive)' }}>Check back soon for new launches.</p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.07}>
                  <LuxuryProjectCard project={project} onEnquire={() => modal.openForProject(project.name)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--beige)' }} className="py-14" aria-label="Enquire CTA">
        <div className="container-x text-center">
          <Reveal>
            <div className="kicker mb-3">Can't Find What You Need?</div>
            <h2 className="heading-lg mb-4">Tell Us Your Requirements</h2>
            <p className="mx-auto mb-6 max-w-md text-sm" style={{ color: 'var(--olive)' }}>
              We'll match you with projects that fit your budget, location, and lifestyle.
            </p>
            <button type="button" onClick={() => modal.openForProject('')} className="btn-gold">
              Submit Enquiry
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

/* ── Large Luxury Project Card ─────────────────────────── */
function LuxuryProjectCard({ project, onEnquire }) {
  const heroImg = project.gallery?.[0] || null
  return (
    <motion.div
      className="group overflow-hidden rounded-3xl"
      style={{
        background: 'var(--white)',
        border: '1px solid rgba(198,166,106,0.15)',
        boxShadow: '0 2px 0 rgba(0,0,0,0.02), 0 20px 60px rgba(44,40,30,0.07)',
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          {heroImg ? (
            <img
              src={heroImg}
              alt={`${project.name} — luxury residential project`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full" style={{
              background: 'linear-gradient(135deg, var(--beige) 0%, var(--beige-dark) 100%)'
            }} />
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'rgba(46,46,46,0.25)' }} />
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className="badge-ongoing">{project.status}</span>
          </div>
          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em]"
              style={{ background: 'rgba(247,245,242,0.95)', color: 'var(--charcoal)' }}>
              Explore Project →
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="heading-md mb-1 transition group-hover:text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
            {project.name}
          </h3>
        </Link>
        <div className="mb-4 flex items-center gap-1.5 text-xs" style={{ color: 'var(--olive)' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {project.area}
        </div>
        <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
          {project.tagline || 'Signature living with timeless detailing.'}
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {(project.unitTypes || []).map((u) => (
            <span key={u} className="rounded-full px-3 py-1 text-[11px] font-medium"
              style={{ background: 'var(--beige)', color: 'var(--charcoal)' }}>
              {u}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'rgba(198,166,106,0.15)' }}>
          <div>
            <div className="text-xs" style={{ color: 'var(--olive)' }}>Starting from</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-heading)' }}>
              {project.priceLabel || 'On Request'}
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onEnquire} className="btn-outline-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.72rem' }}>
              Enquire
            </button>
            <Link to={`/projects/${project.slug}`} className="btn-dark" style={{ padding: '0.5rem 1rem', fontSize: '0.72rem' }}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
