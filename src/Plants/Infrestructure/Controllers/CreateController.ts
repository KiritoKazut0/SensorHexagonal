import {Request, Response }from "express";
import AddUseCase from "../../Aplication/AddUseCase";
import PlantsRequest from "../../Domain/DTOS/PlantsRequest";

export default class CreateCrontroller {
    constructor(readonly useCase: AddUseCase){}

    async run (req: Request, res:Response){
        const { userId, name, plantType }: PlantsRequest = req.body;

        const response = await this.useCase.run({
            userId,
            name,
            plantType
        })

      if (response[0] === null){
        return res.status(500).json({
            msg: response[1],
            data: response[0]
        })
      }

      return res.status(201).json({
        msg: response[1],
        data: response[0]
      })

    }
}