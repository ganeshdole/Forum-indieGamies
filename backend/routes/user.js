const express = require('express');
const router = express.Router();
const { registerUser, updateUserById, deleteUserById, signinUser, getUserById } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.get('/me', getUserById); 
router.patch('/update', updateUserById);
router.delete('/delete', deleteUserById);

module.exports = router;
