const express = require('express');
var sequelize = require('../database/index');
const {DataTypes} = require("sequelize");
const User = require('../models/Users')

const Product = sequelize.define('Product', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        references: {
            model: "Category",
            key: 'id'
        }
    },
    creator: {
        type: DataTypes.STRING,
        references: {
            model: "User",
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Product;
