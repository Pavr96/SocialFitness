import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Workout } from '../../types';
import { exercises, getAllMuscleGroups } from '../../data/exercises';
import { workoutStore } from '../../store/workoutStore';
import './CreateWorkout.css';

const CreateWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

  const muscleGroups = getAllMuscleGroups();
  const filteredExercises = selectedMuscleGroup === 'all'
    ? exercises
    : exercises.filter(ex => ex.muscleGroup === selectedMuscleGroup);

  const handleAddExercise = (exerciseId: string) => {
    if (selectedExerciseIds.includes(exerciseId)) {
      // Remove if already added
      setSelectedExerciseIds(selectedExerciseIds.filter(id => id !== exerciseId));
    } else {
      // Add exercise
      setSelectedExerciseIds([...selectedExerciseIds, exerciseId]);
    }
  };

  const handleSave = () => {
    if (!workoutName.trim()) {
      alert('Please enter a workout name');
      return;
    }

    if (selectedExerciseIds.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    const workout: Workout = {
      id: `workout-${Date.now()}`,
      name: workoutName.trim(),
      exerciseIds: selectedExerciseIds,
      createdAt: new Date().toISOString()
    };

    workoutStore.saveWorkout(workout);
    navigate('/workouts');
  };

  return (
    <div className="create-workout">
      <div className="create-workout-header">
        <h1>Create New Workout</h1>
        <button onClick={() => navigate('/workouts')} className="btn-secondary">
          Cancel
        </button>
      </div>

      <div className="workout-form">
        <div className="form-group">
          <label htmlFor="workout-name">Workout Name</label>
          <input
            id="workout-name"
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="e.g., Push Day, Leg Day"
            className="form-input"
          />
        </div>

        <div className="exercises-section">
          <h2>Add Exercises</h2>
          
          <div className="filter-group">
            <label htmlFor="muscle-group">Filter by Muscle Group:</label>
            <select
              id="muscle-group"
              value={selectedMuscleGroup}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
              className="form-select"
            >
              <option value="all">All</option>
              {muscleGroups.map(mg => (
                <option key={mg} value={mg}>{mg.charAt(0).toUpperCase() + mg.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="exercises-grid">
            {filteredExercises.map(exercise => (
              <button
                key={exercise.id}
                onClick={() => handleAddExercise(exercise.id)}
                className={`exercise-btn ${
                  selectedExerciseIds.includes(exercise.id) ? 'added' : ''
                }`}
              >
                {exercise.name}
                <span className="exercise-muscle-group">{exercise.muscleGroup}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedExerciseIds.length > 0 && (
          <div className="selected-exercises-list">
            <h2>Selected Exercises ({selectedExerciseIds.length})</h2>
            <div className="selected-exercises-grid">
              {selectedExerciseIds.map(exerciseId => {
                const exercise = exercises.find(ex => ex.id === exerciseId);
                if (!exercise) return null;
                return (
                  <div key={exerciseId} className="selected-exercise-item">
                    <span>{exercise.name}</span>
                    <button
                      onClick={() => handleAddExercise(exerciseId)}
                      className="btn-remove-small"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="info-text">
              💡 You'll add sets, reps, and weights when you start the workout
            </p>
          </div>
        )}

        <div className="form-actions">
          <button onClick={handleSave} className="btn-primary">
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
