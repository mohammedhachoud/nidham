import type {
  DayData,
  CapacityMode,
  IELTSSkill,
  DepthStage,
  DaySideCompletion
} from '../types';
import {
  programDayToDate,
  fmtFull,
  fmtShort
} from './initialData';

export interface DayCurriculumItem {
  dayNumber: number;
  mainObjective: {
    title: string;
    description: string;
    estimatedMinutes: number;
  };
  primaryTrack: {
    title: string;
    badge: string;
    tasks: { id: string; label: string; detail: string; tag?: string }[];
  };
  secondaryTrack: {
    title: string;
    badge: string;
    tasks: { id: string; label: string; detail: string; tag?: string }[];
  };
  deliverable: {
    file: string;
    description: string;
  };
  technicalFocus: {
    stableTrack: string;
    currentFocus: string;
    outcome: string;
    expectedEvidence: string;
    stage: DepthStage;
  };
  ieltsSession: {
    skill: IELTSSkill;
    focus: string;
    durationMinutes: number;
    notes: string;
  };
  commitments: {
    faith: { title: string; target: string };
    technical: { title: string; target: string };
    ielts: { title: string; target: string };
    health: { title: string; target: string };
  };
  trainingType: string;
}

export const DAY_CURRICULUM_CATALOG: Record<number, DayCurriculumItem> = {
  // ── Day 1 (Tue, Sep 8, 2026) ──────────────────────────────────────────────
  1: {
    dayNumber: 1,
    mainObjective: {
      title: 'RAG Evaluation: Benchmark & Retrieval Harness',
      description: 'Scaffold 100-query synthetic evaluation dataset, implement Context Precision@k & MRR metrics, benchmark dense vs BM25 sparse retrieval, and catalog failure taxonomy.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd1-p1',
          label: 'Evaluation Baseline',
          detail: 'Construct 100 synthetic query-context test pairs with canonical chunk IDs',
          tag: 'synthetic_eval.json'
        },
        {
          id: 'd1-p2',
          label: 'Retrieval Metrics',
          detail: 'Implement Precision@k, Recall@k, and MRR scoring scripts',
          tag: 'metrics.py'
        },
        {
          id: 'd1-p3',
          label: 'Dense vs BM25 Benchmark',
          detail: 'Compare Qdrant cosine similarity against BM25 keyword matching across 256 vs 512 token chunks'
        },
        {
          id: 'd1-p4',
          label: 'Failure Taxonomy',
          detail: 'Catalog initial failure modes (out-of-domain queries, distractor hallucinations, semantic drift)'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd1-s1',
          label: 'Strict Type Contracts',
          detail: 'Define generic interfaces for query payloads, citations metadata, and streaming hooks with',
          tag: 'AbortController'
        }
      ]
    },
    deliverable: {
      file: 'benchmark_baseline.py',
      description: 'failure report. No tracking needed — execute in flow.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'Web Development (React / TypeScript)',
      outcome: 'Establish baseline evaluation harness and project environment.',
      expectedEvidence: 'Documented initial setup & clean repository scaffolding',
      stage: 'Understand'
    },
    ieltsSession: {
      skill: 'Listening',
      focus: 'Diagnostic practice & distractor recognition (Sections 1–2)',
      durationMinutes: 45,
      notes: 'Focus on capturing exact spellings, numbers, and speaker corrections'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Consistency (Fajr + 4 prayers)' },
      technical: { title: 'RAG retrieval evaluation setup', target: 'Setup benchmark test harness & repository' },
      ielts: { title: 'Listening diagnostic session', target: '45 min + capture distractors in error log' },
      health: { title: 'Training session', target: 'Evening workout / movement session' }
    },
    trainingType: 'Upper Body Workout (45 min)'
  },

  // ── Day 2 (Wed, Sep 9, 2026) ──────────────────────────────────────────────
  2: {
    dayNumber: 2,
    mainObjective: {
      title: 'Vector Database Benchmarks & Retrieval Test',
      description: 'Initialize local Qdrant collection, batch-ingest benchmark chunks with payload metadata, execute comparative top-k retrieval (Cosine vs BM25), and measure latency.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd2-p1',
          label: 'Qdrant Collection Setup',
          detail: 'Initialize local Qdrant collection with cosine distance metric and custom payload indexing schema',
          tag: 'qdrant_client'
        },
        {
          id: 'd2-p2',
          label: 'Embedding Ingestion Pipeline',
          detail: 'Chunk synthetic benchmark dataset, compute dense embeddings with sentence-transformers, and batch upsert with metadata',
          tag: 'ingest_embeddings.py'
        },
        {
          id: 'd2-p3',
          label: 'Dense vs BM25 Top-k Test',
          detail: 'Execute automated query test suite comparing cosine vector search against BM25 sparse keyword matching'
        },
        {
          id: 'd2-p4',
          label: 'Latency & Recall Profiling',
          detail: 'Measure p50/p95 query response time and Precision@5 across 256 vs 512 token chunk sizes',
          tag: 'benchmark_results.json'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd2-s1',
          label: 'Reactive Search Query Hook',
          detail: 'Build type-safe useRAGSearch custom hook with caching, abort signals, and loading state transitions',
          tag: 'useRAGSearch.ts'
        }
      ]
    },
    deliverable: {
      file: 'vector_benchmark.py',
      description: 'retrieval comparison matrix (Cosine vs BM25) and Qdrant collection schema.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'Vector Databases & Similarity Search',
      outcome: 'Validated vector store ingestion pipeline with comparative benchmark numbers.',
      expectedEvidence: 'vector_benchmark.py and benchmark_results.json committed to repo',
      stage: 'Practice'
    },
    ieltsSession: {
      skill: 'Reading',
      focus: 'Academic Reading Passage 2 — Heading matching & paraphrasing distractors',
      durationMinutes: 45,
      notes: 'Identify qualifying words (always, rarely, primarily) and trap synonyms'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Consistency: Fajr on-time + 4 prayers' },
      technical: { title: 'Vector DB benchmarks & retrieval test', target: 'Qdrant setup, BM25 comparison & latency test' },
      ielts: { title: 'Reading diagnostic session', target: '45 min Academic Reading + Paraphrase error logging' },
      health: { title: 'Training session', target: 'Cardio & core movement session (45 min)' }
    },
    trainingType: 'Cardio & Core Movement (45 min)'
  },

  // ── Day 3 (Thu, Sep 10, 2026) ─────────────────────────────────────────────
  3: {
    dayNumber: 3,
    mainObjective: {
      title: 'TypeScript Strict Typing Patterns & Query Contracts',
      description: 'Architect bulletproof generic TypeScript models for citations, source chunk metadata, streaming responses, and error boundary states.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd3-p1',
          label: 'Citation & Metadata Models',
          detail: 'Define strict interfaces for retrieved chunk attribution, confidence scores, and document provenance',
          tag: 'citations.ts'
        },
        {
          id: 'd3-p2',
          label: 'Streaming Response Schema',
          detail: 'Implement SSE token chunk payload schema with start, delta, and done message discrimination'
        },
        {
          id: 'd3-p3',
          label: 'Validation with Zod',
          detail: 'Write runtime validation schemas ensuring backend API responses strictly match UI expectations',
          tag: 'schema.zod.ts'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd3-s1',
          label: 'Generic Data Table Component',
          detail: 'Create reusable type-safe table component for rendering evaluation metrics and search citations'
        }
      ]
    },
    deliverable: {
      file: 'types/ragContracts.ts',
      description: 'Zod validation test suite for API payloads.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'TypeScript Type Safety & API Contracts',
      outcome: 'Full type coverage across ingestion, retrieval, and UI layers.',
      expectedEvidence: 'Zero any types, strict mode enabled with passing validation tests',
      stage: 'Practice'
    },
    ieltsSession: {
      skill: 'Writing',
      focus: 'Task 1 Academic — Dynamic trend line graph & percentage comparisons',
      durationMinutes: 45,
      notes: 'Focus on clear overview paragraph, grouping similarities, and precise trend vocabulary'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Fajr on-time + 5 prayers logged' },
      technical: { title: 'TypeScript strict typing patterns', target: 'Generic query contracts & Zod schemas' },
      ielts: { title: 'Writing Task 1 practice', target: '1 full graph report + 150 words timed in 20 min' },
      health: { title: 'Training session', target: 'Lower Body & mobility work (45 min)' }
    },
    trainingType: 'Lower Body & Mobility (45 min)'
  },

  // ── Day 4 (Fri, Sep 11, 2026) ─────────────────────────────────────────────
  4: {
    dayNumber: 4,
    mainObjective: {
      title: 'React Component Hierarchy & Clean State Machine',
      description: 'Build responsive RAG query interface with streaming token rendering, expandable citation pills, and optimistic UI transitions.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd4-p1',
          label: 'Streaming Token Parser',
          detail: 'Implement chunk buffer accumulator that parses Markdown tokens on the fly without layout reflow',
          tag: 'TokenStream.tsx'
        },
        {
          id: 'd4-p2',
          label: 'Interactive Citation Drawer',
          detail: 'Design expandable citation drawer displaying original chunk snippet, score, and source page link'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd4-s1',
          label: 'UI State Machine',
          detail: 'Model query state transitions (idle → querying → streaming → success | error) with exhaustive union types'
        }
      ]
    },
    deliverable: {
      file: 'RAGQueryConsole.tsx',
      description: 'working interactive streaming interface demo.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'React UI & Streaming Architecture',
      outcome: 'Functional query interface with real-time token rendering.',
      expectedEvidence: 'RAGQueryConsole component with working streaming simulation',
      stage: 'Implement'
    },
    ieltsSession: {
      skill: 'Speaking',
      focus: 'Part 1 fluency drills & Part 2 2-minute topic monologue',
      durationMinutes: 45,
      notes: 'Avoid hesitation fillers, practice idiomatic language, record audio on phone'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Jumu\'ah prayer + Fajr on-time + Baqarah' },
      technical: { title: 'React component hierarchy & clean state', target: 'RAG query console with streaming tokens' },
      ielts: { title: 'Speaking diagnostic session', target: 'Part 1 & 2 recorded monologue + error review' },
      health: { title: 'Training session', target: 'Recovery stretching & 8,000 steps' }
    },
    trainingType: 'Recovery Stretching & Walk'
  },

  // ── Day 5 (Sat, Sep 12, 2026) ─────────────────────────────────────────────
  5: {
    dayNumber: 5,
    mainObjective: {
      title: 'RAG Evaluation Baseline Framework & Failure Taxonomy',
      description: 'Execute end-to-end evaluation run against the 100-query benchmark. Calculate Context Precision@k, Faithfulness, and catalog failure modes.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd5-p1',
          label: 'Context Precision Run',
          detail: 'Run automated evaluation measuring how many top-k chunks contain the ground-truth answer',
          tag: 'eval_runner.py'
        },
        {
          id: 'd5-p2',
          label: 'Failure Taxonomy Catalog',
          detail: 'Group failed queries into categories: out-of-domain vocabulary, chunk fragmentation, semantic drift'
        },
        {
          id: 'd5-p3',
          label: 'Baseline Report Generation',
          detail: 'Generate Markdown evaluation summary with comparative tables and key findings',
          tag: 'baseline_report.md'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd5-s1',
          label: 'Evaluation Visualizer',
          detail: 'Render precision distribution and failure taxonomy breakdown charts in React'
        }
      ]
    },
    deliverable: {
      file: 'baseline_report.md',
      description: 'first formal engineering evidence report for RAG evaluation.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'RAG Evaluation & Metrics',
      outcome: 'Documented evaluation baseline with failure taxonomy.',
      expectedEvidence: 'baseline_report.md in artifacts directory with verified metrics',
      stage: 'Apply + Evidence'
    },
    ieltsSession: {
      skill: 'Diagnostic / Errors',
      focus: 'Weekly Error Log Deep-Dive — Paraphrase and spelling patterns',
      durationMinutes: 45,
      notes: 'Catalog recurring distractor mistakes across this week\'s Listening and Reading'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Consistency: Fajr on-time + 5 prayers' },
      technical: { title: 'RAG evaluation baseline framework', target: 'Run 100-query eval & publish baseline_report.md' },
      ielts: { title: 'Diagnostic & error analysis', target: 'Weekly error journal review & recurrence analysis' },
      health: { title: 'Training session', target: 'Full Body strength workout (45 min)' }
    },
    trainingType: 'Full Body Strength (45 min)'
  },

  // ── Day 6 (Sun, Sep 13, 2026) ─────────────────────────────────────────────
  6: {
    dayNumber: 6,
    mainObjective: {
      title: 'Weekly Integration & Code Commit',
      description: 'Integrate the vector retrieval backend with the React frontend query console, run end-to-end tests, and commit clean documentation to GitHub.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd6-p1',
          label: 'End-to-End Wiring',
          detail: 'Connect React interface to local API endpoints with mock and live Qdrant handlers'
        },
        {
          id: 'd6-p2',
          label: 'Test Suite Execution',
          detail: 'Verify all unit tests pass: chunking, embedding generation, scoring, and UI components'
        },
        {
          id: 'd6-p3',
          label: 'Clean GitHub Commit',
          detail: 'Stage, format, and push clean commit with comprehensive architecture README'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd6-s1',
          label: 'Responsive Polish',
          detail: 'Verify mobile responsiveness, dark mode contrast tokens, and keyboard accessibility'
        }
      ]
    },
    deliverable: {
      file: 'git commit (v0.1-week1)',
      description: 'clean repo with passing tests and architecture documentation.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'System Integration & Testing',
      outcome: 'Passing end-to-end test suite and verified code commit.',
      expectedEvidence: 'Tagged Git release v0.1-week1 with passing CI/test suite',
      stage: 'Validate'
    },
    ieltsSession: {
      skill: 'Writing',
      focus: 'Task 2 Essay — Agree/Disagree or Problem-Solution structure',
      durationMinutes: 45,
      notes: 'Timed 40-minute essay: 4 paragraphs, clear thesis, 2 distinct body arguments'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Consistency: Fajr on-time + 5 prayers' },
      technical: { title: 'Weekly integration & code commit', target: 'Pass test suite and push clean repo commit' },
      ielts: { title: 'Writing Task 2 practice', target: '250+ word essay written under 40-minute time constraint' },
      health: { title: 'Training session', target: 'Long walk / movement & recovery' }
    },
    trainingType: 'Active Recovery & Outdoor Walk'
  },

  // ── Day 7 (Mon, Sep 14, 2026) ─────────────────────────────────────────────
  7: {
    dayNumber: 7,
    mainObjective: {
      title: 'Weekly Review & Week 2 Tactical Planning',
      description: 'Reflect on Week 1 metrics, complete honest diagnostic of missed tasks, adjust capacity mode, and configure Week 2 chunking benchmarks.',
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: 'RAG / AI Engineering · 60 min Deep Work',
      badge: 'Core Track',
      tasks: [
        {
          id: 'd7-p1',
          label: 'Weekly Metrics Review',
          detail: 'Audit completed outcomes vs planned goals; calculate consistency percentage'
        },
        {
          id: 'd7-p2',
          label: 'Missed Item Root-Cause',
          detail: 'Diagnose any friction (unrealistic sizing, distraction, low energy) with tactical fix'
        },
        {
          id: 'd7-p3',
          label: 'Week 2 Preparation',
          detail: 'Preview Week 2 chunking strategy curriculum (Fixed vs Semantic vs Parent-Doc)'
        }
      ]
    },
    secondaryTrack: {
      title: 'Web Development · 30 min Rotating Track',
      badge: 'React & TS',
      tasks: [
        {
          id: 'd7-s1',
          label: 'Codebase Refactor',
          detail: 'Refactor reusable utilities and update package lockfiles'
        }
      ]
    },
    deliverable: {
      file: 'Week 1 Review Log',
      description: 'completed weekly review in system with tactical adjustments.'
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: 'Weekly Retrospective & Planning',
      outcome: 'Completed Week 1 retrospective and initialized Week 2 outcomes.',
      expectedEvidence: 'Week 1 review saved in operating system',
      stage: 'Understand'
    },
    ieltsSession: {
      skill: 'Diagnostic / Errors',
      focus: 'Weekly Mock Diagnostic — 40-question Reading or Listening section',
      durationMinutes: 45,
      notes: 'Calculate estimated band score and update weekly trendline'
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Consistency: Fajr on-time + 5 prayers' },
      technical: { title: 'Weekly review & planning', target: 'Complete Week 1 review and set Week 2 targets' },
      ielts: { title: 'Weekly diagnostic exam', target: 'Timed 40-question section + score calculation' },
      health: { title: 'Training session', target: 'Upper body strength session (45 min)' }
    },
    trainingType: 'Upper Body Strength (45 min)'
  }
};

/**
 * Return curriculum for any day number (1–90).
 * If explicitly catalogued, returns that.
 * Otherwise generates a clean, realistic curriculum item based on day number.
 */
export function getDayCurriculum(dayNumber: number): DayCurriculumItem {
  if (DAY_CURRICULUM_CATALOG[dayNumber]) {
    return DAY_CURRICULUM_CATALOG[dayNumber];
  }

  // Fallback dynamic generator for days 8–90
  const date = programDayToDate(dayNumber);
  const dateStr = fmtShort(date);
  const weekNumber = Math.ceil(dayNumber / 7);
  const dayIndexInWeek = (dayNumber - 1) % 7;
  const skills: IELTSSkill[] = ['Listening', 'Reading', 'Writing', 'Speaking', 'Diagnostic / Errors', 'Writing', 'Diagnostic / Errors'];
  const skill = skills[dayIndexInWeek];

  return {
    dayNumber,
    mainObjective: {
      title: `RAG Architecture & System Building — Day ${dayNumber}`,
      description: `Advance Week ${weekNumber} technical outcomes: implement modular RAG components, execute deep-work practice, and log daily evidence.`,
      estimatedMinutes: 90
    },
    primaryTrack: {
      title: `RAG / AI Engineering · 60 min Deep Work`,
      badge: 'Core Track',
      tasks: [
        { id: `d${dayNumber}-p1`, label: 'Deep Work Focus', detail: `Execute planned RAG engineering deliverable for ${dateStr}` },
        { id: `d${dayNumber}-p2`, label: 'Metric Benchmark', detail: `Record retrieval precision, latency, and failure observations` },
        { id: `d${dayNumber}-p3`, label: 'Code Commit', detail: `Document findings and push clean code to project repository` }
      ]
    },
    secondaryTrack: {
      title: 'Rotating Track · 30 min',
      badge: 'Engineering',
      tasks: [
        { id: `d${dayNumber}-s1`, label: 'Rotating Study', detail: 'Complete 30-minute targeted practice in web development or data science' }
      ]
    },
    deliverable: {
      file: `day_${dayNumber}_artifact`,
      description: `working code and benchmark summary for Day ${dayNumber}.`
    },
    technicalFocus: {
      stableTrack: 'RAG / AI Engineering',
      currentFocus: `Week ${weekNumber} Engineering Sprint`,
      outcome: `Verified Day ${dayNumber} milestone output`,
      expectedEvidence: `Code and evidence artifact committed for Day ${dayNumber}`,
      stage: 'Practice'
    },
    ieltsSession: {
      skill,
      focus: `Daily 45m ${skill} Practice & Error Diagnostic`,
      durationMinutes: 45,
      notes: `Log all distractor traps and unfamiliar collocations`
    },
    commitments: {
      faith: { title: 'Daily prayer anchors', target: 'Consistency: Fajr on-time + 5 prayers' },
      technical: { title: `Day ${dayNumber} Technical Session`, target: '90m deep work on RAG architecture' },
      ielts: { title: `${skill} Session`, target: `45m ${skill} practice + error logging` },
      health: { title: 'Training session', target: 'Daily movement / scheduled workout' }
    },
    trainingType: 'Daily Workout (45 min)'
  };
}

/**
 * Creates a clean, fresh DayData for a given day number with personal anchors reinitialized.
 */
export function createDayDataForDay(dayNumber: number, capacityMode: CapacityMode = 'Normal'): DayData {
  const curriculum = getDayCurriculum(dayNumber);
  const date = programDayToDate(dayNumber);
  const weekNumber = Math.ceil(dayNumber / 7);
  const cycleNumber = dayNumber <= 30 ? 1 : dayNumber <= 60 ? 2 : 3;

  return {
    id: `day-${dayNumber}`,
    dayNumber,
    weekNumber,
    cycleNumber,
    date: fmtFull(date),
    capacityMode,
    mainObjective: {
      title: curriculum.mainObjective.title,
      description: curriculum.mainObjective.description,
      estimatedMinutes: curriculum.mainObjective.estimatedMinutes,
      completed: false
    },
    essentialCommitments: [
      {
        id: `ec-${dayNumber}-1`,
        area: 'Faith',
        title: curriculum.commitments.faith.title,
        target: curriculum.commitments.faith.target,
        completed: false
      },
      {
        id: `ec-${dayNumber}-2`,
        area: 'Technical',
        title: curriculum.commitments.technical.title,
        target: curriculum.commitments.technical.target,
        completed: false
      },
      {
        id: `ec-${dayNumber}-3`,
        area: 'IELTS',
        title: curriculum.commitments.ielts.title,
        target: curriculum.commitments.ielts.target,
        completed: false
      },
      {
        id: `ec-${dayNumber}-4`,
        area: 'Health',
        title: curriculum.commitments.health.title,
        target: curriculum.commitments.health.target,
        completed: false
      }
    ],
    technicalFocus: {
      stableTrack: curriculum.technicalFocus.stableTrack,
      currentFocus: curriculum.technicalFocus.currentFocus,
      outcome: curriculum.technicalFocus.outcome,
      expectedEvidence: curriculum.technicalFocus.expectedEvidence,
      completed: false
    },
    ieltsSession: {
      skill: curriculum.ieltsSession.skill,
      focus: curriculum.ieltsSession.focus,
      durationMinutes: curriculum.ieltsSession.durationMinutes,
      completed: false,
      notes: curriculum.ieltsSession.notes
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
        trainingType: curriculum.trainingType,
        sleepHours: 0,
        recoveryNotes: ''
      },
      discipline: {
        screenTimeBoundaryKept: false,
        screenTimeHours: 0,
        notes: ''
      }
    },
    technicalSubtasks: [
      ...curriculum.primaryTrack.tasks.map(t => ({ id: t.id, text: `${t.label}: ${t.detail}`, completed: false })),
      ...curriculum.secondaryTrack.tasks.map(t => ({ id: t.id, text: `${t.label}: ${t.detail}`, completed: false }))
    ],
    quickNotes: ''
  };
}

/**
 * Calculates the completion percentages across all operational dimensions ("sides") for a day.
 */
export function calculateDaySideCompletion(day: DayData): DaySideCompletion {
  if (!day) {
    return {
      technicalPercent: 0,
      ieltsPercent: 0,
      faithPercent: 0,
      healthPercent: 0,
      disciplinePercent: 0,
      commitmentsPercent: 0,
      overallPercent: 0,
      completedCount: 0,
      totalCount: 0
    };
  }

  // 1. Technical Side (Main objective, technical focus, technical commitment, subtasks if any)
  const techItems: boolean[] = [
    Boolean(day.mainObjective?.completed),
    Boolean(day.technicalFocus?.completed),
    Boolean(day.essentialCommitments?.find(c => c.area === 'Technical')?.completed)
  ];
  if (day.technicalSubtasks && day.technicalSubtasks.length > 0) {
    day.technicalSubtasks.forEach(st => techItems.push(Boolean(st.completed)));
  }
  const techDone = techItems.filter(Boolean).length;
  const technicalPercent = Math.round((techDone / techItems.length) * 100);

  // 2. IELTS Side (IELTS session, IELTS commitment)
  const ieltsItems: boolean[] = [
    Boolean(day.ieltsSession?.completed),
    Boolean(day.essentialCommitments?.find(c => c.area === 'IELTS')?.completed)
  ];
  const ieltsDone = ieltsItems.filter(Boolean).length;
  const ieltsPercent = Math.round((ieltsDone / ieltsItems.length) * 100);

  // 3. Faith Side (5 prayers, Fajr on-time, Baqarah, Morning Adhkar, Evening Adhkar, Faith commitment)
  const prayers = day.personalAnchors?.faith?.prayers || [false, false, false, false, false];
  const baqarah = day.personalAnchors?.faith?.baqarahThirds || [false, false, false];
  const faithItems: boolean[] = [
    ...prayers,
    Boolean(day.personalAnchors?.faith?.fajrOnTime),
    Boolean(day.personalAnchors?.faith?.morningAdhkar),
    Boolean(day.personalAnchors?.faith?.eveningAdhkar),
    baqarah.some(Boolean),
    Boolean(day.essentialCommitments?.find(c => c.area === 'Faith')?.completed)
  ];
  const faithDone = faithItems.filter(Boolean).length;
  const faithPercent = Math.round((faithDone / faithItems.length) * 100);

  // 4. Health Side (Training, Health commitment)
  const healthItems: boolean[] = [
    Boolean(day.personalAnchors?.health?.trainingCompleted),
    Boolean(day.essentialCommitments?.find(c => c.area === 'Health')?.completed)
  ];
  const healthDone = healthItems.filter(Boolean).length;
  const healthPercent = Math.round((healthDone / healthItems.length) * 100);

  // 5. Discipline Side (Screen time boundary)
  const disciplinePercent = day.personalAnchors?.discipline?.screenTimeBoundaryKept ? 100 : 0;

  // 6. Commitments Side
  const commitments = day.essentialCommitments || [];
  const commitmentsDone = commitments.filter(c => c.completed).length;
  const commitmentsPercent = commitments.length > 0 ? Math.round((commitmentsDone / commitments.length) * 100) : 0;

  // Overall Score (Weighted average across sides)
  // Technical (30%), Faith (25%), IELTS (20%), Health (15%), Discipline (10%)
  const overallPercent = Math.round(
    technicalPercent * 0.30 +
    faithPercent * 0.25 +
    ieltsPercent * 0.20 +
    healthPercent * 0.15 +
    disciplinePercent * 0.10
  );

  const totalItems = techItems.length + ieltsItems.length + faithItems.length + healthItems.length + 1;
  const completedTotal = techDone + ieltsDone + faithDone + healthDone + (day.personalAnchors?.discipline?.screenTimeBoundaryKept ? 1 : 0);

  return {
    technicalPercent,
    ieltsPercent,
    faithPercent,
    healthPercent,
    disciplinePercent,
    commitmentsPercent,
    overallPercent,
    completedCount: completedTotal,
    totalCount: totalItems
  };
}
