import { Request, Response } from "express";
import { FindByStatusUseCase } from "../../application/FindByStatusTaskUseCase";
import { validationResult } from "express-validator";
import saveLogFile from "../LogsErrorControl";

export class FindByStatusController {
    constructor(private readonly findByStatusUseCase: FindByStatusUseCase) {}

    async run(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try {
            const {page, limit, status} = req.query;
            if(!status){
                return res.status(400).json({
                    error: true,
                    message: 'Status is required'
                });
            }

            const response = await this.findByStatusUseCase.run(String(status),Number(page),Number(limit));
            if(!response){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }
            if(response.tasks.length === 0){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'Tasks found',
                data: response
            });
        } catch (error) {
            saveLogFile(error);
            return res.status(400).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }
}