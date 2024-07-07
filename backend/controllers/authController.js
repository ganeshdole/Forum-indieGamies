const {otpGenerator} = require('../utils/utils');

const otpStorage = {}; 

const requestOtp = async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator();

    otpStorage[email] = otp;

    const data = {
        from: 'Your Name <your-email@your-domain.com>',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        // await mg.messages().send(data);
        res.send('OTP sent to your email ' + otp);
    } catch (error) {
        console.log(error)
        res.send('Error sending OTP email');
    }
};

const verifyOtp = (req, res) => {
    console.log(req.body)
    const { email, otp } = req.body;

    if (otpStorage[email] === otp) {
        delete otpStorage[email];
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
};


module.exports = {
    requestOtp,
    verifyOtp
}