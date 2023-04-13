import workoutRouter from './workout-routes.js'

const route = (app) => {
  app.use('/workout', workoutRouter);
};

export default route;