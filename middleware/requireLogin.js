const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../keys')
const mongoose = require('mongoose')
const Student = mongoose.model('Student')

module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You should be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You should be logged in"})
        }
        const {_id} = payload
        Student.findById(_id).then(userdata=>{
            req.student = userdata
            next()
        })
    })
}