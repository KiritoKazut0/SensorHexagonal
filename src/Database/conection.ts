import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config();

const NAME_DATABASE = process.env["NAME_DATABASE"] ?? 'multi';
const USERNAME = process.env['USERNAME_DATABASE'] ?? 'root';
const PASSWORD = process.env['PASSWORD_DATABASE'] ?? "admin";
const HOST = process.env['HOST_DATABASE'] ?? 'localhost';
const PORT = parseInt(process.env['PORT_DATABASE'] ?? "3306")

const sequelize_conexion = new Sequelize(NAME_DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: "mysql",
    logging: false
}
)

export default sequelize_conexion;