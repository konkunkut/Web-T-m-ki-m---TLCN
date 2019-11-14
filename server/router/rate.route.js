const rate = require('../controllers/rate.controler');
const auth = require('../Authen/login.authen');
const app = require('express');
const route = app.route();

route.post('/createRate',auth.checkOauthToken,rate.createRate);
route.update('/updateRate',atob.checkOauthToken,rate.upDateRate);
route.get('/getRate',auth.checkOauthToken,rate.getRate)