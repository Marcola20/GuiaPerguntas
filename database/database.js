const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'user', 'senha',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
