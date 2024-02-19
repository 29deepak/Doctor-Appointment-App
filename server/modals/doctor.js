const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Doctor = sequelize.define('doctor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    website: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    specialization: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    experience: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    feesPerConsultation: {
        type: Sequelize.NUMERIC,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        default: "pending"
    },
    timings: {
        type: Sequelize.JSON,
        default: {},
        allowNull: false,
    }

});

module.exports = Doctor;