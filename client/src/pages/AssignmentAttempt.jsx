import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AssignmentAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/${id}`)
      .then(res => res.json())
      .then(data => setAssignment(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  const runQuery = async () => {
    const res = await fetch('http://localhost:5000/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    if (data.success) {
      setResults(data.rows);

      if (JSON.stringify(data.rows) === JSON.stringify(assignment.expectedOutput.value)) {
        alert(" Brilliant! Solution matches perfectly.");
      }
    } else {
      alert("SQL Error: " + data.error);
    }
  };

  if (!assignment) return <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <div style={wsStyles.container}>
      <div style={wsStyles.sidebar}>
        <button onClick={() => navigate('/')} style={wsStyles.backBtn}>← Dashboard</button>
        <h2 style={wsStyles.sideTitle}>{assignment.title}</h2>
        <p style={wsStyles.sideDesc}>{assignment.question}</p>
        
        <div style={wsStyles.section}>
          <h4 style={wsStyles.sectionLabel}>DATABASE SCHEMA</h4>
          {}
          {assignment?.sampleTables?.map((table, i) => (
            <div key={i} style={wsStyles.tableInfo}>
              <strong>{table.name}</strong>
              <div style={wsStyles.cols}>
                {table.columns?.map((c, j) => (
                  <div key={j}>• {c.name} <span style={{color: '#475569'}}>({c.type})</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={wsStyles.studio}>
        <textarea 
          style={wsStyles.textarea} 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL Query..."
        />
        <button onClick={runQuery} style={wsStyles.runBtn}>Execute Query</button>
        <div style={wsStyles.resultsArea}>
          {results.length > 0 && (
            <table style={wsStyles.table}>
              <thead>
                <tr>{Object.keys(results[0]).map(k => <th key={k} style={wsStyles.th}>{k}</th>)}</tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>{Object.values(row).map((v, j) => <td key={j} style={wsStyles.td}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const wsStyles = {
  container: { display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: '#fff' },
  sidebar: { width: '320px', backgroundColor: '#1e293b', padding: '20px', borderRight: '1px solid #334155' },
  backBtn: { background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', marginBottom: '20px' },
  sideTitle: { fontSize: '1.2rem', marginBottom: '10px' },
  sideDesc: { color: '#94a3b8', fontSize: '0.9rem', marginBottom: '30px' },
  section: { marginTop: '20px' },
  sectionLabel: { color: '#60a5fa', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '10px' },
  tableInfo: { background: '#0f172a', padding: '10px', borderRadius: '5px', marginBottom: '10px' },
  cols: { fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' },
  studio: { flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' },
  textarea: { height: '200px', backgroundColor: '#1e293b', color: '#38bdf8', padding: '15px', border: 'none', borderRadius: '8px', fontSize: '1rem', fontFamily: 'monospace' },
  runBtn: { margin: '20px 0', padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  resultsArea: { flex: 1, overflow: 'auto', backgroundColor: '#1e293b', borderRadius: '8px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px', background: '#0f172a', fontSize: '0.8rem' },
  td: { padding: '12px', borderBottom: '1px solid #334155', fontSize: '0.9rem' }
};