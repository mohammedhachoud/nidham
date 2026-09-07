import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Sparkles,
  FileCheck,
  Award,
  BookOpen
} from 'lucide-react';

export const CycleView: React.FC = () => {
  const { cycles, currentCycle, computedStats } = useApp();
  const [selectedCycleTab, setSelectedCycleTab] = useState<number>(currentCycle.number);

  const activeCycleData = cycles.find(c => c.number === selectedCycleTab) || cycles[0];

  return (
    <div className="layout-column animate-fade-in">
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-main">
          <h1>Strategic Cycles</h1>
          <p>
            The 90 days are structured into 3 strategic chapters. Milestones and outputs define success over mere elapsed days.
          </p>
        </div>

        <div className="view-header-aside">
          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            {cycles.map(c => (
              <button
                key={c.id}
                className={`btn btn-sm ${selectedCycleTab === c.number ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedCycleTab(c.number)}
              >
                Cycle {c.number} {c.status === 'active' ? '(Active)' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cycle Banner Card */}
      <div className="banner-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge ${activeCycleData.status === 'active' ? 'badge-blue' : 'badge-neutral'}`}>
                <Layers size={12} />
                Cycle {activeCycleData.number} — {activeCycleData.name}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {activeCycleData.period.startDate} – {activeCycleData.period.endDate} (Days {activeCycleData.period.startDay}–{activeCycleData.period.endDay})
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>
              {activeCycleData.mission}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              "{activeCycleData.quote}"
            </p>
          </div>

          {activeCycleData.status === 'active' && (
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                Active Execution Phase
              </span>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                Day {computedStats.daysCompleted} / {activeCycleData.period.endDay}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar if active */}
        {activeCycleData.status === 'active' && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Cycle Milestone Progress</span>
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
        )}
      </div>

      {/* Grid: Major Themes vs Expected Outputs & Exit Criteria */}
      <div className="grid-2col">
        {/* Major Themes */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <BookOpen size={18} style={{ color: 'var(--accent-primary)' }} />
              Major Technical & Foundation Themes
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Themes exist across the cycle; they do NOT all become simultaneous daily tasks.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeCycleData.majorThemes.map((theme, idx) => (
              <div key={idx} className="item-row" style={{ padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="badge badge-neutral font-mono" style={{ fontSize: '0.7rem' }}>
                    0{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {theme}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Outputs & Exit Criteria */}
        <div className="layout-column">
          {/* Expected Outputs */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <FileCheck size={18} style={{ color: 'var(--status-success)' }} />
                Expected Tangible Outputs
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCycleData.expectedOutputs.map((output, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem' }}>
                  <span className="badge badge-green" style={{ padding: '2px 6px', fontSize: '0.68rem', marginTop: '2px' }}>✓</span>
                  <span style={{ color: 'var(--text-primary)' }}>{output}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exit Criteria */}
          <div className="card" style={{ borderColor: 'var(--status-purple-border)' }}>
            <div className="card-header">
              <span className="card-title" style={{ color: 'var(--status-purple)' }}>
                <Award size={18} />
                Cycle Exit Criteria
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCycleData.exitCriteria.map((criterion, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem' }}>
                  <span className="badge badge-purple" style={{ padding: '2px 6px', fontSize: '0.68rem', marginTop: '2px' }}>★</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{criterion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cycle Retrospective Blueprint */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">
              <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
              Cycle Retrospective Framework
            </span>
            <span className="card-subtitle">
              Answer at cycle conclusion: Plan → Execute → Measure → Reflect → Adjust.
            </span>
          </div>
        </div>

        <div className="grid-3col" style={{ fontSize: '0.84rem' }}>
          <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>1. What changed in me?</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.8rem' }}>
              Behavioral stabilization, sleep hygiene, and prayer consistency.
            </p>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>2. What can I do now?</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.8rem' }}>
              New technical capability (e.g. RAG retrieval evaluation & metric computation).
            </p>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>3. What exists because of this cycle?</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.8rem' }}>
              Documented evaluation report, working GitHub code, and IELTS test error log.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
