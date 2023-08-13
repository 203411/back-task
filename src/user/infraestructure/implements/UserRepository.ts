import { Repository } from "typeorm";
import IUserRepository from "../../domain/IUserRepository";
import { LogInResponse } from "../../domain/LogInResponse";
import { User } from "../../domain/User";
import { AppDataSource } from "../data-source";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export class UserRepository implements IUserRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({email: email});
    }

    async delete(user: User): Promise<void> {
        await this.repository.delete(user);
    }
    
    async logIn(email: string, password: string): Promise<LogInResponse | null> {
        const user = await this.repository.findOneBy({email: email});
        if(!user){
            return null;
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return null;
        }
        const token = jwt.sign({_id: user.id?.toString(), email: user.email}, process.env.SECRET_KEY!, {expiresIn: '2 days',});

        return {
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: token
            
        }
    }
    
    async findById(userId: number): Promise<User | null> {
        return await this.repository.findOneBy({id: userId});
    }
    
    async update(user: User): Promise<Partial<User> | null> {
        const updatedUser = await this.repository.save(user);
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        };
    }
    
    async create(user: User): Promise<Partial<User> | null> {
        const createdUser = await this.repository.create(user);
        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        }
    }
}