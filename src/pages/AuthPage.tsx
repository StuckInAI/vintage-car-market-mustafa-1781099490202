import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const { auth, login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'both' as const });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (auth.isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-xl mb-2" style={{ color: '#c9a84c' }}>Welcome, {auth.user?.name}!</p>
        <button onClick={() => navigate('/')} className="text-sm" style={{ color: '#9a7530' }}>Go to Homepage →</button>
      </div>
    );
  }

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let result;
    if (mode === 'login') {
      result = login(form.email, form.password);
    } else {
      result = register(form.name, form.email, form.password, form.role);
    }
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'An error occurred');
    } else {
      navigate('/');
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded text-sm';
  const inputStyle = { backgroundColor: '#1a0e00', border: '1px solid #c9a84c33', color: '#f5f0e8' };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="rounded-lg p-8" style={{ backgroundColor: '#1a0e00', border: '1px solid #c9a84c33' }}>
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}>
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h1>

        <div className="flex rounded overflow-hidden mb-6" style={{ border: '1px solid #c9a84c33' }}>
          <button
            className="flex-1 py-2 text-sm transition-colors"
            style={{ backgroundColor: mode === 'login' ? '#c9a84c' : 'transparent', color: mode === 'login' ? '#0f0800' : '#9a7530' }}
            onClick={() => setMode('login')}
          >
            Sign In
          </button>
          <button
            className="flex-1 py-2 text-sm transition-colors"
            style={{ backgroundColor: mode === 'register' ? '#c9a84c' : 'transparent', color: mode === 'register' ? '#0f0800' : '#9a7530' }}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        {error && <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#3a0a0a', color: '#ff6b6b', border: '1px solid #ff000033' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input type="text" placeholder="Full Name" required className={inputClass} style={inputStyle} value={form.name} onChange={(e) => set('name', e.target.value)} />
          )}
          <input type="email" placeholder="Email Address" required className={inputClass} style={inputStyle} value={form.email} onChange={(e) => set('email', e.target.value)} />
          <input type="password" placeholder="Password" required className={inputClass} style={inputStyle} value={form.password} onChange={(e) => set('password', e.target.value)} />
          {mode === 'register' && (
            <select className={inputClass} style={inputStyle} value={form.role} onChange={(e) => set('role', e.target.value)}>
              <option value="both">Buyer & Seller</option>
              <option value="seller">Seller Only</option>
              <option value="bidder">Bidder Only</option>
            </select>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-bold text-sm"
            style={{ backgroundColor: '#c9a84c', color: '#0f0800', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 p-4 rounded text-xs" style={{ backgroundColor: '#0f0800', border: '1px solid #c9a84c22', color: '#9a7530' }}>
          <div className="font-semibold mb-2" style={{ color: '#c9a84c' }}>Demo Accounts:</div>
          <div>henry@vccp.com / pass123 (Seller & Bidder)</div>
          <div>victoria@vccp.com / pass123 (Seller)</div>
          <div>bob@vccp.com / pass123 (Bidder)</div>
        </div>
      </div>
    </div>
  );
}
