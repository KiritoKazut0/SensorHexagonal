import TokenInterface from "../../Aplication/Service/TokenInterface";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config();

export default class DecodedToken implements TokenInterface {
    validate(token: string): boolean {
        const SECRET = process.env["JWT_SECRET"] ?? "DEFAULT_SECRET";
        try {
            const decode = jwt.verify(token, SECRET);

            if (typeof decode === 'string') return false
            return true

        } catch (error) {
            console.error(error)
            return false
        }
    }
}