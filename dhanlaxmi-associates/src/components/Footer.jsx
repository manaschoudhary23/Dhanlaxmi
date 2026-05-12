import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from './Reveal.jsx'

const quickLinks = [
  { to: '/',                   label: 'Home' },
  { to: '/about',              label: 'About Us' },
  { to: '/ongoing-projects',   label: 'Ongoing Projects' },
  { to: '/completed-projects', label: 'Completed Projects' },
  { to: '/gallery',            label: 'Gallery' },
  { to: '/contact',            label: 'Contact Us' },
]

const projectLinks = [
  { label: 'OM Building — Kothrud' },
  { label: 'Ongoing Projects' },
  { label: 'Upcoming Launches' },
  { label: 'Completed Portfolio' },
]

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

export function Footer({ onEnquire }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleNewsletter(e) {
    e.preventDefault()
    if (email.includes('@')) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--charcoal)' }}
      aria-label="Footer"
    >
      {/* Background gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(198,166,106,0.08) 0%, transparent 70%)' }} />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(198,166,106,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Gold shimmer line at top */}
      <div className="gold-shimmer-line" />

      <div className="container-x relative pb-0 pt-16 sm:pt-20">

        {/* Main Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-16">

          {/* ── Col 1: Branding ── */}
          <Reveal direction="up" delay={0}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))' }}>
                  <span className="text-sm font-bold text-white">D</span>
                </div>
                <div>
                  <div className="text-[0.58rem] font-medium tracking-[0.3em]"
                    style={{ color: 'var(--gold)', opacity: 0.7 }}>DHANLAXMI</div>
                  <div className="text-base font-semibold tracking-[0.1em] leading-none"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--ivory)' }}>
                    ASSOCIATES
                  </div>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed" style={{ color: 'rgba(247,245,242,0.55)' }}>
                Crafting premium residential spaces in Pune's most coveted locations. 
                Where luxury meets legacy.
              </p>

              {/* Contact Details */}
              <div className="mb-6 space-y-3">
                <a href="tel:+919000000000"
                  className="flex items-center gap-2.5 text-sm transition hover:opacity-100"
                  style={{ color: 'rgba(247,245,242,0.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  +91 90000 00000
                </a>
                <a href="mailto:hello@dhanlaxmiassociates.in"
                  className="flex items-center gap-2.5 text-sm transition hover:opacity-100"
                  style={{ color: 'rgba(247,245,242,0.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  hello@dhanlaxmiassociates.in
                </a>
                <div className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(247,245,242,0.55)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" className="mt-0.5 shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  CTS 214, Near Ideal Colony Metro,<br />Erandwane, Pune 411004
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium transition"
                style={{
                  background: 'rgba(37,211,102,0.12)',
                  border: '1px solid rgba(37,211,102,0.3)',
                  color: '#25D366',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* ── Col 2: Quick Links ── */}
          <Reveal direction="up" delay={0.08}>
            <div>
              <div className="kicker mb-5" style={{ color: 'var(--gold)' }}>Quick Links</div>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-2 text-sm transition"
                      style={{ color: 'rgba(247,245,242,0.55)' }}
                    >
                      <span className="block h-[1px] w-3 transition-all duration-300 group-hover:w-5"
                        style={{ background: 'var(--gold)' }} />
                      <span className="transition group-hover:text-ivory">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ── Col 3: Projects ── */}
          <Reveal direction="up" delay={0.12}>
            <div>
              <div className="kicker mb-5" style={{ color: 'var(--gold)' }}>Our Projects</div>
              <ul className="mb-8 space-y-3">
                {projectLinks.map((p) => (
                  <li key={p.label}>
                    <Link
                      to="/ongoing-projects"
                      className="group flex items-center gap-2 text-sm transition"
                      style={{ color: 'rgba(247,245,242,0.55)' }}
                    >
                      <span className="block h-[1px] w-3 transition-all duration-300 group-hover:w-5"
                        style={{ background: 'var(--gold)' }} />
                      <span className="transition group-hover:text-ivory">{p.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Office Hours */}
              <div className="kicker mb-3" style={{ color: 'var(--gold)' }}>Office Hours</div>
              <div className="space-y-1.5 text-sm" style={{ color: 'rgba(247,245,242,0.5)' }}>
                <div className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span style={{ color: 'rgba(247,245,242,0.75)' }}>10:00 – 19:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span style={{ color: 'rgba(247,245,242,0.75)' }}>By Appointment</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Col 4: Newsletter + Map ── */}
          <Reveal direction="up" delay={0.16}>
            <div>
              <div className="kicker mb-5" style={{ color: 'var(--gold)' }}>Stay Connected</div>

              {/* Newsletter Form */}
              <p className="mb-4 text-sm leading-relaxed" style={{ color: 'rgba(247,245,242,0.5)' }}>
                Get notified about new launches and exclusive offers.
              </p>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-4 text-sm text-center"
                  style={{ background: 'rgba(198,166,106,0.12)', border: '1px solid rgba(198,166,106,0.25)', color: 'var(--gold)' }}
                >
                  ✓ You're on the list!
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletter} className="mb-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                      style={{
                        background: 'rgba(247,245,242,0.06)',
                        border: '1px solid rgba(198,166,106,0.2)',
                        color: 'var(--ivory)',
                      }}
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-[11px] font-medium transition hover:opacity-90"
                      style={{ background: 'var(--gold)', color: 'var(--white)' }}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              )}

              {/* Enquire Button */}
              <button type="button" onClick={onEnquire} className="btn-gold w-full mb-6">
                Enquire Now
              </button>

              {/* Map Preview */}
              <div className="overflow-hidden rounded-xl" style={{ border: '1px solid rgba(198,166,106,0.15)', height: '120px' }}>
                <iframe
                  title="Dhanlaxmi Associates Location"
                  src="https://www.google.com/maps?q=Kothrud,Pune,Maharashtra&output=embed"
                  className="h-full w-full border-0 grayscale opacity-70"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=Kothrud,Pune"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-1.5 text-xs transition hover:opacity-100"
                style={{ color: 'var(--gold)', opacity: 0.8 }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>

        {/* Gold Divider */}
        <div className="gold-divider mt-14 mb-7" />

        {/* Social Icons Row */}
        <Reveal direction="up" delay={0.1}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition"
                  style={{
                    color: 'rgba(198,166,106,0.7)',
                    border: '1px solid rgba(198,166,106,0.2)',
                    background: 'rgba(198,166,106,0.05)',
                  }}
                  whileHover={{ scale: 1.1, color: 'var(--gold)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            <div className="text-[11px]" style={{ color: 'rgba(247,245,242,0.3)' }}>
              RERA Registered · ISO Certified Developer
            </div>
          </div>
        </Reveal>

        {/* Bottom Bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t py-5 text-[11px] sm:flex-row sm:items-center"
          style={{ borderColor: 'rgba(198,166,106,0.1)', color: 'rgba(247,245,242,0.3)' }}>
          <span>© {new Date().getFullYear()} Dhanlaxmi Associates. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="transition hover:opacity-70">Privacy Policy</Link>
            <Link to="/contact" className="transition hover:opacity-70">Terms & Conditions</Link>
            <Link to="/contact" className="transition hover:opacity-70">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
