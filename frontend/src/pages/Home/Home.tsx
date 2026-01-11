import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home-header">
        <h1>Welcome to SocialFitness</h1>
        <p>Track your workouts and monitor your progress</p>
      </div>
      
      <div className="home-actions">
        <Link to="/workouts" className="action-card">
          <h2>💪 My Workouts</h2>
          <p>View and manage your workout routines</p>
        </Link>
        
        <Link to="/history" className="action-card">
          <h2>📊 Workout History</h2>
          <p>View your past workout sessions</p>
        </Link>
      </div>

      <div className="home-info">
        <h2>Getting Started</h2>
        <ol>
          <li>Create a new workout by selecting exercises</li>
          <li>Start a workout session to log your exercises</li>
          <li>Track your progress in the history section</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
