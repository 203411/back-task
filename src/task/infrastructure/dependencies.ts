// Import of use cases
import { CreateTaskUseCase } from "../application/CreateTaskUseCase";
import { FindAllTasksUseCase } from "../application/FindAllTasksUseCase";
import { FindByIDTaskUseCase } from "../application/FindByIDTaskUseCase";
import { UpdateTaskUseCase } from "../application/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../application/DeleteTaskUseCase";
import { FindAndCountUseCase } from "../application/FindAndCountUseCase";
import { FindByUserIDUseCase } from '../application/FindByUserIDUseCase';
import { FindByDateUseCase } from "../application/FindByDateUseCase";
import { FindByResponsibleUseCase } from "../application/FindByResponsibleUseCase";
import { FindByStatusUseCase } from "../application/FindByStatusTaskUseCase";
import { FindByTagUseCase } from "../application/FindByTagUseCase";

// Imports of Controllers
import { CreateTaskController } from "./controllers/CreateTaskController";
import { FindAllTasksController } from "./controllers/FindAllTasksController";
import { FindByIDTaskController } from "./controllers/FindByIDTaskController";
import { UpdateTaskController } from "./controllers/UpdateTaskController";
import { DeleteTaskController } from "./controllers/DeleteTaskController";
import { FindAndCountController } from "./controllers/FindAndCountController";
import { FindByUserIDController } from "./controllers/FindByUserIDController";
import { FindByDateController } from "./controllers/FindByDateController";
import { FindByResponsibleController } from "./controllers/FindByResponsibleController";
import { FindByStatusController } from "./controllers/FindByStatusController";
import { FindByTagController } from "./controllers/FindByTagController";

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
const findAndCountUseCase = new FindAndCountUseCase(taskRepository);
const findByUserIDUseCase = new FindByUserIDUseCase(taskRepository);
const findByDateUseCase = new FindByDateUseCase(taskRepository);
const findByResponsibleUseCase = new FindByResponsibleUseCase(taskRepository);
const findByStatusUseCase = new FindByStatusUseCase(taskRepository);
const findByTagUseCase = new FindByTagUseCase(taskRepository);


// Export controllers
export const createTaskController = new CreateTaskController(createTaskUseCase);
export const findAllTasksController = new FindAllTasksController(findAllTasksUseCase);
export const findByIDTaskController = new FindByIDTaskController(findByIDTaskUseCase);
export const updateTaskController = new UpdateTaskController(updateTaskUseCase, findByIDTaskUseCase);
export const deleteTaskController = new DeleteTaskController(deleteTaskUseCase, findByIDTaskUseCase);
export const findAndCountController = new FindAndCountController(findAndCountUseCase);
export const findByUserIDController = new FindByUserIDController(findByUserIDUseCase);
export const findByDateController = new FindByDateController(findByDateUseCase);
export const findByResponsibleController = new FindByResponsibleController(findByResponsibleUseCase);
export const findByStatusController = new FindByStatusController(findByStatusUseCase);
export const findByTagController = new FindByTagController(findByTagUseCase);

