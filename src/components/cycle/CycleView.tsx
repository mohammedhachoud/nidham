import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewHeader } from '../layout/ViewHeader';
import { QuoteCard } from '../common/QuoteCard';
import { programDayToDate, fmtShort } from '../../data/initialData';
import type { CycleTask } from '../../types';
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
  Plus,
  Trash2,
  Check,
  X,
  Edit3,
  CheckSquare,
  Square,
  Settings
} from 'lucide-react';

// ─── Inline Add / Edit Input ──────────────────────────────────────────────────
const InlineAdd: React.FC<{
  placeholder: string;
  onAdd: (val: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}> = ({ placeholder, onAdd, onCancel, autoFocus }) => {
  const [val, setVal] = useState('');
  const commit = () => {
    if (val.trim()) { onAdd(val.trim()); setVal(''); }
    else if (onCancel) onCancel();
  };
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <input
        autoFocus={autoFocus}
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder={placeholder}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape' && onCancel) onCancel(); }}
        style={{ flex: 1, fontSize: '0.82rem', padding: '5px 10px' }}
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={commit}
        disabled={!val.trim()}
        style={{ padding: '5px 10px' }}
      >
        <Check size={13} />
      </button>
      {onCancel && (
        <button
          className="btn btn-ghost btn-sm"
          onClick={onCancel}
          style={{ padding: '5px 8px' }}
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
};

// ─── Objectives Editor ────────────────────────────────────────────────────────
const ObjectivesEditor: React.FC<{ cycleNumber: number }> = ({ cycleNumber }) => {
  const { currentCycle, addCycleObjective, editCycleObjective, deleteCycleObjective } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState('');

  const objectives = currentCycle.coreObjectives || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {objectives.length === 0 && !showAdd && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          No objectives yet. Add your first core objective below.
        </p>
      )}
      {objectives.map((obj, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          {editingIdx === idx ? (
            <>
              <input
                autoFocus
                type="text"
                value={editVal}
                onChange={e => setEditVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') { editCycleObjective(cycleNumber, idx, editVal); setEditingIdx(null); }
                  if (e.key === 'Escape') setEditingIdx(null);
                }}
                style={{ flex: 1, fontSize: '0.82rem', padding: '4px 8px' }}
              />
              <button className="btn btn-primary btn-sm" style={{ padding: '4px 8px' }} onClick={() => { editCycleObjective(cycleNumber, idx, editVal); setEditingIdx(null); }}>
                <Check size={12} />
              </button>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }} onClick={() => setEditingIdx(null)}>
                <X size={12} />
              </button>
            </>
          ) : (
            <>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, color: 'var(--text-primary)' }}>
                {idx + 1}
              </span>
              <span style={{ flex: 1, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{obj}</span>
              <button className="btn btn-ghost btn-sm icon-only" onClick={() => { setEditingIdx(idx); setEditVal(obj); }} title="Edit">
                <Edit3 size={12} />
              </button>
              <button className="btn btn-ghost btn-sm icon-only" style={{ color: 'var(--status-danger)' }} onClick={() => deleteCycleObjective(cycleNumber, idx)} title="Delete">
                <Trash2 size={12} />
              </button>
            </>
          )}
        </div>
      ))}

      {showAdd ? (
        <InlineAdd
          placeholder="Add core objective…"
          onAdd={v => { addCycleObjective(cycleNumber, v); setShowAdd(false); }}
          onCancel={() => setShowAdd(false)}
          autoFocus
        />
      ) : (
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start', gap: '6px', marginTop: '4px' }} onClick={() => setShowAdd(true)}>
          <Plus size={13} />
          Add Objective
        </button>
      )}
    </div>
  );
};

// ─── Outputs Editor ───────────────────────────────────────────────────────────
const OutputsEditor: React.FC<{ cycleNumber: number }> = ({ cycleNumber }) => {
  const { currentCycle, addCycleOutput, toggleCycleOutput, deleteCycleOutput } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const outputs = currentCycle.expectedOutputs || [];
  const completed = currentCycle.completedOutputs || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {outputs.length === 0 && !showAdd && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          No expected outputs yet.
        </p>
      )}
      {outputs.map((item, idx) => {
        const isDone = completed.includes(item);
        return (
          <div
            key={idx}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}
          >
            <button
              className="btn btn-ghost btn-sm icon-only"
              style={{ color: isDone ? 'var(--accent-sage)' : 'var(--text-muted)', padding: '2px' }}
              onClick={() => toggleCycleOutput(cycleNumber, item)}
              title={isDone ? 'Mark incomplete' : 'Mark complete'}
            >
              {isDone ? <CheckSquare size={16} /> : <Square size={16} />}
            </button>
            <span style={{ flex: 1, color: isDone ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: isDone ? 'line-through' : 'none' }}>
              {item}
            </span>
            <button
              className="btn btn-ghost btn-sm icon-only"
              style={{ color: 'var(--status-danger)' }}
              onClick={() => deleteCycleOutput(cycleNumber, item)}
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        );
      })}

      {showAdd ? (
        <InlineAdd
          placeholder="Add expected output…"
          onAdd={v => { addCycleOutput(cycleNumber, v); setShowAdd(false); }}
          onCancel={() => setShowAdd(false)}
          autoFocus
        />
      ) : (
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start', gap: '6px', marginTop: '4px' }} onClick={() => setShowAdd(true)}>
          <Plus size={13} />
          Add Output
        </button>
      )}
    </div>
  );
};

// ─── Tasks Manager ────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<CycleTask['category'], string> = {
  Objective: 'badge-rose',
  Output: 'badge-sage',
  Theme: 'badge-periwinkle',
  General: 'badge-sand'
};

const TasksManager: React.FC<{ cycleNumber: number }> = ({ cycleNumber }) => {
  const { currentCycle, addCycleTask, toggleCycleTask, deleteCycleTask } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CycleTask['category']>('General');
  const [newNotes, setNewNotes] = useState('');
  const [filterCat, setFilterCat] = useState<string>('All');

  const tasks = currentCycle.tasks || [];
  const categories: CycleTask['category'][] = ['Objective', 'Output', 'Theme', 'General'];

  const filtered = filterCat === 'All' ? tasks : tasks.filter(t => t.category === filterCat);
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    addCycleTask(cycleNumber, {
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      notes: newNotes.trim() || undefined
    });
    setNewTitle('');
    setNewNotes('');
    setNewCategory('General');
    setShowAdd(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header row with filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['All', ...categories].map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${filterCat === cat ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilterCat(cat)}
              style={{ fontSize: '0.75rem', padding: '3px 10px' }}
            >
              {cat}
            </button>
          ))}
        </div>
        {totalCount > 0 && (
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {completedCount}/{totalCount} done
          </span>
        )}
      </div>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="progress-bar-container" style={{ height: '5px' }}>
          <div className="progress-bar-fill fill-sage" style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }} />
        </div>
      )}

      {/* Task list */}
      {filtered.length === 0 && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {tasks.length === 0 ? 'No tasks yet. Add your first cycle task below.' : `No tasks in "${filterCat}" category.`}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filtered.map(task => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: task.completed ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.15s ease'
            }}
          >
            <button
              className="btn btn-ghost btn-sm icon-only"
              style={{ color: task.completed ? 'var(--accent-sage)' : 'var(--text-muted)', padding: '2px', flexShrink: 0 }}
              onClick={() => toggleCycleTask(cycleNumber, task.id)}
            >
              {task.completed ? <CheckSquare size={16} /> : <Square size={16} />}
            </button>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                fontSize: '0.84rem',
                color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                textDecoration: task.completed ? 'line-through' : 'none',
                display: 'block'
              }}>
                {task.title}
              </span>
              {task.notes && (
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{task.notes}</span>
              )}
            </div>

            <span className={`badge ${CATEGORY_COLORS[task.category]}`} style={{ fontSize: '0.68rem', padding: '2px 7px', flexShrink: 0 }}>
              {task.category}
            </span>

            <button
              className="btn btn-ghost btn-sm icon-only"
              style={{ color: 'var(--status-danger)', flexShrink: 0 }}
              onClick={() => deleteCycleTask(cycleNumber, task.id)}
              title="Delete task"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {showAdd ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '14px',
          borderRadius: '10px',
          border: '1px solid var(--accent-sage)',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              autoFocus
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Task title…"
              onKeyDown={e => { if (e.key === 'Enter') handleAddTask(); if (e.key === 'Escape') setShowAdd(false); }}
              style={{ flex: 1, fontSize: '0.84rem' }}
            />
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value as CycleTask['category'])}
              style={{ fontSize: '0.8rem', minWidth: '110px' }}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <input
            type="text"
            value={newNotes}
            onChange={e => setNewNotes(e.target.value)}
            placeholder="Optional notes…"
            style={{ fontSize: '0.8rem' }}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>
              <X size={13} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleAddTask} disabled={!newTitle.trim()}>
              <Plus size={13} /> Add Task
            </button>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-ghost btn-sm"
          style={{ justifyContent: 'flex-start', gap: '6px', marginTop: '2px' }}
          onClick={() => setShowAdd(true)}
        >
          <Plus size={13} />
          Add Task
        </button>
      )}
    </div>
  );
};

// ─── Learning Themes Editor ────────────────────────────────────────────────────
const ThemesEditor: React.FC<{ cycleNumber: number }> = ({ cycleNumber }) => {
  const { currentCycle, updateCycle } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const themes = currentCycle.majorThemes || [];

  const addTheme = (val: string) => {
    updateCycle(cycleNumber, { majorThemes: [...themes, val] });
    setShowAdd(false);
  };

  const deleteTheme = (idx: number) => {
    updateCycle(cycleNumber, { majorThemes: themes.filter((_, i) => i !== idx) });
  };

  const badgeColors = ['badge-sage', 'badge-periwinkle', 'badge-sand', 'badge-rose'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {themes.length === 0 && !showAdd && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          No learning themes yet.
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {themes.map((theme, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div className={`badge ${badgeColors[idx % badgeColors.length]}`} style={{ padding: '5px 8px', fontSize: '0.73rem', flex: 1, justifyContent: 'flex-start' }}>
              {theme}
            </div>
            <button
              className="btn btn-ghost btn-sm icon-only"
              style={{ color: 'var(--status-danger)', padding: '2px' }}
              onClick={() => deleteTheme(idx)}
            >
              <X size={11} />
            </button>
          </div>
        ))}
      </div>

      {showAdd ? (
        <InlineAdd
          placeholder="Add learning theme…"
          onAdd={addTheme}
          onCancel={() => setShowAdd(false)}
          autoFocus
        />
      ) : (
        <button
          className="btn btn-ghost btn-sm"
          style={{ justifyContent: 'flex-start', gap: '6px', marginTop: '2px' }}
          onClick={() => setShowAdd(true)}
        >
          <Plus size={13} />
          Add Theme
        </button>
      )}
    </div>
  );
};

// ─── Main CycleView ────────────────────────────────────────────────────────────
export const CycleView: React.FC = () => {
  const { currentCycle, computedStats, today } = useApp();
  const [manageMode, setManageMode] = useState(false);

  const kpis = [
    { name: 'Learning consistency', value: computedStats.weeklyExecutionRate, fill: 'fill-sage' },
    { name: 'Project completion', value: computedStats.activeProjectProgress, fill: 'fill-periwinkle' },
    { name: 'Habit execution', value: computedStats.todayExecutionRate, fill: 'fill-sand' },
    { name: 'Health & well-being', value: computedStats.weeklyTrainingConsistency, fill: 'fill-rose' }
  ];

  const tasks = currentCycle.tasks || [];
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="layout-column animate-fade-in">
      {/* Top Header Section */}
      <ViewHeader
        category="90-DAY PERSONAL OPERATING SYSTEM"
        title="Current Cycle"
        subtitle="Focused learning. Real progress. A better you."
      />

      {/* Manage Cycle toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className={`btn btn-sm ${manageMode ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setManageMode(m => !m)}
          style={{ gap: '6px' }}
        >
          <Settings size={14} />
          {manageMode ? 'Done Managing' : 'Manage Cycle'}
        </button>
      </div>

      {/* ── Manage Mode Banner ── */}
      {manageMode && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          background: 'var(--accent-sage-bg)',
          border: '1px solid var(--accent-sage)',
          fontSize: '0.83rem',
          color: 'var(--accent-sage)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Settings size={14} />
          <span>You are in <strong>Manage Mode</strong> — add, edit, and delete cycle content freely. Click "Done Managing" when finished.</span>
        </div>
      )}

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
              Cycle {currentCycle.number} — {currentCycle.name}
            </h2>
            <p className="hero-banner-desc">
              {currentCycle.mission}
            </p>

            {/* Cycle Progress Bar */}
            <div style={{ maxWidth: '440px', marginBottom: '16px' }}>
              <div className="progress-bar-container" style={{ height: '7px', marginBottom: '5px' }}>
                <div className="progress-bar-fill fill-sage" style={{ width: `${computedStats.dayProgressPercent}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                <span>Day {computedStats.daysCompleted} of 90 — {computedStats.daysRemaining} days remaining</span>
                <span className="font-mono">{computedStats.dayProgressPercent}%</span>
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

        {/* Tasks Summary / Quote Card */}
        {tasks.length > 0 && !manageMode ? (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="card-header">
              <span className="card-title">
                <CheckSquare size={16} style={{ color: 'var(--accent-sage)' }} />
                Cycle Tasks Overview
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {completedTasks}/{tasks.length}
              </span>
            </div>
            <div className="progress-bar-container" style={{ height: '6px' }}>
              <div className="progress-bar-fill fill-sage" style={{ width: `${tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%` }} />
            </div>
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                {task.completed
                  ? <CheckSquare size={14} style={{ color: 'var(--accent-sage)', flexShrink: 0 }} />
                  : <Square size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                }
                <span style={{ color: task.completed ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: task.completed ? 'line-through' : 'none', flex: 1 }}>
                  {task.title}
                </span>
                <span className={`badge ${CATEGORY_COLORS[task.category]}`} style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                  {task.category}
                </span>
              </div>
            ))}
            {tasks.length > 5 && (
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                +{tasks.length - 5} more — click "Manage Cycle" to see all
              </p>
            )}
          </div>
        ) : (
          <QuoteCard
            quote="You are not behind. You are building something real."
            subtext="Small, consistent progress today compounds into the life you want tomorrow."
          />
        )}
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
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {currentCycle.mission}
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
            </div>
            <ObjectivesEditor cycleNumber={currentCycle.number} />
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
            </div>
            <ThemesEditor cycleNumber={currentCycle.number} />
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
              {(currentCycle.completedOutputs?.length ?? 0) > 0 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-sage)', fontFamily: 'var(--font-mono)' }}>
                  {currentCycle.completedOutputs!.length}/{currentCycle.expectedOutputs.length} ✓
                </span>
              )}
            </div>
            <OutputsEditor cycleNumber={currentCycle.number} />
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
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              This cycle builds the essential knowledge, practical skills and working habits needed for long-term goals. It creates momentum, confidence and tangible proof of progress while setting up opportunities for the next phase of growth.
            </p>
          </div>

          <div className="card-whisper-bar whisper-rose">
            <Heart size={14} />
            <span>A stronger me today unlocks more possibilities tomorrow.</span>
          </div>
        </div>
      </div>

      {/* ── Full Tasks Manager Panel (Manage Mode) ── */}
      {manageMode && (
        <div className="card" style={{ border: '1px solid var(--accent-sage)' }}>
          <div className="card-header">
            <span className="card-title">
              <div className="card-title-icon" style={{ background: 'var(--accent-sage-bg)', color: 'var(--accent-sage)' }}>
                <CheckSquare size={14} />
              </div>
              Cycle Tasks Manager
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Full task list — add, complete, and remove tasks for this cycle
            </span>
          </div>
          <TasksManager cycleNumber={currentCycle.number} />
        </div>
      )}

      {/* Row 3: Milestones Timeline Card */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <div className="card-title-icon" style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose)' }}>
              <Flag size={14} />
            </div>
            Milestones
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', position: 'relative' }}>
          {/* Timeline connecting line */}
          <div style={{ position: 'absolute', top: '24px', left: '40px', right: '40px', height: '2px', background: 'var(--border-subtle)', zIndex: 1 }} />

          {[
            { day: 'Day 1', label: 'Start Cycle', date: fmtShort(programDayToDate(1)), active: today.dayNumber >= 1, completed: today.dayNumber > 1 },
            { day: 'Day 30', label: 'Core Skills', date: fmtShort(programDayToDate(30)), active: today.dayNumber >= 1 && today.dayNumber <= 30, completed: today.dayNumber > 30 },
            { day: 'Day 60', label: 'Build & Apply', date: fmtShort(programDayToDate(60)), active: today.dayNumber > 30 && today.dayNumber <= 60, completed: today.dayNumber > 60 },
            { day: 'Day 90', label: 'Showcase & Review', date: fmtShort(programDayToDate(90)), active: today.dayNumber > 60, completed: today.dayNumber >= 90 }
          ].map(m => (
            <div key={m.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: 'var(--bg-primary)', padding: '0 8px' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: m.completed ? 'var(--accent-sage)' : m.active ? 'var(--accent-sage-soft)' : 'var(--bg-secondary)',
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
