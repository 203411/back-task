import { Router } from "express";

import {
    createTaskController,
    findAllTasksController,
    findByIDTaskController,
    updateTaskController,
    deleteTaskController,
} from './dependencies';

const taskRouter = Router();

taskRouter.post('/', createTaskController.run.bind(createTaskController));
taskRouter.get('/', findAllTasksController.run.bind(findAllTasksController));
taskRouter.get('/:id', findByIDTaskController.run.bind(findByIDTaskController));
taskRouter.put('/:id', updateTaskController.run.bind(updateTaskController));
taskRouter.delete('/:id',  deleteTaskController.run.bind(deleteTaskController));

export default taskRouter;
