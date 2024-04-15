const { Sequelize } = require('sequelize');
require('dotenv').config();
const config = require('./config');
// console.log(config.db.name);
const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: 'mysql',
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));

module.exports = sequelize;
