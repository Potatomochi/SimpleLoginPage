const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required:true,
        trim: true,

    },
    email : {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

    }
})

userSchema.pre('save' , async function(next) {
    const user =  this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password , 8 )
    }

    next()
})

userSchema.methods.toJSON = function () {
    const user = this
    //raw profile data
    const userObject = user.toObject()

    return userObject
}

const User = mongoose.model('User' , userSchema)

module.exports = User