const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        firstName: String,
        lastName : String
    },
    email : String,
    role:Number,
    password: String
})

const userModel = new mongoose.model('users', userSchema)

module.exports = userModel;

