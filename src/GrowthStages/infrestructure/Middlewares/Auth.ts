import { Request, NextFunction, Response } from "express";
import TokenInterface from "../../Aplication/Service/TokenInterface";

export default class Auth {
    constructor (readonly tokenService: TokenInterface){}

    run(req: Request, res:Response, next: NextFunction){
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({
                msg: "No token or user name provided",
                data: null
            })
        }

        const isValid = this.tokenService.validate(token.replace('Bearer', ""));

        if (!isValid){
            return res.status(401).json({
                msg: "Invalid token",
                data: null
            })
        }
       
        next();
    }

}