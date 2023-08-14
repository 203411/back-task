import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../../application/UpdateTaskUseCase"; // Asegúrate de importar el caso de uso correcto
import { validationResult } from 'express-validator';
import saveLogFile from "../LogsErrorControl";
import { FindByIDTaskUseCase } from "../../application/FindByIDTaskUseCase";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export class UpdateTaskController {
    constructor(
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly findByIDTaskUseCase: FindByIDTaskUseCase
    ) {}

    async run(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        const taskId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);

        if(!taskId){
            return res.status(400).json({
                error: true,
                message: 'Invalid task ID'
            });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: 'Invalid input data'
            });
        }
        try {
            const formData = req.body;

            // Validar que la fecha de vencimiento sea mayor a la fecha actual
            if(formData.dueDate){
                if (formData.dueDate < new Date()) {
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
            }
            // Buscar la tarea a actualizar
            const existingTask = await this.findByIDTaskUseCase.run(taskId);
            
            if (!existingTask) {
                return res.status(404).json({
                    error: true,
                    message: 'Task not found'
                });
            }

            // Actualizar imagen si se proporciona
            let updatedImageUrl = existingTask.urlImage;
            if (req.files && req.files.image) {
                const image: UploadedFile = req.files.image as UploadedFile;
                const allowedFileTypes = ['.pdf', '.jpg', '.png'];
                const extension = path.extname(image.name);
                if (!allowedFileTypes.includes(extension)) {
                    return res.status(400).json({
                        error: true,
                        message: 'Invalid file type'
                    });
                }
                const uniqueFileName = `${uuidv4()}${extension}`;
                const uploadPath = path.join(__dirname, `../../../images/${uniqueFileName}`);
                
                image.mv(uploadPath, async (err) => {
                    if (err) {
                        saveLogFile(err);
                        return res.status(500).json({
                            error: true,
                            message: 'Error uploading image'
                        });
                    }
                });

                updatedImageUrl = uploadPath;
            }
            
            const updatedTask = {
                ...existingTask,
                ...formData,
                urlImage: updatedImageUrl
            }

            const result = await this.updateTaskUseCase.run(existingTask, updatedTask);

            if (result) {
                return res.status(200).json({
                    error: false,
                    message: 'Task updated successfully',
                    data: updatedTask
                });
            } else {
                return res.status(400).json({
                    error: true,
                    message: 'Error updating task'
                });
            }
        } catch (error) {
            saveLogFile(error);
            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            });
        }
    }
}
