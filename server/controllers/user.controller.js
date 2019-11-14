const User = require('../models/User.model');
// const fs= require('fs');
// const tokena = require('jsonwebtoken');
// const config = require('../configs/config')
const {Aclclass} = require('../helper/acl_store.heiper')
//signup
const signup = (req, res, next) => {
    
    const user = new User(
        {
            local:{
                email:req.body.email,
                password: req.body.password,
                picture:req.body.picture
            },
            fistname:req.body.fistname,
            lastname:req.body.lastname
        }
    ); 
    user.save((err, result)=>{

        if(err){
            return res.status('401').json(err);
        }
        const acl = Aclclass.getAcl;
        acl.addUserRoles(result._id.toString(),'user',(err)=>{
           if(err){
               console.log(err);
           }
           
        })
        res.status(200).json({
            message: "Tao tai khoan thanh cong"
            
        });
    });
    
};

const Viewprofile = (req,res)=>{
    
    var id = req.decoded._id;
    console.log(id);

   
    User.findById(id,function(err,user){
        console.log(user)
        if(err){
          
           return res.status(401).json({err:'not find user'});

        }
        
        if(user.local.email){
           
            return res.json(
                {
                    'email':user.local.email,
                    'fistname':user.fistname,
                    'lastname':user.lastname
                }); 
        }
        else if(user.google.email){
            
            return res.json(
                {
                    'email':user.google.email,
                    'fistname':user.fistname,
                    'lastname':user.lastname
                }); 
        }
        else{
            
            return res.json(
                {
                    'email':user.facebook.email,
                    'fistname':user.fistname,
                    'lastname':user.lastname
                    
                }); 
        }
        
    })
}


const editProfile = (req,res)=>{
    
    // if edit local user =>req.body={fistname, lastname, email, picture}
    // if edit google user =>req.body={lastname, fistname, picture}
    // if edit facebook user =>req.body={fullname,picture}
    //console.log(req.body);  


    // User.findByIdAndUpdate(req.decoded._id,
    //     {local:req.body
    //     },{new:true}).exec((err,resource)=>{
    //         console.log(resource)
    //         if(err){
    //             res.status('400').json(err);
    //         }
    //         else{
    //             res.status('200').json({massage:'edited success!'});
    //         }
    //     });

    User.findById(req.decoded._id).exec((err,result)=>{
        if(err){
            res.status('400').json(err);
        }
        else{
            result.fistname= req.body.fistname;
            result.lastname = req.body.lastname
            if(result.local.email){
                
                result.local = req.body;
            }
            if(result.google.email){
                result.google = req.body;
            }
            if(result.facebook.email){
                result.facebook = req.body;
            }
            //console.log(result)
            result.save((error)=>{
                if(error){
                    res.status('400').json(error);
                }
                else
                {
                    res.status('200').json({massage:'edited success!'});
                }
                
            })
            
        }
    })
}

//sign out
const signout = (req,res)=>{
    res.clearCookie('token');
    return res.status('200').json({
        message: "signed out"
    })
}


module.exports = {
    signup:signup,
    signout:signout,
    Viewprofile:Viewprofile,
    editProfile:editProfile
};
