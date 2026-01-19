import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { workoutStore } from '../../store/workoutStore';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    workoutStore.startWorkout();
    navigate('/active-workout');
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Welcome to SocialFitness</h1>
        <p>Track your workouts and monitor your progress</p>
      </div>
      
      <div className="home-actions">
        <button onClick={handleStartWorkout} className="action-card action-button">
          <h2>🏋️ Start Workout</h2>
          <p>Begin a new workout session</p>
        </button>
        
        <Link to="/history" className="action-card">
          <h2>📊 Workout History</h2>
          <p>View your past workout sessions</p>
        </Link>
      </div>

      <div className="home-info">
        <h2>Getting Started</h2>
        <ol>
          <li>Click "Start Workout" to begin a new session</li>
          <li>Add exercises from the exercise list</li>
          <li>Log your sets, reps, and weight for each exercise</li>
          <li>Stop the workout when finished - all data will be saved</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
