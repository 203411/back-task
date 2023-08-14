import { GetReponse } from "../domain/GetResponse";
import ITaskRepository from "../domain/ITaskRepository";
export class FindByTagUseCase{
    constructor(private readonly taskRepository: ITaskRepository){}

    async run(tag: string, page: number, limit: number): Promise<GetReponse|null>{
        return await this.taskRepository.findByTag(tag, page, limit);
    }
}