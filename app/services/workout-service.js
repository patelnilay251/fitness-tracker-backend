import Workout from '../models/workout.js'

export const save = async (newWorkout) => {
  const workout = new Workout(newWorkout);
  return workout.save();
};


export const update = async (id,updatedWorkout) => {
  const workout = Workout.
                      findByIdAndUpdate(id,updatedWorkout,{ new: true })
                        .exec();
  return workout;
};


export const get = async(id)=>{
  const workout=Workout
                          .findById(id)
                            .exec();
  return workout;
};


export const remove = async(id)=>{
  const workout=Workout
                      .findByIdAndDelete(id)
                        .exec();
  return workout;
}


export const search = async(params)=>{

  const workout=Workout.find(params)
                                .exec();

   return workout;                             

}


export const searchByEmail = async(email) => {
  const workouts = await Workout.find({ email: email }).exec();
  return workouts;
}

export const activitySearch = async(email, name) => {
  const workouts = await Workout.find({ email: email, name: name }).exec();
  return workouts;
}
