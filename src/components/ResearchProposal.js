import { useState } from 'react';
import styles from './ResearchProposal.module.css';

const ResearchProposal = ({ onSubmit, loading, error }) => {
  const [proposalData, setProposalData] = useState({
    title: '',
    background: '',
    objectives: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(proposalData);
  };

  return (
    <div className={styles.proposalForm}>
      <h2>Research Proposal Generator</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Research Title</label>
          <input
            id="title"
            type="text"
            value={proposalData.title}
            onChange={(e) => setProposalData({...proposalData, title: e.target.value})}
            placeholder="Enter the title of your research"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="background">Background Context</label>
          <textarea
            id="background"
            value={proposalData.background}
            onChange={(e) => setProposalData({...proposalData, background: e.target.value})}
            placeholder="Provide context and background for your research"
            rows={4}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="objectives">Research Objectives</label>
          <textarea
            id="objectives"
            value={proposalData.objectives}
            onChange={(e) => setProposalData({...proposalData, objectives: e.target.value})}
            placeholder="List your research objectives"
            rows={3}
            required
          />
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Generating Proposal...' : 'Generate Research Proposal'}
        </button>
      </form>
    </div>
  );
};

export default ResearchProposal; 