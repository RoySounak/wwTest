const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    post_id:{
        type:ObjectId,
        ref:"User"
    },
    post_url:{
        type:String,
        required:true
    },
    post_islmg:{
        type:Boolean
    },
    post_isVideo:{
        type:Boolean
    },
    post_shareCount:{
        type:Number
    },
    post_likeCount:{
        type:Number
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Post",postSchema)