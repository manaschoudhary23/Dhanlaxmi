import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'

const galleryItems = [
  { src: '/images/project_hero.png', cat: 'Exterior',  label: 'OM Building — Facade', span: 'large' },
  { src: '/images/gallery_1.png',   cat: 'Interior',   label: 'Living Room Design' },
  { src: '/images/gallery_2.png',   cat: 'Amenities',  label: 'Common Amenity Space' },
  { src: '/images/gallery_3.png',   cat: 'Exterior',   label: 'Building Exterior' },
  { src: '/images/image1.jpeg',     cat: 'Interior',   label: 'Premium Interiors', span: 'large' },
  { src: '/images/image2.jpeg',     cat: 'Aerial',     label: 'Aerial View' },
  { src: '/images/gallery_1.png',   cat: 'Amenities',  label: 'Lobby & Entrance' },
  { src: '/images/gallery_2.png',   cat: 'Interior',   label: 'Bedroom Design' },
  { src: '/images/gallery_3.png',   cat: 'Exterior',   label: 'Evening Facade' },
]

const cats = ['All', 'Exterior', 'Interior', 'Amenities', 'Aerial']

export function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? galleryItems : galleryItems.filter((g) => g.cat === active)

  const prev = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox((i) => (i + 1) % filtered.length)

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--charcoal)', minHeight: '42vh' }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(198,166,106,0.1), transparent 55%)' }} />
        <div className="gold-shimmer-line absolute bottom-0 left-0 right-0" />
        <div className="container-x relative flex min-h-[42vh] flex-col justify-end pb-14 pt-24">
          <Reveal>
            <div className="section-label">
              <span className="kicker" style={{ color: 'var(--gold)' }}>Visual Gallery</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)', lineHeight: 1.05,
            }}>
              Gallery
            </h1>
            <p className="mt-3 max-w-lg text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
              An immersive visual tour through our premium developments — architecture, interiors, and lifestyle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="section-py" aria-label="Image gallery">
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
              <span className="ml-auto text-xs self-center" style={{ color: 'var(--olive)' }}>
                {filtered.length} image{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </Reveal>

          {/* Masonry */}
          <div className="masonry-grid">
            {filtered.map((img, i) => (
              <Reveal key={`${img.src}-${i}`} delay={i * 0.04} className="masonry-item">
                <motion.button
                  type="button"
                  className="group relative block w-full overflow-hidden rounded-2xl"
                  style={{ border: '1px solid rgba(198,166,106,0.12)' }}
                  onClick={() => setLightbox(i)}
                  aria-label={`Open ${img.label} in fullscreen`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="img-zoom-wrap">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="h-full w-full object-cover"
                      style={{ aspectRatio: img.span === 'large' ? '4/3' : i % 3 === 0 ? '4/5' : '16/10' }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'rgba(46,46,46,0.45)' }}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full mb-2"
                      style={{ background: 'rgba(247,245,242,0.9)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--ivory)' }}>View Full</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(46,46,46,0.6), transparent)' }}>
                    <span className="badge-ongoing mr-2">{img.cat}</span>
                    <span className="text-[11px]" style={{ color: 'var(--ivory)' }}>{img.label}</span>
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            style={{ background: 'rgba(14,10,4,0.95)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null) }}
          >
            <motion.div
              className="relative z-10 flex w-full max-w-5xl flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              key={lightbox}
            >
              <img
                src={filtered[lightbox]?.src}
                alt={filtered[lightbox]?.label}
                className="max-h-[78vh] w-full rounded-2xl object-contain"
              />
              <div className="mt-5 flex w-full items-center justify-between px-2">
                <div>
                  <span className="badge-ongoing mr-2">{filtered[lightbox]?.cat}</span>
                  <span className="text-sm" style={{ color: 'rgba(247,245,242,0.65)' }}>
                    {filtered[lightbox]?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs mr-2" style={{ color: 'rgba(247,245,242,0.35)' }}>
                    {lightbox + 1} / {filtered.length}
                  </span>
                  <button onClick={prev} className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}>← Prev</button>
                  <button onClick={next} className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}>Next →</button>
                  <button onClick={() => setLightbox(null)}
                    className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}>✕ Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
