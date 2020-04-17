import { Router } from 'express';
import * as auth from '../controllers/auth';

const routes = Router();

routes.post('/sign-up', auth.signUp);
routes.get('/sign-in', auth.signIn);

export default routes;