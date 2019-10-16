const mongoose = require ('mongoose');
const crypto = require('crypto');
const User = new mongoose.Schema({
    fistname:{
        type: String,
        trim: true,
        required: "fist name is required"
    },
    lastname:{
        type: String,
        trim: true,
        required: 'last name is required'
    },
    salt: String,
    email:{
        type: String,
        trim: true,
        unique: 'email is already exits',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'email is required'
    },
    hash_password:{
        type: String,
        required: 'password is required'
    },
    


});
User
 .virtual('password')
 .set(function(password){
     this._password = password;
     this.salt = this.makeSalt();
     this.hash_password = this.encrypassword(password);
 })
 .get(function(){
     return this._password;
 });

 User.path('hash_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
  }, null);

User.methods =  {
    encrypassword:  function(password){
        if(!password){
            return '';
        }
        try{
            return crypto
            .createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return '';
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
      },
    authanticate: function(plaitext){
            return this.encrypassword(plaitext)=== this.hash_password;
      }
};
module.exports = mongoose.model('User',User);