const User = require('../models/User.model');
const fs= require('fs');
const tokena = require('jsonwebtoken');
const config = require('../configs/config')

//signup
const signup = (req, res, next) => {
    
    const user = new User(
        {
            local:{
                email:req.body.email,
                password: req.body.password,
                fistname:req.body.fistname,
                lastname:req.body.lastname
            }
        }
    ); 


    console.log(user);
    user.save((err, result)=>{
        if(err){
            console.log(err);
            return res.status(401).json(err);
        }
        res.status(200).json({
            message: "Tao tai khoan thanh cong"
            
        });
    });
    
};

const Viewprofile = (req,res)=>{
    //var id = req.params.userid;
    var id = req.decoded._id;
    //console.log(adc);

    //console.log(id)
    User.findById(id,function(err,user){
        if(err){
           //console.log(err);
           return res.status(401).json({err:'not find user'});

        }
        //console.log(user.local.email);
        //console.log(user);
        if(user.local.email){
           
            return res.json(
                {
                    'email':user.local.email,
                    'fistname':user.local.fistname,
                    'lastname':user.local.lastname
                }); 
        }
        else if(user.google.email){
            
            return res.json(
                {
                    'email':user.google.email,
                    'fistname':user.google.fistname,
                    'lastname':user.google.lastname
                }); 
        }
        else{
            
            return res.json(
                {
                    'email':user.facebook.email,
                    'fullname':user.facebook.fullName
                    
                }); 
        }
        
    })
}


//sign out
const signout = (req,res)=>{
    res.clearCookie('token');
    return res.status('200').json({
        message: "signed out"
    })
}


module.exports = {
    signup:signup,
    signout:signout,
    Viewprofile:Viewprofile
};
