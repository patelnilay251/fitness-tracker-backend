import express from 'express';

import * as goalController from '../controllers/goal-controller.js';

const goalRouter = express.Router();

goalRouter.route('/')
              .post(goalController.post)
              .get(goalController.index);

goalRouter.route('/:id')
              .put(goalController.put)
              .get(goalController.findbyId)
              .delete(goalController.deletebyid);

export default goalRouter;
