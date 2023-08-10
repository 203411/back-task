import { Task } from '../domain/Task';
import ITaskRepository from '../domain/ITaskRepository';

export class FindByIDTaskUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}

    async run(id: number): Promise<Task|null>{
        return await this.taskRepository.findById(id);
    }
}
