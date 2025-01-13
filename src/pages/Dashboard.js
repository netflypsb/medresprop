import { useState } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSubmitResearch = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch('http://localhost:8000/api/submit-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      
      setResult(data.review);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Research Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <section className={styles.section}>
        <h2>Submit Research</h2>
        <div className={styles.research}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your research description..."
            rows={5}
            className={styles.textarea}
          />
          <button 
            onClick={handleSubmitResearch} 
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Processing...' : 'Generate Literature Review'}
          </button>
        </div>
      </section>

      {error && <div className={styles.error}>{error}</div>}
      
      {result && (
        <section className={styles.section}>
          <h2>Results</h2>
          <div className={styles.result}>
            {result}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard; 