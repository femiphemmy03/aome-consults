import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api.js';
import useMeta from '../hooks/useMeta.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api
      .get(`/api/blog/${slug}`)
      .then(({ data }) => {
        setPost(data.post);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  // Hooks must run unconditionally — falls back to generic values while
  // loading, then becomes the real post title/excerpt once it arrives.
  // This is what actually shows up in Google results and browser tabs
  // for this specific post, rather than a generic site-wide title.
  useMeta({
    title: post?.title || 'Journal',
    description: post?.excerpt || undefined,
    path: `/blog/${slug}`,
    noindex: status === 'error'
  });

  if (status === 'loading') {
    return <p className="text-center py-20 text-ink-400">Loading...</p>;
  }

  if (status === 'error' || !post) {
    return (
      <main className="text-center py-20">
        <h1 className="font-display text-2xl mb-4">Post not found</h1>
        <Link to="/blog" className="btn-ghost">Back to Journal</Link>
      </main>
    );
  }

  return (
    <main className="px-5 py-14 max-w-2xl mx-auto">
      <Link to="/blog" className="text-sm text-teal-700 font-semibold mb-6 inline-block">
        &larr; Back to Journal
      </Link>

      {post.cover_image_url && (
        <img src={post.cover_image_url} alt={post.title} className="w-full h-64 object-cover rounded-brand mb-7" />
      )}

      <h1 className="font-display text-3xl md:text-4xl mb-6">{post.title}</h1>

      <div className="text-ink-600 whitespace-pre-line leading-relaxed mb-10">{post.content}</div>

      {post.cta_url && (
        <a href={post.cta_url} target="_blank" rel="noreferrer" className="btn-primary">
          {post.cta_text || 'Read More'}
        </a>
      )}
    </main>
  );
}
