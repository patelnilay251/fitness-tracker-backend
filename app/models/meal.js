import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  email:String,
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

const Meal = mongoose.model('meal', mealSchema);

export default Meal;