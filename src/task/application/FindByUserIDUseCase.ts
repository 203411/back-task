import { GetReponse } from "../domain/GetResponse";
import ITaskRepository from "../domain/ITaskRepository";

export class FindByUserIDUseCase{
    constructor(private readonly taskRepository: ITaskRepository){}

    async run(userId: number, page: number, limit: number): Promise<GetReponse|null>{
        return await this.taskRepository.findByUserID(userId, page, limit);
    }
}