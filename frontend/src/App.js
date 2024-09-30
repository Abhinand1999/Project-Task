import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { token } from './config';
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Layout />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
