const express = require('express');
const sequelize = require('../database/index');
const {DataTypes} = require("sequelize");

const Cart = sequelize.define('Cart', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    product: {
        type: DataTypes.STRING,
        references: {
            model: "Product",
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER
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

module.exports = Cart;
