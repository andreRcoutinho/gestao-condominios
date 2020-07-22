//Imports
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
//Local
import auth from './routes/auth';
import typology from './routes/typology';
import role from './routes/role';
import user from './routes/user';
import unit from './routes/unit';
import service_type from './routes/service_type';
import supplier from './routes/supplier';
import expense from './routes/expense';
import payment_map from './routes/payment_map';
import revenue from './routes/revenue';
import others from './routes/others';
import { SeedTypologies } from './database/typologies';
import { SeedRoles } from './database/roles';
import { SeedUnits } from './database/units';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';

const swaggerDocument = YAML.load('./src/documentation/index.yaml');
const app = express();

createConnection().then(async (connection) => {
	console.log('Connected');
	//await SeedTypologies();
	await SeedRoles();
	//await SeedUnits();
	console.log('Database seeded....');
});

var corsOptions = {
	origin: 'http://localhost:8080',
	methods: '*',
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

/**
 * Routes
 */
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', auth);
app.use('/api/typologies', typology);
app.use('/api/roles', role);
app.use('/api/users', user);
app.use('/api/units', unit);
app.use('/api/service-types', service_type);
app.use('/api/suppliers', supplier);
app.use('/api/expenses', expense);
app.use('/api/payment_map', payment_map);
app.use('/api/revenue', revenue);
app.use('/api/others', others);

app.listen(3333);
