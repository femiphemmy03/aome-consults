import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children and fades/slides them up into view the first time
 * they intersect the viewport. Use for sections, cards, etc.
 */
export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Attach to a wrapper around a <LeafIcon /> to trigger its stroke
 * draw-in animation once it scrolls into view.
 */
export function useDrawOnView() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svg = el.querySelector('svg.leaf-mark');
    if (!svg) return;

    const shapes = svg.querySelectorAll('path, circle');
    shapes.forEach((shape) => {
      const length =
        shape.tagName === 'circle'
          ? 2 * Math.PI * parseFloat(shape.getAttribute('r'))
          : shape.getTotalLength();
      shape.style.strokeDasharray = length;
      shape.style.strokeDashoffset = length;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add('is-drawn');
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
