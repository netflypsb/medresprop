import { useRef } from 'react';
import styles from './ProposalResults.module.css';

const ProposalResults = ({ proposal }) => {
  const resultsRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  if (!proposal) return null;

  return (
    <div className={styles.proposalResults} ref={resultsRef}>
      <section className={styles.section}>
        <h2>{proposal.title}</h2>
        <div className={styles.abstract}>
          <h3>Abstract</h3>
          <p>{proposal.abstract}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Introduction</h3>
        <div>{proposal.introduction}</div>
      </section>

      <section className={styles.section}>
        <h3>Research Questions & Hypotheses</h3>
        <div>{proposal.hypotheses}</div>
      </section>

      <section className={styles.section}>
        <h3>Literature Review</h3>
        <div>{proposal.literature_review}</div>
      </section>

      <section className={styles.section}>
        <h3>Methodology</h3>
        <div className={styles.methodologyGrid}>
          <div>
            <h4>Study Design</h4>
            <p>{proposal.methodology.study_design}</p>
          </div>
          <div>
            <h4>Population and Sampling</h4>
            <p>{proposal.methodology.population}</p>
          </div>
          <div>
            <h4>Data Collection</h4>
            <p>{proposal.methodology.data_collection}</p>
          </div>
          <div>
            <h4>Statistical Analysis</h4>
            <p>{proposal.methodology.statistical_analysis}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Ethical Considerations</h3>
        <div>{proposal.ethics}</div>
      </section>

      <section className={styles.section}>
        <h3>Timeline</h3>
        <div>{proposal.timeline}</div>
      </section>

      <section className={styles.section}>
        <h3>Budget</h3>
        <table className={styles.budgetTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Personnel</td>
              <td>{proposal.budget.personnel}</td>
            </tr>
            <tr>
              <td>Equipment & Supplies</td>
              <td>{proposal.budget.equipment}</td>
            </tr>
            <tr>
              <td>Other Costs</td>
              <td>{proposal.budget.other}</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{proposal.budget.total}</strong></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h3>Expected Outcomes</h3>
        <div>{proposal.expected_outcomes}</div>
      </section>

      <section className={styles.section}>
        <h3>Potential Impact</h3>
        <div>{proposal.impact}</div>
      </section>

      <section className={styles.section}>
        <h3>References</h3>
        <ul className={styles.references}>
          {proposal.references.split('\n').map((ref, index) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      </section>

      <button onClick={handlePrint} className={styles.printButton}>
        Print Proposal
      </button>
    </div>
  );
};

export default ProposalResults; 