import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('wajd_admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-perola flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 luxury-shadow text-center"
      >
        <div className="w-16 h-16 bg-terracota/10 text-terracota rounded-full flex items-center justify-center mx-auto mb-8">
          <Lock size={24} />
        </div>
        <h1 className="text-3xl font-serif mb-2">Admin Access</h1>
        <p className="text-xs uppercase tracking-widest opacity-40 mb-10">WAJD Studio Management</p>

        {error && (
          <div className="bg-red-50 text-red-500 text-xs p-4 mb-6 text-left border-l-2 border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label htmlFor="admin-email" className="text-[10px] uppercase tracking-widest opacity-40 mb-2 block">Email Address</label>
            <input
              id="admin-email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota transition-colors"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-[10px] uppercase tracking-widest opacity-40 mb-2 block">Password</label>
            <input
              id="admin-password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota transition-colors"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-smoky-black text-perola py-4 uppercase tracking-widest text-xs hover:bg-terracota transition-all duration-500 luxury-shadow disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-8 text-[10px] opacity-30 uppercase tracking-widest">
          Authorized personnel only
        </p>
      </motion.div>
    </div>
  );
}
