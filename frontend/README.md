# SocialFitness Frontend

React + TypeScript frontend for the SocialFitness workout tracking application.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/     # Reusable components
│   │   └── Layout/     # Main layout and navigation
│   ├── data/           # Static data (exercises)
│   ├── pages/          # Page components
│   │   ├── Home/       # Homepage
│   │   ├── Workouts/   # Workout list
│   │   ├── CreateWorkout/  # Create new workout
│   │   ├── WorkoutDetail/  # Workout details
│   │   ├── WorkoutSession/ # Active workout session
│   │   └── History/    # Workout history
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   │   └── localStorage.ts  # Local storage helpers
│   ├── App.tsx         # Main app component with routing
│   └── index.tsx       # Entry point
├── package.json
└── tsconfig.json
```

## Features

### Phase 1: Personal Workout Tracker (Current)

- ✅ Exercise database with 40+ exercises across 7 muscle groups
- ✅ Create custom workouts by selecting exercises
- ✅ Track workout sessions (sets, reps, weight)
- ✅ View workout history
- ✅ All data stored locally in browser (localStorage)

### Data Storage

Currently uses `localStorage` to store:
- Workouts (saved workout templates)
- Workout sessions (completed workouts)

Data persists in the browser and is specific to the device/browser being used.

### Exercise Database

The app includes exercises for:
- Chest (Bench Press, Incline Press, etc.)
- Biceps (Curls, Hammer Curls, etc.)
- Triceps (Dips, Extensions, etc.)
- Legs (Squats, Leg Press, etc.)
- Abs (Crunches, Planks, etc.)
- Back (Pull-ups, Rows, etc.)
- Shoulders (Overhead Press, Lateral Raises, etc.)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## Next Steps

- Phase 2: Add authentication and migrate to cloud storage
- Phase 3: Statistics and progress tracking
- Phase 4: Social features

## Notes

- This is a frontend-only application (Phase 1)
- No backend required - all data stored in browser
- Designed to be easily migrated to use a backend API later
