import { Router } from 'express';
import * as auth from '../controllers/auth';

const routes = Router();

routes.post('/sign-up', auth.signUp);
routes.post('/sign-in', auth.signIn);

export default routes;