import { Task } from "../../domain/Task";
import { FindByIDTaskUseCase } from "../../application/FindByIDTaskUseCase";
import saveLogFile from "../LogsErrorControl";
import { Response, Request } from "express";

export class FindByIDTaskController {
  constructor(private readonly findByIDTaskUseCase: FindByIDTaskUseCase) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const task: Task | null = await this.findByIDTaskUseCase.run(parseInt(id, 10));

      if (!task) {
        return res.status(404).json({
          error: true,
          message: 'Task not found',
        });
      }

      return res.status(200).json({
        error: false,
        message: 'Task found',
        data: task,
      });
    } catch (err) {
      saveLogFile(err);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }
  }
}
