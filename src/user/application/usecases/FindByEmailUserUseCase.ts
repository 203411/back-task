import IUserRepository from "../../domain/IUserRepository";
import { User } from "../../domain/User";
export class FindByEmailUserUseCase{
    constructor(
        private readonly userRepository: IUserRepository
    ){}

    async run(email: string): Promise<User | null>{
        const user = await this.userRepository.findByEmail(email)
        return user;
    }
}