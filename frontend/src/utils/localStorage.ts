import { Workout, WorkoutSession } from '../types';

const WORKOUTS_KEY = 'socialfitness_workouts';
const SESSIONS_KEY = 'socialfitness_sessions';

// Workout storage
export const saveWorkout = (workout: Workout): void => {
  const workouts = getWorkouts();
  const existingIndex = workouts.findIndex(w => w.id === workout.id);
  
  if (existingIndex >= 0) {
    workouts[existingIndex] = { ...workout, updatedAt: new Date().toISOString() };
  } else {
    workouts.push(workout);
  }
  
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
};

export const getWorkouts = (): Workout[] => {
  const data = localStorage.getItem(WORKOUTS_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const getWorkoutById = (id: string): Workout | undefined => {
  const workouts = getWorkouts();
  return workouts.find(w => w.id === id);
};

export const deleteWorkout = (id: string): void => {
  const workouts = getWorkouts();
  const filtered = workouts.filter(w => w.id !== id);
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
};

// Workout Session storage
export const saveWorkoutSession = (session: WorkoutSession): void => {
  const sessions = getWorkoutSessions();
  const existingIndex = sessions.findIndex(s => s.id === session.id);
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  // Sort by date (newest first)
  sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getWorkoutSessions = (): WorkoutSession[] => {
  const data = localStorage.getItem(SESSIONS_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const getWorkoutSessionById = (id: string): WorkoutSession | undefined => {
  const sessions = getWorkoutSessions();
  return sessions.find(s => s.id === id);
};

export const deleteWorkoutSession = (id: string): void => {
  const sessions = getWorkoutSessions();
  const filtered = sessions.filter(s => s.id !== id);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(filtered));
};

// Utility functions
export const clearAllData = (): void => {
  localStorage.removeItem(WORKOUTS_KEY);
  localStorage.removeItem(SESSIONS_KEY);
};

export const exportData = (): string => {
  const data = {
    workouts: getWorkouts(),
    sessions: getWorkoutSessions(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.workouts) {
      localStorage.setItem(WORKOUTS_KEY, JSON.stringify(data.workouts));
    }
    if (data.sessions) {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(data.sessions));
    }
    return true;
  } catch {
    return false;
  }
};
