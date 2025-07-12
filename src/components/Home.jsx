import { Link } from 'react-router-dom';
import { FaCoffee, FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="text-center mb-6">
          <FaCoffee className="text-4xl text-amber-600 mx-auto mb-3 animate-pulse" />
          <h1 className="login-title">Café Desi Byte</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form className="space-y-4">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1"
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              className="flex-1"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-amber-700 hover:text-amber-900">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            <FaSignInAlt className="mr-2" /> Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="font-medium">Sign up</Link></p>
        </div>
      </div>

      <style jsx>{`
        .login-page {
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

        .login-container {
          background: rgba(255, 253, 250, 0.98);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 380px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .login-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #4e342e;
          margin-bottom: 0.25rem;
          font-family: 'Playfair Display', serif;
        }

        .login-subtitle {
          font-size: 0.9rem;
          color: #6d4c41;
        }

        .input-group {
          display: flex;
          align-items: center;
          background: #fff8f2;
          border: 1px solid #d7ccc8;
          border-radius: 0.5rem;
          padding: 0.6rem 1rem;
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

        .checkbox {
          width: 16px;
          height: 16px;
          border: 1px solid #a1887f;
          border-radius: 3px;
          appearance: none;
          cursor: pointer;
          position: relative;
          margin: 0;
        }

        .checkbox:checked {
          background-color: #6d4c41;
        }

        .checkbox:checked::after {
          content: "✓";
          position: absolute;
          color: white;
          font-size: 0.7rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .login-button {
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
          margin-top: 1rem;
        }

        .login-button:hover {
          background: linear-gradient(135deg, #5d4037, #3e2723);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(110, 76, 65, 0.3);
        }

        .login-footer {
          text-align: center;
          font-size: 0.85rem;
          color: #5d4037;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #d7ccc8;
        }

        .login-footer a {
          color: #795548;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .login-footer a:hover {
          color: #4e342e;
          text-decoration: underline;
        }

        @media (max-width: 400px) {
          .login-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;