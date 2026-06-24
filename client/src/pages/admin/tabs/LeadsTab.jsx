import { useEffect, useState } from 'react';
import api from '../../../utils/api.js';

export default function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/leads/admin/all')
      .then(({ data }) => setLeads(data.leads || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl mb-5">Leads</h2>
      {loading && <p className="text-ink-400">Loading...</p>}

      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-400 border-b border-teal-700/10">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Phone</th>
              <th className="py-2 pr-4">Verified</th>
              <th className="py-2 pr-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-teal-700/5">
                <td className="py-2 pr-4">{l.name || '—'}</td>
                <td className="py-2 pr-4">{l.email}</td>
                <td className="py-2 pr-4">{l.phone || '—'}</td>
                <td className="py-2 pr-4">{l.verified ? '✅' : '—'}</td>
                <td className="py-2 pr-4 text-ink-400">{new Date(l.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && leads.length === 0 && <p className="text-ink-400 py-4">No leads yet.</p>}
      </div>
    </div>
  );
}
