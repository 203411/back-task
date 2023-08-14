import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { FindByDateUseCase } from "../../application/FindByDateUseCase";

export class FindByDateController{
    constructor(
        private readonly findByDateUseCase: FindByDateUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try{
            const {page,limit,date} = req.query;
             // Validar que la fecha de vencimiento sea mayor a la fecha actual
             const dueDate = String(date);
            // Validar el formato de la fecha (DD-MM-YYYY)
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            if (!dateRegex.test(dueDate)) {
                return res.status(422).json({
                    error: true, 
                    message: 'Invalid dueDate format. Use DD-MM-YYYY'
                });
            }
            const task = await this.findByDateUseCase.run(String(date),Number(page),Number(limit));

            if(!task){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }
            if(task.tasks.length === 0){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found to specified date'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'Tasks found',
                data: task
            });
        }catch(err){
            return res.status(500).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }
}