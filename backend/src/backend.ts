import express from 'express';
import authRouter from './routes/authRouter';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SeedTypologies } from './seeds/typologies';
import { SeedRoles } from './seeds/roles';
import { SeedUnits } from './seeds/units';
import { Role } from './models/role';

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
// /
// /
// /
// /
// /

app.listen(3333);
