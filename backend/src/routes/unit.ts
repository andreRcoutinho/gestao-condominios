import { Router } from 'express';
import unit from '../controllers/unit';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const routes = Router();

//routes.use(authMiddleware);
//routes.use(adminMiddleware);

routes.get('/', unit.index);
routes.get('/:id', unit.show);

//routes.post('/', unit.show);
routes.put('/:id', unit.update);

export default routes;