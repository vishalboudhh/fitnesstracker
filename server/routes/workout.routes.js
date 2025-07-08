import express from 'express';
import {
  createWorkout,
  getAllWorkouts,
  getWorkoutByDate
} from '../controllers/workout.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createWorkout);
router.get('/', authMiddleware, getAllWorkouts);
router.get('/date/:date', authMiddleware, getWorkoutByDate);

export default router;
