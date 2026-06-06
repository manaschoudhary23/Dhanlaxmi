import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TextReveal({
  children,
  className = '',
  as: Tag = 'p',
  delay = 0,
  stagger = 0.05,
  trigger,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          delay,
          scrollTrigger: trigger
            ? {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children, delay, stagger, trigger]);

  const wordList = String(children).split(' ');

  return (
    <Tag ref={containerRef} className={className} aria-label={children}>
      {wordList.map((word, i) => (
        <span key={i} className="word-mask" style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}>
          <span className="word-inner" style={{ display: 'inline-block' }}>
            {word}
            {i < wordList.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
