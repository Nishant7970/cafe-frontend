import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCoffee, FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { confirmPassword, ...userData } = formData;
      await axios.post("https://cafe-backend-2-7npo.onrender.com/api/users/register", userData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="text-center mb-6">
          <FaCoffee className="text-4xl text-amber-600 mx-auto mb-3 animate-pulse" />
          <h1 className="register-title">𝐍𝐢𝐬𝐡𝐂𝐚𝐟𝐞</h1>
          <p className="register-subtitle">Join our coffee community</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              name="password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="spinner mr-2"></span> Creating account...
              </span>
            ) : (
              <>
                <FaSignInAlt className="mr-2" /> Register
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <a href="/login" className="text-amber-700 hover:text-amber-900">Sign in</a></p>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          background: linear-gradient(
              rgba(0, 0, 0, 0.6), 
              rgba(0, 0, 0, 0.8)
            ),
            url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        .register-container {
          background: rgba(255, 253, 250, 0.98);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 380px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .register-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #4e342e;
          margin-bottom: 0.25rem;
          font-family: 'Playfair Display', serif;
        }

        .register-subtitle {
          font-size: 0.9rem;
          color: #6d4c41;
        }

        .error-message {
          background-color: #ffebee;
          border-left: 4px solid #d32f2f;
          color: #b71c1c;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border-radius: 0.25rem;
          font-size: 0.85rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .register-form {
          margin-top: 1.5rem;
        }

        .input-group {
          display: flex;
          align-items: center;
          background: #fff8f2;
          border: 1px solid #d7ccc8;
          border-radius: 0.5rem;
          padding: 0.6rem 1rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .input-group:focus-within {
          border-color: #a1887f;
          box-shadow: 0 0 0 2px rgba(161, 136, 127, 0.2);
        }

        .input-icon {
          font-size: 1rem;
          color: #8d6e63;
          margin-right: 0.75rem;
        }

        input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.9rem;
          color: #3e2723;
          font-family: 'Poppins', sans-serif;
          width: 100%;
          padding: 0.25rem 0;
        }

        input::placeholder {
          color: #bcaaa4;
          font-size: 0.9rem;
        }

        .register-button {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #6d4c41, #4e342e);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .register-button:hover {
          background: linear-gradient(135deg, #5d4037, #3e2723);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(110, 76, 65, 0.3);
        }

        .register-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .register-footer {
          text-align: center;
          font-size: 0.85rem;
          color: #5d4037;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #d7ccc8;
        }

        .register-footer a {
          color: #795548;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .register-footer a:hover {
          color: #4e342e;
          text-decoration: underline;
        }

        @media (max-width: 400px) {
          .register-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;