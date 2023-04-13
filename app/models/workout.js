import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: String,
  date: Date,
  timeDuration: Number,
  heartPoints: Number,
  distance: Number,
  steps:Number,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
});

const Workout = mongoose.model('workout', workoutSchema);

export default Workout;