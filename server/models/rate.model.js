const mongoose = require('mongoose');
const Rate = new mongoose.Schema({
    id_place:{
        type: String,
        require: true
    },
    id_user:{
        type: String,
        require: true
    },
    rate:{
        require:true,
        type: Number
    }
});

module.exports = mongoose.model('Rate',Rate);