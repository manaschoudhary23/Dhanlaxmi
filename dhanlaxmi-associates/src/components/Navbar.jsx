import { Link, NavLink } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const navItems = [
  { to: '/',                   label: 'Home' },
  { to: '/about',              label: 'About' },
  { to: '/ongoing-projects',   label: 'Ongoing Projects' },
  { to: '/completed-projects', label: 'Completed Projects' },
  { to: '/gallery',            label: 'Gallery' },
  { to: '/contact',            label: 'Contact' },
]

export function Navbar({ onMenu, onEnquire }) {
  const [scrollY, setScrollY] = useState(0)
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      if (y < 80) {
        setShowNav(true)
      } else if (y > lastY + 4) {
        setShowNav(false)
      } else if (y < lastY - 4) {
        setShowNav(true)
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transition thresholds
  const START = 30
  const END = 160

  // Scroll progress 0→1 over [START, END] range
  const progress = Math.min(1, Math.max(0, (scrollY - START) / (END - START)))

  // Background opacity: 0 at top → 0.92 at END
  const bgAlpha = progress * 0.92

  // Text brightness: white (255) at top → charcoal at END
  const isScrolled = scrollY > END

  // Gold separator line under logo appears gradually
  const dividerOpacity = progress

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: showNav ? 0 : -90, opacity: showNav ? 1 : 0.98 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Dynamic glass background */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          background: `rgba(247, 245, 242, ${bgAlpha})`,
          backdropFilter: progress > 0.1 ? `blur(${progress * 22}px) saturate(${1 + progress * 0.6})` : 'none',
          WebkitBackdropFilter: progress > 0.1 ? `blur(${progress * 22}px) saturate(${1 + progress * 0.6})` : 'none',
          borderBottom: `1px solid rgba(198, 166, 106, ${progress * 0.2})`,
          boxShadow: progress > 0.4 ? `0 4px 30px rgba(44, 40, 30, ${progress * 0.08})` : 'none',
        }}
      />

      <div className="container-x relative flex h-[72px] items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="group flex items-center gap-3 py-2" aria-label="Dhanlaxmi Associates — Home">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))' }}
          >
            <span className="text-xs font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>D</span>
          </div>

          <div className="relative flex flex-col leading-none">
            <span
              className="text-[0.58rem] font-medium tracking-[0.32em] transition-colors duration-300"
              style={{ color: isScrolled ? 'var(--olive)' : 'rgba(247,245,242,0.65)' }}
            >
              DHANLAXMI
            </span>
            <span
              className="text-[0.95rem] font-semibold tracking-[0.12em] transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-heading)',
                color: isScrolled ? 'var(--charcoal)' : 'var(--ivory)',
              }}
            >
              ASSOCIATES
            </span>
            {/* Gold underline — fades in as scrolled */}
            <span
              className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light), transparent)',
                opacity: dividerOpacity * 0.7,
              }}
            />
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="group relative py-1 text-[0.78rem] font-medium tracking-[0.04em] transition-colors duration-300"
              style={({ isActive }) => ({
                color: isScrolled
                  ? isActive ? 'var(--charcoal)' : 'var(--olive)'
                  : isActive ? 'var(--ivory)' : 'rgba(247,245,242,0.75)',
                textDecoration: 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {/* Gold underline indicator */}
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-400"
                    style={{
                      background: 'var(--gold)',
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                  {/* Hover underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] rounded-full scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                    style={{
                      background: isScrolled ? 'var(--gold)' : 'rgba(247,245,242,0.6)',
                      display: !isActive ? 'block' : 'none',
                    }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          {/* Enquire CTA — changes style with scroll */}
          <motion.button
            type="button"
            onClick={onEnquire}
            className="hidden items-center gap-2 rounded-full text-[0.72rem] font-medium tracking-[0.06em] uppercase sm:inline-flex"
            style={{
              padding: '0.6rem 1.4rem',
              background: isScrolled
                ? 'var(--gold)'
                : 'rgba(255,255,255,0.12)',
              color: 'var(--white)',
              border: isScrolled
                ? '1.5px solid var(--gold)'
                : '1.5px solid rgba(255,255,255,0.4)',
              backdropFilter: isScrolled ? 'none' : 'blur(8px)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Book Site Visit
          </motion.button>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={onMenu}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl transition-all duration-300 lg:hidden"
            style={{
              background: isScrolled ? 'var(--white)' : 'rgba(255,255,255,0.08)',
              border: '1px solid',
              borderColor: isScrolled ? 'rgba(198,166,106,0.2)' : 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full transition-colors duration-300"
                style={{
                  height: '1.5px',
                  width: i === 1 ? '1rem' : '1.25rem',
                  background: isScrolled ? 'var(--charcoal)' : 'rgba(247,245,242,0.9)',
                  opacity: i === 1 ? 0.6 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </motion.header>
  )
}
