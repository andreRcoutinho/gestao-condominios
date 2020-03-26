var express = require('express');
var path = require('path');
var logger = require('morgan');
const typeorm = require('typeorm')
var EntitySchema = typeorm.EntitySchema;
var metadata = require('reflect-metadata');
var auth = require('./controllers/auth_controller');

var indexRouter = require('./routes/index')
/* var usersRouter = require('./routes/users');
var typologiesRouter = require('./routes/typologies');
var servicetypesRouter = require('./routes/service_types'); */

var app = express();

//database
typeorm.createConnection().then(async connection => {
    console.log('Connected: ' + connection.getDatabaseName());
    await connection.createQueryBuilder().insert().into('Role').values([{ role_name: 'Administrador' }, { role_name: 'Condómino' }]).execute();
    await connection.createQueryBuilder().insert().into('Unit').values([{ unit: '1º Direito' }, { unit: '2º Direito' }]).execute();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter)

/* app.use('/api/users', usersRouter);
app.use('/api/typologies', typologiesRouter);
app.use('/api/service_types', servicetypesRouter); */

module.exports = app;
