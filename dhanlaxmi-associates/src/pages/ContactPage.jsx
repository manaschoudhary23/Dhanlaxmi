import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'
import { sendEnquiry } from '../lib/sendEnquiry.js'

function validate(v) {
  const e = {}
  if (!v.fullName.trim()) e.fullName = 'Name is required.'
  if (!v.phone.trim()) e.phone = 'Phone is required.'
  else if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit number.'
  if (!v.email.trim()) e.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email.'
  if (!v.message.trim()) e.message = 'Message is required.'
  return e
}

export function ContactPage() {
  const [values, setValues] = useState({ fullName: '', phone: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const errors = validate(values)

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }))
  const showErr = (k) => touched[k] && errors[k]

  async function onSubmit(e) {
    e.preventDefault()
    setTouched({ fullName: true, phone: true, email: true, subject: true, message: true })
    if (Object.keys(errors).length) return setStatus({ type: 'error', message: 'Please fix the highlighted fields.' })
    try {
      setStatus({ type: 'loading', message: 'Sending…' })
      await sendEnquiry({ ...values, source: 'contact-page' })
      setStatus({ type: 'success', message: '✓ Message sent! We\'ll respond within 24 hours.' })
      setValues({ fullName: '', phone: '', email: '', subject: '', message: '' })
      setTouched({})
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--charcoal)', minHeight: '40vh' }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(198,166,106,0.1), transparent 55%)' }} />
        <div className="gold-shimmer-line absolute bottom-0 left-0 right-0" />
        <div className="container-x relative flex min-h-[40vh] flex-col justify-end pb-14 pt-24">
          <Reveal>
            <div className="section-label"><span className="kicker" style={{ color: 'var(--gold)' }}>Contact</span></div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 400, letterSpacing: '-0.02em',
              color: 'var(--ivory)', lineHeight: 1.05,
            }}>Get In Touch</h1>
            <p className="mt-3 max-w-lg text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
              Ready to begin? Reach out and our team will respond with curated recommendations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-py" aria-label="Contact form and details">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">

          {/* ── Form ── */}
          <Reveal direction="left">
            <div className="luxury-card overflow-hidden">
              <div className="px-8 py-7 relative overflow-hidden"
                style={{ background: 'var(--charcoal)' }}>
                <div className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(198,166,106,0.15), transparent 60%)' }} />
                <div className="relative">
                  <div className="kicker mb-2" style={{ color: 'var(--gold)' }}>Main Enquiry Form</div>
                  <h2 className="heading-md" style={{ color: 'var(--ivory)' }}>Tell Us What You Need</h2>
                  <p className="mt-2 text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
                    We respond within 24 hours — no spam, no pressure.
                  </p>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <LuxField label="Full Name *" id="cf-name" error={showErr('fullName') && errors.fullName}>
                      <input id="cf-name" className="lux-input" placeholder="Your full name"
                        value={values.fullName} onChange={set('fullName')} onBlur={touch('fullName')}
                        style={{ borderColor: showErr('fullName') ? 'rgba(220,80,80,0.5)' : '' }} />
                    </LuxField>
                    <LuxField label="Phone Number *" id="cf-phone" error={showErr('phone') && errors.phone}>
                      <input id="cf-phone" className="lux-input" placeholder="+91 9XXXXXXXXX"
                        inputMode="tel" value={values.phone}
                        onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value.replace(/[^\d+]/g, '') }))}
                        onBlur={touch('phone')}
                        style={{ borderColor: showErr('phone') ? 'rgba(220,80,80,0.5)' : '' }} />
                    </LuxField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <LuxField label="Email Address *" id="cf-email" error={showErr('email') && errors.email}>
                      <input id="cf-email" type="email" className="lux-input" placeholder="you@example.com"
                        value={values.email} onChange={set('email')} onBlur={touch('email')}
                        style={{ borderColor: showErr('email') ? 'rgba(220,80,80,0.5)' : '' }} />
                    </LuxField>
                    <LuxField label="Project Interest" id="cf-subject">
                      <input id="cf-subject" className="lux-input" placeholder="e.g. OM Building 3BHK"
                        value={values.subject} onChange={set('subject')} />
                    </LuxField>
                  </div>
                  <LuxField label="Message *" id="cf-msg" error={showErr('message') && errors.message}>
                    <textarea id="cf-msg" className="lux-textarea" placeholder="Your requirements, budget, preferred locations…"
                      value={values.message} onChange={set('message')} onBlur={touch('message')}
                      style={{ borderColor: showErr('message') ? 'rgba(220,80,80,0.5)' : '' }} />
                  </LuxField>
                  <motion.button type="submit"
                    className="btn-gold w-full"
                    whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }}
                    disabled={status.type === 'loading'}>
                    {status.type === 'loading' ? 'Sending…' : 'Send Message'}
                  </motion.button>
                  {status.type !== 'idle' && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-center"
                      style={{ color: status.type === 'success' ? '#4C7257' : status.type === 'error' ? '#c0392b' : 'var(--olive)' }}>
                      {status.message}
                    </motion.p>
                  )}
                </form>
              </div>
            </div>
          </Reveal>

          {/* ── Info Panel ── */}
          <Reveal direction="right" delay={0.1}>
            <div className="space-y-5">
              {/* Contact Info */}
              <div className="luxury-card p-7">
                <div className="kicker mb-5">Contact Information</div>
                <div className="space-y-4">
                  {[
                    { icon: '📍', label: 'Address', value: 'CTS 214, Near Ideal Colony Metro, Erandwane, Pune 411004' },
                    { icon: '📞', label: 'Phone', value: '+91 90000 00000', href: 'tel:+919000000000' },
                    { icon: '✉️', label: 'Email', value: 'hello@dhanlaxmiassociates.in', href: 'mailto:hello@dhanlaxmiassociates.in' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{c.icon}</span>
                      <div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] mb-0.5" style={{ color: 'var(--olive)' }}>{c.label}</div>
                        {c.href
                          ? <a href={c.href} className="text-sm font-medium transition hover:text-gold" style={{ color: 'var(--charcoal)' }}>{c.value}</a>
                          : <span className="text-sm" style={{ color: 'var(--charcoal)' }}>{c.value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(198,166,106,0.15)' }}>
                  <div className="kicker mb-3">Office Hours</div>
                  <div className="space-y-1.5 text-sm" style={{ color: 'var(--olive)' }}>
                    <div className="flex justify-between"><span>Mon – Sat</span><span style={{ color: 'var(--charcoal)' }}>10:00 – 19:30</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span style={{ color: 'var(--charcoal)' }}>By Appointment</span></div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/919000000000" target="_blank" rel="noreferrer"
                className="luxury-card flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:shadow-card-hover block">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>Chat on WhatsApp</div>
                  <div className="text-xs" style={{ color: 'var(--olive)' }}>Quick response · Mon–Sat</div>
                </div>
                <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              {/* Map */}
              <div className="overflow-hidden rounded-3xl" style={{ border: '1px solid rgba(198,166,106,0.15)', height: '260px' }}>
                <iframe
                  title="Dhanlaxmi Associates Office Location"
                  src="https://www.google.com/maps?q=Kothrud,Pune,Maharashtra&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a href="https://maps.google.com/?q=Kothrud,Pune" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium transition hover:opacity-80"
                style={{ color: 'var(--gold)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Get Directions on Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function LuxField({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium tracking-wide" style={{ color: 'var(--olive)' }}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs" style={{ color: '#c0392b' }}>{error}</p>}
    </div>
  )
}
