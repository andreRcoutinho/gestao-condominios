import e, { Router } from 'express';
import * as expense from '../controllers/expense';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.get('/', expense.index);
routes.get('/:id', expense.show);
routes.put('/:id', expense.update);
routes.post('/', expense.create);
routes.delete('/:id', expense.remove);

export default routes;