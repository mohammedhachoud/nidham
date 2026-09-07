import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Target,
  Code2,
  Activity,
  CheckCircle2,
  FileEdit
} from 'lucide-react';
import type { DepthStage, WeeklyReview } from '../../types';

export const WeekView: React.FC = () => {
  const {
    selectedWeek,
    setSelectedWeekNumber,
    currentCycle,
    toggleWeeklyOutcome,
    saveWeeklyReview
  } = useApp();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Review Form States
  const [plannedSummary, setPlannedSummary] = useState(selectedWeek.review?.plannedSummary || '');
  const [executedSummary, setExecutedSummary] = useState(selectedWeek.review?.executedSummary || '');
  const [adj1, setAdj1] = useState(selectedWeek.review?.tacticalAdjustments[0] || '');
  const [adj2, setAdj2] = useState(selectedWeek.review?.tacticalAdjustments[1] || '');

  const handlePrevWeek = () => {
    if (selectedWeek.weekNumber > 1) {
      setSelectedWeekNumber(selectedWeek.weekNumber - 1);
    }
  };

  const handleNextWeek = () => {
    if (selectedWeek.weekNumber < 13) {
      setSelectedWeekNumber(selectedWeek.weekNumber + 1);
    }
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: WeeklyReview = {
      id: `rev-w${selectedWeek.weekNumber}`,
      weekNumber: selectedWeek.weekNumber,
      plannedSummary,
      executedSummary,
      missedDiagnoses: [],
      tacticalAdjustments: [adj1, adj2].filter(Boolean),
      completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    saveWeeklyReview(selectedWeek.weekNumber, newReview);
    setIsReviewModalOpen(false);
  };

  const getStageBadgeClass = (stage: DepthStage) => {
    switch (stage) {
      case 'Understand': return 'badge-neutral';
      case 'Practice': return 'badge-amber';
      case 'Implement': return 'badge-blue';
      case 'Validate': return 'badge-purple';
      case 'Apply + Evidence': return 'badge-green';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="layout-column animate-fade-in">
      {/* View Header with Week Navigation */}
      <div className="view-header">
        <div className="view-header-main">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-purple">
              Cycle {selectedWeek.cycleNumber} — {currentCycle.name}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              {selectedWeek.dateRange}
            </span>
          </div>
          <h1>Week {selectedWeek.weekNumber}</h1>
        </div>

        <div className="view-header-aside">
          {/* Week Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <button
              className="btn btn-ghost btn-icon"
              style={{ width: '28px', height: '28px' }}
              onClick={handlePrevWeek}
              disabled={selectedWeek.weekNumber <= 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0 8px' }}>
              W{selectedWeek.weekNumber} / 13
            </span>
            <button
              className="btn btn-ghost btn-icon"
              style={{ width: '28px', height: '28px' }}
              onClick={handleNextWeek}
              disabled={selectedWeek.weekNumber >= 13}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsReviewModalOpen(true)}
          >
            <FileEdit size={14} />
            <span>{selectedWeek.review ? 'Edit Weekly Review' : 'Perform Weekly Review'}</span>
          </button>
        </div>
      </div>

      {/* Weekly Mission Banner */}
      <div
        className="card"
        style={{
          border: '1px solid var(--border-light)',
          background: 'linear-gradient(135deg, rgba(23, 33, 51, 0.9) 0%, rgba(17, 24, 39, 0.95) 100%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="card-title-icon" style={{ background: 'var(--accent-primary)', color: '#FFFFFF' }}>
            <Target size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', fontWeight: 700 }}>
              Weekly Mission
            </div>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              "{selectedWeek.mission}"
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 Cards Grid: Outcomes, Technical Focus, Capacity at Glance */}
      <div className="grid-3col">
        {/* Weekly Outcomes */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.95rem' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} />
              Weekly Outcomes (Max 3–5)
            </span>
            <span className="badge badge-green font-mono">
              {selectedWeek.outcomes.filter(o => o.completed).length}/{selectedWeek.outcomes.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedWeek.outcomes.map(outcome => (
              <div
                key={outcome.id}
                className="item-row"
                onClick={() => toggleWeeklyOutcome(selectedWeek.weekNumber, outcome.id)}
                style={{ cursor: 'pointer', padding: '8px 10px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className={`custom-checkbox ${outcome.completed ? 'checked' : ''}`}>
                    <div className="checkbox-box" style={{ width: '16px', height: '16px' }}>
                      {outcome.completed && <CheckCircle2 size={12} />}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.84rem',
                    textDecoration: outcome.completed ? 'line-through' : 'none',
                    color: outcome.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                  }}>
                    {outcome.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Focus */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.95rem' }}>
              <Code2 size={16} style={{ color: 'var(--accent-primary)' }} />
              Technical Architecture
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Stable Track (RAG): </span>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>
                {selectedWeek.ragFocus}
              </div>
            </div>

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Rotating Focus ({selectedWeek.rotatingFocus.track}): </span>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>
                {selectedWeek.rotatingFocus.topic}
              </div>
            </div>

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Expected Tangible Output: </span>
              <div className="badge badge-blue" style={{ marginTop: '4px' }}>
                {selectedWeek.expectedOutput}
              </div>
            </div>
          </div>
        </div>

        {/* Capacity at a Glance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ fontSize: '0.95rem' }}>
              <Activity size={16} style={{ color: 'var(--status-warning)' }} />
              Week at a Glance
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Work Intensity:</span>
              <span className={`badge ${selectedWeek.capacityAtGlance.workIntensity === 'High' ? 'badge-amber' : 'badge-green'}`}>
                {selectedWeek.capacityAtGlance.workIntensity}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Training Scheduled:</span>
              <span className="font-mono">{selectedWeek.capacityAtGlance.trainingSessions} sessions</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Key Appointments:</span>
              <span className="font-mono">{selectedWeek.capacityAtGlance.appointments}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Travel / Constraints:</span>
              <span>{selectedWeek.capacityAtGlance.travel}</span>
            </div>
            {selectedWeek.capacityAtGlance.otherNotes && (
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Note: {selectedWeek.capacityAtGlance.otherNotes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 7-Day Matrix Distribution Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">
              <CalendarRange size={18} style={{ color: 'var(--accent-primary)' }} />
              7-Day Technical & IELTS Distribution Matrix
            </span>
            <span className="card-subtitle">
              Concentrated focus blocks: RAG remains stable; rotating theme receives multi-session depth.
            </span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Day</th>
                <th>Technical Focus & Depth Stage</th>
                <th>IELTS Skill Rotation</th>
                <th>Key Commitments</th>
                <th style={{ width: '90px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedWeek.dailySchedule.map(sched => (
                <tr
                  key={sched.dayNumber}
                  style={{
                    backgroundColor: sched.isToday ? 'var(--accent-primary-glow)' : 'transparent',
                    fontWeight: sched.isToday ? 600 : 400
                  }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: sched.isToday ? 'var(--accent-primary)' : 'var(--text-primary)', fontWeight: 700 }}>
                        {sched.dayName}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {sched.dateStr}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{sched.technicalFocus}</span>
                      <span className={`badge ${getStageBadgeClass(sched.technicalStage)}`} style={{ fontSize: '0.68rem' }}>
                        {sched.technicalStage}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                      {sched.ieltsSkill}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {sched.keyCommitments}
                  </td>
                  <td>
                    {sched.isToday ? (
                      <span className="badge badge-blue">★ Today</span>
                    ) : sched.completed ? (
                      <span className="badge badge-green">✓ Done</span>
                    ) : (
                      <span className="badge badge-neutral">Scheduled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Review Summary Card (if completed) */}
      {selectedWeek.review && (
        <div className="card" style={{ borderColor: 'var(--status-success-border)' }}>
          <div className="card-header">
            <span className="card-title" style={{ color: 'var(--status-success)' }}>
              <CheckCircle2 size={16} />
              Week {selectedWeek.weekNumber} Review & Diagnosis
            </span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Reviewed on {selectedWeek.review.completedAt}
            </span>
          </div>
          <div className="grid-2col" style={{ fontSize: '0.84rem' }}>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Execution Summary:</strong>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                {selectedWeek.review.executedSummary}
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Tactical Adjustments:</strong>
              <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {selectedWeek.review.tacticalAdjustments.map((adj, i) => (
                  <li key={i}>{adj}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Review Modal */}
      {isReviewModalOpen && (
        <div className="modal-overlay" onClick={() => setIsReviewModalOpen(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FileEdit size={18} style={{ color: 'var(--accent-primary)' }} />
                <span>Weekly Review — Week {selectedWeek.weekNumber}</span>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setIsReviewModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReview}>
              <div className="modal-body">
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Reflect with calm honesty: Plan → Execute → Measure → Reflect → Adjust.
                </p>

                <div className="form-group">
                  <label className="form-label">1. Planned: What mattered most this week?</label>
                  <input
                    type="text"
                    value={plannedSummary}
                    onChange={e => setPlannedSummary(e.target.value)}
                    placeholder="Summary of core outcomes"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">2. Executed: What actually happened and what evidence exists?</label>
                  <textarea
                    rows={3}
                    value={executedSummary}
                    onChange={e => setExecutedSummary(e.target.value)}
                    placeholder="Real outputs and completed milestones..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">3. Tactical Adjustments for Next Week (Max 1–2 changes)</label>
                  <input
                    type="text"
                    value={adj1}
                    onChange={e => setAdj1(e.target.value)}
                    placeholder="Adjustment #1 (e.g. Schedule writing practice on Saturday morning)"
                    required
                    style={{ marginBottom: '8px' }}
                  />
                  <input
                    type="text"
                    value={adj2}
                    onChange={e => setAdj2(e.target.value)}
                    placeholder="Adjustment #2 (e.g. Narrow technical scope per session)"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsReviewModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Weekly Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
