import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutStore } from '../../store/workoutStore';
import { WorkoutSessionExercise } from '../../types';
import './ActiveWorkout.css';

const ActiveWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<WorkoutSessionExercise[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);

  useEffect(() => {
    const activeWorkout = workoutStore.getActiveWorkout();
    if (!activeWorkout.isActive) {
      // No active workout, redirect to home
      navigate('/');
      return;
    }

    setExercises([...activeWorkout.exercises]);
    setStartTime(activeWorkout.startTime);
  }, [navigate]);

  const handleAddExercise = () => {
    navigate('/active-workout/add-exercise');
  };

  const handleExerciseClick = (index: number) => {
    navigate(`/active-workout/exercise/${index}`);
  };

  // Refresh exercises list when component is focused (returning from other screens)
  useEffect(() => {
    const interval = setInterval(() => {
      const activeWorkout = workoutStore.getActiveWorkout();
      if (activeWorkout.isActive) {
        setExercises([...activeWorkout.exercises]);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, []);

  // Also refresh when navigating back (using focus event)
  useEffect(() => {
    const handleFocus = () => {
      const activeWorkout = workoutStore.getActiveWorkout();
      if (activeWorkout.isActive) {
        setExercises([...activeWorkout.exercises]);
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleStopWorkout = () => {
    if (window.confirm('Stop workout and save all exercises?')) {
      const session = workoutStore.stopWorkout();
      if (session) {
        navigate('/history');
      } else {
        alert('No exercises to save. Workout cancelled.');
        navigate('/');
      }
    }
  };

  const getDuration = (): string => {
    if (!startTime) return '0:00';
    const start = new Date(startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000); // seconds
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="active-workout">
      <div className="active-workout-header">
        <div>
          <h1>Active Workout</h1>
          <p className="workout-duration">Duration: {getDuration()}</p>
        </div>
        <button onClick={handleStopWorkout} className="btn-stop-workout">
          Stop Workout
        </button>
      </div>

      <div className="exercises-section">
        <div className="exercises-header">
          <h2>Exercises ({exercises.length})</h2>
          <button onClick={handleAddExercise} className="btn-add-exercise">
            + Add Exercise
          </button>
        </div>

        {exercises.length === 0 ? (
          <div className="empty-state">
            <p>No exercises added yet. Click "Add Exercise" to get started!</p>
            <button onClick={handleAddExercise} className="btn-primary">
              Add Your First Exercise
            </button>
          </div>
        ) : (
          <div className="exercises-list">
            {exercises.map((exercise, index) => {
              const totalSets = exercise.sets.length;
              const completedSets = exercise.sets.filter(s => s.completed).length;
              
              return (
                <div
                  key={index}
                  className="exercise-card"
                  onClick={() => handleExerciseClick(index)}
                >
                  <div className="exercise-info">
                    <h3>{exercise.exercise.name}</h3>
                    <span className="muscle-group-badge">{exercise.exercise.muscleGroup}</span>
                  </div>
                  <div className="exercise-stats">
                    <span>{completedSets}/{totalSets} sets</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveWorkout;
