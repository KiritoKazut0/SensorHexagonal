import { Router } from "express";
import {
    authMiddleware,
    listController,
    getByPkController,
    createController,
    deleteController,
    plantsStatsControllers
    
} from '../Dependencies'

const routerPlants = Router();

routerPlants.get('', authMiddleware.run.bind(authMiddleware),
             listController.run.bind(listController));

routerPlants.get('/:id', authMiddleware.run.bind(authMiddleware),
                   getByPkController.run.bind(getByPkController));

routerPlants.post('/', authMiddleware.run.bind(authMiddleware),
                createController.run.bind(createController));

routerPlants.delete('/', authMiddleware.run.bind(authMiddleware), 
                  deleteController.run.bind(deleteController));

routerPlants.get('/statisc/:id', plantsStatsControllers.run.bind(plantsStatsControllers) );


export default routerPlants;
