import { Router } from 'express';
import * as user from '../controllers/user';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

/*routes.use(authMiddleware);*/
routes.get('/', user.index);
routes.get('/:id', user.show);
/*routes.use(adminMiddleware);*/
routes.put('/:id', user.update)
routes.post('/update-password', user.updatePassword);
routes.delete('/:id')

export default routes;
