const mongoose = require('mongoose');

const threadsSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String, // temporarily using username, will switch to ObjectId and ref 'users'
        required: true
    },
    replies: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: '' // default empty description
    }
},{
    timestamps: true 
});

const threadsModel = mongoose.model('threads', threadsSchema);

module.exports = threadsModel;
