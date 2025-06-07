const { DataTypes } = require('sequalize');
const sequelize = require('../config/db');

const AdoptionPost = sequelize.define('AdoptionPost', {
    petName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('Male', "Female"),
        allowNull: true
    },
    reasonForAdoption:{
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photoURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});

module.exports = AdoptionPost;