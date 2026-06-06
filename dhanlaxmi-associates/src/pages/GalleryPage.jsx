import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../components/motion/TextReveal';
import { GalleryGrid } from '../components/GalleryGrid';
import { projects } from '../data/projects';

// Collect all gallery images from all projects
const allImages = projects.flatMap(p => p.gallery || []);
// Add some variety
const extendedImages = allImages.length > 0
  ? [...allImages, ...allImages, ...allImages].slice(0, Math.max(allImages.length, 6))
  : [];

function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  return (
    <motion.div
      className="fixed inset-0 z-[6000] bg-charcoal/96 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.img
        key={current}
        src={images[current]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain"
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        onClick={e => e.stopPropagation()}
      />
      {current > 0 && (
        <button className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/10 transition-colors"
          onClick={e => { e.stopPropagation(); setCurrent(c => c - 1); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      {current < images.length - 1 && (
        <button className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/10 transition-colors"
          onClick={e => { e.stopPropagation(); setCurrent(c => c + 1); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      )}
      <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-ivory/20 text-ivory flex items-center justify-center hover:bg-ivory/10 transition-colors" onClick={onClose}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-widest text-ivory/40">
        {current + 1} / {images.length}
      </div>
    </motion.div>
  );
}

export function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const displayImages = extendedImages.length > 0
    ? extendedImages
    : ['/images/building_1.jpg'];

  return (
    <>
      <Helmet>
        <title>Gallery — Dhanlaxmi Associates</title>
        <meta name="description" content="Explore the gallery of Dhanlaxmi Associates — architectural photography, project interiors, and construction quality." />
      </Helmet>

      {/* Header */}
      <div className="pt-36 pb-16 bg-ivory border-b border-mist">
        <div className="container-luxury">
          <div className="section-label mb-6">Visual Archive</div>
          <TextReveal
            as="h1"
            className="font-display text-fluid-5xl text-charcoal font-light leading-tight"
            trigger="section"
          >
            Gallery
          </TextReveal>
          <p className="font-body text-stone-dark text-fluid-base leading-relaxed mt-6 max-w-xl">
            A curated collection of architectural moments — interiors crafted with intention, exteriors built to endure.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          {displayImages.length > 0 ? (
            <GalleryGrid
              images={displayImages}
              onImageClick={(i) => setLightboxIndex(i)}
            />
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-charcoal font-light mb-2">Gallery Coming Soon</p>
              <p className="font-body text-stone">We're curating our portfolio — check back shortly.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={displayImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
