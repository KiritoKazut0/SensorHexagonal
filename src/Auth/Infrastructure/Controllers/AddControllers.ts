import { Request, Response } from "express";
import AddUseCase from "../../Aplication/AddUseCase";
import AuthRequest from "../../Domain/DTOS/AuthRequest";

export default class AddController {
    constructor (readonly AdduseCase:AddUseCase ){}
    async run (req: Request, res:Response){
        const {name, email, password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                msg: "is required complete fields"
            })
        }
           
        const request: AuthRequest = {
            name,
            email,
            password
        }

        try {
            const authSaved = await this.AdduseCase.run(request);
          
            if (!authSaved){
               
                return res.status(409).json({
                    data: null,
                    msg: "Email already registered"
                })
            }

            return res.status(201).json({
                data: authSaved,
               msg: "User registered succesfully"
            })

        } catch (error) {
            console.log("Error en el servidor");
            console.error(error);
            return res.status(500).json({
              data: null,
              msg: error,
            });
        }
    }
}