import { Request, Response } from "express";
import UpdateUseCase from "../../Aplication/UpdateUseCase";
import StagesUpdate from "../../Domain/DTOS/StagesUpdateRequest";

export default class UpdateController {
    constructor(readonly useCase: UpdateUseCase) { }

    async run(req: Request, res: Response) {
        const { stageName, id }: StagesUpdate = req.body;

        const result = await this.useCase.run({ stageName, id })

        if (result[0] === null) {
            return res.status(500).json({
                msg: result[1],
                data: result[0],
            });
        }

        if (result[0] === undefined) {
            return res.status(404).json({
                msg: result[1],
                data: null,
            });
        }

        return res.status(200).json({
            msg: result[1],
            data: result[0],
        });
    }
}