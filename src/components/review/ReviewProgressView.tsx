import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export const ReviewProgressView: React.FC = () => {
  const {
    weeks,
    risks,
    outputs,
    computedStats
  } = useApp();

  const completedWeeklyReviews = weeks.filter(w => w.review);

  return (
    <div className="layout-column animate-fade-in">
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-main">
          <h1>Review + Progress</h1>
          <p>
            Plan → Execute → Measure → Reflect → Adjust. Measure only actionable information.
          </p>
        </div>
      </div>

      {/* Actionable Metrics Grid (Zero Fake Universal Scores) */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">
              <TrendingUp size={18} style={{ color: 'var(--accent-primary)' }} />
              Independent Operational Dimensions
            </span>
            <span className="card-subtitle">
              Separate measures for separate dimensions. No meaningless single percentage scores.
            </span>
          </div>
        </div>

        <div className="grid-4col">
          {/* Dimension 1: Completion */}
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              1. Completion
            </div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '6px 0' }}>
              {computedStats.weeklyExecutionRate}%
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Essential planned outcomes executed this week.
            </p>
          </div>

          {/* Dimension 2: Consistency */}
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--status-success)', fontWeight: 700, textTransform: 'uppercase' }}>
              2. Consistency
            </div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '6px 0' }}>
              {computedStats.weeklyIeltsConsistency}%
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              IELTS ({computedStats.weeklyIeltsCount}/7) & training habits maintained over time.
            </p>
          </div>

          {/* Dimension 3: Performance */}
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--status-purple)', fontWeight: 700, textTransform: 'uppercase' }}>
              3. Performance
            </div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '6px 0' }}>
              {computedStats.ieltsEstimatedBand > 0 ? computedStats.ieltsEstimatedBand : '—'} → {computedStats.ieltsTargetBand}
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              IELTS mock benchmark estimate & technical validation.
            </p>
          </div>

          {/* Dimension 4: Tangible Output */}
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--status-warning)', fontWeight: 700, textTransform: 'uppercase' }}>
              4. Tangible Output
            </div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '6px 0' }}>
              {outputs.length}
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Artifacts, evaluation reports & code in vault.
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Risk Detection Center */}
      <div className="card" style={{ borderColor: 'var(--status-warning-border)' }}>
        <div className="card-header">
          <span className="card-title" style={{ color: 'var(--status-warning)' }}>
            <AlertTriangle size={18} />
            Automated Risk Detection Center
          </span>
          <span className="badge badge-amber">{risks.length} Active Warnings</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {risks.map(risk => (
            <div
              key={risk.id}
              style={{
                padding: '14px',
                background: risk.severity === 'high' ? 'var(--status-danger-bg)' : 'var(--status-warning-bg)',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${risk.severity === 'high' ? 'var(--status-danger-border)' : 'var(--status-warning-border)'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.88rem', color: risk.severity === 'high' ? 'var(--status-danger)' : 'var(--status-warning)' }}>
                  {risk.title}
                </strong>
                <span className="badge badge-neutral font-mono" style={{ fontSize: '0.7rem' }}>
                  {risk.area}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {risk.description}
              </p>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-primary)', fontWeight: 500, padding: '6px 8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                Action: {risk.suggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews History Archive */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <FileCheck size={18} style={{ color: 'var(--accent-primary)' }} />
            Weekly Retrospective Reviews Archive
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {completedWeeklyReviews.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              No weekly retrospective reviews completed yet. As you conclude each week, complete your Sunday review to build your archive.
            </div>
          ) : (
            completedWeeklyReviews.map(w => (
              <div
                key={w.id}
                style={{
                  padding: '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-blue font-mono">Week {w.weekNumber}</span>
                    <strong style={{ fontSize: '0.94rem' }}>{w.mission}</strong>
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {w.review?.completedAt}
                  </span>
                </div>

                <div className="grid-2col" style={{ fontSize: '0.82rem', marginTop: '10px' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Executed Summary:</span>
                    <p style={{ color: 'var(--text-primary)', marginTop: '2px' }}>{w.review?.executedSummary}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Tactical Adjustments:</span>
                    <ul style={{ paddingLeft: '18px', color: 'var(--text-primary)', marginTop: '2px' }}>
                      {w.review?.tacticalAdjustments.map((adj, idx) => (
                        <li key={idx}>{adj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
