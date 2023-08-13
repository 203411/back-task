import { GetReponse } from '../domain/GetResponse';
import { TaskRepository } from '../infrastructure/implementation/TaskRepository';

export class FindAndCountUseCase{
    constructor(private readonly taskRepository: TaskRepository ){}

    async run(page: number, limit: number): Promise<GetReponse|null>{
        return await this.taskRepository.findAndCount(page, limit);
    }
}