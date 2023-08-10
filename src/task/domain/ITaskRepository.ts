import { Task } from './Task';

export default interface ITaskRepository {
    findById(taskId: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    delete(task: Task): Promise<void>;
    update(task: Task): Promise<Partial<Task>>;
    create(task: Task): Promise<Task>;
}
