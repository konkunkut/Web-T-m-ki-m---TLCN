const User = require('../models/User.model');
<<<<<<< HEAD
const fs = require('fs');
const tokena = require('jsonwebtoken');
=======
const fs= require('fs');
const jwt = require('jsonwebtoken');
>>>>>>> 6c869f9f943fd603d1fe088465d55210bcb1b351
const config = require('../configs/config')
const key = require('../configs/key.config');
const googleStrategy = require('passport-google-oauth20');
const passport = require('passport');
const { Aclclass } = require('../helper/acl_store.heiper');



// login with web system account 
const signin = (req, res) => {
    User.findOne({
        "local.email": req.body.email
    }, (err, user) => {
        if (err || !user) {
            return res.status('200').json({
                data: {},
                message: "Email không tồn tại trong hệ thống!",
                success: false
            })
        }
        if (!user.authanticate(req.body.password)) {
            return res.status('200').json({
                data: {},
                message: " Password không đúng!",
                success: false
            });
        }
        // when success login
        const acl = Aclclass.getAcl;
        acl.hasRole(user._id.toString(), 'admin', (err, result) => {
            if (err) {
                console.log(err);
            }
<<<<<<< HEAD

            const token = tokena.sign({ _id: user._id, isAdmin: result }, config.jwtSecret);
            res.cookie('token', token, { exqire: new Date() + 3000 });
=======
            
            const token = jwt.sign({_id: user._id, isAdmin: result}, config.jwtSecret, { expiresIn: 60 * 2 });
            // console.log(user);
            // console.log('token local: '+token);
            res.cookie('token',token, {exqire: new Date()+3000});
>>>>>>> 6c869f9f943fd603d1fe088465d55210bcb1b351
            return res.json({
                data: {
                    token: token,
                    userID: user._id,
                    firstName: user.fistname,
                    lastName: user.lastname,
                    isLocal: "isLocal",
                    isAdmin: result,
                    avatar: user.picture
                },
                message: "Đăng nhập thành công!",
                success: true
            })
        })

    })
}

const signGoogle = (req, res) => {
    User.findOne({ 'google.email': req.body.email }, (err, user) => {
        if (!user) {
            user = new User({
                google: {
                    email: req.body.email,

                },
                fistname: req.body.fistname,
                lastname: req.body.lastName,
                picture: req.body.picture
            });

            user.save((err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const acl = Aclclass.getAcl;
                    acl.addUserRoles(result._id.toString(), 'user', (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    const token = tokena.sign({ _id: result._id, isAdmin: result }, config.jwtSecret);
                    res.cookie('token', token, { exqire: new Date() + 3000 });
                    return res.json({
                        data: {
                            token: token,
                            userID: result._id,
                            firstName: result.fistname,
                            lastName: result.lastname,
                            avatar: result.picture
                        },
                        message: "Đăng nhập thành công!",
                        success: true
                    })
                }
            });

        }
        else {
            const acl = Aclclass.getAcl;
            acl.hasRole(user._id.toString(), 'admin', (err, tf) => {
                if (err) {
                    console.log(err);
                }
                const token = tokena.sign({ _id: user._id, isAdmin: tf }, config.jwtSecret);
                res.cookie('token', token, { exqire: new Date() + 3000 });
                return res.json({
                    data: {
                        token: token,
                        userID: user._id,
                        firstName: user.fistname,
                        lastName: user.lastname,
                        isLocal: "isGoogle",
                        isAdmin: tf,
                        avatar: user.picture
                    },
                    message: "Đăng nhập thành công!",
                    success: true
                })
            })
        }
<<<<<<< HEAD
    });
}

const checkOathToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {

            token = token.slice(7, token.length);

        }
        tokena.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'failed authencation token' });
=======
        jwt.verify(token,config.jwtSecret,function(err,decoded){
            if(err){
                return res.status('200').json({message:'Vui lòng đăng nhập!'});
>>>>>>> 6c869f9f943fd603d1fe088465d55210bcb1b351
            }
            else {
                req.session = { userId: decoded._id }
                req.decoded = decoded;

                next();
            }
        });
    }
<<<<<<< HEAD
    else {
        return res.status(401).json({ massage: 'not token' });
=======
    else{
        return res.status(401).json({massage:'error'});
>>>>>>> 6c869f9f943fd603d1fe088465d55210bcb1b351
    }
}

// use login with google, facebook
<<<<<<< HEAD
const callback = (req, res, next) => {
    const token = tokena.sign({ _id: req.user._id }, config.jwtSecret);
    res.cookie('token', token, { exqire: new Date() + 3000 });
=======
const callback = (req,res, next)=>{
    const token = jwt.sign({_id: req.user._id, isAdmin: result},config.jwtSecret);
    res.cookie('token',token, {exqire: new Date()+3000});
>>>>>>> 6c869f9f943fd603d1fe088465d55210bcb1b351
    return res.json({
        message: "Đăng nhập thành công !",
        data: {
            token: token,
            userID: req.user._id,
            firstName: req.user.fistname,
            lastName: req.user.lastname,
            isLocal: "isFB_GG",
            avatar: req.user.picture
        },
        success: true
    })
}

module.exports =
<<<<<<< HEAD
    {
        callback: callback,
        signin: signin,
        checkOauthToken: checkOathToken


    };
=======
{
    callback:callback,
    signin:signin,
    checkOauthToken:checkOathToken
};
>>>>>>> 6c869f9f943fd603d1fe088465d55210bcb1b351
