// Exercise types
export type MuscleGroup = 'chest' | 'biceps' | 'triceps' | 'legs' | 'abs' | 'back' | 'shoulders';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  description?: string;
  instructions?: string;
}

// Workout types
export interface Workout {
  id: string;
  name: string;
  exerciseIds: string[]; // Just the exercise IDs - no sets/reps/weight specified at creation
  createdAt: string;
  updatedAt?: string;
}

// Workout Session types
export interface WorkoutSessionExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: Array<{
    reps: number;
    weight: number; // in kg
    completed: boolean;
  }>;
  restTime?: number;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  workoutId?: string; // optional - can be a custom session
  workoutName?: string;
  date: string;
  duration?: number; // in minutes
  exercises: WorkoutSessionExercise[];
  notes?: string;
}

// Statistics types
export interface PersonalRecord {
  exerciseId: string;
  exercise: Exercise;
  maxWeight: number;
  date: string;
}

export interface ExerciseStats {
  exerciseId: string;
  exercise: Exercise;
  totalSessions: number;
  totalVolume: number; // total weight × reps
  personalRecord: PersonalRecord | null;
  lastPerformed: string | null;
}
