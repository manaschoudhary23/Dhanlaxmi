import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function GalleryGrid({ images, onImageClick }) {
  const heights = images.map((_, i) => {
    const pattern = [280, 360, 300, 420, 260, 380];
    return pattern[i % pattern.length];
  });

  return (
    <div className="gallery-masonry">
      {images.map((src, i) => (
        <GalleryItem
          key={src + i}
          src={src}
          index={i}
          height={heights[i]}
          onClick={() => onImageClick && onImageClick(i)}
        />
      ))}
    </div>
  );
}

function GalleryItem({ src, index, height, onClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="gallery-item"
      style={{ height }}
      onClick={onClick}
      data-cursor="View"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
    >
      <img
        src={src}
        alt={`Gallery image ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="gallery-item-overlay">
        <div className="flex flex-col items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
          <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-white/80">View</span>
        </div>
      </div>
    </motion.div>
  );
}
