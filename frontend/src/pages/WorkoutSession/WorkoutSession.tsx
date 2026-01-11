import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Workout, WorkoutSession as WorkoutSessionType, Exercise } from '../../types';
import { workoutStore } from '../../store/workoutStore';
import { getExerciseById } from '../../data/exercises';
import './WorkoutSession.css';

interface ExerciseSet {
  reps: number;
  weight: number; // in kg
  completed: boolean;
}

interface SessionExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: ExerciseSet[];
}

const WorkoutSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [sessionExercises, setSessionExercises] = useState<SessionExercise[]>([]);

  useEffect(() => {
    if (id) {
      const foundWorkout = workoutStore.getWorkoutById(id);
      if (foundWorkout) {
        setWorkout(foundWorkout);
        // Initialize session exercises - start empty, user will add sets
        const initial: SessionExercise[] = foundWorkout.exerciseIds
          .map(exerciseId => {
            const exercise = getExerciseById(exerciseId);
            return exercise ? {
              exerciseId: exercise.id,
              exercise: exercise,
              sets: [] as ExerciseSet[]
            } : null;
          })
          .filter((ex): ex is SessionExercise => ex !== null);
        setSessionExercises(initial);
      } else {
        navigate('/workouts');
      }
    }
  }, [id, navigate]);

  const handleAddSet = (exerciseIndex: number) => {
    const updated = [...sessionExercises];
    updated[exerciseIndex].sets.push({
      reps: 0,
      weight: 0,
      completed: true // Automatically mark as completed when added
    });
    setSessionExercises(updated);
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...sessionExercises];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    setSessionExercises(updated);
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
    const updated = [...sessionExercises];
    updated[exerciseIndex].sets[setIndex][field] = value;
    setSessionExercises(updated);
  };


  const handleSave = () => {
    if (!workout) return;

    // Filter out exercises with no sets
    const exercisesWithSets = sessionExercises.filter(se => se.sets.length > 0);
    
    if (exercisesWithSets.length === 0) {
      alert('Please add at least one set to save the workout');
      return;
    }

    const session: WorkoutSessionType = {
      id: `session-${Date.now()}`,
      workoutId: workout.id,
      workoutName: workout.name,
      date: new Date().toISOString(),
      exercises: exercisesWithSets.map(se => ({
        exerciseId: se.exerciseId,
        exercise: se.exercise,
        sets: se.sets
      }))
    };

    workoutStore.saveWorkoutSession(session);
    navigate('/history');
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-session">
      <div className="session-header">
        <h1>{workout.name}</h1>
        <button onClick={handleSave} className="btn-primary">
          Save Workout
        </button>
      </div>

      <div className="session-exercises">
        {sessionExercises.map((sessionExercise, exerciseIndex) => (
          <div key={sessionExercise.exerciseId} className="session-exercise-card">
            <div className="exercise-title">
              <h2>{sessionExercise.exercise.name}</h2>
              <span className="muscle-group-badge">
                {sessionExercise.exercise.muscleGroup}
              </span>
            </div>

            <div className="sets-section">
              <div className="sets-header">
                <h3>Sets ({sessionExercise.sets.length})</h3>
                <button
                  onClick={() => handleAddSet(exerciseIndex)}
                  className="btn-add-set"
                >
                  + Add Set
                </button>
              </div>

              {sessionExercise.sets.length === 0 ? (
                <p className="no-sets-message">No sets added yet. Click "Add Set" to get started.</p>
              ) : (
                <div className="sets-list">
                  {sessionExercise.sets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className={`set-item ${set.completed ? 'completed' : ''}`}
                    >
                      <span className="set-number">Set {setIndex + 1}</span>
                      <div className="set-inputs">
                        <div className="input-group">
                          <label>Reps</label>
                          <input
                            type="number"
                            value={set.reps || ''}
                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', parseInt(e.target.value) || 0)}
                            min="0"
                            placeholder="0"
                          />
                        </div>
                        <div className="input-group">
                          <label>Weight (kg)</label>
                          <input
                            type="number"
                            value={set.weight || ''}
                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.5"
                            placeholder="0"
                          />
                        </div>
                        <button
                          className="btn-remove-set"
                          onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                          title="Remove set"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSession;
