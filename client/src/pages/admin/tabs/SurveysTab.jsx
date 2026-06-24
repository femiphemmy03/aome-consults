import { useEffect, useState } from 'react';
import api from '../../../utils/api.js';

export default function SurveysTab() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/survey/admin/all').then(({ data }) => setSurveys(data.surveys || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl mb-5">Surveys</h2>
      {loading && <p className="text-ink-400">Loading...</p>}
      <div className="grid gap-4">
        {surveys.map((s) => (
          <div key={s.id} className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gold-600">{s.rating}/5</span>
              <span className="text-xs font-semibold text-ink-400">
                {s.would_recommend === true ? 'Would recommend' : s.would_recommend === false ? 'Would not recommend' : ''}
              </span>
            </div>
            {s.feedback && <p className="text-sm text-ink-600">"{s.feedback}"</p>}
            <p className="text-xs text-ink-400 mt-2">{new Date(s.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {!loading && surveys.length === 0 && <p className="text-ink-400">No survey responses yet.</p>}
      </div>
    </div>
  );
}
