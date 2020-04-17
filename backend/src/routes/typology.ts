import { Router } from 'express';
import * as typology from '../controllers/typology';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

routes.use(authMiddleware);

routes.get('/', typology.index);
routes.get('/:id', typology.show);

routes.use(adminMiddleware);

routes.post('/create', typology.create);
routes.put('/:id', typology.update);
routes.delete('/:id', typology.remove);

export default routes;
