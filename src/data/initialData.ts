import type {
  CycleData,
  WeekDaySchedule,
  DepthStage,
  IELTSSkill,
  UserProfile,
  WeekData,
  DayData,
  LearningTopic,
  LearningSession,
  ProjectData,
  OutputEvidence,
  IELTSSessionRecord,
  IELTSErrorRecord,
  SystemRisk,
  ResourceItem
} from '../types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Mohammed',
  motto: 'Discipline Creates Freedom',
  programStartDate: '2026-09-08',
  ieltsTargetBand: 7.5,
  dailySleepTarget: 7.5,
  dailyScreenTimeLimit: 1.5
};

// ─── Program Calendar ──────────────────────────────────────────────────────
// The 90-day program started on this real calendar date (Day 1).
export const PROGRAM_START_DATE = new Date(2026, 8, 8); // Sep 8, 2026

/** Return the real calendar Date for a given program day number (1-indexed). */
export function programDayToDate(dayNumber: number): Date {
  const d = new Date(PROGRAM_START_DATE);
  d.setDate(d.getDate() + dayNumber - 1);
  return d;
}

/** Format a Date as e.g. "Sep 8" */
export function fmtShort(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Format a Date as e.g. "Sep 8, 2026" */
export function fmtLong(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Format a Date as e.g. "Mon, Sep 8, 2026" */
export function fmtFull(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

/** Return the 3-letter weekday name for a given Date, e.g. "Mon" */
export function fmtDay(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Compute today's program day number (1-indexed).
 * Returns 1 if today is before the program start.
 */
export function getTodayDayNumber(): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(PROGRAM_START_DATE);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}

/** Build the dateRange string for a week, e.g. "Sep 8 – Sep 14, 2026" */
function weekDateRange(startDay: number, endDay: number): string {
  const s = programDayToDate(startDay);
  const e = programDayToDate(endDay);
  return `${fmtShort(s)} – ${fmtShort(e)}, ${e.getFullYear()}`;
}

/** Build dailySchedule for a week starting at startDay with given content rows. */
function buildDailySchedule(
  startDay: number,
  rows: Array<{
    technicalFocus: string;
    technicalStage: DepthStage;
    ieltsSkill: IELTSSkill;
    keyCommitments: string;
  }>,
  todayDayNum: number
) {
  const dayNames: WeekDaySchedule['dayName'][] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return rows.map((row, i) => {
    const dayNum = startDay + i;
    const date = programDayToDate(dayNum);
    return {
      dayNumber: dayNum,
      dayName: dayNames[date.getDay()],
      dateStr: fmtShort(date),
      technicalFocus: row.technicalFocus,
      technicalStage: row.technicalStage,
      ieltsSkill: row.ieltsSkill,
      keyCommitments: row.keyCommitments,
      isToday: dayNum === todayDayNum,
      completed: dayNum < todayDayNum
    };
  });
}

export const INITIAL_CYCLES: CycleData[] = [
  {
    id: 'cycle-1',
    number: 1,
    name: 'Reset + Foundation',
    mission: 'Stabilize routine, deepen fundamentals and establish professional foundation.',
    period: {
      startDay: 1,
      endDay: 30,
      startDate: fmtLong(programDayToDate(1)),
      endDate: fmtLong(programDayToDate(30))
    },
    coreObjectives: [
      'Build consistent daily habits and a sustainable routine',
      'Master foundational knowledge in AI, development and data',
      'Complete meaningful projects and create tangible outputs',
      'Improve health, focus and overall life systems'
    ],
    majorThemes: [
      'RAG foundations & evaluation architecture',
      'AI application architecture & chunking strategies',
      'Modern Frontend: React & TypeScript fundamentals',
      'Data Science & Statistics for AI',
      'Deterministic Automation vs Agents',
      'IELTS baseline & error logging system',
      'Portfolio foundation setup'
    ],
    expectedOutputs: [
      'Documented RAG retrieval evaluation baseline with failure taxonomy',
      'Functional React + TypeScript interface for RAG querying',
      '7-day consistent IELTS error diagnostic system with 45m daily habit',
      'Stable personal anchors: Fajr/prayers, training, sleep hygiene',
      '1 clean GitHub repository with working code and architecture diagrams'
    ],
    completedOutputs: [],
    tasks: [
      {
        id: 'ct-1-1',
        title: 'Establish baseline morning routine (Fajr, Quran, 45m workout)',
        category: 'Objective',
        completed: true,
        targetDay: 3,
        notes: 'Non-negotiable foundational habit anchor'
      },
      {
        id: 'ct-1-2',
        title: 'Document RAG retrieval evaluation baseline with failure taxonomy',
        category: 'Output',
        completed: false,
        targetDay: 14,
        notes: 'Compare cosine similarity vs BM25 keyword matching'
      },
      {
        id: 'ct-1-3',
        title: 'Deep-dive into vector embeddings & chunking strategies',
        category: 'Theme',
        completed: false,
        targetDay: 18,
        notes: 'Fixed size vs semantic boundary chunking'
      },
      {
        id: 'ct-1-4',
        title: 'Set up daily 45m IELTS listening & reading error journal',
        category: 'General',
        completed: false,
        targetDay: 7,
        notes: 'Log every wrong question and root-cause reason'
      }
    ],
    exitCriteria: [
      'RAG retrieval failure error analysis completed and benchmarked',
      'IELTS weekly practice consistency ≥ 85%',
      'Portfolio repository scaffolded and first artifact committed',
      'No skipped weekly reviews for 4 consecutive weeks'
    ],
    status: 'active',
    quote: 'Discipline today creates freedom tomorrow.'
  },
  {
    id: 'cycle-2',
    number: 2,
    name: 'Build + Advanced Skills',
    mission: 'Shift from pure learning to system building: advance from fundamentals to production-grade AI applications.',
    period: {
      startDay: 31,
      endDay: 60,
      startDate: fmtLong(programDayToDate(31)),
      endDate: fmtLong(programDayToDate(60))
    },
    coreObjectives: [
      'Advance to production-grade AI system architecture',
      'Master hybrid search, reranking and evaluation datasets',
      'Achieve IELTS Writing Band 6.5+ and Speaking fluency',
      'Maintain rigorous weekly training and sleep consistency'
    ],
    majorThemes: [
      'Advanced RAG (Hybrid search, re-ranking, query expansion, self-correction)',
      'Agentic tool use & reasoning only where workflow logic is insufficient',
      'Full-stack AI system integration & vector database optimization',
      'IELTS targeted weakness drilling (Writing Task 2 & Speaking fluency)',
      'End-to-end testing and latency/cost benchmarking'
    ],
    expectedOutputs: [
      'Deployed full-stack RAG Assistant with citations and evaluation metrics',
      'Tested agentic tool-use module with deterministic fallbacks',
      'IELTS Writing Band 6.5+ mock benchmark',
      'Second integrated project with live demo and technical documentation'
    ],
    completedOutputs: [],
    tasks: [],
    exitCriteria: [
      '1 production-grade AI system deployed to staging/cloud',
      'Documented benchmark comparisons for dense vs hybrid retrieval',
      'IELTS Writing Task 2 structure mastered with error reduction by 50%'
    ],
    status: 'upcoming',
    quote: 'Technology follows the problem. Build what solves a real constraint.'
  },
  {
    id: 'cycle-3',
    number: 3,
    name: 'Execute + Deploy + Opportunities',
    mission: 'Build → Deploy → Show → Apply. Transform capabilities into tangible professional opportunities and career leverage.',
    period: {
      startDay: 61,
      endDay: 90,
      startDate: fmtLong(programDayToDate(61)),
      endDate: fmtLong(programDayToDate(90))
    },
    coreObjectives: [
      'Deploy 2 production AI case studies with verified metrics',
      'Launch high-performance personal engineering portfolio',
      'Pass official IELTS exam with target Band 7.5+',
      'Establish sustainable long-term operating rhythm'
    ],
    majorThemes: [
      'Production deployment & hardening',
      'Portfolio & GitHub polishing with compelling case studies',
      'Technical writing, deep-dive articles & public evidence',
      'IELTS full-length mock exams aiming for Band 7.5+',
      'Technical interview preparation & AI systems design mastery'
    ],
    expectedOutputs: [
      'Polished online portfolio with 2 high-impact AI case studies',
      'Final IELTS official test attempt (Target: Band 7.5+)',
      'Active network outreach & career application pipeline',
      'Comprehensive 90-Day retrospective and continuous operating model'
    ],
    completedOutputs: [],
    tasks: [],
    exitCriteria: [
      'Official IELTS Band 7.5 achieved',
      '2 deployed AI projects showcased with clear career narrative',
      'System design mastery demonstrated in real-world scenarios'
    ],
    status: 'upcoming',
    quote: 'Produce evidence. Let your work speak clearly.'
  }
];

export const INITIAL_WEEKS: WeekData[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    cycleNumber: 1,
    dateRange: weekDateRange(1, 7),
    mission: 'Establish baseline rhythm, initialize tracking systems, and set up RAG evaluation benchmark framework.',
    ragFocus: 'RAG fundamentals & vector database setup',
    rotatingFocus: {
      track: 'Web Development',
      topic: 'TypeScript strict typing & modern ES toolchain'
    },
    expectedOutput: 'Vector DB benchmark script & baseline schema',
    capacityAtGlance: {
      workIntensity: 'Medium',
      trainingSessions: 4,
      appointments: 1,
      travel: 'None',
      otherNotes: 'Program kickoff week'
    },
    outcomes: [
      { id: 'wo-1-1', title: 'Initialize vector database evaluation harness', completed: false, category: 'Technical' },
      { id: 'wo-1-2', title: 'Complete TypeScript strict typing review', completed: false, category: 'Technical' },
      { id: 'wo-1-3', title: '7/7 IELTS diagnostic sessions completed', completed: false, category: 'IELTS' },
      { id: 'wo-1-4', title: 'Establish Fajr prayer routine consistency', completed: false, category: 'Foundation' }
    ],
    dailySchedule: buildDailySchedule(1, [
      { technicalFocus: 'RAG fundamentals & architecture setup', technicalStage: 'Understand', ieltsSkill: 'Listening', keyCommitments: 'RAG setup + Listening 45m' },
      { technicalFocus: 'Vector database benchmarks & retrieval test', technicalStage: 'Practice', ieltsSkill: 'Reading', keyCommitments: 'Vector DB + Reading 45m' },
      { technicalFocus: 'TypeScript strict typing patterns', technicalStage: 'Practice', ieltsSkill: 'Writing', keyCommitments: 'TypeScript + Writing Task 1' },
      { technicalFocus: 'React component hierarchy & clean state', technicalStage: 'Implement', ieltsSkill: 'Speaking', keyCommitments: 'React UI + Speaking Part 1' },
      { technicalFocus: 'RAG evaluation baseline framework', technicalStage: 'Apply + Evidence', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'Benchmark dataset + Error Log' },
      { technicalFocus: 'Weekly integration & code commit', technicalStage: 'Validate', ieltsSkill: 'Writing', keyCommitments: 'Test suite + Task 2 Essay' },
      { technicalFocus: 'Weekly review & planning', technicalStage: 'Understand', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'Week 1 Review + Error analysis' }
    ], getTodayDayNumber()),
    review: undefined
  },
  {
    id: 'week-2',
    weekNumber: 2,
    cycleNumber: 1,
    dateRange: weekDateRange(8, 14),
    mission: 'Implement document chunking strategies, study React component lifecycle, and target IELTS Reading paraphrasing.',
    ragFocus: 'Chunking strategies (Fixed, Semantic, Recursive) & metadata filtering',
    rotatingFocus: {
      track: 'Web Development',
      topic: 'React state management & component hierarchy'
    },
    expectedOutput: 'Chunking comparison report and interactive query component',
    capacityAtGlance: {
      workIntensity: 'High',
      trainingSessions: 3,
      appointments: 2,
      travel: 'None',
      otherNotes: 'Focus on chunking benchmarks'
    },
    outcomes: [
      { id: 'wo-2-1', title: 'Test 3 chunking strategies across 50 sample technical docs', completed: false, category: 'Technical' },
      { id: 'wo-2-2', title: 'Build React document viewer component', completed: false, category: 'Technical' },
      { id: 'wo-2-3', title: 'Complete 6 IELTS sessions with error logs', completed: false, category: 'IELTS' },
      { id: 'wo-2-4', title: 'Produce RAG evaluation methodology draft', completed: false, category: 'Project' }
    ],
    dailySchedule: buildDailySchedule(8, [
      { technicalFocus: 'Document chunking strategies', technicalStage: 'Understand', ieltsSkill: 'Listening', keyCommitments: 'Chunking + Listening 45m' },
      { technicalFocus: 'Semantic vs Recursive benchmarks', technicalStage: 'Practice', ieltsSkill: 'Reading', keyCommitments: 'Chunking benchmarks + Reading 45m' },
      { technicalFocus: 'Metadata filtering in Qdrant', technicalStage: 'Practice', ieltsSkill: 'Writing', keyCommitments: 'Metadata index + Writing Task 1' },
      { technicalFocus: 'React document viewer component', technicalStage: 'Implement', ieltsSkill: 'Speaking', keyCommitments: 'React viewer + Speaking Part 2' },
      { technicalFocus: 'Chunking comparison report draft', technicalStage: 'Apply + Evidence', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'Evaluation report + Weakness drill' },
      { technicalFocus: 'Component integration & error handling', technicalStage: 'Validate', ieltsSkill: 'Writing', keyCommitments: 'Integration test + Task 2 Essay' },
      { technicalFocus: 'Week 2 review & retrospective', technicalStage: 'Understand', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'Weekly Review + Retrospective' }
    ], getTodayDayNumber()),
    review: undefined
  },
  {
    id: 'week-3',
    weekNumber: 3,
    cycleNumber: 1,
    dateRange: weekDateRange(15, 21),
    mission: 'Establish a baseline RAG evaluation process, complete the web development learning block, maintain seven IELTS sessions, and produce one project artifact.',
    ragFocus: 'Retrieval evaluation fundamentals & failure taxonomy',
    rotatingFocus: {
      track: 'Web Development',
      topic: 'React / TypeScript fundamentals & UI state machine'
    },
    expectedOutput: 'RAG retrieval evaluation baseline document + React query component',
    capacityAtGlance: {
      workIntensity: 'Medium',
      trainingSessions: 3,
      appointments: 1,
      travel: 'None',
      otherNotes: 'Stable focus window available in mornings and evenings'
    },
    outcomes: [
      { id: 'wo-3-1', title: 'Establish baseline RAG evaluation process with test dataset', completed: false, category: 'Technical' },
      { id: 'wo-3-2', title: 'Complete React / TypeScript focused learning block', completed: false, category: 'Technical' },
      { id: 'wo-3-3', title: 'Maintain 7 daily 45-min IELTS sessions', completed: false, category: 'IELTS' },
      { id: 'wo-3-4', title: 'Produce RAG Assistant milestone artifact', completed: false, category: 'Project' }
    ],
    dailySchedule: buildDailySchedule(15, [
      { technicalFocus: 'RAG evaluation (understand & failure modes)', technicalStage: 'Understand', ieltsSkill: 'Listening', keyCommitments: 'RAG + Listening 45m' },
      { technicalFocus: 'React / TypeScript UI state machines', technicalStage: 'Practice', ieltsSkill: 'Reading', keyCommitments: 'React + Reading 45m' },
      { technicalFocus: 'RAG evaluation harness (practice & queries)', technicalStage: 'Practice', ieltsSkill: 'Writing', keyCommitments: 'RAG + Writing Task 1' },
      { technicalFocus: 'React query interface implementation', technicalStage: 'Implement', ieltsSkill: 'Speaking', keyCommitments: 'React + Speaking Part 2' },
      { technicalFocus: 'RAG evaluation metrics (apply to real system)', technicalStage: 'Apply + Evidence', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'RAG Eval + Weakness Drill' },
      { technicalFocus: 'Integration / Evidence / Project Milestone', technicalStage: 'Validate', ieltsSkill: 'Writing', keyCommitments: 'Project work + Task 2 Essay' },
      { technicalFocus: 'Review + Next-week planning', technicalStage: 'Understand', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'Weekly Review + Error Diagnostic' }
    ], getTodayDayNumber()),
    review: undefined
  },
  {
    id: 'week-4',
    weekNumber: 4,
    cycleNumber: 1,
    dateRange: weekDateRange(22, 28),
    mission: 'Connect RAG backend to frontend interface, conduct first end-to-end user query trial, and initiate Data Science rotation.',
    ragFocus: 'Context precision & recall benchmarking',
    rotatingFocus: {
      track: 'Data Science',
      topic: 'Statistical significance & embedding distance metrics'
    },
    expectedOutput: 'End-to-end RAG interface demo & metric calculation script',
    capacityAtGlance: {
      workIntensity: 'Medium',
      trainingSessions: 3,
      appointments: 2,
      travel: 'None',
      otherNotes: 'Cycle 1 final week prep'
    },
    outcomes: [
      { id: 'wo-4-1', title: 'Complete first end-to-end integration demo', completed: false, category: 'Project' },
      { id: 'wo-4-2', title: 'Data Science: Cosine similarity vs Euclidean metrics notebook', completed: false, category: 'Technical' },
      { id: 'wo-4-3', title: 'Conduct full IELTS Reading & Listening diagnostic test', completed: false, category: 'IELTS' }
    ],
    dailySchedule: buildDailySchedule(22, [
      { technicalFocus: 'End-to-end RAG API connection', technicalStage: 'Understand', ieltsSkill: 'Listening', keyCommitments: 'Backend integration + Listening 45m' },
      { technicalFocus: 'Data Science cosine similarity benchmarks', technicalStage: 'Practice', ieltsSkill: 'Reading', keyCommitments: 'Math notebook + Reading 45m' },
      { technicalFocus: 'Context precision & recall evaluation', technicalStage: 'Practice', ieltsSkill: 'Writing', keyCommitments: 'Evaluation metrics + Writing Task 1' },
      { technicalFocus: 'Streaming query interface polishing', technicalStage: 'Implement', ieltsSkill: 'Speaking', keyCommitments: 'Demo frontend + Speaking Part 2' },
      { technicalFocus: 'Comprehensive query benchmark trials', technicalStage: 'Apply + Evidence', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'End-to-end trial + Error Diagnostic' },
      { technicalFocus: 'Cycle 1 integration checkpoint', technicalStage: 'Validate', ieltsSkill: 'Writing', keyCommitments: 'Documentation + Task 2 Essay' },
      { technicalFocus: 'Cycle 1 Review & Cycle 2 Planning', technicalStage: 'Understand', ieltsSkill: 'Diagnostic / Errors', keyCommitments: 'Cycle Retrospective + Target setting' }
    ], getTodayDayNumber()),
    review: undefined
  }
];

// Compute today's real program position
const _todayDayNum = getTodayDayNumber();
const _todayWeekNum = Math.ceil(_todayDayNum / 7);
const _todayCycleNum = _todayDayNum <= 30 ? 1 : _todayDayNum <= 60 ? 2 : 3;
const _todayDate = programDayToDate(_todayDayNum);

export const INITIAL_TODAY: DayData = {
  id: `day-${_todayDayNum}`,
  dayNumber: _todayDayNum,
  weekNumber: _todayWeekNum,
  cycleNumber: _todayCycleNum,
  date: fmtFull(_todayDate),
  capacityMode: 'Normal',
  mainObjective: {
    title: 'Initialize 90-Day OS — setup daily rhythm, baseline commitments, and technical environment.',
    description: 'Establish foundational habits: complete morning anchors, set up workspace and development tools, and execute first IELTS diagnostic practice.',
    estimatedMinutes: 90,
    completed: false
  },
  essentialCommitments: [
    {
      id: 'ec-1',
      area: 'Faith',
      title: 'Daily prayer anchors',
      target: 'Consistency (Fajr + 4 prayers)',
      completed: false
    },
    {
      id: 'ec-2',
      area: 'Technical',
      title: 'RAG retrieval evaluation setup',
      target: 'Setup benchmark test harness & repository',
      completed: false
    },
    {
      id: 'ec-3',
      area: 'IELTS',
      title: 'Listening diagnostic session',
      target: '45 min + capture distractors in error log',
      completed: false
    },
    {
      id: 'ec-4',
      area: 'Health',
      title: 'Training session',
      target: 'Evening workout / movement session',
      completed: false
    }
  ],
  technicalFocus: {
    stableTrack: 'RAG / AI Engineering',
    currentFocus: 'Web Development (React / TypeScript)',
    outcome: 'Establish baseline evaluation harness and project environment.',
    expectedEvidence: 'Documented initial setup & clean repository scaffolding',
    completed: false
  },
  ieltsSession: {
    skill: 'Listening',
    focus: 'Diagnostic practice & distractor recognition (Sections 1–2)',
    durationMinutes: 45,
    completed: false,
    resultScore: undefined,
    notes: 'Focus on capturing exact spellings, numbers, and speaker corrections'
  },
  personalAnchors: {
    faith: {
      prayers: [false, false, false, false, false],
      fajrOnTime: false,
      quranRead: false,
      baqarahThirds: [false, false, false],
      morningAdhkar: false,
      eveningAdhkar: false,
      reflection: ''
    },
    health: {
      trainingScheduled: true,
      trainingCompleted: false,
      trainingType: 'Upper Body Workout (45 min)',
      sleepHours: 0,
      recoveryNotes: ''
    },
    discipline: {
      screenTimeBoundaryKept: false,
      screenTimeHours: 0,
      notes: ''
    }
  },
  quickNotes: ''
};

export const INITIAL_LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'topic-rag-eval',
    track: 'RAG / AI Engineering',
    title: 'RAG Retrieval Evaluation & Metrics',
    learningObjective: 'Master retrieval metrics (Precision@k, Recall@k, MRR, NDCG) and systematic error diagnosis.',
    depthStage: 'Understand',
    progressPercent: 0,
    lastActivityDate: undefined,
    evidenceIds: [],
    relatedProjectId: 'proj-rag-assistant',
    nextStep: 'Benchmark dense vs hybrid retrieval on 100 domain test queries',
    keyConcepts: ['Precision@k', 'Recall@k', 'Context Relevance', 'Faithfulness', 'MRR']
  },
  {
    id: 'topic-rag-chunking',
    track: 'RAG / AI Engineering',
    title: 'Advanced Chunking & Context Window Optimization',
    learningObjective: 'Implement and compare semantic, recursive, and hierarchy-aware chunking techniques.',
    depthStage: 'Understand',
    progressPercent: 0,
    lastActivityDate: undefined,
    evidenceIds: [],
    relatedProjectId: 'proj-rag-assistant',
    nextStep: 'Integrate parent-document retriever to preserve broad context',
    keyConcepts: ['Recursive Character Splitter', 'Semantic Chunking', 'Parent Document Retrieval', 'Metadata tagging']
  },
  {
    id: 'topic-react-ts',
    track: 'Web Development',
    title: 'Modern React & TypeScript UI Architecture',
    learningObjective: 'Build high-performance, type-safe interactive interfaces for AI and streaming responses.',
    depthStage: 'Understand',
    progressPercent: 0,
    lastActivityDate: undefined,
    evidenceIds: [],
    relatedProjectId: 'proj-rag-assistant',
    nextStep: 'Build streaming response token animation with AbortController',
    keyConcepts: ['Custom Hooks', 'Generics in TS', 'SSE / Streaming UI', 'Optimistic UI']
  },
  {
    id: 'topic-ds-embeddings',
    track: 'Data Science',
    title: 'Vector Spaces & Embedding Distance Metrics',
    learningObjective: 'Understand mathematical foundation of cosine similarity, dot product, and dimensionality reduction.',
    depthStage: 'Understand',
    progressPercent: 0,
    lastActivityDate: undefined,
    evidenceIds: [],
    nextStep: 'Implement cosine vs dot product benchmark script in Python',
    keyConcepts: ['Cosine Similarity', 'Euclidean Distance', 'High-dimensional Geometry', 'PCA/t-SNE']
  },
  {
    id: 'topic-automation-deterministic',
    track: 'Automation',
    title: 'Deterministic Workflow Orchestration',
    learningObjective: 'Master reliable pipeline execution, retries, idempotent webhooks, and event-driven triggers.',
    depthStage: 'Understand',
    progressPercent: 0,
    lastActivityDate: undefined,
    evidenceIds: [],
    nextStep: 'Map workflow boundary before introducing agentic autonomy',
    keyConcepts: ['Idempotency', 'Retry policies', 'Dead letter queues', 'Workflow vs Agent gate']
  },
  {
    id: 'topic-ai-agents',
    track: 'AI Agents',
    title: 'Agent Tool Calling & ReAct Reasoning Loops',
    learningObjective: 'Learn when to justify dynamic tool selection versus deterministic DAG workflows.',
    depthStage: 'Understand',
    progressPercent: 0,
    lastActivityDate: undefined,
    evidenceIds: [],
    nextStep: 'Study ReAct pattern trace logs in LangGraph / LlamaIndex',
    keyConcepts: ['ReAct Pattern', 'Tool Schemas', 'Grounding', 'Loop Termination']
  }
];

export const INITIAL_LEARNING_SESSIONS: LearningSession[] = [];

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: 'proj-rag-assistant',
    title: 'RAG Assistant',
    tagline: 'A production-grade AI assistant with verifiable source citations and real-time retrieval evaluation.',
    status: 'Planned',
    problem: 'Standard LLMs hallucinate domain-specific internal policies and lack verifiable attribution back to canonical documents.',
    objective: 'Create a responsive, production-ready RAG application featuring hybrid search, chunk reranking, source citation highlighting, and automated evaluation metrics.',
    learningGoals: [
      'Master hybrid search (BM25 + Dense embeddings) and reciprocal rank fusion',
      'Implement evaluation harnesses to quantify precision@k and context recall',
      'Build a modern, type-safe React/TypeScript UI with streaming citations'
    ],
    technologies: ['FastAPI', 'Qdrant / Chroma', 'OpenAI / Anthropic APIs', 'React', 'TypeScript', 'RAGAS / TruLens'],
    techRationale: [
      { tech: 'Qdrant', rationale: 'Fast vector search with robust payload metadata filtering for granular access control' },
      { tech: 'BM25 + Dense Fusion', rationale: 'Dense retrieval misses exact acronyms; BM25 guarantees keyword recall' },
      { tech: 'React + TypeScript', rationale: 'Type-safe streaming client UI for instant user perceived latency' }
    ],
    techGate: {
      isAgentJustified: false,
      rationale: 'Deterministic DAG workflow handles 95% of retrieval and answer synthesis without the high latency and unpredictability of autonomous reasoning loops.',
      workflowComparison: 'Workflow: User Query -> Hybrid Retrieval -> Re-ranking -> Context Assembly -> Streamed LLM Synthesis. Agent reasoning is only considered if dynamic multi-hop external API calling is required.'
    },
    milestones: [
      { id: 'm-1', projectId: 'proj-rag-assistant', title: 'Vector DB & Chunking Pipeline Benchmark', targetDate: fmtLong(programDayToDate(10)), completed: false },
      { id: 'm-2', projectId: 'proj-rag-assistant', title: 'Retrieval Evaluation Baseline Report', targetDate: fmtLong(programDayToDate(21)), completed: false },
      { id: 'm-3', projectId: 'proj-rag-assistant', title: 'Interactive React Query Interface with Citations', targetDate: fmtLong(programDayToDate(30)), completed: false },
      { id: 'm-4', projectId: 'proj-rag-assistant', title: 'End-to-End Latency & Cost Optimization', targetDate: fmtLong(programDayToDate(45)), completed: false }
    ],
    nextMilestoneTitle: 'Vector DB & Chunking Pipeline Benchmark',
    targetDate: fmtLong(programDayToDate(10)),
    progressPercent: 0,
    githubUrl: 'https://github.com/example/rag-assistant-core',
    demoUrl: 'https://rag-assistant-demo.internal',
    careerStory: 'Designed and deployed an enterprise document assistant that reduced search time by 70% while providing mathematical guarantees on context precision.',
    portfolioReady: false
  },
  {
    id: 'proj-portfolio-engine',
    title: 'Portfolio & Evidence Engine',
    tagline: 'High-performance digital presence showcasing AI engineering case studies and verified artifacts.',
    status: 'Planned',
    problem: 'Resumes fail to convey technical depth, architecture decision trade-offs, and empirical benchmark results.',
    objective: 'Build a minimalist, ultra-fast portfolio site integrating live project demos, architecture deep dives, and learning proof.',
    learningGoals: ['Static site generation', 'Interactive architecture diagrams', 'SEO and performance optimization'],
    technologies: ['React', 'TypeScript', 'Tailwind / Vanilla CSS', 'Vite / Next.js'],
    techRationale: [
      { tech: 'Static Architecture', rationale: 'Sub-100ms load times and seamless markdown case study authoring' }
    ],
    techGate: {
      isAgentJustified: false,
      rationale: 'Static content delivery needs zero AI autonomy.',
      workflowComparison: 'Pure deterministic static pipeline.'
    },
    milestones: [
      { id: 'm-p1', projectId: 'proj-portfolio-engine', title: 'Information architecture & case study wireframe', targetDate: fmtLong(programDayToDate(28)), completed: false },
      { id: 'm-p2', projectId: 'proj-portfolio-engine', title: 'First RAG case study publication', targetDate: fmtLong(programDayToDate(42)), completed: false }
    ],
    nextMilestoneTitle: 'Information architecture & wireframe',
    targetDate: fmtLong(programDayToDate(28)),
    progressPercent: 0,
    careerStory: 'Demonstrates clear technical communication, system architecture documentation, and product craftsmanship.',
    portfolioReady: false
  }
];

export const INITIAL_OUTPUTS: OutputEvidence[] = [];

export const INITIAL_IELTS_SESSIONS: IELTSSessionRecord[] = [];

export const INITIAL_IELTS_ERRORS: IELTSErrorRecord[] = [];

export const INITIAL_RISKS: SystemRisk[] = [
  {
    id: 'risk-1',
    area: 'IELTS',
    severity: 'medium',
    title: 'IELTS Writing behind plan',
    description: 'Writing score (5.5) remains 2.0 bands below target (7.5). Only 1 Task 2 practice essay completed in the last 10 days.',
    suggestedAction: 'Schedule a dedicated 60-min Task 2 essay writing session on Saturday morning.'
  },
  {
    id: 'risk-2',
    area: 'Project',
    severity: 'medium',
    title: 'Project milestone at risk',
    description: `RAG Assistant "Retrieval Evaluation Baseline Report" is due ${fmtLong(programDayToDate(21))} and requires completing 50-query benchmark.`,
    suggestedAction: 'Prioritize today and Wednesday technical sessions exclusively on evaluation harness.'
  },
  {
    id: 'risk-3',
    area: 'Recovery',
    severity: 'low',
    title: 'Sleep below target this week',
    description: 'Average sleep over last 3 days was 6.7h (Target: 7.5h+). Risk of cognitive fatigue during deep learning blocks.',
    suggestedAction: 'Set digital curfew at 10:30 PM tonight; avoid screens 30m before bed.'
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Evaluating RAG Systems with Ragas & TruLens',
    type: 'Paper',
    url: 'https://arxiv.org/abs/2309.15217',
    summary: 'Foundational paper on reference-free evaluation metrics: Faithfulness, Answer Relevance, and Context Precision.',
    relatedTopic: 'topic-rag-eval',
    relatedProject: 'proj-rag-assistant',
    dateAdded: fmtLong(programDayToDate(8))
  },
  {
    id: 'res-2',
    title: 'Qdrant Vector Database Official Documentation & Filtering Guide',
    type: 'Doc',
    url: 'https://qdrant.tech/documentation/',
    summary: 'Payload indexing, HNSW graph parameters, and exact vs approximate search trade-offs.',
    relatedTopic: 'topic-rag-eval',
    relatedProject: 'proj-rag-assistant',
    dateAdded: fmtLong(programDayToDate(5))
  },
  {
    id: 'res-3',
    title: 'Cambridge IELTS 18 Academic Practice Tests',
    type: 'Book',
    url: 'https://www.cambridge.org',
    summary: 'Official authentic past papers for authentic listening audio & reading comprehension benchmarks.',
    dateAdded: fmtLong(programDayToDate(2))
  },
  {
    id: 'res-4',
    title: 'Building Reliable AI Workflows without Premature Agents',
    type: 'Article',
    url: 'https://example.com/deterministic-ai',
    summary: 'Explains why 90% of enterprise AI use-cases succeed with deterministic state graphs rather than autonomous LLM agents.',
    relatedTopic: 'topic-automation-deterministic',
    dateAdded: fmtLong(programDayToDate(4))
  }
];
