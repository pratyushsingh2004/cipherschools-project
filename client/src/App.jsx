import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AssignmentAttempt from './pages/AssignmentAttempt';
import Auth from './pages/Auth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {}
        <Route path="/auth" element={<Auth />} />
        
        {}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {}
        <Route path="/assignment/:id" element={
          <ProtectedRoute>
            <AssignmentAttempt />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}