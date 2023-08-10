import { Task } from "../domain/Task";
import ITaskRepository from '../domain/ITaskRepository';

export class CreateTaskUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}

    async run(task: Task): Promise<Task|null>{
        return await this.taskRepository.create(task);
    }
}
