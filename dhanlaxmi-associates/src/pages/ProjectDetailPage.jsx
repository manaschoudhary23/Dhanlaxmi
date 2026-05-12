import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { getProjectBySlug } from '../data/projects.js'
import { sendEnquiry } from '../lib/sendEnquiry.js'
import { Reveal } from '../components/Reveal.jsx'

/* ── helpers ─────────────────────────────────────────────── */
const LOC_GROUPS = [
  { key: 'transportation', label: 'Transportation', icon: '🚌' },
  { key: 'healthcare',     label: 'Healthcare',     icon: '🏥' },
  { key: 'schools',        label: 'Schools & Colleges', icon: '🎓' },
  { key: 'shopping',       label: 'Shopping',       icon: '🛍️' },
  { key: 'restaurants',    label: 'Dining',         icon: '🍽️' },
]

const AMENITY_ICONS = {
  CCTV: '📹', Security: '🛡️', Fire: '🔥', Rainwater: '💧',
  Solar: '☀️', Lift: '🛗', Lobby: '🏛️', Power: '⚡',
}
const amenityIcon = (l) => {
  for (const [k, v] of Object.entries(AMENITY_ICONS)) if (l.includes(k)) return v
  return '◈'
}

/* ── lightbox ─────────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, onNext, onPrev])
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: 'rgba(14,10,4,0.95)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <motion.div className="relative z-10 w-full max-w-5xl"
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <img src={images[index]} alt={`Gallery ${index + 1}`}
          className="max-h-[80vh] w-full rounded-2xl object-contain" />
        <div className="mt-4 flex items-center justify-between px-1">
          <span className="text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>{index + 1} / {images.length}</span>
          <div className="flex gap-2">
            {[['← Prev', onPrev], ['Next →', onNext], ['✕ Close', onClose]].map(([l, fn]) => (
              <button key={l} onClick={fn}
                className="rounded-full border px-4 py-2 text-xs text-white transition hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}>{l}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── enquiry form ─────────────────────────────────────────── */
function ProjectEnquiryForm({ project }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', unit: project.unitTypes?.[0] || '', message: '', agree: false })
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email || !form.agree)
      return setStatus({ type: 'error', message: 'Please fill required fields and accept terms.' })
    if (form.phone.replace(/\D/g, '').length < 10)
      return setStatus({ type: 'error', message: 'Enter a valid 10-digit phone number.' })
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setStatus({ type: 'error', message: 'Enter a valid email address.' })
    try {
      setStatus({ type: 'loading', message: 'Submitting…' })
      await sendEnquiry({
        fullName: form.name, phone: form.phone, email: form.email,
        projectInterestedIn: `${project.name} (${form.unit})`,
        subject: `Enquiry – ${project.name}`,
        message: form.message, source: 'project-detail-page',
      })
      setStatus({ type: 'success', message: '✓ Enquiry submitted! We\'ll reach out within 24 hours.' })
      setForm((f) => ({ ...f, name: '', phone: '', email: '', message: '', agree: false }))
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  const inp = 'lux-input'
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--olive)' }}>Name *</label>
          <input className={inp} placeholder="Full name" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--olive)' }}>Phone *</label>
          <input className={inp} placeholder="+91 9XXXXXXXXX" inputMode="tel" value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/[^\d+]/g, '') }))} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--olive)' }}>Email *</label>
        <input type="email" className={inp} placeholder="you@example.com" value={form.email} onChange={set('email')} />
      </div>
      {(project.unitTypes || []).length > 0 && (
        <div>
          <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--olive)' }}>Unit Type</label>
          <select className="lux-select" value={form.unit} onChange={set('unit')}>
            {project.unitTypes.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--olive)' }}>Message</label>
        <textarea className="lux-textarea" placeholder="Budget, preferred floor, schedule…" value={form.message} onChange={set('message')} />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-xs" style={{ color: 'var(--olive)' }}>
        <input type="checkbox" className="mt-0.5" checked={form.agree} onChange={set('agree')}
          style={{ accentColor: 'var(--gold)' }} />
        I agree to the <span className="underline underline-offset-2">Terms & Conditions</span> and Privacy Policy.
      </label>
      <button type="submit" disabled={status.type === 'loading'} className="btn-gold w-full">
        {status.type === 'loading' ? 'Submitting…' : 'Submit Enquiry'}
      </button>
      {status.type !== 'idle' && (
        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs text-center"
          style={{ color: status.type === 'success' ? '#4C7257' : status.type === 'error' ? '#c0392b' : 'var(--olive)' }}>
          {status.message}
        </motion.p>
      )}
    </form>
  )
}

/* ── main page ─────────────────────────────────────────────── */
export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const gallery = useMemo(() => project?.gallery ?? [], [project])
  const floorPlans = useMemo(() => project?.floorPlans ?? [], [project])
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [fpIdx, setFpIdx] = useState(null)

  useEffect(() => {
    if (!project) return
    document.title = `${project.name} | Dhanlaxmi Associates`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content = project.description?.slice(0, 160) || ''
  }, [project])

  if (!project) return (
    <div className="container-x py-24 text-center">
      <h1 className="heading-lg mb-4">Project Not Found</h1>
      <Link to="/ongoing-projects" className="btn-gold">← Back to Projects</Link>
    </div>
  )

  const heroImage = gallery[0] || '/images/project_hero.png'
  const unitLabel = project.unitSize || (project.unitTypes || []).join(' / ')

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden" style={{ height: '70vh', minHeight: '480px' }} aria-label="Project hero">
        <img src={heroImage} alt={`${project.name} – exterior view`}
          className="absolute inset-0 h-full w-full object-cover" loading="eager"
          style={{ transform: 'scale(1.05)', transformOrigin: 'center' }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(30,24,14,0.2) 0%, rgba(30,24,14,0.6) 60%, rgba(20,16,8,0.9) 100%)'
        }} />
        <div className="container-x relative flex h-full flex-col justify-end pb-12">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-xs" style={{ color: 'rgba(247,245,242,0.45)' }} aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-ivory" style={{ color: 'rgba(247,245,242,0.45)' }}>Home</Link>
            <span>›</span>
            <Link to="/ongoing-projects" className="transition hover:text-ivory" style={{ color: 'rgba(247,245,242,0.45)' }}>Projects</Link>
            <span>›</span>
            <span style={{ color: 'rgba(247,245,242,0.75)' }}>{project.name}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="kicker mb-3" style={{ color: 'var(--gold)' }}>Dhanlaxmi Associates</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 400, letterSpacing: '-0.02em',
              color: 'var(--ivory)', lineHeight: 1.05,
            }}>{project.name}</h1>
            <p className="mt-2 text-sm" style={{ color: 'rgba(247,245,242,0.6)' }}>{project.location}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="badge-ongoing">{project.status}</span>
              {project.reraNumber && (
                <span className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(247,245,242,0.1)', color: 'rgba(247,245,242,0.6)', border: '1px solid rgba(247,245,242,0.15)' }}>
                  RERA: {project.reraNumber}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Overview Strip ── */}
      <section style={{ background: 'var(--charcoal)' }} aria-label="Project overview">
        <div className="container-x py-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              {[
                { l: 'Location', v: project.area },
                { l: 'Type', v: project.type },
                { l: 'Units', v: unitLabel },
                { l: 'Price', v: project.priceLabel },
              ].map((m) => m.v && (
                <div key={m.l}>
                  <div className="text-[10px] font-medium uppercase tracking-[0.2em] mb-0.5" style={{ color: 'rgba(247,245,242,0.4)' }}>{m.l}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--ivory)' }}>{m.v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={project.brochureUrl || '#'}
                className="btn-outline-light text-xs" style={{ padding: '0.6rem 1.25rem' }}>
                ↓ Brochure
              </a>
              {project.qrCode && (
                <div className="text-center">
                  <img src={project.qrCode} alt="QR Code" className="h-16 w-16 rounded-xl object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="section-py" style={{ background: 'var(--beige)' }} aria-label="Project description">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="kicker mb-4">About the Project</div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                lineHeight: 1.75,
                color: 'var(--olive)',
                fontWeight: 300,
              }}>
                {project.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section className="section-py" aria-label="Amenities">
        <div className="container-x">
          <Reveal>
            <div className="section-label"><span className="kicker">Features</span></div>
            <h2 className="heading-xl mb-10">Amenities & Features</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {(project.amenities || []).map((a, i) => (
              <Reveal key={a} delay={i * 0.04}>
                <div className="luxury-card flex flex-col items-center p-6 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                    style={{ background: 'rgba(198,166,106,0.1)', border: '1px solid rgba(198,166,106,0.2)' }}>
                    {amenityIcon(a)}
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: 'var(--charcoal)' }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {gallery.length > 0 && (
        <section style={{ background: 'var(--beige)' }} className="py-16" aria-label="Gallery">
          <div className="container-x mb-8">
            <Reveal>
              <div className="section-label"><span className="kicker">Gallery</span></div>
              <h2 className="heading-xl">Project Gallery</h2>
            </Reveal>
          </div>
          <div className="pl-5 sm:pl-8 lg:pl-[calc((100vw-1280px)/2+3rem)]">
            <Swiper modules={[Pagination, Autoplay, A11y]} spaceBetween={20} slidesPerView={1.2}
              pagination={{ clickable: true }} autoplay={{ delay: 4000, disableOnInteraction: true }}
              a11y={{ prevSlideMessage: 'Previous', nextSlideMessage: 'Next' }}
              breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.4 } }}
              className="!pb-10">
              {gallery.map((img, idx) => (
                <SwiperSlide key={`${img}-${idx}`}>
                  <button type="button" onClick={() => setLightboxIdx(idx)}
                    className="group block w-full overflow-hidden rounded-2xl focus:outline-none"
                    aria-label={`View gallery image ${idx + 1}`}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      <img src={img} alt={`${project.name} – gallery ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: 'rgba(46,46,46,0.35)' }}>
                        <span className="rounded-full px-4 py-2 text-xs font-medium"
                          style={{ background: 'rgba(247,245,242,0.9)', color: 'var(--charcoal)' }}>View Full ⤢</span>
                      </div>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ── Floor Plans ── */}
      {floorPlans.length > 0 && (
        <section className="section-py" aria-label="Floor plans">
          <div className="container-x">
            <Reveal>
              <div className="section-label"><span className="kicker">Floor Plans</span></div>
              <h2 className="heading-xl mb-10">Unit Configurations</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {floorPlans.map((plan, idx) => (
                <Reveal key={plan.code} delay={idx * 0.08}>
                  <button type="button" onClick={() => setFpIdx(idx)}
                    className="group w-full text-left" aria-label={`View ${plan.label} floor plan`}>
                    <div className="luxury-card overflow-hidden">
                      <div className="overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--beige)' }}>
                        <img src={plan.image} alt={`${plan.label} floor plan – ${plan.area}`}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy" />
                      </div>
                      <div className="p-5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--charcoal)' }}>{plan.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--olive)' }}>{plan.area}</div>
                        </div>
                        <span className="text-xs font-medium" style={{ color: 'var(--gold)' }}>View ⤢</span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Location ── */}
      <section style={{ background: 'var(--beige)' }} className="section-py" aria-label="Location and connectivity">
        <div className="container-x">
          <Reveal>
            <div className="section-label"><span className="kicker">Location</span></div>
            <h2 className="heading-xl mb-10">Location & Connectivity</h2>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-3xl" style={{ height: '420px', border: '1px solid rgba(198,166,106,0.15)' }}>
                <iframe title={`Map: ${project.name}`} src={project.mapEmbedUrl}
                  className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href={project.directionsUrl} target="_blank" rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--gold)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                Get Directions
              </a>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div className="grid gap-6 sm:grid-cols-2 content-start">
                {LOC_GROUPS.map(({ key, label, icon }) => {
                  const rows = project.locationDetails?.[key] || []
                  if (!rows.length) return null
                  return (
                    <article key={key}>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--gold)' }}>
                        {icon} {label}
                      </h3>
                      <ul className="space-y-2">
                        {rows.map((item) => (
                          <li key={item.name} className="flex justify-between text-sm">
                            <span style={{ color: 'var(--charcoal)' }}>{item.name}</span>
                            <span className="tabular-nums" style={{ color: 'var(--olive)' }}>{item.distance}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section className="section-py" aria-label="Project enquiry form">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <div className="text-center mb-10">
                <div className="kicker mb-3">Contact Us</div>
                <h2 className="heading-xl">Submit an Enquiry</h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--olive)' }}>
                  Our team will respond within 24 hours with detailed information.
                </p>
              </div>
              <div className="luxury-card p-8 sm:p-10">
                <ProjectEnquiryForm project={project} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIdx != null && (
          <Lightbox images={gallery} index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx((i) => (i - 1 + gallery.length) % gallery.length)}
            onNext={() => setLightboxIdx((i) => (i + 1) % gallery.length)} />
        )}
      </AnimatePresence>

      {/* Floor Plan Lightbox */}
      <AnimatePresence>
        {fpIdx != null && (
          <Lightbox images={floorPlans.map((p) => p.image)} index={fpIdx}
            onClose={() => setFpIdx(null)}
            onPrev={() => setFpIdx((i) => (i - 1 + floorPlans.length) % floorPlans.length)}
            onNext={() => setFpIdx((i) => (i + 1) % floorPlans.length)} />
        )}
      </AnimatePresence>
    </div>
  )
}
