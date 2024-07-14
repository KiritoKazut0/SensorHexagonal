import UUIDInterface from "../../Aplication/Services/UUIDInterface";
import { v4 as uuidv4 } from "uuid";

export default class UUIDService implements UUIDInterface {
    get_uuid(): string {
        return uuidv4();
    }
}