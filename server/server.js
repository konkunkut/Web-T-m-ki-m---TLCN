const express = require('express');
const  app = express();
const bodyPaser =  require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Port = 3000;
const config = require('./configs/config');
const userRoute= require('./router/user.route');

app.use(cors());
app.use(bodyPaser.json());
mongoose.connect('mongodb://localhost:27017/peg');
app.use(passport.initialize());

app.use('/user',userRoute);
app.use('/',userRoute);
app.listen(Port,function(){
    console.log("server is running on port: "+ Port);
})
