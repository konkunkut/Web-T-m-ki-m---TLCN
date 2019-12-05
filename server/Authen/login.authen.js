const User = require('../models/User.model');
const fs = require('fs');
const tokena = require('jsonwebtoken');
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

            const token = tokena.sign({ _id: user._id, isAdmin: result }, config.jwtSecret);
            res.cookie('token', token, { exqire: new Date() + 3000 });
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
            }
            else {
                req.session = { userId: decoded._id }
                req.decoded = decoded;

                next();
            }
        });
    }
    else {
        return res.status(401).json({ massage: 'not token' });
    }
}

// use login with google, facebook
const callback = (req, res, next) => {
    const token = tokena.sign({ _id: req.user._id }, config.jwtSecret);
    res.cookie('token', token, { exqire: new Date() + 3000 });
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
    {
        callback: callback,
        signin: signin,
        checkOauthToken: checkOathToken


    };