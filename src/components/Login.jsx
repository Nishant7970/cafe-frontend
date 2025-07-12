import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://cafe-backend-2-7npo.onrender.com/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      }));
      navigate(response.data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">☕ 𝐍𝐢𝐬𝐡𝐂𝐚𝐟𝐞</h2>
        <p className="login-subtitle">Welcome back! Please enter your credentials.</p>

        {error && <div className="error-alert">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                marginLeft: 'auto',
                cursor: 'pointer',
                color: '#8d6e63',
                fontSize: '0.9rem'
              }}
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </span>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" className="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
