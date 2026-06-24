import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="px-5 py-24 text-center">
      <h1 className="font-display text-4xl mb-4">Page Not Found</h1>
      <p className="text-ink-600 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </main>
  );
}
