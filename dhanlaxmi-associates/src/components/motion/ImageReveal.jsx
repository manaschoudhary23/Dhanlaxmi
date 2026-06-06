import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ImageReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1.1,
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const clipMap = {
      up:    { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
      down:  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
      left:  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
      right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: clipMap[direction].from },
        {
          clipPath: clipMap[direction].to,
          duration,
          ease: 'power3.inOut',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
      const inner = el.querySelector('img, video');
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.12 },
          {
            scale: 1,
            duration: duration + 0.3,
            ease: 'power2.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [direction, delay, duration]);

  return (
    <div
      ref={wrapperRef}
      className={`img-reveal-wrapper ${className}`}
      style={{ clipPath: 'inset(100% 0 0 0)' }}
    >
      {children}
    </div>
  );
}
