import { useState } from 'react';
import axios from '../services/axios';

const AddWorkout = () => {
  const [exercises, setExercises] = useState([
    {
      name: '',
      muscleGroup: '',
      numberOfSets: 1,
      sets: [{ weight: '', reps: '' }]
    }
  ]);

  const handleExerciseChange = (i, e) => {
    const updated = [...exercises];
    updated[i][e.target.name] = e.target.value;
    if (e.target.name === 'numberOfSets') {
      const n = parseInt(e.target.value);
      updated[i].sets = Array(n).fill(0).map((_, j) => updated[i].sets[j] || { weight: '', reps: '' });
    }
    setExercises(updated);
  };

  const handleSetChange = (i, j, e) => {
    const updated = [...exercises];
    updated[i].sets[j][e.target.name] = e.target.value;
    setExercises(updated);
  };

  const addExercise = () => {
    setExercises([...exercises, {
      name: '',
      muscleGroup: '',
      numberOfSets: 1,
      sets: [{ weight: '', reps: '' }]
    }]);
  };

  const handleSubmit = async () => {
    const formatted = exercises.map(ex => ({
      ...ex,
      numberOfSets: parseInt(ex.numberOfSets),
      sets: ex.sets.map(s => ({
        weight: parseFloat(s.weight),
        reps: parseInt(s.reps)
      }))
    }));
    await axios.post('/workouts', { exercises: formatted });
    alert('Workout logged!');
    setExercises([
      {
        name: '',
        muscleGroup: '',
        numberOfSets: 1,
        sets: [{ weight: '', reps: '' }]
      }
    ]);
  };

  return (
    <div className="py-24 px-4 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          🏋️ Add Your Workout
        </h2>

        {exercises.map((exercise, i) => (
          <div
            key={i}
            className="mb-8 p-6 border-l-4 border-blue-500 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
              Exercise {i + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                name="name"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(i, e)}
                placeholder="Exercise Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="muscleGroup"
                value={exercise.muscleGroup}
                onChange={(e) => handleExerciseChange(i, e)}
                placeholder="Muscle Group"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="numberOfSets"
                value={exercise.numberOfSets}
                min={1}
                onChange={(e) => handleExerciseChange(i, e)}
                placeholder="Number of Sets"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {exercise.sets.map((set, j) => (
              <div key={j} className="grid grid-cols-2 gap-4 mb-2">
                <input
                  name="weight"
                  value={set.weight}
                  onChange={(e) => handleSetChange(i, j, e)}
                  placeholder={`Set ${j + 1} Weight (kg)`}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  name="reps"
                  value={set.reps}
                  onChange={(e) => handleSetChange(i, j, e)}
                  placeholder={`Set ${j + 1} Reps`}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button
            onClick={addExercise}
            className="px-6 py-2 bg-blue-400 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
          >
            ➕ Add Another Exercise
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            ✅ Submit Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkout;
