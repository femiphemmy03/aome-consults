import { useState } from 'react';
import api from '../utils/api.js';

/**
 * Drop-in replacement for a "paste a URL" text field. Lets the admin pick
 * an image file from their device; it's uploaded to Supabase Storage and
 * the resulting public URL is handed back via onChange — same contract
 * as a plain text input, just backed by a real upload instead of typing.
 */
export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.post('/api/uploads/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(data.url);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try a smaller image (under 5MB).');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && <p className="text-sm font-semibold text-ink-600 mb-1">{label}</p>}

      {value && (
        <img src={value} alt="Cover preview" className="w-24 h-32 object-cover rounded-lg mb-2 border border-teal-700/15" />
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={uploading}
        className="input-field text-sm"
      />

      {uploading && <p className="text-xs text-ink-400 mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {value && !uploading && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-xs text-red-600 font-semibold mt-1"
        >
          Remove image
        </button>
      )}
    </div>
  );
}