import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          navigate('/');
        } else {
          alert("Account created! Please login.");
          setIsLogin(true);
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server connection failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p style={styles.subtitle}>{isLogin ? 'Enter your credentials to access the lab' : 'Join the SQL mastery community'}</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input 
              style={styles.input} 
              placeholder="Username" 
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
              required 
            />
          )}
          <input 
            style={styles.input} 
            type="email" 
            placeholder="Email Address" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            style={styles.input} 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          <button type="submit" style={styles.button}>
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at center, #1e293b, #0f172a)',
    fontFamily: "'Inter', sans-serif",
  },
  glassCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  title: { color: '#fff', fontSize: '2rem', marginBottom: '10px', fontWeight: '800' },
  subtitle: { color: '#94a3b8', marginBottom: '30px', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s',
  },
  toggleText: { color: '#94a3b8', marginTop: '20px', fontSize: '0.9rem' },
  toggleLink: { color: '#60a5fa', cursor: 'pointer', fontWeight: 'bold' }
};