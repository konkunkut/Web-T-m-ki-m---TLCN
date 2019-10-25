const User = require('../models/User.model');
const fs= require('fs');
const tokena = require('jsonwebtoken');
const config = require('../configs/config')
const key = require('../configs/key.config');
const googleStrategy = require('passport-google-oauth20');
const passport =  require('passport');



// login with web system account 
const signin = (req,res) =>{
    User.findOne({
        "google.email":req.body.email
    },(err,user)=>{
        if(err||!user){
            return res.status('401').json({
                erro:"email not found"
            })
        }
        if(!user.authanticate(req.body.password)){
            return res.status('401').json({
                password: " password not match."
            });
        }
        const token = tokena.sign({_id: user._id},config.jwtSecret);
        console.log('token local: '+token);
        res.cookie('token',token, {exqire: new Date()+3000});
        return res.json({
            token
          })
        
    })
}
const callback = (req,res, next)=>{
    console.log('gggg'+req.user);
    const token = tokena.sign({_id: req.user._id},config.jwtSecret);
    res.cookie('token',token, {exqire: new Date()+3000});
    return res.json({
        token
    })
}

//login with google


module.exports =
{
    callback:callback,
    signin:signin
    
};