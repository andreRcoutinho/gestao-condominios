import { Router } from 'express';
import * as supplier from '../controllers/supplier';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();


routes.get('/', supplier.index);
routes.get('/:id', supplier.show);

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.post('/', supplier.create);
routes.put('/:id/add-contact', supplier.addContact);
routes.put('/:id/update-contact', supplier.updateContact);
routes.put('/:id/delete-contact', supplier.deleteContact);
routes.put('/:id/add-service-type', supplier.addServiceType);
routes.put('/:id/delete-service-type', supplier.deleteServiceType);
routes.put('/:id', supplier.update);

export default routes;