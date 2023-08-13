import { Request, Response } from "express";
import { FindByIDUserUseCase } from "../../application/usecases/FindByIdUserUseCase";

export class FindByIDUserController{
    constructor(private readonly findByIDUserUseCase: FindByIDUserUseCase){}

    async run(req: Request, res: Response): Promise<Response>{
        const userId = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);
        if(!userId){
            return res.status(400).json({
                error: true,
                message: 'Invalid user ID'
            });
        }
        try{
            const user = await this.findByIDUserUseCase.run(userId);
            if(!user){
                return res.status(404).json({
                    error: true,
                    message: 'User not found'
                });
            }else{
                return res.status(200).json({
                    error: false,
                    data: user
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