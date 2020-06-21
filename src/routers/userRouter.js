const express = require('express')
const User = require('../models/user')
const userRouter = new express.Router()
const mongoose = require('mongoose')
const passport= require('passport')
require('../middleware/passport')(passport)
const bcrypt = require('bcryptjs')

userRouter.use(passport.initialize());
userRouter.use(passport.session())

userRouter.post('/submit-form', async (req, res) => {
   
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save();
        return res.redirect('/submit-form')

    } catch (e) {
        res.status(400).send(e)
    }


})

userRouter.get('/view' , (req,res) => {
    res.redirect('/userView')
})

userRouter.post('/userView' ,  (req,res,next) => {

        passport.authenticate('local' , {
            successRedirect:'/userView',
            failureRedirect:'/loginPage',    
        })(req,res,next)    
        
})

module.exports = userRouter