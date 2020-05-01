import { Router } from 'express';
import * as paymentMap from '../controllers/payment_map';

const routes = Router();

routes.get('/', paymentMap.index);
routes.get('/:id', paymentMap.show);

routes.post('/', paymentMap.create);
routes.put('/:id', paymentMap.update);

export default routes;