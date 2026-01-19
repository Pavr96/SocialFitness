import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercises, getAllMuscleGroups, getExerciseById } from '../../data/exercises';
import { workoutStore } from '../../store/workoutStore';
import { WorkoutSessionExercise } from '../../types';
import './AddExercise.css';

const AddExercise: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const muscleGroups = getAllMuscleGroups();

  useEffect(() => {
    const activeWorkout = workoutStore.getActiveWorkout();
    if (!activeWorkout.isActive) {
      navigate('/');
    }
  }, [navigate]);

  const filteredExercises = selectedMuscleGroup === 'all'
    ? exercises
    : exercises.filter(ex => ex.muscleGroup === selectedMuscleGroup);

  const handleSelectExercise = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    // Check if exercise already added
    const activeWorkout = workoutStore.getActiveWorkout();
    const alreadyAdded = activeWorkout.exercises.some(
      ex => ex.exerciseId === exerciseId
    );

    if (alreadyAdded) {
      alert('This exercise is already in your workout');
      return;
    }

    // Create new exercise entry with empty sets
    const newExercise: WorkoutSessionExercise = {
      exerciseId: exercise.id,
      exercise: exercise,
      sets: []
    };

    // Add to active workout
    workoutStore.addExerciseToActiveWorkout(newExercise);

    // Find the index of the newly added exercise
    const updatedWorkout = workoutStore.getActiveWorkout();
    const exerciseIndex = updatedWorkout.exercises.length - 1;

    // Navigate to current exercise screen
    navigate(`/active-workout/exercise/${exerciseIndex}`);
  };

  return (
    <div className="add-exercise">
      <div className="add-exercise-header">
        <h1>Add Exercise</h1>
        <button onClick={() => navigate('/active-workout')} className="btn-back">
          Back
        </button>
      </div>

      <div className="filter-section">
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
            onClick={() => handleSelectExercise(exercise.id)}
            className="exercise-btn"
          >
            {exercise.name}
            <span className="exercise-muscle-group">{exercise.muscleGroup}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddExercise;
