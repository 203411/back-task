import { validationResult } from "express-validator";
import { FindAndCountUseCase } from "../../application/FindAndCountUseCase";
import { GetReponse } from "../../domain/GetResponse";
import saveLogFile from "../LogsErrorControl";
import { Response,Request } from "express";


export class FindAndCountController{
    constructor(private readonly findAndCountUseCase: FindAndCountUseCase){}

    async run(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try{
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const tasks: GetReponse|null = await this.findAndCountUseCase.run(page, limit);
            if(tasks){
                return res.status(200).json({
                    error: false,
                    message: 'Tasks found',
                    data: tasks
                });
            }else{
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }

        }catch(err){
            saveLogFile(err);
            return res.status(500).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }
}