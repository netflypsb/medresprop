import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          MedResearch<span>AI</span>
        </Link>

        <nav className={styles.nav}>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.link}>Dashboard</Link>
              <button onClick={signOut} className={styles.button}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.link}>Login</Link>
              <Link to="/signup" className={styles.button}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 