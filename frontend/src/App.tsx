import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Workouts from './pages/Workouts/Workouts';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout';
import WorkoutDetail from './pages/WorkoutDetail/WorkoutDetail';
import WorkoutSession from './pages/WorkoutSession/WorkoutSession';
import History from './pages/History/History';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/new" element={<CreateWorkout />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/workouts/:id/session" element={<WorkoutSession />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
