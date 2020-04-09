import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.post('/sign-up', AuthController.signUp);
routes.get('/sign-in', AuthController.signIn);

export default routes;