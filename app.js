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

require('./models/user')
require('./models/post')
require('./models/Comment')
app.use(express.json())

app.use(require('./routes/user'))
app.use(require('./routes/post'))
app.use(require('./routes/comment'))

// app.get("/",(req,res)=>{
//     res.send("Hello Change")
// })
app.listen(PORT,()=>{
    console.log("Server is running on ", PORT)
})

