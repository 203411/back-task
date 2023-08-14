import { Request, Response } from "express";
import { FindByUserIDUseCase } from "../../application/FindByUserIDUseCase";
import { validationResult } from "express-validator";

export class FindByUserIDController{
    constructor(private readonly findByUserIDUseCase: FindByUserIDUseCase){}
    
    async run(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try{
            const userID = req.params.userID;
            const {page,limit} = req.query;
            const response = await this.findByUserIDUseCase.run(Number(userID),Number(page),Number(limit));
            
            if(!response){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }

            if(response.tasks.length === 0){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found to specified user'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'Tasks found',
                data: response
            });
        
        }catch(err){
            return res.status(500).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }
}