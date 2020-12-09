const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const classSchema = new mongoose.Schema({
    class_name:{
        type:String,
        required: true
    },
    class_enrolledBy:{
        type:ObjectId,
        ref:"Student" 
    }
})

mongoose.model("Class",classSchema)