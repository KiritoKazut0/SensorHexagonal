import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./Auth/Infrastructure/Router/AuthRouter";

dotenv.config();

const APP_PORT = process.env['APP_PORT'] ?? 3000;
const app = express();

//midlewares
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

app.listen(APP_PORT, () => {
    console.clear();
    console.log(` => Api listening on http://127.0.0.1:${APP_PORT}`);  
});