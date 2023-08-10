import { Task } from '../domain/Task';
import ITaskRepository from '../domain/ITaskRepository';

export class FindAllTasksUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}

    async run(): Promise<Task[]>{
        return await this.taskRepository.findAll();
    }
}
