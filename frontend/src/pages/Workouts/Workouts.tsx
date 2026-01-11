import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Workout } from '../../types';
import { workoutStore } from '../../store/workoutStore';
import './Workouts.css';

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = () => {
    const savedWorkouts = workoutStore.getWorkouts();
    setWorkouts(savedWorkouts);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      workoutStore.deleteWorkout(id);
      loadWorkouts();
    }
  };

  return (
    <div className="workouts-page">
      <div className="workouts-header">
        <h1>My Workouts</h1>
        <Link to="/workouts/new" className="btn-primary">
          + Create New Workout
        </Link>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <p>No workouts yet. Create your first workout to get started!</p>
          <Link to="/workouts/new" className="btn-primary">
            Create Workout
          </Link>
        </div>
      ) : (
        <div className="workouts-grid">
          {workouts.map(workout => (
            <div key={workout.id} className="workout-card">
              <div className="workout-card-header">
                <h3>{workout.name}</h3>
                <div className="workout-card-actions">
                  <Link to={`/workouts/${workout.id}/session`} className="btn-start">
                    Start
                  </Link>
                  <Link to={`/workouts/${workout.id}`} className="btn-view">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="workout-exercise-count">
                {workout.exerciseIds.length} exercise{workout.exerciseIds.length !== 1 ? 's' : ''}
              </p>
              <p className="workout-date">
                Created: {new Date(workout.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
