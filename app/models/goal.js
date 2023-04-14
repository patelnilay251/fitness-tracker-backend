import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  email:String,
  activityName: String,
  goalType: {
    type: String,
    enum: ['distance', 'time', 'steps', 'heartPoints']
  },
  goalValue: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model('goal', goalSchema);

export default Goal;