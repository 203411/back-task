import { Task } from "../domain/Task";
import ITaskRepository from '../domain/ITaskRepository';

export class DeleteTaskUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}

    async run(task: Task): Promise<void>{
        await this.taskRepository.delete(task);
    }
}
