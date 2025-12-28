import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch('http://localhost:5000/api/assignments')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/auth');
  };

  if (loading) return <div style={styles.loading}>Initializing Lab...</div>;

  return (
    <div style={styles.dashboardContainer}>
      <nav style={styles.navbar}>
        <div style={styles.navLogo}>Cipher<span style={{color: '#60a5fa'}}>SQL</span></div>
        <div style={styles.navUser}>
          <span style={styles.welcome}>Welcome, <strong>{username}</strong></span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <header style={styles.header}>
        <h1 style={styles.title}>SQL Mastery Challenges</h1>
        <p style={styles.subtitle}>Select a module to begin your database journey</p>
      </header>

      <div style={styles.grid}>
        {tasks.map((t) => (
          <div key={t._id} style={styles.card}>
            <div style={styles.badge}>{t.description}</div>
            <h3 style={styles.cardTitle}>{t.title}</h3>
            <Link to={`/assignment/${t._id}`} style={styles.solveBtn}>Launch Challenge</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top left, #1e293b, #0f172a)',
    padding: '0 20px 60px 20px',
    fontFamily: "'Inter', sans-serif",
    color: '#f8fafc'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    maxWidth: '1200px',
    margin: '0 auto 40px auto'
  },
  navLogo: { fontSize: '1.5rem', fontWeight: 'bold' },
  navUser: { display: 'flex', alignItems: 'center', gap: '20px' },
  welcome: { color: '#94a3b8', fontSize: '0.9rem' },
  logoutBtn: { 
    background: 'rgba(239, 68, 68, 0.1)', 
    color: '#ef4444', 
    border: '1px solid #ef4444', 
    padding: '6px 15px', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { fontSize: '2.5rem', fontWeight: '800' },
  subtitle: { color: '#94a3b8' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' },
  card: { background: 'rgba(30, 41, 59, 0.5)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' },
  badge: { background: '#1e3a8a', color: '#93c5fd', padding: '4px 10px', borderRadius: '15px', fontSize: '0.7rem', fontWeight: '700', marginBottom: '15px', display: 'inline-block' },
  cardTitle: { marginBottom: '20px' },
  solveBtn: { display: 'block', textAlign: 'center', background: '#3b82f6', color: 'white', textDecoration: 'none', padding: '10px', borderRadius: '10px', fontWeight: '600' },
  loading: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff' }
};