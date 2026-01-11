import { Workout, WorkoutSession } from '../types';

// In-memory store for workouts and sessions
// Data will be lost on page refresh - backend persistence will be added later
class WorkoutStore {
  private workouts: Workout[] = [];
  private sessions: WorkoutSession[] = [];

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

  // Utility methods
  clearAll(): void {
    this.workouts = [];
    this.sessions = [];
  }
}

// Export singleton instance
export const workoutStore = new WorkoutStore();
