import EncriptInterface from "../../Aplication/Services/EncriptInterface";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config();

export default class EncryptService implements EncriptInterface {
    hash(password: string): string {
        return bcrypt.hashSync(
            password,
            parseInt(process.env["SALT_ROUNDS"] ?? "5")
        );
    }

    compare(hashed_password: string, plain_password: string): boolean {
        return bcrypt.compareSync(plain_password, hashed_password)
    }

}