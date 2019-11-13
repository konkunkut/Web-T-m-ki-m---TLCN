const mongoose = require('mongoose');

const datetime = require('date-time');

console.log(datetime({showTimeZone: true}))
const News = new mongoose.Schema({
    id_user:{
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    title:{
        type: String,
        trim: true,
        require: true
    },
    content:{
        type: String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
        
    },
    tags:{
        type: String,
        require: true,
        trim:true
    },
    pictures:[{
        type: String
    }]
});

module.exports = mongoose.model('News',News);