import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isHome = location.pathname === '/';
  const alwaysDark = !isHome;

  return (
    <>
      <header className={`navbar ${scrolled || alwaysDark ? 'scrolled' : ''}`}>
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className={`font-cinzel text-sm tracking-[0.22em] uppercase transition-colors duration-300 ${scrolled || alwaysDark ? 'text-charcoal' : 'text-ivory-light'}`}>
              Dhanlaxmi
            </span>
            <span className={`font-mono text-[0.6rem] tracking-[0.3em] uppercase transition-colors duration-300 ${scrolled || alwaysDark ? 'text-stone' : 'text-ivory/70'}`}>
              Associates
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`navbar-link ${location.pathname === link.href ? 'active' : ''} ${scrolled || alwaysDark ? '!text-charcoal-light' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              className={`hidden lg:inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-body border px-5 py-2.5 rounded-sm transition-all duration-400 ease-luxury ${
                scrolled || alwaysDark
                  ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory-light'
                  : 'border-ivory/60 text-ivory hover:bg-ivory/10'
              }`}
            >
              Enquire
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 transition-colors duration-300 ${scrolled || alwaysDark ? 'text-charcoal' : 'text-ivory'}`}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-px w-full bg-current origin-center"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="block h-px w-full bg-current"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-px w-full bg-current origin-center"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-ivory-light z-[999] flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close */}
              <div className="flex justify-between items-center px-8 pt-8 pb-10">
                <span className="font-cinzel text-sm tracking-[0.2em] text-charcoal uppercase">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-8 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 border-b border-mist font-display text-3xl font-light tracking-tight text-charcoal hover:text-sage-deep transition-colors duration-300 ${location.pathname === link.href ? 'text-sage-deep' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer strip */}
              <div className="px-8 pb-10 pt-6">
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-stone uppercase mb-3">Get in touch</p>
                <a href="tel:+919999999999" className="block font-body text-sm text-charcoal hover:text-sage-deep transition-colors">+91 99999 99999</a>
                <a href="mailto:info@dhanlaxmi.in" className="block font-body text-sm text-stone mt-1 hover:text-sage-deep transition-colors">info@dhanlaxmi.in</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
