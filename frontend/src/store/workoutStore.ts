import { Workout, WorkoutSession, WorkoutSessionExercise } from '../types';

// Active workout session state
interface ActiveWorkoutState {
  isActive: boolean;
  startTime: string | null;
  exercises: WorkoutSessionExercise[];
}

// In-memory store for workouts and sessions
// Data will be lost on page refresh - backend persistence will be added later
class WorkoutStore {
  private workouts: Workout[] = [];
  private sessions: WorkoutSession[] = [];
  private activeWorkout: ActiveWorkoutState = {
    isActive: false,
    startTime: null,
    exercises: []
  };

  // Workout methods
  getWorkouts(): Workout[] {
    return [...this.workouts];
  }

  getWorkoutById(id: string): Workout | undefined {
    return this.workouts.find(w => w.id === id);
  }

  saveWorkout(workout: Workout): void {
    const existingIndex = this.workouts.findIndex(w => w.id === workout.id);
    if (existingIndex >= 0) {
      this.workouts[existingIndex] = { ...workout, updatedAt: new Date().toISOString() };
    } else {
      this.workouts.push(workout);
    }
  }

  deleteWorkout(id: string): void {
    this.workouts = this.workouts.filter(w => w.id !== id);
  }

  // Session methods
  getWorkoutSessions(): WorkoutSession[] {
    return [...this.sessions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getWorkoutSessionById(id: string): WorkoutSession | undefined {
    return this.sessions.find(s => s.id === id);
  }

  saveWorkoutSession(session: WorkoutSession): void {
    const existingIndex = this.sessions.findIndex(s => s.id === session.id);
    if (existingIndex >= 0) {
      this.sessions[existingIndex] = session;
    } else {
      this.sessions.push(session);
    }
  }

  deleteWorkoutSession(id: string): void {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }

  // Active workout methods
  startWorkout(): void {
    this.activeWorkout = {
      isActive: true,
      startTime: new Date().toISOString(),
      exercises: []
    };
  }

  stopWorkout(): WorkoutSession | null {
    if (!this.activeWorkout.isActive || this.activeWorkout.exercises.length === 0) {
      this.activeWorkout = { isActive: false, startTime: null, exercises: [] };
      return null;
    }

    const session: WorkoutSession = {
      id: `session-${Date.now()}`,
      date: this.activeWorkout.startTime || new Date().toISOString(),
      exercises: this.activeWorkout.exercises
    };

    this.saveWorkoutSession(session);
    this.activeWorkout = { isActive: false, startTime: null, exercises: [] };
    return session;
  }

  getActiveWorkout(): ActiveWorkoutState {
    return { ...this.activeWorkout };
  }

  addExerciseToActiveWorkout(exercise: WorkoutSessionExercise): void {
    if (this.activeWorkout.isActive) {
      this.activeWorkout.exercises.push(exercise);
    }
  }

  updateActiveWorkoutExercise(exerciseIndex: number, exercise: WorkoutSessionExercise): void {
    if (this.activeWorkout.isActive && this.activeWorkout.exercises[exerciseIndex]) {
      this.activeWorkout.exercises[exerciseIndex] = exercise;
    }
  }

  removeExerciseFromActiveWorkout(exerciseIndex: number): void {
    if (this.activeWorkout.isActive) {
      this.activeWorkout.exercises.splice(exerciseIndex, 1);
    }
  }

  // Utility methods
  clearAll(): void {
    this.workouts = [];
    this.sessions = [];
    this.activeWorkout = { isActive: false, startTime: null, exercises: [] };
  }
}

// Export singleton instance
export const workoutStore = new WorkoutStore();
