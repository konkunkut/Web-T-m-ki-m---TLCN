const Place = require('../models/place.model');
const Address = require('../models/address.model');
const formidable = require('formidable');
const User = require('../models/User.model');

const createPlace = (req, res, next) => {
    console.log(req.body)
    var id_user = req.decoded._id;
    var form = new formidable.IncomingForm();

    // form.parse(req);
    // form.maxFileSize = 200 * 1024 * 1024;
    form.uploadDir = "./pics/";
    form.multiples = true;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log(fields)
        // ...
        // console.log(fields);
        const newPlace = new Place(fields);
        var listImage = files.listPics;
        // console.log(listImage);
        if (listImage) {
        var listPathImage = [];
        if (Array.isArray(listImage)) {
            listImage.forEach(element => {
            listPathImage.push('/pics/'+element.path.toString().slice(5));
            });
        }
        else {
            listPathImage.push('/pics/'+listImage.path.toString().slice(5));
        }
        newPlace.picture = listPathImage;
        }
        newPlace.save((error) => {
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
                        picture: newPlace.picture
                    },
                    message: 'Đăng địa điểm thành công!',
                    success: true
                });
            }
        });
        
    });
}
const editPlace = (req, res, next) => {
    const id_address = req.params.id_address;
    var id_place;
    Address.findById(id_address).select('id_place').exec((err, result) => {
        id_place = result.id_place;
        req.body.id_User = req.decoded._id;
        Place.updateOne({ _id: id_place, id_User: req.decoded._id }, req.body)
            .exec((err,result) => {
                if (err) {
                    return res.status('400').json(err);;
                }
                else{
                    if(result){
                        next();
                    }
                    else{
                        return res.status('204').json({message:"edit place unsuccessful"});
                    }
                }
               
            })
    });
}
const getAllPlace = (req, res) => {
    
    Place.find()
        // .select('_id name_place phone stress dictrict city picture')
        .exec((err, result) => {
            if (err) {
                return res.status('200').json({
                    message: "Không lấy được dữ liệu",
                    success: false
                });

            }
            else {
                return res.status('200').json({
                    data: result,
                    message:"Thành công",
                    success: true
                });
                
            }
        })
}
const getUserPlaces = (req, res) => {

    var idUser = req.decoded._id;
    // console.log("a"+idUser);
    Place.find({createBy: idUser})
        // .populate('id_User', '')
        // .select('_id name_place phone stress dictrict city picture')
        .exec((err, result) => {
            // console.log("aaa"+result);
            if (err) {
                return res.status('200').json({
                    message : "Không lấy được dữ liệu",
                    success: false
                });
            }
            else {
                return res.status('200').json({
                    data : result,
                    message: "thành công!",
                    success: true
                });
            }
        })
}

const getDetailPlaces = (req, res) => {
    var idPlace = req.params.id_place;

    Place.findById(idPlace)
        .populate('id_User', 'fistname lastname tel picture')
        .exec((err, result)=>{
            if (err) {
                return res.status('200').json({
                    message : "Không lấy được dữ liệu",
                    success: false
                });
            }
            else{
                return res.status('200').json({
                    data: result,
                    message : "Không lấy được dữ liệu",
                    success: false
                });
            }
        })
}

const deletePlace = (req, res, next) => {
    
    if (req.body.id_place !== null) {
        const id_user = req.decoded._id;
        Place.find({ _id: req.body.id_place, id_User: id_user })
            .exec((err, result) => {
                // console.log(result)
                if (err) {
                    return res.status('400').json(err);
                }
                else {
                    if (result) {
                        Place.findOneAndDelete({ _id: req.body.id_place})
                            .exec((err, result) => {
                                if (err) {
                                    return res.status('400').json(err);
                                }
                                else {
                                    next();
                                }
                            })
                    }
                    else{
                        return res.status('204').json({message:"this User not permission"});
                    }
                }
            });
    }
    else {
        return res.status('200').json({ message: "not find id_address" });
    }
}
const find_id_place = (req, res, next )=> {
   
        Address.findById(req.params.id_address)
            .select('id_place')
            .exec((err, result) => {
                if (result) {
                    req.body.id_place = result.id_place;
                    next();
                }
                else {
                    return res.status('200').json({message:"id_address is incorrect"});
                }
            });

}

module.exports = {
    createPlace: createPlace,
    editPlace: editPlace,
    getAllPlace: getAllPlace,
    getUserPlaces: getUserPlaces,
    deletePlace: deletePlace,
    find_id_place:find_id_place,
    getDetailPlaces:getDetailPlaces,

}