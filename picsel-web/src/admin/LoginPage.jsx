// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Disable button while checking

    try {
      // Connect to Spring Boot Backend
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Backend Response:", data);
        
        // Optional: Store a login flag in localStorage so they stay logged in on refresh
        localStorage.setItem('isAuthenticated', 'true'); 
        
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Access denied.');
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setError('Server error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glow-effect"></div>
      
      <div className="login-card">
        <div className="logo-area">
          <h1 className="brand-title">PICSEL CLUB</h1>
          <p className="brand-subtitle">Admin Dashboard Access</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter admin ID"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;