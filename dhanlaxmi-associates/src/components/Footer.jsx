import { Link } from 'react-router-dom';

const footerLinks = {
  Projects: [
    { label: 'All Projects',   href: '/projects' },
    { label: 'Ongoing',        href: '/projects?filter=ongoing' },
    { label: 'Completed',      href: '/projects?filter=completed' },
    { label: 'OM Building',    href: '/projects/om-building' },
  ],
  Company: [
    { label: 'About Us',       href: '/about' },
    { label: 'Our Philosophy', href: '/about#philosophy' },
    { label: 'Gallery',        href: '/gallery' },
    { label: 'Contact',        href: '/contact' },
  ],
  Legal: [
    { label: 'RERA Disclosures', href: '#' },
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Terms of Use',     href: '#' },
  ],
};

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      {/* Main footer grid */}
      <div className="container-luxury py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <p className="font-cinzel text-base tracking-[0.25em] text-ivory uppercase mb-1">Dhanlaxmi</p>
              <p className="font-mono text-[0.625rem] tracking-[0.3em] text-stone-light uppercase">Associates</p>
            </div>
            <p className="font-body text-sm leading-relaxed text-stone-light max-w-xs">
              Building premium residential spaces in Pune since 2008. Trusted by hundreds of families for quality, transparency, and timeless design.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-stone-light hover:text-sage transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-sage flex-shrink-0">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                +91 99999 99999
              </a>
              <a href="mailto:info@dhanlaxmi.in" className="flex items-center gap-3 text-sm text-stone-light hover:text-sage transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-sage flex-shrink-0">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                info@dhanlaxmi.in
              </a>
              <p className="flex items-start gap-3 text-sm text-stone-light">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-sage flex-shrink-0 mt-0.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Kothrud, Pune — 411 038, Maharashtra
              </p>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-charcoal-mid flex items-center justify-center text-stone-light hover:text-ivory hover:border-sage transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-6 lg:col-start-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-stone mb-5">{group}</p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-stone-light hover:text-ivory transition-colors duration-300 font-body"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RERA Band */}
      <div className="border-t border-charcoal-mid">
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[0.625rem] tracking-[0.15em] text-stone uppercase">
            RERA Reg. No: <span className="text-sage">P52100099881</span> (OM Building) · MahaRERA registered
          </p>
          <p className="font-mono text-[0.625rem] tracking-[0.12em] text-stone/60 uppercase">
            © {new Date().getFullYear()} Dhanlaxmi Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
