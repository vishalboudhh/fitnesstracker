import Workout from '../models/workout.model.js';

// ✅ Create a workout - ensures date saved in local time
export const createWorkout = async (req, res) => {
  try {
    const userId = req.userInfo.id;

    // Get local date only (midnight in local time)
    const localNow = new Date();
    const localDateOnly = new Date(
      localNow.getFullYear(),
      localNow.getMonth(),
      localNow.getDate()
    );

    const workout = await Workout.create({
      ...req.body,
      userId,
      date: localDateOnly, // Save clean local date
    });

    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all workouts for a user, sorted by date (newest first)
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userInfo.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get workout by a specific date
export const getWorkoutByDate = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const dateOnly = req.params.date; // e.g., "2025-07-06"

    // Use provided date as local start and end range
    const startOfDay = new Date(`${dateOnly}T00:00:00`);
    const endOfDay = new Date(`${dateOnly}T23:59:59.999`);

    const workouts = await Workout.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json(workouts);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
};
