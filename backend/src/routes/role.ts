import { Router } from 'express';
import * as role from '../controllers/role';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

routes.use(authMiddleware);
routes.use(adminMiddleware);

routes.get('/', role.index);

export default routes;
