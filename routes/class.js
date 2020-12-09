const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Class = mongoose.model("Class")
const requireLogin = require('../middleware/requireLogin')

router.post('/createClass',requireLogin,(req,res)=>{
    const {class_name} = req.body
    if(!class_name){
        res.json({error:"Please fill the fields"})
    }
    
    const enrollClass = new Class({
        class_name
    })
    enrollClass.save().then(results=>{
        res.json({clas:results})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/stdEnrollClass',requireLogin,(req,res)=>{
    const {class_name,class_enrolledBy} = req.body
    if(!class_name){
        res.json({error:"Please fill the fields"})
    }
    
    const enrollClass = new Class({
        class_name,
        class_enrolledBy:req.student
    })
    enrollClass.save().then(results=>{
        res.json({clas:results})
    }).catch(err=>{
        console.log(err)
    })
})

router.get("/allposts/:name", function(req,res) {
    Class.find({class_name:req.params.name})
    .populate("class_enrolledBy","std_name std_email std_enrolledIn")
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  router.get('/classAndStudent',requireLogin,(req,res)=>{
    Class.find({class_enrolledBy:req.student._id})
    .populate("class_enrolledBy","std_name std_email std_enrolledIn")
    .then(homepage=>{
        res.json(homepage)
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router