import type {
  CycleData,
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

export const INITIAL_CYCLES: CycleData[] = [
  {
    id: 'cycle-1',
    number: 1,
    name: 'Reset + Foundation',
    mission: 'Stabilize routine, deepen fundamentals and establish professional foundation.',
    period: {
      startDay: 1,
      endDay: 30,
      startDate: 'Jan 1, 2024',
      endDate: 'Jan 30, 2024'
    },
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
      startDate: 'Jan 31, 2024',
      endDate: 'Mar 1, 2024'
    },
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
      startDate: 'Mar 2, 2024',
      endDate: 'Mar 31, 2024'
    },
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
    dateRange: 'Jan 1 – Jan 7, 2024',
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
      otherNotes: 'Holiday recovery week'
    },
    outcomes: [
      { id: 'wo-1-1', title: 'Initialize vector database evaluation harness', completed: true, category: 'Technical' },
      { id: 'wo-1-2', title: 'Complete TypeScript strict typing review', completed: true, category: 'Technical' },
      { id: 'wo-1-3', title: '7/7 IELTS diagnostic sessions completed', completed: true, category: 'IELTS' },
      { id: 'wo-1-4', title: 'Establish Fajr prayer routine consistency', completed: true, category: 'Foundation' }
    ],
    dailySchedule: [],
    review: {
      id: 'rev-w1',
      weekNumber: 1,
      plannedSummary: 'Establish baseline routine and evaluation harness',
      executedSummary: 'Successfully completed baseline harness, 7 IELTS sessions logged, routine stabilized.',
      missedDiagnoses: [],
      tacticalAdjustments: ['Narrow down technical scope per session', 'Lock in 45m IELTS slot immediately after work'],
      completedAt: 'Jan 7, 2024'
    }
  },
  {
    id: 'week-2',
    weekNumber: 2,
    cycleNumber: 1,
    dateRange: 'Jan 8 – Jan 14, 2024',
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
      otherNotes: 'Heavy professional workload mid-week'
    },
    outcomes: [
      { id: 'wo-2-1', title: 'Test 3 chunking strategies across 50 sample technical docs', completed: true, category: 'Technical' },
      { id: 'wo-2-2', title: 'Build React document viewer component', completed: true, category: 'Technical' },
      { id: 'wo-2-3', title: 'Complete 6 IELTS sessions with error logs', completed: true, category: 'IELTS' },
      { id: 'wo-2-4', title: 'Produce RAG evaluation methodology draft', completed: true, category: 'Project' }
    ],
    dailySchedule: [],
    review: {
      id: 'rev-w2',
      weekNumber: 2,
      plannedSummary: 'Chunking benchmarks and React viewer component',
      executedSummary: 'Completed chunking comparison, identified significant variance in semantic chunking latency.',
      missedDiagnoses: [
        {
          item: 'Sunday IELTS mock test',
          cause: 'low_energy',
          note: 'Heavy work sprint on Thursday/Friday drained weekend energy'
        }
      ],
      tacticalAdjustments: ['Shift intensive writing practice to Saturday morning instead of Sunday afternoon'],
      completedAt: 'Jan 14, 2024'
    }
  },
  {
    id: 'week-3',
    weekNumber: 3,
    cycleNumber: 1,
    dateRange: 'Jan 15 – Jan 21, 2024',
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
    dailySchedule: [
      {
        dayNumber: 15,
        dayName: 'Mon',
        dateStr: 'Jan 15',
        technicalFocus: 'RAG evaluation (understand & failure modes)',
        technicalStage: 'Understand',
        ieltsSkill: 'Listening',
        keyCommitments: 'RAG + Listening 45m',
        isToday: true,
        completed: false
      },
      {
        dayNumber: 16,
        dayName: 'Tue',
        dateStr: 'Jan 16',
        technicalFocus: 'React / TypeScript UI state machines',
        technicalStage: 'Practice',
        ieltsSkill: 'Reading',
        keyCommitments: 'React + Reading 45m',
        isToday: false,
        completed: false
      },
      {
        dayNumber: 17,
        dayName: 'Wed',
        dateStr: 'Jan 17',
        technicalFocus: 'RAG evaluation harness (practice & queries)',
        technicalStage: 'Practice',
        ieltsSkill: 'Writing',
        keyCommitments: 'RAG + Writing Task 1',
        isToday: false,
        completed: false
      },
      {
        dayNumber: 18,
        dayName: 'Thu',
        dateStr: 'Jan 18',
        technicalFocus: 'React query interface implementation',
        technicalStage: 'Implement',
        ieltsSkill: 'Speaking',
        keyCommitments: 'React + Speaking Part 2',
        isToday: false,
        completed: false
      },
      {
        dayNumber: 19,
        dayName: 'Fri',
        dateStr: 'Jan 19',
        technicalFocus: 'RAG evaluation metrics (apply to real system)',
        technicalStage: 'Apply + Evidence',
        ieltsSkill: 'Diagnostic / Errors',
        keyCommitments: 'RAG Eval + Weakness Drill',
        isToday: false,
        completed: false
      },
      {
        dayNumber: 20,
        dayName: 'Sat',
        dateStr: 'Jan 20',
        technicalFocus: 'Integration / Evidence / Project Milestone',
        technicalStage: 'Validate',
        ieltsSkill: 'Writing',
        keyCommitments: 'Project work + Task 2 Essay',
        isToday: false,
        completed: false
      },
      {
        dayNumber: 21,
        dayName: 'Sun',
        dateStr: 'Jan 21',
        technicalFocus: 'Review + Next-week planning',
        technicalStage: 'Understand',
        ieltsSkill: 'Diagnostic / Errors',
        keyCommitments: 'Weekly Review + Error Diagnostic',
        isToday: false,
        completed: false
      }
    ]
  },
  {
    id: 'week-4',
    weekNumber: 4,
    cycleNumber: 1,
    dateRange: 'Jan 22 – Jan 28, 2024',
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
    dailySchedule: []
  }
];

export const INITIAL_TODAY: DayData = {
  id: 'day-18',
  dayNumber: 18,
  weekNumber: 3,
  cycleNumber: 1,
  date: 'Mon, Jan 15, 2024',
  capacityMode: 'Normal',
  mainObjective: {
    title: 'RAG Evaluation — analyze retrieval failures across representative queries and document recurring error patterns.',
    description: 'Evaluate top-10 failure modes across dense retrieval vs hybrid retrieval on the benchmark dataset. Document precision@k and failure taxonomy.',
    estimatedMinutes: 90,
    completed: false
  },
  essentialCommitments: [
    {
      id: 'ec-1',
      area: 'Faith',
      title: 'Daily prayer anchors',
      target: 'Consistency (Fajr + 4 prayers)',
      completed: true,
      notes: 'Fajr in congregation, on track'
    },
    {
      id: 'ec-2',
      area: 'Technical',
      title: 'RAG retrieval evaluation',
      target: 'Document findings in evaluation report',
      completed: false
    },
    {
      id: 'ec-3',
      area: 'IELTS',
      title: 'Listening practice session',
      target: '45 min + capture distractors in error log',
      completed: false
    },
    {
      id: 'ec-4',
      area: 'Health',
      title: 'Training session',
      target: 'Evening upper-body workout',
      completed: false
    }
  ],
  technicalFocus: {
    stableTrack: 'RAG / AI Engineering',
    currentFocus: 'Web Development (React / TypeScript)',
    outcome: 'Identify top 3 retrieval failure categories on technical domain queries.',
    expectedEvidence: 'Documented evaluation report & JSON error taxonomy',
    completed: false
  },
  ieltsSession: {
    skill: 'Listening',
    focus: 'Distractor recognition in Sections 3–4 (Academic discussions)',
    durationMinutes: 45,
    completed: false,
    resultScore: undefined,
    notes: 'Focus on recognizing when speaker corrects previous statement or rejects options'
  },
  personalAnchors: {
    faith: {
      prayers: [true, true, true, false, false],
      fajrOnTime: true,
      quranRead: true,
      reflection: 'Grateful for morning clarity and energy.'
    },
    health: {
      trainingScheduled: true,
      trainingCompleted: false,
      trainingType: 'Upper Body Hypertrophy (45 min)',
      sleepHours: 7.2,
      recoveryNotes: 'Rested and focused'
    },
    discipline: {
      screenTimeBoundaryKept: true,
      screenTimeHours: 1.2,
      notes: 'No morning social media checking'
    }
  },
  quickNotes: 'Key insight from morning standup: hybrid search handles domain-specific acronyms significantly better than vanilla embeddings.'
};

export const INITIAL_LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'topic-rag-eval',
    track: 'RAG / AI Engineering',
    title: 'RAG Retrieval Evaluation & Metrics',
    learningObjective: 'Master retrieval metrics (Precision@k, Recall@k, MRR, NDCG) and systematic error diagnosis.',
    depthStage: 'Implement',
    progressPercent: 65,
    lastActivityDate: 'Jan 15, 2024',
    evidenceIds: ['ev-rag-report-1'],
    relatedProjectId: 'proj-rag-assistant',
    nextStep: 'Benchmark dense vs hybrid retrieval on 100 domain test queries',
    keyConcepts: ['Precision@k', 'Recall@k', 'Context Relevance', 'Faithfulness', 'MRR']
  },
  {
    id: 'topic-rag-chunking',
    track: 'RAG / AI Engineering',
    title: 'Advanced Chunking & Context Window Optimization',
    learningObjective: 'Implement and compare semantic, recursive, and hierarchy-aware chunking techniques.',
    depthStage: 'Validate',
    progressPercent: 80,
    lastActivityDate: 'Jan 13, 2024',
    evidenceIds: ['ev-chunk-benchmark'],
    relatedProjectId: 'proj-rag-assistant',
    nextStep: 'Integrate parent-document retriever to preserve broad context',
    keyConcepts: ['Recursive Character Splitter', 'Semantic Chunking', 'Parent Document Retrieval', 'Metadata tagging']
  },
  {
    id: 'topic-react-ts',
    track: 'Web Development',
    title: 'Modern React & TypeScript UI Architecture',
    learningObjective: 'Build high-performance, type-safe interactive interfaces for AI and streaming responses.',
    depthStage: 'Practice',
    progressPercent: 45,
    lastActivityDate: 'Jan 14, 2024',
    evidenceIds: ['ev-feat-ui-1'],
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
    progressPercent: 30,
    lastActivityDate: 'Jan 10, 2024',
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
    progressPercent: 25,
    lastActivityDate: 'Jan 8, 2024',
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
    progressPercent: 20,
    lastActivityDate: 'Jan 5, 2024',
    evidenceIds: [],
    nextStep: 'Study ReAct pattern trace logs in LangGraph / LlamaIndex',
    keyConcepts: ['ReAct Pattern', 'Tool Schemas', 'Grounding', 'Loop Termination']
  }
];

export const INITIAL_LEARNING_SESSIONS: LearningSession[] = [
  {
    id: 'ls-1',
    date: 'Jan 15, 2024',
    topicId: 'topic-rag-eval',
    topicTitle: 'RAG Retrieval Evaluation',
    track: 'RAG / AI Engineering',
    type: 'Implement',
    durationMinutes: 90,
    purpose: 'Analyze retrieval failure modes on 50 representative user queries',
    result: 'Documented 3 dominant failure causes: vocabulary mismatch, overly broad queries, and chunk truncation.',
    evidenceId: 'ev-rag-report-1',
    nextStep: 'Implement hybrid BM25 + dense retrieval index'
  },
  {
    id: 'ls-2',
    date: 'Jan 14, 2024',
    topicId: 'topic-react-ts',
    topicTitle: 'React State Management for Query Pipelines',
    track: 'Web Development',
    type: 'Practice',
    durationMinutes: 60,
    purpose: 'Build state machine for query status: idle -> retrieving -> generating -> complete/error',
    result: 'Implemented useQueryPipeline custom hook with rigorous TypeScript discriminated unions.',
    evidenceId: 'ev-feat-ui-1',
    nextStep: 'Connect to real backend SSE endpoint'
  },
  {
    id: 'ls-3',
    date: 'Jan 13, 2024',
    topicId: 'topic-rag-chunking',
    topicTitle: 'RAG Chunking Strategies Comparison',
    track: 'RAG / AI Engineering',
    type: 'Understand',
    durationMinutes: 45,
    purpose: 'Compare chunk size 256 vs 512 vs 1024 token boundaries on technical documentation',
    result: 'Found 512 tokens with 50-token overlap gives optimal precision for code-heavy documents.',
    evidenceId: 'ev-chunk-benchmark',
    nextStep: 'Evaluate hierarchical parent retrieval'
  },
  {
    id: 'ls-4',
    date: 'Jan 12, 2024',
    topicId: 'topic-react-ts',
    topicTitle: 'TypeScript Generics & Discriminated Unions',
    track: 'Web Development',
    type: 'Practice',
    durationMinutes: 60,
    purpose: 'Clean up API response types to eliminate `any` throughout client code',
    result: 'Zero `any` types in project core. Defined strict payload contracts.',
    nextStep: 'Implement mock streaming API'
  },
  {
    id: 'ls-5',
    date: 'Jan 11, 2024',
    topicId: 'topic-rag-eval',
    topicTitle: 'Retrieval Metrics Math & Calculations',
    track: 'RAG / AI Engineering',
    type: 'Understand',
    durationMinutes: 45,
    purpose: 'Study mathematical formulas for MRR and NDCG to avoid black-box library reliance',
    result: 'Hand-computed MRR on 5 example rankings to verify intuition.',
    nextStep: 'Write Python evaluation script'
  }
];

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: 'proj-rag-assistant',
    title: 'RAG Assistant',
    tagline: 'A production-grade AI assistant with verifiable source citations and real-time retrieval evaluation.',
    status: 'In Progress',
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
      { id: 'm-1', projectId: 'proj-rag-assistant', title: 'Vector DB & Chunking Pipeline Benchmark', targetDate: 'Jan 10, 2024', completed: true, completedDate: 'Jan 10, 2024', outputEvidence: 'Chunking comparison report' },
      { id: 'm-2', projectId: 'proj-rag-assistant', title: 'Retrieval Evaluation Baseline Report', targetDate: 'Jan 21, 2024', completed: false },
      { id: 'm-3', projectId: 'proj-rag-assistant', title: 'Interactive React Query Interface with Citations', targetDate: 'Jan 30, 2024', completed: false },
      { id: 'm-4', projectId: 'proj-rag-assistant', title: 'End-to-End Latency & Cost Optimization', targetDate: 'Feb 15, 2024', completed: false }
    ],
    nextMilestoneTitle: 'Retrieval evaluation report',
    targetDate: 'Jan 21, 2024',
    progressPercent: 60,
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
      { id: 'm-p1', projectId: 'proj-portfolio-engine', title: 'Information architecture & case study wireframe', targetDate: 'Jan 28, 2024', completed: false },
      { id: 'm-p2', projectId: 'proj-portfolio-engine', title: 'First RAG case study publication', targetDate: 'Feb 10, 2024', completed: false }
    ],
    nextMilestoneTitle: 'Information architecture & wireframe',
    targetDate: 'Jan 28, 2024',
    progressPercent: 15,
    careerStory: 'Demonstrates clear technical communication, system architecture documentation, and product craftsmanship.',
    portfolioReady: false
  }
];

export const INITIAL_OUTPUTS: OutputEvidence[] = [
  {
    id: 'ev-rag-report-1',
    title: 'RAG evaluation report',
    type: 'Evaluation Report',
    date: 'Jan 14, 2024',
    description: 'Documented retrieval precision@5 across 50 technical query samples comparing Dense vs Hybrid indexing.',
    tags: ['RAG', 'Evaluation', 'Metrics', 'Baseline'],
    relatedTopicId: 'topic-rag-eval',
    relatedProjectId: 'proj-rag-assistant',
    snippet: 'Precision@5 improved from 0.68 (dense-only) to 0.89 (hybrid BM25+dense) on queries containing exact technical identifiers.'
  },
  {
    id: 'ev-feat-ui-1',
    title: 'Feature implementation: Query state machine',
    type: 'Feature Implementation',
    date: 'Jan 12, 2024',
    description: 'React TypeScript hook managing asynchronous retrieval, streaming chunk decoding, and citation highlights.',
    tags: ['React', 'TypeScript', 'UI', 'Frontend'],
    relatedTopicId: 'topic-react-ts',
    relatedProjectId: 'proj-rag-assistant',
    snippet: 'useQueryPipeline hook with strict discriminated unions handling idle, loading, streaming, success, and error states.'
  },
  {
    id: 'ev-ielts-mock-1',
    title: 'IELTS practice session: Listening Section 3-4',
    type: 'IELTS Mock Result',
    date: 'Jan 12, 2024',
    description: 'Completed Cambridge 18 Test 2 Listening. Score: 31/40 (Band 7.0). Logged 3 distractor identification errors.',
    tags: ['IELTS', 'Listening', 'Band 7.0', 'Cambridge 18'],
    snippet: 'Identified recurrence in missing answers when speakers self-correct midway through a sentence.'
  },
  {
    id: 'ev-chunk-benchmark',
    title: 'Chunking benchmark & architecture diagram',
    type: 'Architecture Diagram',
    date: 'Jan 10, 2024',
    description: 'Architecture diagram comparing Fixed vs Recursive vs Semantic chunking strategies with memory profile.',
    tags: ['Architecture', 'Chunking', 'Vector DB'],
    relatedTopicId: 'topic-rag-chunking',
    relatedProjectId: 'proj-rag-assistant'
  },
  {
    id: 'ev-gh-update',
    title: 'GitHub update: Repository scaffolding & CI',
    type: 'GitHub Update',
    date: 'Jan 10, 2024',
    description: 'Scaffolded clean modular monorepo with automated type checks and linting pipelines.',
    tags: ['GitHub', 'DevOps', 'TypeScript'],
    url: 'https://github.com/example/rag-assistant-core'
  }
];

export const INITIAL_IELTS_SESSIONS: IELTSSessionRecord[] = [
  {
    id: 'ielts-s-1',
    date: 'Jan 15, 2024',
    skill: 'Listening',
    focus: 'Distractors (Sections 3–4)',
    practiceType: 'Cambridge 18 Academic Test 3',
    durationMinutes: 45,
    resultScore: '6.5',
    errorsIdentified: ['Missed speaker self-correction in question 24', 'Misheard plural ending in question 31'],
    nextAction: 'Re-listen to audio transcript focusing on transition words ("However", "Actually", "Instead")'
  },
  {
    id: 'ielts-s-2',
    date: 'Jan 14, 2024',
    skill: 'Reading',
    focus: 'Matching headings & True/False/Not Given',
    practiceType: 'Cambridge 18 Academic Test 2 Passage 2',
    durationMinutes: 45,
    resultScore: '7.0',
    errorsIdentified: ['Confused False with Not Given on question 18 (information was not mentioned at all)'],
    nextAction: 'Underline direct textual evidence for every TRUE claim before committing answer'
  },
  {
    id: 'ielts-s-3',
    date: 'Jan 13, 2024',
    skill: 'Writing',
    focus: 'Task 1 (Graph over time - Trend description)',
    practiceType: 'Academic Line Graph comparison',
    durationMinutes: 45,
    resultScore: '5.5',
    errorsIdentified: ['Lacked clear overview paragraph', 'Repetitive vocabulary for increases/decreases'],
    nextAction: 'Memorize 5 distinct overview phrasing templates and dynamic vocabulary alternatives'
  },
  {
    id: 'ielts-s-4',
    date: 'Jan 12, 2024',
    skill: 'Speaking',
    focus: 'Part 2 (Describe a technology problem you solved)',
    practiceType: '2-minute recorded monologue + self-audit',
    durationMinutes: 45,
    resultScore: '6.0',
    errorsIdentified: ['3-second pause at 1:15 minute mark', 'Overused "like" and "you know" filler words'],
    nextAction: 'Use bullet-point outline structure on paper during the 1-minute prep time'
  },
  {
    id: 'ielts-s-5',
    date: 'Jan 10, 2024',
    skill: 'Diagnostic / Errors',
    focus: 'Comprehensive error review & vocabulary drill',
    practiceType: 'Error system audit',
    durationMinutes: 45,
    resultScore: 'Reviewed 14 cards',
    errorsIdentified: ['Spelling errors in double consonants ("accommodation", "embarrassment")'],
    nextAction: 'Maintain daily 5-minute orthography flashcards'
  }
];

export const INITIAL_IELTS_ERRORS: IELTSErrorRecord[] = [
  {
    id: 'err-1',
    skill: 'Listening',
    errorType: 'Distractor identification',
    example: 'Speaker initially says "We will meet at 4:30 PM", then immediately corrects to "Wait, the room is booked until 5:00 PM so let\'s say 5:15 PM". Logged 4:30 PM instead of 5:15 PM.',
    reason: 'Writing down first heard time without waiting for full sentence completion.',
    correction: 'Wait 2 seconds after hearing a number to ensure speaker does not contradict or qualify it.',
    recurrenceCount: 8,
    nextDrill: 'Section 3 dialogues with explicit speaker negotiations',
    lastEncountered: 'Jan 15, 2024'
  },
  {
    id: 'err-2',
    skill: 'Reading',
    errorType: 'Paraphrasing & Synonym Matching',
    example: 'Missed match between passage "precipitous decline" and question "rapid decrease".',
    reason: 'Scanning strictly for identical keywords rather than abstract semantic equivalents.',
    correction: 'Identify the question idea (rate + direction) before scanning the passage.',
    recurrenceCount: 6,
    nextDrill: 'High-level academic synonym extraction exercises',
    lastEncountered: 'Jan 14, 2024'
  },
  {
    id: 'err-3',
    skill: 'Writing',
    errorType: 'Coherence & cohesion (Missing Overview)',
    example: 'Wrote detailed body paragraphs with individual data points but omitted a dedicated 2-sentence summary overview.',
    reason: 'Rushing to describe numbers without stepping back for macro trends.',
    correction: 'Write the Overview paragraph immediately after the introduction before any body numbers.',
    recurrenceCount: 5,
    nextDrill: 'Write 10 consecutive Task 1 Overviews without full essays',
    lastEncountered: 'Jan 13, 2024'
  },
  {
    id: 'err-4',
    skill: 'Speaking',
    errorType: 'Fluency & hesitations',
    example: 'Hesitating for 3+ seconds when searching for an advanced word instead of using a natural paraphrase.',
    reason: 'Perfectionism causing mid-sentence vocal freeze.',
    correction: 'Use conversational bridging phrases: "What I mean by that is...", "In other words..."',
    recurrenceCount: 4,
    nextDrill: 'Record 2-minute uninterrupted speech with strict non-stop timer',
    lastEncountered: 'Jan 12, 2024'
  }
];

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
    description: 'RAG Assistant "Retrieval Evaluation Baseline Report" is due Jan 21 (6 days remaining) and requires completing 50-query benchmark.',
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
    dateAdded: 'Jan 8, 2024'
  },
  {
    id: 'res-2',
    title: 'Qdrant Vector Database Official Documentation & Filtering Guide',
    type: 'Doc',
    url: 'https://qdrant.tech/documentation/',
    summary: 'Payload indexing, HNSW graph parameters, and exact vs approximate search trade-offs.',
    relatedTopic: 'topic-rag-eval',
    relatedProject: 'proj-rag-assistant',
    dateAdded: 'Jan 5, 2024'
  },
  {
    id: 'res-3',
    title: 'Cambridge IELTS 18 Academic Practice Tests',
    type: 'Book',
    url: 'https://www.cambridge.org',
    summary: 'Official authentic past papers for authentic listening audio & reading comprehension benchmarks.',
    dateAdded: 'Jan 2, 2024'
  },
  {
    id: 'res-4',
    title: 'Building Reliable AI Workflows without Premature Agents',
    type: 'Article',
    url: 'https://example.com/deterministic-ai',
    summary: 'Explains why 90% of enterprise AI use-cases succeed with deterministic state graphs rather than autonomous LLM agents.',
    relatedTopic: 'topic-automation-deterministic',
    dateAdded: 'Jan 4, 2024'
  }
];
