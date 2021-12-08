const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'user', 'usuário',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;