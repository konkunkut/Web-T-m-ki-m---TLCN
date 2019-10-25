const User = require('../models/User.model');
const fs= require('fs');
const tokena = require('jsonwebtoken');
const config = require('../configs/config')

//signup
const signup = (req, res, next) => {

    const user = new User(req.body); 
    console.log(user);
    user.save((err, result)=>{
        if(err){
            console.log(err);
            return;
        }
        res.status(200).json({
            message: "Tao tai khoan thanh cong"
            
        });
    });
    
};

//login

//sign out
const signout = (req,res)=>{
    res.clearCookie('token');
    return res.status('200').json({
        message: "signed out"
    })
}


module.exports = {
    signup:signup,
    signout:signout
};
