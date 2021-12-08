const express = require('express');
const sequelize = require('../database/index');
const {DataTypes} = require("sequelize");


const Address = sequelize.define("Address", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    houseNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    State: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pinCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    City: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyer: {
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

// Address.associate = models => {
//     Address.belongsTo(models.User, {
//         foreignKey:  'buyer',
//         onDelete: 'CASCADE'
//     })
// }
module.exports = Address;