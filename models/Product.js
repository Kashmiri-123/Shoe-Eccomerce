const exports = require('express');
var sequelize = require('../database/index');
const {DataType} = require('sequelize');

const Product = sequelize.define('Product', {
    id: {
        primaryKey: true,
        type: DataType.String,
    },
    name: {
        type: DataType.String,
        allowNull: false
    },
    price: {
        type: DataType.INTEGER,
        allowNull: false
    },
    description: {
        type: DataType.String
    },
    image: {
        type: DataType.String,
        allowNull: false
    },
    category: {
        type: DataType.String,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
})