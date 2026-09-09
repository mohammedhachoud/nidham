import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import { getDayCurriculum } from '../../data/dailyCurriculum';
import type { DayData, DaySideCompletion } from '../../types';
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
  Check,
  CheckCircle2,
  Sparkles,
  Heart,
  Layers,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';

export const WeekView: React.FC = () => {
  const {
    selectedWeek,
    toggleWeeklyOutcome,
    today,
    getDayData,
    calculateDaySideCompletion,
    switchToDay,
    setActiveTab
  } = useApp();

  const [activePlanTab, setActivePlanTab] = useState<'all' | 'technical' | 'ielts' | 'personal'>('all');
  const [inspectDayNumber, setInspectDayNumber] = useState<number | null>(null);

  // Yesterday's information for the dedicated recap
  const yesterdayDayNumber = today.dayNumber > 1 ? today.dayNumber - 1 : null;
  const yesterdayData: DayData | null = yesterdayDayNumber ? getDayData(yesterdayDayNumber) : null;
  const yesterdayStats: DaySideCompletion | null = yesterdayData ? calculateDaySideCompletion(yesterdayData) : null;

  // Inspected day data for modal
  const inspectedDay: DayData | null = inspectDayNumber ? getDayData(inspectDayNumber) : null;
  const inspectedStats: DaySideCompletion | null = inspectedDay ? calculateDaySideCompletion(inspectedDay) : null;
  const inspectedCurriculum = inspectDayNumber ? getDayCurriculum(inspectDayNumber) : null;

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

      {/* ── Yesterday's Multi-Side Execution Recap Card (Dedicated Tracker) ── */}
      {yesterdayData && yesterdayStats && (
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(244, 248, 245, 0.95), rgba(255, 255, 255, 0.98))', border: '1.5px solid var(--accent-sage-soft)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="card-title-icon" style={{ background: 'var(--accent-sage-bg)', color: 'var(--accent-sage)' }}>
                <Sparkles size={15} />
              </div>
              <div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Yesterday's Tracked Execution · Day {yesterdayData.dayNumber} ({yesterdayData.date.split(',')[0]}, {yesterdayData.date.split(',')[1]})
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  Detailed completion percentages tracked across each operational side.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-sage" style={{ fontSize: '0.82rem', padding: '4px 12px', fontWeight: 700 }}>
                {yesterdayStats.overallPercent}% Completed Yesterday
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setInspectDayNumber(yesterdayDayNumber)}
                style={{ fontSize: '0.75rem', gap: '4px' }}
              >
                <span>View Full Log</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* 5-Side Breakdown Grid */}
          <div className="grid-5col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {/* 1. Technical Side */}
            <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-sage)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Code size={13} />
                  Technical
                </span>
                <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: yesterdayStats.technicalPercent > 0 ? 'var(--accent-sage)' : 'var(--text-muted)' }}>
                  {yesterdayStats.technicalPercent}%
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {yesterdayData.mainObjective.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {yesterdayData.mainObjective.completed ? '✓ Objective Completed' : 'Deep work harness logged'}
              </div>
            </div>

            {/* 2. Faith & Anchors */}
            <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-sand)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sun size={13} />
                  Faith &amp; Anchors
                </span>
                <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: yesterdayStats.faithPercent > 0 ? 'var(--accent-sand)' : 'var(--text-muted)' }}>
                  {yesterdayStats.faithPercent}%
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {yesterdayData.personalAnchors.faith.prayers.filter(Boolean).length}/5 Prayers
                {yesterdayData.personalAnchors.faith.fajrOnTime ? ' (Fajr On-time ✓)' : ''}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {yesterdayData.personalAnchors.faith.morningAdhkar ? '🌅 Morning Adhkar ✓' : ''}
                {yesterdayData.personalAnchors.faith.baqarahThirds?.filter(Boolean).length ? ' · Baqarah 1/3 ✓' : ''}
              </div>
            </div>

            {/* 3. IELTS Track */}
            <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-periwinkle)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <BookOpen size={13} />
                  IELTS
                </span>
                <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: yesterdayStats.ieltsPercent > 0 ? 'var(--accent-periwinkle)' : 'var(--text-muted)' }}>
                  {yesterdayStats.ieltsPercent}%
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {yesterdayData.ieltsSession.skill} Session
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {yesterdayData.ieltsSession.completed ? '✓ 45 min Diagnostic Done' : 'Diagnostic session scheduled'}
              </div>
            </div>

            {/* 4. Health & Discipline */}
            <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Heart size={13} />
                  Health &amp; Limits
                </span>
                <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: yesterdayStats.healthPercent > 0 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                  {yesterdayStats.healthPercent}%
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {yesterdayData.personalAnchors.health.trainingCompleted ? '✓ Training Completed' : 'Evening Training'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {yesterdayData.personalAnchors.discipline.screenTimeBoundaryKept ? '⚡ Screen Limits Kept' : 'Sleep & Screen monitored'}
              </div>
            </div>

            {/* 5. Essential Commitments */}
            <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="var(--accent-sage)" />
                  Commitments
                </span>
                <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: yesterdayStats.commitmentsPercent > 0 ? 'var(--accent-sage)' : 'var(--text-muted)' }}>
                  {yesterdayStats.commitmentsPercent}%
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {yesterdayData.essentialCommitments.filter(c => c.completed).length} / {yesterdayData.essentialCommitments.length} Completed
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Faith &amp; Tech priorities verified
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Pill Tabs Selector: All-in-One, Technical Plan, IELTS Plan, Personal Plan */}
      <div className="pill-tabs-row" style={{ margin: '6px 0 0' }}>
        <button
          className={`pill-tab-btn ${activePlanTab === 'all' ? 'active' : ''}`}
          onClick={() => setActivePlanTab('all')}
        >
          <Layers size={14} />
          <span>All-in-One Matrix</span>
        </button>
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
            Weekly Plan Matrix &amp; Multi-Side Tracking
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
              {activePlanTab === 'all' && (
                <tr>
                  <th style={{ width: '80px' }}>Day</th>
                  <th style={{ width: '85px' }}>Date</th>
                  <th>Technical Focus</th>
                  <th style={{ width: '110px' }}>IELTS</th>
                  <th>Key Commitments</th>
                  <th style={{ width: '220px' }}>Sides Breakdown</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>Progress</th>
                </tr>
              )}
              {activePlanTab === 'technical' && (
                <tr>
                  <th style={{ width: '80px' }}>Day</th>
                  <th style={{ width: '85px' }}>Date</th>
                  <th>Technical Deep Work</th>
                  <th style={{ width: '120px' }}>Stage</th>
                  <th>Expected Deliverable</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Tech Progress</th>
                </tr>
              )}
              {activePlanTab === 'ielts' && (
                <tr>
                  <th style={{ width: '80px' }}>Day</th>
                  <th style={{ width: '85px' }}>Date</th>
                  <th style={{ width: '120px' }}>IELTS Skill</th>
                  <th>Diagnostic Focus Area</th>
                  <th>Diagnostic Commitment</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Status</th>
                </tr>
              )}
              {activePlanTab === 'personal' && (
                <tr>
                  <th style={{ width: '80px' }}>Day</th>
                  <th style={{ width: '85px' }}>Date</th>
                  <th>5 Prayers &amp; Fajr</th>
                  <th>Al-Baqarah &amp; Adhkar</th>
                  <th>Movement / Training</th>
                  <th style={{ width: '140px', textAlign: 'center' }}>Faith &amp; Health</th>
                </tr>
              )}
            </thead>
            <tbody>
              {selectedWeek.dailySchedule.map(row => {
                const dayClass = `day-badge-${row.dayName.toLowerCase()}`;
                const dayCurriculum = getDayCurriculum(row.dayNumber);
                const stats = row.completionStats;
                const isPast = row.dayNumber < today.dayNumber;

                return (
                  <tr
                    key={row.dayNumber}
                    onClick={() => setInspectDayNumber(row.dayNumber)}
                    style={{
                      cursor: 'pointer',
                      ...(row.isToday ? {
                        background: 'var(--accent-sage-bg)',
                        outline: '1.5px solid var(--accent-sage)',
                        outlineOffset: '-1px'
                      } : undefined)
                    }}
                    title="Click to inspect day breakdown"
                  >
                    <td>
                      <span className={`badge ${dayClass}`} style={{ fontWeight: 600, minWidth: '44px', justifyContent: 'center' }}>
                        {row.dayName}
                      </span>
                      {row.isToday && (
                        <span style={{ fontSize: '0.68rem', color: 'var(--accent-sage)', fontWeight: 700, marginLeft: '4px' }}>Today</span>
                      )}
                    </td>
                    <td style={{ color: row.isToday ? 'var(--accent-sage)' : 'var(--text-secondary)', fontSize: '0.84rem', fontWeight: row.isToday ? 600 : 400 }}>
                      {row.dateStr}
                    </td>

                    {/* ── ALL-IN-ONE TAB ── */}
                    {activePlanTab === 'all' && (
                      <>
                        <td style={{ color: 'var(--text-primary)', fontWeight: row.isToday ? 600 : 400 }}>
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
                        <td>
                          {stats ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              <span className="badge" style={{ fontSize: '0.68rem', padding: '1px 5px', background: stats.technicalPercent > 0 ? 'var(--accent-sage-bg)' : 'var(--bg-secondary)', color: stats.technicalPercent > 0 ? 'var(--accent-sage)' : 'var(--text-muted)' }} title={`Technical: ${stats.technicalPercent}%`}>
                                💻 {stats.technicalPercent}%
                              </span>
                              <span className="badge" style={{ fontSize: '0.68rem', padding: '1px 5px', background: stats.faithPercent > 0 ? 'var(--accent-sand-bg)' : 'var(--bg-secondary)', color: stats.faithPercent > 0 ? 'var(--accent-sand)' : 'var(--text-muted)' }} title={`Faith: ${stats.faithPercent}%`}>
                                🌙 {stats.faithPercent}%
                              </span>
                              <span className="badge" style={{ fontSize: '0.68rem', padding: '1px 5px', background: stats.ieltsPercent > 0 ? 'var(--accent-periwinkle-bg)' : 'var(--bg-secondary)', color: stats.ieltsPercent > 0 ? 'var(--accent-periwinkle)' : 'var(--text-muted)' }} title={`IELTS: ${stats.ieltsPercent}%`}>
                                📖 {stats.ieltsPercent}%
                              </span>
                              <span className="badge" style={{ fontSize: '0.68rem', padding: '1px 5px', background: stats.healthPercent > 0 ? 'var(--accent-rose-bg)' : 'var(--bg-secondary)', color: stats.healthPercent > 0 ? 'var(--accent-rose)' : 'var(--text-muted)' }} title={`Health: ${stats.healthPercent}%`}>
                                ❤️ {stats.healthPercent}%
                              </span>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>—</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.isToday ? (
                            <span className="badge badge-sage" style={{ fontWeight: 700, padding: '2px 8px' }}>
                              <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
                              {stats?.overallPercent || 0}% Today
                            </span>
                          ) : isPast ? (
                            <span className="badge badge-sage" style={{ fontWeight: 600, padding: '2px 8px' }}>
                              {stats ? `${stats.overallPercent}% Done` : '✓ Completed'}
                            </span>
                          ) : (
                            <span className="badge badge-neutral" style={{ opacity: 0.6, fontSize: '0.72rem' }}>
                              Scheduled
                            </span>
                          )}
                        </td>
                      </>
                    )}

                    {/* ── TECHNICAL PLAN TAB ── */}
                    {activePlanTab === 'technical' && (
                      <>
                        <td style={{ color: 'var(--text-primary)', fontWeight: row.isToday ? 600 : 400 }}>
                          <div>{row.technicalFocus}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{dayCurriculum.primaryTrack.tasks[0]?.detail}</div>
                        </td>
                        <td>
                          <span className="badge badge-periwinkle" style={{ fontSize: '0.72rem' }}>
                            {row.technicalStage}
                          </span>
                        </td>
                        <td>
                          <span className="tech-tag" style={{ fontSize: '0.74rem' }}>
                            {dayCurriculum.deliverable.file}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: (stats?.technicalPercent || 0) > 0 ? 'var(--accent-sage)' : 'var(--text-muted)' }}>
                            {stats ? `${stats.technicalPercent}%` : '0%'}
                          </span>
                        </td>
                      </>
                    )}

                    {/* ── IELTS PLAN TAB ── */}
                    {activePlanTab === 'ielts' && (
                      <>
                        <td>
                          <span className="badge badge-neutral" style={{ color: 'var(--accent-sage)', background: 'var(--accent-sage-bg)' }}>
                            {row.ieltsSkill}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                          {dayCurriculum.ieltsSession.focus}
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                          {dayCurriculum.commitments.ielts.target}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: (stats?.ieltsPercent || 0) > 0 ? 'var(--accent-periwinkle)' : 'var(--text-muted)' }}>
                            {stats ? `${stats.ieltsPercent}%` : '0%'}
                          </span>
                        </td>
                      </>
                    )}

                    {/* ── PERSONAL PLAN TAB ── */}
                    {activePlanTab === 'personal' && (
                      <>
                        <td style={{ color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                          Fajr on-time + 5 daily prayers
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                          Daily 1/3 Baqarah + Morning &amp; Evening Adhkar
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                          {dayCurriculum.trainingType}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: (stats?.faithPercent || 0) > 0 ? 'var(--accent-sand)' : 'var(--text-muted)' }}>
                            {stats ? `${Math.round((stats.faithPercent + stats.healthPercent) / 2)}%` : '0%'}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Day Summary Modal / Inspection Drawer ── */}
      {inspectedDay && inspectedStats && inspectedCurriculum && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }} onClick={() => setInspectDayNumber(null)}>
          <div
            className="card animate-fade-in"
            style={{
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              boxShadow: 'var(--shadow-xl)',
              background: 'var(--bg-card)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-sage" style={{ fontWeight: 700 }}>
                    Day {inspectedDay.dayNumber} / 90
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {inspectedDay.date}
                  </span>
                  {inspectedDay.dayNumber === today.dayNumber && (
                    <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>Today</span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {inspectedDay.mainObjective.title}
                </h3>
              </div>
              <button
                className="btn btn-icon btn-ghost"
                onClick={() => setInspectDayNumber(null)}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Sides Progress Overview */}
            <div style={{ background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>Execution by Dimension</span>
                <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-sage)' }}>
                  {inspectedStats.overallPercent}% Overall
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Technical</div>
                  <div className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-sage)' }}>{inspectedStats.technicalPercent}%</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Faith</div>
                  <div className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-sand)' }}>{inspectedStats.faithPercent}%</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>IELTS</div>
                  <div className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-periwinkle)' }}>{inspectedStats.ieltsPercent}%</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Health</div>
                  <div className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-rose)' }}>{inspectedStats.healthPercent}%</div>
                </div>
              </div>
            </div>

            {/* Essential Commitments */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Essential Commitments ({inspectedDay.essentialCommitments.filter(c => c.completed).length}/{inspectedDay.essentialCommitments.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {inspectedDay.essentialCommitments.map(c => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                    <div className={`checkbox-box ${c.completed ? 'checked' : ''}`} style={{
                      backgroundColor: c.completed ? 'var(--accent-sage)' : '#FFFFFF',
                      borderColor: c.completed ? 'var(--accent-sage)' : 'var(--border-light)',
                      width: '16px', height: '16px'
                    }}>
                      {c.completed && <Check size={10} color="#FFFFFF" />}
                    </div>
                    <span style={{ fontWeight: 600, color: c.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: c.completed ? 'line-through' : 'none' }}>
                      {c.area}:
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{c.title} — {c.target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Faith Anchors Breakdown */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Spiritual Anchors
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '0.78rem' }}>
                {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((pName, i) => {
                  const done = inspectedDay.personalAnchors.faith.prayers[i];
                  return (
                    <span key={pName} className="badge" style={{ background: done ? 'var(--accent-sage-bg)' : 'var(--bg-secondary)', color: done ? 'var(--accent-sage)' : 'var(--text-muted)' }}>
                      {done ? '✓ ' : '○ '}{pName}
                    </span>
                  );
                })}
                {inspectedDay.personalAnchors.faith.fajrOnTime && (
                  <span className="badge badge-sand">Fajr On-time ✓</span>
                )}
                {inspectedDay.personalAnchors.faith.morningAdhkar && (
                  <span className="badge badge-sand">Morning Adhkar ✓</span>
                )}
                {inspectedDay.personalAnchors.faith.eveningAdhkar && (
                  <span className="badge badge-sand">Evening Adhkar ✓</span>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setInspectDayNumber(null)}
              >
                Close
              </button>
              {inspectedDay.dayNumber !== today.dayNumber && (
                <button
                  className="btn btn-sage btn-sm"
                  onClick={() => {
                    switchToDay(inspectedDay.dayNumber);
                    setInspectDayNumber(null);
                    setActiveTab('today');
                  }}
                >
                  <span>Open Day {inspectedDay.dayNumber} in Today View</span>
                  <ExternalLink size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
