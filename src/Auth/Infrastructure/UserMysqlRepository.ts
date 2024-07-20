import AuthRequest from "../Domain/DTOS/AuthRequest";
import Auth from "../Domain/Auth";
import AuthRepository from "../Domain/AuthRepository";
import UserModel from "./models/UserModel";
import UUIDInterface from "../Aplication/Services/UUIDInterface";
import { databaseRelationManager } from "../../Database/DatabaseRelationManager";

export default class MysqlUserRepository implements AuthRepository {
    constructor(readonly model: typeof UserModel, readonly generateUuid: UUIDInterface) {
        this.model.sync();
    }

    async access(auth: AuthRequest): Promise<Auth | null> {
        try {
            const user = await this.model.findOne({
                where: { email: auth.email, name: auth.name }
            });

            if (user === null) return null;

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }

        } catch (error) {
            console.log('Ha ocurrido un error durante el acceso');
            console.log(error);
            return null
        }
    }

    async add(auth: AuthRequest): Promise<Auth | null> {
        try {

            const email_registered = await this.isExistedEmail(auth.email);

            if (email_registered === null) {
                const newUser = await this.model.create({
                    name: auth.name,
                    email: auth.email,
                    password: auth.password,
                    id: this.generateUuid.get_uuid()
                });

                console.log('User added');
                return newUser;
            } else {
                console.log('Email already registered');
                return null;
            }
        } catch (error) {
            console.log("Ha ocurrido un error durante la petición");
            console.error(error);
            return null;
        }
    }

    private async isExistedEmail(email: string): Promise<Auth | null> {
        try {
            const result = await this.model.findOne({
                where: { email: email }
            });

       

            if (result === null) return null;

            const response: Auth = {
                id: result.id,
                name: result.name,
                email: result.email,
                password: result.password
            };

            return response;

        } catch (error) {
            console.log('Error en la consulta');
            console.error(error);
            return null;
        }
    }


}