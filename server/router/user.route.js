const express = require('express');
const usercontroller = require('../controllers/user.controller');
const route = express.Router();

route.post('/singup',usercontroller.signup);
route.post('/singin',usercontroller.signin);

module.exports=route;