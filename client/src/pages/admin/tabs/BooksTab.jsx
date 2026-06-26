import { useEffect, useState } from 'react';
import api from '../../../utils/api.js';
import ImageUploadField from '../../../components/ImageUploadField.jsx';

const emptyForm = {
  title: '', coverImageUrl: '', shortDescription: '', selarUrl: '',
  priceNgn: '', priceUsd: '', displayOrder: 0, published: true
};

export default function BooksTab() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.get('/api/books/admin/all').then(({ data }) => setBooks(data.books || [])).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function startEdit(book) {
    setEditingId(book.id);
    setForm({
      title: book.title, coverImageUrl: book.cover_image_url || '', shortDescription: book.short_description || '',
      selarUrl: book.selar_url, priceNgn: book.price_ngn || '', priceUsd: book.price_usd || '',
      displayOrder: book.display_order || 0, published: book.published
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/api/books/admin/${editingId}`, form);
      } else {
        await api.post('/api/books/admin', form);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save book');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this book?')) return;
    await api.delete(`/api/books/admin/${id}`);
    load();
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-7">
      <div>
        <h2 className="font-display text-2xl mb-5">Books</h2>
        {loading && <p className="text-ink-400">Loading...</p>}
        <div className="grid gap-4">
          {books.map((b) => (
            <div key={b.id} className="card flex gap-4">
              <div className="w-16 h-20 bg-teal-100 rounded-lg overflow-hidden flex-shrink-0">
                {b.cover_image_url && <img src={b.cover_image_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{b.title}</p>
                <p className="text-xs text-ink-400 mb-2">
                  {b.price_ngn ? `₦${b.price_ngn}` : ''} {b.price_usd ? `/ $${b.price_usd}` : ''} &middot;{' '}
                  {b.published ? 'Published' : 'Hidden'}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(b)} className="btn-ghost btn-small">Edit</button>
                  <button onClick={() => handleDelete(b.id)} className="text-red-600 text-xs font-semibold">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {!loading && books.length === 0 && <p className="text-ink-400">No books yet — add the first one.</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card self-start sticky top-5">
        <h3 className="font-display text-lg mb-4">{editingId ? 'Edit Book' : 'Add a Book'}</h3>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <div className="grid gap-3">
          <input required placeholder="Title" className="input-field" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <ImageUploadField
            label="Cover image"
            value={form.coverImageUrl}
            onChange={(url) => setForm({ ...form, coverImageUrl: url })}
          />
          <textarea placeholder="Short description" rows={3} className="input-field" value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
          <input required placeholder="Selar URL" className="input-field" value={form.selarUrl}
            onChange={(e) => setForm({ ...form, selarUrl: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Price (₦)" type="number" className="input-field" value={form.priceNgn}
              onChange={(e) => setForm({ ...form, priceNgn: e.target.value })} />
            <input placeholder="Price ($)" type="number" className="input-field" value={form.priceUsd}
              onChange={(e) => setForm({ ...form, priceUsd: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-600">
            <input type="checkbox" checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published (visible on the site)
          </label>
          <div className="flex gap-2">
            <button className="btn-primary btn-small">{editingId ? 'Save Changes' : 'Add Book'}</button>
            {editingId && <button type="button" onClick={resetForm} className="btn-ghost btn-small">Cancel</button>}
          </div>
        </div>
      </form>
    </div>
  );
}