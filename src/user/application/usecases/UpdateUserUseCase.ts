import IUserRepository from "../../domain/IUserRepository";
import { User } from "../../domain/User";

export class UpdateUserUseCase{
    constructor(private readonly userRepository: IUserRepository){}

    async run(user: User, updatedUserData: Partial<User>): Promise<Partial<User>|null>{
        const updatedUser = {...user, ...updatedUserData}
        return await this.userRepository.update(updatedUser);
    }
}