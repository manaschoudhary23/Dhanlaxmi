import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completedProjects, ongoingProjects } from '../data/projects.js'
import { Reveal } from '../components/Reveal.jsx'

const allImages = [
  { src: '/images/project_hero.png', cat: 'Exterior', label: 'OM Building — Hero View' },
  { src: '/images/gallery_1.png',   cat: 'Interior',  label: 'OM Building — Living Space' },
  { src: '/images/gallery_2.png',   cat: 'Amenities', label: 'OM Building — Common Area' },
  { src: '/images/gallery_3.png',   cat: 'Exterior',  label: 'OM Building — Facade' },
  { src: '/images/image1.jpeg',     cat: 'Interior',  label: 'Premium Interior Design' },
  { src: '/images/image2.jpeg',     cat: 'Amenities', label: 'Lifestyle Amenities' },
]

const cats = ['All', 'Exterior', 'Interior', 'Amenities']

export function CompletedProjectsPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? allImages : allImages.filter((i) => i.cat === active)

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--charcoal)', minHeight: '46vh' }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(198,166,106,0.1), transparent 55%)' }} />
        <div className="gold-shimmer-line absolute bottom-0 left-0 right-0" />
        <div className="container-x relative flex min-h-[46vh] flex-col justify-end pb-14 pt-24">
          <Reveal>
            <div className="section-label">
              <span className="kicker" style={{ color: 'var(--gold)' }}>Portfolio</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)', lineHeight: 1.05,
            }}>
              Completed Projects
            </h1>
            <p className="mt-3 max-w-lg text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
              A showcase of our delivered residential portfolio — where design meets craftsmanship.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section-py" aria-label="Completed projects gallery">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 flex flex-wrap gap-3">
              {cats.map((c) => (
                <button key={c} type="button" onClick={() => setActive(c)}
                  className="rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all"
                  style={{
                    background: active === c ? 'var(--gold)' : 'var(--white)',
                    color: active === c ? 'var(--white)' : 'var(--charcoal)',
                    border: '1px solid',
                    borderColor: active === c ? 'var(--gold)' : 'rgba(198,166,106,0.25)',
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {completedProjects.length === 0 && filtered.length > 0 && (
            <Reveal>
              <div className="luxury-card mb-8 p-6 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'rgba(198,166,106,0.1)', color: 'var(--gold)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                </div>
                <p className="text-sm" style={{ color: 'var(--olive)' }}>
                  Showcasing gallery imagery from our ongoing project portfolio. Completed project pages will be added as handovers conclude.
                </p>
              </div>
            </Reveal>
          )}

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {filtered.map((img, i) => (
              <Reveal key={img.src + i} delay={i * 0.04} className="masonry-item">
                <button type="button" onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl"
                  style={{ border: '1px solid rgba(198,166,106,0.12)' }}
                  aria-label={`View ${img.label}`}>
                  <div className="img-zoom-wrap">
                    <img src={img.src} alt={img.label}
                      className="h-full w-full object-cover"
                      style={{ aspectRatio: i % 3 === 0 ? '4/5' : i % 2 === 0 ? '16/11' : '4/3' }}
                      loading="lazy" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(46,46,46,0.7), transparent)' }}>
                    <span className="badge-ongoing mb-1">{img.cat}</span>
                    <div className="text-xs font-medium" style={{ color: 'var(--ivory)' }}>{img.label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'rgba(247,245,242,0.6)' }}>Click to expand</div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: 'var(--beige)' }} className="section-py" aria-label="Client testimonials">
        <div className="container-x">
          <Reveal>
            <div className="section-label"><span className="kicker">Testimonials</span></div>
            <h2 className="heading-xl mb-10">Words from Our Clients</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: 'Priya N.', text: 'The quality of construction exceeded our expectations. The attention to detail in every corner is truly premium.', rating: 5 },
              { name: 'Vivek R.', text: 'Dhanlaxmi Associates delivered exactly what they promised. Professional team, transparent process, beautiful home.', rating: 5 },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="luxury-card p-8">
                  <div className="mb-4 flex gap-0.5">{[...Array(t.rating)].map((_, si) => <span key={si} style={{ color: 'var(--gold)' }}>★</span>)}</div>
                  <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                      style={{ background: 'rgba(198,166,106,0.12)', color: 'var(--gold)' }}>{t.name[0]}</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{t.name}</div>
                    <div className="ml-auto text-xs" style={{ color: 'var(--gold)' }}>Verified ✓</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            style={{ background: 'rgba(20,16,8,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <button className="absolute inset-0" onClick={() => setLightbox(null)} aria-label="Close" />
            <motion.div className="relative z-10 w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <img src={filtered[lightbox]?.src} alt={filtered[lightbox]?.label}
                className="max-h-[80vh] w-full rounded-2xl object-contain" />
              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-sm" style={{ color: 'rgba(247,245,242,0.6)' }}>
                  {lightbox + 1} / {filtered.length} — {filtered[lightbox]?.label}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setLightbox((l) => (l - 1 + filtered.length) % filtered.length)}
                    className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}>← Prev</button>
                  <button onClick={() => setLightbox((l) => (l + 1) % filtered.length)}
                    className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}>Next →</button>
                  <button onClick={() => setLightbox(null)}
                    className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}>✕</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
