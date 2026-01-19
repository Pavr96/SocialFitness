import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ActiveWorkout from './pages/ActiveWorkout/ActiveWorkout';
import AddExercise from './pages/AddExercise/AddExercise';
import CurrentExercise from './pages/CurrentExercise/CurrentExercise';
import History from './pages/History/History';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/active-workout" element={<ActiveWorkout />} />
          <Route path="/active-workout/add-exercise" element={<AddExercise />} />
          <Route path="/active-workout/exercise/:index" element={<CurrentExercise />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
