const express = require('express');
const route = express.Router();

const controlPlace = require('../controllers/place.controlle');
const auth= require('../Authen/login.authen')

route.post('/createPlace',auth.checkOauthToken,controlPlace.createPlace);
route.put('/editPlace/:id_place',auth.checkOauthToken,controlPlace.editPlace);
route.get('/getPlace/:id_place', auth.checkOauthToken,controlPlace.getPlace);
route.get('/getPlaces',auth.checkOauthToken,controlPlace.getPlaces);
route.delete('/deletePlace/:id_place', auth.checkOauthToken,controlPlace.deletePlace);
module.exports =route;