import { Router } from 'express';
import * as paymentMap from '../controllers/payment_map';

const routes = Router();

routes.post('/', paymentMap.create);
routes.put('/:id', paymentMap.update);

export default routes;