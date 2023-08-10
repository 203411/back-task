import { Repository } from "typeorm";
import { Task } from "../../domain/Task";
import ITaskRepository from "../../domain/ITaskRepository";
import { AppDataSource } from "../data-source";

export class TaskRepository implements ITaskRepository {
    private readonly repository: Repository<Task>;
    
    constructor() {
        this.repository = AppDataSource.getRepository(Task);
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