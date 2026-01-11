import { Exercise, MuscleGroup } from '../types';

export const exercises: Exercise[] = [
  // Chest exercises
  {
    id: 'chest-1',
    name: 'Bench Press',
    muscleGroup: 'chest',
    description: 'Classic chest exercise performed on a flat bench',
    instructions: 'Lie on bench, lower bar to chest, press up'
  },
  {
    id: 'chest-2',
    name: 'Incline Bench Press',
    muscleGroup: 'chest',
    description: 'Bench press performed on an inclined bench',
    instructions: 'Set bench to 30-45 degree angle, perform bench press'
  },
  {
    id: 'chest-3',
    name: 'Decline Bench Press',
    muscleGroup: 'chest',
    description: 'Bench press performed on a declined bench'
  },
  {
    id: 'chest-4',
    name: 'Dumbbell Flyes',
    muscleGroup: 'chest',
    description: 'Isolation exercise for chest muscles'
  },
  {
    id: 'chest-5',
    name: 'Push-ups',
    muscleGroup: 'chest',
    description: 'Bodyweight chest exercise'
  },
  
  // Biceps exercises
  {
    id: 'biceps-1',
    name: 'Bicep Curls',
    muscleGroup: 'biceps',
    description: 'Classic bicep isolation exercise'
  },
  {
    id: 'biceps-2',
    name: 'Hammer Curls',
    muscleGroup: 'biceps',
    description: 'Bicep curls with neutral grip'
  },
  {
    id: 'biceps-3',
    name: 'Concentration Curls',
    muscleGroup: 'biceps',
    description: 'Seated isolation exercise for biceps'
  },
  {
    id: 'biceps-4',
    name: 'Barbell Curls',
    muscleGroup: 'biceps',
    description: 'Bicep curls using a barbell'
  },
  
  // Triceps exercises
  {
    id: 'triceps-1',
    name: 'Tricep Dips',
    muscleGroup: 'triceps',
    description: 'Bodyweight tricep exercise'
  },
  {
    id: 'triceps-2',
    name: 'Overhead Tricep Extension',
    muscleGroup: 'triceps',
    description: 'Isolation exercise for triceps'
  },
  {
    id: 'triceps-3',
    name: 'Close-Grip Bench Press',
    muscleGroup: 'triceps',
    description: 'Bench press with narrow grip targeting triceps'
  },
  {
    id: 'triceps-4',
    name: 'Tricep Pushdowns',
    muscleGroup: 'triceps',
    description: 'Cable machine tricep exercise'
  },
  
  // Legs exercises
  {
    id: 'legs-1',
    name: 'Squats',
    muscleGroup: 'legs',
    description: 'Fundamental leg exercise'
  },
  {
    id: 'legs-2',
    name: 'Leg Press',
    muscleGroup: 'legs',
    description: 'Machine-based leg exercise'
  },
  {
    id: 'legs-3',
    name: 'Lunges',
    muscleGroup: 'legs',
    description: 'Unilateral leg exercise'
  },
  {
    id: 'legs-4',
    name: 'Calf Raises',
    muscleGroup: 'legs',
    description: 'Isolation exercise for calves'
  },
  {
    id: 'legs-5',
    name: 'Deadlifts',
    muscleGroup: 'legs',
    description: 'Compound lower body exercise'
  },
  {
    id: 'legs-6',
    name: 'Leg Curls',
    muscleGroup: 'legs',
    description: 'Isolation exercise for hamstrings'
  },
  
  // Abs exercises
  {
    id: 'abs-1',
    name: 'Crunches',
    muscleGroup: 'abs',
    description: 'Basic abdominal exercise'
  },
  {
    id: 'abs-2',
    name: 'Planks',
    muscleGroup: 'abs',
    description: 'Isometric core exercise'
  },
  {
    id: 'abs-3',
    name: 'Leg Raises',
    muscleGroup: 'abs',
    description: 'Lower ab exercise'
  },
  {
    id: 'abs-4',
    name: 'Russian Twists',
    muscleGroup: 'abs',
    description: 'Rotational core exercise'
  },
  {
    id: 'abs-5',
    name: 'Mountain Climbers',
    muscleGroup: 'abs',
    description: 'Dynamic core exercise'
  },
  
  // Back exercises
  {
    id: 'back-1',
    name: 'Pull-ups',
    muscleGroup: 'back',
    description: 'Bodyweight back exercise'
  },
  {
    id: 'back-2',
    name: 'Lat Pulldowns',
    muscleGroup: 'back',
    description: 'Machine-based back exercise'
  },
  {
    id: 'back-3',
    name: 'Rows',
    muscleGroup: 'back',
    description: 'Horizontal pulling exercise'
  },
  {
    id: 'back-4',
    name: 'T-Bar Rows',
    muscleGroup: 'back',
    description: 'Bent-over rowing variation'
  },
  
  // Shoulders exercises
  {
    id: 'shoulders-1',
    name: 'Overhead Press',
    muscleGroup: 'shoulders',
    description: 'Vertical pressing exercise for shoulders'
  },
  {
    id: 'shoulders-2',
    name: 'Lateral Raises',
    muscleGroup: 'shoulders',
    description: 'Isolation exercise for side delts'
  },
  {
    id: 'shoulders-3',
    name: 'Front Raises',
    muscleGroup: 'shoulders',
    description: 'Isolation exercise for front delts'
  },
  {
    id: 'shoulders-4',
    name: 'Rear Delt Flyes',
    muscleGroup: 'shoulders',
    description: 'Isolation exercise for rear delts'
  }
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(ex => ex.id === id);
};

export const getExercisesByMuscleGroup = (muscleGroup: MuscleGroup): Exercise[] => {
  return exercises.filter(ex => ex.muscleGroup === muscleGroup);
};

export const getAllMuscleGroups = (): MuscleGroup[] => {
  return ['chest', 'biceps', 'triceps', 'legs', 'abs', 'back', 'shoulders'];
};
