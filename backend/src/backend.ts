import express from 'express';
import authRouter from './routes/authRouter';
import 'reflect-metadata'
import { createConnection } from 'typeorm';

const app = express();

createConnection().then( con => {
    console.log('Connected')
})

app.use('/api', authRouter);

app.listen(3333);
