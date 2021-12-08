const Sequelize = require('Sequelize');
const connection = require('./database');

const Question = connection.define('questions', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },

    desc:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Question.sync({force: false}).then(() =>{});

module.exports = Question;