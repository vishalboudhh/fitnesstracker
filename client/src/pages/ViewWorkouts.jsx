import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from '../services/axios';

const ViewWorkouts = () => {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayWorkouts, setDayWorkouts] = useState([]);

  // 🔧 Utility to convert date to YYYY-MM-DD in local time
  const toLocalDateString = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-CA'); // e.g., "2025-07-06"
  };

  // Fetch all workouts
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/workouts');
        setAllWorkouts(res.data);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
    })();
  }, []);

  // 🟢 Get all dates that have workouts
  const workoutDates = new Set(
    allWorkouts.map(w => toLocalDateString(w.date))
  );

  // 📅 When user selects a date
  const onDateChange = async (value) => {
    const dateStr = value.toLocaleDateString('en-CA');

    if (selectedDate === dateStr) {
      setSelectedDate(null);
      setDayWorkouts([]);
      return;
    }

    setSelectedDate(dateStr);

    try {
      const res = await axios.get(`/workouts/date/${dateStr}`);
      setDayWorkouts(res.data);
    } catch (err) {
      console.error('Error loading workout for selected date:', err);
    }
  };

  // 💡 Highlight dates that have workout entries
  const tileClassName = ({ date }) => {
    const dStr = date.toLocaleDateString('en-CA');
    return workoutDates.has(dStr) ? 'highlighted-date' : null;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📆 Workout Calendar</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <Calendar
          onChange={onDateChange}
          tileClassName={tileClassName}
          className="react-calendar"
        />
      </div>

      {selectedDate && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
            Workout on {selectedDate}
          </h3>

          {dayWorkouts.length === 0 ? (
            <p className="text-red-500">No workout found for this date.</p>
          ) : (
            dayWorkouts.map((workout, index) => (
              <div
                key={index}
                className="border p-4 mb-4 rounded shadow bg-white dark:bg-gray-800"
              >
                {workout.exercises.map((ex, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-semibold text-lg text-gray-800 dark:text-white">
                      {ex.name}{' '}
                      <span className="text-gray-500 dark:text-gray-300">
                        ({ex.muscleGroup})
                      </span>
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {ex.sets.map((set, j) => (
                        <li key={j}>
                          Set {j + 1}: {set.reps} reps × {set.weight} kg
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ViewWorkouts;
