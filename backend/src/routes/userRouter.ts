import { Router } from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

/*routes.use(authMiddleware);
routes.use(adminMiddleware);*/

routes.put('/update-password', UserController.updatePassword);

export default routes;
