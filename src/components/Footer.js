import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3>MedResearchAI</h3>
            <p>Transforming medical research with AI-powered solutions.</p>
          </div>
          
          <div className={styles.links}>
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/demo">Demo</Link>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/blog">Blog</Link>
          </div>

          <div className={styles.links}>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 MedResearchAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 