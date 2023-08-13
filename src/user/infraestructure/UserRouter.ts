import { Router } from "express";

import {
    deleteUserController,
    findByEmailUserController,
    findByIDUserController,
    logInController,
    updateUserController,
    createUserController
} from "./dependencies";

import { authenticateToken } from "../../jwt/authorization";

const userRouter = Router();

userRouter.post('/', (req, res) => createUserController.run(req, res));
userRouter.get('/:id',authenticateToken, (req, res) => findByIDUserController.run(req, res));
userRouter.put('/:id',authenticateToken, (req, res) => updateUserController.run(req, res));
userRouter.delete('/:id',authenticateToken, (req, res) => deleteUserController.run(req, res));
userRouter.post('/login', (req, res) => logInController.run(req, res));
userRouter.get('/find-by-email/:email', (req, res) => findByEmailUserController.run(req, res));

export default userRouter;