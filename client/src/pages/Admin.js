import React, { useState } from 'react';

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
    maxWidth: '380px',
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
  error: {
    color: '#e74c3c',
    fontSize: '13px',
    marginTop: '12px',
    textAlign: 'center',
  },
};

export default function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    if (password === adminPassword) {
      const url = process.env.REACT_APP_SANITY_STUDIO_URL;
      if (url) window.location.href = url;
      else setError('CMS URL not configured.');
    } else {
      setError('Incorrect password.');
      setPassword('');
    }
  };

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
          <button style={styles.button} type="submit">Access CMS</button>
        </form>
      </div>
    </div>
  );
}
