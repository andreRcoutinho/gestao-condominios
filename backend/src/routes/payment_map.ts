import { Router } from 'express';
import * as paymentMap from '../controllers/payment_map';

const routes = Router();

routes.get('/', paymentMap.index);
routes.get('/:id', paymentMap.show);

routes.post('/', paymentMap.create);
routes.post('/close', paymentMap.close)
routes.put('/:id', paymentMap.update);
routes.put('/:id/close', paymentMap.close);

export default routes;