import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/usecases/DeleteUserUseCase";
import { FindByIDUserUseCase } from "../../application/usecases/FindByIdUserUseCase";

export class DeleteUserController{
    constructor(
        private readonly findByIdUseCase: FindByIDUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ){}

    async run(req: Request, res: Response): Promise<void>{
        const userId = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);
        if(!userId){
            res.status(400).json({
                error: true,
                message: 'Invalid user ID'
            });
        }
        try{
            const user = await this.findByIdUseCase.run(userId);
            if(!user){
                res.status(404).json({
                    error: true,
                    message: 'User not found'
                });
            }else{
                await this.deleteUserUseCase.run(user);
                res.status(204).json({
                    error: false,
                    message: 'User deleted'
                });
            }
        }catch(err){
            res.status(500).json({
                error: true,
                message: 'Internal server error'
            });
        }
    }
}