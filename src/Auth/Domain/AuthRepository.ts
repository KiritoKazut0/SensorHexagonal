import Auth from "./Auth";
import AuthRequest from "./DTOS/AuthRequest";

export default interface AuthRepository {
    add(auth: AuthRequest): Promise <Auth | null>
    access(auth: AuthRequest): Promise <Auth | null>
   
}