import workoutRouter from './workout-routes.js'
import goalRouter from './goal-routes.js';

const route = (app) => {
  app.use('/workout', workoutRouter);
  app.use('/goal',goalRouter);

};

export default route;