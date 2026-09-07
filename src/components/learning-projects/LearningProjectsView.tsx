import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import {
  Settings,
  BarChart2,
  Folder,
  FileText,
  Leaf,
  MoreHorizontal,
  LayoutGrid,
  BookOpen,
  Search,
  Check
} from 'lucide-react';
import type { DepthStage } from '../../types';

export const LearningProjectsView: React.FC = () => {
  const {
    learningTopics,
    learningSessions,
    projects,
    activeProject,
    outputs,
    toggleProjectMilestone
  } = useApp();

  type TabType = 'overview' | 'topics' | 'projects' | 'evidence';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tracks = [
    { name: 'RAG / AI Engineering', progress: 80, fill: 'fill-sage' },
    { name: 'Web Development', progress: 60, fill: 'fill-periwinkle' },
    { name: 'Data Science', progress: 40, fill: 'fill-sand' },
    { name: 'Automation', progress: 35, fill: 'fill-rose' },
    { name: 'AI Agents', progress: 25, fill: 'fill-periwinkle' }
  ];

  const depthStages: { stage: DepthStage; icon: string; desc: string }[] = [
    { stage: 'Understand', icon: '📖', desc: 'Learn the fundamentals' },
    { stage: 'Practice', icon: '✏️', desc: 'Hands-on exercises' },
    { stage: 'Implement', icon: '⚙️', desc: 'Build real solutions' },
    { stage: 'Validate', icon: '✓', desc: 'Test and get feedback' },
    { stage: 'Apply + Evidence', icon: '📊', desc: 'Ship and document' }
  ];

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="LEARNING FOR A BRIGHTER TOMORROW"
        title="Learning + Projects"
        subtitle="Learn deeply. Build deliberately. Produce evidence."
      />

      {/* Pill Tabs: Overview, Learning Topics, Projects, Evidence */}
      <div className="pill-tabs-row" style={{ margin: '0 0 6px' }}>
        <button
          className={`pill-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <LayoutGrid size={14} />
          <span>Overview</span>
        </button>
        <button
          className={`pill-tab-btn ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          <BookOpen size={14} />
          <span>Learning Topics</span>
        </button>
        <button
          className={`pill-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Folder size={14} />
          <span>Projects</span>
        </button>
        <button
          className={`pill-tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
          onClick={() => setActiveTab('evidence')}
        >
          <FileText size={14} />
          <span>Evidence</span>
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="layout-column animate-fade-in">
          {/* Hero Split Grid */}
          <div className="hero-split-grid">
            {/* Serene Lake Card */}
            <div
              className="hero-banner-card"
              style={{ backgroundImage: 'url(/images/serene_mountain_lake.jpg)', minHeight: '170px' }}
            >
              <div className="hero-banner-overlay" />
              <div className="hero-banner-content" style={{ maxWidth: '440px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.75rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  Small steps today, remarkable things tomorrow.
                </div>
                <div style={{ width: '40px', height: '1.5px', background: 'var(--accent-sage)', opacity: 0.5, marginTop: '12px' }} />
              </div>
            </div>

            {/* Inspirational Quote Card */}
            <QuoteCard
              quote="Invest in your learning today. It compounds into the life you want tomorrow."
              subtext="SAME EFFORT. A BRIGHTER YOU."
            />
          </div>

          {/* Row 1: Current Technical Context, Learning Progress, Active Project */}
          <div className="grid-3col">
            {/* Current Technical Context */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="card-header">
                  <span className="card-title">
                    <div className="card-title-icon">
                      <Settings size={14} />
                    </div>
                    Current Technical Context
                  </span>
                  <button className="card-more-btn">
                    <MoreHorizontal size={15} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Stable Track</span>
                    <strong style={{ color: 'var(--text-primary)' }}>RAG / AI Engineering</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current Focus</span>
                    <strong style={{ color: 'var(--text-primary)' }}>Web Development</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current Project</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{activeProject.title}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Next Milestone</span>
                    <span>{activeProject.nextMilestoneTitle}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Target Date</span>
                    <span className="font-mono">Apr 21, 2025</span>
                  </div>
                </div>
              </div>

              <div className="card-whisper-bar">
                <Leaf size={14} />
                <span>Build skills. Ship projects. Create a stronger you.</span>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="card-header">
                  <span className="card-title">
                    <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                      <BarChart2 size={14} />
                    </div>
                    Learning Progress
                  </span>
                  <button className="card-more-btn">
                    <MoreHorizontal size={15} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tracks.map(t => (
                    <div key={t.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '3px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{t.name}</span>
                        <span className="font-mono">{t.progress}%</span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '6px' }}>
                        <div className={`progress-bar-fill ${t.fill}`} style={{ width: `${t.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-whisper-bar whisper-periwinkle">
                <Leaf size={14} />
                <span>Consistent learning compounds into extraordinary results.</span>
              </div>
            </div>

            {/* Active Project */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="card-header">
                  <span className="card-title">
                    <div className="card-title-icon">
                      <Folder size={14} />
                    </div>
                    Active Project
                  </span>
                  <button className="card-more-btn">
                    <MoreHorizontal size={15} />
                  </button>
                </div>

                {/* Project Box Preview */}
                <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src="/images/botanical_leaf_branch.png"
                    alt=""
                    style={{ position: 'absolute', right: '-15px', bottom: '-15px', width: '70px', height: '70px', opacity: 0.4 }}
                  />
                  <strong style={{ fontSize: '0.96rem', display: 'block', marginBottom: '2px' }}>{activeProject.title}</strong>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Your knowledge, instant answers.
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: 'var(--radius-full)', padding: '5px 12px', border: '1px solid var(--border-subtle)' }}>
                    <Search size={12} color="var(--text-muted)" style={{ marginRight: '6px' }} />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Ask anything...</span>
                    <button style={{ marginLeft: 'auto', background: 'var(--accent-sage)', color: '#FFFFFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
                      →
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <strong>{activeProject.title}</strong>
                  <span className="font-mono">65%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px', marginBottom: '12px' }}>
                  <div className="progress-bar-fill fill-sage" style={{ width: '65%' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Next milestone</span>
                    <span>Retrieval evaluation report</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Due date</span>
                    <span className="font-mono">Apr 21, 2025</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tags</span>
                    <span className="badge badge-sage">RAG</span>
                    <span className="badge badge-periwinkle">AI</span>
                    <span className="badge badge-rose">Web Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Recent Learning Sessions + Learning Depth Model */}
          <div className="grid-2col-split">
            {/* Recent Learning Sessions */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">
                  <div className="card-title-icon" style={{ background: 'var(--accent-periwinkle-bg)', color: 'var(--accent-periwinkle)' }}>
                    <FileText size={14} />
                  </div>
                  Recent Learning Sessions
                </span>
                <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('topics')}>
                  View all →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {learningSessions.slice(0, 5).map(sess => (
                  <div key={sess.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{sess.topicTitle}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{sess.purpose}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{sess.date}</span>
                      <div className="badge badge-neutral font-mono" style={{ marginTop: '2px' }}>
                        {sess.durationMinutes} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Depth Model */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="card-header">
                  <span className="card-title">
                    <div className="card-title-icon">
                      <Leaf size={14} />
                    </div>
                    Learning Depth Model
                  </span>
                  <button className="card-more-btn">
                    <MoreHorizontal size={15} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 4px', gap: '4px' }}>
                  {depthStages.map((d, idx) => (
                    <React.Fragment key={d.stage}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: idx === 0 ? 'var(--accent-sage-bg)' : idx === 1 ? 'var(--accent-periwinkle-bg)' : idx === 2 ? 'var(--accent-sand-bg)' : idx === 3 ? 'var(--accent-rose-bg)' : 'var(--accent-periwinkle-bg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            marginBottom: '6px'
                          }}
                        >
                          {d.icon}
                        </div>
                        <strong style={{ fontSize: '0.76rem', color: 'var(--text-primary)' }}>{d.stage.split(' ')[0]}</strong>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>{d.desc}</span>
                      </div>
                      {idx < depthStages.length - 1 && (
                        <span style={{ color: 'var(--border-light)', fontSize: '0.8rem', margin: '0 2px' }}>→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="card-whisper-bar">
                <Leaf size={14} />
                <span>Deeper learning happens when knowledge becomes something you build, share, and use.</span>
              </div>
            </div>
          </div>

          {/* Full Width Bottom Inspirational Strip */}
          <div
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card-quote)',
              border: '1px solid var(--border-quote)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#DDA8A8', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>“</span>
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.94rem', color: '#2F3B32' }}>
                A little progress each day adds up to big results.
              </span>
            </div>

            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              LEARN DEEPLY. BUILD DELIBERATELY.
            </div>
          </div>
        </div>
      )}

      {/* 2. TOPICS TAB */}
      {activeTab === 'topics' && (
        <div className="grid-2col animate-fade-in">
          {learningTopics.map(topic => (
            <div key={topic.id} className="card">
              <div className="card-header">
                <span className="badge badge-sage">{topic.track}</span>
                <span className="badge badge-neutral">{topic.depthStage}</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>{topic.title}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                {topic.learningObjective}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mastery</span>
                <span className="font-mono">{topic.progressPercent}%</span>
              </div>
              <div className="progress-bar-container" style={{ height: '6px' }}>
                <div className="progress-bar-fill fill-sage" style={{ width: `${topic.progressPercent}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="layout-column animate-fade-in">
          {projects.map(proj => (
            <div key={proj.id} className="card">
              <div className="card-header">
                <span className="card-title">
                  <Folder size={16} color="var(--accent-sage)" />
                  {proj.title}
                </span>
                <span className="badge badge-sage">{proj.status}</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>{proj.tagline}</p>
              <div className="grid-2col" style={{ fontSize: '0.82rem', marginBottom: '14px' }}>
                <div style={{ padding: '10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <strong>Problem: </strong>{proj.problem}
                </div>
                <div style={{ padding: '10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <strong>Objective: </strong>{proj.objective}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {proj.milestones.map(m => (
                  <div key={m.id} onClick={() => toggleProjectMilestone(proj.id, m.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.84rem' }}>
                    <div className={`checkbox-box ${m.completed ? 'checked' : ''}`} style={{
                      backgroundColor: m.completed ? 'var(--accent-sage)' : '#FFFFFF',
                      borderColor: m.completed ? 'var(--accent-sage)' : 'var(--border-light)'
                    }}>
                      {m.completed && <Check size={12} color="#FFFFFF" />}
                    </div>
                    <span style={{ textDecoration: m.completed ? 'line-through' : 'none', color: m.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. EVIDENCE TAB */}
      {activeTab === 'evidence' && (
        <div className="layout-column animate-fade-in">
          {outputs.map(out => (
            <div key={out.id} className="card">
              <div className="card-header">
                <span className="card-title">{out.title}</span>
                <span className="badge badge-sage">{out.type}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{out.description}</p>
              {out.snippet && (
                <div style={{ marginTop: '8px', padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  {out.snippet}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
