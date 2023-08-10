// Import of use cases
import { CreateTaskUseCase } from "../application/CreateTaskUseCase";
import { FindAllTasksUseCase } from "../application/FindAllTasksUseCase";
import { FindByIDTaskUseCase } from "../application/FindByIDTaskUseCase";
import { UpdateTaskUseCase } from "../application/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../application/DeleteTaskUseCase";

// Imports of Controllers
import { CreateTaskController } from "./controllers/CreateTaskController";
import { FindAllTasksController } from "./controllers/FindAllTasksController";
import { FindByIDTaskController } from "./controllers/FindByIDTaskController";
import { UpdateTaskController } from "./controllers/UpdateTaskController";
import { DeleteTaskController } from "./controllers/DeleteTaskController";

// Imports of Repositories
import { TaskRepository } from "./implementation/TaskRepository";

// Repositories
const taskRepository = new TaskRepository();

// Use cases
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const findAllTasksUseCase = new FindAllTasksUseCase(taskRepository);
const findByIDTaskUseCase = new FindByIDTaskUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

// Export controllers
export const createTaskController = new CreateTaskController(createTaskUseCase);
export const findAllTasksController = new FindAllTasksController(findAllTasksUseCase);
export const findByIDTaskController = new FindByIDTaskController(findByIDTaskUseCase);
export const updateTaskController = new UpdateTaskController(updateTaskUseCase, findByIDTaskUseCase);
export const deleteTaskController = new DeleteTaskController(deleteTaskUseCase, findByIDTaskUseCase);


