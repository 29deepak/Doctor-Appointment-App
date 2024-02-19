const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
    },
    isDoctor: {
        type: Sequelize.BOOLEAN,
    },
    notification: {
        type: Sequelize.JSON,
        default: []
    },
    seenNotification: {
        type: Sequelize.JSON,
        default: []
    }
});

module.exports = User;