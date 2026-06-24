import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';
import { Reveal } from '../hooks/useScrollAnimations.jsx';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/blog')
      .then(({ data }) => setPosts(data.posts || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="px-5 py-14 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="eyebrow eyebrow-gold text-center">From the Journal</p>
        <h1 className="font-display text-3xl md:text-5xl">Reflections with Maria</h1>
      </div>

      {loading && <p className="text-center text-ink-400">Loading posts...</p>}
      {!loading && posts.length === 0 && (
        <p className="text-center text-ink-400">No posts published yet — check back soon.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((post) => (
          <Reveal key={post.id}>
            <Link to={`/blog/${post.slug}`} className="card flex flex-col h-full">
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="font-display text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-ink-600 flex-1">{post.excerpt}</p>
              <span className="text-gold-600 font-semibold text-sm mt-4">Read More &rarr;</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
