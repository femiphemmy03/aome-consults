import { useSettings } from '../context/SettingsContext.jsx';

// Free click-to-chat link — no WhatsApp Business API needed.
// Number is admin-editable from the dashboard (site_settings.whatsapp_number).
export default function WhatsAppWidget() {
  const { settings } = useSettings();
  const number = (settings.whatsapp_number || '').replace(/[^\d+]/g, '');

  if (!number) return null;

  const link = `https://wa.me/${number.replace('+', '')}?text=${encodeURIComponent(
    'Hi, I have a question for Aome Consults.'
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg px-4 py-3 hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 3.5a8.86 8.86 0 0 0-7.65 13.34L3.5 21.5l4.83-1.27a8.86 8.86 0 0 0 3.72.82h.01A8.86 8.86 0 0 0 17.6 6.32zm-5.55 13.61a7.35 7.35 0 0 1-3.75-1.03l-.27-.16-2.79.73.75-2.72-.18-.28a7.36 7.36 0 1 1 13.68-3.9 7.36 7.36 0 0 1-7.44 7.36zm4.04-5.52c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.11-.46.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.04-.41-.08-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38-.13-.01-.28-.01-.43-.01s-.4.05-.6.27c-.21.22-.79.77-.79 1.87s.81 2.18.92 2.33c.11.15 1.55 2.36 3.76 3.22 2.21.86 2.21.57 2.61.54.4-.04 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.06-.1-.21-.16-.43-.27z" />
      </svg>
      <span className="hidden sm:inline text-sm font-semibold">Chat with us</span>
    </a>
  );
}
