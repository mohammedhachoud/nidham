import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  FolderGit2,
  FileCode,
  Layers,
  CheckCircle2,
  ExternalLink,
  Plus,
  ShieldCheck,
  Cpu,
  BookOpen,
  GitPullRequest
} from 'lucide-react';
import type { DepthStage, TechnicalTrack } from '../../types';

export const LearningProjectsView: React.FC = () => {
  const {
    learningTopics,
    learningSessions,
    projects,
    activeProject,
    outputs,
    toggleProjectMilestone,
    setQuickLogOpen
  } = useApp();

  type TabType = 'overview' | 'topics' | 'projects' | 'evidence';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tracks: TechnicalTrack[] = [
    'RAG / AI Engineering',
    'Web Development',
    'Data Science',
    'Automation',
    'AI Agents'
  ];

  const getTrackProgress = (track: TechnicalTrack) => {
    const trackTopics = learningTopics.filter(t => t.track === track);
    if (!trackTopics.length) return 0;
    const total = trackTopics.reduce((acc, t) => acc + t.progressPercent, 0);
    return Math.round(total / trackTopics.length);
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
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-main">
          <h1>Learning + Projects</h1>
          <p>
            Learn deeply. Build deliberately. Produce evidence. Technology follows the problem.
          </p>
        </div>

        <div className="view-header-aside">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setQuickLogOpen(true, 'learning')}
          >
            <Plus size={14} />
            <span>Log Learning Session</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Layers size={14} style={{ display: 'inline', marginRight: '6px' }} />
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
          Learning Topics ({learningTopics.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <FolderGit2 size={14} style={{ display: 'inline', marginRight: '6px' }} />
          Projects ({projects.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
          onClick={() => setActiveTab('evidence')}
        >
          <FileCode size={14} style={{ display: 'inline', marginRight: '6px' }} />
          Evidence Vault ({outputs.length})
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="layout-column animate-fade-in">
          {/* Top Context & Track Progress Grid */}
          <div className="grid-2col">
            {/* Current Technical Context */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">
                  <Cpu size={18} style={{ color: 'var(--accent-primary)' }} />
                  Current Technical Context
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Stable Track:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>RAG / AI Engineering</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Focus:</span>
                  <strong style={{ color: 'var(--status-purple)' }}>Web Development (React/TS)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Active Project:</span>
                  <strong style={{ color: 'var(--accent-primary)' }}>{activeProject.title}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Next Key Milestone:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{activeProject.nextMilestoneTitle} (Jan 21)</span>
                </div>
              </div>
            </div>

            {/* Learning Progress by Track */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">
                  <GraduationCap size={18} style={{ color: 'var(--status-success)' }} />
                  Learning Progress by Track
                </span>
                <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('topics')}>
                  View all →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tracks.map(track => {
                  const progress = getTrackProgress(track);
                  return (
                    <div key={track}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{track}</span>
                        <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{progress}%</span>
                      </div>
                      <div className="progress-bar-container">
                        <div
                          className={`progress-bar-fill ${
                            track.includes('RAG') ? 'fill-blue' :
                            track.includes('Web') ? 'fill-green' :
                            track.includes('Data') ? 'fill-amber' : 'fill-purple'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Project Card */}
          <div
            className="card"
            style={{
              border: '1.5px solid var(--border-light)',
              background: 'linear-gradient(135deg, rgba(23, 33, 51, 0.95) 0%, rgba(19, 27, 42, 0.9) 100%)'
            }}
          >
            <div className="card-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-green">In Progress (Primary Active Project)</span>
                  <span className="badge badge-neutral font-mono">{activeProject.technologies.slice(0, 3).join(' • ')}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{activeProject.title}</h3>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('projects')}>
                Project Blueprint →
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {activeProject.tagline}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.82rem', marginBottom: '16px' }}>
              <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Problem Solved: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{activeProject.problem}</span>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: 'var(--status-success)' }}>Primary Objective: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{activeProject.objective}</span>
              </div>
            </div>

            {/* Milestones Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Milestones ({activeProject.milestones.filter(m => m.completed).length}/{activeProject.milestones.length})</span>
                <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{activeProject.progressPercent}%</span>
              </div>
              <div className="progress-bar-container" style={{ height: '7px' }}>
                <div className="progress-bar-fill fill-blue" style={{ width: `${activeProject.progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Recent Deliberate Learning Sessions */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <GraduationCap size={18} style={{ color: 'var(--accent-primary)' }} />
                Recent Deliberate Learning Sessions
              </span>
              <span className="badge badge-neutral font-mono">{learningSessions.length} sessions logged</span>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>Date</th>
                    <th>Topic & Track</th>
                    <th>Depth Stage</th>
                    <th>Duration</th>
                    <th>Result & Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {learningSessions.map(sess => (
                    <tr key={sess.id}>
                      <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {sess.date}
                      </td>
                      <td>
                        <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>{sess.topicTitle}</strong>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{sess.track}</div>
                      </td>
                      <td>
                        <span className={`badge ${getStageBadgeClass(sess.type)}`}>
                          {sess.type}
                        </span>
                      </td>
                      <td className="font-mono" style={{ fontSize: '0.82rem' }}>
                        {sess.durationMinutes} min
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {sess.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. LEARNING TOPICS TAB */}
      {activeTab === 'topics' && (
        <div className="layout-column animate-fade-in">
          <div className="card">
            <div className="card-header">
              <div>
                <span className="card-title">5-Stage Learning Depth Matrix</span>
                <span className="card-subtitle">
                  Understand → Practice → Implement → Validate → Apply + Evidence
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {learningTopics.map(topic => (
                <div
                  key={topic.id}
                  style={{
                    padding: '16px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{topic.track}</span>
                      <span className={`badge ${getStageBadgeClass(topic.depthStage)}`}>
                        {topic.depthStage}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {topic.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      {topic.learningObjective}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      {topic.keyConcepts.map(c => (
                        <span key={c} className="badge badge-neutral font-mono" style={{ fontSize: '0.68rem' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ padding: '8px 10px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', marginBottom: '10px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Next step: </span>
                      <span style={{ color: 'var(--accent-primary)' }}>{topic.nextStep}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Mastery</span>
                      <span className="font-mono">{topic.progressPercent}%</span>
                    </div>
                    <div className="progress-bar-container" style={{ height: '5px' }}>
                      <div className="progress-bar-fill fill-blue" style={{ width: `${topic.progressPercent}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="layout-column animate-fade-in">
          {projects.map(proj => (
            <div key={proj.id} className="card" style={{ borderColor: proj.status === 'In Progress' ? 'var(--border-light)' : 'var(--border-subtle)' }}>
              <div className="card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`badge ${proj.status === 'In Progress' ? 'badge-green' : 'badge-neutral'}`}>
                      {proj.status}
                    </span>
                    <span className="badge badge-purple">Milestones: {proj.milestones.filter(m => m.completed).length}/{proj.milestones.length}</span>
                  </div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{proj.title}</h2>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <GitPullRequest size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {proj.tagline}
              </p>

              {/* Problem, Objective & Career Narrative */}
              <div className="grid-3col" style={{ fontSize: '0.84rem', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--accent-primary)' }}>1. Real Problem Solved</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.8rem' }}>{proj.problem}</p>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--status-success)' }}>2. Concrete Objective</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.8rem' }}>{proj.objective}</p>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--status-purple)' }}>3. Career / Interview Story</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.8rem' }}>{proj.careerStory}</p>
                </div>
              </div>

              {/* Technology Gate: Workflow vs Agent */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <ShieldCheck size={16} />
                  Technology Gate: Workflow ≠ Agent Rationale
                </div>
                <p style={{ color: 'var(--text-primary)', marginTop: '4px' }}>
                  {proj.techGate.rationale}
                </p>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                  Comparison: {proj.techGate.workflowComparison}
                </div>
              </div>

              {/* Milestones Checklist */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>Project Milestones</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {proj.milestones.map(m => (
                    <div
                      key={m.id}
                      className="item-row"
                      onClick={() => toggleProjectMilestone(proj.id, m.id)}
                      style={{ cursor: 'pointer', padding: '8px 12px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className={`custom-checkbox ${m.completed ? 'checked' : ''}`}>
                          <div className="checkbox-box" style={{ width: '16px', height: '16px' }}>
                            {m.completed && <CheckCircle2 size={12} />}
                          </div>
                        </div>
                        <span style={{
                          fontSize: '0.84rem',
                          textDecoration: m.completed ? 'line-through' : 'none',
                          color: m.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                        }}>
                          {m.title}
                        </span>
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Target: {m.targetDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. EVIDENCE VAULT TAB */}
      {activeTab === 'evidence' && (
        <div className="layout-column animate-fade-in">
          <div className="card">
            <div className="card-header">
              <div>
                <span className="card-title">
                  <FileCode size={18} style={{ color: 'var(--accent-primary)' }} />
                  Verified Evidence Vault
                </span>
                <span className="card-subtitle">
                  Concrete deliverables, evaluation reports, PRs, and architectural benchmark artifacts.
                </span>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setQuickLogOpen(true, 'output')}
              >
                <Plus size={14} />
                <span>+ Add Verified Output</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {outputs.map(out => (
                <div
                  key={out.id}
                  style={{
                    padding: '16px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge badge-blue">{out.type}</span>
                        <strong style={{ fontSize: '0.94rem', color: 'var(--text-primary)' }}>{out.title}</strong>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {out.description}
                      </p>
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {out.date}
                    </span>
                  </div>

                  {out.snippet && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '8px 12px',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      {out.snippet}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'gap', gap: '6px' }}>
                      {out.tags.map(t => (
                        <span key={t} className="badge badge-neutral" style={{ fontSize: '0.68rem', marginRight: '4px' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                    {out.url && (
                      <a href={out.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span>Inspect Artifact</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
