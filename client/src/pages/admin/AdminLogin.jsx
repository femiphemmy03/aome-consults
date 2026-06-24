import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/images/aome-logo.jpg';

export default function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-teal-900 px-5">
      <form onSubmit={handleSubmit} className="bg-cream-50 rounded-brand p-9 w-full max-w-sm">
        <img src={logo} alt="Aome Consults" className="h-12 mx-auto mb-6 rounded-lg" />
        <h1 className="font-display text-2xl text-center mb-6">Admin Login</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <input
          required
          placeholder="Username"
          className="input-field mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="input-field mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} className="btn-primary w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
