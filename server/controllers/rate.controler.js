const Rate = require('../models/rate.model');

const createRate = (req,res)=>{
    //req.body={ id_place,rate}
    req.body.id_user = req.decoded._id;
    const rate = new Rate(req.body);
    rate.save((err,rate)=>{
        if(err){
            return res.status('400').json(err);
        }
        return res.status('200').json({massage:'created Rate success'});
    })
}

const upDateRate = (req,res)=>{
    //req.body={id_place,rate}
   
    Rate.findOneAndUpdate({id_place:req.body.id_place,id_user:req.decoded._id},{rate:req.body.rate},(err,rate)=>{
        if(err){
            return res.status('400').json(err);
        }
        else return res.status('200').json({massage:'updated reate success'});
    })
    

}

const getRate = (req,res)=>{
//req.body = {id_place}
    Rate.findOne({id_place:req.body.id_place,id_user:req.decoded._id},(err,rate)=>{
        if(err){
            return res.status('400').json(err);
        }
        else{
            return res.status('200').json(rate);
        }
    })
}
module.exports = {
    createRate:createRate,
    upDateRate:upDateRate,
    getRate:getRate
}