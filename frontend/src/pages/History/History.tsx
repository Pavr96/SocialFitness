import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WorkoutSession } from '../../types';
import { workoutStore } from '../../store/workoutStore';
import './History.css';

const History: React.FC = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const savedSessions = workoutStore.getWorkoutSessions();
    setSessions(savedSessions);
  };

  return (
    <div className="history-page">
      <h1>Workout History</h1>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <p>No workout sessions yet. Start a workout to track your progress!</p>
          <Link to="/workouts" className="btn-primary">
            Go to Workouts
          </Link>
        </div>
      ) : (
        <div className="sessions-list">
          {sessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <div>
                  <h3>{session.workoutName || 'Custom Workout'}</h3>
                  <p className="session-date">
                    {new Date(session.date).toLocaleString()}
                  </p>
                </div>
                {session.duration && (
                  <span className="session-duration">
                    {session.duration} min
                  </span>
                )}
              </div>
              
              <div className="session-exercises-summary">
                <p><strong>{session.exercises.length}</strong> exercises completed</p>
                {session.notes && (
                  <p className="session-notes">{session.notes}</p>
                )}
              </div>

              <div className="session-details">
                <h4>Exercises:</h4>
                <ul>
                  {session.exercises.map((exercise, index) => {
                    const completedSets = exercise.sets.filter(s => s.completed).length;
                    const totalSets = exercise.sets.length;
                    return (
                      <li key={index}>
                        {exercise.exercise.name} - {completedSets}/{totalSets} sets
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
