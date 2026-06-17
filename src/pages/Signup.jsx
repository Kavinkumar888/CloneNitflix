import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const strength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const s = strength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setApiError('');
    await new Promise(r => setTimeout(r, 600));
    const result = signup(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) navigate('/');
    else setApiError(result.error);
  };

  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col">
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-netflix-black/80" />
      </div>

      <div className="relative z-10 px-8 py-6">
        <Link to="/" className="text-netflix-red font-black text-2xl tracking-tight">STREAMFLIX</Link>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 md:p-12 w-full max-w-md border border-white/10">
          <h1 className="text-white text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-netflix-gray mb-8">Join millions of viewers on Streamflix</p>

          {apiError && (
            <div className="bg-netflix-red/20 border border-netflix-red/50 rounded-md px-4 py-3 mb-6 text-red-400 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-netflix-lightgray text-sm font-medium mb-2">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={update(key)}
                  placeholder={placeholder}
                  className={`w-full bg-white/10 border rounded-md px-4 py-3 text-white placeholder-netflix-gray text-sm outline-none transition-all focus:border-white/50 focus:bg-white/15 ${errors[key] ? 'border-red-500' : 'border-white/20'}`}
                />
                {errors[key] && <p className="mt-1.5 text-red-400 text-xs">{errors[key]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-netflix-lightgray text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={update('password')}
                placeholder="••••••••"
                className={`w-full bg-white/10 border rounded-md px-4 py-3 text-white placeholder-netflix-gray text-sm outline-none transition-all focus:border-white/50 focus:bg-white/15 ${errors.password ? 'border-red-500' : 'border-white/20'}`}
              />
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= s ? strengthColor[s] : 'bg-white/20'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-netflix-lightgray">{strengthLabel[s]}</span>
                </div>
              )}
              {errors.password && <p className="mt-1.5 text-red-400 text-xs">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-netflix-lightgray text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={update('confirm')}
                placeholder="••••••••"
                className={`w-full bg-white/10 border rounded-md px-4 py-3 text-white placeholder-netflix-gray text-sm outline-none transition-all focus:border-white/50 focus:bg-white/15 ${errors.confirm ? 'border-red-500' : form.confirm && form.password === form.confirm ? 'border-green-500' : 'border-white/20'}`}
              />
              {errors.confirm && <p className="mt-1.5 text-red-400 text-xs">{errors.confirm}</p>}
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
                  Creating account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-netflix-gray text-sm mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold hover:underline">Sign in.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
