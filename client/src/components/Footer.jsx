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
          <p className="font-display italic text-gold-300">Healing Minds. Strengthening Relationships. Transforming Lives.</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <Link to="/services" className="hover:text-gold-300">Services</Link>
          <Link to="/books" className="hover:text-gold-300">Books</Link>
          <Link to="/blog" className="hover:text-gold-300">Blog</Link>
          <Link to="/book" className="hover:text-gold-300">Book a Session</Link>
        </div>

        <div className="text-sm">
          <a href="mailto:aomeconsults.contacts@gmail.com" className="block font-semibold mb-1">
            aomeconsults.contacts@gmail.com
          </a>
          <p className="text-teal-100 mb-3">aomeconsults.com</p>
          {socials.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-teal-100 py-5">
        &copy; {new Date().getFullYear()} Aome Consults Limited. CAC Reg. No. 9031236. All rights reserved.
      </div>
    </footer>
  );
}
