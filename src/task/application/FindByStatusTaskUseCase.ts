import { GetReponse } from "../domain/GetResponse";
import ITaskRepository from "../domain/ITaskRepository";

export class FindByStatusUseCase{
    constructor(private readonly taskRepository: ITaskRepository){}

    async run(status: string, page: number, limit: number): Promise<GetReponse|null>{
        return await this.taskRepository.findByStatus(status, page, limit);
    }
}