import { Request, Response } from "express";
import AddUseCase from "../../Aplication/AdduseCase";
import StagesRequest from "../../Domain/DTOS/StagesRequest";

export default class CreateCrontroller {
    constructor(readonly useCase: AddUseCase){}

    async run(req: Request, res:Response){
        const {idPlant, stageName}:StagesRequest = req.body;

        const response = await this.useCase.run({
            idPlant,
            stageName
        });

        if(response[0] === null){
            return res.status(500).json({
                msg: response[1],
                data: response[0]
            });
        }

        return res.status(201).json({
            msg: response[1],
            data: response[0]
        })
    }

}