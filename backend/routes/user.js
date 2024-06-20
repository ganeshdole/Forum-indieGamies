const express = require('express');
const router = express.Router();
const { registerUser , updateUserById, deleteUserById} = require('../controllers/userController');

router.post('/register', registerUser);
router.delete("/deleteuser/:id", deleteUserById)
router.post("/updatedetails/:id", updateUserById)


module.exports = router;
