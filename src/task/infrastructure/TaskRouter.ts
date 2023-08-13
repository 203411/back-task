import { Router } from "express";

import {
    createTaskController,
    // findAllTasksController,
    findByIDTaskController,
    updateTaskController,
    deleteTaskController,
    findAndCountController
} from './dependencies';
import { authenticateToken } from "../../jwt/authorization";

const taskRouter = Router();

taskRouter.post('/', createTaskController.run.bind(createTaskController));
taskRouter.get('/',authenticateToken, findAndCountController.run.bind(findAndCountController));
taskRouter.get('/:id',authenticateToken, findByIDTaskController.run.bind(findByIDTaskController));
taskRouter.put('/:id',authenticateToken, updateTaskController.run.bind(updateTaskController));
taskRouter.delete('/:id',authenticateToken,  deleteTaskController.run.bind(deleteTaskController));

export default taskRouter;
