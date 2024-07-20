import { Request, Response } from "express";
import GetByPkUseCase from "../../Aplication/GetByPkUseCase";

export default class GetByPkController {
    constructor(readonly useCase: GetByPkUseCase){}

    async run (req: Request, res:Response){
        const pk: string = req.params.id;
        const result = await this.useCase.run(pk);

        if (result[0] === null) {
            return res.status(500).json({
                msg: result[1],
                data: result[0]
            })
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