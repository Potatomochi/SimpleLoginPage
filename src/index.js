const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path:'./config/test.env'});
const hbs = require("hbs")
const bodyParser = require('body-parser')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const passport= require('passport')
require('../src/middleware/passport')

const app = express()
const port = process.env.PORT 

const publicPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(userRouter)
app.use(passport.initialize());
app.use(passport.session());


app.set('views' , viewPath)
app.set('view engine' , 'hbs')
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('' ,(req,res) => {
    res.render('index')
})

app.get('/submit-form',(req,res) => {
    res.render('submit-form')
})
app.get('/loginPage',(req,res) => {
    res.render('loginPage')
})
app.get('/userView' , (req, res) => {
    res.render('userView' ,{
        email: req.body.email,
        password: req.body.password
    })
})

app.listen(port , ()=>{
    console.log("listening on port " + port)
});