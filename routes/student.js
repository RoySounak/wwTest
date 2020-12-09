const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/createStudent',(req,res)=>{
    const {std_name,std_email,std_enrolledIn,password} = req.body
    if(!std_name || !std_email || !password){
        res.json({error:"Please fill all the fields"})
    }
    Student.findOne({std_email:std_email}).then((savedUser)=>{
        if(savedUser){
         return res.json({error:"Already have"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
             const student = new Student({
                 std_name, 
                 std_email,
                 std_enrolledIn,
                 password:hashedPassword
        })
        student.save().then(student=>{   
         res.json({message:"Successed"})
     }).catch(err=>{
         console.log(err)
     })
 }).catch(err=>{
     console.log(err)
 })
        })
        
 })

 router.get("/students", function(req,res) {
    Student.find({})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  router.post('/signin',(req,res)=>{
    const {std_email,password} = req.body
    if(!std_email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    Student.findOne({std_email:std_email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},jwt_secret)
                const {_id,std_name,std_email} = savedUser
                res.json({token, student:{_id,std_name,std_email}})
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
 

router.get('/afterStudentLoggedIn',requireLogin,(req,res)=>{
    res.send("hello logged in student")
})

module.exports = router