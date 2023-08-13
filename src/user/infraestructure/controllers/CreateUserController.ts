import { validationResult } from "express-validator";
import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase"
import { FindByEmailUserUseCase } from "../../application/usecases/FindByEmailUserUseCase";
import { Request, Response } from "express";
import { User } from "../../domain/User";
import bcryptjs from 'bcryptjs';

export class CreateUserController{
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findByEmailUserUseCase: FindByEmailUserUseCase
    ){}

    async run(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: 'Invalid data'
            });
        }
        
        try{
            const formData = req.body;
            const user = await this.findByEmailUserUseCase.run(formData.email);
            if(user){
                return res.status(400).json({
                    error: true,
                    message: 'User already exists'
                })
            }

            const salts = bcryptjs.genSaltSync();
            formData.password = bcryptjs.hashSync(formData.password, salts);

            const newUser = new User();
            newUser.email = formData.email;
            newUser.password = formData.password;
            newUser.name = formData.name;

            const responseUser = await this.createUserUseCase.run(newUser);
            return res.status(201).json({
                error: false,
                data: responseUser
            });
        }catch(err){
            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            })
        }
    }
}