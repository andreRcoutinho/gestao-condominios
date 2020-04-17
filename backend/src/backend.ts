//Imports
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
//Local
import auth from './routes/auth';
import typology from './routes/typology';
import role from './routes/role';
import user from './routes/user';
import unit from './routes/unit';
import service_type from './routes/service_type';
import supplier from './routes/supplier';
import { SeedTypologies } from './database/typologies';
import { SeedRoles } from './database/roles';
import { SeedUnits } from './database/units';

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
app.use('/api', auth);
app.use('/api/typologies', typology);
app.use('/api/roles', role);
app.use('/api/users', user);
app.use('/api/units', unit);
app.use('/api/service-types', service_type);
app.use('/api/suppliers', supplier);

app.listen(3333);
