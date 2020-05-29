import { Router } from 'express';
import * as others from '../controllers/others';

const routes = Router();

routes.get('/monthly-data', others.monthlyData);


export default routes;