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
            res.send('khong tao duoc');
            return;
        }
        res.status(200).json({
            message: "Tao tai khoan thanh cong"
            
        });
    });
    
};

//login
const signin = (req,res) =>{
    User.findOne({
        "email":req.body.email
    },(err,user)=>{
        if(err||!user){
            return res.status('401').json({
                errro:"email not found"
            })
        }
        if(!user.authanticate(req.body.password)){
            return res.status('401').json({
                password: " password not match."
            });
        }
        const token = tokena.sign({_id: user._id},config.jwtSecret);
        res.cookie('token',token, {exqire: new Date()+3000});
        return res.json({
            token
          })
        
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
    signin:signin,
    signout:signout
};
