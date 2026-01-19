import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutStore } from '../../store/workoutStore';
import { WorkoutSessionExercise } from '../../types';
import './CurrentExercise.css';

interface ExerciseSet {
  reps: number;
  weight: number; // in kg
  completed: boolean;
}

const CurrentExercise: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<WorkoutSessionExercise | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState<number>(-1);

  useEffect(() => {
    const activeWorkout = workoutStore.getActiveWorkout();
    if (!activeWorkout.isActive) {
      navigate('/');
      return;
    }

    const idx = parseInt(index || '0', 10);
    if (isNaN(idx) || idx < 0 || idx >= activeWorkout.exercises.length) {
      navigate('/active-workout');
      return;
    }

    setExerciseIndex(idx);
    setExercise({ ...activeWorkout.exercises[idx] });
  }, [index, navigate]);

  const handleAddSet = () => {
    if (!exercise) return;
    const updated = { ...exercise };
    updated.sets.push({
      reps: 0,
      weight: 0,
      completed: true // Automatically completed when added
    });
    setExercise(updated);
  };

  const handleRemoveSet = (setIndex: number) => {
    if (!exercise) return;
    const updated = { ...exercise };
    updated.sets.splice(setIndex, 1);
    setExercise(updated);
  };

  const handleSetChange = (setIndex: number, field: 'reps' | 'weight', value: number) => {
    if (!exercise) return;
    const updated = { ...exercise };
    updated.sets[setIndex][field] = value;
    setExercise(updated);
  };

  const handleStopExercise = (save: boolean) => {
    if (!exercise || exerciseIndex < 0) return;

    if (save && exercise.sets.length === 0) {
      alert('No sets added. Discard exercise instead?');
      return;
    }

    if (save) {
      // Update the exercise in active workout
      workoutStore.updateActiveWorkoutExercise(exerciseIndex, exercise);
    } else {
      // Remove exercise from active workout
      workoutStore.removeExerciseFromActiveWorkout(exerciseIndex);
    }

    navigate('/active-workout');
  };

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="current-exercise">
      <div className="exercise-header">
        <div>
          <h1>{exercise.exercise.name}</h1>
          <span className="muscle-group-badge">{exercise.exercise.muscleGroup}</span>
        </div>
        <button onClick={() => navigate('/active-workout')} className="btn-back">
          Back
        </button>
      </div>

      <div className="sets-section">
        <div className="sets-header">
          <h2>Sets ({exercise.sets.length})</h2>
          <button onClick={handleAddSet} className="btn-add-set">
            + Add Set
          </button>
        </div>

        {exercise.sets.length === 0 ? (
          <p className="no-sets-message">No sets added yet. Click "Add Set" to get started.</p>
        ) : (
          <div className="sets-list">
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="set-item completed">
                <span className="set-number">Set {setIndex + 1}</span>
                <div className="set-inputs">
                  <div className="input-group">
                    <label>Reps</label>
                    <input
                      type="number"
                      value={set.reps || ''}
                      onChange={(e) => handleSetChange(setIndex, 'reps', parseInt(e.target.value) || 0)}
                      min="0"
                      placeholder="0"
                    />
                  </div>
                  <div className="input-group">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      value={set.weight || ''}
                      onChange={(e) => handleSetChange(setIndex, 'weight', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.5"
                      placeholder="0"
                    />
                  </div>
                  <button
                    className="btn-remove-set"
                    onClick={() => handleRemoveSet(setIndex)}
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

      <div className="exercise-actions">
        <button
          onClick={() => handleStopExercise(false)}
          className="btn-discard"
        >
          Discard Exercise
        </button>
        <button
          onClick={() => handleStopExercise(true)}
          className="btn-save"
        >
          Save Exercise
        </button>
      </div>
    </div>
  );
};

export default CurrentExercise;
