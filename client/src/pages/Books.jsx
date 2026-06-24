import { useEffect, useState } from 'react';
import api from '../utils/api.js';
import { useSettings } from '../context/SettingsContext.jsx';
import { Reveal } from '../hooks/useScrollAnimations.jsx';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { settings } = useSettings();

  useEffect(() => {
    api
      .get('/api/books')
      .then(({ data }) => setBooks(data.books || []))
      .catch(() => setError('Could not load the book catalogue right now. Please try again shortly.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="px-5 py-14 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="eyebrow eyebrow-gold text-center">Books &amp; Resources</p>
        <h1 className="font-display text-3xl md:text-5xl mb-4">The Book Catalogue</h1>
        <p className="text-ink-600">
          Each title links directly to its dedicated Selar page for purchase. Prefer to
          browse everything in one place?{' '}
          {settings.gumroad_profile_url && (
            <a href={settings.gumroad_profile_url} target="_blank" rel="noreferrer" className="text-teal-700 font-semibold underline">
              View the full collection on Gumroad
            </a>
          )}
        </p>
      </div>

      {loading && <p className="text-center text-ink-400">Loading books...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-ink-400">
          No books published yet — add titles from the admin dashboard.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {books.map((book) => (
          <Reveal key={book.id}>
            <a
              href={book.selar_url}
              target="_blank"
              rel="noreferrer"
              className="card flex flex-col h-full group"
            >
              <div className="aspect-[3/4] bg-teal-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                {book.cover_image_url ? (
                  <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-teal-700 text-sm font-semibold px-4 text-center">
                    {book.title}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg mb-2">{book.title}</h3>
              {(book.price_ngn || book.price_usd) && (
                <p className="text-sm font-semibold text-gold-600 mb-2">
                  {book.price_ngn ? `₦${Number(book.price_ngn).toLocaleString()}` : ''}
                  {book.price_ngn && book.price_usd ? ' / ' : ''}
                  {book.price_usd ? `$${book.price_usd}` : ''}
                </p>
              )}
              <p className="text-sm text-ink-600 flex-1 mb-4">{book.short_description}</p>
              <span className="btn-ghost btn-small w-fit group-hover:bg-teal-700 group-hover:text-cream-50">
                View on Selar
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
