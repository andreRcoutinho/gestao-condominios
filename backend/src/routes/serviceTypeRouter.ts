import { Router } from 'express';
import ServiceTypeController from '../controllers/ServiceTypeController';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.get('/', ServiceTypeController.index);
routes.get('/:id', ServiceTypeController.show);
routes.post('/', ServiceTypeController.create);
routes.put('/:id', ServiceTypeController.update);
routes.delete('/:id', ServiceTypeController.delete);

export default routes;