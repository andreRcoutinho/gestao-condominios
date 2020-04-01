import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.get('/', (req, res) => {
    return res.send('Hello world 2')
});

routes.post('/sign-up', AuthController.signUp);

export default routes;