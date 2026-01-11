import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Workout } from '../../types';
import { workoutStore } from '../../store/workoutStore';
import { getExerciseById } from '../../data/exercises';
import './WorkoutDetail.css';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    if (id) {
      const foundWorkout = workoutStore.getWorkoutById(id);
      if (foundWorkout) {
        setWorkout(foundWorkout);
      } else {
        navigate('/workouts');
      }
    }
  }, [id, navigate]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-detail">
      <div className="workout-detail-header">
        <h1>{workout.name}</h1>
        <button
          onClick={() => navigate(`/workouts/${workout.id}/session`)}
          className="btn-primary"
        >
          Start Workout
        </button>
      </div>

      <div className="workout-info">
        <p>
          <strong>Exercises:</strong> {workout.exerciseIds.length}
        </p>
        <p>
          <strong>Created:</strong> {new Date(workout.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="exercises-list">
        <h2>Exercises</h2>
        <p className="info-text">
          💡 Sets, reps, and weights will be added during the workout
        </p>
        {workout.exerciseIds.map((exerciseId, index) => {
          const exercise = getExerciseById(exerciseId);
          if (!exercise) return null;
          
          return (
            <div key={exerciseId} className="exercise-item">
              <div className="exercise-header">
                <h3>{exercise.name}</h3>
                <span className="muscle-group-badge">
                  {exercise.muscleGroup}
                </span>
              </div>
              {exercise.description && (
                <p className="exercise-description">{exercise.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutDetail;
