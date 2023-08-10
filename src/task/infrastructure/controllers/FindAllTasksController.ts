import { Task } from "../../domain/Task";
import { FindAllTasksUseCase } from "../../application/FindAllTasksUseCase";
import saveLogFile from "../LogsErrorControl";
import { Response,Request } from "express";

export class FindAllTasksController{
    constructor(private readonly findAllTasksUseCase: FindAllTasksUseCase){}

    async run(req: Request, res: Response): Promise<Response>{
        try{const tasks: Task[] = await this.findAllTasksUseCase.run();
            const taskCount: number = tasks.length;

            if(taskCount === 0){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'Tasks found',
                data: tasks,
                count: taskCount
            });
        }catch(err){
            saveLogFile(err);
            return res.status(500).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }
}