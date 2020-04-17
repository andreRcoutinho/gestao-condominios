import { Router } from 'express';
import * as supplier from '../controllers/supplier';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.get('/:id', supplier.show);
routes.post('/', supplier.create);

export default routes;