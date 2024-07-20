import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./Auth/Infrastructure/Router/AuthRouter";
import routerPlants from "./Plants/Infrestructure/Router/router";
dotenv.config();

const APP_PORT = process.env['APP_PORT'] ?? 3000;
const app = express();
// iniciar las realciones

//midlewares
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/plants', routerPlants)

app.listen(APP_PORT, () => {
    console.clear();
    console.log(` => Api listening on http://127.0.0.1:${APP_PORT}`);  
});