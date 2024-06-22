const req = require('express/lib/request')
const mongoose = require('mongoose')

const threadsSchema = new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    author:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'users',
        required: true,
        type: String, // for now we will use the username later we will change it to the user id
        replies :{
            type : Number,
            default : 0
        },
        views :{
            type : Number,
            default : 0
        }
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
})

const threadsModel = new mongoose.model('threads', threadsSchema)

module.exports = threadsModel;