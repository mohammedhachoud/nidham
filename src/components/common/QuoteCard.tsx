import React from 'react';

interface QuoteCardProps {
  quote: string;
  subtext?: string;
  source?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  subtext,
  source
}) => {
  return (
    <div className="quote-card">
      <img
        src="/images/botanical_leaf_branch.png"
        alt="Botanical branch"
        className="quote-leaf-img"
      />
      <div>
        <div className="quote-mark">“</div>
        <div className="quote-text">{quote}</div>
      </div>
      {subtext && (
        <div className="quote-subtext">
          {subtext}
          {source && <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px', color: 'var(--text-muted)' }}>{source}</div>}
        </div>
      )}
    </div>
  );
};
