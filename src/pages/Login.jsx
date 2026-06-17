import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setApiError('');
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);

    if (result.success) navigate('/');
    else setApiError(result.error);
  };

  const handleDemo = () => {
    setForm({ email: 'demo@streamflix.com', password: 'demo123' });
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-netflix-black/70" />
      </div>

      {/* Navbar */}
      <div className="relative z-10 px-8 py-6">
        <Link to="/" className="text-netflix-red font-black text-2xl tracking-tight">STREAMFLIX</Link>
      </div>

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 md:p-12 w-full max-w-md border border-white/10">
          <h1 className="text-white text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-netflix-gray mb-8">Welcome back to Streamflix</p>

          {apiError && (
            <div className="bg-netflix-red/20 border border-netflix-red/50 rounded-md px-4 py-3 mb-6 text-red-400 text-sm flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" />
              </svg>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-netflix-lightgray text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                placeholder="you@example.com"
                className={`w-full bg-white/10 border rounded-md px-4 py-3 text-white placeholder-netflix-gray text-sm outline-none transition-all focus:border-white/50 focus:bg-white/15 ${errors.email ? 'border-red-500' : 'border-white/20'}`}
              />
              {errors.email && <p className="mt-1.5 text-red-400 text-xs">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-netflix-lightgray text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '' })); }}
                placeholder="••••••••"
                className={`w-full bg-white/10 border rounded-md px-4 py-3 text-white placeholder-netflix-gray text-sm outline-none transition-all focus:border-white/50 focus:bg-white/15 ${errors.password ? 'border-red-500' : 'border-white/20'}`}
              />
              {errors.password && <p className="mt-1.5 text-red-400 text-xs">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-netflix-red hover:bg-red-700 disabled:bg-red-900 text-white font-bold py-3 rounded-md transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={handleDemo}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 rounded-md transition-all duration-200 text-sm"
            >
              Use Demo Account
            </button>
          </form>

          <p className="text-netflix-gray text-sm mt-6 text-center">
            New to Streamflix?{' '}
            <Link to="/signup" className="text-white font-semibold hover:underline">Sign up now.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
