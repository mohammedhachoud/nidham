import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import {
  Target,
  Monitor,
  BarChart2,
  Calendar,
  Leaf,
  Brain,
  Sun,
  MoreHorizontal,
  Code,
  BookOpen,
  User,
  Check
} from 'lucide-react';

export const WeekView: React.FC = () => {
  const {
    selectedWeek,
    toggleWeeklyOutcome
  } = useApp();

  const [activePlanTab, setActivePlanTab] = useState<'technical' | 'ielts' | 'personal'>('technical');

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="90-DAY PERSONAL OPERATING SYSTEM"
        title="This Week"
        subtitle="Plan with intention. Make consistent progress."
        extraPill={
          <div className="pill-badge pill-sage">
            {selectedWeek.dateRange}
          </div>
        }
      />

      {/* Hero Split Grid: Panoramic Lake Card (2/3) + Quote Card (1/3) */}
      <div className="hero-split-grid">
        {/* Serene Panoramic Lake Card */}
        <div
          className="hero-banner-card"
          style={{ backgroundImage: 'url(/images/serene_mountain_lake.jpg)' }}
        >
          <div className="hero-banner-overlay" />
          <div className="hero-banner-content">
            <div className="hero-banner-caption">Cycle 1 — Reset + Foundation</div>
            <h2 className="hero-banner-title">Weekly Mission</h2>
            <p className="hero-banner-desc">
              {selectedWeek.mission}
            </p>
            <div className="hero-pills-row">
              <span className="hero-micro-pill">
                <Leaf size={12} color="var(--accent-sage)" />
                Build Good Habits
              </span>
              <span style={{ color: 'var(--border-light)' }}>|</span>
              <span className="hero-micro-pill">
                <Brain size={12} color="var(--accent-periwinkle)" />
                Make Steady Progress
              </span>
              <span style={{ color: 'var(--border-light)' }}>|</span>
              <span className="hero-micro-pill">
                <Sun size={12} color="var(--accent-sand)" />
                A Brighter Future
              </span>
            </div>
          </div>
          <div className="hero-handwritten-badge">Small steps create a bigger you.</div>
        </div>

        {/* Inspirational Quote Card with Botanical Watercolor Leaf */}
        <QuoteCard
          quote="A focused week today builds the life you want tomorrow."
          subtext="Progress is not about doing more, but about doing what matters."
        />
      </div>

      {/* 3-Column Body Grid: Outcomes, Technical Focus, Week at a Glance */}
      <div className="grid-3col">
        {/* Weekly Outcomes Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <Target size={14} />
                </div>
                Weekly Outcomes
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedWeek.outcomes.map(outcome => (
                <div
                  key={outcome.id}
                  onClick={() => toggleWeeklyOutcome(selectedWeek.weekNumber, outcome.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '0.86rem',
                    color: outcome.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: outcome.completed ? 'line-through' : 'none'
                  }}
                >
                  <div className={`checkbox-box ${outcome.completed ? 'checked' : ''}`} style={{
                    backgroundColor: outcome.completed ? 'var(--accent-sage)' : '#FFFFFF',
                    borderColor: outcome.completed ? 'var(--accent-sage)' : 'var(--border-light)'
                  }}>
                    {outcome.completed && <Check size={12} color="#FFFFFF" />}
                  </div>
                  <span>{outcome.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Consistency this week compounds into confidence next week.</span>
          </div>
        </div>

        {/* Technical Focus Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <Monitor size={14} />
                </div>
                Technical Focus
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Stable Track</span>
                <strong style={{ color: 'var(--text-primary)' }}>RAG</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>This Week</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedWeek.rotatingFocus.track}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Expected Output</span>
                <span style={{ color: 'var(--text-primary)', textAlign: 'right', maxWidth: '170px' }}>
                  {selectedWeek.expectedOutput}
                </span>
              </div>
            </div>
          </div>

          <div className="card-whisper-bar whisper-periwinkle">
            <Leaf size={14} />
            <span>Build. Learn. Ship. A stronger you, one project at a time.</span>
          </div>
        </div>

        {/* Week at a Glance Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-sand-bg)', color: 'var(--accent-sand)' }}>
                  <BarChart2 size={14} />
                </div>
                Week at a Glance
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Work intensity</span>
                <span>{selectedWeek.capacityAtGlance.workIntensity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Training sessions</span>
                <span className="font-mono">{selectedWeek.capacityAtGlance.trainingSessions}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Appointments</span>
                <span className="font-mono">{selectedWeek.capacityAtGlance.appointments}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Travel</span>
                <span className="font-mono">{selectedWeek.capacityAtGlance.travel === 'None' ? '0' : selectedWeek.capacityAtGlance.travel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Other</span>
                <span className="font-mono">1</span>
              </div>
            </div>
          </div>

          <div className="card-whisper-bar whisper-sand">
            <Leaf size={14} />
            <span>A balanced week creates sustainable progress.</span>
          </div>
        </div>
      </div>

      {/* Pill Tabs Selector: Technical Plan, IELTS Plan, Personal Plan */}
      <div className="pill-tabs-row" style={{ margin: '6px 0 0' }}>
        <button
          className={`pill-tab-btn ${activePlanTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActivePlanTab('technical')}
        >
          <Code size={14} />
          <span>Technical Plan</span>
        </button>
        <button
          className={`pill-tab-btn ${activePlanTab === 'ielts' ? 'active' : ''}`}
          onClick={() => setActivePlanTab('ielts')}
        >
          <BookOpen size={14} />
          <span>IELTS Plan</span>
        </button>
        <button
          className={`pill-tab-btn ${activePlanTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActivePlanTab('personal')}
        >
          <User size={14} />
          <span>Personal Plan</span>
        </button>
      </div>

      {/* Weekly Plan Matrix Table Card */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <div className="card-title-icon">
              <Calendar size={14} />
            </div>
            Weekly Plan
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-rose" style={{ fontStyle: 'italic', padding: '4px 12px' }}>
              Focus on progress, not perfection.
            </span>
            <button className="card-more-btn">
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Day</th>
                <th style={{ width: '90px' }}>Date</th>
                <th>Technical</th>
                <th>IELTS</th>
                <th>Key Commitments</th>
              </tr>
            </thead>
            <tbody>
              {selectedWeek.dailySchedule.map(row => {
                const dayClass = `day-badge-${row.dayName.toLowerCase()}`;
                return (
                  <tr key={row.dayNumber}>
                    <td>
                      <span className={`badge ${dayClass}`} style={{ fontWeight: 600, minWidth: '44px', justifyContent: 'center' }}>
                        {row.dayName}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                      {row.dateStr}
                    </td>
                    <td style={{ color: 'var(--text-primary)' }}>
                      {row.technicalFocus}
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ color: 'var(--accent-sage)', background: 'var(--accent-sage-bg)' }}>
                        {row.ieltsSkill}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {row.keyCommitments}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
