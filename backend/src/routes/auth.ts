import { Router } from 'express';
import * as auth from '../controllers/auth';

const routes = Router();

routes.post('/sign-up', auth.signUp);
routes.post('/sign-in', auth.signIn);
routes.post('/forgot-password', auth.forgot_password);
routes.post('/reset-password', auth.reset_password);

export default routes;