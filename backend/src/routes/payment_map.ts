import { Router } from 'express';
import * as paymentMap from '../controllers/payment_map';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

routes.use(authMiddleware);
routes.get('/', paymentMap.index);
routes.get('/anual', paymentMap.getAnualPaymentMap);
routes.get('/:id', paymentMap.show);

routes.use(adminMiddleware);
routes.post('/', paymentMap.create);
routes.post('/close', paymentMap.close);
routes.post('/simulate', paymentMap.simulate);
routes.put('/:id', paymentMap.update);
routes.put('/:id/close', paymentMap.close);

export default routes;
