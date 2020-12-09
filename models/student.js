const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const studentSchema = new mongoose.Schema({
    std_name:{
        type:String,
        required: true
    },
    std_email:{
        type:String,
        required:true
    },
    std_enrolledIn:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("Student",studentSchema)