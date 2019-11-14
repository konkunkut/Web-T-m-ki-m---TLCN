const mongoose = require('mongoose');
const Place = new mongoose.Schema({
    name_place:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        require: true,
        trim: true
    },
    direct_place:{
        type:String,
        require: true,
        trim:true
    },
    id_User:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    id_type_place:{
        type:mongoose.Schema.ObjectId,
        ref:'TypePlace'
    },
    lat:{
        type: mongoose.Types.Decimal128,
        require: true
    },
    ing:{
        type:mongoose.Types.Decimal128,
        require:true
    }
})
module.exports = mongoose.model('Place',Place);