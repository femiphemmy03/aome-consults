import { useEffect, useState } from 'react';
import api from '../../../utils/api.js';

const FIELDS = [
  { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '+2349022150216' },
  { key: 'gumroad_profile_url', label: 'Gumroad Profile URL', placeholder: 'https://gumroad.com/yourprofile' },
  { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
  { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
  { key: 'linkedin_url', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/...' },
  { key: 'tiktok_url', label: 'TikTok URL', placeholder: 'https://tiktok.com/@...' },
  { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://youtube.com/...' },
  { key: 'consultation_fee_ngn', label: 'Consultation Fee (₦)', placeholder: '20000' },
  { key: 'consultation_fee_usd', label: 'Consultation Fee ($)', placeholder: '25' }
];

export default function SettingsTab() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/api/settings').then(({ data }) => setValues(data.settings || {})).finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.put('/api/settings/admin', values);
      setMessage('Settings saved successfully.');
    } catch {
      setMessage('Could not save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-ink-400">Loading...</p>;

  return (
    <div className="max-w-xl">
      <h2 className="font-display text-2xl mb-2">Site Settings</h2>
      <p className="text-sm text-ink-400 mb-5">
        These update instantly across the site — no developer needed for changes like a new
        WhatsApp number, social link, or consultation fee.
      </p>

      {message && <p className="text-sm text-teal-700 font-semibold mb-4">{message}</p>}

      <form onSubmit={handleSave} className="card grid gap-4">
        {FIELDS.map((field) => (
          <label key={field.key} className="text-sm font-semibold text-ink-600">
            {field.label}
            <input
              className="input-field mt-1"
              placeholder={field.placeholder}
              value={values[field.key] || ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
            />
          </label>
        ))}
        <button disabled={saving} className="btn-primary w-fit">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
