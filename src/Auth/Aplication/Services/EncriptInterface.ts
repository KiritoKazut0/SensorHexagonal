export default interface EncriptInterface {
    hash(password: string): string;
    compare(hashed_password: string, plain_password: string): boolean;
}