import { GetReponse } from "../domain/GetResponse";
import ITaskRepository from "../domain/ITaskRepository";

export class FindByResponsibleUseCase{
    constructor(private readonly taskRepository: ITaskRepository){}

    async run(responsible: string,page: number, limit: number): Promise<GetReponse|null>{
        return await this.taskRepository.findByResponsible(responsible, page, limit);
    }
}