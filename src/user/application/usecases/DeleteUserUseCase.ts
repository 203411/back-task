import IUserRepository from "../../domain/IUserRepository";
import { User } from "../../domain/User";

export class DeleteUserUseCase{
    constructor(private readonly userRepository: IUserRepository){}

    async run(user: User): Promise<void>{
        await this.userRepository.delete(user);
    }
}