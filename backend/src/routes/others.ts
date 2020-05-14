import { Router } from 'express';
import * as others from '../controllers/others';

const routes = Router();

routes.get('/monthly-data', others.monthlyData);
// TO DO
routes.post('/sim-payment-map', others.simPaymentMap);

export default routes;