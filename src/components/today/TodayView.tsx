import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import {
  Target,
  Clock,
  Flag,
  MoreHorizontal,
  CheckCircle2,
  Monitor,
  Leaf,
  PenTool,
  Moon,
  FileText,
  Upload,
  Plus,
  ArrowRight,
  Check,
  Sparkles,
  Heart,
  Sun
} from 'lucide-react';

export const TodayView: React.FC = () => {
  const {
    today,
    toggleMainObjective,
    toggleEssentialCommitment,
    togglePrayer,
    toggleFajr,
    toggleBaqarahThird,
    toggleAdhkar,
    toggleTraining,
    toggleScreenTime,
    updateQuickNotes,
    completeDailyClose,
    setQuickLogOpen
  } = useApp();

  const [closeCompleted, setCloseCompleted] = useState(today.dailyClose?.completedMeaningful || '');
  const [closeInterfered, setCloseInterfered] = useState(today.dailyClose?.interfered || '');
  const [closeTomorrow, setCloseTomorrow] = useState(today.dailyClose?.tomorrowPriority || '');

  const handleDailyClose = (e: React.FormEvent) => {
    e.preventDefault();
    completeDailyClose({
      completedMeaningful: closeCompleted,
      interfered: closeInterfered,
      tomorrowPriority: closeTomorrow
    });
  };

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="90-DAY PERSONAL OPERATING SYSTEM"
        title="Today"
        subtitle="Execute with focus. Small steps create big results."
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--accent-sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              <Target size={14} />
              Main Objective
            </div>
            <h2 className="hero-banner-title">RAG Evaluation</h2>
            <p className="hero-banner-desc">
              {today.mainObjective.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Clock size={14} color="var(--accent-sage)" />
                <span>~ 90 min <span style={{ color: 'var(--text-muted)' }}>Estimated focus time</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Flag size={14} color="var(--accent-rose)" />
                <span>Deep work <span style={{ color: 'var(--text-muted)' }}>Priority</span></span>
              </div>
            </div>

            <button
              className={`btn ${today.mainObjective.completed ? 'btn-secondary' : 'btn-sage'}`}
              onClick={toggleMainObjective}
            >
              <span>{today.mainObjective.completed ? '✓ Completed' : 'Start Focus Session'}</span>
              {!today.mainObjective.completed && <ArrowRight size={14} />}
            </button>
          </div>
          <div className="hero-handwritten-badge">Small steps create a bigger you.</div>
        </div>

        {/* Inspirational Quote Card with Botanical Watercolor Leaf */}
        <QuoteCard
          quote="You don't have to be perfect, you just have to keep showing up."
          subtext="Consistent effort compounds into extraordinary results."
        />
      </div>

      {/* Row 1: Essential Commitments, Today's Context, Personal Anchors */}
      <div className="grid-3col">
        {/* Essential Commitments Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
                  <CheckCircle2 size={14} />
                </div>
                Essential Commitments
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {today.essentialCommitments.filter(c => c.completed).length}/{today.essentialCommitments.length} today
                </span>
                <button className="card-more-btn">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {today.essentialCommitments.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleEssentialCommitment(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.86rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div className={`checkbox-box ${item.completed ? 'checked' : ''}`} style={{
                      backgroundColor: item.completed ? 'var(--accent-sage)' : '#FFFFFF',
                      borderColor: item.completed ? 'var(--accent-sage)' : 'var(--border-light)',
                      marginTop: '2px'
                    }}>
                      {item.completed && <Check size={12} color="#FFFFFF" />}
                    </div>
                    <div>
                      <strong style={{ color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: item.completed ? 'line-through' : 'none' }}>
                        {item.area}
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.area === 'Technical' ? '90 min' : item.area === 'Faith' ? '15 min' : '30 min'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Show up for what matters.</span>
          </div>
        </div>

        {/* Today's Context Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <Monitor size={14} />
                </div>
                Today's Context
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Stable Track</span>
                <span style={{ color: 'var(--text-primary)' }}>{today.technicalFocus.stableTrack}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Current Focus</span>
                <span style={{ color: 'var(--text-primary)' }}>{today.technicalFocus.currentFocus}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Project</span>
                <span style={{ color: 'var(--text-primary)' }}>RAG Assistant</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>IELTS Skill</span>
                <span style={{ color: 'var(--text-primary)' }}>{today.ieltsSession.skill}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Focus Area</span>
                <span style={{ color: 'var(--text-primary)' }}>Distractors</span>
              </div>
            </div>
          </div>

          <div className="card-whisper-bar whisper-periwinkle">
            <Leaf size={14} />
            <span>Same focus, a brighter tomorrow.</span>
          </div>
        </div>

        {/* Personal Anchors – Faith Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* ── Header ── */}
          <div className="card-header" style={{ marginBottom: '10px' }}>
            <span className="card-title">
              <div className="card-title-icon" style={{ background: 'var(--accent-sand-bg)', color: 'var(--accent-sand)' }}>
                <Sparkles size={14} />
              </div>
              Faith &amp; Anchors
            </span>
          </div>

          {/* ── 5 Daily Prayers ── */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Daily Prayers
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((name, i) => {
                const done = today.personalAnchors.faith.prayers[i];
                const isFajr = i === 0;
                return (
                  <button
                    key={name}
                    onClick={() => {
                      togglePrayer(i);
                      if (isFajr && !done) toggleFajr();
                    }}
                    title={isFajr ? `${name} (tap again for on-time)` : name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      padding: '6px 8px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${done ? 'var(--accent-sage)' : 'var(--border-light)'}`,
                      background: done ? 'var(--accent-sage-bg)' : 'var(--bg-input)',
                      cursor: 'pointer',
                      minWidth: '44px',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>
                      {done ? '✓' : (isFajr ? '🌙' : i === 4 ? '🌟' : '○')}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: done ? 'var(--accent-sage)' : 'var(--text-secondary)',
                      letterSpacing: '0.04em'
                    }}>
                      {name}
                    </span>
                    {isFajr && (
                      <span style={{
                        fontSize: '0.55rem',
                        color: today.personalAnchors.faith.fajrOnTime ? 'var(--accent-sand)' : 'var(--text-muted)',
                        fontWeight: 600
                      }}>
                        {today.personalAnchors.faith.fajrOnTime ? 'On-time' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Prayers progress bar */}
            <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ flex: 1, height: '3px', background: 'var(--border-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(today.personalAnchors.faith.prayers.filter(Boolean).length / 5) * 100}%`,
                  background: 'var(--accent-sage)',
                  borderRadius: '9999px',
                  transition: 'width 400ms ease'
                }} />
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {today.personalAnchors.faith.prayers.filter(Boolean).length}/5
              </span>
            </div>
          </div>

          {/* ── Surah Al-Baqarah ── */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Sūrat Al-Baqarah · Daily Third
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { label: '1/3', arabic: 'آيات ١–١٤١', range: 'Āyāt 1–141' },
                { label: '2/3', arabic: 'آيات ١٤٢–٢٥٢', range: 'Āyāt 142–252' },
                { label: '3/3', arabic: 'آيات ٢٥٣–٢٨٦', range: 'Āyāt 253–286' }
              ].map((part, i) => {
                const done = (today.personalAnchors.faith.baqarahThirds || [false, false, false])[i];
                return (
                  <button
                    key={i}
                    onClick={() => toggleBaqarahThird(i)}
                    title={part.range}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      padding: '7px 4px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${done ? 'var(--accent-periwinkle)' : 'var(--border-light)'}`,
                      background: done ? 'var(--accent-periwinkle-bg)' : 'var(--bg-input)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: done ? 'var(--accent-periwinkle)' : 'var(--text-secondary)' }}>
                      {done ? '✓ ' : ''}{part.label}
                    </span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', direction: 'rtl' }}>
                      {part.arabic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Adhkar ── */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Adhkar
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { key: 'morning' as const, label: 'Morning', emoji: '🌅', done: today.personalAnchors.faith.morningAdhkar },
                { key: 'evening' as const, label: 'Evening', emoji: '🌆', done: today.personalAnchors.faith.eveningAdhkar }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => toggleAdhkar(item.key)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '7px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${item.done ? 'var(--accent-rose)' : 'var(--border-light)'}`,
                    background: item.done ? 'var(--accent-rose-bg)' : 'var(--bg-input)',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: item.done ? 'var(--accent-rose)' : 'var(--text-secondary)',
                    transition: 'all 150ms ease'
                  }}
                >
                  <span>{item.emoji}</span>
                  <span>{item.done ? '✓ ' : ''}{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Health & Discipline compact ── */}
          <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={toggleTraining}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '6px 8px',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${today.personalAnchors.health.trainingCompleted ? 'var(--accent-sage)' : 'var(--border-light)'}`,
                background: today.personalAnchors.health.trainingCompleted ? 'var(--accent-sage-bg)' : 'var(--bg-input)',
                cursor: 'pointer',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: today.personalAnchors.health.trainingCompleted ? 'var(--accent-sage)' : 'var(--text-secondary)',
                transition: 'all 150ms ease'
              }}
            >
              <Heart size={12} />
              <span>{today.personalAnchors.health.trainingCompleted ? '✓ ' : ''}Training</span>
            </button>
            <button
              onClick={toggleScreenTime}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '6px 8px',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${today.personalAnchors.discipline.screenTimeBoundaryKept ? 'var(--accent-sage)' : 'var(--border-light)'}`,
                background: today.personalAnchors.discipline.screenTimeBoundaryKept ? 'var(--accent-sage-bg)' : 'var(--bg-input)',
                cursor: 'pointer',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: today.personalAnchors.discipline.screenTimeBoundaryKept ? 'var(--accent-sage)' : 'var(--text-secondary)',
                transition: 'all 150ms ease'
              }}
            >
              <Sun size={12} />
              <span>{today.personalAnchors.discipline.screenTimeBoundaryKept ? '✓ ' : ''}Screen OK</span>
            </button>
          </div>

          <div className="card-whisper-bar" style={{ marginTop: '10px' }}>
            <Leaf size={14} />
            <span>Rooted in what matters. Grounded for greater things.</span>
          </div>
        </div>
      </div>

      {/* Row 2: Quick Notes, Daily Close, Today's Evidence */}
      <div className="grid-3col">
        {/* Quick Notes Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <PenTool size={14} />
                </div>
                Quick Notes
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <textarea
              rows={4}
              value={today.quickNotes}
              onChange={e => updateQuickNotes(e.target.value)}
              placeholder="Capture thoughts, ideas, or reminders..."
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                resize: 'none',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                padding: 0
              }}
            />
          </div>

          <div className="card-whisper-bar whisper-rose">
            <Leaf size={14} />
            <span>Ideas today. A better tomorrow.</span>
          </div>
        </div>

        {/* Daily Close Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <Moon size={14} />
                </div>
                Daily Close
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <form onSubmit={handleDailyClose} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.74rem' }}>What meaningful thing did I complete?</label>
                <input
                  type="text"
                  value={closeCompleted}
                  onChange={e => setCloseCompleted(e.target.value)}
                  placeholder="Write your reflection..."
                  style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.74rem' }}>What interfered with execution?</label>
                <input
                  type="text"
                  value={closeInterfered}
                  onChange={e => setCloseInterfered(e.target.value)}
                  placeholder="Be honest and kind to yourself..."
                  style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.74rem' }}>What should tomorrow prioritize?</label>
                <input
                  type="text"
                  value={closeTomorrow}
                  onChange={e => setCloseTomorrow(e.target.value)}
                  placeholder={`Set your intention for Day ${today.dayNumber + 1}...`}
                  style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                />
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button className="btn btn-sm btn-secondary" onClick={handleDailyClose}>
              Save Close
            </button>
          </div>
        </div>

        {/* Today's Evidence Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <FileText size={14} />
                </div>
                Today's Evidence
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 10px' }}>
              <Upload size={24} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Add an output, screenshot, or note.<br />Show your progress, no matter how small.
              </p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setQuickLogOpen(true, 'output')}
              >
                <Plus size={13} />
                <span>Add Output</span>
              </button>
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Progress is a series of small proofs that you're becoming who you want to be.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
