const User = require('../models/User.model');
const formidable = require('formidable');
// const fs= require('fs');
// const tokena = require('jsonwebtoken');
// const config = require('../configs/config')
const { Aclclass } = require('../helper/acl_store.heiper')
//signup
const signup = (req, res, next) => {
    const user = new User(
        {
            local: {
                email: req.body.email,
                password: req.body.password,
                picture: req.body.picture
            },
            fistname: req.body.fistname,
            lastname: req.body.lastname
        }
    );
    user.save((err, result) => {

        if (err) {
            //console.log(err);
            return res.status('200').json({
                data: {},
                message: err.errmsg,
                success: false
            });
        }
        const acl = Aclclass.getAcl;
        acl.addUserRoles(result._id.toString(), 'user', (err) => {
            if (err) {
                console.log(err);
            }

        })
        res.status(200).json({
            data: {},
            message: "Tao tai khoan thanh cong",
            success: true

        });
    });

};

const Viewprofile = (req, res) => {

    var id = req.decoded._id;
    //console.log(id);

    User.find({_id:id,deleted:false}, function (err, user) {
        //console.log(user)
        if (err) {

            return res.status('200')
                .json({
                    message: 'not find user',
                    success: false
                });

        }

        if (user.local.email) {

            return res.status('200')
                .json({
                    data: {
                        email: user.local.email,
                        firstName: user.fistname,
                        lastName: user.lastname,
                        avatar: user.picture,
                        tel: user.tel,
                        id_place: user.id_place
                    },
                    message: "successfull",
                    success: true
                });
        }
        else if (user.google.email) {

            return res.status('200')
                .json({
                    data: {
                        email: user.google.email,
                        firstName: user.fistname,
                        lastName: user.lastname,
                        avatar: user.picture,
                        tel: user.tel,
                        id_place: user.id_place
                    },
                    message: "successfull",
                    success: true
                });
        }
        else {

            return res.status('200')
                .json({
                    data: {
                        email: user.facebook.email,
                        firstName: user.fistname,
                        lastName: user.lastname,
                        avatar: user.picture,
                        tel: user.tel,
                        id_place: user.id_place
                    },
                    message: "successfull",
                    success: true
                });
        }

    })
}

const ViewAvatar = (req, res) => {

    var id = req.decoded._id;
    User.find({_id:id,deleted:false})
        .exec((err, result) => {
            //console.log(user)
            if (err) {
                return res.status('200')
                    .json({
                        message: 'not find user',
                        success: false
                    });

            }
            else {
                // console.log('result'+ result);
                return res.status('200')
                    .json({
                        data: {
                            avatar: result.picture
                        },
                        message: "successfull",
                        success: true
                    });
            }
        });
}

const editProfile = (req, res) => {

    User.find({_id:req.decoded._id,deleted:false}).exec((err, result) => {
        if (err) {
            res.status('400').json(err);
        }
        else {
            result.fistname = req.body.fistname;
            result.lastname = req.body.lastname;
            result.tel = req.body.tel;
            //console.log(result)
            result.save((error) => {
                if (error) {
                    res.status('400').json({
                        data: {

                        },
                        message: "Không cập nhật được!",
                        success: false
                    });
                }
                else {
                    res.status('200').json({
                        data: {
                            lastName: req.body.lastname,
                            firstName: req.body.fistname
                        },
                        message: 'Cập nhật tài khoản thành công!',
                        success: true
                    });
                }

            })

        }
    })
}

const updateAvatar = (req, res) => {
    User.find({_id:req.decoded._id,deleted:false}).exec((err, result) => {
        if (err) {
            // console.log("lỗi nè");
            res.status('400').json(err);
        }
        else {
            var form = new formidable.IncomingForm();

            form.parse(req);
            form.maxFileSize = 200 * 1024 * 1024;
            form.uploadDir = "./pics/";
            form.keepExtensions = true;

            form.on('file', function (name, file) {
                // console.log(file);
                file.path = '/pics/' + file.path.slice(5);
                // file.path = file.uploadDir + file.path.slice(5);
                result.picture = file.path;

                result.save((error) => {
                    if (error) {
                        res.status('200').json({
                            data: {

                            },
                            message: "Không cập nhật được!",
                            success: false
                        });
                    }
                    else {
                        res.status('200').json({
                            data: {
                                avatar: result.picture
                            },
                            message: 'Cập nhật tài khoản thành công!',
                            success: true
                        });
                    }

                })
            });
        }
    })
}

//sign out
const signout = (req, res) => {
    res.clearCookie('token');
    return res.status('200').json({
        message: "Đã đăng xuất"
    })
}

const getNamePic = (req, res) =>{
    //console.log(req);
    var id = req.params.id_user;
    //console.log(req.params.id_user);
    User.find({_id:id,deleted:false})
        .exec((err, result) => {
            //console.log(user)
            if (err) {
                return res.status('200')
                    .json({
                        message: 'not find user',
                        success: false
                    });

            }
            else {
                //console.log('result'+ result);
                return res.status('200')
                    .json({
                        data: {
                            lastName: result.lastname,
                            avatar: result.picture,
                        },
                        message: "successfull",
                        success: true
                    });
            }
        });
}

const deleteUser = (req,res)=>{
    const id = req.params.id;
    User.findByIdAndUpdate(id,{deleted: true},(err,result)=>{
        if(err){
            return res.status('400').json(err);
        }
        else{
            if(result){
                return res.status('200').json({
                    success: true,
                    message: 'Xoa User thanh cong!'
                })
            }
            else
            {
                return res.status('200').json({
                    success: false,
                    message: 'xoa khong thanh cong!'
                })
            }
        }
    })
}

module.exports = {
    signup: signup,
    signout: signout,
    Viewprofile: Viewprofile,
    editProfile: editProfile,
    updateAvatar: updateAvatar,
    ViewAvatar: ViewAvatar,
    getNamePic: getNamePic,
    deleteUser:deleteUser
};
