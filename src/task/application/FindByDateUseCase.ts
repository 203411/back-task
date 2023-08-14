import { GetReponse } from "../domain/GetResponse";
import ITaskRepository from "../domain/ITaskRepository";

export class FindByDateUseCase{
    constructor(private readonly taskRepository: ITaskRepository){}

    async run(date: string, page: number, limit: number): Promise<GetReponse|null>{
        return await this.taskRepository.findByDate(date, page, limit);
    }
}