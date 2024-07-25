import { Request, Response } from "express";
import SendPlantStatsUseCase from "../../Aplication/SendPlantStatsUseCase";

export default class StatsPlantsControllers {
    constructor(readonly useCase: SendPlantStatsUseCase){}

    async run (req: Request, res:Response){
        const pk: string = req.params.id;
        
        const result = await this.useCase.getPlantsStats(pk);
        
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