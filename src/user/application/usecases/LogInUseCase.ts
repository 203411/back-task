import IUserRepository from "../../domain/IUserRepository";
import { LogInResponse } from "../../domain/LogInResponse";

export class LogInUseCase{
    constructor(private readonly userRepository: IUserRepository){}

    async run(email:string, password: string): Promise<LogInResponse | null>{
        return await this.userRepository.logIn(email, password);
    }
}