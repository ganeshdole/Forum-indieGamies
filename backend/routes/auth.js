const express = require('express');
const router = express.Router();

const { registerUser, signinUser,requestOtp,
    verifyOtp,   } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.post('/send-otp', requestOtp);
router.post('/verify-otp', verifyOtp);


module.exports = router;