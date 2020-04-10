import express from 'express';
import authRouter from './routes/authRouter';
import typologyRouter from './routes/typologyRouter';
import roleRouter from './routes/roleRouter';
import userRouter from './routes/userRouter';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SeedTypologies } from './seeds/typologies';
import { SeedRoles } from './seeds/roles';
import { SeedUnits } from './seeds/units';

const app = express();

createConnection().then(async (connection) => {
  console.log('Connected');
  await SeedTypologies();
  await SeedRoles();
  await SeedUnits();
  console.log('Database seeded....');
});

app.use(express.json());

/**
 * Routes
 */
app.use('/api', authRouter);
app.use('/api/typologies', typologyRouter);
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
// /
// /
// /
// /
// /

app.listen(3333);
