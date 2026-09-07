import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  GraduationCap,
  Languages,
  AlertTriangle,
  Sparkles,
  FileCode,
  StickyNote,
  Check
} from 'lucide-react';
import type { DepthStage, IELTSSkill } from '../../types';

export const QuickLogModal: React.FC = () => {
  const {
    isQuickLogOpen,
    setQuickLogOpen,
    quickLogInitialType,
    learningTopics,
    addLearningSession,
    addIELTSSession,
    addIELTSError,
    addProjectOutput,
    updateQuickNotes,
    today,
    activeProject
  } = useApp();

  type ActionType = 'learning' | 'ielts-practice' | 'ielts-error' | 'training' | 'output' | 'note';

  const [activeAction, setActiveAction] = useState<ActionType>('learning');

  // Form states
  // 1. Learning
  const [learningTopicId, setLearningTopicId] = useState(learningTopics[0]?.id || '');
  const [learningStage, setLearningStage] = useState<DepthStage>('Implement');
  const [learningDuration, setLearningDuration] = useState(60);
  const [learningPurpose, setLearningPurpose] = useState('');
  const [learningResult, setLearningResult] = useState('');
  const [learningNextStep, setLearningNextStep] = useState('');

  // 2. IELTS Practice
  const [ieltsSkill, setIeltsSkill] = useState<IELTSSkill>('Listening');
  const [ieltsFocus, setIeltsFocus] = useState('');
  const [ieltsPracticeType, setIeltsPracticeType] = useState('Cambridge 18 Academic');
  const [ieltsDuration, setIeltsDuration] = useState(45);
  const [ieltsScore, setIeltsScore] = useState('');
  const [ieltsMistakes, setIeltsMistakes] = useState('');
  const [ieltsNextAction, setIeltsNextAction] = useState('');

  // 3. IELTS Error
  const [errorSkill, setErrorSkill] = useState<IELTSSkill>('Listening');
  const [errorType, setErrorType] = useState('');
  const [errorExample, setErrorExample] = useState('');
  const [errorReason, setErrorReason] = useState('');
  const [errorCorrection, setErrorCorrection] = useState('');
  const [errorNextDrill, setErrorNextDrill] = useState('');

  // 4. Output / Evidence
  const [outputTitle, setOutputTitle] = useState('');
  const [outputType, setOutputType] = useState<any>('Evaluation Report');
  const [outputDesc, setOutputDesc] = useState('');
  const [outputSnippet, setOutputSnippet] = useState('');
  const [outputTags, setOutputTags] = useState('RAG, Evaluation');

  // 5. Note
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (quickLogInitialType) {
      setActiveAction(quickLogInitialType as ActionType);
    }
  }, [quickLogInitialType, isQuickLogOpen]);

  if (!isQuickLogOpen) return null;

  const handleClose = () => setQuickLogOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (activeAction === 'learning') {
      const selectedTopic = learningTopics.find(t => t.id === learningTopicId) || learningTopics[0];
      addLearningSession({
        date: dateStr,
        topicId: selectedTopic.id,
        topicTitle: selectedTopic.title,
        track: selectedTopic.track,
        type: learningStage,
        durationMinutes: Number(learningDuration),
        purpose: learningPurpose || 'Deliberate learning session',
        result: learningResult,
        nextStep: learningNextStep
      });
    } else if (activeAction === 'ielts-practice') {
      addIELTSSession({
        date: dateStr,
        skill: ieltsSkill,
        focus: ieltsFocus || `${ieltsSkill} daily session`,
        practiceType: ieltsPracticeType,
        durationMinutes: Number(ieltsDuration),
        resultScore: ieltsScore || undefined,
        errorsIdentified: ieltsMistakes ? ieltsMistakes.split(',').map(s => s.trim()) : [],
        nextAction: ieltsNextAction || 'Targeted drill'
      });
    } else if (activeAction === 'ielts-error') {
      addIELTSError({
        skill: errorSkill,
        errorType: errorType || 'Uncategorized mistake',
        example: errorExample,
        reason: errorReason,
        correction: errorCorrection,
        nextDrill: errorNextDrill
      });
    } else if (activeAction === 'output') {
      addProjectOutput({
        title: outputTitle || 'Verified Technical Output',
        type: outputType,
        date: dateStr,
        description: outputDesc,
        snippet: outputSnippet || undefined,
        tags: outputTags.split(',').map(s => s.trim()).filter(Boolean),
        relatedProjectId: activeProject.id
      });
    } else if (activeAction === 'note') {
      const updated = today.quickNotes ? `${today.quickNotes}\n• ${noteContent}` : `• ${noteContent}`;
      updateQuickNotes(updated);
    }

    handleClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
            <span>Quick Log Entry</span>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Action Type Tabs */}
        <div style={{ padding: '12px 24px 0', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
          <div className="tabs-nav" style={{ marginBottom: 0 }}>
            <button
              type="button"
              className={`tab-btn ${activeAction === 'learning' ? 'active' : ''}`}
              onClick={() => setActiveAction('learning')}
            >
              <GraduationCap size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Learning
            </button>
            <button
              type="button"
              className={`tab-btn ${activeAction === 'ielts-practice' ? 'active' : ''}`}
              onClick={() => setActiveAction('ielts-practice')}
            >
              <Languages size={14} style={{ display: 'inline', marginRight: '6px' }} />
              IELTS
            </button>
            <button
              type="button"
              className={`tab-btn ${activeAction === 'ielts-error' ? 'active' : ''}`}
              onClick={() => setActiveAction('ielts-error')}
            >
              <AlertTriangle size={14} style={{ display: 'inline', marginRight: '6px' }} />
              IELTS Error
            </button>
            <button
              type="button"
              className={`tab-btn ${activeAction === 'output' ? 'active' : ''}`}
              onClick={() => setActiveAction('output')}
            >
              <FileCode size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Evidence
            </button>
            <button
              type="button"
              className={`tab-btn ${activeAction === 'note' ? 'active' : ''}`}
              onClick={() => setActiveAction('note')}
            >
              <StickyNote size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Note
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* 1. LEARNING FORM */}
            {activeAction === 'learning' && (
              <>
                <div className="form-group">
                  <label className="form-label">Learning Topic</label>
                  <select
                    value={learningTopicId}
                    onChange={e => setLearningTopicId(e.target.value)}
                  >
                    {learningTopics.map(topic => (
                      <option key={topic.id} value={topic.id}>
                        [{topic.track}] {topic.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Depth Stage</label>
                    <select
                      value={learningStage}
                      onChange={e => setLearningStage(e.target.value as DepthStage)}
                    >
                      <option value="Understand">1. Understand</option>
                      <option value="Practice">2. Practice</option>
                      <option value="Implement">3. Implement</option>
                      <option value="Validate">4. Validate</option>
                      <option value="Apply + Evidence">5. Apply + Evidence</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={learningDuration}
                      onChange={e => setLearningDuration(Number(e.target.value))}
                      step={15}
                      min={15}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Purpose / Intention</label>
                  <input
                    type="text"
                    placeholder="What specific technique or concept are you mastering?"
                    value={learningPurpose}
                    onChange={e => setLearningPurpose(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Concrete Result / Understanding</label>
                  <textarea
                    rows={2}
                    placeholder="What did you produce or prove? (Code, test, finding...)"
                    value={learningResult}
                    onChange={e => setLearningResult(e.target.value)}
                  />
                  <span className="form-hint">Outputs beat consumption: watching content without implementation produces no evidence.</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Next Step</label>
                  <input
                    type="text"
                    placeholder="What is the immediate next build step?"
                    value={learningNextStep}
                    onChange={e => setLearningNextStep(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* 2. IELTS PRACTICE FORM */}
            {activeAction === 'ielts-practice' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Skill</label>
                    <select
                      value={ieltsSkill}
                      onChange={e => setIeltsSkill(e.target.value as IELTSSkill)}
                    >
                      <option value="Listening">Listening</option>
                      <option value="Reading">Reading</option>
                      <option value="Writing">Writing</option>
                      <option value="Speaking">Speaking</option>
                      <option value="Diagnostic / Errors">Diagnostic / Error Review</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="number"
                      value={ieltsDuration}
                      onChange={e => setIeltsDuration(Number(e.target.value))}
                      min={15}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Focus Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Distractors in Sec 3-4, Task 2 Overview paragraph"
                    value={ieltsFocus}
                    onChange={e => setIeltsFocus(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Practice Source</label>
                    <input
                      type="text"
                      value={ieltsPracticeType}
                      onChange={e => setIeltsPracticeType(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Band Score / Result</label>
                    <input
                      type="text"
                      placeholder="e.g. 7.0 or 32/40"
                      value={ieltsScore}
                      onChange={e => setIeltsScore(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mistakes Encountered</label>
                  <input
                    type="text"
                    placeholder="Comma-separated summary of errors"
                    value={ieltsMistakes}
                    onChange={e => setIeltsMistakes(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Next Action</label>
                  <input
                    type="text"
                    placeholder="What drill will prevent this error from recurring?"
                    value={ieltsNextAction}
                    onChange={e => setIeltsNextAction(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* 3. IELTS ERROR FORM */}
            {activeAction === 'ielts-error' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Skill</label>
                    <select
                      value={errorSkill}
                      onChange={e => setErrorSkill(e.target.value as IELTSSkill)}
                    >
                      <option value="Listening">Listening</option>
                      <option value="Reading">Reading</option>
                      <option value="Writing">Writing</option>
                      <option value="Speaking">Speaking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Error Category / Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Distractor identification, Paraphrasing"
                      value={errorType}
                      onChange={e => setErrorType(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Concrete Example</label>
                  <textarea
                    rows={2}
                    placeholder="Exact phrase, audio transcript context, or question text"
                    value={errorExample}
                    onChange={e => setErrorExample(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Root Cause (Why did this happen?)</label>
                  <input
                    type="text"
                    placeholder="e.g. Wrote down first number without listening for speaker qualification"
                    value={errorReason}
                    onChange={e => setErrorReason(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Correction Rule</label>
                  <input
                    type="text"
                    placeholder="e.g. Pause 2 seconds before committing numeric answer"
                    value={errorCorrection}
                    onChange={e => setErrorCorrection(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prescribed Next Drill</label>
                  <input
                    type="text"
                    placeholder="e.g. Section 3 dialogue negotiations audio drills"
                    value={errorNextDrill}
                    onChange={e => setErrorNextDrill(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* 4. EVIDENCE FORM */}
            {activeAction === 'output' && (
              <>
                <div className="form-group">
                  <label className="form-label">Output Title</label>
                  <input
                    type="text"
                    placeholder="e.g. RAG Evaluation Baseline Report"
                    value={outputTitle}
                    onChange={e => setOutputTitle(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Evidence Type</label>
                    <select
                      value={outputType}
                      onChange={e => setOutputType(e.target.value)}
                    >
                      <option value="Evaluation Report">Evaluation Report</option>
                      <option value="Feature Implementation">Feature Implementation</option>
                      <option value="GitHub Update">GitHub Update / PR</option>
                      <option value="IELTS Mock Result">IELTS Mock Result</option>
                      <option value="Architecture Diagram">Architecture Diagram</option>
                      <option value="Benchmark Test">Benchmark Test</option>
                      <option value="Technical Note">Technical Note</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={outputTags}
                      onChange={e => setOutputTags(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description / Summary</label>
                  <textarea
                    rows={2}
                    placeholder="What capability or benchmark does this demonstrate?"
                    value={outputDesc}
                    onChange={e => setOutputDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Snippet / Key Finding (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Key code snippet, metric number, or takeaway"
                    value={outputSnippet}
                    onChange={e => setOutputSnippet(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* 5. NOTE FORM */}
            {activeAction === 'note' && (
              <div className="form-group">
                <label className="form-label">Quick Thought, Idea or Blocker</label>
                <textarea
                  rows={4}
                  placeholder="Capture fleeting insight or blocker..."
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
