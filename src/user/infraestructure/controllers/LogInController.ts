import { validationResult } from "express-validator";
import { LogInUseCase } from "../../application/usecases/LogInUseCase";
import { Request, Response } from "express";

export class LogInController{
    constructor(
        private readonly logInUseCase: LogInUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: 'Invalid data'
            });
        }
        try{
            const { email, password } = req.body;
            const response = await this.logInUseCase.run(email, password);
            if(response){
                return res.status(200).json({
                    error: false,
                    data: response
                });
            }else{
                return res.status(401).json({
                    error: true,
                    message: 'Invalid credentials'
                });
            }
        }catch(err){
            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            });

        }
    }
}