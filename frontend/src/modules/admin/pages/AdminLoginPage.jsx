import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SEED } from '../constants/adminSeed';

const cardStyle = {
  width: '100%',
  maxWidth: '420px',
  background: '#ffffff',
  borderRadius: '14px',
  padding: '28px',
  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  marginTop: '8px',
  marginBottom: '16px',
  fontSize: '14px',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: '10px',
  background: '#111827',
  color: '#ffffff',
  padding: '12px',
  fontSize: '14px',
  cursor: 'pointer',
};

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError('Email and password are required.');
      return;
    }

    if (normalizedEmail === ADMIN_SEED.email.toLowerCase() && normalizedPassword === ADMIN_SEED.password) {
      setSuccess('Admin login successful.');
      navigate('/admin', { replace: true });
      return;
    }

    setError('Invalid admin credentials.');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f3f4f6, #e5e7eb)',
        padding: '16px',
      }}
    >
      <div style={cardStyle}>
        <h1 style={{ margin: 0, marginBottom: '6px', fontSize: '26px', color: '#111827' }}>Admin Login</h1>
        <p style={{ marginTop: 0, marginBottom: '20px', color: '#4b5563', fontSize: '14px' }}>
          Sign in to access the admin panel.
        </p>
        <p style={{ marginTop: 0, marginBottom: '20px', color: '#6b7280', fontSize: '12px' }}>
          Use: {ADMIN_SEED.email} / {ADMIN_SEED.password}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email" style={{ fontSize: '13px', color: '#374151' }}>
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={inputStyle}
            required
          />

          <label htmlFor="admin-password" style={{ fontSize: '13px', color: '#374151' }}>
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        {error && <p style={{ color: '#b91c1c', fontSize: '13px', marginTop: '14px' }}>{error}</p>}
        {success && <p style={{ color: '#166534', fontSize: '13px', marginTop: '14px' }}>{success}</p>}
      </div>
    </div>
  );
}

export default AdminLoginPage;
