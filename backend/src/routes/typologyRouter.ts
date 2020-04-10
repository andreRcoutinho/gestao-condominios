import { Router } from 'express';
import TypologyController from '../controllers/TypologyController';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

routes.use(authMiddleware);

routes.get('/', TypologyController.index);
routes.get('/:id', TypologyController.show);

routes.use(adminMiddleware);

routes.post('/create', TypologyController.create);
routes.put('/:id', TypologyController.update);
routes.delete('/:id', TypologyController.delete);

export default routes;
