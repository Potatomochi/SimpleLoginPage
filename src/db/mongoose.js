const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config/test.env' })
console.log(process.env.MONGODB_URI)
console.log(mongoose.connection.readyState)
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})