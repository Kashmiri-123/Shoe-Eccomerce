const express = require('express');
var sequelize = require("../database/index");
const {DataTypes} = require("sequelize");

const Category = sequelize.define("Category", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = Category;