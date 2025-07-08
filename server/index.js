import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
