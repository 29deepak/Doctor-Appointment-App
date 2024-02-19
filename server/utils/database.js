const Sequelize = require('sequelize');

const sequelize = new Sequelize('doctor', 'root', 'Kunal@1234de', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;