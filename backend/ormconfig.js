require('dotenv')

module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: 'lei_condominios',
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [
        "build/models/*.js"
    ],
    cli: {
        "entitiesDir": "src/models"
    }
} 