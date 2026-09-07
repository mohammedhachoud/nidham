import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  Code2,
  Languages,
  Heart,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Play
} from 'lucide-react';

export const CommandCenterView: React.FC = () => {
  const {
    today,
    currentCycle,
    computedStats,
    outputs,
    risks,
    setActiveTab,
    toggleMainObjective,
    activeProject
  } = useApp();

  return (
    <div className="layout-column animate-fade-in">
      {/* 1. Cycle Strategic Banner */}
      <div className="banner-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-blue">
                <Layers size={12} />
                Cycle {currentCycle.number} — {currentCycle.name}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Days {currentCycle.period.startDay}–{currentCycle.period.endDay}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>
              {currentCycle.mission}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <span>
                <strong style={{ color: 'var(--text-primary)' }}>{computedStats.daysCompleted}</strong> days completed
              </span>
              <span>•</span>
              <span>
                <strong style={{ color: 'var(--text-primary)' }}>{computedStats.daysRemaining}</strong> days remaining
              </span>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 18px',
              maxWidth: '280px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={12} />
              Operating Anchor
            </div>
            <p style={{ fontSize: '0.86rem', fontStyle: 'italic', color: 'var(--text-primary)', marginTop: '4px' }}>
              "{currentCycle.quote}"
            </p>
          </div>
        </div>

        {/* Cycle Progress Bar */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Cycle Progress</span>
            <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
              {Math.round((computedStats.cycleDaysCompleted / computedStats.cycleTotalDays) * 100)}%
            </span>
          </div>
          <div className="progress-bar-container" style={{ height: '8px' }}>
            <div
              className="progress-bar-fill fill-blue"
              style={{ width: `${Math.round((computedStats.cycleDaysCompleted / computedStats.cycleTotalDays) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Four Immediate Context Cards */}
      <div className="grid-4col">
        {/* Today's Focus */}
        <div className="card card-hover" onClick={() => setActiveTab('today')} style={{ cursor: 'pointer' }}>
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.9rem' }}>
              <div className="card-title-icon" style={{ background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)' }}>
                <Target size={15} />
              </div>
              Today's Focus
            </span>
            <span className="badge badge-blue">~{today.mainObjective.estimatedMinutes} min</span>
          </div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {today.mainObjective.completed ? '✓ ' : ''}
            RAG Evaluation
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            Analyze retrieval failures and document key patterns.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.74rem', color: today.mainObjective.completed ? 'var(--status-success)' : 'var(--text-muted)' }}>
              {today.mainObjective.completed ? 'Completed' : 'Pending execution'}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleMainObjective();
              }}
            >
              {today.mainObjective.completed ? <CheckCircle2 size={14} color="var(--status-success)" /> : <Play size={14} />}
            </button>
          </div>
        </div>

        {/* Technical Context */}
        <div className="card card-hover" onClick={() => setActiveTab('learning-projects')} style={{ cursor: 'pointer' }}>
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.9rem' }}>
              <div className="card-title-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366F1' }}>
                <Code2 size={15} />
              </div>
              Technical Context
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Stable Track: </span>
              <strong style={{ color: 'var(--text-primary)' }}>RAG</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Current Focus: </span>
              <strong style={{ color: 'var(--text-primary)' }}>Web Dev</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Project: </span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{activeProject.title}</span>
            </div>
          </div>
        </div>

        {/* IELTS Context */}
        <div className="card card-hover" onClick={() => setActiveTab('ielts')} style={{ cursor: 'pointer' }}>
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.9rem' }}>
              <div className="card-title-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-success)' }}>
                <Languages size={15} />
              </div>
              IELTS
            </span>
            <span className="badge badge-green">45 min</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Today: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{today.ieltsSession.skill}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Focus: </span>
              <span style={{ color: 'var(--text-secondary)' }}>Distractors</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Score: </span>
              <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {computedStats.ieltsEstimatedBand} → {computedStats.ieltsTargetBand}
              </span>
            </div>
          </div>
        </div>

        {/* Health & Discipline */}
        <div className="card card-hover" onClick={() => setActiveTab('today')} style={{ cursor: 'pointer' }}>
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.9rem' }}>
              <div className="card-title-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-warning)' }}>
                <Heart size={15} />
              </div>
              Health & Anchors
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-green" style={{ padding: '2px 6px', fontSize: '0.68rem' }}>✓</span>
              <span>Training: Scheduled</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-blue" style={{ padding: '2px 6px', fontSize: '0.68rem' }}>☾</span>
              <span>Sleep: {today.personalAnchors.health.sleepHours}h (avg)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-purple" style={{ padding: '2px 6px', fontSize: '0.68rem' }}>⚡</span>
              <span>Screen Time: On track</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Split: Recent Outputs vs Weekly Health & Actionable Risks */}
      <div className="grid-2col-split">
        {/* Left Column: Recent Tangible Outputs */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
              Recent Outputs & Evidence
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('learning-projects')}>
              <span>View all</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Tangible artifacts produced through deliberate learning and project execution.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {outputs.slice(0, 5).map(out => (
              <div key={out.id} className="item-row" style={{ alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: out.type.includes('Report') ? 'var(--accent-primary)' : out.type.includes('IELTS') ? 'var(--status-success)' : 'var(--status-purple)',
                      marginTop: '6px',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{out.title}</strong>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{out.type}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                      {out.description}
                    </p>
                    {out.snippet && (
                      <div
                        style={{
                          marginTop: '6px',
                          padding: '6px 10px',
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {out.snippet}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {out.date}
                  </span>
                  {out.url && (
                    <div style={{ marginTop: '4px' }}>
                      <a href={out.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <span>Inspect</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Weekly Health & Actionable Risks */}
        <div className="layout-column">
          {/* Weekly Progress Card */}
          <div className="card">
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '0.95rem' }}>
                <TrendingUp size={16} style={{ color: 'var(--status-success)' }} />
                Weekly Progress
              </span>
              <span className="badge badge-blue">Week {today.weekNumber}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Execution (Planned Outcomes)</span>
                  <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>70%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-green" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>IELTS Consistency (5/7 sessions)</span>
                  <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>86%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-green" style={{ width: '86%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Training Consistency</span>
                  <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>57%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-amber" style={{ width: '57%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Project Progress ({activeProject.title})</span>
                  <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>60%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-blue" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Current Risks Card */}
          <div className="card" style={{ borderColor: 'var(--status-warning-border)' }}>
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '0.95rem', color: 'var(--status-warning)' }}>
                <AlertTriangle size={16} />
                Current Actionable Risks
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('review')}>
                <span>View details</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {risks.map(risk => (
                <div
                  key={risk.id}
                  style={{
                    padding: '10px 12px',
                    background: risk.severity === 'high' ? 'var(--status-danger-bg)' : 'var(--status-warning-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${risk.severity === 'high' ? 'var(--status-danger-border)' : 'var(--status-warning-border)'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.82rem', color: risk.severity === 'high' ? 'var(--status-danger)' : 'var(--status-warning)' }}>
                      {risk.title}
                    </strong>
                    <span className="badge badge-neutral font-mono" style={{ fontSize: '0.68rem' }}>
                      {risk.area}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
