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
  Check
} from 'lucide-react';

export const TodayView: React.FC = () => {
  const {
    today,
    toggleMainObjective,
    toggleEssentialCommitment,
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

        {/* Personal Anchors Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <Leaf size={14} />
                </div>
                Personal Anchors
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Faith</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  A grateful heart creates a steadier mind.
                </span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Health</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  A healthier me fuels everything I do.
                </span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Discipline</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Small consistent choices build the life I want.
                </span>
              </div>
            </div>
          </div>

          <div className="card-whisper-bar">
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
                  placeholder="Set your intention for Day 19..."
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
