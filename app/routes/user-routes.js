import express from 'express';

import * as userController from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/')
              .post(userController.post)
              .get(userController.index);

userRouter.route('/:id')
              .put(userController.put)
              .get(userController.findbyId)
              .delete(userController.deletebyid);

export default userRouter;
