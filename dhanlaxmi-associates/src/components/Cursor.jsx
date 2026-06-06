import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [, setLabel] = useState('');

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = (e) => {
      const isInteractive = e.target.closest('a, button, [data-cursor]');
      if (isInteractive) {
        ring.classList.add('hovering');
        setLabel(isInteractive.dataset?.cursor || '');
      }
    };

    const onLeave = (e) => {
      const isInteractive = e.target.closest('a, button, [data-cursor]');
      if (isInteractive) {
        ring.classList.remove('hovering');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
