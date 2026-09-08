import React from 'react';
import { useApp } from '../../context/AppContext';
import { Archive, History, FileText } from 'lucide-react';

export const ArchiveView: React.FC = () => {
  const { weeks, outputs } = useApp();
  const completedWeeks = weeks.filter(w => w.review !== undefined);

  return (
    <div className="layout-column animate-fade-in">
      <div className="view-header">
        <div className="view-header-main">
          <h1>Historical Archive</h1>
          <p>
            Completed cycles, archived project repositories, and deep historical logs. Progressive disclosure keeps the primary dashboard calm.
          </p>
        </div>
      </div>

      <div className="grid-3col">
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Archive size={16} style={{ color: 'var(--accent-primary)' }} />
              Archived Cycles
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            No completed cycles yet. Active in Cycle 1 (Reset + Foundation).
          </p>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <History size={16} style={{ color: 'var(--status-success)' }} />
              Completed Weeks
            </span>
            <span className="badge badge-green font-mono">{completedWeeks.length} Weeks</span>
          </div>
          {completedWeeks.length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              No completed weeks archived yet. Currently in Week 1.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
              {completedWeeks.map(w => (
                <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span>Week {w.weekNumber} — {w.mission}</span>
                  <span className="badge badge-neutral">Archived</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <FileText size={16} style={{ color: 'var(--status-purple)' }} />
              Artifact Vault Total
            </span>
            <span className="badge badge-purple font-mono">{outputs.length} Artifacts</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            All verified evidence items are preserved permanently in localStorage.
          </p>
        </div>
      </div>
    </div>
  );
};
