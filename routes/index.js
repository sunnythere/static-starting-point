const express = require('express');
const sequelize = require('sequelize');
const Promise = require ('bluebird');
const router = express.Router();
module.exports = router;
const models = require('../models');
const Hotel = models.Hotel;
const Place = models.Place;
const Activity = models.Activity;
const Restaurant = models.Restaurant;


router.get('/', function (req, res, next) {

  let outerScopeContainer = {};
	let arrModels = [Hotel, Restaurant, Activity];

Promise.each(arrModels, function(model){
    	return model.findAll()
    				.then(function(modelsDB) {
    					var name = model.getTableName();
		  				outerScopeContainer[`${name}DB`] = modelsDB;
		  			});

  }).then(function (models) {
  res.render('index', {
    templateHotels: outerScopeContainer.hotelsDB,
    templateRestaurants: outerScopeContainer.restaurantsDB,
    templateActivities: outerScopeContainer.activitiesDB
  });

})
.catch(next);


//router.post('/', function(req, res, next) {

   //let button = document.getElementById("add-hotel");

   //  $("#add-hotel").click(function(){ console.log("hello") });
   // //Hotel.findOne({
   //    where: { id: Hotel.id }
   // }).then(function(foundHotel) {
   //  res.render('index', {
   //    added_hotel: Hotel.name
   //  });

   //.catch(next);
//})


});
