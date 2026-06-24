import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Shown only on small screens, only after scrolling past the hero,
// and hidden on pages where it doesn't make sense (booking flow, admin).
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hiddenOn = ['/book', '/schedule', '/admin'];
  if (hiddenOn.some((path) => location.pathname.startsWith(path))) return null;

  return (
    <Link
      to="/book"
      className={`md:hidden fixed bottom-5 left-5 z-40 bg-gold-500 text-ink-900 font-bold text-sm px-5 py-3 rounded-full shadow-lg transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-24'
      }`}
    >
      Book a Session
    </Link>
  );
}
