import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DARK, BLUE, WHITE, MUTED, CARD, CARD2, RED, GREEN } from '../constants/colors';
import { authAPI } from '../api';

export default function RegisterScreen({ onToggleMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('operator');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.register({ name, email, password, role });

      if (data.token) {
        login(data);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      padding: '40px 24px', background: DARK, overflowY: 'auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ 
          fontSize: 28, fontWeight: 700, color: WHITE, 
          fontFamily: "'Orbitron', sans-serif", letterSpacing: 2, marginBottom: 8 
        }}>CREATE ACCOUNT</h1>
        <p style={{ color: MUTED, fontSize: 14 }}>Join the IntelliGuard Network</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', border: `1px solid ${RED}`, 
            color: RED, padding: 12, borderRadius: 10, fontSize: 13, textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginLeft: 4 }}>FULL NAME</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              background: CARD, border: `1px solid ${CARD2}`, borderRadius: 12,
              padding: '12px 16px', color: WHITE, fontSize: 15, outline: 'none'
            }}
            placeholder="John Doe"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginLeft: 4 }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              background: CARD, border: `1px solid ${CARD2}`, borderRadius: 12,
              padding: '12px 16px', color: WHITE, fontSize: 15, outline: 'none'
            }}
            placeholder="john@example.com"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginLeft: 4 }}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              background: CARD, border: `1px solid ${CARD2}`, borderRadius: 12,
              padding: '12px 16px', color: WHITE, fontSize: 15, outline: 'none'
            }}
            placeholder="••••••••"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginLeft: 4 }}>SYSTEM ROLE</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['admin', 'operator'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: '12px', borderRadius: 10, border: 'none',
                  background: role === r ? BLUE : CARD,
                  color: role === r ? WHITE : MUTED,
                  fontWeight: 700, fontSize: 12, cursor: 'pointer',
                  textTransform: 'uppercase', transition: 'all 0.2s'
                }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="btn-start"
          disabled={loading}
          style={{
            marginTop: 10, height: 50, background: GREEN, border: 'none', 
            borderRadius: 14, color: WHITE, fontWeight: 700, fontSize: 16, 
            cursor: 'pointer'
          }}>
          {loading ? 'CREATING...' : 'SIGN UP'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <span style={{ color: MUTED, fontSize: 14 }}>Already have an account? </span>
        <button 
          onClick={onToggleMode}
          style={{ 
            background: 'none', border: 'none', color: BLUE, 
            fontWeight: 700, fontSize: 14, cursor: 'pointer' 
          }}>
          Login
        </button>
      </div>
    </div>
  );
}
