import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', mobile: '', email: '', sic: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'register') {
        // Register → then auto-login
        await registerUser(form);
        setSuccessMsg('Account created! Signing you in...');
        const loginData = await loginUser({ email: form.email, password: form.password });
        login(loginData.user, loginData.token);
        setTimeout(onClose, 600);
      } else {
        const data = await loginUser(form);
        login(data.user, data.token);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-tabs">
          <button className={`modal-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError(''); }}>Sign In</button>
          <button className={`modal-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setError(''); }}>Register</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input type="number" name="mobile" placeholder="10-digit mobile number" value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Student ID (SIC)</label>
                <input type="text" name="sic" placeholder="e.g. 22CS001" value={form.sic} onChange={handleChange} required />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="your@college.edu" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required minLength={6} />
          </div>

          {successMsg && <p className="form-success">{successMsg}</p>}
          {error && <p className="form-error">⚠️ {error}</p>}

          <button type="submit" className="form-submit" disabled={loading}>
            {loading
              ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
              : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <p className="modal-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already a member? '}
          <button className="link-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Register here' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
