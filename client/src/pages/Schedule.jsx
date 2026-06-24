import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api.js';

// This route is intentionally not in any nav menu or button — it's only
// ever reached via the link sent in the booking confirmation email
// (e.g. /schedule?ref=<bookingId>). It is NOT auth-gated, just unlisted.
export default function Schedule() {
  const [params] = useSearchParams();
  const bookingId = params.get('ref');

  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState('loading');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingId) {
      setStatus('missing');
      return;
    }
    api
      .get(`/api/bookings/${bookingId}`)
      .then(({ data }) => {
        setBooking(data.booking);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [bookingId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post(`/api/bookings/${bookingId}/schedule`, {
        preferredDate: date,
        preferredTime: time
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not submit your preferred time. Please try again.');
    }
  }

  if (status === 'missing') {
    return (
      <main className="px-5 py-20 text-center max-w-lg mx-auto">
        <h1 className="font-display text-2xl mb-3">Missing booking reference</h1>
        <p className="text-ink-600">
          This link should include your booking reference. Please use the link from your
          confirmation email, or contact aomeconsults@gmail.com.
        </p>
      </main>
    );
  }

  if (status === 'loading') {
    return <p className="text-center py-20 text-ink-400">Loading...</p>;
  }

  if (status === 'error' || !booking) {
    return (
      <main className="px-5 py-20 text-center max-w-lg mx-auto">
        <h1 className="font-display text-2xl mb-3">We couldn't find that booking</h1>
        <p className="text-ink-600">
          Please use the link from your confirmation email, or contact aomeconsults@gmail.com.
        </p>
      </main>
    );
  }

  if (booking.payment_status !== 'paid') {
    return (
      <main className="px-5 py-20 text-center max-w-lg mx-auto">
        <h1 className="font-display text-2xl mb-3">Payment not yet confirmed</h1>
        <p className="text-ink-600">
          We can't schedule a session until payment is confirmed. If you've already paid,
          please contact aomeconsults@gmail.com.
        </p>
      </main>
    );
  }

  if (submitted || booking.schedule_status === 'requested' || booking.schedule_status === 'confirmed') {
    return (
      <main className="px-5 py-20 text-center max-w-lg mx-auto">
        <h1 className="font-display text-2xl mb-3">
          {booking.schedule_status === 'confirmed' ? 'Your session is confirmed' : 'Request received'}
        </h1>
        {booking.schedule_status === 'confirmed' ? (
          <div>
            <p className="text-ink-600 mb-4">
              {booking.preferred_date} at {booking.preferred_time}
            </p>
            {booking.video_call_link && (
              <a href={booking.video_call_link} target="_blank" rel="noreferrer" className="btn-primary">
                Join Video Call
              </a>
            )}
          </div>
        ) : (
          <p className="text-ink-600">
            Thank you — we've noted your preferred time and will confirm availability by email
            shortly, along with your video call link.
          </p>
        )}
      </main>
    );
  }

  return (
    <main className="px-5 py-16 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <p className="eyebrow eyebrow-gold text-center">Schedule Your Session</p>
        <h1 className="font-display text-3xl mb-3">Hi {booking.full_name}, pick a time that works</h1>
        <p className="text-ink-600">
          We'll confirm availability and email you a video call link once your time is approved.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="text-sm font-semibold text-ink-600">
          Preferred date
          <input
            required
            type="date"
            className="input-field mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-ink-600">
          Preferred time
          <input
            required
            type="time"
            className="input-field mt-1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button className="btn-primary mt-2">Submit Preferred Time</button>
      </form>
    </main>
  );
}
