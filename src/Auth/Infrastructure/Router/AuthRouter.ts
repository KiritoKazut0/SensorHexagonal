import {Router} from "express"
import {accessController, addController} from "../Dependencies"

const authRouter = Router();
authRouter.post("/create", addController.run.bind(addController));
authRouter.post('/access', accessController.run.bind(accessController));

export default authRouter;
