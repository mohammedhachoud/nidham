import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import {
  Target,
  Flag,
  BookOpen,
  FileText,
  BarChart2,
  Lightbulb,
  Leaf,
  Brain,
  Sun,
  Heart,
  MoreHorizontal
} from 'lucide-react';

export const CycleView: React.FC = () => {
  const { currentCycle, computedStats } = useApp();

  const coreObjectives = [
    'Build consistent daily habits and a sustainable routine',
    'Master foundational knowledge in AI, development and data',
    'Complete meaningful projects and create tangible outputs',
    'Improve health, focus and overall life systems'
  ];

  const learningThemes = [
    { title: 'RAG foundations', badge: 'badge-sage' },
    { title: 'React / TypeScript', badge: 'badge-periwinkle' },
    { title: 'RAG evaluation', badge: 'badge-periwinkle' },
    { title: 'Automation fundamentals', badge: 'badge-sand' },
    { title: 'AI application architecture', badge: 'badge-periwinkle' },
    { title: 'AI agent introduction', badge: 'badge-sage' },
    { title: 'Statistics & data analysis', badge: 'badge-rose' },
    { title: 'Portfolio foundation', badge: 'badge-periwinkle' }
  ];

  const expectedOutputsList = [
    'RAG evaluation report and analysis',
    'Functional RAG application',
    'Data analysis mini-project',
    'Personal productivity automation',
    'AI agent prototype (simple)',
    'Portfolio website (initial version)',
    'Portfolio documentation (case studies)'
  ];

  const kpis = [
    { name: 'Learning consistency', value: 80, fill: 'fill-sage' },
    { name: 'Project completion', value: 60, fill: 'fill-periwinkle' },
    { name: 'Knowledge retention', value: 70, fill: 'fill-sand' },
    { name: 'Health & well-being', value: 60, fill: 'fill-rose' }
  ];

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="90-DAY PERSONAL OPERATING SYSTEM"
        title="Current Cycle"
        subtitle="Focused learning. Real progress. A better you."
      />

      {/* Hero Split Grid */}
      <div className="hero-split-grid">
        {/* Serene Lake Banner Card */}
        <div
          className="hero-banner-card"
          style={{ backgroundImage: 'url(/images/serene_mountain_lake.jpg)' }}
        >
          <div className="hero-banner-overlay" />
          <div className="hero-banner-content">
            <h2 className="hero-banner-title">
              Cycle 1 — {currentCycle.name}
            </h2>
            <p className="hero-banner-desc">
              Stabilize my routine, deepen core fundamentals, and build a strong professional foundation for long-term growth.
            </p>

            {/* Cycle Progress Bar */}
            <div style={{ maxWidth: '440px', marginBottom: '16px' }}>
              <div className="progress-bar-container" style={{ height: '7px', marginBottom: '5px' }}>
                <div className="progress-bar-fill fill-sage" style={{ width: '20%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                <span>Day {computedStats.daysCompleted} of 90 — {computedStats.daysRemaining} days remaining</span>
                <span className="font-mono">20%</span>
              </div>
            </div>

            <div className="hero-pills-row">
              <span className="hero-micro-pill">
                <Leaf size={12} color="var(--accent-sage)" />
                A Healthier Me
              </span>
              <span style={{ color: 'var(--border-light)' }}>|</span>
              <span className="hero-micro-pill">
                <Brain size={12} color="var(--accent-periwinkle)" />
                A Sharper Mind
              </span>
              <span style={{ color: 'var(--border-light)' }}>|</span>
              <span className="hero-micro-pill">
                <Sun size={12} color="var(--accent-sand)" />
                A Brighter Future
              </span>
            </div>
          </div>
          <div className="hero-handwritten-badge">Consistent steps create extraordinary opportunities.</div>
        </div>

        {/* Inspirational Quote Card */}
        <QuoteCard
          quote="You are not behind. You are building something real."
          subtext="Small, consistent progress today compounds into the life you want tomorrow."
        />
      </div>

      {/* Row 1: Mission, Core Objectives, Learning Themes */}
      <div className="grid-3col">
        {/* Mission Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <Target size={14} />
                </div>
                Mission
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Create stability, deepen my core knowledge, and build a strong professional foundation in AI and software development, while improving my health, discipline and overall well-being.
            </p>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>A stronger foundation for a brighter future.</span>
          </div>
        </div>

        {/* Core Objectives Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
                  <Flag size={14} />
                </div>
                Core Objectives
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {coreObjectives.map((obj, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem' }}>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--bg-secondary)',
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
                  <span style={{ color: 'var(--text-secondary)' }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '4px' }} />
        </div>

        {/* Learning Themes Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <BookOpen size={14} />
                </div>
                Learning Themes
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {learningThemes.map(theme => (
                <div key={theme.title} className={`badge ${theme.badge}`} style={{ padding: '6px 8px', fontSize: '0.73rem', justifyContent: 'flex-start' }}>
                  {theme.title}
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Build skills. Create. Apply. Share.</span>
          </div>
        </div>
      </div>

      {/* Row 2: Expected Outputs, Key Performance Indicators, Why This Now */}
      <div className="grid-3col">
        {/* Expected Outputs */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <FileText size={14} />
                </div>
                Expected Outputs
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {expectedOutputsList.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <div className="checkbox-box" style={{ width: '15px', height: '15px' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '4px' }} />
        </div>

        {/* Key Performance Indicators */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <BarChart2 size={14} />
                </div>
                Key Performance Indicators
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {kpis.map(k => (
                <div key={k.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k.name}</span>
                    <span className="font-mono">{k.value}%</span>
                  </div>
                  <div className="progress-bar-container" style={{ height: '6px' }}>
                    <div className={`progress-bar-fill ${k.fill}`} style={{ width: `${k.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Consistency today creates the results you want tomorrow.</span>
          </div>
        </div>

        {/* Why This Now */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
                  <Lightbulb size={14} />
                </div>
                Why This Now
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              This cycle builds the essential knowledge, practical skills and working habits I need for my long-term goals. It creates momentum, confidence and tangible proof of progress while setting up opportunities for the next phase of growth.
            </p>
          </div>

          <div className="card-whisper-bar whisper-rose">
            <Heart size={14} />
            <span>A stronger me today unlocks more possibilities tomorrow.</span>
          </div>
        </div>
      </div>

      {/* Row 3: Milestones Timeline Card */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
              <Flag size={14} />
            </div>
            Milestones
          </span>
          <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem' }}>
            View all →
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', position: 'relative' }}>
          {/* Timeline connecting line */}
          <div style={{ position: 'absolute', top: '24px', left: '40px', right: '40px', height: '2px', background: 'var(--border-subtle)', zIndex: 1 }} />

          {[
            { day: 'Day 1', label: 'Start Cycle', date: 'Apr 1', active: true, completed: true },
            { day: 'Day 30', label: 'Core Skills', date: 'May 1', active: true, completed: false },
            { day: 'Day 60', label: 'Build & Apply', date: 'May 31', active: false, completed: false },
            { day: 'Day 90', label: 'Showcase & Review', date: 'Jun 30', active: false, completed: false }
          ].map(m => (
            <div key={m.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#FFFFFF', padding: '0 8px' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: m.completed ? 'var(--accent-sage)' : m.active ? 'var(--accent-sage-soft)' : '#FFFFFF',
                  border: `2px solid ${m.completed || m.active ? 'var(--accent-sage)' : 'var(--border-light)'}`,
                  marginBottom: '8px'
                }}
              />
              <strong style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>{m.day}</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{m.label}</span>
              <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
