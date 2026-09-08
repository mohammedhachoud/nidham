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
    today,
    computedStats,
    selectedWeek,
    setQuickLogOpen
  } = useApp();

  // Compute per-skill average from real session data
  const skillOrder = [
    { name: 'Reading', fillClass: 'fill-sage', icon: <BookOpen size={14} /> },
    { name: 'Listening', fillClass: 'fill-periwinkle', icon: <Headphones size={14} /> },
    { name: 'Writing', fillClass: 'fill-rose', icon: <PenTool size={14} /> },
    { name: 'Speaking', fillClass: 'fill-sand', icon: <Mic size={14} /> }
  ];
  const skills = skillOrder.map(s => {
    const relevant = ieltsSessions.filter(
      sess => sess.skill === s.name && sess.resultScore && !isNaN(parseFloat(String(sess.resultScore)))
    );
    const avg = relevant.length > 0
      ? Math.round((relevant.reduce((acc, sess) => acc + parseFloat(String(sess.resultScore!)), 0) / relevant.length) * 2) / 2
      : 0;
    return { ...s, score: avg };
  });

  // Best skill label
  const bestSkill = skills.reduce((best, s) => s.score > best.score ? s : best, skills[0]);

  // Current estimate = overall average
  const currentBand = computedStats.ieltsEstimatedBand;
  const targetBand = computedStats.ieltsTargetBand;
  const bandGap = Math.max(0, targetBand - currentBand);
  const bandProgress = currentBand > 0 ? Math.round((currentBand / targetBand) * 100) : 0;

  // Today's IELTS task from context
  const todayTask = today.ieltsSession;

  // Weekly schedule from selected week's dailySchedule (IELTS skill per day)
  const weeklySchedule = selectedWeek.dailySchedule.map(day => ({
    day: day.dayName,
    skill: day.ieltsSkill,
    focus: day.keyCommitments.split(' + ')[1] || day.ieltsSkill,
    isToday: day.isToday,
    completed: day.completed
  }));

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
                  {currentBand > 0 ? currentBand : '—'}
                </div>
              </div>
              <div style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>→</div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-sage)' }}>Target Score</div>
                <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-sage)' }}>
                  {targetBand}
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '380px' }}>
              <div className="progress-bar-container" style={{ height: '6px', marginBottom: '4px' }}>
                <div className="progress-bar-fill fill-sage" style={{ width: `${bandProgress}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span>{currentBand > 0 ? `You're ${bandGap} bands away from your target.` : 'Log your first session to track progress.'}</span>
                <span className="font-mono">{bandProgress}% of the way</span>
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
                    <span className="font-mono" style={{ fontWeight: 600 }}>{s.score > 0 ? s.score : '—'}</span>
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
            <span>{skills.every(s => s.score === 0) ? 'Log sessions to see your skill performance.' : `Your strongest skill is ${bestSkill.score > 0 ? bestSkill.name : '—'}. Keep going!`}</span>
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
                    <strong style={{ fontSize: '0.92rem' }}>{todayTask.skill}</strong>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{todayTask.focus}</div>
                  </div>
                </div>
                <span className="badge badge-neutral font-mono">{todayTask.durationMinutes} min</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                {todayTask.completed ? '✓ Session completed for today.' : 'Practice and focus on key information.'}
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
                  {computedStats.weeklyIeltsCount} / 7
                </span>
                <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  sessions
                </span>
              </div>

              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>{computedStats.weeklyIeltsConsistency}%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>this week</div>
                <p style={{ fontSize: '0.76rem', color: computedStats.weeklyIeltsCount > 0 ? 'var(--accent-sage)' : 'var(--text-muted)', marginTop: '4px' }}>
                  {computedStats.weeklyIeltsCount > 0 ? "You're on track." : 'No sessions yet.'}<br />Keep the momentum!
                </p>
              </div>
            </div>

            {/* Day completion circles */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
              {weeklySchedule.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: item.completed ? 'var(--accent-sage)' : item.isToday ? 'var(--accent-sage-soft)' : 'var(--bg-secondary)',
                      color: item.completed ? '#FFFFFF' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.62rem',
                      border: item.isToday ? '2px solid var(--accent-sage)' : 'none'
                    }}
                  >
                    {item.completed && <Check size={10} />}
                  </div>
                  <span style={{ fontSize: '0.66rem', color: item.isToday ? 'var(--accent-sage)' : 'var(--text-muted)', fontWeight: item.isToday ? 700 : 400 }}>{item.day}</span>
                </div>
              ))}
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
              {ieltsErrors.length === 0 ? (
                <div style={{ padding: '16px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  No recurring errors logged yet. Identify errors during practice sessions to target your weakest points.
                </div>
              ) : (
                ieltsErrors.slice(0, 4).map((err, idx) => (
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
                ))
              )}
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
              {weeklySchedule.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: item.isToday ? 'var(--accent-sage)' : 'var(--text-muted)', width: '30px', fontWeight: item.isToday ? 700 : 400 }}>{item.day}</span>
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
