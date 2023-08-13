import { LogInResponse } from "./LogInResponse";
import { User } from "./User";

export default interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(userId: number): Promise<User | null>;
    delete(user: User): Promise<void>;
    update(user: User): Promise<Partial<User>|null>;
    create(user: User): Promise<Partial<User>|null>;
    logIn(email: string, password: string): Promise<LogInResponse | null>;
}
