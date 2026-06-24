import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/aome-logo.jpg';

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/services' },
  { label: 'Books', to: '/books' },
  { label: 'Blog', to: '/blog' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream-100/90 backdrop-blur border-b border-teal-700/10">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-6">
        <Link to="/" className="flex-shrink-0">
          {/* PLACEHOLDER logo — swap client/src/assets/images/aome-logo.jpg when final file arrives */}
          <img src={logo} alt="Aome Consults logo" className="h-11 w-auto rounded-lg" />
        </Link>

        <nav className="hidden md:flex flex-1 gap-7 font-semibold text-sm text-teal-900">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-gold-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/book" className="hidden md:inline-flex btn-primary btn-small flex-shrink-0">
          Book a Session
        </Link>

        <button
          className="md:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center ml-auto"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-6 bg-teal-900 rounded" />
          <span className="block h-0.5 w-6 bg-teal-900 rounded" />
          <span className="block h-0.5 w-6 bg-teal-900 rounded" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-cream-50 border-b border-teal-700/10 px-5 py-4 flex flex-col gap-4 font-semibold text-teal-900">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/book" onClick={() => setOpen(false)} className="btn-primary btn-small w-fit">
            Book a Session
          </Link>
        </nav>
      )}
    </header>
  );
}
