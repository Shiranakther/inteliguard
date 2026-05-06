import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DARK, BLUE, WHITE, MUTED, CARD, CARD2, RED } from '../constants/colors';
import { authAPI } from '../api';

export default function LoginScreen({ onToggleMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login({ email, password });

      if (data.token) {
        login(data);
      } else {
        setError(data.message || 'Login failed');
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
      padding: '40px 24px', background: DARK, justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ 
          fontSize: 32, fontWeight: 700, color: WHITE, 
          fontFamily: "'Orbitron', sans-serif", letterSpacing: 2, marginBottom: 8 
        }}>INTELLIGUARD</h1>
        <p style={{ color: MUTED, fontSize: 14 }}>Secure Vehicle Access Control</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', border: `1px solid ${RED}`, 
            color: RED, padding: 12, borderRadius: 10, fontSize: 13, textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginLeft: 4 }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              background: CARD, border: `1px solid ${CARD2}`, borderRadius: 12,
              padding: '14px 16px', color: WHITE, fontSize: 15, outline: 'none'
            }}
            placeholder="admin@intelliguard.com"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginLeft: 4 }}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              background: CARD, border: `1px solid ${CARD2}`, borderRadius: 12,
              padding: '14px 16px', color: WHITE, fontSize: 15, outline: 'none'
            }}
            placeholder="••••••••"
          />
        </div>

        <button 
          className="btn-start"
          disabled={loading}
          style={{
            marginTop: 10, height: 54, background: BLUE, border: 'none', 
            borderRadius: 14, color: WHITE, fontWeight: 700, fontSize: 16, 
            cursor: 'pointer', transition: 'all 0.2s'
          }}>
          {loading ? 'AUTHENTICATING...' : 'LOGIN'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <span style={{ color: MUTED, fontSize: 14 }}>Don't have an account? </span>
        <button 
          onClick={onToggleMode}
          style={{ 
            background: 'none', border: 'none', color: BLUE, 
            fontWeight: 700, fontSize: 14, cursor: 'pointer' 
          }}>
          Register
        </button>
      </div>
    </div>
  );
}
