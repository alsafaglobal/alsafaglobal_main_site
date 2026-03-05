import { useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f1923',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#1a2634',
    borderRadius: '12px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px',
  },
  subtitle: {
    color: '#7a8fa6',
    fontSize: '13px',
    margin: 0,
  },
  label: {
    display: 'block',
    color: '#7a8fa6',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#0f1923',
    border: '1px solid #2a3a4a',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '13px',
    background: '#1976d2',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '24px',
  },
  optionButton: {
    width: '100%',
    padding: '16px',
    background: '#0f1923',
    color: '#ffffff',
    border: '1px solid #2a3a4a',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  optionIcon: {
    fontSize: '22px',
  },
  optionText: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionTitle: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
  },
  optionDesc: {
    color: '#7a8fa6',
    fontSize: '12px',
    fontWeight: '400',
    marginTop: '2px',
  },
  error: {
    color: '#e74c3c',
    fontSize: '13px',
    marginTop: '12px',
    textAlign: 'center',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#7a8fa6',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '16px',
    width: '100%',
    textAlign: 'center',
  },
};

export default function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
      setPassword('');
    }
  };

  const handleCMS = () => {
    const url = process.env.REACT_APP_SANITY_STUDIO_URL;
    if (url) window.location.href = url;
    else setError('CMS URL not configured.');
  };

  const handleAnalytics = () => {
    const url = process.env.REACT_APP_ANALYTICS_URL;
    if (url) window.location.href = url;
    else setError('Analytics URL not configured.');
  };

  if (authenticated) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <p style={styles.title}>Al Safa Global</p>
            <p style={styles.subtitle}>Choose a panel</p>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.optionButton} onClick={handleCMS}>
            <span style={styles.optionIcon}>🖊️</span>
            <span style={styles.optionText}>
              <span style={styles.optionTitle}>CMS</span>
              <span style={styles.optionDesc}>Edit website content via Sanity Studio</span>
            </span>
          </button>
          <button style={styles.optionButton} onClick={handleAnalytics}>
            <span style={styles.optionIcon}>📊</span>
            <span style={styles.optionText}>
              <span style={styles.optionTitle}>Analytics</span>
              <span style={styles.optionDesc}>View site traffic and performance</span>
            </span>
          </button>
          <button style={styles.backBtn} onClick={() => { setAuthenticated(false); setError(''); }}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <p style={styles.title}>Al Safa Global</p>
          <p style={styles.subtitle}>Admin Access</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Enter admin password"
            autoFocus
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}
