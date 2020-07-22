import { Router } from 'express';
import * as unit from '../controllers/unit';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

routes.use(authMiddleware);
routes.get('/', unit.index);
routes.get('/:id', unit.show);

routes.use(adminMiddleware);
routes.post('/', unit.create);
routes.put('/:id', unit.update);
routes.delete('/:id', unit.remove);
routes.post('/import', unit.importUnits);

export default routes;
