const Place = require('../models/place.model');
const Address = require('../models/address.model');

const createPlace = (req, res, next) => {

    req.body.id_User = req.decoded._id;
    const newPlace = new Place(req.body);
    newPlace.save(
        (err, result) => {
            if (err) {
                return res.status('404').json(err);
            }
            else {
                if(result){
                    req.body.id_place = result._id;
                    next();
                }
                else{
                    return res.status('204').json({message: "save place failed"})
                }
               
            }

        }

    );
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
const getPlace = (req, res) => {
    const id = req.params.id_place;
    Place.findById({ _id: id })
        .exec((err, result) => {
            if (err) {
                return res.status('400').json(err);

            }
            else {
                return res.status('200').json(result);
            }
        })
}
const getPlaces = (req, res) => {
    Place.find()
        .exec((err, result) => {
            if (err) {
                return res.status('400').json(err);
            }
            else {
                return res.status('200').json(result);
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
    getPlace: getPlace,
    getPlaces: getPlaces,
    deletePlace: deletePlace,
    find_id_place:find_id_place
}