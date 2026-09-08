// 90-Day Personal Operating System Types

export type NavigationTab = 
  | 'command-center'
  | 'today'
  | 'week'
  | 'cycle'
  | 'learning-projects'
  | 'ielts'
  | 'review'
  | 'resources'
  | 'archive'
  | 'settings';

export type CapacityMode = 'Normal' | 'Reduced' | 'Recovery';

export type DepthStage = 'Understand' | 'Practice' | 'Implement' | 'Validate' | 'Apply + Evidence';

export type TechnicalTrack = 
  | 'RAG / AI Engineering' 
  | 'Web Development' 
  | 'Data Science' 
  | 'Automation' 
  | 'AI Agents';

export type IELTSSkill = 'Reading' | 'Listening' | 'Writing' | 'Speaking' | 'Diagnostic / Errors';

export interface EssentialCommitment {
  id: string;
  area: 'Faith' | 'Technical' | 'IELTS' | 'Health' | 'Discipline';
  title: string;
  target: string;
  completed: boolean;
  notes?: string;
}

export interface DayData {
  id: string;
  dayNumber: number; // 1 to 90
  weekNumber: number; // 1 to 13
  cycleNumber: number; // 1 to 3
  date: string; // e.g. "Mon, Jan 15, 2024"
  capacityMode: CapacityMode;
  mainObjective: {
    title: string;
    description: string;
    estimatedMinutes: number;
    completed: boolean;
    completedAt?: string;
  };
  essentialCommitments: EssentialCommitment[];
  technicalFocus: {
    stableTrack: string;
    currentFocus: string;
    outcome: string;
    expectedEvidence: string;
    completed: boolean;
    evidenceId?: string;
  };
  ieltsSession: {
    skill: IELTSSkill;
    focus: string;
    durationMinutes: number;
    completed: boolean;
    resultScore?: number | string;
    errorsLogged?: string[];
    notes?: string;
  };
  personalAnchors: {
    faith: {
      prayers: [boolean, boolean, boolean, boolean, boolean]; // Fajr, Dhuhr, Asr, Maghrib, Isha
      fajrOnTime: boolean;
      quranRead: boolean;
      baqarahThirds?: [boolean, boolean, boolean]; // [Part 1 (Ayat 1-141), Part 2 (Ayat 142-252), Part 3 (Ayat 253-286)]
      morningAdhkar?: boolean;
      eveningAdhkar?: boolean;
      reflection?: string;
    };
    health: {
      trainingScheduled: boolean;
      trainingCompleted: boolean;
      trainingType?: string;
      sleepHours: number;
      recoveryNotes?: string;
    };
    discipline: {
      screenTimeBoundaryKept: boolean;
      screenTimeHours?: number;
      notes?: string;
    };
  };
  quickNotes: string;
  dailyClose?: {
    completedMeaningful: string;
    interfered: string;
    tomorrowPriority: string;
    evidenceProduced?: string;
    completedAt: string;
  };
}

export interface FocusTimerState {
  isActive: boolean;
  isPaused: boolean;
  secondsLeft: number;
  totalSeconds: number;
  label: string;
  track: string;
  soundEnabled: boolean;
  startedAt?: string;
}

export interface WeeklyOutcome {
  id: string;
  title: string;
  completed: boolean;
  evidenceSnippet?: string;
  category: 'Technical' | 'IELTS' | 'Project' | 'Foundation';
}

export interface WeekDaySchedule {
  dayNumber: number;
  dayName: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dateStr: string;
  technicalFocus: string;
  technicalStage: DepthStage;
  ieltsSkill: IELTSSkill;
  keyCommitments: string;
  isToday?: boolean;
  completed?: boolean;
}

export interface WeeklyReview {
  id: string;
  weekNumber: number;
  plannedSummary: string;
  executedSummary: string;
  missedDiagnoses: {
    item: string;
    cause: 'unrealistic_planning' | 'insufficient_knowledge' | 'distraction' | 'low_energy' | 'unexpected_event' | 'poor_prioritization' | 'task_too_large';
    note: string;
  }[];
  tacticalAdjustments: string[]; // max 2
  completedAt: string;
}

export interface WeekData {
  id: string;
  weekNumber: number;
  cycleNumber: number;
  dateRange: string;
  mission: string;
  ragFocus: string;
  rotatingFocus: {
    track: TechnicalTrack;
    topic: string;
  };
  expectedOutput: string;
  capacityAtGlance: {
    workIntensity: 'Low' | 'Medium' | 'High';
    trainingSessions: number;
    appointments: number;
    travel: string;
    otherNotes: string;
  };
  outcomes: WeeklyOutcome[];
  dailySchedule: WeekDaySchedule[];
  review?: WeeklyReview;
}

export interface CycleReview {
  id: string;
  cycleNumber: number;
  whatChangedInMe: string;
  whatIDoUnderstand: string;
  whatCanIDoNow: string;
  whatExists: string;
  evidenceSummary: string;
  whatChangesNextCycle: string;
  completedAt: string;
}

export interface CycleTask {
  id: string;
  title: string;
  category: 'Objective' | 'Output' | 'Theme' | 'General';
  completed: boolean;
  targetDay?: number;
  notes?: string;
}

export interface CycleData {
  id: string;
  number: number;
  name: string;
  mission: string;
  period: {
    startDay: number;
    endDay: number;
    startDate: string;
    endDate: string;
  };
  coreObjectives?: string[];
  majorThemes: string[];
  expectedOutputs: string[];
  completedOutputs?: string[];
  tasks?: CycleTask[];
  exitCriteria: string[];
  status: 'active' | 'upcoming' | 'completed';
  quote: string;
  review?: CycleReview;
}

export interface UserProfile {
  name: string;
  motto: string;
  programStartDate: string;
  ieltsTargetBand: number;
  dailySleepTarget: number;
  dailyScreenTimeLimit: number;
}

export interface LearningTopic {
  id: string;
  track: TechnicalTrack;
  title: string;
  learningObjective: string;
  depthStage: DepthStage;
  progressPercent: number;
  lastActivityDate?: string;
  evidenceIds: string[];
  relatedProjectId?: string;
  nextStep: string;
  keyConcepts: string[];
}

export interface LearningSession {
  id: string;
  date: string;
  topicId: string;
  topicTitle: string;
  track: TechnicalTrack;
  type: DepthStage;
  durationMinutes: number;
  purpose: string;
  result: string;
  evidenceId?: string;
  nextStep?: string;
}

export interface TechRationale {
  tech: string;
  rationale: string;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
  outputEvidence?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  status: 'In Progress' | 'Planned' | 'Completed' | 'Archived';
  problem: string;
  objective: string;
  learningGoals: string[];
  technologies: string[];
  techRationale: TechRationale[];
  techGate: {
    isAgentJustified: boolean;
    rationale: string;
    workflowComparison: string;
  };
  milestones: ProjectMilestone[];
  nextMilestoneTitle: string;
  targetDate: string;
  progressPercent: number;
  githubUrl?: string;
  demoUrl?: string;
  documentation?: string;
  careerStory: string;
  portfolioReady: boolean;
}

export interface OutputEvidence {
  id: string;
  title: string;
  type: 'Evaluation Report' | 'Feature Implementation' | 'IELTS Mock Result' | 'GitHub Update' | 'Architecture Diagram' | 'Benchmark Test' | 'Technical Note';
  date: string;
  description: string;
  url?: string;
  snippet?: string;
  tags: string[];
  relatedTopicId?: string;
  relatedProjectId?: string;
}

export interface IELTSSessionRecord {
  id: string;
  date: string;
  skill: IELTSSkill;
  focus: string;
  practiceType: string;
  durationMinutes: number;
  resultScore?: number | string;
  errorsIdentified: string[];
  nextAction: string;
}

export interface IELTSErrorRecord {
  id: string;
  skill: IELTSSkill;
  errorType: string;
  example: string;
  reason: string;
  correction: string;
  recurrenceCount: number;
  nextDrill: string;
  lastEncountered: string;
}

export interface TrainingSessionRecord {
  id: string;
  date: string;
  type: string;
  durationMinutes: number;
  completed: boolean;
  keyProgressionNotes: string;
  recoveryNote: string;
}

export interface SystemRisk {
  id: string;
  area: 'IELTS' | 'Project' | 'Technical' | 'Recovery' | 'Routine';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  suggestedAction: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'Article' | 'Doc' | 'Paper' | 'Tool' | 'Book';
  url: string;
  summary: string;
  relatedTopic?: string;
  relatedProject?: string;
  dateAdded: string;
}
