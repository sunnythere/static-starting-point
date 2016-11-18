// Export all models as well as db connection itself
const theDbConnection = require('./_db');
const HotelModel = require('./hotel');

module.exports = {
    db: theDbConnection,
    Hotel: HotelModel
};