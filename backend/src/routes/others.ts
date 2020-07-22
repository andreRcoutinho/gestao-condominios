import { Router } from 'express';
import * as others from '../controllers/others';
import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.use(authMiddleware);
routes.get('/monthly-data', others.monthlyData);

export default routes;
