const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Post = mongoose.model("Post")
const Comment = mongoose.model("Comment")
const requireLogin = require('../middleware/requireLogin')

router.post('/createComment',requireLogin,(req,res)=>{
    const {comment_description,commentedBy} = req.body
    if(!comment_description){
        res.json({error:"Please fill the fields"})
    }
    
    const comment = new Comment({
        comment_description,
        commentedBy:req.user
    })
    comment.save().then(results=>{
        res.json({comment:results})
    }).catch(err=>{
        console.log(err)
    })
})
 
router.get('/mycomment',requireLogin,(req,res)=>{
    Post.find({commentedBy:req.user._id})
    .populate("commentedBy","_id user_name user_email")
    .then(mycomment=>{
        res.json({mycomment})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/c',requireLogin,(req,res)=>{
    Comment.find({commentedBy:req.user._id})
    .populate("commentedBy","user_id user_name user_fullName user_img")
    .then(homepage=>{
        res.json(homepage)
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router