import { Router } from 'express';
import * as user from '../controllers/user';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

/*routes.use(authMiddleware);
routes.use(adminMiddleware);*/

routes.put('/update-password', user.updatePassword);

export default routes;
