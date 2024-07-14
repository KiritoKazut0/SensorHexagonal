import AuthRequest from "../../Domain/DTOS/AuthRequest";

export default interface TokenInterface{
    generateToken(auth: AuthRequest): string;
    validateToken(token: string): boolean;
}