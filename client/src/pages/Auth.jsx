import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Btn from '../components/ui/Btn';

function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--surface)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
      }}
        onFocus={e => e.target.style.borderColor = 'var(--ink)'}
        onBlur={e => e.target.style.borderColor = 'var(--line)'}
      />
    </label>
  );
}

function Logo({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 C 7 8, 7 16, 12 22 C 17 16, 17 8, 12 2 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M12 3 V 21" stroke="currentColor" strokeWidth="1" opacity=".5"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: size * .95, fontWeight: 500, letterSpacing: '.02em' }}>Aruvedic</span>
    </div>
  );
}

export default function Auth() {
  const navigate = useNavigate();
  const { setUser } = useCart();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('aanya@gmail.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submit = e => {
    e.preventDefault();
    setUser({ name: name || 'Aanya Sharma', email });
    navigate('/');
  };

  const socialBtn = {
    padding: '12px 18px', border: '1px solid var(--line)', borderRadius: 999,
    background: 'var(--surface)', fontFamily: 'var(--font-body)', fontSize: 14,
    color: 'var(--ink)', cursor: 'pointer', width: '100%',
  };

  return (
    <div style={{ padding: '60px 32px 120px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--surface)' }}>
        <div style={{ background: 'var(--soft)', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 600 }}>
          <Logo size={26} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-.02em', margin: 0 }}>
              Build your<br />daily ritual.
            </h2>
            <p style={{ color: 'var(--mute)', fontSize: 14, lineHeight: 1.7, marginTop: 16, maxWidth: 320 }}>
              Members get early access to seasonal blends, a 10% welcome credit, and a free dosha consultation.
            </p>
          </div>
          <div style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Trusted by 24,000+ wellness routines
          </div>
        </div>

        <form onSubmit={submit} style={{ padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {mode === 'signin' ? 'Welcome back' : 'Begin your ritual'}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 500, marginTop: 12 }}>
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h2>

          <div style={{ marginTop: 28, display: 'grid', gap: 14 }}>
            {mode === 'signup' && <Field label="Full name" value={name} onChange={setName} placeholder="Aanya Sharma" />}
            <Field label="Email" value={email} onChange={setEmail} type="email" />
            <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
          </div>

          <div style={{ marginTop: 24 }}>
            <Btn variant="primary" type="submit">
              {mode === 'signin' ? 'Sign in →' : 'Create account →'}
            </Btn>
          </div>

          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: '.1em' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
            <button type="button" style={socialBtn}>Continue with Google</button>
            <button type="button" style={socialBtn}>Continue with Apple</button>
          </div>

          <p style={{ marginTop: 28, fontSize: 13, color: 'var(--mute)', textAlign: 'center' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <span style={{ color: 'var(--ink)', cursor: 'pointer', borderBottom: '1px solid var(--ink)' }} onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
