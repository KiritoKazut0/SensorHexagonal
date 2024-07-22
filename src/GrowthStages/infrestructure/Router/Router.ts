import { Router } from "express";
import {
    createController,
    listController,
    getByPkController,
    updateController,
    deleteController,
    authMiddleware
} from "../Dependencies"


const routerStages = Router();

routerStages.get('/', authMiddleware.run.bind(authMiddleware),
    listController.run.bind(listController));

routerStages.get('/:id', authMiddleware.run.bind(authMiddleware),
    getByPkController.run.bind(getByPkController));

routerStages.post('/', authMiddleware.run.bind(authMiddleware),
    createController.run.bind(createController));

routerStages.put('/update', authMiddleware.run.bind(authMiddleware),
    updateController.run.bind(updateController));

routerStages.delete('/:id', authMiddleware.run.bind(authMiddleware),
    deleteController.run.bind(deleteController))


export default routerStages;