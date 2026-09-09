import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { playChime } from '../utils/sound';
import type {
  NavigationTab,
  CapacityMode,
  DepthStage,
  CycleData,
  WeekData,
  DayData,
  FocusTimerState,
  LearningTopic,
  LearningSession,
  ProjectData,
  OutputEvidence,
  IELTSSessionRecord,
  IELTSErrorRecord,
  SystemRisk,
  ResourceItem,
  WeeklyReview,
  UserProfile,
  CycleTask,
  DaySideCompletion
} from '../types';
import {
  INITIAL_PROFILE,
  INITIAL_CYCLES,
  INITIAL_WEEKS,
  INITIAL_LEARNING_TOPICS,
  INITIAL_LEARNING_SESSIONS,
  INITIAL_PROJECTS,
  INITIAL_OUTPUTS,
  INITIAL_IELTS_SESSIONS,
  INITIAL_IELTS_ERRORS,
  INITIAL_RISKS,
  INITIAL_RESOURCES,
  getTodayDayNumber,
  programDayToDate
} from '../data/initialData';
import {
  createDayDataForDay,
  calculateDaySideCompletion
} from '../data/dailyCurriculum';

interface AppContextType {
  // Navigation & UI
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isMobileViewMode: boolean;
  toggleMobileViewMode: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isQuickLogOpen: boolean;
  setQuickLogOpen: (open: boolean, initialType?: string) => void;
  quickLogInitialType: string | null;

  // Data & State
  cycles: CycleData[];
  currentCycle: CycleData;
  setCurrentCycleNumber: (num: number) => void;

  weeks: WeekData[];
  selectedWeek: WeekData;
  setSelectedWeekNumber: (num: number) => void;

  today: DayData;
  setToday: React.Dispatch<React.SetStateAction<DayData>>;
  daysHistory: Record<number, DayData>;
  realTodayDayNumber: number;
  isViewingRealToday: boolean;
  returnToRealToday: () => void;
  getDayData: (dayNumber: number) => DayData;
  calculateDaySideCompletion: (day: DayData) => DaySideCompletion;
  toggleTechnicalSubtask: (subtaskId: string) => void;
  switchToDay: (dayNumber: number) => void;

  learningTopics: LearningTopic[];
  learningSessions: LearningSession[];
  projects: ProjectData[];
  activeProject: ProjectData;
  setActiveProjectId: (id: string) => void;
  outputs: OutputEvidence[];

  ieltsSessions: IELTSSessionRecord[];
  ieltsErrors: IELTSErrorRecord[];

  risks: SystemRisk[];
  resources: ResourceItem[];

  // Computed Rollups
  computedStats: {
    dayProgressPercent: number;
    daysCompleted: number;
    daysRemaining: number;
    cycleDaysCompleted: number;
    cycleTotalDays: number;
    todayExecutionRate: number;
    weeklyExecutionRate: number;
    weeklyIeltsConsistency: number;
    weeklyIeltsCount: number;
    weeklyTrainingConsistency: number;
    activeProjectProgress: number;
    ieltsEstimatedBand: number;
    ieltsTargetBand: number;
  };

  // Action Handlers
  toggleEssentialCommitment: (id: string) => void;
  updateCapacityMode: (mode: CapacityMode) => void;
  toggleMainObjective: () => void;
  togglePrayer: (index: number) => void;
  toggleFajr: () => void;
  toggleQuran: () => void;
  toggleBaqarahThird: (index: number) => void;
  toggleAdhkar: (type: 'morning' | 'evening') => void;
  toggleTraining: () => void;
  toggleScreenTime: () => void;
  updateQuickNotes: (notes: string) => void;
  completeDailyClose: (closeData: { completedMeaningful: string; interfered: string; tomorrowPriority: string; evidenceProduced?: string }) => void;

  toggleWeeklyOutcome: (weekNumber: number, outcomeId: string) => void;
  saveWeeklyReview: (weekNumber: number, review: WeeklyReview) => void;

  addLearningSession: (session: Omit<LearningSession, 'id'>) => void;
  updateTopicStage: (topicId: string, stage: DepthStage, progress: number) => void;
  toggleProjectMilestone: (projectId: string, milestoneId: string) => void;
  addProjectOutput: (output: Omit<OutputEvidence, 'id'>) => void;

  addIELTSSession: (session: Omit<IELTSSessionRecord, 'id'>) => void;
  addIELTSError: (error: Omit<IELTSErrorRecord, 'id' | 'recurrenceCount' | 'lastEncountered'>) => void;
  incrementIELTSError: (errorId: string) => void;

  addResource: (res: Omit<ResourceItem, 'id' | 'dateAdded'>) => void;

  // Profile & Settings
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Cycle Management
  updateCycle: (cycleNumber: number, updates: Partial<CycleData>) => void;
  addCycleObjective: (cycleNumber: number, objective: string) => void;
  editCycleObjective: (cycleNumber: number, index: number, newObjective: string) => void;
  deleteCycleObjective: (cycleNumber: number, index: number) => void;
  addCycleOutput: (cycleNumber: number, output: string) => void;
  toggleCycleOutput: (cycleNumber: number, outputTitle: string) => void;
  deleteCycleOutput: (cycleNumber: number, outputTitle: string) => void;
  addCycleTask: (cycleNumber: number, task: Omit<CycleTask, 'id'>) => void;
  toggleCycleTask: (cycleNumber: number, taskId: string) => void;
  deleteCycleTask: (cycleNumber: number, taskId: string) => void;

  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
  triggerCelebration: () => void;

  // Focus Chrono / Timer
  focusTimer: FocusTimerState;
  startFocusTimer: (minutes?: number, label?: string, track?: string) => void;
  pauseFocusTimer: () => void;
  resumeFocusTimer: () => void;
  resetFocusTimer: () => void;
  addFocusTimerMinutes: (mins: number) => void;
  toggleFocusTimerSound: () => void;
  completeFocusTimer: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'nidham_pos_state_v3';

// ─── Storage Migration ──────────────────────────────────────────────────────
// Clear any stale v1 and v2 keys so old cached data never loads.
(function clearOldStorage() {
  const suffixes = ['_cycles','_weeks','_today','_topics','_sessions','_projects','_outputs','_ielts_sessions','_ielts_errors','_resources'];
  ['nidham_pos_state_v1', 'nidham_pos_state_v2'].forEach(oldKey => {
    suffixes.forEach(s => localStorage.removeItem(`${oldKey}${s}`));
  });
})();

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('command-center');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('nidham_theme') as 'dark' | 'light') || 'dark';
  });
  const [isMobileViewMode, setIsMobileViewMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isQuickLogOpen, setQuickLogOpenState] = useState<boolean>(false);
  const [quickLogInitialType, setQuickLogInitialType] = useState<string | null>(null);

  // Entities
  const [cycles, setCycles] = useState<CycleData[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_cycles`);
    if (!saved) return INITIAL_CYCLES;
    try {
      const parsed: CycleData[] = JSON.parse(saved);
      return parsed.map((c, i) => {
        const init = INITIAL_CYCLES[i] || {};
        return {
          ...init,
          ...c,
          coreObjectives: (c.coreObjectives && c.coreObjectives.length > 0) ? c.coreObjectives : (init.coreObjectives || []),
          tasks: (c.tasks && c.tasks.length > 0) ? c.tasks : (init.tasks || []),
          completedOutputs: c.completedOutputs || init.completedOutputs || []
        };
      });
    } catch {
      return INITIAL_CYCLES;
    }
  });

  const [currentCycleNumber, setCurrentCycleNumber] = useState<number>(1);

  const [weeks, setWeeks] = useState<WeekData[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_weeks`);
    return saved ? JSON.parse(saved) : INITIAL_WEEKS;
  });

  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(() => {
    // Default to the week containing today
    const todayDayNum = getTodayDayNumber();
    return Math.max(1, Math.ceil(todayDayNum / 7));
  });

  // ── Days History & Active Today Bootstrapping ──
  const [daysHistory, setDaysHistory] = useState<Record<number, DayData>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_days_history`);
    let history: Record<number, DayData> = {};
    if (saved) {
      try { history = JSON.parse(saved); } catch { history = {}; }
    }
    return history;
  });

  const [today, setToday] = useState<DayData>(() => {
    const currentDayNum = getTodayDayNumber();
    const savedTodayStr = localStorage.getItem(`${STORAGE_KEY}_today`);
    const savedHistoryStr = localStorage.getItem(`${STORAGE_KEY}_days_history`);
    let history: Record<number, DayData> = {};
    if (savedHistoryStr) {
      try { history = JSON.parse(savedHistoryStr); } catch {}
    }

    if (savedTodayStr) {
      try {
        const parsed: DayData = JSON.parse(savedTodayStr);
        if (parsed.dayNumber === currentDayNum) {
          // It's today! Merge with curriculum structure
          const dayTemplate = createDayDataForDay(currentDayNum);
          return {
            ...dayTemplate,
            ...parsed,
            personalAnchors: {
              ...dayTemplate.personalAnchors,
              ...(parsed.personalAnchors || {}),
              faith: {
                ...dayTemplate.personalAnchors.faith,
                ...(parsed.personalAnchors?.faith || {}),
                prayers: parsed.personalAnchors?.faith?.prayers || [false, false, false, false, false],
                baqarahThirds: parsed.personalAnchors?.faith?.baqarahThirds || [false, false, false]
              },
              health: {
                ...dayTemplate.personalAnchors.health,
                ...(parsed.personalAnchors?.health || {})
              },
              discipline: {
                ...dayTemplate.personalAnchors.discipline,
                ...(parsed.personalAnchors?.discipline || {})
              }
            }
          };
        } else if (parsed.dayNumber < currentDayNum) {
          // Rollover detected! Archive yesterday into history
          history[parsed.dayNumber] = parsed;
          localStorage.setItem(`${STORAGE_KEY}_days_history`, JSON.stringify(history));

          // Return today (from history if already created, or fresh DayData)
          return history[currentDayNum] || createDayDataForDay(currentDayNum);
        } else {
          return parsed;
        }
      } catch {
        return createDayDataForDay(currentDayNum);
      }
    }

    return history[currentDayNum] || createDayDataForDay(currentDayNum);
  });

  const [learningTopics, setLearningTopics] = useState<LearningTopic[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_topics`);
    return saved ? JSON.parse(saved) : INITIAL_LEARNING_TOPICS;
  });

  const [learningSessions, setLearningSessions] = useState<LearningSession[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_sessions`);
    return saved ? JSON.parse(saved) : INITIAL_LEARNING_SESSIONS;
  });

  const [projects, setProjects] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>('proj-rag-assistant');

  const [outputs, setOutputs] = useState<OutputEvidence[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_outputs`);
    return saved ? JSON.parse(saved) : INITIAL_OUTPUTS;
  });

  const [ieltsSessions, setIeltsSessions] = useState<IELTSSessionRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ielts_sessions`);
    return saved ? JSON.parse(saved) : INITIAL_IELTS_SESSIONS;
  });

  const [ieltsErrors, setIeltsErrors] = useState<IELTSErrorRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ielts_errors`);
    return saved ? JSON.parse(saved) : INITIAL_IELTS_ERRORS;
  });

  const [risks] = useState<SystemRisk[]>(INITIAL_RISKS);

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_resources`);
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Focus Chrono State
  const [focusTimer, setFocusTimer] = useState<FocusTimerState>(() => {
    return {
      isActive: false,
      isPaused: false,
      secondsLeft: 90 * 60, // 5400 seconds = 90 min
      totalSeconds: 90 * 60,
      label: 'RAG Evaluation — Deep Work Session',
      track: 'RAG / AI Engineering',
      soundEnabled: true
    };
  });

  // Sync to LocalStorage & HTML Theme Attributes
  useEffect(() => {
    localStorage.setItem('nidham_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cycles`, JSON.stringify(cycles));
  }, [cycles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_weeks`, JSON.stringify(weeks));
  }, [weeks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_days_history`, JSON.stringify(daysHistory));
  }, [daysHistory]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_today`, JSON.stringify(today));
    setDaysHistory(prev => {
      if (prev[today.dayNumber] === today) return prev;
      return { ...prev, [today.dayNumber]: today };
    });
  }, [today]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_topics`, JSON.stringify(learningTopics));
  }, [learningTopics]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sessions`, JSON.stringify(learningSessions));
  }, [learningSessions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_outputs`, JSON.stringify(outputs));
  }, [outputs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ielts_sessions`, JSON.stringify(ieltsSessions));
  }, [ieltsSessions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ielts_errors`, JSON.stringify(ieltsErrors));
  }, [ieltsErrors]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_resources`, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(userProfile));
  }, [userProfile]);

  // Derived current models
  const currentCycle = useMemo(() => {
    return cycles.find(c => c.number === currentCycleNumber) || cycles[0];
  }, [cycles, currentCycleNumber]);

  const selectedWeek = useMemo(() => {
    const w = weeks.find(item => item.weekNumber === selectedWeekNumber) || weeks[0];
    const enrichedSchedule = w.dailySchedule.map(row => {
      const isTodayRow = row.dayNumber === today.dayNumber;
      const dayData = isTodayRow ? today : (daysHistory[row.dayNumber] || undefined);
      const stats = dayData ? calculateDaySideCompletion(dayData) : undefined;
      const isCompleted = dayData ? (stats ? stats.overallPercent > 0 : false) : (row.dayNumber < today.dayNumber);

      return {
        ...row,
        isToday: isTodayRow,
        completed: isCompleted,
        completionStats: stats
      };
    });

    return {
      ...w,
      dailySchedule: enrichedSchedule
    };
  }, [weeks, selectedWeekNumber, today, daysHistory]);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || projects[0];
  }, [projects, activeProjectId]);

  // Computed Metrics
  const computedStats = useMemo(() => {
    const daysCompleted = today.dayNumber;
    const totalDays = 90;
    const daysRemaining = Math.max(0, totalDays - daysCompleted);
    const dayProgressPercent = Math.round((daysCompleted / totalDays) * 100);

    const cycleTotalDays = currentCycle.period.endDay - currentCycle.period.startDay + 1;
    const cycleDaysCompleted = Math.max(0, Math.min(cycleTotalDays, daysCompleted - currentCycle.period.startDay + 1));

    // Today's execution rate
    const totalTodayCommitments = today.essentialCommitments.length;
    const completedTodayCommitments = today.essentialCommitments.filter(c => c.completed).length;
    const todayExecutionRate = totalTodayCommitments > 0
      ? Math.round((completedTodayCommitments / totalTodayCommitments) * 100)
      : 0;

    // Weekly execution rate (from selected week's outcomes)
    const currentWeekOutcomes = selectedWeek.outcomes;
    const completedWeekOutcomes = currentWeekOutcomes.filter(o => o.completed).length;
    const weeklyExecutionRate = currentWeekOutcomes.length > 0
      ? Math.round((completedWeekOutcomes / currentWeekOutcomes.length) * 100)
      : 0;

    // IELTS consistency — count sessions logged this week
    const weekStartDay = (selectedWeek.weekNumber - 1) * 7 + 1;
    const weekEndDay = weekStartDay + 6;
    const weekStartDate = programDayToDate(weekStartDay);
    const weekEndDate = programDayToDate(weekEndDay);
    weekStartDate.setHours(0, 0, 0, 0);
    weekEndDate.setHours(23, 59, 59, 999);
    const weeklyIeltsCount = ieltsSessions.filter(s => {
      const d = new Date(s.date);
      return d >= weekStartDate && d <= weekEndDate;
    }).length;
    const weeklyIeltsConsistency = Math.round((weeklyIeltsCount / 7) * 100);

    // Training consistency — use today's actual training state
    const trainingCompleted = today.personalAnchors.health.trainingCompleted ? 1 : 0;
    const trainingScheduled = today.personalAnchors.health.trainingScheduled ? 1 : 0;
    const weeklyTrainingConsistency = trainingScheduled > 0
      ? Math.round((trainingCompleted / trainingScheduled) * 100)
      : 0;

    // Project progress — computed from milestone completion
    const activeProjectProgress = activeProject?.progressPercent || 0;

    // IELTS band — average of numeric session scores this week
    const scoredSessions = ieltsSessions
      .filter(s => s.resultScore && !isNaN(parseFloat(String(s.resultScore))))
      .slice(0, 5);
    const ieltsEstimatedBand = scoredSessions.length > 0
      ? Math.round((scoredSessions.reduce((acc, s) => acc + parseFloat(String(s.resultScore!)), 0) / scoredSessions.length) * 2) / 2
      : 0;

    return {
      dayProgressPercent,
      daysCompleted,
      daysRemaining,
      cycleDaysCompleted,
      cycleTotalDays,
      todayExecutionRate,
      weeklyExecutionRate,
      weeklyIeltsConsistency,
      weeklyIeltsCount,
      weeklyTrainingConsistency,
      activeProjectProgress,
      ieltsEstimatedBand,
      ieltsTargetBand: 7.5
    };
  }, [today, currentCycle, selectedWeek, activeProject, ieltsSessions]);

  // Celebration helper
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3B82F6', '#10B981', '#6366F1', '#F59E0B']
      });
    } catch {
      // Ignore if confetti fails in some environments
    }
  };

  // Focus Chrono Ticker
  useEffect(() => {
    if (!focusTimer.isActive || focusTimer.isPaused) return;

    const interval = setInterval(() => {
      setFocusTimer(prev => {
        if (prev.secondsLeft <= 1) {
          clearInterval(interval);
          if (prev.soundEnabled) {
            playChime('complete');
          }
          triggerCelebration();

          // Mark technical commitment & main objective as completed
          setToday(todayPrev => {
            const updatedCommitments = todayPrev.essentialCommitments.map(c =>
              c.area === 'Technical' ? { ...c, completed: true } : c
            );
            return {
              ...todayPrev,
              mainObjective: {
                ...todayPrev.mainObjective,
                completed: true,
                completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              },
              essentialCommitments: updatedCommitments
            };
          });

          return {
            ...prev,
            isActive: false,
            isPaused: false,
            secondsLeft: 0
          };
        }

        return {
          ...prev,
          secondsLeft: prev.secondsLeft - 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [focusTimer.isActive, focusTimer.isPaused]);

  const startFocusTimer = (minutes = 90, label = 'RAG Evaluation — Deep Work Session', track = 'RAG / AI Engineering') => {
    const totalSecs = minutes * 60;
    setFocusTimer(prev => {
      if (prev.soundEnabled) playChime('start');
      return {
        ...prev,
        isActive: true,
        isPaused: false,
        secondsLeft: totalSecs,
        totalSeconds: totalSecs,
        label,
        track,
        startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  };

  const pauseFocusTimer = () => {
    setFocusTimer(prev => {
      if (prev.soundEnabled) playChime('pause');
      return { ...prev, isPaused: true };
    });
  };

  const resumeFocusTimer = () => {
    setFocusTimer(prev => {
      if (prev.soundEnabled) playChime('resume');
      return { ...prev, isPaused: false };
    });
  };

  const resetFocusTimer = () => {
    setFocusTimer(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      secondsLeft: prev.totalSeconds
    }));
  };

  const addFocusTimerMinutes = (mins: number) => {
    setFocusTimer(prev => ({
      ...prev,
      secondsLeft: prev.secondsLeft + mins * 60,
      totalSeconds: prev.totalSeconds + mins * 60
    }));
  };

  const toggleFocusTimerSound = () => {
    setFocusTimer(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const completeFocusTimer = () => {
    if (focusTimer.soundEnabled) playChime('complete');
    triggerCelebration();
    setToday(todayPrev => {
      const updatedCommitments = todayPrev.essentialCommitments.map(c =>
        c.area === 'Technical' ? { ...c, completed: true } : c
      );
      return {
        ...todayPrev,
        mainObjective: {
          ...todayPrev.mainObjective,
          completed: true,
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        essentialCommitments: updatedCommitments
      };
    });
    setFocusTimer(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      secondsLeft: 0
    }));
  };

  // Actions
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileViewMode = () => {
    setIsMobileViewMode(prev => !prev);
  };

  const setQuickLogOpen = (open: boolean, initialType?: string) => {
    setQuickLogOpenState(open);
    if (initialType) {
      setQuickLogInitialType(initialType);
    } else {
      setQuickLogInitialType(null);
    }
  };

  const toggleEssentialCommitment = (id: string) => {
    setToday(prev => {
      const updated = prev.essentialCommitments.map(c => {
        if (c.id === id) {
          const newStatus = !c.completed;
          if (newStatus) triggerCelebration();
          return { ...c, completed: newStatus };
        }
        return c;
      });
      return { ...prev, essentialCommitments: updated };
    });
  };

  const updateCapacityMode = (mode: CapacityMode) => {
    setToday(prev => ({ ...prev, capacityMode: mode }));
  };

  const toggleMainObjective = () => {
    setToday(prev => {
      const newStatus = !prev.mainObjective.completed;
      if (newStatus) triggerCelebration();
      return {
        ...prev,
        mainObjective: {
          ...prev.mainObjective,
          completed: newStatus,
          completedAt: newStatus ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        }
      };
    });
  };

  const togglePrayer = (index: number) => {
    setToday(prev => {
      const newPrayers = [...prev.personalAnchors.faith.prayers] as [boolean, boolean, boolean, boolean, boolean];
      newPrayers[index] = !newPrayers[index];
      return {
        ...prev,
        personalAnchors: {
          ...prev.personalAnchors,
          faith: {
            ...prev.personalAnchors.faith,
            prayers: newPrayers
          }
        }
      };
    });
  };

  const toggleFajr = () => {
    setToday(prev => ({
      ...prev,
      personalAnchors: {
        ...prev.personalAnchors,
        faith: {
          ...prev.personalAnchors.faith,
          fajrOnTime: !prev.personalAnchors.faith.fajrOnTime
        }
      }
    }));
  };

  const toggleQuran = () => {
    setToday(prev => ({
      ...prev,
      personalAnchors: {
        ...prev.personalAnchors,
        faith: {
          ...prev.personalAnchors.faith,
          quranRead: !prev.personalAnchors.faith.quranRead
        }
      }
    }));
  };

  const toggleBaqarahThird = (index: number) => {
    setToday(prev => {
      const currentThirds = prev.personalAnchors.faith.baqarahThirds || [false, false, false];
      const newThirds = [...currentThirds] as [boolean, boolean, boolean];
      newThirds[index] = !newThirds[index];
      const allRead = newThirds.every(Boolean);
      if (allRead && !prev.personalAnchors.faith.quranRead) {
        triggerCelebration();
      }
      return {
        ...prev,
        personalAnchors: {
          ...prev.personalAnchors,
          faith: {
            ...prev.personalAnchors.faith,
            baqarahThirds: newThirds,
            quranRead: allRead
          }
        }
      };
    });
  };

  const toggleAdhkar = (type: 'morning' | 'evening') => {
    setToday(prev => {
      const field = type === 'morning' ? 'morningAdhkar' : 'eveningAdhkar';
      return {
        ...prev,
        personalAnchors: {
          ...prev.personalAnchors,
          faith: {
            ...prev.personalAnchors.faith,
            [field]: !prev.personalAnchors.faith[field]
          }
        }
      };
    });
  };

  const toggleTraining = () => {
    setToday(prev => {
      const newStatus = !prev.personalAnchors.health.trainingCompleted;
      if (newStatus) triggerCelebration();
      return {
        ...prev,
        personalAnchors: {
          ...prev.personalAnchors,
          health: {
            ...prev.personalAnchors.health,
            trainingCompleted: newStatus
          }
        }
      };
    });
  };

  const toggleScreenTime = () => {
    setToday(prev => ({
      ...prev,
      personalAnchors: {
        ...prev.personalAnchors,
        discipline: {
          ...prev.personalAnchors.discipline,
          screenTimeBoundaryKept: !prev.personalAnchors.discipline.screenTimeBoundaryKept
        }
      }
    }));
  };

  const updateQuickNotes = (notes: string) => {
    setToday(prev => ({ ...prev, quickNotes: notes }));
  };

  const completeDailyClose = (closeData: {
    completedMeaningful: string;
    interfered: string;
    tomorrowPriority: string;
    evidenceProduced?: string;
  }) => {
    setToday(prev => ({
      ...prev,
      dailyClose: {
        ...closeData,
        completedAt: new Date().toISOString()
      }
    }));

    if (closeData.evidenceProduced && closeData.evidenceProduced.trim().length > 0) {
      addProjectOutput({
        title: `Daily output: ${closeData.evidenceProduced.slice(0, 40)}`,
        type: 'Technical Note',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: closeData.evidenceProduced,
        tags: ['Daily Close', 'Evidence', 'Reflection']
      });
    }

    triggerCelebration();
  };

  const toggleWeeklyOutcome = (weekNumber: number, outcomeId: string) => {
    setWeeks(prev => prev.map(w => {
      if (w.weekNumber === weekNumber) {
        const updated = w.outcomes.map(o => {
          if (o.id === outcomeId) {
            const nextStatus = !o.completed;
            if (nextStatus) triggerCelebration();
            return { ...o, completed: nextStatus };
          }
          return o;
        });
        return { ...w, outcomes: updated };
      }
      return w;
    }));
  };

  const saveWeeklyReview = (weekNumber: number, review: WeeklyReview) => {
    setWeeks(prev => prev.map(w => {
      if (w.weekNumber === weekNumber) {
        return { ...w, review };
      }
      return w;
    }));
    triggerCelebration();
  };

  const addLearningSession = (session: Omit<LearningSession, 'id'>) => {
    const newSession: LearningSession = {
      ...session,
      id: `ls-${Date.now()}`
    };
    setLearningSessions(prev => [newSession, ...prev]);

    // Update topic depth if specified
    setLearningTopics(prev => prev.map(t => {
      if (t.id === session.topicId) {
        return {
          ...t,
          depthStage: session.type,
          lastActivityDate: session.date,
          nextStep: session.nextStep || t.nextStep,
          progressPercent: Math.min(100, t.progressPercent + 10)
        };
      }
      return t;
    }));

    // If evidence produced, log to outputs
    if (session.result) {
      addProjectOutput({
        title: `${session.type}: ${session.topicTitle}`,
        type: 'Technical Note',
        date: session.date,
        description: session.result,
        tags: [session.track, session.type],
        relatedTopicId: session.topicId
      });
    }

    triggerCelebration();
  };

  const updateTopicStage = (topicId: string, stage: DepthStage, progress: number) => {
    setLearningTopics(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          depthStage: stage,
          progressPercent: progress,
          lastActivityDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
      return t;
    }));
  };

  const toggleProjectMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            const nextDone = !m.completed;
            if (nextDone) triggerCelebration();
            return {
              ...m,
              completed: nextDone,
              completedDate: nextDone ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined
            };
          }
          return m;
        });
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        return {
          ...p,
          milestones: updatedMilestones,
          progressPercent: newProgress
        };
      }
      return p;
    }));
  };

  const addProjectOutput = (output: Omit<OutputEvidence, 'id'>) => {
    const newOutput: OutputEvidence = {
      ...output,
      id: `ev-${Date.now()}`
    };
    setOutputs(prev => [newOutput, ...prev]);
  };

  const addIELTSSession = (session: Omit<IELTSSessionRecord, 'id'>) => {
    const newSession: IELTSSessionRecord = {
      ...session,
      id: `ielts-s-${Date.now()}`
    };
    setIeltsSessions(prev => [newSession, ...prev]);

    // Also update Today's IELTS session completion
    setToday(prev => ({
      ...prev,
      ieltsSession: {
        ...prev.ieltsSession,
        completed: true,
        resultScore: session.resultScore
      }
    }));

    // If score provided, log an output
    if (session.resultScore) {
      addProjectOutput({
        title: `IELTS ${session.skill} Practice: Band ${session.resultScore}`,
        type: 'IELTS Mock Result',
        date: session.date,
        description: `Completed 45m practice on "${session.focus}". Next focus: ${session.nextAction}`,
        tags: ['IELTS', session.skill, `Band ${session.resultScore}`]
      });
    }

    triggerCelebration();
  };

  const addIELTSError = (error: Omit<IELTSErrorRecord, 'id' | 'recurrenceCount' | 'lastEncountered'>) => {
    const newErr: IELTSErrorRecord = {
      ...error,
      id: `err-${Date.now()}`,
      recurrenceCount: 1,
      lastEncountered: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setIeltsErrors(prev => [newErr, ...prev]);
  };

  const incrementIELTSError = (errorId: string) => {
    setIeltsErrors(prev => prev.map(e => {
      if (e.id === errorId) {
        return {
          ...e,
          recurrenceCount: e.recurrenceCount + 1,
          lastEncountered: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
      return e;
    }));
  };

  const addResource = (res: Omit<ResourceItem, 'id' | 'dateAdded'>) => {
    const newRes: ResourceItem = {
      ...res,
      id: `res-${Date.now()}`,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setResources(prev => [newRes, ...prev]);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const updateCycle = (cycleNumber: number, updates: Partial<CycleData>) => {
    setCycles(prev => prev.map(c => c.number === cycleNumber ? { ...c, ...updates } : c));
  };

  const addCycleObjective = (cycleNumber: number, objective: string) => {
    if (!objective.trim()) return;
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        const existing = c.coreObjectives || [];
        return { ...c, coreObjectives: [...existing, objective.trim()] };
      }
      return c;
    }));
    triggerCelebration();
  };

  const editCycleObjective = (cycleNumber: number, index: number, newObjective: string) => {
    if (!newObjective.trim()) return;
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        const list = [...(c.coreObjectives || [])];
        list[index] = newObjective.trim();
        return { ...c, coreObjectives: list };
      }
      return c;
    }));
  };

  const deleteCycleObjective = (cycleNumber: number, index: number) => {
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        const list = (c.coreObjectives || []).filter((_, i) => i !== index);
        return { ...c, coreObjectives: list };
      }
      return c;
    }));
  };

  const addCycleOutput = (cycleNumber: number, output: string) => {
    if (!output.trim()) return;
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        return { ...c, expectedOutputs: [...c.expectedOutputs, output.trim()] };
      }
      return c;
    }));
    triggerCelebration();
  };

  const toggleCycleOutput = (cycleNumber: number, outputTitle: string) => {
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        const completed = c.completedOutputs || [];
        const isCompleted = completed.includes(outputTitle);
        const updated = isCompleted
          ? completed.filter(t => t !== outputTitle)
          : [...completed, outputTitle];
        if (!isCompleted) triggerCelebration();
        return { ...c, completedOutputs: updated };
      }
      return c;
    }));
  };

  const deleteCycleOutput = (cycleNumber: number, outputTitle: string) => {
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        return {
          ...c,
          expectedOutputs: c.expectedOutputs.filter(t => t !== outputTitle),
          completedOutputs: (c.completedOutputs || []).filter(t => t !== outputTitle)
        };
      }
      return c;
    }));
  };

  const addCycleTask = (cycleNumber: number, task: Omit<CycleTask, 'id'>) => {
    const newTask: CycleTask = {
      ...task,
      id: `ctask-${Date.now()}`
    };
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        return { ...c, tasks: [...(c.tasks || []), newTask] };
      }
      return c;
    }));
    triggerCelebration();
  };

  const toggleCycleTask = (cycleNumber: number, taskId: string) => {
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        const updated = (c.tasks || []).map(t => {
          if (t.id === taskId) {
            const nextStatus = !t.completed;
            if (nextStatus) triggerCelebration();
            return { ...t, completed: nextStatus };
          }
          return t;
        });
        return { ...c, tasks: updated };
      }
      return c;
    }));
  };

  const deleteCycleTask = (cycleNumber: number, taskId: string) => {
    setCycles(prev => prev.map(c => {
      if (c.number === cycleNumber) {
        return { ...c, tasks: (c.tasks || []).filter(t => t.id !== taskId) };
      }
      return c;
    }));
  };

  const exportDataJSON = () => {
    const fullBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProfile,
      cycles,
      weeks,
      today,
      learningTopics,
      learningSessions,
      projects,
      outputs,
      ieltsSessions,
      ieltsErrors,
      resources
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.userProfile) setUserProfile(data.userProfile);
      if (data.cycles) setCycles(data.cycles);
      if (data.weeks) setWeeks(data.weeks);
      if (data.today) setToday(data.today);
      if (data.learningTopics) setLearningTopics(data.learningTopics);
      if (data.learningSessions) setLearningSessions(data.learningSessions);
      if (data.projects) setProjects(data.projects);
      if (data.outputs) setOutputs(data.outputs);
      if (data.ieltsSessions) setIeltsSessions(data.ieltsSessions);
      if (data.ieltsErrors) setIeltsErrors(data.ieltsErrors);
      if (data.resources) setResources(data.resources);
      return true;
    } catch {
      return false;
    }
  };

  const realTodayDayNumber = getTodayDayNumber();
  const isViewingRealToday = today.dayNumber === realTodayDayNumber;

  const returnToRealToday = () => {
    if (today.dayNumber === realTodayDayNumber) return;
    setDaysHistory(prev => ({ ...prev, [today.dayNumber]: today }));
    const targetDay = daysHistory[realTodayDayNumber] || createDayDataForDay(realTodayDayNumber);
    setToday(targetDay);
    setSelectedWeekNumber(Math.ceil(realTodayDayNumber / 7));
  };

  const getDayData = (dayNum: number): DayData => {
    if (dayNum === today.dayNumber) return today;
    return daysHistory[dayNum] || createDayDataForDay(dayNum);
  };

  const toggleTechnicalSubtask = (subtaskId: string) => {
    setToday(prev => {
      const subtasks = prev.technicalSubtasks || [];
      const updated = subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st);
      return { ...prev, technicalSubtasks: updated };
    });
  };

  const switchToDay = (dayNum: number) => {
    if (dayNum === today.dayNumber) return;
    setDaysHistory(prev => ({ ...prev, [today.dayNumber]: today }));
    const targetDay = daysHistory[dayNum] || createDayDataForDay(dayNum);
    setToday(targetDay);
    setSelectedWeekNumber(Math.ceil(dayNum / 7));
  };

  const resetToDefaults = () => {
    setCycles(INITIAL_CYCLES);
    setWeeks(INITIAL_WEEKS);
    const todayDayNum = getTodayDayNumber();
    setToday(createDayDataForDay(todayDayNum));
    setDaysHistory({});
    setLearningTopics(INITIAL_LEARNING_TOPICS);
    setLearningSessions(INITIAL_LEARNING_SESSIONS);
    setProjects(INITIAL_PROJECTS);
    setOutputs(INITIAL_OUTPUTS);
    setIeltsSessions(INITIAL_IELTS_SESSIONS);
    setIeltsErrors(INITIAL_IELTS_ERRORS);
    setResources(INITIAL_RESOURCES);
    setUserProfile(INITIAL_PROFILE);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        isMobileViewMode,
        toggleMobileViewMode,
        isMobileMenuOpen,
        setMobileMenuOpen,
        isQuickLogOpen,
        setQuickLogOpen,
        quickLogInitialType,
        cycles,
        currentCycle,
        setCurrentCycleNumber,
        weeks,
        selectedWeek,
        setSelectedWeekNumber,
        today,
        setToday,
        daysHistory,
        realTodayDayNumber,
        isViewingRealToday,
        returnToRealToday,
        getDayData,
        calculateDaySideCompletion,
        toggleTechnicalSubtask,
        switchToDay,
        learningTopics,
        learningSessions,
        projects,
        activeProject,
        setActiveProjectId,
        outputs,
        ieltsSessions,
        ieltsErrors,
        risks,
        resources,
        computedStats,
        userProfile,
        updateUserProfile,
        updateCycle,
        addCycleObjective,
        editCycleObjective,
        deleteCycleObjective,
        addCycleOutput,
        toggleCycleOutput,
        deleteCycleOutput,
        addCycleTask,
        toggleCycleTask,
        deleteCycleTask,
        toggleEssentialCommitment,
        updateCapacityMode,
        toggleMainObjective,
        togglePrayer,
        toggleFajr,
        toggleQuran,
        toggleBaqarahThird,
        toggleAdhkar,
        toggleTraining,
        toggleScreenTime,
        updateQuickNotes,
        completeDailyClose,
        toggleWeeklyOutcome,
        saveWeeklyReview,
        addLearningSession,
        updateTopicStage,
        toggleProjectMilestone,
        addProjectOutput,
        addIELTSSession,
        addIELTSError,
        incrementIELTSError,
        addResource,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
        triggerCelebration,
        focusTimer,
        startFocusTimer,
        pauseFocusTimer,
        resumeFocusTimer,
        resetFocusTimer,
        addFocusTimerMinutes,
        toggleFocusTimerSound,
        completeFocusTimer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
