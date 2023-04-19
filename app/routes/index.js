import workoutRouter from './workout-routes.js'
import goalRouter from './goal-routes.js';
import goalAnalyticsRouter from './goal-analytics.js';
import userRouter from './user-routes.js';

const route = (app) => {
  app.use('/workout', workoutRouter);
  app.use('/goal', goalRouter);
  app.use('/goalAnalytics', goalAnalyticsRouter)
  app.use('/user', userRouter)

};

export default route;