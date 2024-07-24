import { Router } from "express";
import { eventController } from "../dependencies";

const routerPublish = Router();

routerPublish.post('/', eventController.createEvent.bind(eventController));

export default routerPublish;