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
        "local.email":req.body.email
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
        // when success login
        const token = tokena.sign({_id: user._id},config.jwtSecret);
       // console.log('token local: '+token);
        res.cookie('token',token, {exqire: new Date()+3000});
        return res.json({
            token   
          })
    })
}

const checkOathToken = (req,res,next )=>{
    let token = req.headers['x-access-token']||req.headers['authorization'];
    
    if(token){
        if(token.startsWith('Bearer ')){
           
            token = token.slice(7,token.length);
            
        }
        tokena.verify(token,config.jwtSecret,function(err,decoded){
            if(err){
                return res.status(401).json({message:'failed authencation token'});
            }
            else{
               req.session = {userId:decoded._id}
               //console.log(req.session);
                req.decoded = decoded;
              
                next();
            }
        });
    }
    else{
        return res.status(401).json({massage:'not token'});
    }
}

// use login with google, facebook
const callback = (req,res, next)=>{
    const token = tokena.sign({_id: req.user._id},config.jwtSecret);
    res.cookie('token',token, {exqire: new Date()+3000});
    return res.json({
        token
    })
}

module.exports =
{
    callback:callback,
    signin:signin,
    checkOauthToken:checkOathToken
    
    
};