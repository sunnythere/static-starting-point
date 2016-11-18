// Export all models as well as db connection itself
const theDbConnection = require('./_db');
const Hotel = require('./hotel');
const Place = require('./place');
const Activity = require('./activity');
const Restaurant = require('./restaurant');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);


module.exports = {
   db: theDbConnection,
   Hotel: Hotel,
   Place: Place,
   Activity: Activity,
   Restaurant: Restaurant
};
