import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    return res.send('Hello world 2')
})

export default routes;