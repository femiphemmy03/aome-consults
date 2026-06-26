import { useEffect, useState } from 'react';
import api from '../../../utils/api.js';
import ImageUploadField from '../../../components/ImageUploadField.jsx';

const emptyForm = { title: '', excerpt: '', content: '', coverImageUrl: '', ctaText: 'Read More', ctaUrl: '', published: false };

export default function BlogTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.get('/api/blog/admin/all').then(({ data }) => setPosts(data.posts || [])).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function startEdit(post) {
    setEditingId(post.id);
    setForm({
      title: post.title, excerpt: post.excerpt || '', content: post.content,
      coverImageUrl: post.cover_image_url || '', ctaText: post.cta_text || 'Read More',
      ctaUrl: post.cta_url || '', published: post.published
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
        await api.put(`/api/blog/admin/${editingId}`, form);
      } else {
        await api.post('/api/blog/admin', form);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save post');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/api/blog/admin/${id}`);
    load();
  }

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-7">
      <div>
        <h2 className="font-display text-2xl mb-5">Blog Posts</h2>
        {loading && <p className="text-ink-400">Loading...</p>}
        <div className="grid gap-4">
          {posts.map((p) => (
            <div key={p.id} className="card">
              <p className="font-semibold">{p.title}</p>
              <p className="text-xs text-ink-400 mb-2">{p.published ? 'Published' : 'Draft'}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="btn-ghost btn-small">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600 text-xs font-semibold">Delete</button>
              </div>
            </div>
          ))}
          {!loading && posts.length === 0 && <p className="text-ink-400">No posts yet — write the first one.</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card self-start sticky top-5">
        <h3 className="font-display text-lg mb-4">{editingId ? 'Edit Post' : 'Write a Post'}</h3>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <div className="grid gap-3">
          <input required placeholder="Title" className="input-field" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <ImageUploadField
            label="Cover image"
            value={form.coverImageUrl}
            onChange={(url) => setForm({ ...form, coverImageUrl: url })}
          />
          <textarea placeholder="Excerpt (shown on the Journal page)" rows={2} className="input-field" value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <textarea required placeholder="Full post content" rows={8} className="input-field" value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="CTA button text" className="input-field" value={form.ctaText}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })} />
            <input placeholder="CTA link (where it goes)" className="input-field" value={form.ctaUrl}
              onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-600">
            <input type="checkbox" checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published (visible on the site)
          </label>
          <div className="flex gap-2">
            <button className="btn-primary btn-small">{editingId ? 'Save Changes' : 'Publish'}</button>
            {editingId && <button type="button" onClick={resetForm} className="btn-ghost btn-small">Cancel</button>}
          </div>
        </div>
      </form>
    </div>
  );
}