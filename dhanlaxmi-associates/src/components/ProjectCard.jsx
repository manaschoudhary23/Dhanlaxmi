import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function ProjectCard({ project }) {
  const heroImg = project.gallery?.[0] || null

  return (
    <motion.div
      className="group overflow-hidden rounded-3xl"
      style={{
        background: 'var(--white)',
        border: '1px solid rgba(198,166,106,0.15)',
        boxShadow: '0 2px 0 rgba(0,0,0,0.02), 0 20px 60px rgba(44,40,30,0.07)',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/projects/${project.slug}`} className="block" aria-label={`View ${project.name} details`}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          {heroImg ? (
            <img
              src={heroImg}
              alt={`${project.name} — premium residential project`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              loading="lazy"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(ellipse at 30% 30%, rgba(198,166,106,0.2), transparent 60%),
                  linear-gradient(135deg, var(--beige) 0%, var(--beige-dark) 100%)`,
              }}
            />
          )}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'rgba(46,46,46,0.2)' }}
          />
          {/* Status */}
          <div className="absolute top-4 left-4">
            <span className="badge-ongoing">{project.status}</span>
          </div>
          {/* Hover overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-400 group-hover:opacity-100">
            <span className="rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em]"
              style={{ background: 'rgba(247,245,242,0.95)', color: 'var(--charcoal)' }}>
              Explore Project →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-1 text-xl font-semibold leading-tight transition group-hover:text-gold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--charcoal)' }}>
            {project.name}
          </h3>
          <div className="mb-3 flex items-center gap-1.5 text-xs" style={{ color: 'var(--olive)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {project.area}
          </div>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
            {project.tagline || 'Signature living with timeless detailing.'}
          </p>
          <div className="flex items-center justify-between border-t pt-4"
            style={{ borderColor: 'rgba(198,166,106,0.15)' }}>
            <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--charcoal)' }}>
              {project.priceLabel || 'On Request'}
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--gold)' }}>
              Explore →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
