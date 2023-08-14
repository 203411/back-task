import { GetReponse } from './GetResponse';
import { Task } from './Task';

export default interface ITaskRepository {
    findByDate(date: string, page: number, limit: number): Promise<GetReponse | null>;
    findByUserID(userId: number,page: number, limit: number): Promise<GetReponse | null>;
    findByStatus(status: string,page: number, limit: number): Promise<GetReponse | null>;
    findByTag(tag: string, page: number, limit: number): Promise<GetReponse | null>;
    findByResponsible(responsible: string, page: number, limit: number): Promise<GetReponse | null>;
    findById(taskId: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    delete(task: Task): Promise<void>;
    update(task: Task): Promise<Partial<Task>>;
    create(task: Task): Promise<Task>;
    findAndCount(page: number, limit: number): Promise<GetReponse|null>;
}
