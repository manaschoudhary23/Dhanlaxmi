import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../components/motion/TextReveal';
import { projects } from '../data/projects';

const FILTERS = ['All', 'Ongoing', 'Completed', 'Upcoming'];

function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
    >
      <Link to={`/projects/${project.slug}`} data-cursor="View" className="block group">
        <div className="project-card" style={{ aspectRatio: '3/4', minHeight: '380px' }}>
          {project.gallery?.[0] ? (
            <img
              src={project.gallery[0]}
              alt={project.name}
              className="project-card-img absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #3D4A3E, #4E6652, #3D3A36)' }} />
          )}
          <div className="project-card-overlay" />
          <div className="project-card-content">
            <span className={`inline-block font-mono text-[0.55rem] tracking-[0.22em] uppercase px-2.5 py-1 rounded-sm mb-3 ${
              project.status === 'Ongoing' ? 'bg-terracotta/80 text-ivory-light' : 'bg-sage/80 text-ivory-light'
            }`}>
              {project.status}
            </span>
            <h3 className="font-display text-fluid-2xl text-ivory font-light leading-tight mb-1 group-hover:text-sage-light transition-colors duration-400">
              {project.name}
            </h3>
            <p className="font-mono text-[0.6rem] tracking-[0.18em] text-ivory/50 uppercase mb-3">{project.area}</p>
            <div className="flex items-center justify-between border-t border-ivory/10 pt-3">
              <span className="font-body text-xs text-ivory/60">{project.unitSize}</span>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 group-hover:text-sage transition-colors duration-400">View Project</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Upcoming placeholder card
function UpcomingCard() {
  return (
    <div className="rounded-sm overflow-hidden border border-dashed border-mist flex flex-col items-center justify-center text-center p-10" style={{ minHeight: '380px', aspectRatio: '3/4' }}>
      <div className="w-10 h-10 rounded-full border border-mist flex items-center justify-center mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-stone">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      </div>
      <div className="section-label justify-center mb-3 !text-stone">Upcoming</div>
      <p className="font-display text-xl text-charcoal font-light">New Project</p>
      <p className="font-body text-sm text-stone mt-2">Launch announcement coming soon</p>
    </div>
  );
}

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = (() => {
    if (activeFilter === 'All') return projects;
    if (activeFilter === 'Upcoming') return [];
    return projects.filter(p => p.status === activeFilter);
  })();

  const showUpcoming = activeFilter === 'All' || activeFilter === 'Upcoming';

  return (
    <>
      <Helmet>
        <title>Projects — Dhanlaxmi Associates</title>
        <meta name="description" content="Explore all residential projects by Dhanlaxmi Associates in Pune — ongoing, completed, and upcoming premium homes." />
      </Helmet>

      {/* Page Header */}
      <div className="pt-36 pb-16 bg-ivory border-b border-mist">
        <div className="container-luxury">
          <div className="section-label mb-6">Portfolio</div>
          <TextReveal
            as="h1"
            className="font-display text-fluid-5xl text-charcoal font-light leading-tight max-w-2xl"
            trigger="section"
          >
            Our Residences
          </TextReveal>
          <p className="font-body text-stone-dark text-fluid-base leading-relaxed mt-6 max-w-xl">
            Each project is a unique expression of architectural intention — designed to stand the test of time and enrich the lives of those who call it home.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[4.5rem] z-50 bg-ivory/95 backdrop-blur-sm border-b border-mist py-4">
        <div className="container-luxury">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-tab flex-shrink-0 ${activeFilter === f ? 'active' : ''}`}
              >
                {f}
                {f === 'All' && (
                  <span className="ml-2 font-mono text-[0.55rem]">({projects.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="section-padding bg-ivory">
        <div className="container-luxury">
          <AnimatePresence mode="wait">
            {(filtered.length > 0 || showUpcoming) ? (
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} />
                  ))}
                  {showUpcoming && (
                    <motion.div
                      key="upcoming"
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: filtered.length * 0.07 }}
                    >
                      <UpcomingCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-3xl text-charcoal font-light mb-3">No projects yet</p>
                <p className="font-body text-stone">Check back soon for new announcements.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
