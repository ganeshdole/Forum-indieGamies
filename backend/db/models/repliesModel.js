const mongoose = require('mongoose')

const repliesSchema = new mongoose.Schema({
    threadId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'threads'
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
    content :{
        type : String,
        required : true,
        trim : true
    },
    date :{
        type : Date,
        default : Date.now
    },
    upvotes :{
        type : Number,
        default : 0
    }   
})


const repliesModel = new mongoose.model('replies', repliesSchema)


module.exports = repliesModel;