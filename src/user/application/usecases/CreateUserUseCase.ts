import IUserRepository from "../../domain/IUserRepository";
import { User } from "../../domain/User";

export class CreateUserUseCase{
    constructor(private readonly userRepository: IUserRepository){}
    
    async run(user: User): Promise<Partial<User>|null>{
        return await this.userRepository.create(user);
    }
}