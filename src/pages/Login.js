import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = e.target.elements;
    
    const { error } = await signIn(email.value, password.value);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2>Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 