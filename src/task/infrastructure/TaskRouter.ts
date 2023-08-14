import { Router } from "express";

import {
    createTaskController,
    // findAllTasksController,
    findByIDTaskController,
    updateTaskController,
    deleteTaskController,
    findAndCountController,
    findByUserIDController,
    findByDateController,
    findByResponsibleController,
    findByStatusController,
    findByTagController
} from './dependencies';
import { authenticateToken } from "../../jwt/authorization";

const taskRouter = Router();

taskRouter.post('/',authenticateToken, createTaskController.run.bind(createTaskController));
taskRouter.get('/',authenticateToken, findAndCountController.run.bind(findAndCountController));

taskRouter.get('/status',authenticateToken, findByStatusController.run.bind(findByStatusController));
taskRouter.get('/user/:userID',authenticateToken, findByUserIDController.run.bind(findByUserIDController));
taskRouter.get('/date',authenticateToken, findByDateController.run.bind(findByDateController));
taskRouter.get('/responsible',authenticateToken, findByResponsibleController.run.bind(findByResponsibleController));
taskRouter.get('/tag',authenticateToken, findByTagController.run.bind(findByTagController));
taskRouter.get('/:id',authenticateToken, findByIDTaskController.run.bind(findByIDTaskController));
taskRouter.put('/:id',authenticateToken, updateTaskController.run.bind(updateTaskController));
taskRouter.delete('/:id',authenticateToken,  deleteTaskController.run.bind(deleteTaskController));


export default taskRouter;
