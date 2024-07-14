import { Request, Response } from "express";
import AccessUseCase from "../../Aplication/AccessUseCase";
import AuthRequest from "../../Domain/DTOS/AuthRequest";

export default class AccessController {
    constructor(readonly auhtUseCase: AccessUseCase){}
    async run (req: Request, res: Response){
        const {name, password, email} = req.body;


        if (!name || !email || !password) return res.status(400).json({msg: "is required complete fields"})
            const authRequested: AuthRequest = {
                name,
                email,
                password
            }

        const auth_founded = await this.auhtUseCase.run(authRequested);
        if (!auth_founded) {
            return res.status(404).json({
                data: auth_founded,
                msg: "Credentials doesn't match"
            })
        }

        return res.status(200).json({
            data: auth_founded,
            msg: "Authentication success"
        })

    }
}