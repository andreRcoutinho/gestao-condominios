import { Router } from 'express';
import * as revenue from '../controllers/revenue';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.post('/', revenue.payment_record);

export default routes;