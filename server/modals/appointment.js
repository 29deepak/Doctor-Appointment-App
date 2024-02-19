const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Appointment = sequelize.define('appointment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: Sequelize.STRING
    },
    doctorId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    doctorInfo: {
        type: Sequelize.JSON,
        allowNull: false,
        default: {}
    },
    userInfo: {
        type: Sequelize.JSON,
        allowNull: false,
        default: {}
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "pending"
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false,
    }


});

module.exports = Appointment;