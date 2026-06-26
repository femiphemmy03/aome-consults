import { useEffect, useState } from 'react';
import api from '../../../utils/api.js';

export default function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ scheduledDate: '', scheduledTime: '', videoCallLink: '', adminNotes: '' });
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api
      .get('/api/bookings/admin/all')
      .then(({ data }) => setBookings(data.bookings || []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startEdit(booking) {
    setEditingId(booking.id);
    setForm({
      scheduledDate: booking.preferred_date || '',
      scheduledTime: booking.preferred_time || '',
      videoCallLink: booking.video_call_link || '',
      adminNotes: booking.admin_notes || ''
    });
  }

  async function handleConfirm(id) {
    setError('');
    try {
      await api.patch(`/api/bookings/admin/${id}/confirm`, form);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not confirm booking');
    }
  }

  async function handleComplete(id) {
    if (!confirm('Mark this session as completed? This will email the client a survey link.')) return;
    setError('');
    try {
      await api.patch(`/api/bookings/admin/${id}/complete`);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not mark session complete');
    }
  }

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700'
  };

  return (
    <div>
      <h2 className="font-display text-2xl mb-5">Bookings</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {loading && <p className="text-ink-400">Loading...</p>}

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold">{b.full_name}</p>
                <p className="text-sm text-ink-400">{b.email} &middot; {b.phone}</p>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[b.payment_status]}`}>
                  {b.payment_status}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-700">
                  {b.schedule_status}
                </span>
              </div>
            </div>

            {b.brief && <p className="text-sm text-ink-600 mb-3">"{b.brief}"</p>}

            <p className="text-xs text-ink-400 mb-3">
              {b.currency} {b.consultation_fee} &middot; Preferred: {b.preferred_date || '—'} {b.preferred_time || ''}
            </p>

            {editingId === b.id ? (
              <div className="grid sm:grid-cols-2 gap-3 bg-cream-100 p-4 rounded-xl">
                <input
                  type="date"
                  className="input-field"
                  value={form.scheduledDate}
                  onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                />
                <input
                  type="time"
                  className="input-field"
                  value={form.scheduledTime}
                  onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                />
                <input
                  placeholder="Google Meet link"
                  className="input-field sm:col-span-2"
                  value={form.videoCallLink}
                  onChange={(e) => setForm({ ...form, videoCallLink: e.target.value })}
                />
                <textarea
                  placeholder="Internal notes (optional)"
                  className="input-field sm:col-span-2"
                  value={form.adminNotes}
                  onChange={(e) => setForm({ ...form, adminNotes: e.target.value })}
                />
                <div className="flex gap-2 sm:col-span-2">
                  <button onClick={() => handleConfirm(b.id)} className="btn-primary btn-small">
                    Confirm & Email Client
                  </button>
                  <button onClick={() => setEditingId(null)} className="btn-ghost btn-small">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => startEdit(b)} className="btn-ghost btn-small">
                  {b.schedule_status === 'confirmed' ? 'Edit Schedule' : 'Confirm Schedule'}
                </button>
                {b.schedule_status === 'confirmed' && !b.session_completed && (
                  <button onClick={() => handleComplete(b.id)} className="btn-primary btn-small">
                    Mark Session Completed
                  </button>
                )}
                {b.session_completed && (
                  <span className="text-xs font-bold px-3 py-2 rounded-full bg-teal-100 text-teal-700">
                    Survey sent ✓
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        {!loading && bookings.length === 0 && <p className="text-ink-400">No bookings yet.</p>}
      </div>
    </div>
  );
}