import { Request, Response } from "express";
import ListUseCase from "../../Aplication/ListUseCase";

export default class ListController {
    constructor(readonly useCase: ListUseCase){}

    async run (_req: Request, res:Response){
        const result = await this.useCase.run();

        if (result[0] == null) {
            return res.status(500).json({
              msg: result[1],
              data: result[0],
            });
          }
      
          return res.status(200).json({
            msg: result[1],
            data: result[0],
          });



    }

}