import { Router } from 'express';
import UnitController from '../controllers/UnitController';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.get('/', UnitController.index);
routes.get('/:id', UnitController.show);

//routes.post('/', UnitController.show);
routes.put('/:id', UnitController.update);

export default routes;