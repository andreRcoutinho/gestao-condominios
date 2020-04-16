import { Router } from 'express';
import service_type from '../controllers/service_type';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.get('/', service_type.index);
routes.get('/:id', service_type.show);
routes.post('/', service_type.create);
routes.put('/:id', service_type.update);
routes.delete('/:id', service_type.delete);

export default routes;