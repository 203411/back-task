import { Task } from '../domain/Task';
import ITaskRepository from '../domain/ITaskRepository';

export class UpdateTaskUseCase{
    constructor(private readonly taskRepository:ITaskRepository){}

    async run(task: Task, updatedTaskData: Partial<Task>): Promise<Partial<Task>>{
        const updateTask = {...task, ...updatedTaskData};
        return await this.taskRepository.update(updateTask);
    }
}
