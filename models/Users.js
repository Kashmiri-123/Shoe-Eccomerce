const express = require('express');
var sequelize = require("../database/index");
const {DataTypes} = require("sequelize");
const crypto = require("crypto");

const User = sequelize.define("User", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM("USER", "SELLER", "ADMIN"),
        defaultValue: "USER",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

User.associate = models => {
    User.hasMany(models.Address, {
        onDelete: "cascade"
    });
}


module.exports = User;