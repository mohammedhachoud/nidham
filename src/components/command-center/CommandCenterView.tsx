import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import {
  Target,
  Monitor,
  Headphones,
  Heart,
  FileText,
  TrendingUp,
  AlertTriangle,
  Leaf,
  Brain,
  Sun,
  MoreHorizontal,
  CheckCircle2,
  Play
} from 'lucide-react';

export const CommandCenterView: React.FC = () => {
  const {
    today,
    outputs,
    setActiveTab,
    toggleMainObjective,
    activeProject
  } = useApp();

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="90-DAY PERSONAL OPERATING SYSTEM"
        title="Command Center"
        subtitle="Your 90-day transformation at a glance. Calm. Focused. Purposeful."
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
            <div className="hero-banner-caption">Cycle 1 — Reset + Foundation</div>
            <h2 className="hero-banner-title">Stabilize Routine & Build Foundation</h2>
            <p className="hero-banner-desc">
              Day 18 of 90 completed. Deepening RAG engineering and consistent IELTS daily practice.
            </p>

            {/* Cycle Progress Bar */}
            <div style={{ maxWidth: '440px', marginBottom: '16px' }}>
              <div className="progress-bar-container" style={{ height: '7px', marginBottom: '5px' }}>
                <div className="progress-bar-fill fill-sage" style={{ width: '20%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                <span>18 days completed • 72 days remaining</span>
                <span className="font-mono">20%</span>
              </div>
            </div>

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
          <div className="hero-handwritten-badge">Discipline today creates freedom tomorrow.</div>
        </div>

        {/* Inspirational Quote Card with Botanical Watercolor Leaf */}
        <QuoteCard
          quote="Small, quiet habits repeated daily build the career and life you dream of."
          subtext="What matters now? What am I becoming better at? What am I producing?"
        />
      </div>

      {/* 4 Context Cards Grid */}
      <div className="grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {/* Today's Focus */}
        <div className="card" onClick={() => setActiveTab('today')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '0.88rem' }}>
                <div className="card-title-icon">
                  <Target size={13} />
                </div>
                Today's Focus
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={14} />
              </button>
            </div>
            <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              {today.mainObjective.completed ? '✓ ' : ''}RAG Evaluation
            </strong>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Analyze retrieval failures and document key patterns.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <span style={{ fontSize: '0.72rem', color: today.mainObjective.completed ? 'var(--accent-sage)' : 'var(--text-muted)' }}>
              {today.mainObjective.completed ? 'Completed' : 'Pending'}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleMainObjective();
              }}
            >
              {today.mainObjective.completed ? <CheckCircle2 size={14} color="var(--accent-sage)" /> : <Play size={14} />}
            </button>
          </div>
        </div>

        {/* Technical Context */}
        <div className="card" onClick={() => setActiveTab('learning-projects')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '0.88rem' }}>
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <Monitor size={13} />
                </div>
                Technical Context
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Stable Track: </span><strong>RAG</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Current Focus: </span><strong>Web Dev</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Project: </span><span style={{ color: 'var(--accent-sage)' }}>{activeProject.title}</span></div>
            </div>
          </div>
          <div className="card-whisper-bar whisper-periwinkle" style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.72rem' }}>
            <span>65% complete</span>
          </div>
        </div>

        {/* IELTS Context */}
        <div className="card" onClick={() => setActiveTab('ielts')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '0.88rem' }}>
                <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
                  <Headphones size={13} />
                </div>
                IELTS
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Today: </span><strong>{today.ieltsSession.skill}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Focus: </span><span>Distractors</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Score: </span>
                <span className="font-mono"><strong>6.5</strong> → <strong>7.5</strong></span>
              </div>
            </div>
          </div>
          <div className="card-whisper-bar whisper-rose" style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.72rem' }}>
            <span>45 min session</span>
          </div>
        </div>

        {/* Health & Discipline */}
        <div className="card" onClick={() => setActiveTab('today')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '0.88rem' }}>
                <div className="card-title-icon" style={{ background: 'var(--accent-sand-bg)', color: 'var(--accent-sand)' }}>
                  <Heart size={13} />
                </div>
                Health & Discipline
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
              <div>✓ Training: Scheduled</div>
              <div>☾ Sleep: 7.2h (avg)</div>
              <div>⚡ Screen Time: On track</div>
            </div>
          </div>
          <div className="card-whisper-bar whisper-sand" style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.72rem' }}>
            <span>Healthy baseline</span>
          </div>
        </div>
      </div>

      {/* Row 2: Recent Outputs & Weekly Progress & Risks */}
      <div className="grid-2col-split">
        {/* Recent Outputs Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon">
                  <FileText size={14} />
                </div>
                Recent Outputs
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('learning-projects')} style={{ fontSize: '0.78rem' }}>
                View all →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {outputs.slice(0, 4).map(out => (
                <div key={out.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-sage)' }} />
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{out.title}</strong>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{out.description}</div>
                    </div>
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{out.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-whisper-bar">
            <Leaf size={14} />
            <span>Outputs beat consumption. Evidence proves capability.</span>
          </div>
        </div>

        {/* Weekly Health & Risks */}
        <div className="layout-column">
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                  <TrendingUp size={14} />
                </div>
                Weekly Progress
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '2px' }}>
                  <span>Execution</span>
                  <span className="font-mono">70%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px' }}>
                  <div className="progress-bar-fill fill-sage" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '2px' }}>
                  <span>IELTS consistency</span>
                  <span className="font-mono">86%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px' }}>
                  <div className="progress-bar-fill fill-sage" style={{ width: '86%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '2px' }}>
                  <span>Training consistency</span>
                  <span className="font-mono">57%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px' }}>
                  <div className="progress-bar-fill fill-sand" style={{ width: '57%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '2px' }}>
                  <span>Project progress</span>
                  <span className="font-mono">60%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px' }}>
                  <div className="progress-bar-fill fill-periwinkle" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Current Risks */}
          <div className="card" style={{ borderColor: 'var(--border-quote)', background: 'var(--bg-card-quote)' }}>
            <div className="card-header">
              <span className="card-title" style={{ color: 'var(--accent-rose)' }}>
                <AlertTriangle size={14} />
                Current Risks
              </span>
              <button className="card-more-btn">
                <MoreHorizontal size={15} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: '#5B3737' }}>
              <div>• IELTS Writing behind plan</div>
              <div>• Project milestone at risk</div>
              <div>• Sleep below target this week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
