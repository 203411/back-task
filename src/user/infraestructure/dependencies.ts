// Import of use cases
import { CreateUserUseCase } from "../application/usecases/CreateUserUseCase";
import { FindByIDUserUseCase } from "../application/usecases/FindByIdUserUseCase";
import { UpdateUserUseCase } from "./../application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "./../application/usecases/DeleteUserUseCase";
import { LogInUseCase } from "./../application/usecases/LogInUseCase";
import { FindByEmailUserUseCase } from "../application/usecases/FindByEmailUserUseCase";

// Imports of Controllers
import { CreateUserController } from "./controllers/CreateUserController";
import { FindByIDUserController } from "./controllers/FindByIdUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { LogInController } from "./controllers/LogInController";
import { FindByEmailUserController } from "./controllers/FindByEmailController";

// Imports of Repositories
import { UserRepository } from "./implements/UserRepository";

const userRepository = new UserRepository();

// Instances of use cases
const createUserUseCase = new CreateUserUseCase(userRepository);
const findByIDUserUseCase = new FindByIDUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const logInUseCase = new LogInUseCase(userRepository);
const findByEmailUserUseCase = new FindByEmailUserUseCase(userRepository);

// Instances of Controllers
const createUserController = new CreateUserController(createUserUseCase, findByEmailUserUseCase);
const findByIDUserController = new FindByIDUserController(findByIDUserUseCase);
const updateUserController = new UpdateUserController(updateUserUseCase, findByIDUserUseCase);
const deleteUserController = new DeleteUserController(findByIDUserUseCase, deleteUserUseCase);
const logInController = new LogInController(logInUseCase);
const findByEmailUserController = new FindByEmailUserController(findByEmailUserUseCase);

export {
    createUserController,
    findByIDUserController,
    updateUserController,
    deleteUserController,
    logInController,
    findByEmailUserController
}
