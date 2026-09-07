import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type {
  NavigationTab,
  CapacityMode,
  DepthStage,
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
  ResourceItem,
  WeeklyReview
} from '../types';
import {
  INITIAL_CYCLES,
  INITIAL_WEEKS,
  INITIAL_TODAY,
  INITIAL_LEARNING_TOPICS,
  INITIAL_LEARNING_SESSIONS,
  INITIAL_PROJECTS,
  INITIAL_OUTPUTS,
  INITIAL_IELTS_SESSIONS,
  INITIAL_IELTS_ERRORS,
  INITIAL_RISKS,
  INITIAL_RESOURCES
} from '../data/initialData';

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

  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'nidham_pos_state_v1';

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
    return saved ? JSON.parse(saved) : INITIAL_CYCLES;
  });

  const [currentCycleNumber, setCurrentCycleNumber] = useState<number>(1);

  const [weeks, setWeeks] = useState<WeekData[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_weeks`);
    return saved ? JSON.parse(saved) : INITIAL_WEEKS;
  });

  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(3);

  const [today, setToday] = useState<DayData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_today`);
    return saved ? JSON.parse(saved) : INITIAL_TODAY;
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

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nidham_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cycles`, JSON.stringify(cycles));
  }, [cycles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_weeks`, JSON.stringify(weeks));
  }, [weeks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_today`, JSON.stringify(today));
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

  // Derived current models
  const currentCycle = useMemo(() => {
    return cycles.find(c => c.number === currentCycleNumber) || cycles[0];
  }, [cycles, currentCycleNumber]);

  const selectedWeek = useMemo(() => {
    return weeks.find(w => w.weekNumber === selectedWeekNumber) || weeks[0];
  }, [weeks, selectedWeekNumber]);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || projects[0];
  }, [projects, activeProjectId]);

  // Computed Metrics
  const computedStats = useMemo(() => {
    const daysCompleted = today.dayNumber;
    const totalDays = 90;
    const daysRemaining = totalDays - daysCompleted;
    const dayProgressPercent = Math.round((daysCompleted / totalDays) * 100);

    const cycleTotalDays = currentCycle.period.endDay - currentCycle.period.startDay + 1;
    const cycleDaysCompleted = Math.max(0, Math.min(cycleTotalDays, daysCompleted - currentCycle.period.startDay + 1));

    // Today's execution rate
    const totalTodayCommitments = today.essentialCommitments.length;
    const completedTodayCommitments = today.essentialCommitments.filter(c => c.completed).length;
    const todayExecutionRate = totalTodayCommitments > 0 
      ? Math.round((completedTodayCommitments / totalTodayCommitments) * 100) 
      : 100;

    // Weekly execution rate
    const currentWeekOutcomes = selectedWeek.outcomes;
    const completedWeekOutcomes = currentWeekOutcomes.filter(o => o.completed).length;
    const weeklyExecutionRate = currentWeekOutcomes.length > 0 
      ? Math.round((completedWeekOutcomes / currentWeekOutcomes.length) * 100) 
      : 70;

    // IELTS consistency
    const weeklyIeltsCount = 5;
    const weeklyIeltsConsistency = Math.round((weeklyIeltsCount / 7) * 100);

    // Training consistency
    const scheduledTraining = 3;
    const completedTraining = 2;
    const weeklyTrainingConsistency = Math.round((completedTraining / scheduledTraining) * 100);

    const activeProjectProgress = activeProject?.progressPercent || 60;

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
      ieltsEstimatedBand: 6.5,
      ieltsTargetBand: 7.5
    };
  }, [today, currentCycle, selectedWeek, activeProject]);

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

  const exportDataJSON = () => {
    const fullBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
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

  const resetToDefaults = () => {
    setCycles(INITIAL_CYCLES);
    setWeeks(INITIAL_WEEKS);
    setToday(INITIAL_TODAY);
    setLearningTopics(INITIAL_LEARNING_TOPICS);
    setLearningSessions(INITIAL_LEARNING_SESSIONS);
    setProjects(INITIAL_PROJECTS);
    setOutputs(INITIAL_OUTPUTS);
    setIeltsSessions(INITIAL_IELTS_SESSIONS);
    setIeltsErrors(INITIAL_IELTS_ERRORS);
    setResources(INITIAL_RESOURCES);
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
        toggleEssentialCommitment,
        updateCapacityMode,
        toggleMainObjective,
        togglePrayer,
        toggleFajr,
        toggleQuran,
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
        triggerCelebration
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
