const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Invalid Email Format']
    },
    role: {
        type: Number,
        default: 0,
        // enum: [0, 1, 2], // 0: User, 1: Moderator, 2: Admin
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, {
    timestamps: true 
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
