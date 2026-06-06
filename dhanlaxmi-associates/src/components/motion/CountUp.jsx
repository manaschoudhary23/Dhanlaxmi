import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

export function CountUp({
  end,
  suffix = '',
  prefix = '',
  duration = 2.2,
  className = '',
  decimals = 0,
}) {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const obj = useRef({ val: 0 });
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    tweenRef.current = gsap.to(obj.current, {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate: function() {
        setValue(parseFloat(obj.current.val.toFixed(decimals)));
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [inView, end, duration, decimals]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString('en-IN');

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
