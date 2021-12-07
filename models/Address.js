const express = require('express');
const sequelize = require('../database/index');
const {DataTypes} = require("sequelize");


const Address = sequelize.define("Address", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    street: {

    },
    
})