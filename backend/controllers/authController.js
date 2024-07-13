const {otpGenerator} = require('../utils/utils');
const userModel = require('../db/models/userModel');
const {createError, createSuccess} = require('../utils/utils');
const bcryptJs = require('bcryptjs');
const jwt  = require('jsonwebtoken')
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const otpStorage = {}; 
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY });


const requestOtp = async (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    const otp = otpGenerator();
    console.log(otp);
    otpStorage[email] = otp;

    const data = {
        to: email,
        from: 'IndieGamies <no-reply@indiegamies.com>',
        subject: "Your OTP Code",
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                        <h1 style="color: #4a4a4a; text-align: center;">Your OTP Code</h1>
                        <p style="font-size: 16px; text-align: center;">Here's your one-time password (OTP) for authentication:</p>
                        <div style="background-color: #e9e9e9; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                            ${otp}
                        </div>
                        <p style="font-size: 14px; text-align: center; color: #777;">This OTP is valid for a limited time. Please do not share it with anyone.</p>
                        <p style="font-size: 14px; text-align: center; margin-top: 30px;">If you didn't request this OTP, please ignore this email.</p>
                    </div>
                </body>
            </html>
        `
    };


    try {
        const msg = await mg.messages.create('mail.indiegamies.com', data);
        console.log(msg); 
        res.send(createSuccess('OTP sent to your email'));
    } catch (error) {
        console.log(error);
        res.send(createError('Error sending OTP'));
    }
};

const verifyOtp = (req, res) => {
    console.log(req.body)
    const { email, otp } = req.body;
    if (otpStorage[email] === otp) {
        delete otpStorage[email];
        res.send(createSuccess('OTP verified successfully'));
    } else {
        res.send(createError('Invalid OTP'));
    }
};



// Register User
const registerUser = async (req, res) => {
    try {
       
        const { username, email, password } = req.body;
        let user = await userModel.findOne({ username });

        if (user) {
            return res.json(createError('Username already exists'));
        }

        user = await userModel.findOne({ email });
        
        if (user) {
            return res.json(createError('Email already exists'));
        }

        const salt = await bcryptJs.genSalt(10);
        const encryptedPassword = await bcryptJs.hash(password, salt);

        const newUser = new userModel({
            username,
            email,
            password: encryptedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(createSuccess(savedUser));
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json(createError('Error creating user', error.message));
    }
};

// Sign-in user 
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await userModel.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.json(createError('User not found'));
        }

        const isMatch = await bcryptJs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(createError('Invalid Password'));
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRETE
        );

        res.status(200).json(createSuccess({ message: 'User signed in successfully', token }));
    } catch (error) {
        console.log('Error in signing-in user', error);
        return res.status(500).json(createError('Signing in user', error.message));
    }
};

module.exports = {
    requestOtp,
    verifyOtp,
    registerUser,
    signinUser
}