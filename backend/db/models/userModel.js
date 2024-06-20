const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        firstName: {
            type:String,
            required :true,
            trim: true,

        },
        lastName : {
            type : String,
            required : true,
            trim : true
        }
    },
    email : {
        type : String,
        required : true,
        unique : true, 
        lowercase: true,
        trim : true,
        match: [/.+@.+\..+/,'Invalid Email Format']
    },
    role:{
        type: Number,
        default : 0,
        enum : [0, 1 , 2]
    },
    password: {
        type: String,
        required : true, 
        minlength: 8
    }
})

const userModel = new mongoose.model('users', userSchema)

module.exports = userModel;

