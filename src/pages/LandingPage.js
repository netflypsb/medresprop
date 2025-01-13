import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <Header />
      
      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>
              Transform Medical Research with
              <span className={styles.gradient}> AI-Powered</span> Proposals
            </h1>
            <p>
              Generate comprehensive medical research proposals in minutes using advanced AI technology.
              Save time, improve quality, and accelerate your research journey.
            </p>
            <div className={styles.cta}>
              <Link to="/signup" className={styles.primaryButton}>
                Get Started Free
              </Link>
              <Link to="/login" className={styles.secondaryButton}>
                View Demo
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            <h2>Why Choose MedResearchAI?</h2>
            <div className={styles.grid}>
              <div className={styles.feature}>
                <div className={styles.icon}>⚡</div>
                <h3>Lightning Fast</h3>
                <p>Generate complete research proposals in minutes, not weeks</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.icon}>🎯</div>
                <h3>Highly Accurate</h3>
                <p>AI-powered analysis ensures precise and relevant content</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.icon}>📚</div>
                <h3>Comprehensive</h3>
                <p>Covers all essential sections of a research proposal</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.icon}>🔄</div>
                <h3>Iterative Process</h3>
                <p>Easily refine and update your proposals</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <div className={styles.container}>
            <h2>Trusted by Medical Researchers</h2>
            <div className={styles.testimonialGrid}>
              {/* Add testimonials */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage; 