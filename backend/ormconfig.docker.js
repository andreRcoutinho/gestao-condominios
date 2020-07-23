require('dotenv');

module.exports = {
	type: 'postgres',
	host: 'db',
	port: 5432,
	username: 'postgres',
	password: 'postpassworddef',
	database: 'lei_condominios',
	synchronize: true,
	dropSchema: false,
	logging: false,
	entities: ['build/models/*.js'],
	cli: {
		entitiesDir: 'src/models',
	},
};
