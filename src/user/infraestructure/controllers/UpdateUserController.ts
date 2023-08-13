import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase";
import { FindByIDUserUseCase } from '../../application/usecases/FindByIdUserUseCase';
import { Request, Response } from "express";

export class UpdateUserController{
    constructor(
        private readonly updateUserUsecase: UpdateUserUseCase,
        private readonly findByIDUserUseCase: FindByIDUserUseCase
    ){}
    
    async run(req: Request, res: Response): Promise<Response>{
        const userId = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);
        if(!userId){
            return res.status(400).json({
                error: true,
                message: 'Invalid user ID'
            });
        }
        try{
            const existingUser = await this.findByIDUserUseCase.run(userId);
            if(!existingUser){
                return res.status(404).json({
                    error: true,
                    message: 'User not found'
                });
            }else{
                const updatedUserData = req.body;
                const updatedUser = {
                    ...existingUser,
                    ...updatedUserData
                }
                const response = await this.updateUserUsecase.run(existingUser, updatedUser);
                return res.status(200).json({
                    error: false,
                    data: response
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