const express = require('express');
var sequelize = require('../database/index');
const {DataTypes} = require("sequelize");
const Product = require("./Product");

const Order = sequelize.define('Order', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deliveryDate: {
        type: DataTypes.DATE
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "accepted", "shipped", "delivered", "cancelled"),
        defaultValue: "pending",
    },
    product: {
        type: DataTypes.STRING,
        references: {
            model: "Product",
            key: 'id'
        }
    },
    buyer: {
        type: DataTypes.STRING,
        references: {
            model: "User",
            key: 'id'
        }
    },
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Order;
