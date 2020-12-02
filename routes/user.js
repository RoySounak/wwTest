const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/createUser',(req,res)=>{
    const {user_name,user_email,password,
            user_id,
            user_UID,
            user_fullName,
            user_DOB,
            user_phone,
            user_img,
            user_gender,
            user_country,
            user_bio,
            user_isGoogle,
            user_isFacebook,
            user_isPhone} = req.body
    if(!user_name || !user_email || !password){
        res.json({error:"Please fill all the fields"})
    }
    User.findOne({user_email:user_email}).then((savedUser)=>{
        if(savedUser){
         return res.json({error:"Already have"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
             const user = new User({
                 user_email,
                 user_name,
                 user_id,
                 user_UID,
                 user_fullName,
                 user_DOB,
                 user_phone,
                 user_img,
                 user_gender,
                 user_country,
                 user_bio,
                 user_isGoogle,
                 user_isFacebook,
                 user_isPhone,
                 password:hashedPassword
        })
        user.save().then(user=>{   
         res.json({message:"Successed"})
     }).catch(err=>{
         console.log(err)
     })
 }).catch(err=>{
     console.log(err)
 })
        })
        
 })

 router.get("/users", function(req,res) {
    User.find({})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  router.post('/signin',(req,res)=>{
    const {user_email,password} = req.body
    if(!user_email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({user_email:user_email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},jwt_secret)
                const {_id,user_name,user_email} = savedUser
                res.json({token, user:{_id,user_name,user_email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
 

router.get('/test',requireLogin,(req,res)=>{
    res.send("hello")
})

module.exports = router