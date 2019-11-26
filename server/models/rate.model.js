const mongoose = require('mongoose');
const Rate = new mongoose.Schema({
    id_place:{
        type: mongoose.Schema.ObjectId, 
        ref:"Place"
    },
    id_user:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    rate:{
        require:true,
        type: Number
    }
});

module.exports = mongoose.model('Rate',Rate);