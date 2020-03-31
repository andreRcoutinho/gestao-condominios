require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: 'lei_condominios',
  define: {
    timestamps: true,
    freezeTableName: true
  }
};
