import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Languages,
  Plus,
  TrendingUp,
  AlertTriangle,
  RotateCw,
  BookOpen,
  Headphones,
  PenTool,
  Mic
} from 'lucide-react';
import type { IELTSSkill } from '../../types';

export const IELTSDashboardView: React.FC = () => {
  const {
    ieltsSessions,
    ieltsErrors,
    incrementIELTSError,
    setQuickLogOpen,
    computedStats
  } = useApp();

  const skills: { skill: IELTSSkill; current: number; target: number; icon: React.ReactNode }[] = [
    { skill: 'Reading', current: 6.5, target: 7.5, icon: <BookOpen size={16} /> },
    { skill: 'Listening', current: 7.0, target: 7.5, icon: <Headphones size={16} /> },
    { skill: 'Writing', current: 5.5, target: 7.5, icon: <PenTool size={16} /> },
    { skill: 'Speaking', current: 6.0, target: 7.5, icon: <Mic size={16} /> }
  ];

  return (
    <div className="layout-column animate-fade-in">
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-main">
          <h1>IELTS Progression System</h1>
          <p>
            Consistent 45-minute daily practice. Targeted weakness drilling. Separate continuous track.
          </p>
        </div>

        <div className="view-header-aside">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setQuickLogOpen(true, 'ielts-error')}
          >
            <AlertTriangle size={14} />
            <span>Record Recurring Error</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setQuickLogOpen(true, 'ielts-practice')}
          >
            <Plus size={14} />
            <span>+ Add Practice Session</span>
          </button>
        </div>
      </div>

      {/* Top 3 KPI Cards: Overall Progress, Skill Breakdown, Weekly Consistency */}
      <div className="grid-3col">
        {/* Overall Progress Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.95rem' }}>
              <TrendingUp size={16} style={{ color: 'var(--accent-primary)' }} />
              Overall Estimated Band
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0 16px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Estimate</div>
              <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {computedStats.ieltsEstimatedBand}
              </div>
            </div>
            <div style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>→</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--status-success)', textTransform: 'uppercase' }}>Target Score</div>
              <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--status-success)' }}>
                {computedStats.ieltsTargetBand}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Target Band Gap</span>
              <span className="font-mono">66%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill fill-green" style={{ width: '66%' }} />
            </div>
          </div>
        </div>

        {/* Skill Performance Breakdown */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.95rem' }}>
              <Languages size={16} style={{ color: 'var(--status-success)' }} />
              Skill Performance
            </span>
            <span className="card-subtitle">Target: 7.5+</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.map(s => {
              const percent = Math.round((s.current / 9.0) * 100);
              return (
                <div key={s.skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                      {s.icon}
                      {s.skill}
                    </span>
                    <span className="font-mono" style={{ fontWeight: 600, color: s.current < 6.0 ? 'var(--status-danger)' : 'var(--text-primary)' }}>
                      {s.current}
                    </span>
                  </div>
                  <div className="progress-bar-container" style={{ height: '6px' }}>
                    <div
                      className={`progress-bar-fill ${
                        s.current >= 7.0 ? 'fill-green' :
                        s.current >= 6.0 ? 'fill-blue' : 'fill-amber'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Consistency Meter */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.95rem' }}>
              <RotateCw size={16} style={{ color: 'var(--status-purple)' }} />
              Weekly Consistency
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 0' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid var(--status-success)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px var(--status-success-bg)'
              }}
            >
              <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {computedStats.weeklyIeltsCount}/7
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Sessions
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '10px', textAlign: 'center' }}>
              5 of 7 daily 45m sessions completed this week.
            </p>
          </div>
        </div>
      </div>

      {/* Top Recurring Errors System Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title" style={{ color: 'var(--status-warning)' }}>
              <AlertTriangle size={18} />
              Top Recurring Error System & Weakness Diagnostics
            </span>
            <span className="card-subtitle">
              The error system prevents the same mistake from surviving for weeks.
            </span>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setQuickLogOpen(true, 'ielts-error')}
          >
            <Plus size={14} />
            <span>Add Error Pattern</span>
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Count</th>
                <th>Skill & Error Type</th>
                <th>Concrete Example</th>
                <th>Root Cause & Correction</th>
                <th>Prescribed Next Drill</th>
                <th style={{ width: '80px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ieltsErrors.map(err => (
                <tr key={err.id}>
                  <td>
                    <span className="badge badge-amber font-mono" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {err.recurrenceCount}x
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>{err.errorType}</strong>
                    <div style={{ fontSize: '0.74rem', color: 'var(--accent-primary)' }}>{err.skill}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                    "{err.example}"
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--status-danger)', marginBottom: '2px' }}>
                      Why: {err.reason}
                    </div>
                    <div style={{ color: 'var(--status-success)', fontWeight: 500 }}>
                      Rule: {err.correction}
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
                      {err.nextDrill}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => incrementIELTSError(err.id)}
                      title="Log another occurrence of this mistake"
                    >
                      +1 Recur
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practice Sessions History Table */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <Languages size={18} style={{ color: 'var(--accent-primary)' }} />
            Recent 45-Min Practice Sessions
          </span>
          <span className="badge badge-neutral font-mono">{ieltsSessions.length} total logged</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Date</th>
                <th>Skill</th>
                <th>Focus Topic & Source</th>
                <th>Duration</th>
                <th>Result / Band</th>
                <th>Next Action</th>
              </tr>
            </thead>
            <tbody>
              {ieltsSessions.map(sess => (
                <tr key={sess.id}>
                  <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {sess.date}
                  </td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: '0.74rem' }}>
                      {sess.skill}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{sess.focus}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{sess.practiceType}</div>
                  </td>
                  <td className="font-mono" style={{ fontSize: '0.8rem' }}>
                    {sess.durationMinutes}m
                  </td>
                  <td>
                    {sess.resultScore ? (
                      <span className="badge badge-blue font-mono" style={{ fontWeight: 600 }}>
                        Band {sess.resultScore}
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Completed</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {sess.nextAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
