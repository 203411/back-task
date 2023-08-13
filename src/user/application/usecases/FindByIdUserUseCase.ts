import IUserRepository from "../../domain/IUserRepository";
import { User } from "../../domain/User";

export class FindByIDUserUseCase{
    constructor(private readonly userRepository: IUserRepository){}

    async run(id: number): Promise<User|null>{
        const user = await this.userRepository.findById(id);
        return user;
    }
}