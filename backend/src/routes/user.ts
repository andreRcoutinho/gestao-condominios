import { Router } from 'express';
import * as user from '../controllers/user';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

/*routes.use(authMiddleware);*/
routes.get('/', user.index);
routes.get('/:id', user.show);
/*routes.use(adminMiddleware);*/
routes.put('/:id/update-role', user.updateRole);
routes.put('/:id/add-contact', user.addContact);
routes.put('/:id/delete-contact', user.deleteContact);
routes.put('/:id/update-contact', user.updateContact);
routes.put('/:id/add-unit', user.addUnit);
routes.put('/:id/delete-unit', user.deleteUnit);
routes.put('/:id', user.update)
routes.put('/update-password/:id', user.updatePassword);
routes.delete('/:id', user.remove)

export default routes;
