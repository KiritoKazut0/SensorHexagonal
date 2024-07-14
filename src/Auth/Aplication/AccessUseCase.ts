import AuthRepository from "../Domain/AuthRepository";
import AuthRequest from "../Domain/DTOS/AuthRequest";
import AuthResponse from "../Domain/DTOS/AuthReponse";
import EncriptInterface from "./Services/EncriptInterface";
import TokenInterface from "./Services/TokenInterface";

export default class AccessUseCase {
    constructor (
        readonly tokenService: TokenInterface,
        readonly encrypService: EncriptInterface,
        readonly authRepository: AuthRepository
    ){}

    async run (auth: AuthRequest): Promise <AuthResponse | null> {
        const authFounded = await this.authRepository.access(auth);

        if(!authFounded) return null;
        if(!this.encrypService.compare(authFounded.password, auth.password)) return null;

        const response: AuthResponse = {
            name: authFounded.name,
            id: authFounded.id,
            token: this.tokenService.generateToken(auth)
        }

        return response;

    }   
}