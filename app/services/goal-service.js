import Goal from '../models/goal.js'

export const save = async (newGoal) => {
  const goal = new Goal(newGoal);
  return goal.save();
};


export const update = async (id,updatedGoal) => {
  const goal = Goal.
                      findByIdAndUpdate(id,updatedGoal,{ new: true })
                        .exec();
  return goal;
};


export const get = async(id)=>{
  const goal=Goal
                          .findById(id)
                            .exec();
  return goal;
};


export const remove = async(id)=>{
  const goal=Goal
                      .findByIdAndDelete(id)
                        .exec();
  return goal;
}


export const search = async(params)=>{

  const goal=Goal.find(params)
                                .exec();

   return goal;                             

}
