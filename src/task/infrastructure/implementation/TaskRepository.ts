import { Raw, Repository } from "typeorm";
import { Task } from "../../domain/Task";
import ITaskRepository from "../../domain/ITaskRepository";
import { AppDataSource } from "../data-source";
import { GetReponse } from '../../domain/GetResponse';

export class TaskRepository implements ITaskRepository {
    private readonly repository: Repository<Task>;
    
    constructor() {
        this.repository = AppDataSource.getRepository(Task);
    }
    async findByDate(date: string, page: number, limit: number): Promise<GetReponse | null> {
        const [tasks, totalCount] = await this.repository.findAndCount({
            where: {dueDate: date},
            skip: (page - 1) * limit,
            take: limit,
        });
        if(tasks){
            return {
                tasks: tasks,
                count: totalCount,
                perCount: page,

            }
        }else{
            return null;
        }

    }
    async findByUserID(userId: number,page: number, limit: number): Promise<GetReponse | null> {
        const [tasks, totalCount] = await this.repository.findAndCount({
            where: {userId: userId},
            skip: (page - 1) * limit,
            take: limit,
        });
        if(tasks){
            return {
                tasks: tasks,
                count: totalCount,
                perCount: page,

            }
        }else{
            return null;
        }
    }
    async findByStatus(status: string,page: number, limit: number): Promise<GetReponse | null> {
        const [tasks, totalCount] = await this.repository.findAndCount({
            where: {completionStatus: Raw(alias => `${alias} LIKE '%${status}%'`)},
            skip: (page - 1) * limit,
            take: limit,
        });
        if(tasks){
            return {
                tasks: tasks,
                count: totalCount,
                perCount: page,

            }
        }else{
            return null;
        }
    }
    async findByTag(tag: string,page: number, limit: number): Promise<GetReponse | null> {
        const [tasks, totalCount] = await this.repository.findAndCount({
            where: {tags: Raw(alias => `${alias} LIKE '%${tag}%'`)},
            skip: (page - 1) * limit,
            take: limit,
        });
        if(tasks){
            return {
                tasks: tasks,
                count: totalCount,
                perCount: page,

            }
        }else{
            return null;
        }
    }
    async findByResponsible(responsible: string, page: number, limit: number): Promise<GetReponse | null> {
        const [tasks, totalCount] = await this.repository.findAndCount({
            where: {responsible: Raw(alias => `${alias} LIKE '%${responsible}%'`)},
            skip: (page - 1) * limit,
            take: limit,
        });
        
        if(tasks){
            return {
                tasks: tasks,
                count: totalCount,
                perCount: page,

            }
        }else{
            return null;
        }
    }
    
    async findAndCount(page: number, limit: number): Promise<GetReponse | null> {
        const [tasks, totalCount] = await this.repository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        if(tasks){
            return {
                tasks: tasks,
                count: totalCount,
                perCount: page,

            }
        }else{
            return null;
        }
    }

    async findById(taskId: number): Promise<Task | null> {
        return await this.repository.findOneBy({id: taskId});        
    }
    async findAll(): Promise<Task[]> {
        return await this.repository.find();
    }
    async delete(task: Task): Promise<void> {
        await this.repository.remove(task);
    }
    async update(task: Task): Promise<Partial<Task>> {
        return await this.repository.save(task);
    }
    async create(task: Task): Promise<Task> {
        return await this.repository.save(task);
    }
    
  
}