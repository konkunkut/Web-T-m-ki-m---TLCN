const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')
const Port = 3100;
const { acl_config } = require('./configs/acl.config');
app.use(cors());
app.use(bodyPaser.json());
app.use(passport.initialize());

app.use('/pics', express.static('pics'));

//console.log(new Date(2012,11,10) < new Date(2012, 11, 9));
mongoose.connect('mongodb://localhost:27017/peg')
    .then(()=>{
       
        acl_config(mongoose.connection.db);
        const userRoute = require('./router/user.route');
        const postRoute = require('./router/news.route');
        const typePlace = require('./router/typePlace.route');
        const Place = require('./router/place.route');
        const Address = require('./router/address.route');
        app.use('/user', userRoute);
        app.use('/', userRoute);
        app.use('/News', postRoute);
        app.use('/typePlace',typePlace);
        app.use('/Places',Place);
        app.use('/Address',Address);
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(Port, function () {
    console.log("server is running on port: " + Port);
})
