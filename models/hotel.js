const Sequelize = require('sequelize');
const dbConnection = require('./_db');

const Hotel = dbConnection.define('hotel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_stars: {
    		type: Sequelize.FLOAT,
    		validate: { min: 1, max: 5 }
    },
    amenities: {
    		type: Sequelize.TEXT
    }
});






module.exports = Hotel;
