import { useState } from 'react';
import ResearchProposal from './ResearchProposal';
import ProposalResults from './ProposalResults';
import styles from './ProposalGenerator.module.css';

const ProposalGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proposal, setProposal] = useState(null);

  const handleGenerateProposal = async (proposalData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8000/api/generate-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      
      setProposal(data.proposal);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!proposal ? (
        <ResearchProposal 
          onSubmit={handleGenerateProposal}
          loading={loading}
          error={error}
        />
      ) : (
        <>
          <button 
            className={styles.newProposalButton}
            onClick={() => setProposal(null)}
          >
            Generate New Proposal
          </button>
          <ProposalResults proposal={proposal} />
        </>
      )}
    </div>
  );
};

export default ProposalGenerator; 