import { Request, Response } from 'express';
import { DeleteTaskUseCase } from '../../application/DeleteTaskUseCase';
import { FindByIDTaskUseCase } from '../../application/FindByIDTaskUseCase';
import saveLogFile from '../LogsErrorControl';
import { validationResult } from 'express-validator';

export class DeleteTaskController {
    constructor(
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly findByIDTaskUseCase: FindByIDTaskUseCase,
    ) {}
    
    async run(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try {

            const { id } = req.params;
        
            const taskId = isNaN(Number(id)) ? null : Number(id);
        
            if (!taskId) {
                return res.status(400).json({
                    error: true,
                    message: 'Invalid task ID',
                });
            }
        
            // Buscar la tarea a eliminar
            const existingTask = await this.findByIDTaskUseCase.run(taskId);
        
            if (!existingTask) {
                return res.status(404).json({
                    error: true,
                    message: 'Task not found',
                });
            }
        
            await this.deleteTaskUseCase.run(existingTask);
        
            return res.status(200).json({
                error: false,
                message: 'Task deleted successfully',
            });
        } catch (err) {
            saveLogFile(err);
            return res.status(500).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }
    }