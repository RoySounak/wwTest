const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const commentSchema = new mongoose.Schema({
    comment_id:{
        type:ObjectId,
        ref:"Post"
    },
    comment_description:{
        type: String,
        required: true
    },
    commentedBy:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Comment",commentSchema)