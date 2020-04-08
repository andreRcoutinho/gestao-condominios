import express from 'express';
import authRouter from './routes/authRouter';
import 'reflect-metadata'
import { createConnection } from 'typeorm';
import { SeedTypologies } from './seeds/typologies';
import { SeedRoles } from './seeds/roles';
import { SeedUnits } from './seeds/units';
import { Typology } from './models/typology';
import { Role } from './models/role';
import { Unit } from './models/unit';

const app = express();

createConnection().then(async connection => {
    console.log('Connected');
    await SeedTypologies();
    await SeedRoles();
    await SeedUnits();
    console.log('Database seeded....')
})

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
