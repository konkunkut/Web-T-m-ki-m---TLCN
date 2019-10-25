const express = require('express');
const route = express.Router();
const usercontroller = require('../controllers/user.controller');
const login = require('../Authen/login.authen');
passport =  require('passport');
const passportSetup =  require('../configs/passport-setup.config');

route.post('/singup',usercontroller.signup);
route.post('/singin',login.signin);
route.get('/authGoogle',passport.authenticate('google',{
    scope:['profile', 'email']
})) ;
route.get('/Home',passport.authenticate('google'),login.callback);

route.get('/authFacebook', passport.authenticate('facebook',{scope:'email'}));
route.get('/HomeFace',  passport.authenticate('facebook'),login.callback);


module.exports=route;