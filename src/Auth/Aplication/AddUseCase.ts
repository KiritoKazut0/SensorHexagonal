import AuthRequest from "../Domain/DTOS/AuthRequest";
import AuthResponse from "../Domain/DTOS/AuthReponse";
import AuthRepository from "../Domain/AuthRepository";
import EncriptInterface from "./Services/EncriptInterface";
import TokenInterface from "./Services/TokenInterface";

export default class AddUseCase {
    constructor (
        readonly authRepository: AuthRepository,
        readonly encryptInterface: EncriptInterface,
        readonly tokenInterface: TokenInterface
    ){}

    async run (auth: AuthRequest): Promise <AuthResponse | null>{
        try {
            auth.password = this.encryptInterface.hash(auth.password);
            let result = await this.authRepository.add(auth);

            if (!result) return null

            let responses: AuthResponse = {
                id: result.id,
                name: result.name,
                token: this.tokenInterface.generateToken(auth)
            }

            return responses;

        } catch (error) {
            console.log('Ha ocurrido un error durante la petición generate');
            console.error(error);
            return null
            
        }
    }

}