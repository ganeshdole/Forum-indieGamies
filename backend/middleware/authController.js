const mg = require('../config/mailgun');
const otpGenerator = require('../utils/otpGenerator');

const otpStorage = {}; 

exports.requestOtp = async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate();

    otpStorage[email] = otp;

    const data = {
        from: 'Your Name <your-email@your-domain.com>',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        await mg.messages().send(data);
        res.status(200).send('OTP sent to your email');
    } catch (error) {
        res.status(500).send('Error sending OTP email');
    }
};

exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (otpStorage[email] === otp) {
        delete otpStorage[email];
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
};
