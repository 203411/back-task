import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/CreateTaskUseCase";
import { validationResult } from 'express-validator';
import saveLogFile from "../LogsErrorControl";
import { Task } from "../../domain/Task";

export class CreateTaskController{
    constructor(private readonly createTaskUseCase: CreateTaskUseCase){}

    async run(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try{
            const formData = req.body;
            console.log(formData);
            // let image: Express.MulterS3.File[] = req.files as Express.MulterS3.File[]; 
            
            // Verificar atributos obligatorios
            if(!formData.title || !formData.description || formData.completionStatus === undefined || !formData.dueDate){
                return res.status(400).json({
                    error: true, 
                    message: 'Missing required data'
                });
            }
            // Validar que la fecha de vencimiento sea mayor a la fecha actual
            if(formData.dueDate < new Date()){
                return res.status(400).json({
                    error: true,
                    message: 'Due date must be greater than current date'
                });
            }
            // Validar el formato de la fecha (DD-MM-YYYY)
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            if (!dateRegex.test(formData.dueDate)) {
                return res.status(422).json({
                    error: true, 
                    message: 'Invalid dueDate format. Use DD-MM-YYYY'
                });
            }

            const newTask = new Task();
            newTask.title = formData.title;
            newTask.description = formData.description;
            newTask.completionStatus = formData.completionStatus;
            newTask.dueDate = formData.dueDate;
            newTask.comments = formData.comments;
            newTask.responsible = formData.responsible;
            newTask.tags = formData.tags;
            newTask.urlImage = formData.image;

            const createdTask = await this.createTaskUseCase.run(newTask);
            
            if(createdTask){
                return res.status(201).json({
                    error: false,
                    message: 'Task created successfully',
                    data: createdTask
                });
            }else{
                return res.status(400).json({
                    error: true,
                    message: 'Error creating task'
                });
            }
        }catch(error){
            saveLogFile(error);
            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            });
        }
    }
}