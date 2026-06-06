import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug } from '../data/projects';
import { TextReveal } from '../components/motion/TextReveal';
import { ImageReveal } from '../components/motion/ImageReveal';
import { AmenitiesWheel } from '../components/AmenitiesWheel';
import { FloorPlanViewer } from '../components/FloorPlanViewer';
import { GalleryGrid } from '../components/GalleryGrid';

gsap.registerPlugin(ScrollTrigger);

/* ─── Lightbox ─────────────────────────────────── */
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(c => Math.min(c + 1, images.length - 1));
      if (e.key === 'ArrowLeft')  setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[6000] bg-charcoal/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.img
        key={current}
        src={images[current]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        onClick={e => e.stopPropagation()}
      />
      {/* Nav */}
      {current > 0 && (
        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/10 transition-colors"
          onClick={e => { e.stopPropagation(); setCurrent(c => c - 1); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      {current < images.length - 1 && (
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/10 transition-colors"
          onClick={e => { e.stopPropagation(); setCurrent(c => c + 1); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      )}
      {/* Close */}
      <button
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/10 transition-colors"
        onClick={onClose}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-widest text-ivory/40">
        {current + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/* ─── Sticky Facts Bar ──────────────────────────── */
function StickyFactsBar({ project }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-[72px] left-0 right-0 z-[400] glass border-b border-mist/40"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container-luxury py-3 flex flex-wrap items-center gap-6 overflow-x-auto">
            <span className="font-cinzel text-xs tracking-[0.2em] text-charcoal uppercase flex-shrink-0">{project.name}</span>
            <span className="w-px h-4 bg-mist flex-shrink-0" />
            {project.unitTypes?.map((u) => (
              <span key={u} className="font-mono text-[0.625rem] tracking-widest uppercase text-stone flex-shrink-0">{u}</span>
            ))}
            <span className="w-px h-4 bg-mist flex-shrink-0 hidden sm:block" />
            <span className={`font-mono text-[0.625rem] tracking-widest uppercase flex-shrink-0 px-2 py-0.5 rounded-sm ${project.status === 'Ongoing' ? 'bg-terracotta/20 text-terracotta' : 'bg-sage-mist text-sage-deep'}`}>
              {project.status}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Location Card ─────────────────────────────── */
function LocationCard({ category, items }) {
  const icons = {
    transportation: '🚇', healthcare: '🏥', schools: '🎓', shopping: '🛍️', restaurants: '🍽️'
  };
  return (
    <div className="border border-mist rounded-sm p-5 bg-ivory">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{icons[category] || '📍'}</span>
        <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-stone">{category}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="font-body text-xs text-stone-dark">{item.name}</span>
            <span className="font-mono text-[0.6rem] tracking-widest text-sage">{item.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Enquiry Form ──────────────────────────────── */
function EnquiryFormInline({ projectName }) {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({ name: '', phone: '', email: '', unit: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submit
    setTimeout(() => setSubmitted(true), 500);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-12 h-12 rounded-full bg-sage-mist flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E6652" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="font-display text-xl text-charcoal font-light mb-2">Thank you!</p>
        <p className="font-body text-sm text-stone">Our team will get in touch with you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-field">
          <label className="form-label">Full Name</label>
          <input className="form-input" placeholder="Your name" required value={data.name} onChange={e => setData(d => ({...d, name: e.target.value}))} />
        </div>
        <div className="form-field">
          <label className="form-label">Phone</label>
          <input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX" required value={data.phone} onChange={e => setData(d => ({...d, phone: e.target.value}))} />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" placeholder="you@email.com" value={data.email} onChange={e => setData(d => ({...d, email: e.target.value}))} />
      </div>
      <div className="form-field">
        <label className="form-label">Unit Type of Interest</label>
        <select className="form-input" value={data.unit} onChange={e => setData(d => ({...d, unit: e.target.value}))}>
          <option value="">Select unit type</option>
          <option>2BHK</option>
          <option>3BHK</option>
          <option>4BHK</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Message (optional)</label>
        <textarea className="form-input resize-none" rows={3} placeholder="Any specific requirements..." value={data.message} onChange={e => setData(d => ({...d, message: e.target.value}))} />
      </div>
      <button type="submit" className="btn-primary self-start">
        <span>Send Enquiry</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
      </button>
    </form>
  );
}

/* ─── MAIN EXPORT ───────────────────────────────── */
export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : null;
  const heroRef = useRef(null);
  const [floorPlanOpen, setFloorPlanOpen] = useState(false);
  const [floorPlanIndex, setFloorPlanIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.detail-hero-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  if (!project) return <Navigate to="/projects" replace />;

  const hasGallery   = project.gallery && project.gallery.length > 0;
  const hasFloorPlans= project.floorPlans && project.floorPlans.length > 0;
  const hasLocation  = project.locationDetails;

  return (
    <>
      <Helmet>
        <title>{project.name} — Dhanlaxmi Associates</title>
        <meta name="description" content={`${project.name} — ${project.tagline}. RERA: ${project.reraNumber}`} />
        <meta property="og:title" content={`${project.name} by Dhanlaxmi Associates`} />
        <meta property="og:description" content={project.description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": project.name,
          "description": project.description,
          "address": { "@type": "PostalAddress", "addressLocality": project.area, "addressRegion": "Pune", "addressCountry": "IN" },
        })}</script>
      </Helmet>

      <StickyFactsBar project={project} />

      {/* ── Hero ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <div className="detail-hero-bg absolute inset-0 scale-110">
          {hasGallery ? (
            <img src={project.gallery[0]} alt={project.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #2D3A2E 0%, #4E6652 40%, #3D3A36 100%)' }} />
          )}
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(37,35,32,0.92) 0%, rgba(37,35,32,0.4) 50%, rgba(37,35,32,0.2) 100%)' }} />

        <div className="relative z-10 container-luxury pb-20 pt-40">
          <div className="section-label !text-sage mb-6">{project.area} · Pune</div>
          <TextReveal
            as="h1"
            className="font-display text-fluid-6xl text-ivory font-light leading-none tracking-tight mb-4 max-w-4xl"
          >
            {project.name}
          </TextReveal>
          <p className="font-display italic text-fluid-xl text-sage-light font-light mb-8">{project.tagline}</p>
          <div className="flex flex-wrap gap-6 items-center">
            <span className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase px-3 py-1.5 rounded-sm ${project.status === 'Ongoing' ? 'bg-terracotta/80 text-ivory' : 'bg-sage/80 text-ivory'}`}>
              {project.status}
            </span>
            <span className="font-mono text-[0.625rem] tracking-widest text-ivory/40 uppercase">RERA: {project.reraNumber}</span>
          </div>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────── */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="section-label mb-8">Overview</div>
            <TextReveal
              as="h2"
              className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-6"
              trigger="section"
            >
              A residence defined by precision and purpose
            </TextReveal>
            <p className="font-body text-stone-dark text-fluid-base leading-relaxed">{project.description}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="bg-ivory-dark rounded-sm p-7 flex flex-col gap-5">
              <div>
                <p className="section-label !text-stone mb-2 text-xs">Unit Types</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.unitTypes?.map((u) => (
                    <span key={u} className="font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border border-mist rounded-sm text-stone-dark">{u}</span>
                  ))}
                </div>
              </div>
              <div className="w-full h-px bg-mist" />
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-stone mb-1">RERA Number</p>
                <p className="font-mono text-xs text-charcoal tracking-wide">{project.reraNumber}</p>
              </div>
              <div className="w-full h-px bg-mist" />
              <a
                href={project.brochureUrl || '#'}
                className="btn-outline text-center justify-center"
                download
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Amenities ────────────────────────────── */}
      {project.amenities?.length > 0 && (
        <section className="section-padding bg-ivory-dark">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <div className="section-label justify-center mb-6">Amenities</div>
              <TextReveal
                as="h2"
                className="font-display text-fluid-4xl text-charcoal font-light leading-tight"
                trigger="section"
              >
                Every detail considered
              </TextReveal>
            </div>
            <AmenitiesWheel amenities={project.amenities} />
          </div>
        </section>
      )}

      {/* ── Location ─────────────────────────────── */}
      {hasLocation && (
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="section-label mb-8">Location</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Text */}
              <div>
                <TextReveal
                  as="h2"
                  className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-6"
                  trigger="section"
                >
                  Connected to everything that matters
                </TextReveal>
                <p className="font-body text-stone-dark text-fluid-base leading-relaxed mb-8">{project.location}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(project.locationDetails).map(([cat, items]) => (
                    <LocationCard key={cat} category={cat} items={items} />
                  ))}
                </div>
                <a
                  href={project.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-6 inline-flex"
                >
                  <span>Get Directions</span>
                  <svg className="arrow" width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
              {/* Map */}
              <div className="rounded-sm overflow-hidden border border-mist" style={{ height: '480px' }}>
                <iframe
                  src={project.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title={`${project.name} location map`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Floor Plans ──────────────────────────── */}
      {hasFloorPlans && (
        <section className="section-padding bg-charcoal">
          <div className="container-luxury">
            <div className="section-label !text-sage mb-8">Floor Plans</div>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
              <TextReveal
                as="h2"
                className="font-display text-fluid-4xl text-ivory font-light leading-tight max-w-xl"
                trigger="section"
              >
                Spaces designed for how you live
              </TextReveal>
              <p className="font-body text-stone text-fluid-base leading-relaxed max-w-md">
                Each configuration is thoughtfully planned to maximize natural light, ventilation, and the flow of daily life.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.floorPlans.map((plan, i) => (
                <motion.button
                  key={plan.label}
                  className="group text-left border border-charcoal-mid rounded-sm p-6 hover:border-sage transition-colors duration-400 bg-charcoal-mid/30"
                  onClick={() => { setFloorPlanIndex(i); setFloorPlanOpen(true); }}
                  data-cursor="Open"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.image && (
                    <div className="aspect-[4/3] rounded-sm overflow-hidden mb-5 bg-charcoal-mid">
                      <img src={plan.image} alt={plan.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display text-fluid-xl text-ivory font-light mb-1">{plan.label}</p>
                      <p className="font-mono text-[0.625rem] tracking-widest text-stone uppercase">{plan.area}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-charcoal-mid group-hover:border-sage flex items-center justify-center text-stone group-hover:text-sage transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ──────────────────────────────── */}
      {hasGallery && project.gallery.length > 1 && (
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="section-label mb-8">Gallery</div>
            <TextReveal
              as="h2"
              className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-12"
              trigger="section"
            >
              See it in detail
            </TextReveal>
            <GalleryGrid
              images={project.gallery}
              onImageClick={(i) => setLightboxIndex(i)}
            />
          </div>
        </section>
      )}

      {/* ── Enquiry CTA ──────────────────────────── */}
      <section className="section-padding bg-ivory-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="section-label mb-8">Enquire</div>
              <TextReveal
                as="h2"
                className="font-display text-fluid-4xl text-charcoal font-light leading-tight mb-6"
                trigger="section"
              >
                Make this your address
              </TextReveal>
              <p className="font-body text-stone-dark leading-relaxed mb-8">
                Our team is ready to answer your questions, arrange a private site visit, and guide you through the buying journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8 lg:mt-0">
                <a href="tel:+919999999999" className="btn-primary w-full sm:w-auto justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                  <span>Call Now</span>
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto justify-center" style={{ borderColor: '#25D366', color: '#25D366' }}>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div>
              <EnquiryFormInline projectName={project.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {floorPlanOpen && hasFloorPlans && (
          <FloorPlanViewer
            plans={project.floorPlans}
            initialIndex={floorPlanIndex}
            onClose={() => setFloorPlanOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxIndex !== null && hasGallery && (
          <Lightbox
            images={project.gallery}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
