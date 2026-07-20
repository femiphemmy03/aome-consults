import { Link } from 'react-router-dom';
import logo from '../assets/images/aome-logo.jpg';
import { useSettings } from '../context/SettingsContext.jsx';

export default function Footer() {
  const { settings } = useSettings();

  const socials = [
    { label: 'Facebook', url: settings.facebook_url },
    { label: 'Instagram', url: settings.instagram_url },
    { label: 'LinkedIn', url: settings.linkedin_url },
    { label: 'TikTok', url: settings.tiktok_url },
    { label: 'YouTube', url: settings.youtube_url }
  ].filter((s) => s.url);

  return (
    <footer className="bg-teal-700 text-cream-100">
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-8 md:grid-cols-3">
        <div>
          <img src={logo} alt="Aome Consults logo" className="h-10 rounded-md mb-3" />
          <p className="font-display italic text-gold-300 mb-2">
            Healing Minds. Strengthening Relationships. Transforming Lives.
          </p>
          <p className="text-xs text-teal-100/70 leading-relaxed">
            Professional psychological services, coaching and Schema Intelligence™
            with Barr. Dr. Maria Esele Abraham.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-1">Navigate</p>
          <Link to="/services" className="hover:text-gold-300 transition-colors">Services</Link>
          <Link to="/books" className="hover:text-gold-300 transition-colors">Books</Link>
          <Link to="/blog" className="hover:text-gold-300 transition-colors">Journal</Link>
          <Link to="/book" className="hover:text-gold-300 transition-colors">Book a Session</Link>
          <Link to="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
        </div>

        <div className="text-sm">
          <p className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-2">Get in Touch</p>
          <a
            href="mailto:aomeconsults@gmail.com"
            className="block font-semibold mb-1 hover:text-gold-300 transition-colors"
          >
            aomeconsults@gmail.com
          </a>
          <p className="text-teal-100 mb-4">aomeconsults.com</p>

          {socials.length > 0 && (
            <>
              <p className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-2">Follow</p>
              <div className="flex gap-2 flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-teal-100/70 py-5 px-5">
        <p>
          &copy; {new Date().getFullYear()} Aome Consults Limited. CAC Reg. No. 9031236. All rights reserved.
        </p>
        <p className="mt-1">
          <Link to="/privacy" className="underline hover:text-gold-300 transition-colors">Privacy Policy</Link>
          {' '}&middot;{' '}
          <a href="mailto:aomeconsults@gmail.com" className="underline hover:text-gold-300 transition-colors">
            Contact Us
          </a>
        </p>
      </div>
    </footer>
  );
}
