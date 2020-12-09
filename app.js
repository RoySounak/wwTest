const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongoURI} = require("./keys")
const PORT = 5000

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex:true
})

mongoose.connection.on('Connected',()=>{
    console.log("MongoDB is connected")
})
mongoose.connection.on('Error',(err)=>{
    console.log("MongoDB is Not connected",err)
})

require('./models/student')
require('./models/class')
app.use(express.json())

app.use(require('./routes/student'))
app.use(require('./routes/class'))

app.get("/h",(req,res)=>{
    res.send("Hello testing")
})
app.listen(PORT,()=>{
    console.log("Server is running on ", PORT)
})

