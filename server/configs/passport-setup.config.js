const token = require('jsonwebtoken');
const passport = require('passport');
const googleStrategy =  require('passport-google-oauth20');
const facebookStrategy = require('passport-facebook');

passport.serializeUser(function(user, done) {
    done(null, user);
});

const config = require('./config');
const key = require('./key.config');
const User = require('../models/User.model');


passport.use(
    new googleStrategy({
        clientID:key.google.clientID,
        clientSecret:key.google.clientSecret,
        callbackURL:'/Home'

    },( accessToken, refreshToken, profile,  done) =>{
        //console.log(profile._json.email);
        
       User.findOne({'google.email':profile._json.email},(err,user)=>{
           
            if(err||!user){
                user = new User(
                    {
                        'google.fistname': profile._json.family_name,
                        'google.lastname': profile._json.given_name,
                        'google.email': profile._json.email
                    });
        
               // console.log(user);
                user.save();    
              
            }    
            done(null,user); 
       });
    }
    )
)
passport.use(
    new facebookStrategy (
        {
            
            clientID:key.facebook.clientID,
            clientSecret:key.facebook.clientSecret,
            callbackURL:'/HomeFace',
            profileFields: ['id', 'displayName', 'email']
        }, (accessToken, refreshToken,profile,done)=>{
            console.log('day la profile fullName '+profile.displayName);
            console.log('day la profile id '+profile._json.id);
            User.findOne({'facebook.email':profile._json.email},(err,user)=>{
              if(err||!user){
                    user = new User(
                    {
                        'facebook.email':profile._json.email,
                        'facebook.fullName':profile.displayName,
                        'facebook.id':profile._json.id
                    }
                    );
                    console.log(user);
                    user.save();
                   
                }
                done(null,user);
             });
        }
    )
);