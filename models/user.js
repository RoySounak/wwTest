const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    user_UID:{
        type:String
    },
    user_name:{
        type:String,
        required:true
    },
    user_fullName: {
        type:String
    },
    user_email:{
        type:String,
        required:true
    },
    user_DOB:{
        type: Date
    },
    user_phone:{
        type: Number
    },
    user_img:{
       type: String 
    },
    user_img:{
        type: String
    },
    user_gender:{
        type: String 
     },
     user_country:{
        type: String 
     },
     user_bio:{
        type: String 
     },
     user_isGoogle:{
         type: Boolean
     },
     user_isPhone:{
        type: Boolean
    },
    user_isFacebook:{
        type: Boolean
    },
    password:{
        type:String,
        required:true
    },
    user_token:{
        type: String
    } 
})

mongoose.model("User",userSchema)