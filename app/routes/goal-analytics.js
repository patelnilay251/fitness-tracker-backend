import express from 'express';

import * as goalAnalytics from '../controllers/goal-analytics.js';

const goalAnalyticsRouter = express.Router();


goalAnalyticsRouter.route('/caloriesBurned')
    .post(goalAnalytics.getAggregateData);

goalAnalyticsRouter.route('/caloriesBurned/badges')
    .post(goalAnalytics.getBadgeData);

goalAnalyticsRouter.route('/caloriesGained/meals')
    .post(goalAnalytics.getCalorieConsumed);

export default goalAnalyticsRouter;
