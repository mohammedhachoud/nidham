import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import {
  BarChart2,
  Target,
  Calendar,
  FileText,
  AlertTriangle,
  Leaf,
  MoreHorizontal,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Play,
  Check
} from 'lucide-react';

export const IELTSDashboardView: React.FC = () => {
  const {
    ieltsSessions,
    ieltsErrors,
    setQuickLogOpen
  } = useApp();

  const skills = [
    { name: 'Reading', score: 6.5, fillClass: 'fill-sage', icon: <BookOpen size={14} /> },
    { name: 'Listening', score: 6.0, fillClass: 'fill-periwinkle', icon: <Headphones size={14} /> },
    { name: 'Writing', score: 5.5, fillClass: 'fill-rose', icon: <PenTool size={14} /> },
    { name: 'Speaking', score: 6.0, fillClass: 'fill-sand', icon: <Mic size={14} /> }
  ];

  const weeklySchedule = [
    { day: 'Mon', skill: 'Listening', focus: 'Practice test' },
    { day: 'Tue', skill: 'Reading', focus: 'Academic passage' },
    { day: 'Wed', skill: 'Writing', focus: 'Task 1 (graphs)' },
    { day: 'Thu', skill: 'Speaking', focus: 'Part 2 (cue card)' },
    { day: 'Fri', skill: 'Listening', focus: 'Map & plan' },
    { day: 'Sat', skill: 'Writing', focus: 'Task 2 (essay)' },
    { day: 'Sun', skill: 'Reading', focus: 'Review & revision' }
  ];

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="90-DAY PERSONAL OPERATING SYSTEM"
        title="IELTS"
        subtitle="Consistent practice. Targeted improvement. A brighter future."
      />

      {/* Hero Split Grid */}
      <div className="hero-split-grid">
        {/* Serene Lake Card */}
        <div
          className="hero-banner-card"
          style={{ backgroundImage: 'url(/images/serene_mountain_lake.jpg)' }}
        >
          <div className="hero-banner-overlay" />
          <div className="hero-banner-content">
            <h2 className="hero-banner-title">Your IELTS Journey</h2>
            <p className="hero-banner-desc" style={{ marginBottom: '12px' }}>
              You're building real skills for real opportunities. Keep showing up — you're closer than you think.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Current Estimate</div>
                <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  6.5
                </div>
              </div>
              <div style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>→</div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-sage)' }}>Target Score</div>
                <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-sage)' }}>
                  7.5
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '380px' }}>
              <div className="progress-bar-container" style={{ height: '6px', marginBottom: '4px' }}>
                <div className="progress-bar-fill fill-sage" style={{ width: '40%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span>You're 1.0 bands away from your target.</span>
                <span className="font-mono">40% of the way</span>
              </div>
            </div>
          </div>
          <div className="hero-handwritten-badge">Better English, A wider you</div>
        </div>

        {/* Inspirational Quote Card with Botanical Watercolor Leaf */}
        <QuoteCard
          quote="A little progress every day adds up to big results."
          subtext="Consistent practice today creates the opportunities you want tomorrow."
        />
      </div>

      {/* Row 1: Skill Performance, Today's IELTS Task, Weekly Consistency */}
      <div className="grid-3col">
        {/* Skill Performance Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <BarChart2 size={14} />
                </div>
                Skill Performance
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '3px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                      {s.icon}
                      {s.name}
                    </span>
                    <span className="font-mono" style={{ fontWeight: 600 }}>{s.score}</span>
                  </div>
                  <div className="progress-bar-container" style={{ height: '6px' }}>
                    <div
                      className={`progress-bar-fill ${s.fillClass}`}
                      style={{ width: `${Math.round((s.score / 9.0) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Your strongest skill is Reading. Keep going!</span>
          </div>
        </div>

        {/* Today's IELTS Task Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <Target size={14} />
                </div>
                Today's IELTS Task
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Headphones size={18} color="var(--accent-periwinkle)" />
                  <div>
                    <strong style={{ fontSize: '0.92rem' }}>Listening</strong>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Distractors</div>
                  </div>
                </div>
                <span className="badge badge-neutral font-mono">45 min</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Practice identifying distractors and focus on key information in the audio.
              </p>
            </div>

            <button
              className="btn btn-sage"
              style={{ width: '100%' }}
              onClick={() => setQuickLogOpen(true, 'ielts-practice')}
            >
              <Play size={14} />
              <span>Start Practice</span>
            </button>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Focus today. A higher score tomorrow.</span>
          </div>
        </div>

        {/* Weekly Consistency Meter */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <Calendar size={14} />
                </div>
                Weekly Consistency
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 0' }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  border: '4px solid var(--accent-sage)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  4 / 7
                </span>
                <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  sessions
                </span>
              </div>

              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>57%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>this week</div>
                <p style={{ fontSize: '0.76rem', color: 'var(--accent-sage)', marginTop: '4px' }}>
                  You're on track.<br />Keep the momentum!
                </p>
              </div>
            </div>

            {/* Day completion circles */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const isCompleted = idx < 4;
                return (
                  <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: isCompleted ? 'var(--accent-sage)' : 'var(--bg-secondary)',
                        color: isCompleted ? '#FFFFFF' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.62rem'
                      }}
                    >
                      {isCompleted && <Check size={10} />}
                    </div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Recent IELTS Sessions, Top Recurring Errors, Weekly Plan */}
      <div className="grid-3col">
        {/* Recent IELTS Sessions */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <FileText size={14} />
                </div>
                Recent IELTS Sessions
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ieltsSessions.slice(0, 5).map(sess => (
                <div key={sess.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{sess.date}</span>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      {sess.skill} — <span style={{ color: 'var(--text-secondary)' }}>{sess.focus}</span>
                    </div>
                  </div>
                  <span className="badge badge-sage font-mono" style={{ fontWeight: 600 }}>
                    {sess.resultScore || 'Done'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setQuickLogOpen(true, 'ielts-practice')}
              style={{ fontSize: '0.78rem' }}
            >
              View all sessions →
            </button>
          </div>
        </div>

        {/* Top Recurring Errors */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
                  <AlertTriangle size={14} />
                </div>
                Top Recurring Errors
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ieltsErrors.slice(0, 4).map((err, idx) => (
                <div key={err.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.8rem' }}>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--accent-rose-bg)',
                      color: 'var(--accent-rose)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{err.errorType}</strong>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {err.skill} • {err.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setQuickLogOpen(true, 'ielts-error')}
            >
              + Log Error
            </button>
          </div>
        </div>

        {/* Weekly IELTS Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <Calendar size={14} />
                </div>
                Weekly Plan
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
              {weeklySchedule.map(item => (
                <div key={item.day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', width: '30px' }}>{item.day}</span>
                  <span className="badge badge-periwinkle" style={{ fontSize: '0.7rem' }}>
                    {item.skill}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.focus}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>A structured week leads to a stronger you.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
