const express = require('express');
var sequelize = require('../database/index');
const {DataTypes} = require("sequelize");

const Wishlist = sequelize.define('Wishlist', {
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

module.exports = Wishlist;
