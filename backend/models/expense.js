const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Expense = db.define('Expense', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Expense;