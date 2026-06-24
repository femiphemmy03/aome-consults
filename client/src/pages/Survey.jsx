import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api.js';

export default function Survey() {
  const { bookingId } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!rating) {
      setError('Please select a rating.');
      return;
    }
    try {
      await api.post('/api/survey', { bookingId, rating, feedback, wouldRecommend });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not submit feedback. Please try again.');
    }
  }

  if (submitted) {
    return (
      <main className="px-5 py-20 text-center max-w-lg mx-auto">
        <h1 className="font-display text-2xl mb-3">Thank you 🙏</h1>
        <p className="text-ink-600">Your feedback helps Dr. Maria serve every client better.</p>
      </main>
    );
  }

  return (
    <main className="px-5 py-16 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <p className="eyebrow eyebrow-gold text-center">Post-Session Feedback</p>
        <h1 className="font-display text-3xl mb-3">How was your session?</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <p className="text-sm font-semibold text-ink-600 mb-2">Rating</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                className={`w-11 h-11 rounded-full font-semibold border-2 ${
                  rating >= n ? 'bg-gold-500 border-gold-500 text-ink-900' : 'border-teal-700/20 text-ink-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <label className="text-sm font-semibold text-ink-600">
          Your feedback (optional)
          <textarea
            rows={4}
            className="input-field mt-1"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </label>

        <div>
          <p className="text-sm font-semibold text-ink-600 mb-2">Would you recommend Aome Consults?</p>
          <div className="flex gap-3">
            {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => (
              <button
                type="button"
                key={opt.label}
                onClick={() => setWouldRecommend(opt.value)}
                className={`flex-1 rounded-xl border-2 py-3 font-semibold ${
                  wouldRecommend === opt.value ? 'border-gold-500 bg-gold-100' : 'border-teal-700/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary mt-2">Submit Feedback</button>
      </form>
    </main>
  );
}
