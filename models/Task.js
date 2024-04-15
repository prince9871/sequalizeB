const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    projectName: DataTypes.STRING,
    taskName: DataTypes.STRING,
    taskDescription: DataTypes.TEXT,
    spendTime: DataTypes.FLOAT,
    priority: DataTypes.STRING,
    assigned: DataTypes.STRING,
    status: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: DataTypes.DATE,
});

module.exports = Task;
