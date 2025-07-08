import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      name: { type: String, required: true },
      muscleGroup: { type: String, required: true },
      numberOfSets: { type: Number, required: true },
      sets: [
        {
          weight: { type: Number, required: true },
          reps: { type: Number, required: true }
        }
      ]
    }
  ]
});

export default mongoose.model('Workout', workoutSchema);
