const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')

router.post('/createPost',requireLogin,(req,res)=>{
    const {post_url,
            post_id,
            post_islmg,
            post_isVideo,
            post_shareCount,
            post_likeCount,
            user} = req.body
    if(!post_url){
        res.json({error:"Please fill the fields"})
    }
    
    const post = new Post({
        post_url,
        post_id:req.user._id,
        post_islmg,
        post_isVideo,
        post_shareCount,
        post_likeCount,
        user:req.user
    })
    post.save().then(results=>{
        res.json({post:results})
    }).catch(err=>{
        console.log(err)
    })
})

router.get("/allposts",requireLogin, function(req,res) {
    Post.find()
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  router.get('/',requireLogin,(req,res)=>{
    Post.find({user:req.user._id})
    .populate("user","user_id user_name user_fullName user_img")
    .then(homepage=>{
        res.json(homepage)
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router