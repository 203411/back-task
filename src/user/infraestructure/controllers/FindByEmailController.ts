import { FindByEmailUserUseCase } from "../../application/usecases/FindByEmailUserUseCase";
import { Request, Response } from "express";

export class FindByEmailUserController{
    constructor(
        private readonly findByEmailUserUseCase: FindByEmailUserUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        const { email } = req.body;
        try{
            const user = await this.findByEmailUserUseCase.run(email);
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