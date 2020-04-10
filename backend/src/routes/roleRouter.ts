import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

routes.use(authMiddleware);
routes.use(adminMiddleware);

routes.get('/', RoleController.index);

export default routes;