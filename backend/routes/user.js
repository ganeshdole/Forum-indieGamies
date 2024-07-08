const express = require('express');
const router = express.Router();
const { updateUserById, deleteUserById,  getUserById } = require('../controllers/userController');



router.get('/me', getUserById); 
router.patch('/update', updateUserById);
router.delete('/delete', deleteUserById);

module.exports = router;
